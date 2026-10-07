import type { Metadata } from "next";
import { Picture, type SlotName, hasImage, imageUrl } from "./images";
import { MobileMenu } from "./mobile-menu";
import {
  bookPath,
  email,
  hours,
  instagramUrl,
  licenseNumber,
  mainPhone,
  type PhoneLine,
  serviceArea,
  serviceAreaFull,
  siteName,
  siteUrl,
} from "./site-config";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

// Builds per-page title, description, canonical URL and share-card tags.
export function pageMeta({ path, title, description, image = "/brand/og-image.jpg", type = "website" }: {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: siteName }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName, type, locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Wordmark({ lazy = false }: { lazy?: boolean }) {
  return (
    <picture className="wordmark">
      <source media="(max-width: 620px)" srcSet="/brand/ata-logo-compact.webp 2x, /brand/ata-logo-compact@3x.webp 3x" type="image/webp" />
      <source media="(max-width: 620px)" srcSet="/brand/ata-logo-compact.png" />
      <source srcSet="/brand/ata-logo.webp 2x, /brand/ata-logo@3x.webp 3x" type="image/webp" />
      <img src="/brand/ata-logo.png" width={410} height={107} alt="All Things Automated" loading={lazy ? "lazy" : undefined} />
    </picture>
  );
}

export function PhoneLink({ phone, prefix = "", className }: { phone: PhoneLine; prefix?: string; className?: string }) {
  return <a className={className} href={`tel:${phone.tel}`}>{prefix}{phone.display}</a>;
}

const primaryLinks = [
  { href: "/services", label: "Systems" },
  { href: "/electrical", label: "Electrical" },
  { href: "/lutron-help-line", label: "Lutron Help" },
  { href: "/for-builders", label: "Builders" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
];

const mobileLinks = [
  ...primaryLinks.slice(0, 4),
  { href: "/process", label: "Our process" },
  ...primaryLinks.slice(4),
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "header" : "header interiorHeader"}>
      <a href="/" aria-label="All Things Automated home"><Wordmark /></a>
      <nav aria-label="Primary navigation">
        {primaryLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
      <a className="headerCta" href={bookPath}>Book assessment <Arrow /></a>
      <MobileMenu links={mobileLinks} phone={mainPhone} bookHref={bookPath} />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div>
        <Wordmark lazy />
        <p>Lighting control, automation, security, energy, and electrical work for Florida&apos;s Gulf Coast. Founded in Sarasota in 2019.</p>
      </div>
      <div>
        <span>Explore</span>
        <a href="/services">Systems</a>
        <a href="/electrical">Electrical services</a>
        <a href="/lutron-help-line">Lutron Help Line</a>
        <a href="/for-builders">For builders &amp; designers</a>
        <a href="/process">Our process</a>
        <a href="/service-area">Service area</a>
        <a href="/blog">Journal</a>
      </div>
      <div>
        <span>Contact</span>
        <PhoneLink phone={mainPhone} />
        <a href={`mailto:${email}`}>{email}</a>
        <a href="/contact">All contact options</a>
        <a href={instagramUrl} rel="noopener" target="_blank">Instagram @allthingsautomated8</a>
        {hours && <p className="footNote">{hours}</p>}
      </div>
      <div className="footerLegal">
        <p>Serving {serviceAreaFull}.{licenseNumber && <> Licensed &amp; insured — FL Lic. #{licenseNumber}.</>}</p>
        <nav aria-label="Legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>
      </div>
      <small>© {new Date().getFullYear()} All Things Automated · Sarasota, Florida</small>
    </footer>
  );
}

export function PageShell({ children, overlayHeader = false }: { children: React.ReactNode; overlayHeader?: boolean }) {
  return (
    <>
      <SiteHeader overlay={overlayHeader} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}

// The assessment is booked through the main line; service-specific lines appear elsewhere on the page.
export function AssessmentBand({ id }: { id?: string }) {
  return (
    <section className="assessment shell interiorAssessment" id={id}>
      <div className="assessmentCard">
        <div>
          <p className="eyebrow light">Ready when you are</p>
          <h2>Start with a professional<br /><em>on-site assessment.</em></h2>
          <p>We visit the property, understand the goals, and determine the right system before recommending equipment.</p>
        </div>
        <aside>
          <span>Professional assessment</span>
          <strong>On-site</strong>
          <p>A walk-through of your property with a clear recommendation and next steps.</p>
          <ul>
            <li>On-site property walk-through</li>
            <li>Needs and infrastructure review</li>
            <li>System recommendation and next-step scope</li>
          </ul>
          <a className="button" href={bookPath}>Book your assessment <Arrow /></a>
          <PhoneLink className="phone" phone={mainPhone} prefix="Or call " />
        </aside>
      </div>
    </section>
  );
}

// Interior page hero: full-bleed photo when the slot's files exist, dark text panel otherwise.
export function PageHero({ slot, eyebrow, title, italic, intro, children }: {
  slot?: SlotName;
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  children?: React.ReactNode;
}) {
  const photo = slot && hasImage(slot);
  return (
    <section className={photo ? "pageHero" : "pageHero textHero"}>
      {photo && <Picture slot={slot} loading="eager" />}
      {photo && <div className="pageHeroShade" />}
      <div className="pageHeroCopy">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}<br /><em>{italic}</em></h1>
        <p>{intro}</p>
        {children && <div className="heroActions">{children}</div>}
      </div>
    </section>
  );
}

export type Service = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  image?: SlotName;
  secondImage?: SlotName;
  statement: string;
  details: { title: string; copy: string }[];
  ideal: string[];
  idealHeading?: string;
  phone?: PhoneLine;
  callout?: { eyebrow: string; heading: string; copy: string; href: string; link: string };
  // Questions ship without answers until Jorge approves them; unanswered ones are not published.
  faqs?: { q: string; a: string }[];
};

export function answered(faqs: { q: string; a: string }[] = []) {
  return faqs.filter(faq => faq.a.trim());
}

export function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const list = answered(faqs);
  if (!list.length) return null;
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: list.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
      }} />
      <section className="faq shell">
        <p className="eyebrow">Common questions</p>
        <dl>{list.map(faq => <div key={faq.q}><dt>{faq.q}</dt><dd>{faq.a}</dd></div>)}</dl>
      </section>
    </>
  );
}

export function serviceMeta(service: Service) {
  return pageMeta({ path: service.path, title: service.metaTitle, description: service.metaDescription });
}

export function ServicePage({ service }: { service: Service }) {
  const phone = service.phone ?? mainPhone;
  return (
    <PageShell>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.metaTitle.split(" | ")[0],
        description: service.metaDescription,
        url: `${siteUrl}${service.path}`,
        provider: { "@id": `${siteUrl}/#business` },
        areaServed: serviceArea.map(name => ({ "@type": "City", name })),
      }} />
      <PageHero slot={service.image} eyebrow={service.eyebrow} title={service.title} italic={service.italic} intro={service.intro}>
        <a className="button" href={bookPath}>Discuss your project <Arrow /></a>
        <PhoneLink className="lightLink under" phone={phone} prefix="Call " />
      </PageHero>
      <section className="serviceIntro shell">
        <p className="eyebrow">Designed as a complete system</p>
        <h2>{service.statement}</h2>
      </section>
      <section className="detailGrid shell">
        {service.details.map((detail, index) => (
          <article key={detail.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{detail.title}</h3>
            <p>{detail.copy}</p>
          </article>
        ))}
      </section>
      {service.secondImage && hasImage(service.secondImage) && (
        <section className="inlineImage shell">
          <Picture slot={service.secondImage} sizes="(max-width: 900px) 100vw, 1200px" />
        </section>
      )}
      <section className="ideal shell">
        <div>
          <p className="eyebrow light">A strong fit for</p>
          <h2>{service.idealHeading ?? "Built around the property—not a box of devices."}</h2>
        </div>
        <ul>{service.ideal.map(item => <li key={item}>{item}</li>)}</ul>
      </section>
      {service.callout && (
        <section className="callout shell">
          <p className="eyebrow">{service.callout.eyebrow}</p>
          <div>
            <h2>{service.callout.heading}</h2>
            <div>
              <p>{service.callout.copy}</p>
              <a className="under" href={service.callout.href}>{service.callout.link} <Arrow /></a>
            </div>
          </div>
        </section>
      )}
      {service.faqs && <FaqSection faqs={service.faqs} />}
      <AssessmentBand />
    </PageShell>
  );
}

export type Article = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  date: string;
  datePublished: string;
  image: SlotName;
  sections: { heading: string; paragraphs: string[] }[];
  faqs?: { q: string; a: string }[];
  related: { href: string; label: string }[];
};

export function readTime(article: Article) {
  const text = [
    article.dek,
    ...article.sections.flatMap(section => [section.heading, ...section.paragraphs]),
    ...answered(article.faqs).flatMap(faq => [faq.q, faq.a]),
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 225))} minute read`;
}

export function articleMeta(article: Article) {
  return pageMeta({ path: `/blog/${article.slug}`, title: `${article.title} | All Things Automated`, description: article.dek, type: "article" });
}

export function ArticlePage({ article }: { article: Article }) {
  return (
    <PageShell>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.dek,
        datePublished: article.datePublished,
        image: imageUrl(article.image) && `${siteUrl}${imageUrl(article.image)}`,
        url: `${siteUrl}/blog/${article.slug}`,
        author: { "@type": "Organization", name: siteName, url: siteUrl },
        publisher: { "@id": `${siteUrl}/#business` },
      }} />
      <article className="article">
        <header className="articleHead shell">
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="articleDek">{article.dek}</p>
          <div className="articleMeta"><time dateTime={article.datePublished}>{article.date}</time><span>{readTime(article)}</span><span>All Things Automated</span></div>
        </header>
        <Picture className="articleImage" slot={article.image} loading="eager" />
        <div className="articleBody">
          {article.sections.map(section => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          {article.faqs && answered(article.faqs).length > 0 && (
            <section className="articleFaq">
              <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: answered(article.faqs).map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
              }} />
              <h2>Common questions</h2>
              <dl>{answered(article.faqs).map(faq => <div key={faq.q}><dt>{faq.q}</dt><dd>{faq.a}</dd></div>)}</dl>
            </section>
          )}
          <nav className="related" aria-label="Related systems">
            <p className="eyebrow">Related</p>
            {article.related.map(link => <a key={link.href} href={link.href}>{link.label} <Arrow /></a>)}
          </nav>
          <aside className="articleCta">
            <p className="eyebrow light">Planning a project?</p>
            <h2>Make the system decisions before the walls are finished.</h2>
            <a className="button" href={bookPath}>Book an assessment <Arrow /></a>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}
