import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['700', '800'],
})

export const metadata: Metadata = {
  title: 'All Things Automated | Smart Home Automation in Sarasota, FL',
  description: 'Premium smart home automation services in Sarasota, FL. Lutron lighting, Control4 systems, and professional installation serving Sarasota, Manatee & Charlotte Counties.',
  keywords: 'smart home automation, smart lighting, home automation Sarasota, smart home installation',
  authors: [{ name: 'All Things Automated' }],
  openGraph: {
    title: 'All Things Automated | Smart Home Automation',
    description: 'Intelligent automation for modern living. Transform your home with smart technology.',
    url: 'https://itsallthingsautomated.com',
    siteName: 'All Things Automated',
    images: [
      {
        url: 'https://itsallthingsautomated.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'All Things Automated',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Things Automated',
    description: 'Smart home automation in Sarasota, FL',
    images: ['https://itsallthingsautomated.com/assets/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://itsallthingsautomated.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      </head>
      <body>
        <a
          className="skip-link"
          href="#main"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '16px',
            padding: '8px 16px',
            background: 'var(--color-dark-card)',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            zIndex: 10000,
            textDecoration: 'none',
          }}
          onFocus={(e) => {
            ;(e.target as HTMLElement).style.left = '16px'
          }}
          onBlur={(e) => {
            ;(e.target as HTMLElement).style.left = '-9999px'
          }}
        >
          Skip to content
        </a>

        {/* NAVIGATION */}
        <nav>
          <div className="nav-logo">
            <img src="/assets/logo-white.svg" alt="All Things Automated" />
          </div>
          <div className="nav-center">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/services">Services</a>
            <a href="/pricing">Pricing</a>
            <a href="/blog">Blog</a>
          </div>
          <div className="nav-right">
            <a href="/contact" className="nav-contact">
              Contact
            </a>
            <a href="/contact" className="btn-quote">
              Get a Quote
            </a>
          </div>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        {/* MOBILE NAV */}
        <div className="nav-mobile">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/pricing">Pricing</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
          <a href="/contact" className="btn-quote">
            Get a Quote
          </a>
        </div>

        {/* MAIN CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer>
          <div className="container">
            <div className="footer-top">
              <div className="footer-col-1">
                <div className="footer-logo">
                  <img src="/assets/logo-white.svg" alt="All Things Automated" />
                </div>
                <div className="footer-tagline">
                  Intelligent automation for modern living. Serving Florida&apos;s Gulf Coast with premium smart home solutions.
                </div>
                <div className="footer-location">
                  Sarasota, FL | Insured
                  <br />
                  Serving Sarasota, Manatee &amp; Charlotte Counties
                </div>
                <div className="footer-newsletter">
                  <p>Get smart home tips &amp; offers:</p>
                  <form className="footer-newsletter-form" id="footer-newsletter">
                    <input type="email" placeholder="Your email" required />
                    <button type="submit">Subscribe</button>
                  </form>
                </div>
                <div className="footer-social">
                  <a href="#" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/allthingsautomated8/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="footer-col-2">
                <div className="footer-heading">Navigation</div>
                <div className="footer-links">
                  <a href="/">Home</a>
                  <a href="/about">About Us</a>
                  <a href="/services">Services</a>
                  <a href="/pricing">Pricing</a>
                  <a href="/blog">Blog</a>
                  <a href="/contact">Contact</a>
                </div>
              </div>
              <div className="footer-col-3">
                <div className="footer-heading">Services</div>
                <div className="footer-links">
                  <a href="/services">Smart Lighting</a>
                  <a href="/services">Security &amp; Cameras</a>
                  <a href="/services">Climate Control</a>
                  <a href="/services">Full Automation</a>
                </div>
              </div>
              <div>
                <div className="footer-heading">Contact</div>
                <div className="footer-contact">
                  <a href="tel:+19412635325">(941) 263-5325</a>
                  <a href="mailto:hello@allthingsautomated.com">hello@allthingsautomated.com</a>
                  <span>Mon-Fri: 9am-5pm ET</span>
                  <span>Sat: By appointment</span>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 All Things Automated. All rights reserved.</p>
              <a href="/admin" className="footer-login">
                Admin
              </a>
            </div>
          </div>
        </footer>

        {/* SCRIPTS */}
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/js/chatbot.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
