"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "contact" | "trade";
type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string; fields?: string[] };

const cities = ["Sarasota", "Lakewood Ranch", "Bradenton", "Venice", "Longboat / Siesta / Casey Key", "Tampa", "Other"];
const planning = ["Lighting control", "Cameras / network", "Landscape lighting", "Whole-home control", "EV charger", "Solar / Tesla", "Electrical", "Lutron support", "Not sure"];
const timelines = ["Now", "1–3 months", "Planning"];
const roles = ["Builder", "Remodeler", "Designer / Architect", "Showroom"];

const errors: Record<string, string> = {
  missing_fields: "Please fill in the highlighted fields.",
  invalid_email: "Please check the email address.",
  invalid_phone: "Please enter a phone number with area code.",
  file_too_large: "The plan file is over 25 MB. Send it by email instead.",
  file_type: "Plans need to be a PDF.",
  verification_failed: "We couldn't verify the submission. Please try again.",
};

function track(name: string) {
  (window as unknown as { plausible?: (event: string) => void }).plausible?.(name);
}

export function LeadForm({ kind, turnstileSiteKey, email, phone }: {
  kind: Kind;
  turnstileSiteKey: string;
  email: string;
  phone: { display: string; tel: string };
}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!turnstileSiteKey || document.querySelector("script[data-turnstile]")) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "";
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/lead", { method: "POST", body: new FormData(event.currentTarget) });
      const result = (await response.json()) as { ok?: boolean; planStored?: boolean; error?: string; fields?: string[] };
      if (result.ok) {
        track(kind === "trade" ? "builder_submit" : "lead_submit");
        setStatus({
          state: "sent",
          message: result.planStored === false
            ? `Thanks — we received your request. File uploads aren't available yet, so please email the plans to ${email}.`
            : "Thanks — we received your request and will be in touch shortly.",
        });
        form.current?.reset();
        return;
      }
      setStatus({
        state: "error",
        fields: result.fields,
        message: errors[result.error ?? ""] ?? `We couldn't send this right now. Please call ${phone.display} or email ${email}.`,
      });
    } catch {
      setStatus({ state: "error", message: `We couldn't send this right now. Please call ${phone.display} or email ${email}.` });
    }
  }

  if (status.state === "sent") {
    return <div className="formDone" role="status"><h3>Request sent.</h3><p>{status.message}</p></div>;
  }

  const invalid = (name: string) => (status.fields?.includes(name) ? true : undefined);
  const field = (name: string, label: string, input: React.ReactNode) => (
    <label className={invalid(name) ? "field invalid" : "field"}>
      <span>{label}</span>
      {input}
    </label>
  );

  return (
    <form ref={form} className="leadForm" onSubmit={submit} noValidate={false}>
      <input type="hidden" name="form" value={kind} />
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hp" aria-hidden="true">
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {kind === "trade" && (
        <>
          {field("company", "Company", <input name="company" required maxLength={160} autoComplete="organization" aria-invalid={invalid("company")} />)}
          {field("role", "Role", (
            <select name="role" required defaultValue="" aria-invalid={invalid("role")}>
              <option value="" disabled>Choose one</option>
              {roles.map(role => <option key={role}>{role}</option>)}
            </select>
          ))}
        </>
      )}
      {field("name", "Name", <input name="name" required maxLength={120} autoComplete="name" aria-invalid={invalid("name")} />)}
      {field("phone", "Phone", <input name="phone" type="tel" required maxLength={40} autoComplete="tel" aria-invalid={invalid("phone")} />)}
      {field("email", "Email", <input name="email" type="email" required maxLength={200} autoComplete="email" aria-invalid={invalid("email")} />)}
      {kind === "contact" ? (
        <>
          {field("city", "City", (
            <select name="city" required defaultValue="" aria-invalid={invalid("city")}>
              <option value="" disabled>Choose one</option>
              {cities.map(city => <option key={city}>{city}</option>)}
            </select>
          ))}
          {field("planning", "What are you planning?", (
            <select name="planning" required defaultValue="" aria-invalid={invalid("planning")}>
              <option value="" disabled>Choose one</option>
              {planning.map(item => <option key={item}>{item}</option>)}
            </select>
          ))}
          {field("timeline", "Timeline", (
            <select name="timeline" required defaultValue="" aria-invalid={invalid("timeline")}>
              <option value="" disabled>Choose one</option>
              {timelines.map(item => <option key={item}>{item}</option>)}
            </select>
          ))}
        </>
      ) : (
        <>
          {field("project", "Project address or community", <input name="project" required maxLength={200} aria-invalid={invalid("project")} />)}
          {field("roughIn", "Rough-in date", <input name="roughIn" maxLength={40} placeholder="e.g. March 2027" />)}
          {field("plans", "Plans (PDF, up to 25 MB)", <input name="plans" type="file" accept="application/pdf,.pdf" aria-invalid={invalid("plans")} />)}
        </>
      )}
      <label className="field wide">
        <span>Notes</span>
        <textarea name="notes" rows={5} maxLength={4000} />
      </label>
      {turnstileSiteKey && <div className="cf-turnstile wide" data-sitekey={turnstileSiteKey} />}
      <div className="formActions wide">
        <button className="button dark" type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : kind === "trade" ? "Request a quote" : "Send request"} <span aria-hidden="true">↗</span>
        </button>
        <p className="formPrivacy">We use your details only to reply. <a className="inline" href="/privacy">Privacy</a></p>
      </div>
      {status.state === "error" && <p className="formError wide" role="alert">{status.message}</p>}
    </form>
  );
}
