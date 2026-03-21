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

              <div>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Book a Consultation</h4>
                <a href="https://Allthingsautomatedcalendar.as.me/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Schedule on Calendar
                </a>
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
