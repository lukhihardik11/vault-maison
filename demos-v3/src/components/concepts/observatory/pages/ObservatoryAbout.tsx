'use client'
import React from 'react'
import Image from 'next/image'
import { OB, ObservatorySection, RevealSection, StaggerItem, CyanRule, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { Crosshair, Eye, Shield, Cpu, BarChart3, Microscope } from 'lucide-react'

export function ObservatoryAbout() {
  const values = [
    { icon: <Microscope size={28} />, title: 'Precision Analysis', desc: 'Every gemstone undergoes 47-point spectroscopic analysis using state-of-the-art equipment. We measure brilliance, fire, and scintillation with scientific exactitude.' },
    { icon: <Shield size={28} />, title: 'Certified Integrity', desc: 'Independent GIA and AGS certifications accompany every piece. Our in-house gemologists provide additional Observatory verification reports.' },
    { icon: <Cpu size={28} />, title: 'Data-Driven Curation', desc: 'Advanced algorithms analyze market data, rarity indices, and quality metrics to curate collections that represent exceptional value.' },
    { icon: <Eye size={28} />, title: 'Transparent Sourcing', desc: 'Full supply chain visibility from mine to market. Every stone is tracked, documented, and verified through our blockchain-backed provenance system.' },
  ]

  const stats = [
    { value: '47', label: 'Analysis Points' },
    { value: '99.7%', label: 'Accuracy Rate' },
    { value: '12K+', label: 'Stones Analyzed' },
    { value: '0.001ct', label: 'Measurement Precision' },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(10,14,26,0.7), rgba(10,14,26,0.85)), url('/images/observatory/telescope.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 80px', textAlign: 'center' }}>
          <div className="observatory-hero-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <Crosshair size={14} color={OB.accent} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>
              ABOUT THE OBSERVATORY
            </span>
          </div>
          <h1 className="observatory-hero-fade-delay-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.8rem', fontWeight: 600, color: OB.text, margin: '0 0 20px', lineHeight: 1.2 }}>
            Where Science Meets Splendor
          </h1>
          <p className="observatory-hero-fade-delay-2" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.85rem', color: OB.textSecondary, lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            The Observatory applies rigorous gemological science to the art of luxury jewelry curation. Every piece is analyzed, verified, and documented with unprecedented precision.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: OB.surface, borderTop: `1px solid ${OB.border}`, borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.accent }}>{stat.value}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.textSecondary, marginTop: 4 }}>{stat.label}</div>
            </StaggerItem>
          ))}
        </div>
      </section>

      {/* Our Mission */}
      <ObservatorySection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ScanLine label="Our Mission" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 500, color: OB.text, margin: '0 0 20px' }}>
                Redefining Jewelry Through Data
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Founded by a team of gemologists, data scientists, and luxury retail veterans, The Observatory was created to bridge the gap between traditional craftsmanship and modern analytical precision.
              </p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8 }}>
                We believe that informed collectors make better decisions. By providing comprehensive data on every stone — from spectroscopic analysis to market comparisons — we empower our clients to acquire pieces with complete confidence.
              </p>
            </div>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/observatory/lab-microscope.jpg" alt="Gemological laboratory" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(10,14,26,0.9)', padding: '8px 16px', border: `1px solid ${OB.border}` }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: OB.accent }}>
                  GEMOLOGICAL ANALYSIS LAB
                </span>
              </div>
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* Values */}
      <ObservatorySection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <ScanLine label="Core Principles" style={{ marginBottom: 24 }} />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 500, color: OB.text }}>
              Our Analytical Framework
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {values.map((v, i) => (
            <StaggerItem key={i} index={i}>
              <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, padding: 32 }}>
                <div style={{ color: OB.accent, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 500, color: OB.text, margin: '0 0 12px' }}>{v.title}</h3>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.textSecondary, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      {/* Team */}
      <ObservatorySection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/observatory/precision-tools.jpg" alt="Precision instruments" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <ScanLine label="Our Team" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 500, color: OB.text, margin: '0 0 20px' }}>
                Expert Gemologists & Data Scientists
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Our interdisciplinary team combines decades of gemological expertise with cutting-edge data analysis. Each member brings unique skills — from traditional loupe examination to machine learning pattern recognition — ensuring every piece receives the most thorough evaluation possible.
              </p>
              <ObservatoryButton href="/observatory/contact" variant="secondary">Meet Our Specialists</ObservatoryButton>
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* CTA */}
      <section style={{ background: `linear-gradient(rgba(10,14,26,0.85), rgba(10,14,26,0.95)), url('/images/observatory/starfield.jpg') center/cover`, padding: '80px 0', textAlign: 'center' }}>
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 32px' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>
              Begin Your Analysis
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>
              Schedule a private consultation with our gemologists to explore our verified collection.
            </p>
            <ObservatoryButton href="/observatory/contact" size="lg">Request Consultation</ObservatoryButton>
          </div>
        </RevealSection>
      </section>
    </>
  )
}
