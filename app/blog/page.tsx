import { articles } from "../content";
import { Arrow, AssessmentBand, SiteFooter, SiteHeader } from "../site";

const slugs = ["smart-bulbs-vs-lighting-system", "unifi-vs-ring-cameras", "new-construction-smart-home-prewire"];

export default function Blog() {
  return (
    <main>
      <SiteHeader />
      <section className="indexHero journalHero shell">
        <p className="eyebrow">The ATA Journal</p>
        <h1>Clear answers for<br /><em>better-connected homes.</em></h1>
        <p>Practical guidance on lighting, automation, security, networking, and planning—written for homeowners, builders, and designers.</p>
      </section>
      <section className="journalGrid shell">
        {slugs.map((slug, index) => {
          const article = articles[slug];
          return (
            <a className={index === 0 ? "journalCard leadStory" : "journalCard"} href={`/blog/${slug}`} key={slug}>
              <img src={article.image} alt="" />
              <div><span>{article.category}</span><h2>{article.title}</h2><p>{article.dek}</p><small>{article.readTime} · Read article <Arrow /></small></div>
            </a>
          );
        })}
      </section>
      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}
