import { PageShell, PhoneLink, pageMeta } from "../site";
import { acuityUrl, mainPhone } from "../site-config";

export const metadata = pageMeta({
  path: "/book",
  title: "Book an On-Site Assessment | All Things Automated",
  description: "Choose a time for an on-site assessment in Sarasota, Bradenton, Venice, Lakewood Ranch or Tampa. We walk the property and recommend the right system.",
});

export default function Book() {
  return (
    <PageShell>
      <section className="indexHero bookHero shell">
        <p className="eyebrow">Professional assessment</p>
        <h1>Book your<br /><em>on-site assessment.</em></h1>
        <p>Choose a time below. Prefer to talk first? Call <PhoneLink className="inline" phone={mainPhone} />.</p>
      </section>
      <section className="bookFrame shell">
        <iframe src={acuityUrl} title="Schedule an on-site assessment" loading="lazy" />
        <p>Calendar not loading? <a className="inline" href={acuityUrl} target="_blank" rel="noopener">Open the booking calendar in a new tab</a>.</p>
      </section>
    </PageShell>
  );
}
