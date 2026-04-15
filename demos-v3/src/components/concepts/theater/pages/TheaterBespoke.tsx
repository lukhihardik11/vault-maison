'use client'
import React from 'react'
import Image from 'next/image'
import { TH, TheaterSection, RevealSection, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton, ProgramCard } from '../ui'
import { Pen, Gem, Palette, Sparkles, CheckCircle } from 'lucide-react'

export function TheaterBespoke() {
  const steps = [
    { icon: <Pen size={20} />, title: 'The Script', desc: 'Share your vision, your story, your inspiration. Our designers will craft a narrative around your unique piece.', num: 'I' },
    { icon: <Gem size={20} />, title: 'Casting', desc: 'Select your stones from our curated collection. Each candidate is presented with full analysis and provenance.', num: 'II' },
    { icon: <Palette size={20} />, title: 'Rehearsal', desc: 'Review 3D renderings and make refinements. We iterate until every detail matches your vision perfectly.', num: 'III' },
    { icon: <Sparkles size={20} />, title: 'Performance', desc: 'Our master artisans bring the design to life with meticulous handwork over 8-12 weeks.', num: 'IV' },
    { icon: <CheckCircle size={20} />, title: 'The Premiere', desc: 'Your finished piece is presented in a private unveiling ceremony, complete with documentation and certification.', num: 'V' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(12,10,13,0.6), rgba(12,10,13,0.9)), url('/images/theater/spotlight.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <ActLabel label="Bespoke Commission" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>Write Your Own Act</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary }}>Commission a one-of-a-kind piece that tells your story.</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((step, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: TH.card, border: `1px solid ${TH.borderGold}40`, color: TH.gold }}>
                  {step.icon}
                </div>
                <div style={{ padding: '24px 0', borderBottom: `1px solid ${TH.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.8rem', color: TH.accent }}>Act {step.num}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, color: TH.text, margin: 0 }}>{step.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </TheaterSection>

      <TheaterSection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: TH.text, margin: '0 0 16px' }}>Begin Your Commission</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary, marginBottom: 32 }}>Bespoke commissions start at $5,000. Typical completion: 8-12 weeks.</p>
          <TheaterButton href="/theater/contact" size="lg">Request Consultation</TheaterButton>
        </RevealSection>
      </TheaterSection>
    </>
  )
}
