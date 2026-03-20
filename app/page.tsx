import FeaturedCrmDemoSection from "@/components/ui/featured-crm-demo-section"
import AnimatedTextCycle from "@/components/ui/animated-text-cycle"

export default function Home() {
  return (
    <>
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your <AnimatedTextCycle
              words={[
                "smart home",
                "automation",
                "lifestyle",
                "control system",
              ]}
              interval={3000}
              className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            /> deserves
            <br />
            premium installation
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
            Transform your Sarasota home with cutting-edge smart automation. From lighting and climate control to security and full home integration.
          </p>
          <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
            Request a Consultation
          </button>
        </div>
      </section>

      <FeaturedCrmDemoSection />
    </>
  )
}
