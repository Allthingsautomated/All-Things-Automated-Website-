import { Metadata } from 'next'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | All Things Automated`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Post not found</h1>
          <p><a href="/blog">← Back to blog</a></p>
        </div>
      </div>
    )
  }

  const content = post.content
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/gm, '')
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .split('</p><p>')
    .map((p, i) => (p.includes('<li>') || p.includes('<h') ? p : `<p>${p}</p>`))
    .join('')

  return (
    <>
      <section id="main" className="hero-page">
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </section>

      <section style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              borderRadius: '16px',
              marginBottom: '48px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            }}
          />

          <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', fontSize: '14px', color: 'var(--color-text)' }}>
            <span style={{ display: 'inline-block', background: 'rgba(74,159,255,0.1)', color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '100px', fontWeight: 600 }}>
              {post.category}
            </span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>By {post.author}</span>
          </div>

          <div
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-text-light)',
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
            <a href="/blog" style={{ color: 'var(--color-primary)', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>
              ← Back to all posts
            </a>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Automate Your Home?</h2>
          <p>Get in touch with our team to discuss your smart home vision.</p>
          <a href="/contact" className="btn btn-primary btn-lg">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
