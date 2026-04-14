'use client'
import React from 'react'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { Package, Shield, Globe, Clock } from 'lucide-react'

export function ArchiveShipping() {
  const methods = [
    { icon: <Package size={24} />, title: 'Insured Courier', desc: 'All pieces shipped via bonded, insured courier with real-time tracking and signature confirmation.', time: '3-5 business days' },
    { icon: <Shield size={24} />, title: 'Secure Packaging', desc: 'Archival-quality packaging with tamper-evident seals, humidity control, and shock-resistant materials.', time: 'Included' },
    { icon: <Globe size={24} />, title: 'International', desc: 'Worldwide shipping available with full customs documentation and insurance coverage.', time: '5-10 business days' },
    { icon: <Clock size={24} />, title: 'White Glove', desc: 'Personal delivery by bonded courier for high-value acquisitions. Available in select metropolitan areas.', time: 'By appointment' },
  ]

  return (
    <>
      <section style={{ background: AR.bg, padding: '64px 32px 32px', textAlign: 'center', borderBottom: `1px solid ${AR.border}` }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>LOGISTICS</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>Shipping & Delivery</h1>
        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, maxWidth: 600, margin: '0 auto' }}>
          Every acquisition is handled with museum-grade care from our vault to your door.
        </p>
      </section>

      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {methods.map((m, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '28px 24px' }} className="archive-doc-hover">
                <div style={{ color: AR.accent, marginBottom: 16 }}>{m.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: AR.text, marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary, lineHeight: 1.6, marginBottom: 12 }}>{m.desc}</p>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.accent }}>{m.time}</span>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      <ArchiveSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center' }}>
            <GoldRule style={{ marginBottom: 24 }} />
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, marginBottom: 24 }}>
              Questions about shipping or delivery? Our logistics team is here to help.
            </p>
            <ArchiveButton variant="secondary" href="/archive/contact">Contact Us</ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
