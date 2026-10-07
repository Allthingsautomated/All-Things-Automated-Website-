// Data access for the ata-crm D1 database. The core tables (customers, jobs, activity, estimates,
// invoices, properties) already exist and are shared with the separate "ata-crm" Worker, so this
// code only reads/writes their existing columns. New tables: see migrations/0001_website_crm.sql.

// Minimal slice of the D1 API the CRM uses (lets tests run against node:sqlite).
export interface D1Result<T = Record<string, unknown>> {
  results?: T[];
  meta?: { last_row_id?: number; changes?: number };
}
export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<D1Result>;
}
export interface D1Like {
  prepare(sql: string): D1Statement;
  batch(statements: D1Statement[]): Promise<D1Result[]>;
}

// Same stage keys as the existing ata-crm Worker, so both apps agree.
export const STAGES = ["lead", "estimate_sent", "won", "scheduled", "in_progress", "complete", "invoiced", "paid", "lost"] as const;
export type Stage = (typeof STAGES)[number];
export const STAGE_LABEL: Record<Stage, string> = {
  lead: "Lead", estimate_sent: "Estimate sent", won: "Won", scheduled: "Scheduled", in_progress: "In progress",
  complete: "Complete", invoiced: "Invoiced", paid: "Paid", lost: "Lost",
};

/** UTC timestamp in the format the existing tables use (SQLite datetime('now')). */
export const now = () => new Date().toISOString().slice(0, 19).replace("T", " ");

/** Last 10 digits of a phone number, used to match calls and leads to customers. */
export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

/** SQL expression giving the last 10 digits of a stored phone column (phones are stored formatted). */
export const PHONE_DIGITS_SQL = (column: string) =>
  `substr(replace(replace(replace(replace(replace(replace(COALESCE(${column}, ''), '(', ''), ')', ''), '-', ''), ' ', ''), '.', ''), '+', ''), -10)`;

export async function all<T = Record<string, unknown>>(db: D1Like, sql: string, ...values: unknown[]) {
  return ((await db.prepare(sql).bind(...values).all<T>()).results ?? []) as T[];
}

export async function first<T = Record<string, unknown>>(db: D1Like, sql: string, ...values: unknown[]) {
  return db.prepare(sql).bind(...values).first<T>();
}

export async function run(db: D1Like, sql: string, ...values: unknown[]) {
  return db.prepare(sql).bind(...values).run();
}

export async function findCustomerByPhone(db: D1Like, phone: string) {
  const digits = phoneDigits(phone);
  if (digits.length !== 10) return null;
  return first<{ id: number }>(db, `SELECT id FROM customers WHERE ${PHONE_DIGITS_SQL("phone")} = ? ORDER BY id LIMIT 1`, digits);
}

/** Find a customer by phone or email, or create one. Returns the customer id. */
export async function findOrCreateCustomer(db: D1Like, data: { name: string; phone?: string; email?: string; city?: string; company?: string; type?: string; source: string }) {
  const byPhone = await findCustomerByPhone(db, data.phone ?? "");
  if (byPhone) return byPhone.id;
  const email = (data.email ?? "").trim().toLowerCase();
  if (email) {
    const byEmail = await first<{ id: number }>(db, "SELECT id FROM customers WHERE lower(email) = ? ORDER BY id LIMIT 1", email);
    if (byEmail) return byEmail.id;
  }
  const result = await run(
    db,
    "INSERT INTO customers (name, company, email, phone, city, state, type, status, source, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'FL', ?, 'active', ?, ?, ?)",
    data.name.trim() || data.phone || data.email || "Unknown",
    data.company?.trim() || null,
    email || null,
    data.phone?.trim() || null,
    data.city?.trim() || null,
    data.type === "commercial" ? "commercial" : "residential",
    data.source,
    now(),
    now(),
  );
  return Number(result.meta?.last_row_id);
}

export async function addActivity(db: D1Like, data: { customerId: number | null; jobId?: number | null; type: string; subject: string; body?: string; date?: string }) {
  const at = data.date ?? now();
  await run(
    db,
    "INSERT INTO activity (customer_id, job_id, date, type, subject, body, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    data.customerId, data.jobId ?? null, at, data.type, data.subject, data.body ?? "", now(),
  );
}
