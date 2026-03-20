import HeroSection from "@/components/ui/hero-section"
import CaseStudies from "@/components/ui/case-studies"
import CTABanner from "@/components/ui/cta-banner"

export const metadata = {
  title: "Case Studies | All Things Automated",
  description: "Read our case studies showcasing smart home transformations and real-world automation solutions.",
}

const caseStudiesData = [
  {
    title: "Luxury Waterfront Smart Home",
    description: "Complete automation for a high-end waterfront residence in Sarasota",
    challenge: "The client needed unified control of lighting, climate, security, and entertainment across 8 rooms while maintaining a sophisticated aesthetic.",
    solution: "We installed a Lutron lighting system with scene control, Control4 climate management, Ubiquiti security cameras, and a centralized touchscreen interface.",
    results: [
      "40% reduction in energy consumption",
      "Complete voice control integration",
      "Centralized security monitoring",
      "Enhanced guest experience with preset scenes",
    ],
    tags: ["Lighting", "Security", "Climate", "Entertainment"],
  },
  {
    title: "Smart Renovation Project",
    description: "Retrofitting smart home technology into a mid-century modern home",
    challenge: "Upgrading an existing home without visible wiring or disrupting the original architecture.",
    solution: "We used wireless smart systems where possible and strategically placed conduit for necessary wiring. Implemented Lutron Caseta for lighting and a smart thermostat for HVAC control.",
    results: [
      "Seamless integration with existing décor",
      "Minimal construction disruption",
      "30% energy savings",
      "Mobile app control of all systems",
    ],
    tags: ["Retrofit", "Wireless", "Energy Efficient"],
  },
  {
    title: "Multi-Unit Property Automation",
    description: "Smart systems implementation for a luxury residential development",
    challenge: "Installing standardized smart systems across 12 identical units with minimal variation.",
    solution: "We designed a templated automation system that could be customized for each unit, including smart locks, lighting, and climate control.",
    results: [
      "Consistent experience across all units",
      "Reduced installation time per unit",
      "Higher property value and appeal",
      "Remote management capabilities for property management",
    ],
    tags: ["Multi-Unit", "Commercial", "Scalable"],
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <HeroSection
        label="Case Studies"
        title="Real-World Smart Home Transformations"
        subtitle="Discover how we've helped homeowners across Florida transform their spaces with intelligent automation."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
        backgroundImageAlt="Smart home installation project"
      />

      <CaseStudies caseStudies={caseStudiesData} />

      <CTABanner
        title="Ready to Transform Your Home?"
        subtitle="Let's discuss your smart home project and create a custom solution tailored to your needs."
        buttonText="Schedule Consultation"
        buttonHref="/contact"
        secondaryButtonText="View Pricing"
        secondaryButtonHref="/pricing"
      />
    </>
  )
}
