'use client'
import React from 'react'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel } from '../MaisonLayout'
import { MaisonButton, FeatureIcon } from '../ui'
import { Droplets, Sun, Shield, Sparkles, Clock, Heart } from 'lucide-react'

export function MaisonCare() {
  const tips = [
    { icon: <Droplets size={22} />, title: 'Gentle Cleaning', desc: 'Use warm water with mild soap and a soft brush. Rinse thoroughly and pat dry with a lint-free cloth. Professional cleaning recommended every 6 months.' },
    { icon: <Sun size={22} />, title: 'Proper Storage', desc: 'Store each piece separately in its original box or a soft pouch. Keep away from direct sunlight and extreme temperatures.' },
    { icon: <Shield size={22} />, title: 'Daily Protection', desc: 'Remove jewelry before swimming, exercising, or applying cosmetics. Put jewelry on last and take it off first.' },
    { icon: <Sparkles size={22} />, title: 'Professional Care', desc: 'Visit our boutique for complimentary cleaning and inspection. Our jewelers can check prongs, clasps, and settings.' },
    { icon: <Clock size={22} />, title: 'Regular Inspection', desc: 'Check your pieces monthly for loose stones or worn prongs. Early detection prevents loss and damage.' },
    { icon: <Heart size={22} />, title: 'Insurance', desc: 'We recommend insuring all fine jewelry. We provide detailed appraisals for insurance purposes upon request.' },
  ]

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Preservation" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>Care Guide</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.textSecondary }}>Preserve the beauty and brilliance of your collection.</p>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {tips.map((tip, i) => (
            <StaggerItem key={i} index={i}>
              <FeatureIcon icon={tip.icon} title={tip.title} description={tip.desc} />
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>

      <MaisonSection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: MS.text, margin: '0 0 10px' }}>Need Professional Care?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, marginBottom: 20 }}>Visit our boutique for complimentary cleaning and inspection.</p>
          <MaisonButton href="/maison/contact">Book an Appointment</MaisonButton>
        </RevealSection>
      </MaisonSection>
    </>
  )
}
