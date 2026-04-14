'use client'
import React from 'react'
import Image from 'next/image'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { Diamond, Eye, Ruler, Palette } from 'lucide-react'

export function ArchiveGrading() {
  const fourCs = [
    { icon: <Diamond size={24} />, title: 'Cut', desc: 'The precision of a diamond\'s cut determines its brilliance. Our grading evaluates proportions, symmetry, and polish on a scale from Excellent to Poor.' },
    { icon: <Eye size={24} />, title: 'Clarity', desc: 'Assessed under 10x magnification, clarity grades range from Flawless (FL) to Included (I3). Each piece includes a detailed clarity plot.' },
    { icon: <Palette size={24} />, title: 'Color', desc: 'Diamond color is graded on the GIA D-to-Z scale. Our gemologists use master comparison stones under controlled lighting conditions.' },
    { icon: <Ruler size={24} />, title: 'Carat', desc: 'Weight is measured to the hundredth of a carat using calibrated electronic scales. All measurements are independently verified.' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(30,22,20,0.65), rgba(30,22,20,0.85)), url('/images/archive/diamond-inspection.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
          <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>
            GEMOLOGICAL STANDARDS
          </p>
          <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>
            Grading & Certification
          </h1>
          <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary }}>
            Our grading methodology adheres to internationally recognized standards established by the GIA and IGI.
          </p>
        </div>
      </section>

      <ArchiveSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              THE FOUR Cs
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text }}>
              Diamond Grading Criteria
            </h2>
          </div>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {fourCs.map((c, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '32px 24px' }} className="archive-doc-hover">
                <div style={{ color: AR.accent, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 500, color: AR.text, marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      {/* Colored Gemstones */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
                BEYOND DIAMONDS
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: AR.text, marginBottom: 16 }}>
                Colored Gemstone Assessment
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: AR.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>
                Colored gemstones are evaluated using a comprehensive framework that considers hue, tone, saturation, clarity, cut quality, and origin. Our gemologists specialize in identifying treatments and enhancements.
              </p>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: AR.textSecondary, lineHeight: 1.7 }}>
                Origin determination is performed using advanced spectroscopic analysis, with particular expertise in Kashmir sapphires, Burmese rubies, and Colombian emeralds.
              </p>
            </div>
            <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
              <Image src="/images/archive/emerald-necklace-dark.webp" alt="Colored gemstone assessment" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>

      <ArchiveSection dark>
        <RevealSection>
          <div style={{ textAlign: 'center' }}>
            <GoldRule style={{ marginBottom: 24 }} />
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, fontStyle: 'italic', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.7 }}>
              Every piece in our catalog is accompanied by a comprehensive grading report prepared by our in-house gemological team.
            </p>
            <ArchiveButton variant="secondary" href="/archive/craftsmanship">View Authentication Process</ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
