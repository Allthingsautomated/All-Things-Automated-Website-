import { Arrow, PageShell, PhoneLink, pageMeta } from "../site";
import { bookPath, email, instagramUrl, lutronPhone, mainPhone, serviceAreaLine, teslaPhone } from "../site-config";

export const metadata = pageMeta({
  path: "/contact",
  title: "Contact All Things Automated | Sarasota, FL",
  description: `Call ${mainPhone.display}, email ${email}, or book an on-site assessment. Serving Sarasota, Bradenton, Venice, Lakewood Ranch and Tampa.`,
});

const lines = [
  { phone: mainPhone, copy: "Smart home, lighting, cameras, networking, and electrical." },
  { phone: lutronPhone, copy: "24/7 help for any Lutron system, plus new Lutron design and installation." },
  { phone: teslaPhone, copy: "Tesla solar, Solar Roof, Powerwall, and Wall Connector." },
];

export default function Contact() {
  return (
    <PageShell>
      <section className="indexHero shell">
        <p className="eyebrow">Contact</p>
        <h1>Talk to us<br /><em>the way you prefer.</em></h1>
        <p>Book an on-site assessment, call the line that fits your question, or send an email. Serving {serviceAreaLine}.</p>
      </section>
      <section className="contactGrid shell">
        <article className="contactBook">
          <p className="eyebrow light">Start a project</p>
          <h2>Book an on-site assessment.</h2>
          <p>Pick a time that works and we will walk the property with you.</p>
          <a className="button" href={bookPath}>Book assessment <Arrow /></a>
        </article>
        {lines.map(line => (
          <article key={line.phone.tel}>
            <p className="eyebrow">{line.phone.label}</p>
            <PhoneLink phone={line.phone} />
            <p>{line.copy}</p>
          </article>
        ))}
        <article>
          <p className="eyebrow">Email</p>
          <a href={`mailto:${email}`}>{email}</a>
          <p>Plans, photos, and questions. Builders and designers: see <a className="inline" href="/for-builders">trade quotes</a>.</p>
        </article>
        <article>
          <p className="eyebrow">Instagram</p>
          <a href={instagramUrl} rel="noopener" target="_blank">@allthingsautomated8</a>
          <p>Recent projects and work in progress.</p>
        </article>
      </section>
    </PageShell>
  );
}
