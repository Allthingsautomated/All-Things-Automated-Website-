import { locationOrder, locations } from "../locations";
import { Arrow, AssessmentBand, PageShell, PhoneLink, pageMeta } from "../site";
import { mainPhone } from "../site-config";

export const metadata = pageMeta({
  path: "/service-area",
  title: "Service Area: Sarasota to Tampa | All Things Automated",
  description: "We serve Sarasota, Lakewood Ranch, Bradenton, Venice, Tampa and the keys—Longboat, Siesta and Casey Key—with lighting control, cameras, networking and smart-home systems.",
});

export default function ServiceArea() {
  return (
    <PageShell>
      <section className="indexHero shell">
        <p className="eyebrow">Service area</p>
        <h1>Sarasota and<br /><em>the Gulf Coast.</em></h1>
        <p>Based in Sarasota since 2019, we work across Sarasota and Manatee counties and up to Tampa.</p>
      </section>
      <section className="moreServices shell">
        <p className="eyebrow">Cities</p>
        <ul>
          {locationOrder.map(slug => <li key={slug}><a href={`/${slug}`}>{locations[slug].city} <Arrow /></a></li>)}
        </ul>
      </section>
      <article className="legal shell">
        <h2>Tampa</h2>
        <p>We take on Tampa projects, particularly Lutron RadioRA 3 lighting control and Lutron support. Call to talk through the scope and schedule.</p>
        <h2>Longboat, Siesta &amp; Casey Key</h2>
        <p>Island homes get the same planning as anywhere else, with extra attention to salt air, storm protection, and remote access for owners who are away part of the year.</p>
        <h2>Not sure if you&apos;re in range?</h2>
        <p>Call <PhoneLink className="inline" phone={mainPhone} /> and we will tell you.</p>
      </article>
      <AssessmentBand />
    </PageShell>
  );
}
