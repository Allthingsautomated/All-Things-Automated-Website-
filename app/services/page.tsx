import { services } from "../content";
import { Arrow, AssessmentBand, SiteFooter, SiteHeader } from "../site";

const links: Record<string, string> = {
  lighting: "/services/lighting",
  automation: "/services/automation",
  security: "/services/security",
  audio: "/services/audio-video",
  networking: "/services/networking",
  climate: "/services/climate",
};

export default function Services() {
  return (
    <main>
      <SiteHeader />
      <section className="indexHero shell">
        <p className="eyebrow">Connected living · professionally designed</p>
        <h1>One property.<br /><em>Every system considered.</em></h1>
        <p>We design technology as part of the home: coordinated, serviceable, and simple to live with.</p>
      </section>
      <section className="serviceIndex shell">
        {Object.entries(services).map(([slug, service], index) => (
          <a href={links[slug]} className="serviceIndexCard" key={slug}>
            <img src={service.image} alt="" />
            <div>
              <span>0{index + 1}</span>
              <p>{service.eyebrow}</p>
              <h2>{service.title} <em>{service.italic}</em></h2>
              <small>Explore system <Arrow /></small>
            </div>
          </a>
        ))}
      </section>
      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}
