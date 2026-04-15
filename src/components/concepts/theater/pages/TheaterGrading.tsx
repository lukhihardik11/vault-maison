'use client'
import React from 'react'
import Image from 'next/image'
import { TH, TheaterSection, RevealSection, StaggerItem, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton } from '../ui'
import { Gem, Eye, Ruler, Sparkles, Award } from 'lucide-react'

export function TheaterGrading() {
  const grades = [
    { grade: 'Excellent', desc: 'Maximum brilliance, fire, and scintillation. The stone commands the stage with unmatched presence.', color: TH.gold },
    { grade: 'Very Good', desc: 'Exceptional light performance with minor deviations visible only under 10x magnification.', color: TH.gold },
    { grade: 'Good', desc: 'Strong performance with slight inclusions that do not affect the stone\'s visual drama.', color: TH.textSecondary },
    { grade: 'Fair', desc: 'Acceptable quality with visible characteristics. Suitable for certain design applications.', color: TH.textSecondary },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(12,10,13,0.7), rgba(12,10,13,0.9)), url('/images/theater/diamond-glow.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <ActLabel label="Quality Standards" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>Grading &amp; Certification</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary }}>Every stone must audition for a role in our collection.</p>
        </div>
      </section>

      <TheaterSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 48 }}>
            {[
              { icon: <Gem size={20} />, label: 'Cut', desc: 'The most critical factor — how a diamond interacts with light.' },
              { icon: <Eye size={20} />, label: 'Clarity', desc: 'The absence of inclusions and blemishes under magnification.' },
              { icon: <Sparkles size={20} />, label: 'Color', desc: 'Graded on a scale from D (colorless) to Z (light yellow).' },
              { icon: <Ruler size={20} />, label: 'Carat', desc: 'The weight measurement that influences size and presence.' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ color: TH.gold, marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: TH.text, margin: '0 0 8px' }}>{item.label}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: TH.textSecondary, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <GoldRule style={{ marginBottom: 48 }} />

        <RevealSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: TH.text, margin: '0 0 24px', textAlign: 'center' }}>Our Grading Scale</h2>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {grades.map((g, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, padding: '16px 0', borderBottom: `1px solid ${TH.border}`, alignItems: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, color: g.color }}>{g.grade}</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, lineHeight: 1.6, margin: 0 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </TheaterSection>

      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ActLabel label="Certification" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>Independent Verification</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                All diamonds above 0.3 carats are certified by GIA or AGS. Additionally, every piece receives our Theater Authentication Report — a comprehensive document detailing provenance, quality assessment, and care instructions.
              </p>
              <TheaterButton href="/theater/contact" variant="secondary">Request a Report</TheaterButton>
            </div>
            <div style={{ position: 'relative', height: 350, overflow: 'hidden' }}>
              <Image src="/images/theater/jewel-box.jpg" alt="Certification" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </TheaterSection>
    </>
  )
}
