import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json()

    if (!slug || !content) {
      return NextResponse.json({ error: 'Missing slug or content' }, { status: 400 })
    }

    // Ensure directory exists
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true })
    }

    // Save the markdown file
    const filePath = path.join(BLOG_DIR, `${slug}.md`)
    fs.writeFileSync(filePath, content, 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'Blog post saved successfully',
      slug
    })
  } catch (error) {
    console.error('Blog API Error:', error)
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 })
  }
}
