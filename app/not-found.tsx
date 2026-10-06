import Link from "next/link";
import { Arrow, PageShell } from "./site";
import { bookPath } from "./site-config";

export default function NotFound() {
  return (
    <PageShell>
      <section className="indexHero shell">
        <p className="eyebrow">Page not found</p>
        <h1>This page<br /><em>isn&apos;t here.</em></h1>
        <p>It may have moved. Try one of these instead.</p>
      </section>
      <section className="moreServices shell">
        <ul>
          <li><Link href="/">Home <Arrow /></Link></li>
          <li><a href="/services">Systems <Arrow /></a></li>
          <li><a href="/lutron-help-line">Lutron Help Line <Arrow /></a></li>
          <li><a href={bookPath}>Book an assessment <Arrow /></a></li>
        </ul>
      </section>
    </PageShell>
  );
}
