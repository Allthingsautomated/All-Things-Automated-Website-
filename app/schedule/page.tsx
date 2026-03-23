import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Service | All Things Automated',
  description: 'Schedule a smart home consultation, installation, or service call online. On-site estimates, smart thermostat installs, security cameras, EV chargers, and more.',
}

const SERVICES = [
  { name: 'On-Site Consultation & Estimate', price: '$100', duration: '60 min', desc: 'In-home assessment — credited toward your project', icon: '🏠' },
  { name: 'Smart Home System Installation', price: '$500', duration: '4 hrs', desc: 'Full smart lighting, voice control & security setup', icon: '⚡' },
  { name: 'Security Camera Installation', price: '$250', duration: '2 hrs', desc: 'Indoor/outdoor mounting & full configuration', icon: '📷' },
  { name: 'Smart Thermostat Installation', price: '$175', duration: '90 min', desc: 'Nest, Ecobee, Honeywell & compatible devices', icon: '🌡️' },
  { name: 'EV Charger Installation', price: '$350', duration: '3 hrs', desc: 'Level 2 (240V) charger mounting & wiring', icon: '🔌' },
  { name: 'Smart Lock Installation', price: '$125', duration: '60 min', desc: 'Hardware removal, install & access code setup', icon: '🔒' },
  { name: 'Service Call', price: '$150', duration: '60 min', desc: 'Diagnostics & repairs for smart home systems', icon: '🔧' },
  { name: 'Annual Maintenance', price: '$150', duration: '90 min', desc: 'Firmware updates, connectivity checks & inspection', icon: '✅' },
]

export default function SchedulePage() {
  return (
    <>
      {/* HERO */}
      <section id="main" className="hero-page">
        <h1>Book a Service</h1>
        <p>Pick your service and choose a time that works for you. Online payment required to confirm.</p>
      </section>

      {/* SERVICE PREVIEWS */}
      <section style={{ backgroundColor: 'var(--color-dark-2)', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Choose Your Service</h2>
            <p className="section-subtitle">Select the service below in the booking calendar to see available times and complete your booking.</p>
          </div>
          <div className="section-grid-4" style={{ marginTop: '40px', gap: '16px' }}>
            {SERVICES.map(s => (
              <div key={s.name} style={{
                background: 'var(--color-dark-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}>
                <span style={{ fontSize: '24px' }}>{s.icon}</span>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-white)', lineHeight: 1.3 }}>{s.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text)' }}>{s.desc}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                  <span style={{
                    background: 'rgba(74,159,255,0.15)', color: 'var(--color-primary)',
                    padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 700
                  }}>{s.price}</span>
                  <span style={{ color: 'var(--color-text)', fontSize: '12px' }}>{s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING EMBED */}
      <section style={{ backgroundColor: 'var(--color-dark)', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="section-header center" style={{ marginBottom: '40px' }}>
            <div className="section-label">Online Booking</div>
            <h2 className="section-title">Pick Your Date & Time</h2>
            <p className="section-subtitle">Secured with Acuity Scheduling. Online payment required to confirm your appointment.</p>
          </div>

          {/* Acuity embed */}
          <div style={{
            background: 'var(--color-dark-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}>
            <iframe
              src="https://allthingsautomatedcalendar.as.me/schedule/04821538?embed=1"
              title="Book a Service – All Things Automated"
              width="100%"
              height="900"
              frameBorder="0"
              style={{ display: 'block' }}
            />
          </div>

          <p style={{
            textAlign: 'center', marginTop: '20px',
            color: 'var(--color-text)', fontSize: '13px'
          }}>
            Having trouble? Call us directly at{' '}
            <a href="tel:+19412635325" style={{ color: 'var(--color-primary)' }}>(941) 263-5325</a>
          </p>
        </div>
      </section>
    </>
  )
}
