import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Things Automated | Smart Home Experts in Sarasota',
  description: 'Transform your home with intelligent smart automation. 500+ homes automated. Serving Sarasota, Manatee & Charlotte Counties.',
}

const portfolioItems = [
  {
    title: 'Whole-Home Lighting Design',
    description: 'Lutron Caséta scene control across every room of a 4,200 sq ft waterfront residence.',
    location: 'Siesta Key, FL',
    category: 'Lighting',
    label: 'Lutron Caséta',
    accent: '#f59e0b',
    bg: 'linear-gradient(135deg, #1a1400 0%, #2d2000 50%, #1a1400 100%)',
    href: '/schedule?service=74227637',
  },
  {
    title: 'Estate Security System',
    description: 'Luma 8-camera perimeter system with Ring doorbell and smart locks on a gated property.',
    location: 'Bird Key, FL',
    category: 'Security',
    label: 'Luma 4K · Ring',
    accent: '#4a9fff',
    bg: 'linear-gradient(135deg, #030d1a 0%, #071828 50%, #030d1a 100%)',
    href: '/schedule?service=90943626',
  },
  {
    title: 'Multi-Zone Climate',
    description: 'Ecobee Premium with 6 room sensors across a two-story home for perfect comfort.',
    location: 'Palmer Ranch, FL',
    category: 'Climate',
    label: 'Ecobee Premium',
    accent: '#10b981',
    bg: 'linear-gradient(135deg, #001a0f 0%, #002818 50%, #001a0f 100%)',
    href: '/schedule?service=74227647',
  },
  {
    title: 'Control4 Integration',
    description: 'Full Control4 system unifying lighting, security, climate, and entertainment.',
    location: 'Longboat Key, FL',
    category: 'Automation',
    label: 'Control4',
    accent: '#8b5cf6',
    bg: 'linear-gradient(135deg, #0d0019 0%, #160026 50%, #0d0019 100%)',
    href: '/schedule?service=74225838',
  },
  {
    title: 'Smart Home Theater',
    description: 'Sonos surround sound and 4K projector room with one-touch movie mode.',
    location: 'Venice, FL',
    category: 'Theater',
    label: 'Sonos · 4K Projection',
    accent: '#ef4444',
    bg: 'linear-gradient(135deg, #1a0000 0%, #280000 50%, #1a0000 100%)',
    href: '/schedule?service=74225838',
  },
  {
    title: 'Commercial Security',
    description: 'Luma 4K cameras and Lutron lighting automation for a Sarasota retail location.',
    location: 'Downtown Sarasota, FL',
    category: 'Commercial',
    label: 'Luma · Lutron',
    accent: '#64748b',
    bg: 'linear-gradient(135deg, #0a0c10 0%, #111318 50%, #0a0c10 100%)',
    href: '/schedule?service=90943626',
  },
]

const reviews = [
  {
    name: 'Michael & Sarah T.',
    text: 'Jorge transformed our home. The lighting system he designed is perfect, and his installation was flawless. Best investment we made.',
    location: 'Longboat Key',
  },
  {
    name: 'David R.',
    text: 'Professional, knowledgeable, and responsive. He answered every question and the system works exactly as promised.',
    location: 'Siesta Key',
  },
  {
    name: 'Jennifer L.',
    text: 'From consultation to installation, everything was seamless. Jorge really knows his stuff and cares about customer satisfaction.',
    location: 'Palmer Ranch',
  },
]

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section id="main" className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Luxury modern home at twilight with warm interior lighting"
          />
        </div>
        <div className="hero-content">
          <div className="hero-label">Sarasota&apos;s Premier Smart Home Experts</div>
          <h1>
            Intelligent Automation for <span>Modern Living</span>
          </h1>
          <p className="hero-subtitle">
            Transform your home with cutting-edge smart technology. From lighting and climate to security and full automation — we design, install, and support it all.
          </p>
          <div className="hero-buttons">
            <a href="/contact" className="btn btn-primary btn-lg">
              Request a Consultation
            </a>
            <a href="/services" className="btn btn-outline btn-lg">
              See Our Work
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Homes Automated</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">5.0</div>
              <div className="hero-stat-label">Google Rating</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">6+</div>
              <div className="hero-stat-label">Years Experience</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">3</div>
              <div className="hero-stat-label">Counties Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SLIDER */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Premium Installations</div>
            <h2 className="section-title">Our Installs</h2>
            <p className="section-subtitle">From lighting design to full-home automation—here&apos;s a selection of our recent projects.</p>
          </div>
          <div className="slider-container">
            {portfolioItems.map((item, idx) => (
              <a key={idx} href={item.href} className="portfolio-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="portfolio-image" style={{ background: item.bg }}>
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: item.accent,
                      background: `${item.accent}18`,
                      border: `1px solid ${item.accent}40`,
                      borderRadius: '4px',
                      padding: '4px 10px',
                      alignSelf: 'flex-start',
                    }}>
                      {item.category}
                    </span>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.3)',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                    }}>
                      {item.label}
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 80% 20%, ${item.accent}20 0%, transparent 60%)`,
                    pointerEvents: 'none',
                  }} />
                </div>
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span className="portfolio-location">{item.location}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>Book this service →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ATA */}
      <section style={{ backgroundColor: 'var(--color-dark-2)' }}>
        <div className="container">
          <div className="section-grid-2-gap" style={{ alignItems: 'center' }}>
            <div style={{ paddingRight: '16px' }}>
              <div className="section-label">Why We Do It</div>
              <h2 style={{ marginBottom: '8px' }}>Dedicated to Excellence</h2>
              <p style={{ marginBottom: '16px', lineHeight: 1.8, color: 'var(--color-primary)', fontWeight: 500, fontSize: '17px' }}>
                Founded on expertise, built on trust
              </p>
              <p style={{ marginBottom: '16px', lineHeight: 1.8 }}>
                All Things Automated was founded with a clear mission: technology should simplify your life, not complicate it. Unlike many smart home companies that sell expensive systems and vanish, we stay involved, support our clients long-term, and take pride in every installation.
              </p>
              <p style={{ lineHeight: 1.8, marginBottom: '24px' }}>
                Our team brings years of hands-on experience in smart home automation, electrical work, and customer service. We&apos;re licensed, insured, and hold ourselves to the highest standards in every project.
              </p>
              <a href="/schedule" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Book a Consultation
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src="/assets/jorge.jpg"
                alt="Jorge, Founder"
                className="about-image"
                style={{
                  borderRadius: '16px',
                  width: '100%',
                  objectFit: 'cover',
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
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Trusted by 500+ Homes</div>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="section-grid-3">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card">
                <p>{review.text}</p>
                <div className="review-author">
                  <div className="review-name">{review.name}</div>
                  <div className="review-location">{review.location}, FL</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ backgroundColor: 'var(--color-dark-2)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Smart Home Services</h2>
          </div>
          <div className="section-grid-4">
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Smart Lighting</h3>
              <p>Scene control, color tuning, and automated dimming with Lutron, Philips Hue, and more.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Security &amp; Cameras</h3>
              <p>Professional-grade surveillance with Ring, Luma, UniFi, and complete integration.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </div>
              <h3>Climate Control</h3>
              <p>Smart thermostats, zoning, and automation with Ecobee and Honeywell systems.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Full Automation</h3>
              <p>Complete home integration with Control4 and custom automation scenes.</p>
            </div>
          </div>
          <div className="section-cta" style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/services" className="btn btn-primary btn-lg">
              Explore All Services
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Our Approach</div>
            <h2 className="section-title">How We Work</h2>
          </div>
          <div className="section-grid-3">
            <div className="process-card">
              <div className="process-number">1</div>
              <h3>Consultation</h3>
              <p>We listen to your goals and assess your home to design the perfect system.</p>
            </div>
            <div className="process-card">
              <div className="process-number">2</div>
              <h3>Design &amp; Planning</h3>
              <p>Custom system design tailored to your budget and lifestyle needs.</p>
            </div>
            <div className="process-card">
              <div className="process-number">3</div>
              <h3>Installation &amp; Support</h3>
              <p>Professional installation followed by training and ongoing support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section style={{ backgroundColor: 'var(--color-dark-2)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Our Partners</div>
            <h2 className="section-title">Trusted Brands</h2>
          </div>
          <div className="brands-grid">
            <div className="brand-item">Lutron</div>
            <div className="brand-item">Control4</div>
            <div className="brand-item">Ring</div>
            <div className="brand-item">Honeywell</div>
            <div className="brand-item">Ecobee</div>
            <div className="brand-item">Philips Hue</div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Home?</h2>
          <p>Let&apos;s discuss your smart home vision. Schedule a free consultation with All Things Automated today.</p>
          <div className="cta-buttons">
            <a href="/schedule" className="btn btn-primary btn-lg">
              Book Online Now
            </a>
            <a href="tel:+19412635325" className="btn btn-outline btn-lg">
              Call (941) 263-5325
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
