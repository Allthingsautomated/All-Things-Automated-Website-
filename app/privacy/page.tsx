import { PageShell, pageMeta } from "../site";
import { email, mainPhone } from "../site-config";

export const metadata = pageMeta({
  path: "/privacy",
  title: "Privacy Policy | All Things Automated",
  description: "How All Things Automated collects, uses and protects the information you share through our website, forms and booking calendar.",
});

const updated = "October 7, 2026";

export default function Privacy() {
  return (
    <PageShell>
      <section className="indexHero shell legalHero">
        <p className="eyebrow">Privacy policy</p>
        <h1>Your information,<br /><em>handled simply.</em></h1>
        <p>Last updated {updated}.</p>
      </section>
      <article className="legal shell">
        <h2>What we collect</h2>
        <p>When you fill out a form on this site we receive what you type: your name, phone number, email address, city, project details, notes, and any plan files you upload. When you book an assessment, the booking calendar (Acuity Scheduling) collects the details it asks for and processes your payment; we receive the appointment details but not your full card number.</p>
        <p>Like most websites, our hosting provider (Cloudflare) records basic technical information such as IP address, browser type, and pages requested, to deliver the site and protect it from abuse. If we enable website analytics, we use a privacy-focused service that does not use cookies or track you across other websites.</p>

        <h2>How we use it</h2>
        <p>We use your information to respond to your request, schedule and perform work, send estimates and invoices, and provide support for systems we install. We do not sell your information, and we do not share it with anyone except the service providers who help us run the business (for example, email, scheduling, payment, and accounting providers), and only as needed for those purposes, or when required by law.</p>

        <h2>Phone calls and texts</h2>
        <p>Calls to our business lines may be answered by an automated receptionist that records call details so we can follow up. If you text or call us, we may reply by text or phone about your request.</p>

        <h2>How long we keep it</h2>
        <p>We keep project and customer records for as long as we need them to support your system, meet warranty obligations, and keep required business and tax records. Form submissions that do not become projects are deleted when they are no longer useful.</p>

        <h2>Your choices</h2>
        <p>You can ask us what information we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Email <a className="inline" href={`mailto:${email}`}>{email}</a> or call <a className="inline" href={`tel:${mainPhone.tel}`}>{mainPhone.display}</a>.</p>

        <h2>Security</h2>
        <p>The site is served only over HTTPS and form submissions are sent directly to our inbox. No method of transmission or storage is perfectly secure, but we take reasonable steps to protect the information you share.</p>

        <h2>Children</h2>
        <p>This site is intended for adults arranging work on their property. We do not knowingly collect information from children under 13.</p>

        <h2>Changes</h2>
        <p>If we change this policy we will update the date at the top of this page.</p>
      </article>
    </PageShell>
  );
}
