'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── CHANGE THIS PASSWORD ───────────────────────────────────────────────────
const ADMIN_PASSWORD = 'ATA2024!'
// ────────────────────────────────────────────────────────────────────────────

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  city?: string
  service?: string
  message?: string
  source?: string
  received: string
  tier?: string
}

const SERVICE_COLORS: Record<string, string> = {
  'Smart Lighting':    '#4a9fff',
  'Security Cameras':  '#f59e0b',
  'Climate Control':   '#10b981',
  'Full Automation':   '#8b5cf6',
  'Smart Locks':       '#ef4444',
  'Home Theater':      '#ec4899',
}

function serviceColor(s?: string) {
  if (!s) return '#64748b'
  for (const [k, v] of Object.entries(SERVICE_COLORS)) {
    if (s.toLowerCase().includes(k.toLowerCase())) return v
  }
  return '#4a9fff'
}

function fmt(iso: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function isThisWeek(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const start = new Date(now); start.setDate(now.getDate() - 7)
  return d >= start
}

function isThisMonth(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}

export default function AdminPage() {
  const [authed, setAuthed]           = useState(false)
  const [pw, setPw]                   = useState('')
  const [pwError, setPwError]         = useState(false)
  const [leads, setLeads]             = useState<Lead[]>([])
  const [loading, setLoading]         = useState(false)
  const [search, setSearch]           = useState('')
  const [filterService, setFilterService] = useState('All')
  const [filterSource, setFilterSource]   = useState('All')
  const [sortBy, setSortBy]           = useState<'newest'|'oldest'>('newest')
  const [contacted, setContacted]     = useState<Record<string,boolean>>({})
  const [selected, setSelected]       = useState<Lead|null>(null)
  const [copyMsg, setCopyMsg]         = useState('')

  // Persist auth in session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ok = sessionStorage.getItem('ata_admin_auth')
      if (ok === '1') setAuthed(true)
      const saved = localStorage.getItem('ata_contacted')
      if (saved) setContacted(JSON.parse(saved))
    }
  }, [])

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem('ata_admin_auth', '1')
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 2000)
    }
  }

  const logout = () => {
    setAuthed(false)
    sessionStorage.removeItem('ata_admin_auth')
  }

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads((data.leads || []).reverse())
    } catch {
      setLeads([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchLeads()
  }, [authed, fetchLeads])

  const toggleContacted = (id: string) => {
    const next = { ...contacted, [id]: !contacted[id] }
    setContacted(next)
    localStorage.setItem('ata_contacted', JSON.stringify(next))
  }

  const exportCSV = () => {
    const headers = ['Name','Email','Phone','City','Service','Message','Source','Received','Contacted']
    const rows = filtered.map(l => [
      l.name, l.email, l.phone||'', l.city||'', l.service||'',
      (l.message||'').replace(/,/g,' '), l.source||'',
      l.received, contacted[l.id] ? 'Yes' : 'No'
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = `ata-leads-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopyMsg(email)
      setTimeout(() => setCopyMsg(''), 2000)
    })
  }

  // Stats
  const total        = leads.length
  const thisWeek     = leads.filter(l => isThisWeek(l.received)).length
  const thisMonth    = leads.filter(l => isThisMonth(l.received)).length
  const contactedCt  = leads.filter(l => contacted[l.id]).length
  const services     = [...new Set(leads.map(l => l.service).filter(Boolean))] as string[]
  const sources      = [...new Set(leads.map(l => l.source).filter(Boolean))] as string[]
  const topService   = services.sort((a,b) =>
    leads.filter(l=>l.service===b).length - leads.filter(l=>l.service===a).length
  )[0] || '—'

  // Filter + sort
  const filtered = leads
    .filter(l => filterService === 'All' || l.service === filterService)
    .filter(l => filterSource  === 'All' || l.source  === filterSource)
    .filter(l => {
      const q = search.toLowerCase()
      return !q || [l.name,l.email,l.phone,l.city,l.service,l.message]
        .some(v => v?.toLowerCase().includes(q))
    })
    .sort((a,b) => sortBy === 'newest'
      ? new Date(b.received).getTime() - new Date(a.received).getTime()
      : new Date(a.received).getTime() - new Date(b.received).getTime()
    )

  // ─── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--color-dark)',
        fontFamily: 'var(--font-body)'
      }}>
        <div style={{
          background: 'var(--color-dark-card)', border: '1px solid var(--color-border)',
          borderRadius: '16px', padding: '48px 40px', width: '360px',
          textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔐</div>
          <h2 style={{ color: 'var(--color-white)', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
            Admin Dashboard
          </h2>
          <p style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '32px' }}>
            All Things Automated
          </p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '8px',
              border: `1px solid ${pwError ? '#ef4444' : 'var(--color-border)'}`,
              background: 'var(--color-dark)', color: 'var(--color-white)',
              fontSize: '15px', marginBottom: '12px', boxSizing: 'border-box',
              outline: 'none', transition: 'border-color 0.2s'
            }}
          />
          {pwError && (
            <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>
              Incorrect password
            </p>
          )}
          <button
            onClick={login}
            style={{
              width: '100%', padding: '12px', borderRadius: '8px',
              background: 'var(--color-primary)', color: 'white', border: 'none',
              fontSize: '15px', fontWeight: 600, cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <a href="/" style={{ display:'block', marginTop:'20px', color:'var(--color-text)', fontSize:'13px' }}>
            ← Back to site
          </a>
        </div>
      </div>
    )
  }

  // ─── DASHBOARD ─────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--color-dark)',
      fontFamily: 'var(--font-body)', color: 'var(--color-white)',
      paddingTop: '72px'
    }}>
      {/* TOPBAR */}
      <div style={{
        background: 'var(--color-dark-card)', borderBottom: '1px solid var(--color-border)',
        padding: '0 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '60px', position: 'sticky', top: '72px', zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: '16px' }}>ATA Admin</span>
          <span style={{
            background: 'rgba(74,159,255,0.15)', color: 'var(--color-primary)',
            padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 600
          }}>
            Dashboard
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={fetchLeads}
            style={{
              background: 'rgba(74,159,255,0.1)', border: '1px solid var(--color-primary)',
              color: 'var(--color-primary)', padding: '6px 14px', borderRadius: '8px',
              fontSize: '13px', cursor: 'pointer', fontWeight: 600
            }}
          >
            {loading ? '⟳ Refreshing…' : '↻ Refresh'}
          </button>
          <button
            onClick={exportCSV}
            style={{
              background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981',
              color: '#10b981', padding: '6px 14px', borderRadius: '8px',
              fontSize: '13px', cursor: 'pointer', fontWeight: 600
            }}
          >
            ↓ Export CSV
          </button>
          <a href="/" style={{
            color: 'var(--color-text)', fontSize: '13px', textDecoration: 'none'
          }}>
            ← Site
          </a>
          <button
            onClick={logout}
            style={{
              background: 'transparent', border: '1px solid var(--color-border)',
              color: 'var(--color-text)', padding: '6px 14px', borderRadius: '8px',
              fontSize: '13px', cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Leads',    value: total,        color: '#4a9fff', icon: '📋' },
            { label: 'This Week',      value: thisWeek,     color: '#8b5cf6', icon: '📅' },
            { label: 'This Month',     value: thisMonth,    color: '#10b981', icon: '📈' },
            { label: 'Contacted',      value: contactedCt,  color: '#f59e0b', icon: '✅' },
            { label: 'Top Service',    value: topService,   color: '#ec4899', icon: '⭐', small: true },
          ].map(card => (
            <div key={card.label} style={{
              background: 'var(--color-dark-card)', border: '1px solid var(--color-border)',
              borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: card.color, borderRadius: '12px 12px 0 0'
              }} />
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>{card.icon}</div>
              <div style={{
                fontSize: card.small ? '16px' : '28px',
                fontWeight: 700, color: 'var(--color-white)',
                lineHeight: 1.2, marginBottom: '4px'
              }}>
                {card.value}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text)', fontWeight: 500 }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* SERVICE BREAKDOWN */}
        {services.length > 0 && (
          <div style={{
            background: 'var(--color-dark-card)', border: '1px solid var(--color-border)',
            borderRadius: '12px', padding: '20px', marginBottom: '24px'
          }}>
            <div style={{ fontSize: '13px', color: 'var(--color-text)', fontWeight: 600, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Leads by Service
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {services.map(s => {
                const count = leads.filter(l => l.service === s).length
                const pct   = Math.round((count / total) * 100)
                return (
                  <div key={s} style={{
                    background: 'rgba(255,255,255,0.05)', borderRadius: '8px',
                    padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: serviceColor(s), display: 'inline-block', flexShrink: 0
                    }} />
                    <span style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>{s}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-white)' }}>
                      {count}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text)' }}>({pct}%)</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* FILTERS */}
        <div style={{
          display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center'
        }}>
          <input
            placeholder="🔍  Search leads…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: '1', minWidth: '200px', padding: '10px 14px', borderRadius: '8px',
              border: '1px solid var(--color-border)', background: 'var(--color-dark-card)',
              color: 'var(--color-white)', fontSize: '14px', outline: 'none'
            }}
          />
          <select
            value={filterService}
            onChange={e => setFilterService(e.target.value)}
            style={{
              padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)',
              background: 'var(--color-dark-card)', color: 'var(--color-white)',
              fontSize: '14px', cursor: 'pointer', outline: 'none'
            }}
          >
            <option value="All">All Services</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={filterSource}
            onChange={e => setFilterSource(e.target.value)}
            style={{
              padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)',
              background: 'var(--color-dark-card)', color: 'var(--color-white)',
              fontSize: '14px', cursor: 'pointer', outline: 'none'
            }}
          >
            <option value="All">All Sources</option>
            {sources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'newest'|'oldest')}
            style={{
              padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)',
              background: 'var(--color-dark-card)', color: 'var(--color-white)',
              fontSize: '14px', cursor: 'pointer', outline: 'none'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <span style={{ fontSize: '13px', color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
            {filtered.length} of {total} leads
          </span>
        </div>

        {/* LEADS TABLE */}
        <div style={{
          background: 'var(--color-dark-card)', border: '1px solid var(--color-border)',
          borderRadius: '12px', overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text)' }}>
              Loading leads…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text)' }}>
              {total === 0 ? 'No leads yet. Submit the contact form to test.' : 'No leads match your filters.'}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Name','Contact','City','Service','Source','Received','Status',''].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left', fontSize: '11px',
                      color: 'var(--color-text)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                      whiteSpace: 'nowrap'
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border)' : 'none',
                      background: contacted[lead.id] ? 'rgba(16,185,129,0.03)' : 'transparent',
                      transition: 'background 0.15s'
                    }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-white)' }}>
                        {lead.name || '—'}
                      </div>
                      {lead.message && (
                        <div style={{
                          fontSize: '12px', color: 'var(--color-text)',
                          maxWidth: '160px', overflow: 'hidden',
                          textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px'
                        }}>
                          {lead.message}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {lead.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <a href={`mailto:${lead.email}`} style={{
                            color: 'var(--color-primary)', fontSize: '13px', textDecoration: 'none'
                          }}>
                            {lead.email}
                          </a>
                          <button
                            onClick={() => copyEmail(lead.email)}
                            title="Copy email"
                            style={{
                              background: 'transparent', border: 'none', cursor: 'pointer',
                              color: 'var(--color-text)', fontSize: '11px', padding: '2px 4px'
                            }}
                          >
                            {copyMsg === lead.email ? '✓' : '⎘'}
                          </button>
                        </div>
                      )}
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} style={{
                          color: 'var(--color-text-light)', fontSize: '13px',
                          display: 'block', marginTop: '2px', textDecoration: 'none'
                        }}>
                          {lead.phone}
                        </a>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--color-text-light)' }}>
                      {lead.city || '—'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {lead.service ? (
                        <span style={{
                          background: `${serviceColor(lead.service)}22`,
                          color: serviceColor(lead.service),
                          padding: '3px 10px', borderRadius: '100px',
                          fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap'
                        }}>
                          {lead.service}
                        </span>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: 'var(--color-text)' }}>
                      {lead.source || '—'}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                      {fmt(lead.received)}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => toggleContacted(lead.id)}
                        style={{
                          padding: '4px 12px', borderRadius: '100px', fontSize: '12px',
                          fontWeight: 600, cursor: 'pointer', border: 'none',
                          background: contacted[lead.id] ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)',
                          color: contacted[lead.id] ? '#10b981' : 'var(--color-text)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {contacted[lead.id] ? '✓ Done' : '○ Pending'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => setSelected(lead)}
                        style={{
                          background: 'rgba(74,159,255,0.1)', border: '1px solid rgba(74,159,255,0.3)',
                          color: 'var(--color-primary)', padding: '4px 10px',
                          borderRadius: '6px', fontSize: '12px', cursor: 'pointer'
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      {selected && (
        <div
          onClick={e => e.target === e.currentTarget && setSelected(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100, padding: '20px'
          }}
        >
          <div style={{
            background: 'var(--color-dark-card)', border: '1px solid var(--color-border)',
            borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '520px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: 'var(--color-white)' }}>
                  {selected.name || 'Unknown'}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--color-text)', marginTop: '4px' }}>
                  {fmt(selected.received)}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'transparent', border: 'none', color: 'var(--color-text)',
                  fontSize: '22px', cursor: 'pointer', lineHeight: 1
                }}
              >×</button>
            </div>

            {[
              { label: 'Email',   value: selected.email,   link: `mailto:${selected.email}` },
              { label: 'Phone',   value: selected.phone,   link: `tel:${selected.phone}` },
              { label: 'City',    value: selected.city },
              { label: 'Service', value: selected.service },
              { label: 'Source',  value: selected.source },
            ].map(row => row.value ? (
              <div key={row.label} style={{
                display: 'flex', gap: '16px', padding: '10px 0',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <span style={{ width: '70px', fontSize: '12px', color: 'var(--color-text)', flexShrink: 0, fontWeight: 600, paddingTop: '1px' }}>
                  {row.label}
                </span>
                {row.link ? (
                  <a href={row.link} style={{ color: 'var(--color-primary)', fontSize: '14px', textDecoration: 'none' }}>
                    {row.value}
                  </a>
                ) : (
                  <span style={{ color: 'var(--color-white)', fontSize: '14px' }}>{row.value}</span>
                )}
              </div>
            ) : null)}

            {selected.message && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text)', fontWeight: 600, marginBottom: '8px' }}>
                  MESSAGE
                </div>
                <div style={{
                  background: 'var(--color-dark)', borderRadius: '8px', padding: '14px',
                  fontSize: '14px', color: 'var(--color-text-light)', lineHeight: 1.6
                }}>
                  {selected.message}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              {selected.email && (
                <a
                  href={`mailto:${selected.email}?subject=Re: Your Smart Home Inquiry&body=Hi ${selected.name?.split(' ')[0]},`}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px', textAlign: 'center',
                    background: 'var(--color-primary)', color: 'white', textDecoration: 'none',
                    fontSize: '14px', fontWeight: 600
                  }}
                >
                  ✉ Reply by Email
                </a>
              )}
              {selected.phone && (
                <a
                  href={`tel:${selected.phone}`}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px', textAlign: 'center',
                    background: 'rgba(16,185,129,0.15)', color: '#10b981',
                    border: '1px solid #10b981', textDecoration: 'none',
                    fontSize: '14px', fontWeight: 600
                  }}
                >
                  📞 Call
                </a>
              )}
            </div>

            <button
              onClick={() => { toggleContacted(selected.id); setSelected(null) }}
              style={{
                width: '100%', marginTop: '10px', padding: '10px', borderRadius: '8px',
                background: contacted[selected.id] ? 'rgba(100,116,139,0.15)' : 'rgba(16,185,129,0.1)',
                border: `1px solid ${contacted[selected.id] ? 'var(--color-border)' : '#10b981'}`,
                color: contacted[selected.id] ? 'var(--color-text)' : '#10b981',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {contacted[selected.id] ? 'Mark as Pending' : '✓ Mark as Contacted'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
