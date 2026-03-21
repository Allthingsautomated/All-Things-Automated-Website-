'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    service: 'general',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', city: '', service: 'general', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMsg('There was an error submitting your form. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Smith"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(941) 123-4567"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          placeholder="Sarasota"
        />
      </div>

      <div className="form-group">
        <label htmlFor="service">What service interests you?</label>
        <select name="service" id="service" value={formData.service} onChange={handleChange}>
          <option value="general">General Inquiry</option>
          <option value="lighting">Smart Lighting</option>
          <option value="security">Security &amp; Cameras</option>
          <option value="climate">Climate Control</option>
          <option value="automation">Full Automation</option>
          <option value="design">Design Services</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={5}
        />
      </div>

      {status === 'success' && <div className="form-success">Thank you! We&apos;ll be in touch soon.</div>}
      {status === 'error' && <div className="form-error">{errorMsg}</div>}

      <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-lg">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
