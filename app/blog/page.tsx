import Link from "next/link"
import HeroSection from "@/components/ui/hero-section"
import { Calendar, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Smart Home Blog | All Things Automated",
  description: "Read our latest articles about smart home automation, smart technology trends, and home automation tips.",
}

const blogPosts = [
  {
    slug: "ai-transforming-smart-home-security",
    title: "How AI is Transforming Smart Home Security in 2026",
    excerpt: "Discover how artificial intelligence is revolutionizing home security systems with predictive analytics and intelligent monitoring.",
    date: "March 18, 2026",
    category: "Security",
  },
  {
    slug: "matter-protocol-smart-home-compatibility",
    title: "Matter Protocol: The Future of Smart Home Compatibility",
    excerpt: "Learn how the Matter protocol is solving interoperability issues and making smart homes more accessible.",
    date: "March 15, 2026",
    category: "Technology",
  },
  {
    slug: "5-ways-ai-reduces-home-energy-bill",
    title: "5 Ways AI Reduces Your Home Energy Bill",
    excerpt: "Smart thermostats and AI-powered systems can significantly reduce your energy costs. Here's how.",
    date: "March 12, 2026",
    category: "Energy",
  },
  {
    slug: "voice-control-smart-homes",
    title: "The Rise of Voice Control in Smart Homes",
    excerpt: "Voice assistants are becoming the primary interface for smart home control. What you need to know.",
    date: "March 10, 2026",
    category: "Voice Control",
  },
  {
    slug: "smart-lighting-circadian-rhythm",
    title: "Smart Lighting and Your Circadian Rhythm",
    excerpt: "How intelligent lighting systems can improve your sleep and overall health.",
    date: "March 8, 2026",
    category: "Lighting",
  },
  {
    slug: "ubiquiti-ai-cameras-home-surveillance",
    title: "Ubiquiti UniFi AI Cameras: Enterprise Security at Home",
    excerpt: "Explore why high-end security cameras are becoming more affordable for residential use.",
    date: "March 5, 2026",
    category: "Cameras",
  },
]

export default function Blog() {
  return (
    <>
      <HeroSection
        label="Our Blog"
        title="Smart Home Insights & Tips"
        subtitle="Stay informed with the latest trends, tips, and insights about smart home technology."
        backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80"
        backgroundImageAlt="Blog and articles about smart home technology"
      />

      <section className="py-20 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group h-full flex flex-col bg-zinc-800/50 border border-zinc-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:bg-zinc-800"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20"></div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar size={16} />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-zinc-400 flex-1">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mt-4"
                  >
                    Read More <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
