'use client'
import React from 'react'
import Image from 'next/image'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton, FeatureIcon } from '../ui'
import { Gem, Eye, Ruler, Sparkles, Shield, FileText, ArrowRight } from 'lucide-react'

export function MaisonGrading() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(44,36,24,0.7), rgba(44,36,24,0.9)), url('/images/maison/gemstone-collection.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="Standards" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', fontWeight: 600, color: '#FAF8F5', margin: '0 0 16px' }}>Grading &amp; Certification</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#FAF8F5cc' }}>Our commitment to quality begins with the highest grading standards.</p>
        </div>
      </section>

      <MaisonSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 48 }}>
            <FeatureIcon icon={<Gem size={22} />} title="Cut" description="The artistry that unlocks a stone's brilliance and fire." />
            <FeatureIcon icon={<Eye size={22} />} title="Clarity" description="Purity assessed under expert magnification." />
            <FeatureIcon icon={<Sparkles size={22} />} title="Color" description="Graded on the internationally recognized D-Z scale." />
            <FeatureIcon icon={<Ruler size={22} />} title="Carat" description="Precise weight measurement to the hundredth." />
          </div>
        </RevealSection>

        <GoldDivider style={{ marginBottom: 48 }} />

        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel label="Certification" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text, margin: '0 0 16px' }}>Independent Verification</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                Every diamond above 0.3 carats is certified by GIA or AGS. Our colored gemstones are verified by independent gemological laboratories. Each certificate provides a detailed analysis of the stone&apos;s characteristics.
              </p>
              <MaisonButton href="/maison/contact" variant="secondary"><FileText size={14} /> Request a Report <ArrowRight size={12} /></MaisonButton>
            </div>
            <div style={{ position: 'relative', height: 380, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/maison/diamond-ring.jpg" alt="Certification" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MaisonSection>
    </>
  )
}
