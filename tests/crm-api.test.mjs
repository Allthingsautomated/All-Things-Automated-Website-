// Runs the CRM API against an in-memory SQLite database with the real migration.
// node --test tests/crm-api.test.mjs
import assert from "node:assert/strict";
import { readFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { build } from "esbuild";

const root = resolve(import.meta.dirname, "..");
const out = join(await mkdtemp(join(tmpdir(), "crm-test-")), "crm.mjs");
await build({ stdin: { contents: 'export * from "./worker/crm/api.ts"; export * from "./worker/crm/auth.ts";', resolveDir: root, loader: "ts" }, bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "error" });
const { handleCrmApi, handleBesideHook, saveWebsiteLead, authenticate } = await import(out);

// D1-shaped wrapper around node:sqlite.
function d1(sqlite) {
  const statement = (sql, values = []) => ({
    bind: (...next) => statement(sql, next),
    all: async () => ({ results: sqlite.prepare(sql).all(...values) }),
    first: async () => sqlite.prepare(sql).get(...values) ?? null,
    run: async () => { const r = sqlite.prepare(sql).run(...values); return { meta: { last_row_id: Number(r.lastInsertRowid), changes: r.changes } }; },
  });
  return { prepare: sql => statement(sql), batch: async list => Promise.all(list.map(s => s.run())) };
}

async function freshDb() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec("PRAGMA foreign_keys = ON;");
  // The real production layout (existing tables) plus the additive website-CRM migration.
  sqlite.exec(await readFile(join(root, "migrations/0001_crm_schema.sql"), "utf8"));
  // A customer imported from QuickBooks, with billing history.
  sqlite.exec(`INSERT INTO customers (name, company, email, phone, city, type, source, qb_id) VALUES ('Pat Kim', NULL, 'pat@example.com', '(941) 555-0103', 'Venice', 'residential', 'QuickBooks', '58');
    INSERT INTO jobs (customer_id, title, stage, value) VALUES (1, 'RA3 whole home', 'estimate_sent', 18500);
    INSERT INTO estimates (customer_id, job_id, number, date, amount, status) VALUES (1, 1, '1042', '2026-09-01', 18500, 'Pending');
    INSERT INTO invoices (customer_id, number, date, due_date, amount, balance, status) VALUES (1, '2001', '2026-08-01', '2026-08-31', 900, 900, 'unpaid');`);
  return d1(sqlite);
}

const call = async (db, method, path, body) => {
  const response = await handleCrmApi(new Request(`https://x.test/api/crm/${path}`, { method, headers: { "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined }), db, { today: "2026-10-07" });
  return { status: response.status, body: await response.json() };
};

test("existing QuickBooks customer shows jobs, estimates and invoices", async () => {
  const db = await freshDb();
  const { body } = await call(db, "GET", "customers/1");
  assert.equal(body.customer.qb_id, "58");
  assert.equal(body.jobs[0].stage, "estimate_sent");
  assert.equal(body.estimates[0].number, "1042");
  assert.equal(body.invoices[0].balance, 900);
  const dash = (await call(db, "GET", "dashboard")).body;
  assert.equal(dash.receivables.count, 1);
  assert.equal(dash.receivables.overdue, 1, "unpaid past due date counts as overdue");
  assert.equal((await call(db, "GET", "customers?q=555-0103")).body.customers.length, 1, "phone search ignores formatting");
  assert.equal((await call(db, "GET", "customers?q=venice")).body.customers.length, 1);
});

test("website lead → convert → customer, job, activity", async () => {
  const db = await freshDb();
  assert.equal(await saveWebsiteLead(db, "contact", { name: "Ana Ruiz", phone: "(941) 555-0101", email: "Ana@Example.com", city: "Sarasota", planning: "Lighting control", timeline: "Now", notes: "Kitchen first" }, ""), true);
  const leads = await call(db, "GET", "leads");
  assert.equal(leads.body.leads.length, 1);
  const converted = await call(db, "POST", `leads/${leads.body.leads[0].id}/convert`, {});
  assert.equal(converted.status, 200);
  const detail = (await call(db, "GET", `customers/${converted.body.customerId}`)).body;
  assert.equal(detail.customer.email, "ana@example.com");
  assert.equal(detail.customer.type, "residential");
  assert.equal(detail.jobs[0].title, "Lighting control");
  assert.equal(detail.jobs[0].stage, "lead");
  assert.equal(detail.jobs[0].next_action_date, "2026-10-07", "new leads get a call-back next step for today");
  assert.equal(detail.activity[0].type, "lead");
  assert.equal((await call(db, "GET", "leads")).body.leads.length, 0);
  assert.equal((await call(db, "GET", "dashboard")).body.jobsDue.length, 1);
});

test("lead from an existing customer's phone links to that customer", async () => {
  const db = await freshDb();
  await saveWebsiteLead(db, "trade", { company: "Gulf Homes", role: "Builder", name: "Pat", phone: "941.555.0103", email: "", project: "Lakewood Ranch" }, "");
  const lead = (await call(db, "GET", "leads")).body.leads[0];
  const { body } = await call(db, "POST", `leads/${lead.id}/convert`, {});
  assert.equal(body.customerId, 1);
});

test("customers, jobs, stage history, tasks, notes", async () => {
  const db = await freshDb();
  const { body: created } = await call(db, "POST", "customers", { name: "Gulf Coast Builders", company: "Gulf Coast Builders", type: "commercial", phone: "941-555-0199", city: "Lakewood Ranch" });
  const { body: job } = await call(db, "POST", "jobs", { customer_id: created.id, title: "Model home RA3", value: "18,500.50", next_action: "Send proposal", next_action_date: "2026-10-09" });
  assert.equal((await call(db, "PATCH", `jobs/${job.id}`, { stage: "won" })).status, 200);
  assert.equal((await call(db, "PATCH", `jobs/${job.id}`, { stage: "assessment" })).status, 400, "only the shared stage keys");
  await call(db, "POST", "tasks", { title: "Call back", due_date: "2026-10-06", customer_id: created.id });
  await call(db, "POST", "activity", { customer_id: created.id, type: "call", direction: "out", subject: "Left voicemail" });
  const detail = (await call(db, "GET", `customers/${created.id}`)).body;
  assert.equal(detail.jobs[0].value, 18500.5);
  assert.equal(detail.customer.type, "commercial");
  assert.ok(detail.activity.some(a => a.subject === "Outgoing call: Left voicemail"));
  assert.ok(detail.activity.some(a => a.subject.includes("moved to Won")));
  const tasks = (await call(db, "GET", "tasks")).body;
  assert.equal(tasks.tasks.length, 1);
  assert.ok(tasks.jobSteps.some(step => step.title === "Send proposal"));
  assert.equal((await call(db, "GET", "dashboard")).body.tasksDue.length, 1);
  await call(db, "PATCH", `tasks/${tasks.tasks[0].id}`, { done: true });
  assert.equal((await call(db, "GET", "dashboard")).body.tasksDue.length, 0);
  assert.equal((await call(db, "DELETE", `customers/${created.id}`)).status, 200);
});

test("billing history is protected from deletes", async () => {
  const db = await freshDb();
  assert.equal((await call(db, "DELETE", "customers/1")).status, 409);
  assert.equal((await call(db, "DELETE", "jobs/1")).status, 409);
  assert.equal((await call(db, "PATCH", "customers/1", { status: "inactive" })).status, 200);
});

test("validation and unknown routes", async () => {
  const db = await freshDb();
  assert.equal((await call(db, "POST", "customers", { name: "" })).status, 400);
  assert.equal((await call(db, "PATCH", "customers/1", { name: "" })).status, 400);
  assert.equal((await call(db, "POST", "tasks", { title: "x", due_date: "tomorrow" })).status, 400);
  assert.equal((await call(db, "GET", "customers/abc")).status, 400);
  assert.equal((await call(db, "GET", "customers/999")).status, 404);
  assert.equal((await call(db, "GET", "nothing")).status, 404);
  assert.equal((await handleCrmApi(new Request("https://x.test/api/crm/dashboard"), undefined)).status, 503);
});

test("Beside hook: secret, matching, unknown callers, duplicates", async () => {
  const db = await freshDb();
  const hook = (body, token = "s3cret") => handleBesideHook(new Request(`https://x.test/api/hooks/beside?token=${token}`, { method: "POST", body: JSON.stringify(body) }), db, "s3cret");
  assert.equal((await hook({}, "wrong")).status, 401);
  assert.equal((await handleBesideHook(new Request("https://x.test/api/hooks/beside", { method: "POST", body: "{}" }), db, undefined)).status, 401);
  const known = await (await hook({ id: "c1", type: "call", direction: "inbound", from: "+19415550103", summary: "Asked about keypads", line: "Lutron" })).json();
  assert.equal(known.customerId, 1);
  assert.equal((await (await hook({ id: "c1", from: "9415550103" })).json()).duplicate, true);
  const activity = (await call(db, "GET", "customers/1")).body.activity;
  assert.equal(activity.filter(a => a.type === "call").length, 1);
  assert.equal(activity[0].subject, "Incoming call (Lutron): Asked about keypads");
  const unknown = await (await hook({ id: "c2", type: "sms", from: "+19415559999", caller_name: "New Person", message: "Need cameras" })).json();
  assert.equal(unknown.lead, true);
  const leads = (await call(db, "GET", "leads")).body.leads;
  assert.equal(leads[0].source, "beside");
  assert.equal(leads[0].name, "New Person");
});

test("auth fails closed off localhost and requires a token", async () => {
  assert.deepEqual(await authenticate(new Request("http://localhost:4173/crm"), {}), { ok: true, email: "local-dev" });
  assert.equal((await authenticate(new Request("https://itsallthingsautomated.com/crm"), {})).status, 503);
  const env = { ACCESS_TEAM_DOMAIN: "https://ata.cloudflareaccess.com", ACCESS_AUD: "aud", CRM_ALLOWED_EMAILS: "jorge@allthingsautomated.org" };
  assert.equal((await authenticate(new Request("https://itsallthingsautomated.com/crm"), env)).status, 401);
  assert.equal((await authenticate(new Request("http://localhost/crm"), env)).status, 401, "no localhost bypass once Access is configured");
});

test("auth accepts a valid Access token only for allowed emails", async () => {
  const { generateKeyPair, exportJWK, SignJWT } = await import("jose");
  const { publicKey, privateKey } = await generateKeyPair("RS256");
  const jwk = { ...(await exportJWK(publicKey)), kid: "k1", alg: "RS256", use: "sig" };
  const team = "https://ata-test.cloudflareaccess.com";
  const realFetch = globalThis.fetch;
  globalThis.fetch = async url => String(url).startsWith(`${team}/cdn-cgi/access/certs`) ? new Response(JSON.stringify({ keys: [jwk] }), { headers: { "content-type": "application/json" } }) : realFetch(url);
  try {
    const sign = (email, aud = "aud-123", expires = "1h") => new SignJWT({ email }).setProtectedHeader({ alg: "RS256", kid: "k1" }).setIssuer(team).setAudience(aud).setIssuedAt().setExpirationTime(expires).sign(privateKey);
    const env = { ACCESS_TEAM_DOMAIN: team, ACCESS_AUD: "aud-123", CRM_ALLOWED_EMAILS: "Jorge@AllThingsAutomated.org" };
    const req = token => new Request("https://itsallthingsautomated.com/api/crm/dashboard", { headers: { "cf-access-jwt-assertion": token } });
    assert.deepEqual(await authenticate(req(await sign("jorge@allthingsautomated.org")), env), { ok: true, email: "jorge@allthingsautomated.org" });
    assert.equal((await authenticate(req(await sign("someone@gmail.com")), env)).status, 403);
    assert.equal((await authenticate(req(await sign("jorge@allthingsautomated.org", "other-app")), env)).status, 401);
    assert.equal((await authenticate(req(await sign("jorge@allthingsautomated.org", "aud-123", "-1m")), env)).status, 401);
    assert.equal((await authenticate(req("not.a.token"), env)).status, 401);
  } finally {
    globalThis.fetch = realFetch;
  }
});
