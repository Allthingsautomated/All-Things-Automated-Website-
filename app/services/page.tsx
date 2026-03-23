import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Home Services | All Things Automated',
  description: 'Smart lighting, security cameras, climate control, and full home automation services in Sarasota, FL.',
}

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section id="main" className="hero-page">
        <h1>Smart Home Services</h1>
        <p>Professional installation of cutting-edge automation systems for Sarasota homes and businesses.</p>
      </section>

      {/* SERVICES DETAIL */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-grid-2-gap" style={{ alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <div className="section-label">Lighting Design</div>
              <h2>Smart Lighting Control</h2>
              <p style={{ marginBottom: '24px' }}>
                Transform your home with intelligent lighting that adapts to your lifestyle. We install premium systems from Lutron, Philips Hue, and others, offering scene control, color tuning, daylight harvesting, and seamless integration with voice assistants.
              </p>
              <ul style={{ color: 'var(--color-text)', lineHeight: 2 }}>
                <li>✓ Lutron Caséta dimming and scene control</li>
                <li>✓ Philips Hue color-tuning systems</li>
                <li>✓ Automated schedules and daylight syncing</li>
                <li>✓ Occupancy-based controls</li>
              </ul>
              <a href="/contact" className="btn btn-primary" style={{ marginTop: '24px' }}>
                Get a Lighting Quote
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80"
                alt="Smart Lighting"
                style={{ borderRadius: '16px', width: '100%' }}
              />
            </div>
          </div>

          <div className="section-grid-2-gap" style={{ alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
                alt="Security"
                style={{ borderRadius: '16px', width: '100%' }}
              />
            </div>
            <div>
              <div className="section-label">Security Solutions</div>
              <h2>Security &amp; Cameras</h2>
              <p style={{ marginBottom: '24px' }}>
                Professional-grade security systems designed to protect what matters most. From discreet cameras with AI detection to full perimeter systems, we offer solutions from Ring, Luma, UniFi, and other industry leaders.
              </p>
              <ul style={{ color: 'var(--color-text)', lineHeight: 2 }}>
                <li>✓ 4K/8K camera systems with AI detection</li>
                <li>✓ Smart door locks and access control</li>
                <li>✓ 24/7 cloud storage and local backup</li>
                <li>✓ Mobile alerts and live viewing</li>
              </ul>
              <a href="/contact" className="btn btn-primary" style={{ marginTop: '24px' }}>
                Get a Security Quote
              </a>
            </div>
          </div>

          <div className="section-grid-2-gap" style={{ alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <div className="section-label">Climate</div>
              <h2>Climate Control &amp; Thermostat</h2>
              <p style={{ marginBottom: '24px' }}>
                Maintain perfect comfort year-round with intelligent climate control. We design zoned systems with Ecobee, Honeywell, and other premium thermostats that learn your preferences and optimize energy efficiency.
              </p>
              <ul style={{ color: 'var(--color-text)', lineHeight: 2 }}>
                <li>✓ Smart thermostats with learning</li>
                <li>✓ Multi-zone temperature control</li>
                <li>✓ Energy usage reports and optimization</li>
                <li>✓ Voice control and mobile access</li>
              </ul>
              <a href="/contact" className="btn btn-primary" style={{ marginTop: '24px' }}>
                Get a Climate Quote
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Climate"
                style={{ borderRadius: '16px', width: '100%' }}
              />
            </div>
          </div>

          <div className="section-grid-2-gap" style={{ alignItems: 'center' }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&q=80"
                alt="Automation"
                style={{ borderRadius: '16px', width: '100%' }}
              />
            </div>
            <div>
              <div className="section-label">Full Integration</div>
              <h2>Complete Home Automation</h2>
              <p style={{ marginBottom: '24px' }}>
                Unify your entire home with Control4 and custom automation systems. One app controls everything—lighting, security, climate, entertainment, and more. Create scenes, schedules, and automations that work seamlessly together.
              </p>
              <ul style={{ color: 'var(--color-text)', lineHeight: 2 }}>
                <li>✓ Control4 systems and integration</li>
                <li>✓ Custom scenes and automations</li>
                <li>✓ Entertainment system control</li>
                <li>✓ Mobile app and voice control</li>
              </ul>
              <a href="/contact" className="btn btn-primary" style={{ marginTop: '24px' }}>
                Get an Automation Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Automate Your Home?</h2>
          <p>Let&apos;s discuss which services are right for you.</p>
          <a href="/schedule" className="btn btn-primary btn-lg">
            📅 Book Online Now
          </a>
        </div>
      </section>
    </>
  )
}
