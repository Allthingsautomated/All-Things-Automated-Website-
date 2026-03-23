import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | All Things Automated',
  description: 'Smart home packages from $499+. Residential automation, security, and design services with transparent pricing.',
}

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section id="main" className="hero-page">
        <h1>Smart Home Pricing</h1>
        <p>Transparent pricing for every budget. From smart lighting to complete home automation.</p>
      </section>

      {/* RESIDENTIAL PACKAGES */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Smart Home Packages</div>
            <h2 className="section-title">Residential Automation</h2>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Smart Start</h3>
              <div className="pricing-price">$499<span>+</span></div>
              <p className="pricing-description">Perfect for entry-level automation</p>
              <ul className="pricing-features">
                <li>✓ Smart thermostat</li>
                <li>✓ Basic lighting control</li>
                <li>✓ Smart speaker setup</li>
                <li>✓ Installation &amp; training</li>
              </ul>
              <a href="/contact" className="btn btn-outline">Get Started</a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <h3>Home Essentials</h3>
              <div className="pricing-price">$2,499<span>+</span></div>
              <p className="pricing-description">Comprehensive home automation</p>
              <ul className="pricing-features">
                <li>✓ Whole-home lighting</li>
                <li>✓ Climate control</li>
                <li>✓ Smart locks &amp; entry</li>
                <li>✓ Security cameras</li>
                <li>✓ Mobile app control</li>
                <li>✓ Voice integration</li>
              </ul>
              <a href="/contact" className="btn btn-primary">Get a Quote</a>
            </div>
            <div className="pricing-card">
              <h3>Total Home</h3>
              <div className="pricing-price">Custom</div>
              <p className="pricing-description">Full-home integration &amp; entertainment</p>
              <ul className="pricing-features">
                <li>✓ Control4 system</li>
                <li>✓ Full automation suite</li>
                <li>✓ Entertainment integration</li>
                <li>✓ Advanced scenes</li>
                <li>✓ Premium support</li>
              </ul>
              <a href="/contact" className="btn btn-outline">Consult with Jorge</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY PACKAGES */}
      <section style={{ backgroundColor: 'var(--color-dark-2)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Security Solutions</div>
            <h2 className="section-title">Camera &amp; Security Systems</h2>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Essential Security</h3>
              <div className="pricing-price">$899<span>+</span></div>
              <p className="pricing-description">Basic surveillance coverage</p>
              <ul className="pricing-features">
                <li>✓ 2-4 HD cameras</li>
                <li>✓ Smart doorbell</li>
                <li>✓ Cloud storage</li>
                <li>✓ Mobile alerts</li>
              </ul>
              <a href="/contact" className="btn btn-outline">Get a Quote</a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Recommended</div>
              <h3>Complete Coverage</h3>
              <div className="pricing-price">$2,500<span>+</span></div>
              <p className="pricing-description">Professional-grade system</p>
              <ul className="pricing-features">
                <li>✓ 4-8 4K cameras</li>
                <li>✓ Perimeter coverage</li>
                <li>✓ AI person detection</li>
                <li>✓ Smart locks</li>
                <li>✓ 24/7 monitoring</li>
              </ul>
              <a href="/contact" className="btn btn-primary">Get a Quote</a>
            </div>
            <div className="pricing-card">
              <h3>Premium Surveillance</h3>
              <div className="pricing-price">Custom</div>
              <p className="pricing-description">Enterprise-level security</p>
              <ul className="pricing-features">
                <li>✓ 8+ 4K/8K cameras</li>
                <li>✓ Advanced AI analytics</li>
                <li>✓ Professional NVR</li>
                <li>✓ Full integration</li>
              </ul>
              <a href="/contact" className="btn btn-outline">Consult</a>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN SERVICES */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Design &amp; Planning</div>
            <h2 className="section-title">Design Services</h2>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Lighting Design Plan</h3>
              <div className="pricing-price">$500<span>+</span></div>
              <p className="pricing-description">Professional lighting layout</p>
              <ul className="pricing-features">
                <li>✓ Room-by-room analysis</li>
                <li>✓ Fixture recommendations</li>
                <li>✓ Scene designs</li>
                <li>✓ Cost estimate</li>
              </ul>
              <a href="/contact" className="btn btn-outline">Request Plan</a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Popular</div>
              <h3>Full Smart Home Blueprint</h3>
              <div className="pricing-price">$1,500<span>+</span></div>
              <p className="pricing-description">Complete home automation plan</p>
              <ul className="pricing-features">
                <li>✓ Full system design</li>
                <li>✓ Equipment specifications</li>
                <li>✓ Wiring &amp; layout</li>
                <li>✓ Installation timeline</li>
                <li>✓ Budget breakdown</li>
              </ul>
              <a href="/contact" className="btn btn-primary">Request Blueprint</a>
            </div>
          </div>
        </div>
      </section>

      {/* MAINTENANCE PLANS */}
      <section style={{ backgroundColor: 'var(--color-dark-2)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Ongoing Support</div>
            <h2 className="section-title">Maintenance Plans</h2>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="pricing-price">$29<span>/mo</span></div>
              <p className="pricing-description">Essential support</p>
              <ul className="pricing-features">
                <li>✓ Email support</li>
                <li>✓ Remote troubleshooting</li>
                <li>✓ Software updates</li>
              </ul>
              <a href="/contact" className="btn btn-outline">Subscribe</a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Best Value</div>
              <h3>Priority</h3>
              <div className="pricing-price">$59<span>/mo</span></div>
              <p className="pricing-description">Priority support &amp; maintenance</p>
              <ul className="pricing-features">
                <li>✓ Phone &amp; email support</li>
                <li>✓ Same-day response</li>
                <li>✓ Quarterly maintenance visits</li>
                <li>✓ System optimization</li>
              </ul>
              <a href="/contact" className="btn btn-primary">Subscribe</a>
            </div>
            <div className="pricing-card">
              <h3>Elite</h3>
              <div className="pricing-price">$99<span>/mo</span></div>
              <p className="pricing-description">White-glove support</p>
              <ul className="pricing-features">
                <li>✓ 24/7 phone support</li>
                <li>✓ Priority dispatch</li>
                <li>✓ Monthly site visits</li>
                <li>✓ Equipment protection</li>
              </ul>
              <a href="/contact" className="btn btn-outline">Subscribe</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Pricing FAQ</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <details className="faq-item" open>
              <summary>What&apos;s included in installation?</summary>
              <p>All installations include equipment, labor, wiring, testing, configuration, training, and 30 days of support.</p>
            </details>
            <details className="faq-item">
              <summary>Can I finance my project?</summary>
              <p>Yes! We work with financing partners to make smart home projects accessible. Ask about payment plans during consultation.</p>
            </details>
            <details className="faq-item">
              <summary>Do prices vary by location?</summary>
              <p>Pricing is consistent across Sarasota, Manatee, and Charlotte Counties. Travel time and project scope may affect final cost.</p>
            </details>
            <details className="faq-item">
              <summary>What if I want to add to my system later?</summary>
              <p>Smart systems are designed to be expandable. We can integrate new components at any time.</p>
            </details>
            <details className="faq-item">
              <summary>Is there a warranty?</summary>
              <p>Yes. All equipment comes with manufacturer warranties (typically 1-3 years), and our installation has a 1-year labor warranty.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Let&apos;s Find Your Perfect Package</h2>
          <p>Every home is different. Schedule a consultation to discuss your budget and needs.</p>
          <a href="/schedule" className="btn btn-primary btn-lg">
            Book a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
