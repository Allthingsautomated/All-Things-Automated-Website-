import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About All Things Automated | Smart Home Experts',
  description: 'Learn about Jorge and All Things Automated, Sarasota\'s premier smart home company since 2019.',
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section id="main" className="hero-page">
        <h1>About All Things Automated</h1>
        <p>We&apos;re a Sarasota-based smart home company dedicated to bringing the latest technology into homes with expertise, care, and professionalism.</p>
      </section>

      {/* FOUNDER SECTION */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-grid-2-gap" style={{ alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                alt="Jorge, Founder of All Things Automated"
                className="about-image"
                loading="lazy"
                style={{
                  borderRadius: '16px',
                  width: '100%',
                  objectFit: 'cover',
                  maxHeight: '520px',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '24px',
                  background: 'var(--color-primary)',
                  color: '#000',
                  padding: '14px 22px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                Founded in Sarasota, FL · 2019
              </div>
            </div>
            <div style={{ paddingLeft: '16px' }}>
              <div className="section-label">Meet the Founder</div>
              <h2 style={{ marginBottom: '8px' }}>Hi, I&apos;m Jorge.</h2>
              <p style={{ marginBottom: '16px', lineHeight: 1.8, color: 'var(--color-primary)', fontWeight: 500, fontSize: '17px' }}>
                Founder &amp; Lead Automation Specialist
              </p>
              <p style={{ marginBottom: '16px', lineHeight: 1.8 }}>
                I started All Things Automated with one core conviction: technology should simplify your life, not complicate it. Too many smart home companies sell expensive systems and disappear. I&apos;m different. I stay involved, support my clients long-term, and take pride in every single installation.
              </p>
              <p style={{ lineHeight: 1.8, marginBottom: '24px' }}>
                With years of hands-on experience in smart home automation, electrical work, and customer service, I&apos;m licensed, insured, and hold myself to the highest standards. Whether you&apos;re automating a single room or your entire estate, I treat your home like my own.
              </p>
              <a href="/contact" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Request a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section style={{ backgroundColor: 'var(--color-dark-2)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">What Drives Us</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="section-grid-3">
            <div className="values-card">
              <div className="service-icon" style={{ margin: '0 auto 20px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Expert Installation</h3>
              <p>Every system we install is handled by experienced technicians who understand the technology inside and out. No shortcuts, no guessing.</p>
            </div>
            <div className="values-card">
              <div className="service-icon" style={{ margin: '0 auto 20px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Premium Brands Only</h3>
              <p>We partner with industry-leading brands like Lutron, Control4, Ring, and Honeywell. Your home deserves the best technology available.</p>
            </div>
            <div className="values-card">
              <div className="service-icon" style={{ margin: '0 auto 20px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>White-Glove Service</h3>
              <p>From consultation to follow-up support, we&apos;re here for you. Clear communication, professional demeanor, and customer-first decisions — always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ATA */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Why Choose All Things Automated?</h2>
          </div>
          <div className="section-grid-2" style={{ marginTop: '40px', gap: '48px' }}>
            <div>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Local Expertise</h3>
              <p style={{ lineHeight: 1.8, marginBottom: '32px' }}>
                We&apos;re based in Sarasota and have been serving the Gulf Coast since 2019. We know the climate, the architecture, and the needs of local homes.
              </p>

              <h3 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Licensed &amp; Insured</h3>
              <p style={{ lineHeight: 1.8, marginBottom: '32px' }}>
                Full licensing and insurance mean your project is protected. We follow all local codes and standards.
              </p>

              <h3 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Long-Term Support</h3>
              <p style={{ lineHeight: 1.8 }}>
                We don&apos;t disappear after installation. Jorge is available for support, updates, and expansions for years to come.
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Transparent Pricing</h3>
              <p style={{ lineHeight: 1.8, marginBottom: '32px' }}>
                No hidden fees. We provide detailed quotes and explain what you&apos;re investing in.
              </p>

              <h3 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Premium Equipment</h3>
              <p style={{ lineHeight: 1.8, marginBottom: '32px' }}>
                We work exclusively with industry-leading brands that deliver reliability and performance.
              </p>

              <h3 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>500+ Happy Clients</h3>
              <p style={{ lineHeight: 1.8 }}>
                With a 5.0 Google rating and years of successful installations, we&apos;ve earned the trust of the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Work with Jorge?</h2>
          <p>Let&apos;s discuss your smart home vision and how we can make it a reality.</p>
          <a href="/contact" className="btn btn-primary btn-lg">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
