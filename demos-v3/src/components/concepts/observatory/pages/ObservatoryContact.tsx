'use client'
import React from 'react'
import { OB, ObservatorySection, RevealSection, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton, ObservatoryInput } from '../ui'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export function ObservatoryContact() {
  const contactInfo = [
    { icon: <Mail size={16} />, label: 'Email', value: 'analysis@observatory.vault-maison.com' },
    { icon: <Phone size={16} />, label: 'Phone', value: '+1 (212) 555-0147' },
    { icon: <MapPin size={16} />, label: 'Laboratory', value: '47th Street Diamond District, New York, NY' },
    { icon: <Clock size={16} />, label: 'Hours', value: 'Mon-Fri 10:00-18:00 EST' },
  ]

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>CONTACT</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '16px 0' }}>Get in Touch</h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary }}>Our gemologists are ready to assist with your inquiry.</p>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <RevealSection>
            <ScanLine label="Send Message" style={{ marginBottom: 32 }} />
            <ObservatoryInput label="Full Name" placeholder="Enter your name" />
            <ObservatoryInput label="Email Address" type="email" placeholder="your@email.com" />
            <ObservatoryInput label="Subject" placeholder="Inquiry type" />
            <ObservatoryInput label="Message" multiline placeholder="Describe your inquiry..." rows={5} />
            <ObservatoryButton fullWidth size="lg">Transmit Message</ObservatoryButton>
          </RevealSection>

          <RevealSection delay={200}>
            <ScanLine label="Contact Information" style={{ marginBottom: 32 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {contactInfo.map((info, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px', background: OB.card, border: `1px solid ${OB.border}` }}>
                  <div style={{ color: OB.accent, marginTop: 2 }}>{info.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.textSecondary, marginBottom: 4 }}>{info.label}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: OB.text }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, padding: 24, background: OB.surface, border: `1px solid ${OB.accent}20` }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text, margin: '0 0 8px' }}>Private Consultation</h3>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, lineHeight: 1.7, margin: '0 0 16px' }}>
                For high-value acquisitions or bespoke commissions, we offer private one-on-one sessions with our senior gemologists.
              </p>
              <ObservatoryButton href="/observatory/bespoke" variant="secondary" size="sm">Learn About Bespoke</ObservatoryButton>
            </div>
          </RevealSection>
        </div>
      </ObservatorySection>
    </>
  )
}
