import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Home Blog | All Things Automated',
  description: 'Expert insights, guides, and tips about smart home automation, lighting, security, and technology trends.',
}

const blogPosts = [
  {
    slug: '5-things-to-know',
    title: '5 Things to Know Before Automating Your Home',
    category: 'Home Value',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80',
    excerpt: 'Planning a smart home? Here are the five most important things every homeowner should consider before getting started.',
  },
  {
    slug: 'lutron-vs-control4',
    title: 'Lutron vs Control4: Which System Is Right for You?',
    category: 'Voice Control',
    image: 'https://images.unsplash.com/photo-1556740758-90de940a6a3e?w=600&q=80',
    excerpt: 'An honest comparison of two leading smart home platforms — features, cost, and which is best for your home.',
  },
  {
    slug: 'ai-smart-security-2026',
    title: 'How AI Is Transforming Smart Home Security in 2026',
    category: 'AI &amp; Security',
    image: 'https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=600',
    excerpt: 'From person detection to license plate recognition, AI is turning cameras into intelligent sentinels. Here&apos;s what&apos;s changed.',
  },
  {
    slug: 'ubiquiti-unifi-ai',
    title: 'Ubiquiti UniFi AI Cameras: Why We Choose Them',
    category: 'Security',
    image: 'https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=600',
    excerpt: 'No monthly fees. Local AI processing. Total integration. Here&apos;s why UniFi AI is the only camera system we recommend for serious surveillance.',
  },
  {
    slug: 'smart-lighting-trends',
    title: 'The Future of Smart Lighting: Trends in 2026',
    category: 'Smart Lighting',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    excerpt: 'Tunable white, human-centric lighting, and AI-driven scene creation are reshaping how we light our homes.',
  },
  {
    slug: 'smart-home-roi',
    title: 'Does Smart Home Automation Add to Home Value?',
    category: 'Home Value',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&q=80',
    excerpt: 'The answer might surprise you. We break down the ROI of smart home investments for Sarasota homeowners.',
  },
]

export default function BlogPage() {
  return (
    <>
      {/* HERO */}
      <section id="main" className="hero-page">
        <h1>Smart Home Tips &amp; Guides</h1>
        <p>Expert insights, industry updates, and practical advice to help you make the most of your smart home investment.</p>
      </section>

      {/* BLOG GRID */}
      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <span className="badge-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`}>Read More →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Learn More?</h2>
          <p>Have questions about smart home technology? Get in touch with our team.</p>
          <a href="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </a>
        </div>
      </section>
    </>
  )
}
