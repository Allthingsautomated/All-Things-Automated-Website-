import HeroSection from "@/components/ui/hero-section"

export const metadata = {
  title: "About All Things Automated | Smart Home Experts in Sarasota",
  description: "Learn about All Things Automated - Sarasota's premier smart home automation company with 6+ years of experience and 500+ homes automated.",
}

export default function About() {
  return (
    <>
      <HeroSection
        label="Our Story"
        title="Smart Home Experts You Can Trust"
        subtitle="With over 6 years of experience and 500+ homes automated, we're Sarasota's premier smart home automation company."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
        backgroundImageAlt="Professional team installing smart home systems"
      />

      <section className="py-20 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose All Things Automated?</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl">✓</span>
                  <span className="text-zinc-300">6+ years of experience in smart home automation</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl">✓</span>
                  <span className="text-zinc-300">500+ homes successfully automated</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl">✓</span>
                  <span className="text-zinc-300">5.0 Google rating with 500+ reviews</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl">✓</span>
                  <span className="text-zinc-300">Certified installers and ongoing support</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl">✓</span>
                  <span className="text-zinc-300">Full warranty on all installations</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                To transform homes on Florida's Gulf Coast with intelligent automation technology that enhances comfort, security, and energy efficiency.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                We believe every home deserves smart technology that works seamlessly. Our expert team combines cutting-edge products with personalized service to create automation systems that truly fit your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
