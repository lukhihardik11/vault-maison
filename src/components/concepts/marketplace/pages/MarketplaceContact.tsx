'use client'
import React from 'react'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { MarketplaceButton, MarketplaceInput } from '../ui'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'

export function MarketplaceContact() {
  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Get in Touch" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>Contact Us</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary }}>Our specialist team is available to assist with acquisitions, consignments, and inquiries.</p>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
          <div>
            <RevealSection>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: MK.text, margin: '0 0 20px' }}>Send a Message</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MarketplaceInput label="First Name" placeholder="First name" />
                <MarketplaceInput label="Last Name" placeholder="Last name" />
              </div>
              <MarketplaceInput label="Email" placeholder="your@email.com" type="email" />
              <MarketplaceInput label="Subject" placeholder="How can we help?" />
              <MarketplaceInput label="Message" placeholder="Your message..." multiline rows={5} />
              <MarketplaceButton size="lg"><MessageSquare size={14} /> Send Message</MarketplaceButton>
            </RevealSection>
          </div>
          <div>
            <RevealSection delay={100}>
              {[
                { icon: <Mail size={16} />, label: 'Email', value: 'specialists@vaultmaison.com' },
                { icon: <Phone size={16} />, label: 'Phone', value: '+1 (212) 555-0199' },
                { icon: <MapPin size={16} />, label: 'Address', value: '47 Madison Avenue\nNew York, NY 10010' },
                { icon: <Clock size={16} />, label: 'Hours', value: 'Mon-Fri: 9AM - 7PM EST\nSat: 10AM - 5PM EST' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: `1px solid ${MK.border}` }}>
                  <div style={{ color: MK.accent, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MK.textSecondary, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.text, whiteSpace: 'pre-line' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </RevealSection>
          </div>
        </div>
      </MarketplaceSection>
    </>
  )
}
