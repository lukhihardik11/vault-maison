'use client'
import React from 'react'
import { MS, MaisonSection, RevealSection, SectionLabel } from '../MaisonLayout'
import { MaisonButton, MaisonInput } from '../ui'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'

export function MaisonContact() {
  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Reach Out" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>Contact Us</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.textSecondary }}>We would love to hear from you. Our team is here to assist with any inquiry.</p>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
          <div>
            <RevealSection>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: MS.text, margin: '0 0 20px' }}>Send a Message</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MaisonInput label="First Name" placeholder="First name" />
                <MaisonInput label="Last Name" placeholder="Last name" />
              </div>
              <MaisonInput label="Email" placeholder="your@email.com" type="email" />
              <MaisonInput label="Subject" placeholder="How can we help?" />
              <MaisonInput label="Message" placeholder="Your message..." multiline rows={5} />
              <MaisonButton size="lg"><MessageSquare size={14} /> Send Message</MaisonButton>
            </RevealSection>
          </div>
          <div>
            <RevealSection delay={100}>
              {[
                { icon: <Mail size={16} />, label: 'Email', value: 'hello@vaultmaison.com' },
                { icon: <Phone size={16} />, label: 'Phone', value: '+1 (212) 555-0188' },
                { icon: <MapPin size={16} />, label: 'Boutique', value: '12 Place Vendôme\nParis, 75001' },
                { icon: <Clock size={16} />, label: 'Hours', value: 'Mon-Sat: 10AM - 7PM\nSunday: By appointment' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: `1px solid ${MS.border}` }}>
                  <div style={{ color: MS.accent, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MS.textSecondary, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.text, whiteSpace: 'pre-line' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </RevealSection>
          </div>
        </div>
      </MaisonSection>
    </>
  )
}
