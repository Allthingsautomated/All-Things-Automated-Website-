import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Smart Home Blog | All Things Automated',
  description: 'Expert insights, guides, and tips about smart home automation, lighting, security, and technology trends.',
}

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

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
          {blogPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text)' }}>
              <p>No published blog posts yet. Check back soon!</p>
            </div>
          ) : (
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
          )}
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
