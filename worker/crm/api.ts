import {
  type D1Like, PHONE_DIGITS_SQL, STAGES, STAGE_LABEL, type Stage,
  addActivity, all, findCustomerByPhone, findOrCreateCustomer, first, now, phoneDigits, run,
} from "./db";

// JSON API behind /api/crm/*. Every request has already passed authenticate() in worker/index.ts.

type Body = Record<string, unknown>;

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store", "x-robots-tag": "noindex" } });
}

const str = (value: unknown, max = 2000) => (typeof value === "string" ? value.trim().slice(0, max) : typeof value === "number" ? String(value) : "");
const orNull = (value: string) => value || null;
const id = (value: string | undefined) => {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) throw new HttpError(400, "Invalid id");
  return n;
};
const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);
const dateOrEmpty = (value: unknown) => {
  const date = str(value, 10);
  if (date && !isDate(date)) throw new HttpError(400, "Invalid date");
  return date;
};

function money(value: unknown): number {
  if (value === null || value === undefined || value === "") return 0;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n < 0) throw new HttpError(400, "Invalid amount");
  return Math.round(n * 100) / 100;
}

function stage(value: unknown): Stage {
  if (typeof value === "string" && (STAGES as readonly string[]).includes(value)) return value as Stage;
  throw new HttpError(400, "Invalid stage");
}

// Columns editable through PATCH, with their cleaners. Empty strings are stored as NULL like the existing data.
const customerFields: Record<string, (value: unknown) => unknown> = {
  name: v => { const name = str(v, 200); if (!name) throw new HttpError(400, "Name is required"); return name; },
  company: v => orNull(str(v, 200)),
  email: v => orNull(str(v, 200).toLowerCase()),
  phone: v => orNull(str(v, 40)),
  address: v => orNull(str(v, 300)),
  city: v => orNull(str(v, 80)),
  state: v => orNull(str(v, 20)),
  zip: v => orNull(str(v, 20)),
  type: v => (v === "commercial" ? "commercial" : "residential"),
  status: v => (v === "inactive" ? "inactive" : "active"),
  source: v => orNull(str(v, 60)),
  notes: v => orNull(str(v, 10000)),
  qb_id: v => orNull(str(v, 40)),
};
const jobFields: Record<string, (value: unknown) => unknown> = {
  title: v => { const title = str(v, 200); if (!title) throw new HttpError(400, "Title is required"); return title; },
  stage,
  value: money,
  description: v => orNull(str(v, 10000)),
  trade: v => orNull(str(v, 120)),
  start_date: v => orNull(dateOrEmpty(v)),
  end_date: v => orNull(dateOrEmpty(v)),
  next_action: v => orNull(str(v, 300)),
  next_action_date: v => orNull(dateOrEmpty(v)),
};

function updates(body: Body, fields: Record<string, (value: unknown) => unknown>) {
  const set: string[] = [];
  const values: unknown[] = [];
  for (const [key, clean] of Object.entries(fields)) {
    if (key in body) {
      set.push(`${key} = ?`);
      values.push(clean(body[key]));
    }
  }
  return { set, values };
}

const touchCustomer = (db: D1Like, customerId: number) => run(db, "UPDATE customers SET updated_at = ? WHERE id = ?", now(), customerId);

async function route(request: Request, db: D1Like, path: string[], today: string): Promise<Response> {
  const method = request.method;
  const body: Body = method === "POST" || method === "PATCH" ? ((await request.json().catch(() => ({}))) as Body) : {};
  const url = new URL(request.url);
  const [resource, rawId, action] = path;

  // ---- Dashboard -------------------------------------------------------------------------
  if (resource === "dashboard" && method === "GET") {
    const [pipeline, newLeads, tasksDue, jobsDue, receivables, recent] = await Promise.all([
      all(db, "SELECT stage, COUNT(*) AS count, COALESCE(SUM(value), 0) AS value FROM jobs GROUP BY stage"),
      first<{ count: number }>(db, "SELECT COUNT(*) AS count FROM leads WHERE status = 'new'"),
      all(db, "SELECT t.*, c.name AS customer_name FROM tasks t LEFT JOIN customers c ON c.id = t.customer_id WHERE t.done_at IS NULL AND t.due_date != '' AND t.due_date <= ? ORDER BY t.due_date, t.id", today),
      all(db, "SELECT j.id, j.title, j.stage, j.next_action, j.next_action_date, j.customer_id, c.name AS customer_name FROM jobs j JOIN customers c ON c.id = j.customer_id WHERE j.next_action_date IS NOT NULL AND j.next_action_date != '' AND j.next_action_date <= ? AND j.stage NOT IN ('paid', 'lost') ORDER BY j.next_action_date", today),
      first(db, "SELECT COUNT(*) AS count, COALESCE(SUM(balance), 0) AS balance, SUM(CASE WHEN status = 'overdue' OR (due_date IS NOT NULL AND due_date != '' AND due_date < ?) THEN 1 ELSE 0 END) AS overdue FROM invoices WHERE status != 'paid' AND COALESCE(balance, 0) > 0", today),
      all(db, "SELECT a.*, c.name AS customer_name FROM activity a LEFT JOIN customers c ON c.id = a.customer_id ORDER BY a.date DESC, a.id DESC LIMIT 15"),
    ]);
    return json({ pipeline, newLeads: newLeads?.count ?? 0, tasksDue, jobsDue, receivables, recent });
  }

  // ---- Leads (website inbox) -------------------------------------------------------------
  if (resource === "leads") {
    if (!rawId && method === "GET") {
      const status = url.searchParams.get("status") ?? "new";
      return json({ leads: await all(db, "SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC, id DESC LIMIT 200", status) });
    }
    const leadId = id(rawId);
    const lead = await first<{ id: number; source: string; name: string; phone: string; email: string; city: string; summary: string; details: string; customer_id: number | null }>(db, "SELECT * FROM leads WHERE id = ?", leadId);
    if (!lead) throw new HttpError(404, "Lead not found");

    if (action === "convert" && method === "POST") {
      const details = safeJson(lead.details);
      const customerId = lead.customer_id ?? (await findOrCreateCustomer(db, {
        name: lead.name, phone: lead.phone, email: lead.email, city: lead.city, company: details.company,
        type: lead.source === "trade" ? "commercial" : "residential",
        source: lead.source === "beside" ? "Phone (Beside)" : lead.source === "trade" ? "Website trade form" : "Website",
      }));
      const title = str(body.title, 200) || details.planning || details.project || `${lead.name || "New"} project`;
      const job = await run(
        db,
        "INSERT INTO jobs (customer_id, title, stage, value, description, trade, next_action, next_action_date, created_at, updated_at) VALUES (?, ?, 'lead', 0, ?, ?, 'Call back', ?, ?, ?)",
        customerId, title, lead.summary || null, details.planning || null, today, now(), now(),
      );
      const jobId = Number(job.meta?.last_row_id);
      await run(db, "UPDATE leads SET status = 'converted', customer_id = ? WHERE id = ?", customerId, leadId);
      await addActivity(db, { customerId, jobId, type: "lead", subject: `Converted ${lead.source === "beside" ? "call" : "website"} lead into job “${title}”`, body: [lead.summary, details.transcript].filter(Boolean).join("\n\n") });
      await touchCustomer(db, customerId);
      return json({ customerId, jobId });
    }
    if (method === "PATCH") {
      const status = str(body.status, 20);
      if (!["new", "archived"].includes(status)) throw new HttpError(400, "Invalid status");
      await run(db, "UPDATE leads SET status = ? WHERE id = ?", status, leadId);
      return json({ ok: true });
    }
    if (method === "DELETE") {
      await run(db, "DELETE FROM leads WHERE id = ?", leadId);
      return json({ ok: true });
    }
  }

  // ---- Customers -------------------------------------------------------------------------
  if (resource === "customers") {
    if (!rawId && method === "GET") {
      const raw = (url.searchParams.get("q") ?? "").trim().toLowerCase();
      const q = `%${raw}%`;
      const digits = phoneDigits(raw);
      const type = url.searchParams.get("type") || null;
      const rows = await all(
        db,
        `SELECT c.id, c.name, c.company, c.phone, c.email, c.city, c.type, c.status, c.updated_at,
           (SELECT COUNT(*) FROM jobs j WHERE j.customer_id = c.id AND j.stage NOT IN ('paid', 'lost', 'complete')) AS open_jobs
         FROM customers c
         WHERE (? = '%%' OR lower(c.name) LIKE ? OR lower(COALESCE(c.company, '')) LIKE ? OR lower(COALESCE(c.email, '')) LIKE ? OR lower(COALESCE(c.city, '')) LIKE ?
                OR (? != '' AND ${PHONE_DIGITS_SQL("c.phone")} LIKE ?))
           AND (? IS NULL OR c.type = ?)
         ORDER BY c.updated_at DESC, c.id DESC LIMIT 300`,
        q, q, q, q, q, digits, `%${digits}%`, type, type,
      );
      return json({ customers: rows });
    }
    if (!rawId && method === "POST") {
      const { set, values } = updates({ type: "residential", status: "active", source: "Manual", ...body }, customerFields);
      if (!set.some(column => column.startsWith("name "))) throw new HttpError(400, "Name is required");
      const columns = set.map(column => column.split(" ")[0]);
      const result = await run(
        db,
        `INSERT INTO customers (${columns.join(", ")}, created_at, updated_at) VALUES (${columns.map(() => "?").join(", ")}, ?, ?)`,
        ...values, now(), now(),
      );
      return json({ id: Number(result.meta?.last_row_id) }, 201);
    }
    const customerId = id(rawId);
    if (method === "GET") {
      const customer = await first(db, "SELECT * FROM customers WHERE id = ?", customerId);
      if (!customer) throw new HttpError(404, "Customer not found");
      const [jobs, tasks, activity, estimates, invoices, properties] = await Promise.all([
        all(db, "SELECT * FROM jobs WHERE customer_id = ? ORDER BY updated_at DESC, id DESC", customerId),
        all(db, "SELECT * FROM tasks WHERE customer_id = ? ORDER BY done_at IS NOT NULL, due_date = '', due_date, id", customerId),
        all(db, "SELECT * FROM activity WHERE customer_id = ? ORDER BY date DESC, id DESC LIMIT 200", customerId),
        all(db, "SELECT id, job_id, number, date, amount, status, qb_link FROM estimates WHERE customer_id = ? ORDER BY date DESC, id DESC", customerId),
        all(db, "SELECT id, job_id, number, date, due_date, amount, balance, status, qb_link FROM invoices WHERE customer_id = ? ORDER BY date DESC, id DESC", customerId),
        all(db, "SELECT id, label, address, city, state, zip FROM properties WHERE customer_id = ? ORDER BY id", customerId),
      ]);
      return json({ customer, jobs, tasks, activity, estimates, invoices, properties });
    }
    if (method === "PATCH") {
      const { set, values } = updates(body, customerFields);
      if (!set.length) throw new HttpError(400, "Nothing to update");
      await run(db, `UPDATE customers SET ${set.join(", ")}, updated_at = ? WHERE id = ?`, ...values, now(), customerId);
      return json({ ok: true });
    }
    if (method === "DELETE") {
      // Keep billing history intact: customers with estimates or invoices are marked inactive instead.
      const billing = await first<{ n: number }>(db, "SELECT (SELECT COUNT(*) FROM estimates WHERE customer_id = ?) + (SELECT COUNT(*) FROM invoices WHERE customer_id = ?) AS n", customerId, customerId);
      if (billing && billing.n > 0) throw new HttpError(409, "This customer has estimates or invoices. Mark them inactive instead of deleting.");
      await run(db, "DELETE FROM customers WHERE id = ?", customerId);
      return json({ ok: true });
    }
  }

  // ---- Jobs (pipeline) -------------------------------------------------------------------
  if (resource === "jobs") {
    if (!rawId && method === "GET") {
      return json({
        jobs: await all(db, "SELECT j.*, c.name AS customer_name, c.city AS customer_city FROM jobs j JOIN customers c ON c.id = j.customer_id ORDER BY j.updated_at DESC, j.id DESC LIMIT 1000"),
      });
    }
    if (!rawId && method === "POST") {
      const customerId = id(str(body.customer_id));
      const { set, values } = updates({ stage: "lead", ...body }, jobFields);
      if (!set.some(column => column.startsWith("title "))) throw new HttpError(400, "Title is required");
      const columns = set.map(column => column.split(" ")[0]);
      const result = await run(
        db,
        `INSERT INTO jobs (customer_id, ${columns.join(", ")}, created_at, updated_at) VALUES (?, ${columns.map(() => "?").join(", ")}, ?, ?)`,
        customerId, ...values, now(), now(),
      );
      const jobId = Number(result.meta?.last_row_id);
      const jobStage = stage(body.stage ?? "lead");
      await addActivity(db, { customerId, jobId, type: "stage", subject: `Job “${str(body.title, 200)}” created (${STAGE_LABEL[jobStage]})` });
      await touchCustomer(db, customerId);
      return json({ id: jobId }, 201);
    }
    const jobId = id(rawId);
    const job = await first<{ id: number; customer_id: number; title: string; stage: Stage }>(db, "SELECT * FROM jobs WHERE id = ?", jobId);
    if (!job) throw new HttpError(404, "Job not found");
    if (method === "PATCH") {
      const { set, values } = updates(body, jobFields);
      if (!set.length) throw new HttpError(400, "Nothing to update");
      await run(db, `UPDATE jobs SET ${set.join(", ")}, updated_at = ? WHERE id = ?`, ...values, now(), jobId);
      if ("stage" in body && body.stage !== job.stage) {
        await addActivity(db, { customerId: job.customer_id, jobId, type: "stage", subject: `“${job.title}” moved to ${STAGE_LABEL[stage(body.stage)]}` });
      }
      await touchCustomer(db, job.customer_id);
      return json({ ok: true });
    }
    if (method === "DELETE") {
      const billing = await first<{ n: number }>(db, "SELECT (SELECT COUNT(*) FROM estimates WHERE job_id = ?) + (SELECT COUNT(*) FROM invoices WHERE job_id = ?) AS n", jobId, jobId);
      if (billing && billing.n > 0) throw new HttpError(409, "This job has estimates or invoices. Mark it Lost instead of deleting.");
      await run(db, "DELETE FROM activity WHERE job_id = ? AND type = 'stage'", jobId);
      await run(db, "UPDATE activity SET job_id = NULL WHERE job_id = ?", jobId);
      await run(db, "DELETE FROM jobs WHERE id = ?", jobId);
      return json({ ok: true });
    }
  }

  // ---- Tasks (follow-ups) ----------------------------------------------------------------
  if (resource === "tasks") {
    if (!rawId && method === "GET") {
      const done = url.searchParams.get("filter") === "done";
      const tasks = await all(db, `SELECT t.*, c.name AS customer_name, j.title AS job_title FROM tasks t LEFT JOIN customers c ON c.id = t.customer_id LEFT JOIN jobs j ON j.id = t.job_id WHERE t.done_at IS ${done ? "NOT NULL" : "NULL"} ORDER BY ${done ? "t.done_at DESC" : "t.due_date = '', t.due_date"}, t.id LIMIT 500`);
      // Jobs carry their own "next step" too; show open ones alongside the tasks.
      const jobSteps = done ? [] : await all(db, "SELECT j.id AS job_id, j.title AS job_title, j.next_action AS title, COALESCE(j.next_action_date, '') AS due_date, j.customer_id, c.name AS customer_name FROM jobs j JOIN customers c ON c.id = j.customer_id WHERE j.next_action IS NOT NULL AND j.next_action != '' AND j.stage NOT IN ('paid', 'lost') ORDER BY COALESCE(j.next_action_date, '') = '', j.next_action_date LIMIT 500");
      return json({ tasks, jobSteps });
    }
    if (!rawId && method === "POST") {
      const title = str(body.title, 300);
      if (!title) throw new HttpError(400, "Title is required");
      const result = await run(
        db,
        "INSERT INTO tasks (title, due_date, customer_id, job_id) VALUES (?, ?, ?, ?)",
        title, dateOrEmpty(body.due_date), body.customer_id ? id(str(body.customer_id)) : null, body.job_id ? id(str(body.job_id)) : null,
      );
      return json({ id: Number(result.meta?.last_row_id) }, 201);
    }
    const taskId = id(rawId);
    if (method === "PATCH") {
      const set: string[] = [];
      const values: unknown[] = [];
      if ("done" in body) { set.push("done_at = ?"); values.push(body.done ? now() : null); }
      if ("title" in body) { set.push("title = ?"); values.push(str(body.title, 300)); }
      if ("due_date" in body) { set.push("due_date = ?"); values.push(dateOrEmpty(body.due_date)); }
      if (!set.length) throw new HttpError(400, "Nothing to update");
      await run(db, `UPDATE tasks SET ${set.join(", ")} WHERE id = ?`, ...values, taskId);
      return json({ ok: true });
    }
    if (method === "DELETE") {
      await run(db, "DELETE FROM tasks WHERE id = ?", taskId);
      return json({ ok: true });
    }
  }

  // ---- Activity (notes and logged calls) -------------------------------------------------
  if (resource === "activity" && !rawId && method === "POST") {
    const type = str(body.type, 20) || "note";
    if (!["note", "call", "text", "email"].includes(type)) throw new HttpError(400, "Invalid type");
    const customerId = id(str(body.customer_id));
    const subject = str(body.subject, 300);
    if (!subject) throw new HttpError(400, "Write something first");
    const direction = body.direction === "in" ? "Incoming" : body.direction === "out" ? "Outgoing" : "";
    await addActivity(db, { customerId, jobId: body.job_id ? id(str(body.job_id)) : null, type, subject: direction && type !== "note" ? `${direction} ${type}: ${subject}` : subject, body: str(body.body, 10000) });
    await touchCustomer(db, customerId);
    return json({ ok: true }, 201);
  }
  if (resource === "activity" && rawId && method === "DELETE") {
    await run(db, "DELETE FROM activity WHERE id = ?", id(rawId));
    return json({ ok: true });
  }

  throw new HttpError(404, "Not found");
}

function safeJson(text: string): Record<string, string> {
  try { return JSON.parse(text || "{}") as Record<string, string>; } catch { return {}; }
}

export async function handleCrmApi(request: Request, db: D1Like | undefined, options: { today?: string } = {}) {
  if (!db) return json({ error: "The CRM database is not connected yet (D1 binding CRM_DB)." }, 503);
  const path = new URL(request.url).pathname.replace(/^\/api\/crm\/?/, "").split("/").filter(Boolean);
  // "Today" in Florida, so follow-ups don't flip at 8 p.m. local time.
  const today = options.today ?? new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
  try {
    return await route(request, db, path, today);
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.message }, error.status);
    console.error("crm api error", error instanceof Error ? error.message : "unknown");
    return json({ error: "Something went wrong." }, 500);
  }
}

// ---- Inbound integrations ------------------------------------------------------------------

/** Saves a website form submission into the CRM inbox. Never throws: the lead email still goes out if this fails. */
export async function saveWebsiteLead(db: D1Like | undefined, form: string, values: Record<string, string>, extra: string) {
  if (!db) return false;
  try {
    const summary = [values.planning, values.timeline, values.notes, extra].filter(Boolean).join(" · ");
    await run(
      db,
      "INSERT INTO leads (source, name, phone, email, city, summary, details, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      form, values.name ?? "", values.phone ?? "", values.email ?? "", values.city ?? values.project ?? "", summary, JSON.stringify(values), now(),
    );
    return true;
  } catch {
    console.error("crm lead save failed");
    return false;
  }
}

/**
 * POST /api/hooks/beside?token=… — call and text events from the Beside receptionist (Alli).
 * Accepts a flexible JSON body (fields in `CallEvent`). Known callers get the call logged on their
 * customer record; unknown callers land in the leads inbox.
 */
type CallEvent = {
  id?: string; call_id?: string;
  type?: string; // "call" | "text" | "sms"
  direction?: string; // "inbound" | "outbound"
  from?: string; to?: string; phone?: string; caller_phone?: string;
  caller_name?: string; name?: string;
  summary?: string; transcript?: string; message?: string;
  line?: string; // which business line was called
  timestamp?: string; created_at?: string;
};

export async function handleBesideHook(request: Request, db: D1Like | undefined, secret: string | undefined) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const url = new URL(request.url);
  const provided = url.searchParams.get("token") ?? request.headers.get("x-webhook-token") ?? "";
  if (!secret || provided.length !== secret.length || !timingSafeEqual(provided, secret)) return json({ error: "unauthorized" }, 401);
  if (!db) return json({ error: "not_configured" }, 503);

  const event = (await request.json().catch(() => null)) as CallEvent | null;
  if (!event) return json({ error: "invalid_body" }, 400);
  const incoming = !(event.direction ?? "inbound").toLowerCase().startsWith("out");
  const phone = event.caller_phone ?? event.phone ?? (incoming ? event.from : event.to) ?? "";
  const type = /text|sms/i.test(event.type ?? "") ? "text" : "call";
  const name = event.caller_name ?? event.name ?? "";
  const label = `${incoming ? "Incoming" : "Outgoing"} ${type}${event.line ? ` (${event.line})` : ""}`;
  const summary = str(event.summary ?? event.message ?? "", 300);
  const transcript = str(event.transcript ?? event.message ?? "", 20000);
  const externalId = event.id ?? event.call_id ? `beside:${event.id ?? event.call_id}` : null;
  const stamp = event.timestamp ?? event.created_at;
  const when = stamp && !Number.isNaN(Date.parse(stamp)) ? new Date(stamp).toISOString().slice(0, 19).replace("T", " ") : now();

  if (externalId) {
    const inserted = await run(db, "INSERT OR IGNORE INTO integration_events (external_id) VALUES (?)", externalId);
    if (!inserted.meta?.changes) return json({ ok: true, duplicate: true });
  }

  const customer = await findCustomerByPhone(db, phone);
  if (customer) {
    await addActivity(db, { customerId: customer.id, type, subject: summary ? `${label}: ${summary}` : label, body: transcript, date: when });
    await touchCustomer(db, customer.id);
    return json({ ok: true, customerId: customer.id });
  }
  await run(
    db,
    "INSERT INTO leads (source, name, phone, summary, details, created_at) VALUES ('beside', ?, ?, ?, ?, ?)",
    name, phone, summary || label, JSON.stringify({ type, incoming, line: event.line ?? "", transcript, externalId }), when,
  );
  return json({ ok: true, lead: true });
}

function timingSafeEqual(a: string, b: string) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
