import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, city, service, message } = body

    const formData = {
      name: name || 'Unknown',
      email: email || '',
      phone: phone || '',
      city: city || '',
      service: service || '',
      message: message || '',
      _subject: `New Lead: ${name} - ${service}`,
      _template: 'table',
    }

    const res = await fetch('https://formsubmit.co/ajax/65a6ab2ee87c151ffec81e39d824f727', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      console.error('FormSubmit error:', res.statusText)
      return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
