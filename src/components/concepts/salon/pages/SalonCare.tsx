'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonButton } from '../ui/SalonButton'
import { Droplets, Sun, Sparkles, Shield } from 'lucide-react'

const tips = [
  { icon: <Droplets size={20} />, title: 'Cleaning', desc: 'Gently clean your jewelry with warm water and mild soap. Use a soft brush for intricate settings. Pat dry with a lint-free cloth.' },
  { icon: <Sun size={20} />, title: 'Daily Wear', desc: 'Put jewelry on last when getting ready. Remove before swimming, exercising, or applying lotions and perfumes.' },
  { icon: <Sparkles size={20} />, title: 'Storage', desc: 'Store each piece separately in the provided pouch to prevent scratching. Keep in a cool, dry place away from direct sunlight.' },
  { icon: <Shield size={20} />, title: 'Professional Care', desc: 'Bring your pieces to The Salon every 6 months for complimentary professional cleaning and inspection.' },
]

export function SalonCare() {
  return (
    <SalonLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Care Guide</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>Caring for Your Jewelry</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          With proper care, your pieces will maintain their beauty for generations. Here are our advisor&apos;s tips.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {tips.map((tip) => (
            <div key={tip.title} style={{ background: S.surface, borderRadius: S.radiusLg, padding: '28px', border: `1px solid ${S.border}` }}>
              <div style={{ width: 48, height: 48, borderRadius: S.radius, background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.accent, marginBottom: 16 }}>{tip.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: S.text, margin: '0 0 8px' }}>{tip.title}</h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.82rem', color: S.textSecondary, lineHeight: 1.7, margin: 0 }}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 32px 80px', background: S.warmPanel, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Need Professional Cleaning?</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>Book a complimentary cleaning session at The Salon.</p>
        <SalonButton href="/salon/contact">Book a Session</SalonButton>
      </section>
    </SalonLayout>
  )
}
