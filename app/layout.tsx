import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { ClickEvents } from "./analytics";
import { JsonLd } from "./site";
import { certifications } from "./credentials";
import { email, googleReviews, googleSiteVerification, instagramUrl, mainPhone, plausibleDomain, serviceArea, siteName, siteUrl } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Smart Home Automation & Lutron Lighting | Sarasota, FL",
  description:
    "Lutron RadioRA 3 lighting, UniFi security, networking and whole-home control designed and installed by one team in Sarasota, Bradenton, Venice and Lakewood Ranch.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  ...(googleSiteVerification && { verification: { google: googleSiteVerification } }),
};

export const viewport: Viewport = {
  themeColor: "#f2efe7",
};

const business = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${siteUrl}/#business`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/brand/ata-mark-512.png`,
  image: `${siteUrl}/brand/og-image.jpg`,
  telephone: mainPhone.tel,
  email,
  foundingDate: "2019",
  address: { "@type": "PostalAddress", addressLocality: "Sarasota", addressRegion: "FL", addressCountry: "US" },
  areaServed: serviceArea.map(name => ({ "@type": "City", name })),
  sameAs: [instagramUrl, googleReviews.url].filter(Boolean),
  knowsAbout: ["Lutron RadioRA 3", "Lutron Caséta", "UniFi Protect", "Home networking", "Landscape lighting", "Tesla Powerwall", "EV charger installation", "Home theater", "Whole-home audio"],
  hasCredential: certifications.map(c => ({ "@type": "EducationalOccupationalCredential", name: c.label })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  preload("/fonts/newsreader-latin-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/newsreader-latin-wght-italic.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <JsonLd data={business} />
        {children}
        {plausibleDomain && (
          <>
            <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
            <ClickEvents />
          </>
        )}
      </body>
    </html>
  );
}
