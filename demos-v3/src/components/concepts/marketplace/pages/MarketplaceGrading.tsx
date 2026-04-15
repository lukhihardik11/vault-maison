'use client'
import React from 'react'
import Image from 'next/image'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton, RarityBadge } from '../ui'
import { Gem, Eye, Ruler, Sparkles, Shield, FileText } from 'lucide-react'

export function MarketplaceGrading() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(13,17,23,0.8), rgba(13,17,23,0.95)), url('/images/marketplace/diamond-rough.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="Authentication" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Grading &amp; Certification</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: MK.textSecondary }}>Our 47-point authentication process ensures every lot meets the highest standards.</p>
        </div>
      </section>

      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 48 }}>
            {[
              { icon: <Gem size={20} />, label: 'Cut', desc: 'How a diamond interacts with light — the most critical factor.' },
              { icon: <Eye size={20} />, label: 'Clarity', desc: 'Absence of inclusions and blemishes under 10x magnification.' },
              { icon: <Sparkles size={20} />, label: 'Color', desc: 'Graded D (colorless) to Z (light yellow) on the GIA scale.' },
              { icon: <Ruler size={20} />, label: 'Carat', desc: 'Weight measurement that influences size and market value.' },
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', padding: 16 }}>
                  <div style={{ color: MK.accent, marginBottom: 10, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MK.text, margin: '0 0 6px' }}>{item.label}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, margin: 0 }}>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>

        <LotDivider style={{ marginBottom: 48 }} />

        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: MK.text }}>Rarity Classification</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {(['rare', 'exceptional', 'museum', 'unique'] as const).map((level, i) => (
              <StaggerItem key={level} index={i}>
                <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 20, textAlign: 'center' }}>
                  <RarityBadge level={level} style={{ marginBottom: 12 }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, margin: 0 }}>
                    {level === 'rare' && 'Top 10% of submissions. Exceptional quality with strong market demand.'}
                    {level === 'exceptional' && 'Top 3% of submissions. Outstanding characteristics and provenance.'}
                    {level === 'museum' && 'Top 1%. Pieces of historical significance or extraordinary quality.'}
                    {level === 'unique' && 'Truly one-of-a-kind. No comparable piece exists in the market.'}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </MarketplaceSection>

      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel label="Certification" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Independent Verification</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                All diamonds above 0.3 carats are certified by GIA or AGS. High-value pieces receive blockchain-verified certificates of authenticity, providing an immutable record of provenance and grading.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <MarketplaceButton href="/marketplace/contact" variant="secondary"><FileText size={14} /> Request Report</MarketplaceButton>
              </div>
            </div>
            <div style={{ position: 'relative', height: 350, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/marketplace/certificate.jpg" alt="Certification" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>
    </>
  )
}
