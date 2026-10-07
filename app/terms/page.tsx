import { PageShell, pageMeta } from "../site";
import { email, mainPhone } from "../site-config";

export const metadata = pageMeta({
  path: "/terms",
  title: "Website Terms of Use | All Things Automated",
  description: "Terms for using the All Things Automated website, booking an assessment, and submitting information through our forms.",
});

const updated = "October 7, 2026";

export default function Terms() {
  return (
    <PageShell>
      <section className="indexHero shell legalHero">
        <p className="eyebrow">Terms of use</p>
        <h1>Website<br /><em>terms of use.</em></h1>
        <p>Last updated {updated}.</p>
      </section>
      <article className="legal shell">
        <h2>About this site</h2>
        <p>This website is operated by All Things Automated, based in Sarasota, Florida. By using it you agree to these terms. If you do not agree, please do not use the site.</p>

        <h2>Information on the site</h2>
        <p>Content on this site is general information about the services we offer. It is not a quote, a design, or professional advice for a specific property. Equipment, pricing, availability, and recommendations depend on the property and are confirmed in a written estimate or contract.</p>
        <p>Photographs on the site illustrate the kinds of systems we design and install. Unless a photo is identified as one of our projects, it should not be taken as an image of our completed work.</p>

        <h2>Assessments and bookings</h2>
        <p>The on-site assessment fee is paid when you book and is credited to your project if you move forward with us. Emergency or same-day visits are charged at the posted emergency rate and are paid before dispatch. Rescheduling and cancellation follow the policy shown in the booking calendar. Any work beyond an assessment is governed by the written estimate or contract for that work, which takes precedence over anything on this site.</p>

        <h2>Forms and uploads</h2>
        <p>When you submit a form or upload plans, you confirm that the information is accurate and that you have the right to share any files you send. We use submissions only to respond to you and to prepare quotes, as described in our <a className="inline" href="/privacy">Privacy Policy</a>.</p>

        <h2>Trademarks</h2>
        <p>Lutron, RadioRA, Caséta, UniFi, Tesla, Powerwall, and other product names are trademarks of their respective owners and are used only to describe the products we work with. Their use does not imply endorsement.</p>

        <h2>Links</h2>
        <p>The site links to third-party services such as our booking calendar and social media. We are not responsible for the content or practices of those services.</p>

        <h2>Limitation of liability</h2>
        <p>The site is provided as is. To the extent permitted by law, All Things Automated is not liable for losses arising from use of the site or reliance on its general information.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Florida.</p>

        <h2>Contact</h2>
        <p>Questions about these terms: <a className="inline" href={`mailto:${email}`}>{email}</a> or <a className="inline" href={`tel:${mainPhone.tel}`}>{mainPhone.display}</a>.</p>
      </article>
    </PageShell>
  );
}
