import { serviceOrder, services } from "../content";
import { Picture, hasImage } from "../images";
import { Arrow, AssessmentBand, PageShell, pageMeta } from "../site";

export const metadata = pageMeta({
  path: "/services",
  title: "Smart Home Systems We Design & Install | All Things Automated",
  description: "Lighting control, cameras, networking, audio, climate, landscape lighting, Tesla solar and EV charging—planned as one system for Gulf Coast homes.",
});

export default function Services() {
  return (
    <PageShell>
      <section className="indexHero shell">
        <p className="eyebrow">Connected living · professionally designed</p>
        <h1>One property.<br /><em>Every system considered.</em></h1>
        <p>We design technology as part of the home: coordinated, serviceable, and simple to live with.</p>
      </section>
      <section className="serviceIndex shell">
        {serviceOrder.map((key, index) => {
          const service = services[key];
          return (
            <a href={service.path} className={service.image && hasImage(service.image) ? "serviceIndexCard" : "serviceIndexCard plain"} key={key}>
              {service.image && <Picture slot={service.image} sizes="(max-width: 900px) 100vw, 50vw" />}
              <div>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p>{service.eyebrow}</p>
                <h2>{service.title} <em>{service.italic}</em></h2>
                <small>Explore system <Arrow /></small>
              </div>
            </a>
          );
        })}
      </section>
      <AssessmentBand />
    </PageShell>
  );
}
