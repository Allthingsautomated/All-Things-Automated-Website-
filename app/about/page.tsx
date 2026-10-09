import { Picture } from "../images";
import { partnerRail } from "../credentials";
import { AssessmentBand, GoogleReviews, PageShell, PartnerRail, pageMeta } from "../site";
import { localFiles } from "../image-manifest.generated";
import { googleReviews } from "../site-config";

const ownerPortrait = localFiles.has("about-owner.jpg");

export const metadata = pageMeta({
  path: "/about",
  title: "About All Things Automated | Sarasota Since 2019",
  description: "Owner-led smart home and lighting control company serving Sarasota, Bradenton, Venice, Lakewood Ranch and Tampa since 2019.",
});

// Owner portrait (4:5) appears once public/img/about-owner.jpg is added.
function OwnerPortrait() {
  if (!ownerPortrait) return null;
  return <img className="ownerPortrait" src="/img/about-owner.jpg" width={960} height={1200} alt="Jorge Romero, owner of All Things Automated" loading="lazy" decoding="async" />;
}

export default function About() {
  return (
    <PageShell>
      <section className="pageHero aboutHero">
        <Picture slot="home-hero-daylight" loading="eager" />
        <div className="pageHeroShade" />
        <div className="pageHeroCopy">
          <p className="eyebrow light">All Things Automated</p>
          <h1>Local expertise.<br /><em>One accountable team.</em></h1>
          <p>Smart-home design and lighting control for Sarasota, Bradenton, Venice, Lakewood Ranch, Tampa, and Florida&apos;s Gulf Coast.</p>
        </div>
      </section>
      <section className="aboutCopy shell">
        <p className="eyebrow">Our point of view</p>
        <div>
          <h2>The technology is only successful when the experience feels simple.</h2>
          <div><OwnerPortrait /><p>All Things Automated designs lighting, automation, security, audio, networking, and climate systems as one coordinated layer of the property.</p><p>We believe every device should have a reason to exist, every control should make sense, and every project should leave the client with one team that understands the complete system.</p></div>
        </div>
      </section>
      <section className="proofPanel shell">
        <div><strong>2019</strong><span>Founded in Sarasota</span></div>
        <div><strong>RA3</strong><span>Lutron RadioRA 3 dealer</span></div>
        <div><strong>24/7</strong><span>Lutron help line</span></div>
        <div><strong>Pro</strong><span>Leviton Pro</span></div>
        {googleReviews.reviewCount >= 5 && googleReviews.url && (
          <a href={googleReviews.url} rel="noopener" target="_blank">
            <strong>★ {googleReviews.rating.toFixed(1)}</strong>
            <span>{googleReviews.reviewCount} Google reviews</span>
          </a>
        )}
      </section>
      <GoogleReviews />
      <section className="credentials shell">
        <p className="eyebrow">Partners &amp; credentials</p>
        <div>
          <h2>Dealer programs &amp; certifications</h2>
          <p>All Things Automated is a Lutron RadioRA 3 dealer and holds pro-program accounts with Savant, Sonos, Google Nest, eero, Ring, Lorex and Leviton. For home theater we are Epson Certified. Jorge completed the NCCER Electrical program (Levels 1–4) at Manatee Technical College before founding ATA in 2019.</p>
        </div>
      </section>
      <PartnerRail id="about-partners-h" heading="Authorized dealer & pro programs" items={partnerRail} />
      <AssessmentBand />
    </PageShell>
  );
}
