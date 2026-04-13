'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

function GInput({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent, marginBottom: 8 }}>{label}</label>
      <input type={type} placeholder={placeholder}
        style={{ width: '100%', padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.text, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 0, outline: 'none' }} />
    </div>
  )
}

export function GalleryContact() {
  const info = [
    { icon: MapPin, label: 'Address', value: '47 Bond Street, London W1S 2QA' },
    { icon: Phone, label: 'Telephone', value: '+44 20 7946 0958' },
    { icon: Mail, label: 'Email', value: 'gallery@vaultmaison.com' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10am–6pm\nSunday: By Appointment' },
  ]

  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <MuseumCaption align="center">Get in Touch</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Contact the Gallery
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7 }}>
          We welcome inquiries about our collection, private viewings, and bespoke commissions.
        </p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 140px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          {/* Form */}
          <div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 32px' }}>Send an Inquiry</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <GInput label="First Name" placeholder="First name" />
              <GInput label="Last Name" placeholder="Last name" />
            </div>
            <GInput label="Email" placeholder="email@example.com" type="email" />
            <GInput label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent, marginBottom: 8 }}>Message</label>
              <textarea placeholder="How may we assist you?" rows={5}
                style={{ width: '100%', padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.text, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 0, outline: 'none', resize: 'vertical' }} />
            </div>
            <GalleryButton>Send Inquiry</GalleryButton>
          </div>

          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 32px' }}>Visit the Gallery</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {info.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, border: `1px solid ${G.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={16} color={G.accent} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent, margin: '0 0 4px' }}>{item.label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.text, margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </GalleryLayout>
  )
}
