import { AssessmentBand, SiteFooter, SiteHeader } from "../site";

export default function About() {
  return (
    <main>
      <SiteHeader />
      <section className="pageHero aboutHero">
        <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90" alt="" />
        <div className="pageHeroShade" />
        <div className="pageHeroCopy">
          <p className="eyebrow light">All Things Automated</p>
          <h1>Local expertise.<br /><em>One accountable team.</em></h1>
          <p>Smart-home design and installation for Sarasota, Bradenton, Venice, and Florida&apos;s Gulf Coast.</p>
        </div>
      </section>
      <section className="aboutCopy shell">
        <p className="eyebrow">Our point of view</p>
        <div>
          <h2>The technology is only successful when the experience feels simple.</h2>
          <div><p>All Things Automated designs lighting, automation, security, audio, networking, and climate systems as one coordinated layer of the property.</p><p>We believe every device should have a reason to exist, every control should make sense, and every project should leave the client with one team that understands the complete system.</p></div>
        </div>
      </section>
      <section className="proofPanel shell">
        <div><strong>500+</strong><span>Homes automated</span></div>
        <div><strong>5.0</strong><span>Google rating</span></div>
        <div><strong>Local</strong><span>Sarasota · Bradenton · Venice</span></div>
      </section>
      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}
