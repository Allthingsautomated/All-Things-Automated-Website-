import { Metadata } from 'next'
import ContactForm from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact All Things Automated | Get a Free Quote',
  description: 'Contact us for a free consultation. Call (941) 263-5325 or fill out our form. Serving Sarasota, Manatee & Charlotte Counties.',
}

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section id="main" className="hero-page">
        <h1>Get in Touch</h1>
        <p>Ready to transform your home? Contact us for a free consultation.</p>
      </section>

      {/* CONTACT CONTENT */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="section-grid-2-gap">
            <div>
              <div className="section-label">Let&apos;s Talk</div>
              <h2>Send Us a Message</h2>
              <p style={{ marginBottom: '40px' }}>
                Fill out the form and we&apos;ll get back to you within 24 hours. Or give us a call anytime.
              </p>
              <ContactForm />
            </div>
            <div>
              <div className="section-label">Contact Info</div>
              <h3 style={{ marginBottom: '32px' }}>Reach Out Directly</h3>

              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Phone</h4>
                <a href="tel:+19412635325" style={{ color: 'var(--color-text-light)', textDecoration: 'none', fontSize: '18px' }}>
                  (941) 263-5325
                </a>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Email</h4>
                <a href="mailto:hello@allthingsautomated.com" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>
                  hello@allthingsautomated.com
                </a>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Location</h4>
                <p>Sarasota, FL</p>
                <p>Serving Sarasota, Manatee &amp; Charlotte Counties</p>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Hours</h4>
                <p>Monday - Friday: 9am - 5pm ET</p>
                <p>Saturday: By appointment</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(74,159,255,0.12) 0%, rgba(74,159,255,0.05) 100%)',
                border: '1px solid rgba(74,159,255,0.35)',
                borderRadius: '14px',
                padding: '24px',
                marginTop: '8px',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>📅</div>
                <h4 style={{ color: 'var(--color-white)', marginBottom: '8px', fontSize: '18px' }}>
                  Ready to Book?
                </h4>
                <p style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
                  Skip the back-and-forth — pick your service and a time that works for you. Online payment confirms your spot.
                </p>
                <a href="/schedule" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                  📅 Book Online Now
                </a>
                <p style={{ color: 'var(--color-text)', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>
                  8 services available · Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA MAP INFO */}
      <section style={{ backgroundColor: 'var(--color-dark-2)' }}>
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">We Serve Your Area</h2>
            <p className="section-subtitle">
              Proudly serving the Gulf Coast of Florida. If you&apos;re in Sarasota, Manatee, or Charlotte County, we&apos;re ready to help.
            </p>
          </div>
          <div className="section-grid-3" style={{ marginTop: '40px' }}>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <h3>Sarasota County</h3>
              <p style={{ marginTop: '16px' }}>
                Serving Sarasota, Siesta Key, Longboat Key, Venice, Palmer Ranch, and surrounding areas.
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <h3>Manatee County</h3>
              <p style={{ marginTop: '16px' }}>
                Bradenton, Palmetto, Anna Maria Island, and all of Manatee County.
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <h3>Charlotte County</h3>
              <p style={{ marginTop: '16px' }}>
                Punta Gorda, Port Charlotte, and all of Charlotte County.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
