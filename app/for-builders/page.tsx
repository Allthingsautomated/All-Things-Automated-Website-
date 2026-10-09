import { credentialLine } from "../credentials";
import { Arrow, PageHero, PageShell, PhoneLink, pageMeta } from "../site";
import { LeadForm } from "../lead-form";
import { email, lutronPhone, turnstileSiteKey } from "../site-config";

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
      <PageHero slot="builders-hero" eyebrow="For builders, remodelers & designers" title="Free Lutron RadioRA 3" italic="quotes for the trade." intro="Send the plans. We return a lighting-control design and quote your client can review before the walls close." cred={credentialLine("/for-builders")}>
        <a className="button" href="#trade-form">Request a quote <Arrow /></a>
        <PhoneLink className="lightLink under" phone={lutronPhone} prefix="Call " />
      </PageHero>
      <section className="detailGrid shell">
        {audiences.map((item, index) => (
          <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.copy}</p></article>
        ))}
      </section>
      <section className="formSection shell" id="trade-form">
        <div className="formIntro">
          <p className="eyebrow">Request a trade quote</p>
          <h2>Plans, the lighting layout, and a timeline.</h2>
          <p>Upload electrical or lighting plans (PDF is fine), tell us the client&apos;s priorities if you know them, and when rough-in is scheduled. We will follow up with questions and a quote.</p>
        </div>
        <LeadForm kind="trade" turnstileSiteKey={turnstileSiteKey} email={email} phone={lutronPhone} />
      </section>
      <section className="callout shell">
        <p className="eyebrow">Prefer email?</p>
        <div>
          <h2>Send plans straight to our inbox.</h2>
          <div>
            <p>Large plan sets or several files are easier by email.</p>
            <a className="under" href={`mailto:${email}?subject=${subject}`}>{email} <Arrow /></a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
