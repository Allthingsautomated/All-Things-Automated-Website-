-- Schema for the website CRM's own D1 database (ata-website-crm). Started empty in Oct 2026.
-- Apply once: npx wrangler d1 execute ata-website-crm --remote --file migrations/0001_crm_schema.sql
-- Later changes go in new numbered files.

CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, email TEXT, phone TEXT, address TEXT, city TEXT, state TEXT, zip TEXT, type TEXT DEFAULT 'residential', status TEXT DEFAULT 'active', source TEXT, notes TEXT, qb_id TEXT, lifetime_value REAL DEFAULT 0, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE, label TEXT, address TEXT, city TEXT, state TEXT DEFAULT 'FL', zip TEXT, notes TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE, property_id INTEGER REFERENCES properties(id), title TEXT NOT NULL, stage TEXT DEFAULT 'lead', value REAL DEFAULT 0, description TEXT, trade TEXT, start_date TEXT, end_date TEXT, next_action TEXT, next_action_date TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS activity (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE, job_id INTEGER REFERENCES jobs(id), date TEXT DEFAULT (datetime('now')), type TEXT DEFAULT 'note', subject TEXT, body TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS estimates (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE, job_id INTEGER REFERENCES jobs(id), number TEXT, date TEXT, expires TEXT, amount REAL DEFAULT 0, deposit REAL DEFAULT 0, status TEXT DEFAULT 'pending', accepted_date TEXT, notes TEXT, pdf_path TEXT, qb_id TEXT, qb_link TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS invoices (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE, job_id INTEGER REFERENCES jobs(id), estimate_id INTEGER REFERENCES estimates(id), number TEXT, date TEXT, due_date TEXT, project_address TEXT, amount REAL DEFAULT 0, balance REAL DEFAULT 0, deposit_paid REAL DEFAULT 0, status TEXT DEFAULT 'unpaid', payment_methods TEXT DEFAULT 'Check, Zelle, or Cash', reference_estimate TEXT, notes TEXT, pdf_path TEXT, qb_id TEXT, qb_link TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')));

-- Website form submissions and calls from unknown numbers, waiting to be turned into customers.
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'converted', 'archived')),
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  details TEXT NOT NULL DEFAULT '{}',
  customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS leads_status ON leads(status, created_at);

-- Follow-up reminders (in addition to each job's next_action / next_action_date).
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  due_date TEXT NOT NULL DEFAULT '',
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  done_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS tasks_open ON tasks(done_at, due_date);

-- Calls/texts already logged from Beside, so a webhook retry never logs twice.
CREATE TABLE IF NOT EXISTS integration_events (
  external_id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
