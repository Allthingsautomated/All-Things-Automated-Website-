/** Cloudflare Worker entry point for the vinext-starter template. */

// Polyfill WeakRef for edge runtime compatibility
if (typeof WeakRef === "undefined") {
  (globalThis as any).WeakRef = class WeakRef<T extends object> {
    constructor(private target: T) {}
    deref(): T | undefined {
      return this.target;
    }
  };
}

import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { handleBesideHook, handleCrmApi } from "./crm/api";
import { type AuthEnv, authenticate, deniedResponse, isCrmPath } from "./crm/auth";
import { handleLead, type LeadEnv } from "./lead";
import { securityHeaders } from "./security-headers.mjs";

interface Env extends LeadEnv, AuthEnv {
  BESIDE_WEBHOOK_TOKEN?: string;
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

function withSecurityHeaders(response: Response) {
  const secured = new Response(response.body, response);
  for (const [name, value] of Object.entries(securityHeaders)) secured.headers.set(name, value);
  return secured;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // One canonical host: send www to the apex domain.
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // CRM: Cloudflare Access (Google sign-in) in front, token verified here as well.
    if (isCrmPath(url.pathname)) {
      const auth = await authenticate(request, env ?? {});
      if (!auth.ok) return withSecurityHeaders(deniedResponse(auth, url.pathname));
      const response = url.pathname.startsWith("/api/crm/")
        ? await handleCrmApi(request, env?.CRM_DB)
        : await handler.fetch(request, env, ctx);
      const secured = withSecurityHeaders(response);
      secured.headers.set("x-robots-tag", "noindex, nofollow");
      secured.headers.set("cache-control", "private, no-store");
      return secured;
    }

    if (url.pathname === "/api/hooks/beside") {
      return withSecurityHeaders(await handleBesideHook(request, env?.CRM_DB, env?.BESIDE_WEBHOOK_TOKEN));
    }

    if (url.pathname === "/api/lead") {
      return withSecurityHeaders(await handleLead(request, env ?? {}));
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return withSecurityHeaders(await handler.fetch(request, env, ctx));
  },
};

export default worker;
