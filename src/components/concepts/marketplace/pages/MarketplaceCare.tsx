'use client'
import React from 'react'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { MarketplaceButton } from '../ui'
import { Droplets, Sun, Shield, Sparkles, Clock, Heart } from 'lucide-react'

export function MarketplaceCare() {
  const tips = [
    { icon: <Droplets size={20} />, title: 'Cleaning', desc: 'Use warm water and mild soap with a soft brush. Avoid ultrasonic cleaners for delicate pieces. Professional cleaning recommended every 6 months.' },
    { icon: <Sun size={20} />, title: 'Storage', desc: 'Store each piece separately in its original packaging. Keep away from direct sunlight and extreme temperatures. Use anti-tarnish strips for silver.' },
    { icon: <Shield size={20} />, title: 'Protection', desc: 'Remove jewelry before swimming, exercising, or applying cosmetics. Avoid contact with perfumes, lotions, and household chemicals.' },
    { icon: <Sparkles size={20} />, title: 'Professional Service', desc: 'We recommend professional inspection every 6 months. Our network of certified jewelers offers complimentary cleaning for marketplace purchases.' },
    { icon: <Clock size={20} />, title: 'Regular Checks', desc: 'Inspect prongs and settings monthly. If you notice any looseness, bring the piece in immediately to prevent stone loss.' },
    { icon: <Heart size={20} />, title: 'Insurance', desc: 'We recommend insuring all fine jewelry. We provide detailed appraisals and documentation for insurance purposes.' },
  ]

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Preservation" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>Care Guide</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary }}>Protect your investment with proper care and maintenance.</p>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {tips.map((tip, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 24 }}>
                <div style={{ color: MK.accent, marginBottom: 12 }}>{tip.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: MK.text, margin: '0 0 8px' }}>{tip.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary, lineHeight: 1.7, margin: 0 }}>{tip.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>

      <MarketplaceSection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: MK.text, margin: '0 0 10px' }}>Need Professional Care?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, marginBottom: 20 }}>Connect with our certified jeweler network.</p>
          <MarketplaceButton href="/marketplace/contact">Find a Specialist</MarketplaceButton>
        </RevealSection>
      </MarketplaceSection>
    </>
  )
}
