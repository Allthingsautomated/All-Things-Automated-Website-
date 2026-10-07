import { Picture, type SlotName } from "../images";
import { AssessmentBand, PageShell, pageMeta } from "../site";

export const metadata = pageMeta({
  path: "/process",
  title: "How We Work: Assess, Design, Install, Support | ATA",
  description: "Our five-step process, from the on-site assessment through design, installation, teaching the household and long-term support.",
});

const stepImages: Record<string, SlotName> = {
  "01": "process-01-assess",
  "02": "process-02-design",
  "03": "process-03-install",
  "05": "process-04-support",
};

const steps = [
  ["01", "Assess", "We walk the property, listen carefully, document the existing conditions, and identify the opportunities and constraints."],
  ["02", "Design", "We coordinate systems, infrastructure, product choices, locations, and investment into one clear plan."],
  ["03", "Install", "Our team handles installation, finish details, programming, testing, and commissioning."],
  ["04", "Teach", "We make sure the household understands the system and that everyday functions feel natural."],
  ["05", "Support", "We remain available as the property, technology, and your needs evolve."],
];

export default function Process() {
  return (
    <PageShell>
      <section className="indexHero shell">
        <p className="eyebrow">The ATA process</p>
        <h1>Thoughtful before<br /><em>technical.</em></h1>
        <p>The best systems begin with listening. We design around the property, the people using it, and the experience they want every day.</p>
      </section>
      <section className="processList shell">
        {steps.map(([number, title, copy]) => (
          <article key={number}>
            <span aria-hidden="true">{number}</span>
            <div>
              {stepImages[number] && <Picture slot={stepImages[number]} sizes="(max-width: 620px) 100vw, 25vw" className="stepImage" />}
              <h2>{title}</h2>
            </div>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <AssessmentBand />
    </PageShell>
  );
}
