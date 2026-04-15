'use client'
import React from 'react'
import Image from 'next/image'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'
import { ArchiveButton, ArchiveInput } from '../ui'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function ArchiveContact() {
  return (
    <>
      <section style={{ background: AR.bg, padding: '64px 32px 32px', textAlign: 'center', borderBottom: `1px solid ${AR.border}` }}>
        <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
          THE REFERENCE DESK
        </p>
        <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>
          Contact the Archive
        </h1>
        <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, maxWidth: 600, margin: '0 auto' }}>
          Our reference desk is available for inquiries regarding authentication, acquisitions, and scholarly research.
        </p>
      </section>

      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: AR.text, marginBottom: 24 }}>
                Send an Inquiry
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <ArchiveInput label="First Name" placeholder="First name" />
                  <ArchiveInput label="Last Name" placeholder="Last name" />
                </div>
                <ArchiveInput label="Email Address" placeholder="your@email.com" type="email" />
                <ArchiveInput label="Subject" placeholder="Inquiry subject" />
                <ArchiveInput label="Message" placeholder="Your message..." textarea rows={5} />
                <ArchiveButton>Send Message</ArchiveButton>
              </div>
            </div>

            <div>
              <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '32px', marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, color: AR.text, marginBottom: 24 }}>
                  Visit the Archive
                </h3>
                {[
                  { icon: <MapPin size={16} />, label: 'Address', value: '47 East 57th Street, New York, NY 10022' },
                  { icon: <Phone size={16} />, label: 'Telephone', value: '+1 (212) 555-0142' },
                  { icon: <Mail size={16} />, label: 'Email', value: 'reference@vaultmaison.com' },
                  { icon: <Clock size={16} />, label: 'Reading Room', value: 'By appointment only' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderBottom: i < 3 ? `1px solid ${AR.border}` : 'none' }}>
                    <div style={{ color: AR.accent, marginTop: 2 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</p>
                      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', color: AR.text }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <Image src="/images/archive/dark-library.jpg" alt="Archive entrance" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
