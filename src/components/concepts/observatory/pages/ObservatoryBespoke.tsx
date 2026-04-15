'use client'
import React from 'react'
import Image from 'next/image'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { Crosshair, Diamond, Cpu, Wrench, CheckCircle, ArrowRight } from 'lucide-react'

export function ObservatoryBespoke() {
  const steps = [
    { icon: <Crosshair size={20} />, num: '01', title: 'Specification', desc: 'Define your vision through our detailed specification questionnaire. Our gemologists will analyze your requirements and propose optimal stone selections.' },
    { icon: <Diamond size={20} />, num: '02', title: 'Stone Selection', desc: 'Access our database of pre-analyzed stones. Each candidate comes with full spectroscopic data, light performance metrics, and certification.' },
    { icon: <Cpu size={20} />, num: '03', title: 'Digital Design', desc: 'Our CAD specialists create a precise 3D model of your piece, allowing you to visualize and refine every detail before production begins.' },
    { icon: <Wrench size={20} />, num: '04', title: 'Precision Crafting', desc: 'Master artisans bring the design to life using microscope-guided setting techniques and traditional metalworking methods.' },
    { icon: <CheckCircle size={20} />, num: '05', title: 'Final Analysis', desc: 'Your completed piece undergoes our full 47-point analysis. You receive a comprehensive Observatory report with your commission.' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(10,14,26,0.7), rgba(10,14,26,0.9)), url('/images/observatory/night-sky.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <span className="observatory-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>BESPOKE COMMISSION</span>
          <h1 className="observatory-hero-fade-delay-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '16px 0' }}>
            Precision-Engineered, For You
          </h1>
          <p className="observatory-hero-fade-delay-2" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.7 }}>
            Commission a one-of-a-kind piece backed by our full analytical framework.
          </p>
        </div>
      </section>

      <ObservatorySection>
        <ScanLine label="Commission Process" style={{ marginBottom: 48 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((step, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: OB.card, border: `1px solid ${OB.accent}30`, color: OB.accent }}>
                  {step.icon}
                </div>
                <div style={{ padding: '24px 0', borderBottom: `1px solid ${OB.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent }}>{step.num}</span>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 500, color: OB.text, margin: 0 }}>{step.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.textSecondary, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </ObservatorySection>

      <ObservatorySection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>Start Your Commission</h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Bespoke commissions start at $5,000. Typical completion time is 8-12 weeks.
          </p>
          <ObservatoryButton href="/observatory/contact" size="lg">Request Consultation</ObservatoryButton>
        </RevealSection>
      </ObservatorySection>
    </>
  )
}
