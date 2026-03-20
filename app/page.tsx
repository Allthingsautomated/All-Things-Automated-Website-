import HeroSection from "@/components/ui/hero-section"
import ServicesGrid from "@/components/ui/services-grid"
import FeaturedCrmDemoSection from "@/components/ui/featured-crm-demo-section"

export default function Home() {
  return (
    <>
      <HeroSection
        label="Sarasota's Premier Smart Home Experts"
        title="Intelligent Automation for Modern Living"
        subtitle="Transform your home with cutting-edge smart technology. From lighting and climate to security and full automation — we design, install, and support it all."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        backgroundImageAlt="Luxury modern home at twilight with warm interior lighting"
        buttons={[
          { text: "Request a Consultation", href: "/contact", variant: "primary" },
          { text: "See Our Work", href: "/services", variant: "outline" },
        ]}
        stats={[
          { number: "500+", label: "Homes Automated" },
          { number: "5.0", label: "Google Rating" },
          { number: "6+", label: "Years Experience" },
          { number: "3", label: "Counties Served" },
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

      <FeaturedCrmDemoSection />
    </>
  )
}
