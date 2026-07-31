import { AssessmentBand, SiteFooter, SiteHeader } from "../site";

const steps = [
  ["01", "Assess", "We walk the property, listen carefully, document the existing conditions, and identify the opportunities and constraints."],
  ["02", "Design", "We coordinate systems, infrastructure, product choices, locations, and investment into one clear plan."],
  ["03", "Install", "Our team handles installation, finish details, programming, testing, and commissioning."],
  ["04", "Teach", "We make sure the household understands the system and that everyday functions feel natural."],
  ["05", "Support", "We remain available as the property, technology, and your needs evolve."],
];

export default function Process() {
  return (
    <main>
      <SiteHeader />
      <section className="indexHero shell">
        <p className="eyebrow">The ATA process</p>
        <h1>Thoughtful before<br /><em>technical.</em></h1>
        <p>The best systems begin with listening. We design around the property, the people using it, and the experience they want every day.</p>
      </section>
      <section className="processList shell">
        {steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}
