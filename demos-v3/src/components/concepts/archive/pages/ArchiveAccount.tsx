'use client'
import React from 'react'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { User, Package, Heart, FileText, Settings } from 'lucide-react'

export function ArchiveAccount() {
  const sections = [
    { icon: <Package size={20} />, title: 'Acquisition History', desc: 'View past acquisitions and track current orders', count: '3 records' },
    { icon: <Heart size={20} />, title: 'Saved Pieces', desc: 'Pieces marked for future consideration', count: '7 items' },
    { icon: <FileText size={20} />, title: 'Certificates', desc: 'Download authentication certificates and provenance records', count: '3 documents' },
    { icon: <Settings size={20} />, title: 'Account Settings', desc: 'Manage personal information and preferences', count: '' },
  ]

  return (
    <>
      <section style={{ background: AR.bg, padding: '48px 32px 24px', borderBottom: `1px solid ${AR.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>COLLECTOR&rsquo;S PORTAL</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text }}>My Account</h1>
        </div>
      </section>

      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48 }}>
            <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '32px', textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: AR.accentSoft, border: `2px solid ${AR.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <User size={28} color={AR.accent} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: AR.text, marginBottom: 4 }}>Collector</h3>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.textSecondary, letterSpacing: '0.1em' }}>MEMBER SINCE 2024</p>
              <GoldRule style={{ margin: '20px 0' }} />
              <ArchiveButton variant="secondary" size="sm">Edit Profile</ArchiveButton>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {sections.map((s, i) => (
                <div key={i} style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '24px', cursor: 'pointer' }} className="archive-doc-hover">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ color: AR.accent }}>{s.icon}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, color: AR.text }}>{s.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', color: AR.textSecondary, marginBottom: 8 }}>{s.desc}</p>
                  {s.count && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.accent }}>{s.count}</span>}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
