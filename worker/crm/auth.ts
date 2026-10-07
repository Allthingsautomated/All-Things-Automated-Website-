import { createRemoteJWKSet, jwtVerify } from "jose";

// The CRM sits behind Cloudflare Access (Google sign-in). Access blocks anyone who is not on the
// policy at the edge; this check verifies the signed token Access attaches, so a request that
// somehow bypasses Access (a preview URL, a misconfigured route) is still refused.
//
// Pages settings:
//   ACCESS_TEAM_DOMAIN   https://<team>.cloudflareaccess.com
//   ACCESS_AUD           the Access application's Audience (AUD) tag
//   CRM_ALLOWED_EMAILS   comma-separated Google accounts allowed in, e.g. jorge@allthingsautomated.org

export interface AuthEnv {
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  CRM_ALLOWED_EMAILS?: string;
}

export type AuthResult = { ok: true; email: string } | { ok: false; status: number; reason: string };

const jwksByDomain = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function isLocal(url: URL) {
  return url.hostname === "localhost" || url.hostname === "127.0.0.1";
}

export async function authenticate(request: Request, env: AuthEnv): Promise<AuthResult> {
  const url = new URL(request.url);
  const teamDomain = env.ACCESS_TEAM_DOMAIN?.replace(/\/$/, "");

  if (!teamDomain || !env.ACCESS_AUD) {
    // Local development only: no Access in front of localhost.
    if (isLocal(url)) return { ok: true, email: "local-dev" };
    return { ok: false, status: 503, reason: "CRM login is not configured yet." };
  }

  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token) return { ok: false, status: 401, reason: "Please sign in." };

  let jwks = jwksByDomain.get(teamDomain);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));
    jwksByDomain.set(teamDomain, jwks);
  }

  try {
    const { payload } = await jwtVerify(token, jwks, { issuer: teamDomain, audience: env.ACCESS_AUD });
    const email = String(payload.email ?? "").toLowerCase();
    const allowed = (env.CRM_ALLOWED_EMAILS ?? "").split(",").map(value => value.trim().toLowerCase()).filter(Boolean);
    if (!email || !allowed.includes(email)) return { ok: false, status: 403, reason: "This account does not have access." };
    return { ok: true, email };
  } catch {
    return { ok: false, status: 401, reason: "Your sign-in has expired. Please sign in again." };
  }
}

export function isCrmPath(pathname: string) {
  return pathname === "/crm" || pathname.startsWith("/crm/") || pathname.startsWith("/api/crm/");
}

export function deniedResponse(result: Extract<AuthResult, { ok: false }>, pathname: string) {
  if (pathname.startsWith("/api/")) {
    return new Response(JSON.stringify({ error: result.reason }), { status: result.status, headers: { "content-type": "application/json" } });
  }
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>CRM sign-in</title>
<style>body{background:#f2efe7;color:#1e211e;font:16px/1.5 "Helvetica Neue",Arial,sans-serif;margin:0;display:grid;min-height:100vh;place-items:center}main{max-width:420px;padding:32px}a{color:#1e211e}</style></head>
<body><main><h1>All Things Automated CRM</h1><p>${result.reason}</p><p><a href="/crm">Try again</a> · <a href="/">Back to the website</a></p></main></body></html>`;
  return new Response(html, { status: result.status, headers: { "content-type": "text/html; charset=utf-8" } });
}
