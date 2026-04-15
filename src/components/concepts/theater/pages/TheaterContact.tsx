'use client'
import React from 'react'
import { TH, TheaterSection, RevealSection, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton, TheaterInput } from '../ui'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function TheaterContact() {
  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <ActLabel label="Stage Door" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>Contact Us</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary }}>Request a private showing or reach our concierge team.</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <ActLabel label="Send a Message" style={{ marginBottom: 24 }} />
            <TheaterInput label="Full Name" placeholder="Your name" />
            <TheaterInput label="Email" placeholder="your@email.com" type="email" />
            <TheaterInput label="Subject" placeholder="Private viewing, bespoke inquiry, etc." />
            <TheaterInput label="Your Message" placeholder="Tell us about your vision..." multiline rows={5} />
            <TheaterButton fullWidth size="lg">Send Message</TheaterButton>
          </div>
          <div>
            <ActLabel label="Visit the Theater" style={{ marginBottom: 24 }} />
            <div style={{ background: TH.card, border: `1px solid ${TH.border}`, padding: 32, marginBottom: 24 }}>
              {[
                { icon: <MapPin size={16} />, label: 'Address', value: '742 Fifth Avenue, New York, NY 10019' },
                { icon: <Phone size={16} />, label: 'Phone', value: '+1 (212) 555-0142' },
                { icon: <Mail size={16} />, label: 'Email', value: 'concierge@vaultmaison.com' },
                { icon: <Clock size={16} />, label: 'Hours', value: 'By appointment only' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < 3 ? `1px solid ${TH.border}` : 'none' }}>
                  <span style={{ color: TH.gold }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TH.gold, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.text }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: TH.card, border: `1px solid ${TH.borderGold}40`, padding: 24, textAlign: 'center' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: TH.text, margin: '0 0 8px' }}>Private Showings</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.textSecondary, lineHeight: 1.6, margin: '0 0 16px' }}>
                Experience our collection in an intimate theatrical setting. Champagne, velvet seating, and personal attention.
              </p>
              <TheaterButton variant="secondary" size="sm">Book a Showing</TheaterButton>
            </div>
          </div>
        </div>
      </TheaterSection>
    </>
  )
}
