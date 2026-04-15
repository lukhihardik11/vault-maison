'use client'
import React from 'react'
import Image from 'next/image'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { ArchiveButton, AuthenticationStamp } from '../ui'
import { Shield, Eye, FileText, Gem, Microscope, Scale } from 'lucide-react'

export function ArchiveCraftsmanship() {
  const steps = [
    { icon: <Eye size={24} />, title: 'Visual Inspection', desc: 'Initial assessment by senior gemologist using 10x loupe and specialized lighting to evaluate cut, color, and surface characteristics.', image: '/images/archive/diamond-tweezers.jpg' },
    { icon: <Microscope size={24} />, title: 'Laboratory Analysis', desc: 'Advanced spectroscopic analysis, fluorescence testing, and inclusion mapping using state-of-the-art gemological instruments.', image: '/images/archive/diamond-inspection.jpg' },
    { icon: <Scale size={24} />, title: 'Material Verification', desc: 'Precise measurements of weight, dimensions, and specific gravity. Metal purity verified through non-destructive XRF analysis.', image: '/images/archive/gold-hallmark.jpg' },
    { icon: <FileText size={24} />, title: 'Provenance Research', desc: 'Historical research into ownership history, workshop attribution, and period verification through archival documentation.', image: '/images/archive/leather-books.jpg' },
    { icon: <Shield size={24} />, title: 'Certification', desc: 'Final authentication report issued with detailed findings, high-resolution photography, and permanent catalog registration.', image: '/images/archive/wax-seal.jpg' },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(30,22,20,0.6), rgba(30,22,20,0.85)), url('/images/archive/diamond-tweezers.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
          <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>
            AUTHENTICATION & PROVENANCE
          </p>
          <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 500, color: AR.text, margin: '0 0 20px', lineHeight: 1.2 }}>
            The Science of Certainty
          </h1>
          <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.15rem', color: AR.textSecondary, lineHeight: 1.7 }}>
            Our five-stage authentication process combines traditional gemological expertise with modern analytical technology.
          </p>
        </div>
      </section>

      {/* Authentication Process */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              FIVE-STAGE PROCESS
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text }}>
              Authentication Methodology
            </h2>
          </div>
        </RevealSection>

        {steps.map((step, i) => (
          <RevealSection key={i} delay={i * 80}>
            <div style={{
              display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: 48, alignItems: 'center', marginBottom: 48,
              direction: i % 2 === 0 ? 'ltr' : 'rtl',
            }}>
              <div style={{ direction: 'ltr' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: AR.accentSoft, border: `1px solid ${AR.accent}33`, color: AR.accent,
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: AR.accent }}>
                      STAGE {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 500, color: AR.text, margin: 0 }}>
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
              <div style={{ position: 'relative', height: 280, overflow: 'hidden', direction: 'ltr' }}>
                <Image src={step.image} alt={step.title} fill style={{ objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
                  background: 'linear-gradient(transparent, rgba(30,22,20,0.8))',
                }} />
              </div>
            </div>
          </RevealSection>
        ))}
      </ArchiveSection>

      {/* Certification */}
      <ArchiveSection dark>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
                OUR GUARANTEE
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text, marginBottom: 16 }}>
                Triple-Verified Authenticity
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.7 }}>
                Every piece in the Archive carries our triple-verification guarantee: independent laboratory certification, in-house gemological assessment, and provenance documentation. This three-pillar approach ensures the highest standard of authentication in the industry.
              </p>
            </div>
            <AuthenticationStamp status="certified" certifier="Vault Maison Archive" date="Certified 2024" size="lg" />
            <div>
              {[
                { label: 'GIA/IGI Certification', desc: 'Independent laboratory grading report' },
                { label: 'In-House Assessment', desc: 'Senior gemologist evaluation' },
                { label: 'Provenance Verified', desc: 'Complete ownership history traced' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px 0', borderBottom: i < 2 ? `1px solid ${AR.border}` : 'none' }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: AR.accent, textTransform: 'uppercase', marginBottom: 4 }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* CTA */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <GoldRule style={{ marginBottom: 32 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text, marginBottom: 16 }}>
              Browse Authenticated Pieces
            </h2>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <ArchiveButton href="/archive/collections">View Catalog</ArchiveButton>
              <ArchiveButton variant="secondary" href="/archive/grading">Grading Standards</ArchiveButton>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
