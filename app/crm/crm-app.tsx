"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

// Private CRM for the owner. Data lives in its own D1 database, ata-website-crm (customers, jobs,
// website leads and follow-ups; estimates and invoices show only when present).

// ---- Types --------------------------------------------------------------------------------
type Customer = {
  id: number; name: string; company: string | null; email: string | null; phone: string | null; address: string | null;
  city: string | null; state: string | null; zip: string | null; type: string; status: string; source: string | null;
  notes: string | null; qb_id: string | null; created_at: string; updated_at: string; open_jobs?: number;
};
type Job = {
  id: number; customer_id: number; customer_name?: string; customer_city?: string | null; title: string; stage: string;
  value: number | null; description: string | null; trade: string | null; start_date: string | null; end_date: string | null;
  next_action: string | null; next_action_date: string | null; created_at: string; updated_at: string;
};
type Task = { id: number; title: string; due_date: string; customer_id: number | null; job_id: number | null; done_at: string | null; customer_name?: string | null; job_title?: string | null };
type JobStep = { job_id: number; job_title: string; title: string; due_date: string; customer_id: number; customer_name: string };
type Activity = { id: number; customer_id: number | null; job_id: number | null; date: string; type: string; subject: string | null; body: string | null; customer_name?: string | null };
type Lead = { id: number; source: string; status: string; name: string; phone: string; email: string; city: string; summary: string; details: string; customer_id: number | null; created_at: string };
type Estimate = { id: number; number: string | null; date: string | null; amount: number; status: string | null; qb_link: string | null };
type Invoice = Estimate & { due_date: string | null; balance: number };
type Property = { id: number; label: string | null; address: string | null; city: string | null; state: string | null; zip: string | null };

const STAGES = [
  ["lead", "Lead"], ["estimate_sent", "Estimate sent"], ["won", "Won"], ["scheduled", "Scheduled"], ["in_progress", "In progress"],
  ["complete", "Complete"], ["invoiced", "Invoiced"], ["paid", "Paid"], ["lost", "Lost"],
] as const;
const CLOSED = ["paid", "lost"];
const stageLabel = (stage: string) => STAGES.find(([key]) => key === stage)?.[1] ?? stage;

const QBO = "https://qbo.intuit.com/app";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const money = (value: number | null | undefined) => (value ? currency.format(value) : "");
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
// Stored timestamps are UTC "YYYY-MM-DD HH:MM:SS"; plain dates are "YYYY-MM-DD".
const toDate = (value: string) => new Date(value.length > 10 ? `${value.replace(" ", "T").replace(/Z?$/, "Z")}` : `${value}T12:00:00Z`);
const when = (value: string | null) =>
  value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", ...(value.length > 10 ? { hour: "numeric", minute: "2-digit" } : {}), timeZone: "America/New_York" }).format(toDate(value)) : "";
const day = (date: string | null) => (date ? new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)) : "No date");

// ---- API ----------------------------------------------------------------------------------
async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const response = await fetch(`/api/crm/${path}`, {
    method: init?.method ?? "GET",
    headers: init?.body ? { "content-type": "application/json" } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    credentials: "same-origin",
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error ?? `Request failed (${response.status})`);
  return data;
}

function useHashRoute() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash.replace(/^#\/?/, ""));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return hash.split("/");
}
const go = (path: string) => { window.location.hash = `/${path}`; };
const formData = (form: HTMLFormElement) => Object.fromEntries(new FormData(form)) as Record<string, string>;

// ---- Shell --------------------------------------------------------------------------------
export function CrmApp() {
  const [section, param] = useHashRoute();
  const [error, setError] = useState("");
  const [newLeads, setNewLeads] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = useCallback(() => setRefreshKey(key => key + 1), []);
  const fail = useCallback((err: unknown) => setError(err instanceof Error ? err.message : String(err)), []);

  useEffect(() => {
    api<{ newLeads: number }>("dashboard").then(data => setNewLeads(data.newLeads)).catch(() => {});
  }, [refreshKey, section]);

  const tabs: [string, string][] = [["today", "Today"], ["leads", `Leads${newLeads ? ` (${newLeads})` : ""}`], ["pipeline", "Pipeline"], ["customers", "Customers"], ["tasks", "Follow-ups"]];
  const current = section || "today";
  const props = { refresh, fail, refreshKey };

  return (
    <div className="crm">
      <header className="crmTop">
        <a href="#/today" className="crmBrand">ATA <span>CRM</span></a>
        <nav aria-label="CRM sections">
          {tabs.map(([key, label]) => (
            <a key={key} href={`#/${key}`} aria-current={current === key || (current === "customer" && key === "customers") ? "page" : undefined}>{label}</a>
          ))}
        </nav>
        <a className="crmExit" href="/cdn-cgi/access/logout">Sign out</a>
      </header>
      {error && <div className="crmError" role="alert">{error} <button type="button" onClick={() => setError("")}>Dismiss</button></div>}
      <main className="crmMain" id="main">
        {current === "today" && <Today {...props} />}
        {current === "leads" && <Leads {...props} />}
        {current === "pipeline" && <Pipeline {...props} />}
        {current === "customers" && <Customers {...props} />}
        {current === "customer" && param && <CustomerDetail id={Number(param)} {...props} />}
        {current === "tasks" && <Tasks {...props} />}
      </main>
    </div>
  );
}

type SectionProps = { refresh: () => void; fail: (err: unknown) => void; refreshKey: number };

function useLoad<T>(path: string | null, deps: unknown[], fail: (err: unknown) => void) {
  const [data, setData] = useState<T | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (!path) return;
    let live = true;
    api<T>(path).then(result => live && setData(result)).catch(fail);
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, version, ...deps]);
  return [data, () => setVersion(v => v + 1)] as const;
}

// ---- Today --------------------------------------------------------------------------------
type DueJob = { id: number; title: string; next_action: string | null; next_action_date: string; customer_id: number; customer_name: string };
type Dashboard = {
  pipeline: { stage: string; count: number; value: number }[]; newLeads: number; tasksDue: Task[]; jobsDue: DueJob[];
  receivables: { count: number; balance: number; overdue: number } | null; recent: Activity[];
};
function Today({ fail, refreshKey, refresh }: SectionProps) {
  const [data, reload] = useLoad<Dashboard>("dashboard", [refreshKey], fail);
  if (!data) return <p className="crmMuted">Loading…</p>;
  const counts = Object.fromEntries(data.pipeline.map(row => [row.stage, row]));
  const jobSteps = data.jobsDue;
  return (
    <div className="crmStack">
      <h1>Today <span className="crmMuted">{day(today())}</span></h1>
      <section className="crmTiles">
        <a href="#/leads" className="crmTile"><strong>{data.newLeads}</strong><span>New leads</span></a>
        <a href="#/tasks" className="crmTile"><strong>{data.tasksDue.length + jobSteps.length}</strong><span>Follow-ups due</span></a>
        {(["estimate_sent", "won", "scheduled", "in_progress"] as const).map(key => (
          <a key={key} href="#/pipeline" className="crmTile"><strong>{counts[key]?.count ?? 0}</strong><span>{stageLabel(key)}</span></a>
        ))}
        {data.receivables && data.receivables.count > 0 && (
          <div className="crmTile"><strong>{money(data.receivables.balance)}</strong><span>Unpaid · {data.receivables.count} invoice{data.receivables.count === 1 ? "" : "s"}{data.receivables.overdue ? ` · ${data.receivables.overdue} overdue` : ""}</span></div>
        )}
      </section>
      <section className="crmCard">
        <h2>Due today or overdue</h2>
        {!data.tasksDue.length && !jobSteps.length && <p className="crmMuted">Nothing due.</p>}
        <TaskList tasks={data.tasksDue} onChange={() => { reload(); refresh(); }} fail={fail} />
        {jobSteps.length > 0 && (
          <ul className="crmTasks">
            {jobSteps.map(job => (
              <li key={`job-${job.id}`} className={job.next_action_date < today() ? "late" : ""}>
                <span className="crmStep">{job.next_action || "Next step"} — <a href={`#/customer/${job.customer_id}`}>{job.customer_name}</a> · {job.title}</span>
                <span className="crmMuted">{day(job.next_action_date)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="crmCard">
        <h2>Recent activity</h2>
        <Timeline items={data.recent} showCustomer />
      </section>
    </div>
  );
}

// ---- Leads --------------------------------------------------------------------------------
function Leads({ fail, refresh, refreshKey }: SectionProps) {
  const [status, setStatus] = useState("new");
  const [data, reload] = useLoad<{ leads: Lead[] }>(`leads?status=${status}`, [refreshKey], fail);
  async function convert(lead: Lead) {
    try {
      const result = await api<{ customerId: number }>(`leads/${lead.id}/convert`, { method: "POST", body: {} });
      refresh();
      go(`customer/${result.customerId}`);
    } catch (err) { fail(err); }
  }
  async function setLead(lead: Lead, next: string) {
    try { await api(`leads/${lead.id}`, { method: "PATCH", body: { status: next } }); reload(); refresh(); } catch (err) { fail(err); }
  }
  return (
    <div className="crmStack">
      <div className="crmRow">
        <h1>Leads</h1>
        <div className="crmSeg" role="group" aria-label="Lead status">
          {["new", "converted", "archived"].map(key => <button key={key} type="button" aria-pressed={status === key} onClick={() => setStatus(key)}>{key}</button>)}
        </div>
      </div>
      <p className="crmMuted">Website forms and calls from unknown numbers land here. Converting one creates (or matches) the customer and starts a job.</p>
      {data?.leads.length === 0 && <p className="crmEmpty">No {status} leads.</p>}
      {data?.leads.map(lead => {
        const details = safeJson(lead.details);
        return (
          <article className="crmCard" key={lead.id}>
            <div className="crmRow">
              <h2>{lead.name || lead.phone || "Unknown"}</h2>
              <span className="crmBadge">{sourceLabel(lead.source)}</span>
            </div>
            <p className="crmMeta">
              {lead.phone && <a href={`tel:${lead.phone}`}>{lead.phone}</a>}
              {lead.email && <a href={`mailto:${lead.email}`}>{lead.email}</a>}
              {lead.city && <span>{lead.city}</span>}
              <span>{when(lead.created_at)}</span>
            </p>
            {details.company && <p><strong>{details.company}</strong>{details.role ? ` · ${details.role}` : ""}</p>}
            {lead.summary && <p>{lead.summary}</p>}
            {details.transcript && <details><summary>Transcript</summary><p className="crmPre">{details.transcript}</p></details>}
            <div className="crmActions">
              {lead.status === "new" && <button type="button" className="crmPrimary" onClick={() => convert(lead)}>Create customer &amp; job</button>}
              {lead.status === "new" && <button type="button" onClick={() => setLead(lead, "archived")}>Archive</button>}
              {lead.status === "archived" && <button type="button" onClick={() => setLead(lead, "new")}>Move back to inbox</button>}
              {lead.customer_id && <a href={`#/customer/${lead.customer_id}`}>Open customer</a>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function safeJson(text: string): Record<string, string> {
  try { return JSON.parse(text) as Record<string, string>; } catch { return {}; }
}
const sourceLabel = (source: string) => ({ contact: "Website form", trade: "Trade form", beside: "Call / text" } as Record<string, string>)[source] ?? source;

// ---- Pipeline -----------------------------------------------------------------------------
function Pipeline({ fail, refreshKey, refresh }: SectionProps) {
  const [data, reload] = useLoad<{ jobs: Job[] }>("jobs", [refreshKey], fail);
  const [showClosed, setShowClosed] = useState(false);
  const stages = STAGES.filter(([key]) => showClosed || !CLOSED.includes(key));
  async function move(job: Job, stage: string) {
    try { await api(`jobs/${job.id}`, { method: "PATCH", body: { stage } }); reload(); refresh(); } catch (err) { fail(err); }
  }
  return (
    <div className="crmStack">
      <div className="crmRow">
        <h1>Pipeline</h1>
        <label className="crmCheck"><input type="checkbox" checked={showClosed} onChange={event => setShowClosed(event.target.checked)} /> Show paid &amp; lost</label>
      </div>
      <div className="crmBoard">
        {stages.map(([key, label]) => {
          const jobs = data?.jobs.filter(job => job.stage === key) ?? [];
          const total = jobs.reduce((sum, job) => sum + (job.value ?? 0), 0);
          return (
            <section className="crmColumn" key={key}>
              <h2>{label} <span className="crmMuted">{jobs.length}{total ? ` · ${money(total)}` : ""}</span></h2>
              {jobs.map(job => (
                <article className="crmJob" key={job.id}>
                  <a href={`#/customer/${job.customer_id}`}><strong>{job.title}</strong></a>
                  <span>{job.customer_name}{job.customer_city ? ` · ${job.customer_city}` : ""}</span>
                  {job.value ? <span>{money(job.value)}</span> : null}
                  {job.next_action && <span>Next: {job.next_action}{job.next_action_date ? ` · ${day(job.next_action_date)}` : ""}</span>}
                  <select aria-label={`Stage for ${job.title}`} value={job.stage} onChange={event => move(job, event.target.value)}>
                    {STAGES.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                  </select>
                </article>
              ))}
            </section>
          );
        })}
      </div>
      <p className="crmMuted">Add a job from a customer&apos;s page.</p>
    </div>
  );
}

// ---- Customers ----------------------------------------------------------------------------
function Customers({ fail, refreshKey }: SectionProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [creating, setCreating] = useState(false);
  const path = `customers?q=${encodeURIComponent(query)}${type ? `&type=${type}` : ""}`;
  const [data] = useLoad<{ customers: Customer[] }>(path, [refreshKey], fail);
  return (
    <div className="crmStack">
      <div className="crmRow">
        <h1>Customers</h1>
        <button type="button" className="crmPrimary" onClick={() => setCreating(value => !value)}>{creating ? "Cancel" : "New customer"}</button>
      </div>
      {creating && <CustomerForm fail={fail} onSaved={id => go(`customer/${id}`)} />}
      <div className="crmRow">
        <input className="crmSearch" type="search" placeholder="Search name, company, phone, email, city" value={query} onChange={event => setQuery(event.target.value)} aria-label="Search customers" />
        <div className="crmSeg" role="group" aria-label="Customer type">
          {[["", "All"], ["residential", "Residential"], ["commercial", "Commercial"]].map(([key, label]) => <button key={key} type="button" aria-pressed={type === key} onClick={() => setType(key)}>{label}</button>)}
        </div>
      </div>
      <ul className="crmList">
        {data?.customers.map(customer => (
          <li key={customer.id}>
            <a href={`#/customer/${customer.id}`}>
              <strong>{customer.name}</strong>
              <span>{[customer.company !== customer.name ? customer.company : "", customer.city, customer.status === "inactive" ? "Inactive" : ""].filter(Boolean).join(" · ")}</span>
              <span>{customer.phone}</span>
              {Number(customer.open_jobs) > 0 ? <span className="crmBadge">{customer.open_jobs} open</span> : <span />}
            </a>
          </li>
        ))}
      </ul>
      {data?.customers.length === 0 && <p className="crmEmpty">No customers found.</p>}
    </div>
  );
}

function CustomerForm({ fail, onSaved }: { fail: (err: unknown) => void; onSaved: (id: number) => void }) {
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await api<{ id: number }>("customers", { method: "POST", body: formData(event.currentTarget) });
      onSaved(result.id);
    } catch (err) { fail(err); }
  }
  return (
    <form className="crmCard crmForm" onSubmit={submit}>
      <label>Name<input name="name" required /></label>
      <label>Type<select name="type" defaultValue="residential"><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label>
      <label>Company<input name="company" /></label>
      <label>Phone<input name="phone" type="tel" /></label>
      <label>Email<input name="email" type="email" /></label>
      <label>City<input name="city" /></label>
      <label className="wide">Notes<textarea name="notes" rows={3} /></label>
      <button type="submit" className="crmPrimary">Save customer</button>
    </form>
  );
}

// ---- Customer detail ----------------------------------------------------------------------
type CustomerData = { customer: Customer; jobs: Job[]; tasks: Task[]; activity: Activity[]; estimates: Estimate[]; invoices: Invoice[]; properties: Property[] };

function CustomerDetail({ id, fail, refresh, refreshKey }: SectionProps & { id: number }) {
  const [data, reload] = useLoad<CustomerData>(`customers/${id}`, [refreshKey], fail);
  const [editing, setEditing] = useState(false);
  const changed = () => { reload(); refresh(); };
  if (!data) return <p className="crmMuted">Loading…</p>;
  const { customer } = data;
  const address = [customer.address, customer.city, customer.state, customer.zip].filter(Boolean).join(", ");

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { await api(`customers/${id}`, { method: "PATCH", body: formData(event.currentTarget) }); setEditing(false); changed(); } catch (err) { fail(err); }
  }
  async function remove() {
    if (!window.confirm(`Delete ${customer.name} and their jobs, follow-ups and notes?`)) return;
    try { await api(`customers/${id}`, { method: "DELETE" }); refresh(); go("customers"); } catch (err) { fail(err); }
  }

  return (
    <div className="crmStack">
      <a href="#/customers" className="crmBack">← Customers</a>
      <section className="crmCard">
        <div className="crmRow">
          <div>
            <h1>{customer.name}</h1>
            <p className="crmMuted">{[customer.company !== customer.name ? customer.company : "", customer.type === "commercial" ? "Commercial" : "Residential", customer.city, customer.status === "inactive" ? "Inactive" : "", customer.source ? `From ${customer.source}` : ""].filter(Boolean).join(" · ")}</p>
          </div>
          <button type="button" onClick={() => setEditing(value => !value)}>{editing ? "Cancel" : "Edit"}</button>
        </div>
        <div className="crmActions">
          {customer.phone && <a className="crmPrimary" href={`tel:${customer.phone}`}>Call {customer.phone}</a>}
          {customer.phone && <a href={`sms:${customer.phone}`}>Text</a>}
          {customer.email && <a href={`mailto:${customer.email}`}>Email</a>}
          {address && <a href={`https://maps.apple.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener">Directions</a>}
          {customer.qb_id && <a href={`${QBO}/customerdetail?nameId=${encodeURIComponent(customer.qb_id)}`} target="_blank" rel="noopener">Open in QuickBooks</a>}
        </div>
        {editing ? (
          <form className="crmForm" onSubmit={save}>
            <label>Name<input name="name" defaultValue={customer.name} required /></label>
            <label>Company<input name="company" defaultValue={customer.company ?? ""} /></label>
            <label>Type<select name="type" defaultValue={customer.type}><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label>
            <label>Status<select name="status" defaultValue={customer.status}><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
            <label>Phone<input name="phone" type="tel" defaultValue={customer.phone ?? ""} /></label>
            <label>Email<input name="email" type="email" defaultValue={customer.email ?? ""} /></label>
            <label>Address<input name="address" defaultValue={customer.address ?? ""} /></label>
            <label>City<input name="city" defaultValue={customer.city ?? ""} /></label>
            <label>State<input name="state" defaultValue={customer.state ?? ""} /></label>
            <label>ZIP<input name="zip" defaultValue={customer.zip ?? ""} /></label>
            <label>QuickBooks customer ID<input name="qb_id" defaultValue={customer.qb_id ?? ""} inputMode="numeric" /></label>
            <label>Source<input name="source" defaultValue={customer.source ?? ""} /></label>
            <label className="wide">Notes<textarea name="notes" rows={4} defaultValue={customer.notes ?? ""} /></label>
            <div className="crmActions wide">
              <button type="submit" className="crmPrimary">Save</button>
              <button type="button" className="crmDanger" onClick={remove}>Delete customer</button>
            </div>
          </form>
        ) : (
          <dl className="crmFacts">
            {customer.email && <><dt>Email</dt><dd>{customer.email}</dd></>}
            {address && <><dt>Address</dt><dd>{address}</dd></>}
            {data.properties.map(property => <Fragment key={property.id}><dt>{property.label || "Property"}</dt><dd>{[property.address, property.city, property.state, property.zip].filter(Boolean).join(", ")}</dd></Fragment>)}
            {customer.notes && <><dt>Notes</dt><dd className="crmPre">{customer.notes}</dd></>}
            <dt>Customer since</dt><dd>{when(customer.created_at)}</dd>
          </dl>
        )}
      </section>

      <section className="crmCard">
        <h2>Jobs</h2>
        {data.jobs.map(job => <JobEditor key={job.id} job={job} fail={fail} onChange={changed} />)}
        <NewJob customer={customer} fail={fail} onSaved={changed} />
      </section>

      {(data.estimates.length > 0 || data.invoices.length > 0) && (
        <section className="crmCard">
          <h2>QuickBooks estimates &amp; invoices</h2>
          <table className="crmTable">
            <thead><tr><th>Document</th><th>Date</th><th>Amount</th><th>Status</th><th /></tr></thead>
            <tbody>
              {data.estimates.map(estimate => (
                <tr key={`e${estimate.id}`}>
                  <td>Estimate {estimate.number}</td><td>{when(estimate.date)}</td><td>{money(estimate.amount)}</td><td>{estimate.status}</td>
                  <td>{estimate.qb_link && <a href={estimate.qb_link} target="_blank" rel="noopener">Open</a>}</td>
                </tr>
              ))}
              {data.invoices.map(invoice => (
                <tr key={`i${invoice.id}`} className={invoice.status === "overdue" ? "late" : ""}>
                  <td>Invoice {invoice.number}</td><td>{when(invoice.date)}</td>
                  <td>{money(invoice.amount)}{invoice.balance > 0 && invoice.status !== "paid" ? <span className="crmMuted"> · owes {money(invoice.balance)}</span> : null}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.qb_link && <a href={invoice.qb_link} target="_blank" rel="noopener">Open</a>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="crmCard">
        <h2>Follow-ups</h2>
        <TaskList tasks={data.tasks} onChange={changed} fail={fail} showCustomer={false} />
        <NewTask customerId={id} fail={fail} onSaved={changed} />
      </section>

      <section className="crmCard">
        <h2>Activity</h2>
        <LogActivity customerId={id} fail={fail} onSaved={changed} />
        <Timeline items={data.activity} />
      </section>
    </div>
  );
}

function JobEditor({ job, fail, onChange }: { job: Job; fail: (err: unknown) => void; onChange: () => void }) {
  const [open, setOpen] = useState(false);
  async function patch(body: Record<string, unknown>) {
    try { await api(`jobs/${job.id}`, { method: "PATCH", body }); onChange(); } catch (err) { fail(err); }
  }
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await patch(formData(event.currentTarget));
    setOpen(false);
  }
  async function remove() {
    if (!window.confirm(`Delete job “${job.title}”?`)) return;
    try { await api(`jobs/${job.id}`, { method: "DELETE" }); onChange(); } catch (err) { fail(err); }
  }
  return (
    <article className="crmJobRow">
      <div className="crmRow">
        <div>
          <strong>{job.title}</strong>
          <p className="crmMuted">{[job.trade, money(job.value), job.next_action ? `Next: ${job.next_action}${job.next_action_date ? ` (${day(job.next_action_date)})` : ""}` : "", `Updated ${when(job.updated_at)}`].filter(Boolean).join(" · ")}</p>
        </div>
        <select aria-label="Stage" value={job.stage} onChange={event => patch({ stage: event.target.value })}>
          {STAGES.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
        </select>
      </div>
      <div className="crmActions">
        <button type="button" onClick={() => setOpen(value => !value)}>{open ? "Cancel" : "Edit job"}</button>
      </div>
      {open && (
        <form className="crmForm" onSubmit={save}>
          <label>Title<input name="title" defaultValue={job.title} required /></label>
          <label>Systems / trade<input name="trade" defaultValue={job.trade ?? ""} placeholder="Lutron RA3, cameras…" /></label>
          <label>Value<input name="value" inputMode="decimal" defaultValue={job.value ? String(job.value) : ""} /></label>
          <label>Start date<input name="start_date" type="date" defaultValue={job.start_date ?? ""} /></label>
          <label>Next step<input name="next_action" defaultValue={job.next_action ?? ""} placeholder="Send proposal" /></label>
          <label>Next step date<input name="next_action_date" type="date" defaultValue={job.next_action_date ?? ""} /></label>
          <label className="wide">Description<textarea name="description" rows={3} defaultValue={job.description ?? ""} /></label>
          <div className="crmActions wide">
            <button type="submit" className="crmPrimary">Save job</button>
            <button type="button" className="crmDanger" onClick={remove}>Delete job</button>
          </div>
        </form>
      )}
      {!open && job.description && <p className="crmPre">{job.description}</p>}
    </article>
  );
}

function NewJob({ customer, fail, onSaved }: { customer: Customer; fail: (err: unknown) => void; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { await api("jobs", { method: "POST", body: { ...formData(event.currentTarget), customer_id: customer.id } }); setOpen(false); onSaved(); } catch (err) { fail(err); }
  }
  if (!open) return <button type="button" onClick={() => setOpen(true)}>+ Add job</button>;
  return (
    <form className="crmForm" onSubmit={submit}>
      <label>Title<input name="title" required placeholder="RA3 lighting – whole home" /></label>
      <label>Stage<select name="stage" defaultValue="lead">{STAGES.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label>
      <label>Systems / trade<input name="trade" /></label>
      <label>Value<input name="value" inputMode="decimal" /></label>
      <label>Next step<input name="next_action" placeholder="Schedule walk-through" /></label>
      <label>Next step date<input name="next_action_date" type="date" /></label>
      <div className="crmActions wide">
        <button type="submit" className="crmPrimary">Add job</button>
        <button type="button" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </form>
  );
}

function LogActivity({ customerId, fail, onSaved }: { customerId: number; fail: (err: unknown) => void; onSaved: () => void }) {
  const [type, setType] = useState("note");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = formData(form);
    try {
      await api("activity", { method: "POST", body: { customer_id: customerId, type, direction: values.direction ?? "", subject: values.subject } });
      form.reset();
      onSaved();
    } catch (err) { fail(err); }
  }
  return (
    <form className="crmLog" onSubmit={submit}>
      <div className="crmSeg" role="group" aria-label="Activity type">
        {[["note", "Note"], ["call", "Call"], ["text", "Text"], ["email", "Email"]].map(([key, label]) => <button key={key} type="button" aria-pressed={type === key} onClick={() => setType(key)}>{label}</button>)}
      </div>
      {type !== "note" && <select name="direction" defaultValue="out" aria-label="Direction"><option value="out">Outgoing</option><option value="in">Incoming</option></select>}
      <textarea name="subject" rows={2} required placeholder={type === "note" ? "Add a note…" : "What was said?"} aria-label="Summary" />
      <button type="submit" className="crmPrimary">Save</button>
    </form>
  );
}

function Timeline({ items, showCustomer = false }: { items: Activity[]; showCustomer?: boolean }) {
  if (!items.length) return <p className="crmMuted">No activity yet.</p>;
  const icon: Record<string, string> = { note: "✎", call: "☎", text: "✉", email: "@", stage: "→", lead: "★" };
  return (
    <ol className="crmTimeline">
      {items.map(item => (
        <li key={item.id}>
          <span className="crmIcon" aria-hidden="true">{icon[item.type] ?? "·"}</span>
          <div>
            <p>
              {showCustomer && item.customer_id && <><a href={`#/customer/${item.customer_id}`}>{item.customer_name}</a> · </>}
              {item.subject || item.type}
            </p>
            {item.body && <details><summary>Details</summary><p className="crmPre">{item.body}</p></details>}
            <time className="crmMuted">{when(item.date)}</time>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ---- Tasks --------------------------------------------------------------------------------
function TaskList({ tasks, onChange, fail, showCustomer = true }: { tasks: Task[]; onChange: () => void; fail: (err: unknown) => void; showCustomer?: boolean }) {
  const now = today();
  async function toggle(task: Task) {
    try { await api(`tasks/${task.id}`, { method: "PATCH", body: { done: !task.done_at } }); onChange(); } catch (err) { fail(err); }
  }
  async function remove(task: Task) {
    try { await api(`tasks/${task.id}`, { method: "DELETE" }); onChange(); } catch (err) { fail(err); }
  }
  if (!tasks.length) return null;
  return (
    <ul className="crmTasks">
      {tasks.map(task => (
        <li key={task.id} className={task.done_at ? "done" : task.due_date && task.due_date < now ? "late" : ""}>
          <label><input type="checkbox" checked={Boolean(task.done_at)} onChange={() => toggle(task)} /> {task.title}</label>
          <span className="crmMuted">
            {day(task.due_date)}
            {showCustomer && task.customer_id && <> · <a href={`#/customer/${task.customer_id}`}>{task.customer_name}</a></>}
          </span>
          <button type="button" className="crmLink" aria-label={`Delete ${task.title}`} onClick={() => remove(task)}>×</button>
        </li>
      ))}
    </ul>
  );
}

function NewTask({ customerId, fail, onSaved }: { customerId?: number; fail: (err: unknown) => void; onSaved: () => void }) {
  const tomorrow = useMemo(() => {
    const date = new Date(`${today()}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().slice(0, 10);
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api("tasks", { method: "POST", body: { ...formData(form), customer_id: customerId ?? null } });
      form.reset();
      onSaved();
    } catch (err) { fail(err); }
  }
  return (
    <form className="crmLog" onSubmit={submit}>
      <input name="title" required placeholder="Call back about the estimate" aria-label="Follow-up" />
      <input name="due_date" type="date" defaultValue={tomorrow} aria-label="Due date" />
      <button type="submit" className="crmPrimary">Add follow-up</button>
    </form>
  );
}

function Tasks({ fail, refreshKey, refresh }: SectionProps) {
  const [filter, setFilter] = useState("open");
  const [data, reload] = useLoad<{ tasks: Task[]; jobSteps: JobStep[] }>(`tasks?filter=${filter}`, [refreshKey], fail);
  const now = today();
  const tasks = data?.tasks ?? [];
  const groups = filter === "done"
    ? [["Completed", tasks]] as const
    : ([
        ["Overdue", tasks.filter(task => task.due_date && task.due_date < now)],
        ["Today", tasks.filter(task => task.due_date === now)],
        ["Upcoming", tasks.filter(task => task.due_date > now)],
        ["No date", tasks.filter(task => !task.due_date)],
      ] as const);
  const changed = () => { reload(); refresh(); };
  return (
    <div className="crmStack">
      <div className="crmRow">
        <h1>Follow-ups</h1>
        <div className="crmSeg" role="group" aria-label="Filter">
          {[["open", "Open"], ["done", "Done"]].map(([key, label]) => <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}
        </div>
      </div>
      {filter === "open" && <section className="crmCard"><NewTask fail={fail} onSaved={changed} /></section>}
      {groups.map(([label, list]) => list.length > 0 && (
        <section className="crmCard" key={label}>
          <h2>{label}</h2>
          <TaskList tasks={[...list]} onChange={changed} fail={fail} />
        </section>
      ))}
      {filter === "open" && (data?.jobSteps.length ?? 0) > 0 && (
        <section className="crmCard">
          <h2>Job next steps</h2>
          <ul className="crmTasks">
            {data?.jobSteps.map(step => (
              <li key={step.job_id} className={step.due_date && step.due_date < now ? "late" : ""}>
                <span className="crmStep">{step.title} — <a href={`#/customer/${step.customer_id}`}>{step.customer_name}</a> · {step.job_title}</span>
                <span className="crmMuted">{day(step.due_date)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {tasks.length === 0 && !data?.jobSteps.length && <p className="crmEmpty">Nothing here.</p>}
    </div>
  );
}
