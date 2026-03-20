import { NextRequest, NextResponse } from 'next/server'

// Sample blog posts data
const blogPosts = [
  {
    id: 'ai-transforming-smart-home-security',
    title: 'How AI is Transforming Smart Home Security in 2026',
    slug: 'ai-transforming-smart-home-security',
    excerpt: 'Discover how artificial intelligence is revolutionizing home security systems with predictive analytics and intelligent monitoring.',
    content: 'Full article content here...',
    date: '2026-03-18',
    category: 'Security',
    author: 'All Things Automated',
  },
  {
    id: 'matter-protocol-smart-home-compatibility',
    title: 'Matter Protocol: The Future of Smart Home Compatibility',
    slug: 'matter-protocol-smart-home-compatibility',
    excerpt: 'Learn how the Matter protocol is solving interoperability issues and making smart homes more accessible.',
    content: 'Full article content here...',
    date: '2026-03-15',
    category: 'Technology',
    author: 'All Things Automated',
  },
  {
    id: '5-ways-ai-reduces-home-energy-bill',
    title: '5 Ways AI Reduces Your Home Energy Bill',
    slug: '5-ways-ai-reduces-home-energy-bill',
    excerpt: 'Smart thermostats and AI-powered systems can significantly reduce your energy costs. Here\'s how.',
    content: 'Full article content here...',
    date: '2026-03-12',
    category: 'Energy',
    author: 'All Things Automated',
  },
]

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')

    // Filter by category if provided
    let filteredPosts = blogPosts
    if (category) {
      filteredPosts = blogPosts.filter(post =>
        post.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Sort by date (newest first)
    filteredPosts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    // Apply pagination
    const paginatedPosts = filteredPosts.slice(offset, offset + limit)

    return NextResponse.json(
      {
        success: true,
        data: paginatedPosts,
        total: filteredPosts.length,
        limit,
        offset,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Blog API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
