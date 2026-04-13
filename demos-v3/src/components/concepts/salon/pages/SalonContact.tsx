'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonInput } from '../ui/SalonInput'
import { SalonButton } from '../ui/SalonButton'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function SalonContact() {
  return (
    <SalonLayout>
      <section style={{ padding: '60px 32px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Get in Touch</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>We&apos;d Love to Hear from You</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 500, margin: '0 auto' }}>Whether you have a question or want to book a private session, we&apos;re here for you.</p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 24px' }}>Send Us a Message</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <SalonInput label="First Name" placeholder="Your first name" required />
              <SalonInput label="Last Name" placeholder="Your last name" required />
            </div>
            <SalonInput label="Email" type="email" placeholder="your@email.com" required />
            <SalonInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textSecondary, marginBottom: 6, fontWeight: 500 }}>How Can We Help?</label>
              <select style={{ width: '100%', padding: '12px 16px', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.text, background: S.surface, border: `1.5px solid ${S.border}`, borderRadius: S.radius, outline: 'none', cursor: 'pointer' }}>
                <option>General Inquiry</option>
                <option>Book a Private Session</option>
                <option>Virtual Appointment</option>
                <option>Custom Design Request</option>
                <option>After-Sale Support</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textSecondary, marginBottom: 6, fontWeight: 500 }}>Message</label>
              <textarea rows={5} placeholder="Tell us how we can help..." style={{ width: '100%', padding: '12px 16px', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.text, background: S.surface, border: `1.5px solid ${S.border}`, borderRadius: S.radius, outline: 'none', resize: 'vertical' }} />
            </div>
            <SalonButton>Send Message</SalonButton>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 24px' }}>Visit Our Salon</h2>
            {[
              { icon: <MapPin size={18} />, title: 'Address', text: '123 Luxury Lane, Suite 400\nNew York, NY 10001' },
              { icon: <Phone size={18} />, title: 'Phone', text: '+1 (555) 123-4567' },
              { icon: <Mail size={18} />, title: 'Email', text: 'hello@thesalon.com' },
              { icon: <Clock size={18} />, title: 'Hours', text: 'Mon–Fri: 10am–7pm\nSat: 11am–6pm\nSun: By appointment' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: S.radius, background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.accent, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.accent, margin: '0 0 4px', fontWeight: 500 }}>{item.title}</p>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.text}</p>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 32, background: S.warmPanel, borderRadius: S.radiusLg, padding: '24px', borderLeft: `4px solid ${S.accent}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: S.text, margin: '0 0 8px' }}>Prefer a Chat?</p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.82rem', color: S.textSecondary, lineHeight: 1.6, margin: '0 0 12px' }}>Click the chat bubble in the corner to speak with Sophie, your personal concierge.</p>
            </div>
          </div>
        </div>
      </section>
    </SalonLayout>
  )
}
