import { Picture, type SlotName } from "./images";
import { Arrow, AssessmentBand, PageShell, PhoneLink, pageMeta } from "./site";
import { bookPath, lutronPhone } from "./site-config";

export const metadata = pageMeta({
  path: "/",
  title: "Smart Home Automation & Lutron Lighting | Sarasota, FL",
  description: "Lutron RadioRA 3 lighting, UniFi security, networking and whole-home control designed and installed by one team in Sarasota, Bradenton, Venice and Lakewood Ranch.",
});

const systems = [
  {
    number: "01",
    label: "Lutron RadioRA 3",
    title: "Lighting that changes how the home feels.",
    copy: "Whole-home scenes, refined dimming, keypads, schedules, and shades—planned as part of the architecture instead of added room by room.",
    href: "/services/lighting",
    image: "home-card-lutron-keypad" as SlotName,
    sizes: "(max-width: 900px) 100vw, 66vw",
  },
  {
    number: "02",
    label: "UniFi Protect",
    title: "Security that knows what it sees.",
    copy: "Intentional camera coverage, intelligent detection, local recording, and secure remote access without a collection of disconnected devices.",
    href: "/services/security",
    image: "home-card-unifi-camera" as SlotName,
    sizes: "(max-width: 900px) 100vw, 33vw",
  },
  {
    number: "03",
    label: "Whole-home control · Audio · Network",
    title: "One home. One experience.",
    copy: "Lighting, climate, entertainment, Wi-Fi, and routines designed to work together through interfaces that feel natural to everyone.",
    href: "/services/automation",
    image: "home-card-whole-home" as SlotName,
    sizes: "(max-width: 900px) 100vw, 33vw",
  },
];

const moreServices = [
  { href: "/services/landscape-lighting", label: "Landscape & architectural lighting" },
  { href: "/services/solar-tesla", label: "Tesla solar, Solar Roof & Powerwall" },
  { href: "/services/ev-chargers", label: "EV charger installation" },
];

const steps = [
  ["01", "Assess", "We walk the property, listen to the goals, and identify the real opportunities and constraints."],
  ["02", "Design", "You receive a coordinated system plan built around the property, priorities, and investment level."],
  ["03", "Install", "Our team handles installation, programming, finish details, and system commissioning."],
  ["04", "Support", "We teach you the system and remain available as the home and your needs evolve."],
];

export default function Home() {
  return (
    <PageShell overlayHeader>
      <section className="hero" id="top">
        <Picture slot="home-hero-blue-hour" loading="lcp" />
        <div className="shade" />
        <div className="heroCopy">
          <p className="eyebrow light">Smart home design · Sarasota, Florida</p>
          <h1>A smarter home<br />should feel <em>effortless.</em></h1>
          <p className="lead">Lighting, security, climate, sound, and control—designed as one complete system and installed by one accountable team.</p>
          <div className="actions">
            <a className="button" href={bookPath}>Book an assessment <Arrow /></a>
            <a className="under lightLink" href="#systems">Explore our systems ↓</a>
          </div>
        </div>
        <div className="proof">
          <div><strong>2019</strong><span>Founded in Sarasota</span></div>
          <div><strong>RA3</strong><span>Lutron RadioRA 3 dealer</span></div>
          <div><strong>24/7</strong><span>Lutron help line</span></div>
        </div>
      </section>

      <section className="rail">
        <span>Designed &amp; installed by All Things Automated</span>
        <div><strong>Lutron RadioRA 3</strong><strong>Lutron Caséta</strong><strong>UniFi</strong><strong>Tesla Energy</strong></div>
      </section>

      <section className="intro shell" id="systems">
        <p className="eyebrow">Connected living, professionally designed</p>
        <div>
          <h2>Technology should disappear<br /><em>into the architecture.</em></h2>
          <p>A real smart-home system is not a pile of apps and individual devices. It is a carefully planned layer of the home—quiet when you do not need it and intuitive when you do.</p>
        </div>
      </section>

      <section className="systemGrid shell">
        {systems.map((item, index) => (
          <article className={index === 0 ? "systemCard featured" : "systemCard"} key={item.number}>
            <Picture slot={item.image} sizes={item.sizes} />
            <div className="systemShade" />
            <div className="systemBody">
              <div className="meta"><span aria-hidden="true">{item.number}</span><span>{item.label}</span></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href={item.href}>Explore this system <Arrow /></a>
            </div>
          </article>
        ))}
      </section>

      <section className="moreServices shell">
        <p className="eyebrow">Also from our team</p>
        <ul>
          {moreServices.map(item => <li key={item.href}><a href={item.href}>{item.label} <Arrow /></a></li>)}
        </ul>
      </section>

      <section className="statement" id="approach">
        <p className="eyebrow light">The All Things Automated approach</p>
        <h2>Not more technology.<br /><em>A better experience.</em></h2>
        <p>We begin with the property and the people using it. Every keypad, camera, speaker, network location, and automation should have a clear reason to exist.</p>
      </section>

      <section className="callout shell">
        <p className="eyebrow">Lutron Help Line · 24/7</p>
        <div>
          <h2>Have a Lutron system? Call us any time—no matter who installed it.</h2>
          <div>
            <p>Keypads not responding, scenes that stopped working, an app that lost the system. Our Lutron line answers around the clock, and if the fix needs a visit we schedule a service call.</p>
            <PhoneLink className="under" phone={lutronPhone} prefix="Call " />
            <a className="under" href="/lutron-help-line">How the help line works <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="process shell">
        <div className="processHead">
          <p className="eyebrow">From walk-through to long-term support</p>
          <h2>Designed around how you live.</h2>
        </div>
        <div className="steps">
          {steps.map(([number, title, copy]) => (
            <article key={number}><span aria-hidden="true">{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="callout shell">
        <p className="eyebrow">For builders, remodelers &amp; designers</p>
        <div>
          <h2>Free Lutron RadioRA 3 quotes for the trade.</h2>
          <div>
            <p>Send the plans and we will return a lighting-control design and quote—so your client sees the system before the walls close.</p>
            <a className="under" href="/for-builders">Work with us <Arrow /></a>
          </div>
        </div>
      </section>

      <AssessmentBand id="assessment" />
    </PageShell>
  );
}
