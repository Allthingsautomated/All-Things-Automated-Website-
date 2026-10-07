import { articleOrder, articles } from "../content";
import { Picture } from "../images";
import { Arrow, AssessmentBand, PageShell, pageMeta, readTime } from "../site";

export const metadata = pageMeta({
  path: "/blog",
  title: "Smart Home Journal | All Things Automated",
  description: "Practical guidance on lighting control, cameras, networking and prewire for Gulf Coast homeowners, builders and designers.",
});

export default function Blog() {
  return (
    <PageShell>
      <section className="indexHero journalHero shell">
        <p className="eyebrow">The ATA Journal</p>
        <h1>Clear answers for<br /><em>better-connected homes.</em></h1>
        <p>Practical guidance on lighting, automation, security, networking, and planning—written for homeowners, builders, and designers.</p>
      </section>
      <section className="journalGrid shell">
        {articleOrder.map((slug, index) => {
          const article = articles[slug];
          return (
            <a className={index === 0 ? "journalCard leadStory" : "journalCard"} href={`/blog/${slug}`} key={slug}>
              <Picture slot={article.image} sizes={index === 0 ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 33vw"} />
              <div><span>{article.category}</span><h2>{article.title}</h2><p>{article.dek}</p><small>{readTime(article)} · Read article <Arrow /></small></div>
            </a>
          );
        })}
      </section>
      <AssessmentBand />
    </PageShell>
  );
}
