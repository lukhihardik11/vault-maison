'use client'
import React from 'react'
import Image from 'next/image'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton, SpectrumChart, PrecisionMeter } from '../ui'
import { BarChart3, Diamond, Eye, Zap, Shield } from 'lucide-react'

export function ObservatoryGrading() {
  const gradingCriteria = [
    { title: 'Cut', grade: 'Excellent', desc: 'Proportions, symmetry, and polish are evaluated using 3D scanning technology. Our cut analysis goes beyond standard grading to measure light performance across 360 degrees.', metric: 98 },
    { title: 'Clarity', grade: 'VS1+', desc: 'Advanced microscopy identifies inclusions invisible to the naked eye. We map every inclusion in 3D space, providing a complete clarity profile.', metric: 94 },
    { title: 'Color', grade: 'D-G', desc: 'Spectrophotometric analysis measures color with scientific precision, eliminating subjective assessment. Each stone is compared against master stones under controlled lighting.', metric: 96 },
    { title: 'Carat', grade: 'Certified', desc: 'Precision electronic scales measure weight to 0.001 carats. We also calculate estimated weight from measurements for mounted stones.', metric: 99 },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(10,14,26,0.7), rgba(10,14,26,0.9)), url('/images/observatory/diamond-loupe.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <div className="observatory-hero-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <BarChart3 size={14} color={OB.accent} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>GEMOLOGICAL ANALYSIS</span>
          </div>
          <h1 className="observatory-hero-fade-delay-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '0 0 16px' }}>
            The 4C Analysis Framework
          </h1>
          <p className="observatory-hero-fade-delay-2" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.7 }}>
            Our 47-point analysis goes far beyond traditional grading, providing unprecedented insight into every stone.
          </p>
        </div>
      </section>

      {/* 4C Grid */}
      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {gradingCriteria.map((c, i) => (
            <StaggerItem key={i} index={i}>
              <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OB.accent, marginBottom: 8 }}>
                      CRITERION {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: OB.text, margin: 0 }}>{c.title}</h3>
                  </div>
                  <PrecisionMeter label="Score" value={c.metric} unit="%" size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 12px', background: OB.surface, border: `1px solid ${OB.border}` }}>
                  <Shield size={12} color={OB.success} />
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.success }}>GRADE: {c.grade}</span>
                </div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      {/* Light Performance */}
      <ObservatorySection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ScanLine label="Beyond the 4Cs" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>
                Light Performance Analysis
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Traditional 4C grading tells only part of the story. Our proprietary light performance analysis measures how a diamond interacts with light across multiple angles, providing a complete picture of its visual beauty.
              </p>
              <SpectrumChart data={[
                { label: 'Brilliance (White Light)', value: 96 },
                { label: 'Fire (Spectral Dispersion)', value: 92 },
                { label: 'Scintillation (Sparkle)', value: 88 },
                { label: 'Light Return', value: 94 },
                { label: 'Contrast Pattern', value: 90 },
              ]} title="Sample Light Performance Report" />
            </div>
            <div style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
              <Image src="/images/observatory/crystal-structure.jpg" alt="Light analysis" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>

      <section style={{ background: OB.bg, padding: '80px 0', textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>Request a Grading Report</h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, marginBottom: 32 }}>Get a comprehensive Observatory analysis for any piece in our collection.</p>
          <ObservatoryButton href="/observatory/contact" size="lg">Request Analysis</ObservatoryButton>
        </RevealSection>
      </section>
    </>
  )
}
