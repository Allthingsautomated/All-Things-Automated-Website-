// POST /api/lead — the /contact and /for-builders forms.
// Validates, drops honeypot submissions silently, checks Turnstile, stores an optional plan PDF in R2,
// and emails the lead to the business inbox through Cloudflare Email Routing (send_email binding).
//
// Cloudflare Pages settings (Settings → Variables / Bindings):
//   SEND_EMAIL        send_email binding (Email Routing must be on for itsallthingsautomated.com,
//                     and LEAD_TO must be a verified destination address)
//   LEAD_FROM         sender on the routed domain, e.g. website@itsallthingsautomated.com
//   LEAD_TO           optional, defaults to hello@itsallthingsautomated.com
//   TURNSTILE_SECRET  optional; when set, every submission must carry a valid Turnstile token
//   PLANS             optional R2 bucket binding for builder plan uploads

export interface LeadEnv {
  SEND_EMAIL?: { send(message: unknown): Promise<void> };
  LEAD_FROM?: string;
  LEAD_TO?: string;
  TURNSTILE_SECRET?: string;
  PLANS?: { put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown> };
}

const MAX_PLAN_BYTES = 25 * 1024 * 1024;

type Field = { name: string; label: string; required?: boolean; max?: number };

const forms: Record<string, { subject: string; fields: Field[] }> = {
  contact: {
    subject: "Website lead",
    fields: [
      { name: "name", label: "Name", required: true, max: 120 },
      { name: "phone", label: "Phone", required: true, max: 40 },
      { name: "email", label: "Email", required: true, max: 200 },
      { name: "city", label: "City", required: true, max: 80 },
      { name: "planning", label: "Planning", required: true, max: 80 },
      { name: "timeline", label: "Timeline", required: true, max: 40 },
      { name: "notes", label: "Notes", max: 4000 },
    ],
  },
  trade: {
    subject: "Trade quote request",
    fields: [
      { name: "company", label: "Company", required: true, max: 160 },
      { name: "role", label: "Role", required: true, max: 60 },
      { name: "name", label: "Name", required: true, max: 120 },
      { name: "phone", label: "Phone", required: true, max: 40 },
      { name: "email", label: "Email", required: true, max: 200 },
      { name: "project", label: "Project address or community", required: true, max: 200 },
      { name: "roughIn", label: "Rough-in date", max: 40 },
      { name: "notes", label: "Notes", max: 4000 },
    ],
  },
};

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
}

// Header values must not carry line breaks.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

// RFC 2047 encoding for header text that is not plain ASCII (e.g. "José").
function headerText(value: string) {
  const text = oneLine(value);
  if (/^[\x20-\x7e]*$/.test(text)) return text;
  const bytes = new TextEncoder().encode(text);
  return `=?UTF-8?B?${btoa(String.fromCharCode(...bytes))}?=`;
}

// Display name for From/Reply-To: quoted when ASCII, encoded otherwise.
function displayName(value: string) {
  const text = oneLine(value).replace(/["\\<>]/g, "");
  return /^[\x20-\x7e]*$/.test(text) ? `"${text}"` : headerText(text);
}

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);
  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await result.json()) as { success?: boolean };
  return data.success === true;
}

export async function handleLead(request: Request, env: LeadEnv = {}): Promise<Response> {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json({ error: "invalid_body" }, 400);
  }

  // Honeypot: real visitors never see this field. Pretend success, send nothing.
  if (String(data.get("website") ?? "").trim()) return json({ ok: true });

  const form = forms[String(data.get("form"))];
  if (!form) return json({ error: "unknown_form" }, 400);

  const values: Record<string, string> = {};
  const missing: string[] = [];
  for (const field of form.fields) {
    const value = String(data.get(field.name) ?? "").trim().slice(0, field.max ?? 500);
    if (field.required && !value) missing.push(field.name);
    values[field.name] = value;
  }
  if (missing.length) return json({ error: "missing_fields", fields: missing }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return json({ error: "invalid_email", fields: ["email"] }, 400);
  if (values.phone.replace(/\D/g, "").length < 10) return json({ error: "invalid_phone", fields: ["phone"] }, 400);

  if (env.TURNSTILE_SECRET) {
    const token = String(data.get("cf-turnstile-response") ?? "");
    if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET, token, request.headers.get("cf-connecting-ip")))) {
      return json({ error: "verification_failed" }, 400);
    }
  }

  if (!env.SEND_EMAIL || !env.LEAD_FROM) return json({ error: "not_configured" }, 503);

  // Optional plan PDF (trade form).
  let planNote = "";
  let planStored = true;
  const plan = data.get("plans");
  if (plan && typeof plan !== "string" && plan.size > 0) {
    if (plan.size > MAX_PLAN_BYTES) return json({ error: "file_too_large", fields: ["plans"] }, 400);
    if (plan.type !== "application/pdf" && !plan.name.toLowerCase().endsWith(".pdf")) return json({ error: "file_type", fields: ["plans"] }, 400);
    if (env.PLANS) {
      const key = `plans/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.pdf`;
      await env.PLANS.put(key, await plan.arrayBuffer(), { httpMetadata: { contentType: "application/pdf" } });
      planNote = `Plans: uploaded to R2 bucket as ${key} (${Math.round(plan.size / 1024)} KB, "${oneLine(plan.name)}")`;
    } else {
      planStored = false;
      planNote = `Plans: the sender attached "${oneLine(plan.name)}" but file storage is not set up; ask them to email it.`;
    }
  }

  const to = env.LEAD_TO || "hello@itsallthingsautomated.com";
  const subject = headerText(`${form.subject}: ${values.name}${values.company ? ` (${values.company})` : ""}`);
  const lines = form.fields.map(field => `${field.label}: ${values[field.name] || "—"}`);
  if (planNote) lines.push(planNote);
  lines.push("", `Sent from ${new URL(request.url).origin} on ${new Date().toUTCString()}`);

  const raw = [
    `From: All Things Automated website <${env.LEAD_FROM}>`,
    `To: ${to}`,
    `Reply-To: ${displayName(values.name)} <${oneLine(values.email)}>`,
    `Subject: ${subject}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${env.LEAD_FROM.split("@")[1]}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    lines.join("\r\n"),
  ].join("\r\n");

  try {
    // Only exists on Cloudflare's runtime, so load it when actually sending.
    const { EmailMessage } = await import("cloudflare:email");
    await env.SEND_EMAIL.send(new EmailMessage(env.LEAD_FROM, to, raw));
  } catch {
    console.error("lead email failed");
    return json({ error: "send_failed" }, 502);
  }
  return json({ ok: true, planStored });
}
