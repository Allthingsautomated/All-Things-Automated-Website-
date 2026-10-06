import { AssessmentBand, PageShell, Photo, pageMeta } from "../site";

export const metadata = pageMeta({
  path: "/about",
  title: "About All Things Automated | Sarasota Since 2019",
  description: "Owner-led smart home, lighting control and electrical company serving Sarasota, Bradenton, Venice, Lakewood Ranch and Tampa since 2019.",
});

export default function About() {
  return (
    <PageShell>
      <section className="pageHero aboutHero">
        <Photo src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90" priority />
        <div className="pageHeroShade" />
        <div className="pageHeroCopy">
          <p className="eyebrow light">All Things Automated</p>
          <h1>Local expertise.<br /><em>One accountable team.</em></h1>
          <p>Smart-home design, lighting control, and electrical work for Sarasota, Bradenton, Venice, Lakewood Ranch, Tampa, and Florida&apos;s Gulf Coast.</p>
        </div>
      </section>
      <section className="aboutCopy shell">
        <p className="eyebrow">Our point of view</p>
        <div>
          <h2>The technology is only successful when the experience feels simple.</h2>
          <div><p>All Things Automated designs lighting, automation, security, audio, networking, and climate systems as one coordinated layer of the property—and handles the electrical work underneath them.</p><p>We believe every device should have a reason to exist, every control should make sense, and every project should leave the client with one team that understands the complete system.</p></div>
        </div>
      </section>
      <section className="proofPanel shell">
        <div><strong>2019</strong><span>Founded in Sarasota</span></div>
        <div><strong>RA3</strong><span>Lutron RadioRA 3 dealer</span></div>
        <div><strong>24/7</strong><span>Lutron help line</span></div>
      </section>
      <AssessmentBand />
    </PageShell>
  );
}
