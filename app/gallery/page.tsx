import HeroSection from "@/components/ui/hero-section"

export const metadata = {
  title: "Gallery | All Things Automated",
  description: "View our portfolio of completed smart home automation projects in Sarasota, Manatee, and Charlotte Counties.",
}

const galleryImages = [
  {
    title: "Modern Living Room Automation",
    category: "Lighting & Control",
  },
  {
    title: "Smart Security System",
    category: "Security",
  },
  {
    title: "Climate Control Dashboard",
    category: "HVAC",
  },
  {
    title: "Smart Home Theater",
    category: "Entertainment",
  },
  {
    title: "Kitchen Automation",
    category: "Full Automation",
  },
  {
    title: "Master Bedroom Setup",
    category: "Lighting",
  },
  {
    title: "Outdoor Lighting Control",
    category: "Outdoor",
  },
  {
    title: "Smart Entrance Security",
    category: "Security",
  },
  {
    title: "Custom Control Panel",
    category: "Control",
  },
]

export default function Gallery() {
  return (
    <>
      <HeroSection
        label="Our Work"
        title="Smart Home Projects We've Completed"
        subtitle="See our portfolio of beautiful smart home installations across Sarasota, Manatee, and Charlotte Counties."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        backgroundImageAlt="Gallery of completed smart home projects"
      />

      <section className="py-20 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-zinc-700 hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {image.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-blue-500 rounded-full text-white text-sm font-semibold">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 p-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your smart home project and create a custom solution for your needs.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
