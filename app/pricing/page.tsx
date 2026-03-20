import HeroSection from "@/components/ui/hero-section"

export const metadata = {
  title: "Smart Home Pricing | All Things Automated",
  description: "Transparent pricing for smart home automation solutions. From basic packages to full home integration.",
}

export default function Pricing() {
  return (
    <>
      <HeroSection
        label="Transparent Pricing"
        title="Smart Home Packages for Every Budget"
        subtitle="From basic installations to complete home automation, we have a solution that fits your needs and budget."
        backgroundImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80"
        backgroundImageAlt="Smart home pricing packages"
      />

      <section className="py-20 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Smart Starter",
                price: "$2,499",
                description: "Perfect for getting started with smart home automation",
                features: [
                  "Smart lighting system (3-5 rooms)",
                  "Smart thermostat",
                  "Voice control setup",
                  "Mobile app access",
                  "1 year warranty",
                ],
              },
              {
                name: "Complete Home",
                price: "$9,999",
                description: "Whole home automation with all major systems",
                features: [
                  "Smart lighting (entire home)",
                  "Security camera system",
                  "Smart climate control",
                  "Smart locks & entry",
                  "Voice control (all rooms)",
                  "3 year warranty",
                ],
                highlighted: true,
              },
              {
                name: "Luxury Integration",
                price: "Custom",
                description: "Premium automation with full integration",
                features: [
                  "All Complete Home features",
                  "Entertainment system integration",
                  "Smart blinds & shades",
                  "Custom automation rules",
                  "Premium support 24/7",
                  "5 year warranty",
                ],
              },
            ].map((pkg, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl border transition-all ${
                  pkg.highlighted
                    ? "bg-blue-500/10 border-blue-500/50 scale-105"
                    : "bg-zinc-800 border-zinc-700 hover:border-blue-500/30"
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-blue-400 text-4xl font-bold mb-4">{pkg.price}</p>
                <p className="text-zinc-400 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fidx) => (
                    <li key={fidx} className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    pkg.highlighted
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "border border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
