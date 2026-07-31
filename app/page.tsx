const systems = [
  {
    number: "01",
    label: "Lutron RadioRA 3",
    title: "Lighting that changes how the home feels.",
    copy: "Whole-home scenes, refined dimming, keypads, schedules, and shades—planned as part of the architecture instead of added room by room.",
    href: "/services/lighting",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88",
  },
  {
    number: "02",
    label: "UniFi Protect",
    title: "Security that knows what it sees.",
    copy: "Intentional camera coverage, intelligent detection, local recording, and secure remote access without a collection of disconnected devices.",
    href: "/services/security",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88",
  },
  {
    number: "03",
    label: "Savant · Audio · Network",
    title: "One home. One experience.",
    copy: "Lighting, climate, entertainment, Wi-Fi, and routines designed to work together through interfaces that feel natural to everyone.",
    href: "/services/automation",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=88",
  },
];

const steps = [
  ["01", "Assess", "We walk the property, listen to the goals, and identify the real opportunities and constraints."],
  ["02", "Design", "You receive a coordinated system plan built around the property, priorities, and investment level."],
  ["03", "Install", "Our team handles installation, programming, finish details, and system commissioning."],
  ["04", "Support", "We teach you the system and remain available as the home and your needs evolve."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Wordmark() {
  return (
    <span className="wordmark">
      <img
        src="/brand/all-things-automated-logo.png"
        alt="All Things Automated"
      />
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <header className="header">
        <a href="#top" aria-label="All Things Automated home"><Wordmark /></a>
        <nav aria-label="Primary navigation">
          <a href="/services">Systems</a>
          <a href="/process">Process</a>
          <a href="/about">About</a>
          <a href="/blog">Journal</a>
        </nav>
        <a className="headerCta" href="#assessment">Start a project <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
          alt="Modern luxury home at blue hour"
        />
        <div className="shade" />
        <div className="heroCopy">
          <p className="eyebrow light">Smart home design · Sarasota, Florida</p>
          <h1>A smarter home<br />should feel <em>effortless.</em></h1>
          <p className="lead">Lighting, security, climate, sound, and control—designed as one complete system and installed by one accountable team.</p>
          <div className="actions">
            <a className="button" href="#assessment">Start your project <Arrow /></a>
            <a className="under lightLink" href="#systems">Explore our systems ↓</a>
          </div>
        </div>
        <div className="proof">
          <div><strong>500+</strong><span>Homes automated</span></div>
          <div><strong>5.0</strong><span>Google rating</span></div>
          <div><strong>Local</strong><span>Sarasota · Bradenton · Venice</span></div>
        </div>
      </section>

      <section className="rail">
        <span>Designed &amp; installed by All Things Automated</span>
        <div><strong>Lutron RadioRA 3</strong><strong>Savant</strong><strong>UniFi</strong><strong>Whole-home audio</strong></div>
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
            <img src={item.image} alt="" />
            <div className="systemShade" />
            <div className="systemBody">
              <div className="meta"><span>{item.number}</span><span>{item.label}</span></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href={item.href}>Explore this system <Arrow /></a>
            </div>
          </article>
        ))}
      </section>

      <section className="statement" id="approach">
        <p className="eyebrow light">The All Things Automated approach</p>
        <h2>Not more technology.<br /><em>A better experience.</em></h2>
        <p>We begin with the property and the people using it. Every keypad, camera, speaker, network location, and automation should have a clear reason to exist.</p>
      </section>

      <section className="process shell">
        <div className="processHead">
          <p className="eyebrow">From walk-through to long-term support</p>
          <h2>Designed around how you live.</h2>
        </div>
        <div className="steps">
          {steps.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="assessment shell" id="assessment">
        <div className="assessmentCard">
          <div>
            <p className="eyebrow light">Ready when you are</p>
            <h2>Your project begins with<br /><em>a professional assessment.</em></h2>
            <p>We visit the property, understand the goals, and determine the right system before promising a price or solution.</p>
          </div>
          <aside>
            <span>Professional assessment</span>
            <strong>$100</strong>
            <p>Applied toward your invoice when the project is accepted.</p>
            <ul>
              <li>On-site property walk-through</li>
              <li>Needs and infrastructure review</li>
              <li>System recommendation and next-step scope</li>
            </ul>
            <a className="button" href="https://itsallthingsautomated.com/schedule/">Book your assessment <Arrow /></a>
            <a className="phone" href="tel:+19412635325">Or call (941) 263-5325</a>
          </aside>
        </div>
      </section>

      <footer>
        <div><Wordmark /><p>Professionally designed smart-home systems for Florida&apos;s Gulf Coast.</p></div>
        <div><span>Explore</span><a href="/services">Systems</a><a href="/process">Our process</a><a href="/blog">Journal</a></div>
        <div><span>Contact</span><a href="tel:+19412635325">(941) 263-5325</a><a href="mailto:hello@allthingsautomated.com">hello@allthingsautomated.com</a></div>
        <small>© 2026 All Things Automated · Sarasota · Bradenton · Venice</small>
      </footer>
    </main>
  );
}
