'use client'
import React from 'react'
import Image from 'next/image'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { Shield, Thermometer, Droplets, Sun } from 'lucide-react'

export function ArchiveCare() {
  const guidelines = [
    { icon: <Thermometer size={24} />, title: 'Storage', desc: 'Store pieces individually in soft-lined compartments at stable room temperature. Avoid extreme heat or cold.' },
    { icon: <Droplets size={24} />, title: 'Cleaning', desc: 'Use only approved cleaning solutions for the specific metal and gemstone combination. Consult documentation for details.' },
    { icon: <Sun size={24} />, title: 'Exposure', desc: 'Minimize prolonged exposure to direct sunlight, chemicals, and perfumes. Remove jewelry before swimming or bathing.' },
    { icon: <Shield size={24} />, title: 'Insurance', desc: 'Maintain current appraisals for insurance purposes. We recommend updating valuations every 2-3 years.' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(30,22,20,0.7), rgba(30,22,20,0.85)), url('/images/archive/jewelry-dark-bg.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
          <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>PRESERVATION GUIDE</p>
          <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>Care & Preservation</h1>
          <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary }}>
            Guidelines for maintaining the condition and value of your authenticated pieces.
          </p>
        </div>
      </section>

      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
          {guidelines.map((g, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '32px 24px' }} className="archive-doc-hover">
                <div style={{ color: AR.accent, marginBottom: 16 }}>{g.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: AR.text, marginBottom: 12 }}>{g.title}</h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary, lineHeight: 1.6 }}>{g.desc}</p>
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
              Need professional restoration or cleaning services?
            </p>
            <ArchiveButton variant="secondary" href="/archive/contact">Contact Reference Desk</ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
