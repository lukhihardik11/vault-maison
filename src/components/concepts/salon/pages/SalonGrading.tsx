'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonButton } from '../ui/SalonButton'
import { Diamond, Ruler, Palette, Sparkles } from 'lucide-react'

const fourCs = [
  { icon: <Diamond size={22} />, title: 'Cut', desc: 'The most important factor in a diamond\'s beauty. A well-cut diamond reflects light brilliantly, creating that mesmerizing sparkle. Our advisors can show you the difference in person.', grades: ['Excellent', 'Very Good', 'Good', 'Fair'] },
  { icon: <Sparkles size={22} />, title: 'Clarity', desc: 'Natural diamonds have tiny characteristics called inclusions. Most are invisible to the naked eye. James can help you find the sweet spot between clarity and value.', grades: ['FL/IF', 'VVS1/VVS2', 'VS1/VS2', 'SI1/SI2'] },
  { icon: <Palette size={22} />, title: 'Color', desc: 'Diamond color ranges from colorless (D) to light yellow (Z). The less color, the rarer the stone. But some of the most beautiful diamonds have a warm, golden hue.', grades: ['D-F (Colorless)', 'G-J (Near Colorless)', 'K-M (Faint)', 'N-Z (Light)'] },
  { icon: <Ruler size={22} />, title: 'Carat', desc: 'Carat measures a diamond\'s weight, not its size. Two diamonds of the same carat can look different depending on their cut. Let us show you how to get the most visual impact.', grades: ['0.5 ct', '1.0 ct', '1.5 ct', '2.0 ct+'] },
]

export function SalonGrading() {
  return (
    <SalonLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Education</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>Understanding Diamond Grading</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          The 4Cs are the universal language of diamond quality. Let our gemologists explain what really matters.
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 80px' }}>
        {fourCs.map((c, i) => (
          <div key={c.title} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', gap: 48, marginBottom: 60, alignItems: 'center' }}>
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ width: 56, height: 56, borderRadius: S.radius, background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.accent, marginBottom: 16 }}>{c.icon}</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>{c.title}</h2>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
            </div>
            <div style={{ background: S.surface, borderRadius: S.radiusLg, padding: '28px', border: `1px solid ${S.border}`, order: i % 2 === 0 ? 1 : 0 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.accent, margin: '0 0 16px', fontWeight: 500 }}>Grade Scale</p>
              {c.grades.map((grade, gi) => (
                <div key={grade} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: gi < c.grades.length - 1 ? `1px solid ${S.border}` : 'none' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: gi === 0 ? S.accent : `${S.accent}${Math.max(20, 80 - gi * 20)}` }} />
                  <span style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: gi === 0 ? S.text : S.textSecondary }}>{grade}</span>
                  {gi === 0 && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: S.accent, marginLeft: 'auto', fontWeight: 500 }}>RECOMMENDED</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: '60px 32px 80px', background: S.warmPanel, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Want to Learn More?</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>Book a private education session with James, our certified gemologist.</p>
        <SalonButton href="/salon/contact">Book a Session</SalonButton>
      </section>
    </SalonLayout>
  )
}
