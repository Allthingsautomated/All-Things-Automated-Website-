import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, projectType, message } = body

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
    // For now, just log the submission
    console.log('Contact form submission:', {
      firstName,
      lastName,
      email,
      phone,
      projectType,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will contact you soon!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
