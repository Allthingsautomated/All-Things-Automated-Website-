import HeroSection from "@/components/ui/hero-section"
import ServicesGrid from "@/components/ui/services-grid"

export const metadata = {
  title: "Smart Home Services | All Things Automated",
  description: "Explore our comprehensive smart home services: smart lighting, security systems, climate control, and full home automation.",
}

export default function Services() {
  return (
    <>
      <HeroSection
        label="What We Offer"
        title="Smart Home Services Designed for You"
        subtitle="Comprehensive smart home solutions for lighting, security, climate control, and full automation."
        backgroundImage="https://images.unsplash.com/photo-1579546404522-a03d0b3d37dd?w=1920&q=80"
        backgroundImageAlt="Smart home control system interface"
        buttons={[
          { text: "Request a Consultation", href: "/contact", variant: "primary" },
        ]}
      />

      <ServicesGrid
        services={[
          {
            title: "Smart Lighting",
            description: "Scene control, dimming, and automated scheduling powered by Lutron and leading platforms.",
            icon: "lightbulb",
          },
          {
            title: "Security & Cameras",
            description: "HD camera systems, smart locks, video doorbells, and 24/7 remote monitoring access.",
            icon: "shield",
          },
          {
            title: "Climate Control",
            description: "Intelligent thermostat systems with multi-zone scheduling and energy optimization.",
            icon: "thermometer",
          },
          {
            title: "Full Automation",
            description: "Unified control of all systems from one interface — lighting, climate, security, and entertainment.",
            icon: "tv",
          },
        ]}
      />

      <section className="py-20 px-6 md:px-12 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Service Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-800 rounded-xl border border-zinc-700">
              <h3 className="text-2xl font-bold text-white mb-4">Sarasota County</h3>
              <p className="text-zinc-400">
                Serving all of Sarasota County including Sarasota, Bradenton, Lakewood Ranch, and surrounding areas.
              </p>
            </div>
            <div className="p-8 bg-zinc-800 rounded-xl border border-zinc-700">
              <h3 className="text-2xl font-bold text-white mb-4">Manatee County</h3>
              <p className="text-zinc-400">
                Expert smart home installations throughout Manatee County and the greater Tampa Bay area.
              </p>
            </div>
            <div className="p-8 bg-zinc-800 rounded-xl border border-zinc-700">
              <h3 className="text-2xl font-bold text-white mb-4">Charlotte County</h3>
              <p className="text-zinc-400">
                Comprehensive smart home services for Port Charlotte, Punta Gorda, and surrounding communities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
