'use client'
import React from 'react'
import Image from 'next/image'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton, PrecisionMeter } from '../ui'
import { Microscope, Cpu, Eye, Zap, Diamond, Shield } from 'lucide-react'

export function ObservatoryCraftsmanship() {
  const processes = [
    { icon: <Microscope size={24} />, title: 'Spectroscopic Analysis', desc: 'Advanced spectroscopy reveals the molecular composition and origin of every gemstone, ensuring authenticity and quality.' },
    { icon: <Cpu size={24} />, title: 'Digital Mapping', desc: 'High-resolution 3D scanning creates a complete digital twin of each stone, mapping every inclusion and facet angle.' },
    { icon: <Eye size={24} />, title: 'Visual Inspection', desc: 'Master gemologists perform traditional loupe examination alongside AI-assisted pattern recognition for comprehensive evaluation.' },
    { icon: <Diamond size={24} />, title: 'Light Performance', desc: 'Proprietary light performance testing measures brilliance, fire, and scintillation across 360 degrees of observation.' },
    { icon: <Shield size={24} />, title: 'Certification', desc: 'Each piece receives dual certification — independent GIA/AGS grading plus our Observatory verification report.' },
    { icon: <Zap size={24} />, title: 'Setting & Assembly', desc: 'Master setters use microscope-guided precision to secure every stone, ensuring optimal light entry and structural integrity.' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(10,14,26,0.7), rgba(10,14,26,0.9)), url('/images/observatory/crystal-structure.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <span className="observatory-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>METHODOLOGY</span>
          <h1 className="observatory-hero-fade-delay-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '16px 0' }}>
            Precision Craftsmanship
          </h1>
          <p className="observatory-hero-fade-delay-2" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.7 }}>
            Our six-stage process combines centuries-old artisanship with cutting-edge analytical technology.
          </p>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {processes.map((p, i) => (
            <StaggerItem key={i} index={i}>
              <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, padding: 32, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: OB.accent, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', border: `1px solid ${OB.accent}30` }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span style={{ color: OB.accent }}>{p.icon}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text, margin: '0 0 8px' }}>{p.title}</h3>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      <ObservatorySection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/observatory/lab-microscope.jpg" alt="Laboratory" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <ScanLine label="Our Laboratory" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>
                State-of-the-Art Facilities
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Our laboratory houses the latest in gemological analysis equipment, from Raman spectrometers to advanced photoluminescence systems. Every instrument is calibrated daily to ensure measurement accuracy within 0.001 carats.
              </p>
              <div style={{ display: 'flex', gap: 32 }}>
                <PrecisionMeter label="Accuracy" value={99.7} unit="%" size="sm" />
                <PrecisionMeter label="Precision" value={99.9} unit="%" size="sm" />
              </div>
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>

      <section style={{ background: OB.bg, padding: '80px 0', textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>Experience Our Process</h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, marginBottom: 32 }}>Schedule a lab tour to witness our analytical process firsthand.</p>
          <ObservatoryButton href="/observatory/contact" size="lg">Book Lab Tour</ObservatoryButton>
        </RevealSection>
      </section>
    </>
  )
}
