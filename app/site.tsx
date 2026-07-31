const assessmentUrl = "https://itsallthingsautomated.com/schedule/";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <img src="/brand/all-things-automated-logo.png" alt="All Things Automated" />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="header interiorHeader">
      <a href="/" aria-label="All Things Automated home"><Wordmark /></a>
      <nav aria-label="Primary navigation">
        <a href="/services">Systems</a>
        <a href="/process">Process</a>
        <a href="/about">About</a>
        <a href="/blog">Journal</a>
      </nav>
      <a className="headerCta" href={assessmentUrl}>Book assessment <Arrow /></a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div><Wordmark /><p>Professionally designed smart-home systems for Florida&apos;s Gulf Coast.</p></div>
      <div>
        <span>Explore</span>
        <a href="/services">Systems</a>
        <a href="/process">Our process</a>
        <a href="/blog">Journal</a>
      </div>
      <div>
        <span>Contact</span>
        <a href="tel:+19412635325">(941) 263-5325</a>
        <a href="mailto:hello@allthingsautomated.com">hello@allthingsautomated.com</a>
      </div>
      <small>© 2026 All Things Automated · Sarasota · Bradenton · Venice</small>
    </footer>
  );
}

export function AssessmentBand() {
  return (
    <section className="assessment shell interiorAssessment">
      <div className="assessmentCard">
        <div>
          <p className="eyebrow light">Ready when you are</p>
          <h2>Start with a professional<br /><em>on-site assessment.</em></h2>
          <p>We visit the property, understand the goals, and determine the right system before recommending equipment.</p>
        </div>
        <aside>
          <span>Professional assessment</span>
          <strong>$100</strong>
          <p>Applied toward your invoice when the project is accepted.</p>
          <a className="button" href={assessmentUrl}>Book your assessment <Arrow /></a>
          <a className="phone" href="tel:+19412635325">Or call (941) 263-5325</a>
        </aside>
      </div>
    </section>
  );
}

export type Service = {
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  image: string;
  statement: string;
  details: { title: string; copy: string }[];
  ideal: string[];
};

export function ServicePage({ service }: { service: Service }) {
  return (
    <main>
      <SiteHeader />
      <section className="pageHero">
        <img src={service.image} alt="" />
        <div className="pageHeroShade" />
        <div className="pageHeroCopy">
          <p className="eyebrow light">{service.eyebrow}</p>
          <h1>{service.title}<br /><em>{service.italic}</em></h1>
          <p>{service.intro}</p>
          <a className="button" href={assessmentUrl}>Discuss your project <Arrow /></a>
        </div>
      </section>
      <section className="serviceIntro shell">
        <p className="eyebrow">Designed as a complete system</p>
        <h2>{service.statement}</h2>
      </section>
      <section className="detailGrid shell">
        {service.details.map((detail, index) => (
          <article key={detail.title}>
            <span>0{index + 1}</span>
            <h3>{detail.title}</h3>
            <p>{detail.copy}</p>
          </article>
        ))}
      </section>
      <section className="ideal shell">
        <div>
          <p className="eyebrow light">A strong fit for</p>
          <h2>Built around the property—not a box of devices.</h2>
        </div>
        <ul>{service.ideal.map(item => <li key={item}>{item}</li>)}</ul>
      </section>
      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}

export type Article = {
  category: string;
  title: string;
  dek: string;
  date: string;
  readTime: string;
  image: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export function ArticlePage({ article }: { article: Article }) {
  return (
    <main>
      <SiteHeader />
      <article className="article">
        <header className="articleHead shell">
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="articleDek">{article.dek}</p>
          <div className="articleMeta"><span>{article.date}</span><span>{article.readTime}</span><span>All Things Automated</span></div>
        </header>
        <img className="articleImage" src={article.image} alt="" />
        <div className="articleBody">
          {article.sections.map(section => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <aside className="articleCta">
            <p className="eyebrow light">Planning a project?</p>
            <h2>Make the system decisions before the walls are finished.</h2>
            <a className="button" href={assessmentUrl}>Book an assessment <Arrow /></a>
          </aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
