import { Arrow, PageShell, PhoneLink, pageMeta } from "../site";
import { email, lutronPhone } from "../site-config";

export const metadata = pageMeta({
  path: "/for-builders",
  title: "For Builders & Designers: Free Lutron RA3 Quotes | ATA",
  description: "Free Lutron RadioRA 3 lighting-control design and quotes for builders, remodelers, interior designers, architects and showrooms on the Gulf Coast.",
});

const audiences = [
  { title: "Builders", copy: "Lighting control, prewire, networking, and cameras coordinated with your schedule and your electrician." },
  { title: "Remodelers", copy: "Retrofit-friendly Lutron solutions for occupied homes, with a plan for what stays and what changes." },
  { title: "Designers & architects", copy: "Keypad engraving, finishes, shade fabrics, and lighting scenes that match the design intent." },
  { title: "Showrooms", copy: "A dealer partner who can quote and install what your clients pick out." },
];

export default function ForBuilders() {
  const subject = encodeURIComponent("Lutron RA3 quote request");
  return (
    <PageShell>
      <section className="pageHero textHero">
        <div className="pageHeroCopy">
          <p className="eyebrow light">For builders, remodelers &amp; designers</p>
          <h1>Free Lutron RadioRA 3<br /><em>quotes for the trade.</em></h1>
          <p>Send the plans. We return a lighting-control design and quote your client can review before the walls close.</p>
          <div className="heroActions">
            <a className="button" href={`mailto:${email}?subject=${subject}`}>Send plans by email <Arrow /></a>
            <PhoneLink className="lightLink under" phone={lutronPhone} prefix="Call " />
          </div>
        </div>
      </section>
      <section className="detailGrid shell">
        {audiences.map((item, index) => (
          <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.copy}</p></article>
        ))}
      </section>
      <section className="callout shell">
        <p className="eyebrow">What to send</p>
        <div>
          <h2>Plans, the lighting layout, and a timeline.</h2>
          <div>
            <p>Electrical or lighting plans (PDF is fine), the client&apos;s priorities if you know them, and when rough-in is scheduled. We will follow up with questions and a quote.</p>
            <a className="under" href={`mailto:${email}?subject=${subject}`}>{email} <Arrow /></a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
