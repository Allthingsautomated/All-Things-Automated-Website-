import { credentialLabel } from "./credentials";
import { type BrandPage, brandOrder, brandPages } from "./partners";
import { Arrow, AssessmentBand, JsonLd, PageHero, PageShell, PhoneLink, breadcrumbData, pageMeta } from "./site";
import { bookPath, mainPhone, siteUrl } from "./site-config";

export function brandMeta(brand: BrandPage) {
  return pageMeta({
    path: `/partners/${brand.id}`,
    title: [brand.name, credentialLabel(brand.id), "All Things Automated"].filter((part, i, parts) => parts.indexOf(part) === i).join(" | "),
    description: brand.metaDescription,
    image: brand.image,
  });
}

// A page for one brand in the partner rail. The showcase section appears once the brand has real projects.
export function BrandPageView({ brand }: { brand: BrandPage }) {
  const others = brandOrder.filter(id => id !== brand.id).map(id => brandPages[id]);
  return (
    <PageShell>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${brand.name} — All Things Automated`,
        description: brand.metaDescription,
        url: `${siteUrl}/partners/${brand.id}`,
        about: { "@type": "Brand", name: brand.name },
        provider: { "@id": `${siteUrl}/#business` },
      }} />
      <JsonLd data={breadcrumbData([["Systems", "/services"], [brand.name, `/partners/${brand.id}`]])} />
      <PageHero slot={brand.image} eyebrow={credentialLabel(brand.id)} title={brand.title} italic={brand.italic} intro={brand.intro}>
        <a className="button" href={bookPath}>Discuss your project <Arrow /></a>
        <PhoneLink className="lightLink under" phone={mainPhone} prefix="Call " />
      </PageHero>
      <section className="serviceIntro shell">
        <p className="eyebrow">What we install</p>
        <h2>{brand.name}, designed into the home and set up to just work.</h2>
      </section>
      <section className="detailGrid shell">
        {brand.offer.map((item, index) => (
          <article key={item.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>
      {brand.projects.length > 0 && (
        <section className="brandProjects shell">
          <p className="eyebrow">{brand.name} projects</p>
          <div>
            {brand.projects.map(project => (
              <article key={project.title}>
                {project.image && <img src={project.image} alt={project.title} loading="lazy" decoding="async" />}
                <span>{project.city}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="moreServices shell">
        <p className="eyebrow">Related services</p>
        <ul>{brand.related.map(link => <li key={link.href}><a href={link.href}>{link.label} <Arrow /></a></li>)}</ul>
      </section>
      <section className="moreServices shell">
        <p className="eyebrow">Other brands we install</p>
        <ul>{others.map(other => <li key={other.id}><a href={`/partners/${other.id}`}>{other.name} <Arrow /></a></li>)}</ul>
      </section>
      <AssessmentBand />
    </PageShell>
  );
}
