import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  category: string
  image: string
  excerpt: string
  author: string
  date: string
  status: 'draft' | 'scheduled' | 'published'
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

function parseFrontmatter(fileContent: string): { frontmatter: Record<string, string>; content: string } {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, content: fileContent }
  }

  const frontmatterStr = match[1]
  const content = match[2]
  const frontmatter: Record<string, string> = {}

  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
      frontmatter[key.trim()] = value
    }
  })

  return { frontmatter, content }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter, content } = parseFrontmatter(fileContent)

    return {
      slug: frontmatter.slug || slug,
      title: frontmatter.title || 'Untitled',
      category: frontmatter.category || 'General',
      image: frontmatter.image || '',
      excerpt: frontmatter.excerpt || '',
      author: frontmatter.author || 'All Things Automated',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      status: (frontmatter.status as any) || 'draft',
      content,
    }
  } catch {
    return null
  }
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

    const posts = files
      .map(file => {
        const slug = file.replace('.md', '')
        return getBlogPost(slug)
      })
      .filter((post): post is BlogPost => post !== null)
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch {
    return []
  }
}

export function getAllBlogPostsIncludingDrafts(): BlogPost[] {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

    const posts = files
      .map(file => {
        const slug = file.replace('.md', '')
        return getBlogPost(slug)
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch {
    return []
  }
}
