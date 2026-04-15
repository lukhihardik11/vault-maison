'use client'
import React from 'react'
import { TH, TheaterSection, RevealSection, StaggerItem, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton, ProgramCard } from '../ui'
import { Droplets, Sun, Shield, Sparkles, Clock, Heart } from 'lucide-react'

export function TheaterCare() {
  const tips = [
    { icon: <Droplets size={20} />, title: 'Cleaning', desc: 'Gently clean with warm water and mild soap. Use a soft brush for intricate settings. Avoid harsh chemicals and ultrasonic cleaners for delicate pieces.' },
    { icon: <Sun size={20} />, title: 'Storage', desc: 'Store each piece separately in its velvet-lined box. Keep away from direct sunlight and extreme temperatures. Use anti-tarnish strips for silver pieces.' },
    { icon: <Shield size={20} />, title: 'Protection', desc: 'Remove jewelry before swimming, exercising, or applying cosmetics. Avoid contact with perfumes, lotions, and household chemicals.' },
    { icon: <Sparkles size={20} />, title: 'Professional Care', desc: 'We recommend professional cleaning every 6 months. Our complimentary lifetime service includes cleaning, inspection, and minor repairs.' },
    { icon: <Clock size={20} />, title: 'Regular Checks', desc: 'Inspect prongs and settings monthly. If you notice any looseness, bring the piece in immediately to prevent stone loss.' },
    { icon: <Heart size={20} />, title: 'Insurance', desc: 'We recommend insuring all fine jewelry. We provide detailed appraisals and documentation for insurance purposes at no additional cost.' },
  ]

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <ActLabel label="Preservation" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>Care Guide</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary }}>Ensure your pieces perform beautifully for generations.</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {tips.map((tip, i) => (
            <StaggerItem key={i} index={i}>
              <ProgramCard icon={tip.icon} title={tip.title} description={tip.desc} />
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>

      <TheaterSection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: TH.text, margin: '0 0 12px' }}>Need Professional Care?</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, marginBottom: 24 }}>Schedule a complimentary cleaning and inspection.</p>
          <TheaterButton href="/theater/contact">Book Service</TheaterButton>
        </RevealSection>
      </TheaterSection>
    </>
  )
}
