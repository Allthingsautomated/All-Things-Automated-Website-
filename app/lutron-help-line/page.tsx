import { credentialLine } from "../credentials";
import { Arrow, JsonLd, PageHero, PageShell, PhoneLink, pageMeta } from "../site";
import { bookPath, lutronPhone, siteUrl } from "../site-config";

export const metadata = pageMeta({
  path: "/lutron-help-line",
  title: "Lutron Help Line, 24/7 | Sarasota & Gulf Coast",
  description: `Phone help for any Lutron RadioRA or Caséta system, around the clock, no matter who installed it. Call ${lutronPhone.display}.`,
  image: "help-line-hero",
});

const faqs = [
  { q: "Do you help if you didn't install my system?", a: "Yes. The help line is for anyone with a Lutron system, regardless of who installed it." },
  { q: "What can be fixed over the phone?", a: "Many problems—keypads that stopped responding, scenes or schedules that changed, an app that lost the system, devices that need re-pairing—can be diagnosed and often solved by phone." },
  { q: "What if it can't be fixed by phone?", a: "We schedule an on-site service visit and come prepared for what we found on the call." },
  { q: "Which systems do you support?", a: "Lutron RadioRA 3, RadioRA 2, Caséta and related Lutron lighting and shade controls." },
];

export default function HelpLine() {
  return (
    <PageShell>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Lutron Help Line",
        url: `${siteUrl}/lutron-help-line`,
        provider: { "@id": `${siteUrl}/#business` },
        hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
      }} />
      <PageHero slot="help-line-hero" eyebrow="Lutron Help Line · 24/7" title="Lutron help," italic="any hour." intro="Phone support for any Lutron system—no matter who installed it. If the fix needs a visit, we schedule a service call." cred={credentialLine("/lutron-help-line")}>
        <PhoneLink className="button" phone={lutronPhone} prefix="Call " />
      </PageHero>
      <section className="detailGrid shell helpSteps">
        <article><span aria-hidden="true">01</span><h3>Call the line</h3><p>Call {lutronPhone.display} any time, day or night.</p></article>
        <article><span aria-hidden="true">02</span><h3>Tell us what changed</h3><p>We walk through what the system is doing and what you expect it to do.</p></article>
        <article><span aria-hidden="true">03</span><h3>Fix it by phone</h3><p>Many problems can be solved on the call.</p></article>
        <article><span aria-hidden="true">04</span><h3>Or we come out</h3><p>If it needs hands on the system, we book a service visit.</p></article>
      </section>
      <section className="faq shell">
        <p className="eyebrow">Common questions</p>
        <dl>{faqs.map(faq => <div key={faq.q}><dt>{faq.q}</dt><dd>{faq.a}</dd></div>)}</dl>
      </section>
      <section className="callout shell">
        <p className="eyebrow">Planning something new?</p>
        <div>
          <h2>Adding to or upgrading a Lutron system.</h2>
          <div>
            <p>The same line handles new Lutron RadioRA 3 design and installation, or start with an on-site assessment.</p>
            <a className="under" href="/services/lighting">Lutron lighting control <Arrow /></a>
            <a className="under" href={bookPath}>Book an assessment <Arrow /></a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
