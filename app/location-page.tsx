import { Picture } from "./images";
import { type Location, locations } from "./locations";
import { Arrow, AssessmentBand, JsonLd, PageShell, PhoneLink, pageMeta } from "./site";
import { mainPhone, siteName, siteUrl } from "./site-config";

export function locationMeta(location: Location) {
  return pageMeta({ path: `/${location.slug}`, title: location.metaTitle, description: location.metaDescription, image: location.image });
}

export function LocationPage({ slug }: { slug: string }) {
  const location = locations[slug];
  const url = `${siteUrl}/${location.slug}`;
  return (
    <PageShell>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Smart home, lighting control & security in ${location.city}`,
        url,
        provider: { "@id": `${siteUrl}/#business`, "@type": "LocalBusiness", name: siteName, areaServed: { "@type": "City", name: location.city } },
        areaServed: { "@type": "City", name: location.city, containedInPlace: { "@type": "State", name: "Florida" } },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Service area", item: `${siteUrl}/service-area` },
          { "@type": "ListItem", position: 3, name: location.city, item: url },
        ],
      }} />
      <section className="indexHero shell">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/service-area">Service area</a> / <span>{location.city}</span></nav>
        <p className="eyebrow">{location.county}</p>
        <h1>Smart homes in<br /><em>{location.city}.</em></h1>
        <p>{location.intro}</p>
      </section>
      {location.image && (
        <section className="inlineImage shell">
          <Picture slot={location.image} sizes="(max-width: 900px) 100vw, 1200px" />
        </section>
      )}
      <article className="legal shell locationBody">
        {location.sections.map(section => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map(paragraph => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
          </section>
        ))}
        <p>Questions about a {location.city} project? Call <PhoneLink className="inline" phone={mainPhone} />.</p>
      </article>
      <section className="moreServices shell">
        <p className="eyebrow">Systems for {location.city} homes</p>
        <ul>{location.links.map(link => <li key={link.href}><a href={link.href}>{link.label} <Arrow /></a></li>)}</ul>
      </section>
      <AssessmentBand />
    </PageShell>
  );
}
