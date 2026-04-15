'use client'
import React from 'react'
import Image from 'next/image'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { Droplets, Thermometer, Shield, Clock, AlertTriangle, Sparkles } from 'lucide-react'

export function ObservatoryCare() {
  const careGuides = [
    { icon: <Droplets size={20} />, title: 'Cleaning Protocol', desc: 'Use lukewarm water with mild soap. Soak for 20 minutes, then gently brush with a soft-bristle toothbrush. Rinse thoroughly and pat dry with a lint-free cloth.' },
    { icon: <Thermometer size={20} />, title: 'Temperature Control', desc: 'Avoid extreme temperature changes. Remove jewelry before hot tubs, saunas, or cold-water swimming. Thermal shock can damage certain gemstones.' },
    { icon: <Shield size={20} />, title: 'Storage Guidelines', desc: 'Store each piece individually in a soft pouch or lined compartment. Keep diamonds separate from other gems to prevent scratching.' },
    { icon: <Clock size={20} />, title: 'Regular Inspection', desc: 'We recommend professional inspection every 6 months. Our gemologists will check prong integrity, stone security, and overall condition.' },
    { icon: <AlertTriangle size={20} />, title: 'Chemical Avoidance', desc: 'Remove jewelry before applying perfume, hairspray, or cleaning products. Chemicals can damage metal finishes and certain gemstone surfaces.' },
    { icon: <Sparkles size={20} />, title: 'Professional Service', desc: 'Annual professional cleaning and rhodium re-plating (for white gold) maintains the original brilliance and finish of your pieces.' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(10,14,26,0.8), rgba(10,14,26,0.9)), url('/images/observatory/diamond-closeup.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <span className="observatory-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>MAINTENANCE PROTOCOL</span>
          <h1 className="observatory-hero-fade-delay-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '16px 0' }}>Care Guide</h1>
          <p className="observatory-hero-fade-delay-2" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary }}>Scientific guidelines for maintaining your collection in optimal condition.</p>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {careGuides.map((guide, i) => (
            <StaggerItem key={i} index={i}>
              <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, padding: 28, height: '100%' }}>
                <div style={{ color: OB.accent, marginBottom: 16 }}>{guide.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text, margin: '0 0 8px' }}>{guide.title}</h3>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, lineHeight: 1.7, margin: 0 }}>{guide.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      <ObservatorySection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', color: OB.text, margin: '0 0 12px' }}>Schedule a Service Appointment</h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, marginBottom: 24 }}>Professional cleaning and inspection by our certified gemologists.</p>
          <ObservatoryButton href="/observatory/contact">Book Service</ObservatoryButton>
        </RevealSection>
      </ObservatorySection>
    </>
  )
}
