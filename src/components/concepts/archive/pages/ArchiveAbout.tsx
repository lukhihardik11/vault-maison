'use client'
import React from 'react'
import Image from 'next/image'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { Shield, BookOpen, Award, Eye } from 'lucide-react'

export function ArchiveAbout() {
  const values = [
    { icon: <Shield size={28} />, title: 'Authentication', desc: 'Every piece undergoes rigorous verification before entering our catalog. Provenance is traced, materials tested, and craftsmanship assessed.' },
    { icon: <BookOpen size={28} />, title: 'Scholarship', desc: 'Our team of gemologists and historians document each acquisition with the rigor of academic research, creating permanent records.' },
    { icon: <Award size={28} />, title: 'Preservation', desc: 'We believe fine jewelry is cultural heritage. Our archive preserves not just objects, but the stories and techniques behind them.' },
    { icon: <Eye size={28} />, title: 'Transparency', desc: 'Full provenance records, independent certifications, and detailed condition reports accompany every piece in our collection.' },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(30,22,20,0.7), rgba(30,22,20,0.85)), url('/images/archive/dark-library.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
          <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>
            EST. MMXXIV
          </p>
          <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 500, color: AR.text, margin: '0 0 20px', lineHeight: 1.2 }}>
            About the Archive
          </h1>
          <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.15rem', color: AR.textSecondary, lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            A scholarly institution dedicated to the authentication, documentation, and preservation of exceptional jewelry and gemstones.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>
                OUR FOUNDING
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text, margin: '0 0 20px' }}>
                Where Provenance Meets Purpose
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                The Archive was established with a singular mission: to bring the rigor of museum curation to the world of fine jewelry. In an industry where provenance is often obscured and authenticity assumed, we created an institution that treats every gemstone and precious metal with the scholarly attention it deserves.
              </p>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.8 }}>
                Our team of certified gemologists, art historians, and metallurgists work together to build comprehensive records for each piece — from its geological origins to its journey through workshops and collections.
              </p>
            </div>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/archive/mahogany-library.jpg" alt="The Archive library" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(30,22,20,0.85)', padding: '8px 16px' }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.accent }}>
                  THE ARCHIVE READING ROOM
                </span>
              </div>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* Values */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              OUR PRINCIPLES
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text }}>
              Guiding Values
            </h2>
          </div>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
          {values.map((v, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{
                background: AR.card, border: `1px solid ${AR.border}`, padding: '32px 24px',
                textAlign: 'center',
              }} className="archive-doc-hover">
                <div style={{ color: AR.accent, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: AR.text, marginBottom: 12 }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary, lineHeight: 1.6 }}>
                  {v.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      {/* Stats */}
      <ArchiveSection dark>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {[
              { value: '2,400+', label: 'Pieces Cataloged' },
              { value: '98%', label: 'Authentication Rate' },
              { value: '12', label: 'Expert Gemologists' },
              { value: '47', label: 'Countries Sourced' },
            ].map((stat, i) => (
              <div key={i}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.accent, margin: '0 0 8px' }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: AR.textSecondary }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* CTA */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <GoldRule style={{ marginBottom: 32 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text, marginBottom: 16 }}>
              Explore the Collection
            </h2>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Browse our authenticated catalog of exceptional jewelry and gemstones.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <ArchiveButton href="/archive/collections">Browse Catalog</ArchiveButton>
              <ArchiveButton variant="secondary" href="/archive/contact">Reference Desk</ArchiveButton>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
