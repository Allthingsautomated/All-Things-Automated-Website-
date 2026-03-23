'use client'

import { useState, useRef, useEffect } from 'react'
import { Metadata } from 'next'

const ACUITY_BASE = 'https://allthingsautomatedcalendar.as.me/schedule/04821538'

const SERVICES = [
  {
    id: 74225838,
    name: 'On-Site Consultation & Estimate',
    price: '$100',
    duration: '60 min',
    desc: 'In-home assessment of your smart home or electrical needs. Fee is credited toward your project.',
    credit: true,
  },
  {
    id: 74227637,
    name: 'Smart Home System Installation',
    price: '$500',
    duration: '4 hrs',
    desc: 'Full installation including smart lighting, voice control, and security systems.',
  },
  {
    id: 90943626,
    name: 'Security Camera Installation',
    price: '$250',
    duration: '2 hrs',
    desc: 'Indoor and outdoor camera mounting, wiring, and full configuration.',
  },
  {
    id: 74227647,
    name: 'Smart Thermostat Installation',
    price: '$175',
    duration: '90 min',
    desc: 'Setup for Nest, Ecobee, Honeywell, and compatible devices.',
  },
  {
    id: 90943801,
    name: 'EV Charger Installation',
    price: '$350',
    duration: '3 hrs',
    desc: 'Level 2 (240V) charger mounting, wiring, and configuration.',
  },
  {
    id: 90943704,
    name: 'Smart Lock Installation',
    price: '$125',
    duration: '60 min',
    desc: 'Hardware removal, new lock installation, and access code setup.',
  },
  {
    id: 74225910,
    name: 'Service Call',
    price: '$150',
    duration: '60 min',
    desc: 'Diagnostics and repairs for smart home systems, thermostats, and wiring.',
  },
  {
    id: 90943938,
    name: 'Smart Home Annual Maintenance',
    price: '$150',
    duration: '90 min',
    desc: 'Firmware updates, connectivity checks, and full system inspection.',
  },
]

export default function SchedulePage() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const embedRef = useRef<HTMLDivElement>(null)

  // Pre-select service from URL ?service= param (e.g. from portfolio cards)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('service')
    if (id) {
      const matched = SERVICES.find(s => s.id === Number(id))
      if (matched) {
        setActiveId(matched.id)
        setTimeout(() => {
          embedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }
  }, [])

  const embedSrc = activeId
    ? `${ACUITY_BASE}?appointmentType=${activeId}&embed=1`
    : `${ACUITY_BASE}?embed=1`

  const handleSelect = (id: number) => {
    setActiveId(id)
    setTimeout(() => {
      embedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <>
      <section id="main" className="hero-page">
        <h1>Book a Service</h1>
        <p>Select a service below to go straight to booking. Online payment confirms your appointment.</p>
      </section>

      {/* SERVICE CARDS */}
      <section style={{ backgroundColor: 'var(--color-dark-2)', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Select a Service to Book</h2>
            <p className="section-subtitle">Click any service and we will load that booking form for you below.</p>
          </div>

          <div className="schedule-grid" style={{ marginTop: '40px' }}>
            {SERVICES.map(service => {
              const isActive = activeId === service.id
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelect(service.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(74,159,255,0.18) 0%, rgba(74,159,255,0.06) 100%)'
                      : 'var(--color-dark-card)',
                    border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    borderRadius: '12px',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 0 0 1px var(--color-primary)' : 'none',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    gap: '12px',
                  }}>
                    <span style={{
                      fontWeight: 700,
                      fontSize: '15px',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-white)',
                      lineHeight: 1.3,
                    }}>
                      {service.name}
                    </span>
                    <span style={{
                      background: isActive ? 'var(--color-primary)' : 'rgba(74,159,255,0.12)',
                      color: isActive ? '#fff' : 'var(--color-primary)',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {service.price}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--color-text)',
                    lineHeight: 1.6,
                    margin: '0 0 10px',
                  }}>
                    {service.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text)', letterSpacing: '0.2px' }}>
                      {service.duration}
                      {service.credit && (
                        <span style={{ color: '#10b981', marginLeft: '8px' }}>
                          · Fee credited to project
                        </span>
                      )}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                    }}>
                      {isActive ? 'Selected — see below' : 'Click to book'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* BOOKING EMBED */}
      <section ref={embedRef} style={{ backgroundColor: 'var(--color-dark)', paddingTop: '64px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="section-header center" style={{ marginBottom: '40px' }}>
            <div className="section-label">Online Booking</div>
            <h2 className="section-title">
              {activeId
                ? `Booking: ${SERVICES.find(s => s.id === activeId)?.name}`
                : 'Pick Your Date & Time'}
            </h2>
            {!activeId && (
              <p className="section-subtitle">
                Select a service above to jump straight to that booking, or browse all services below.
              </p>
            )}
          </div>

          <div style={{
            background: 'var(--color-dark-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}>
            <iframe
              key={embedSrc}
              src={embedSrc}
              title="Book a Service – All Things Automated"
              width="100%"
              height="900"
              frameBorder="0"
              style={{ display: 'block' }}
            />
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            color: 'var(--color-text)',
            fontSize: '13px',
          }}>
            Having trouble? Call us directly at{' '}
            <a href="tel:+19412635325" style={{ color: 'var(--color-primary)' }}>(941) 263-5325</a>
          </p>
        </div>
      </section>
    </>
  )
}
