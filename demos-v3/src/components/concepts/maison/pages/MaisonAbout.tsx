'use client'
import React from 'react'
import Image from 'next/image'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton, FeatureIcon } from '../ui'
import { Gem, Shield, Heart, Globe, ArrowRight } from 'lucide-react'

export function MaisonAbout() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(44,36,24,0.65), rgba(44,36,24,0.85)), url('/images/maison/boutique-interior.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="Our Heritage" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 600, color: '#FAF8F5', margin: '0 0 16px' }}>The Modern Maison</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#FAF8F5cc', lineHeight: 1.7 }}>
            Where timeless craftsmanship meets contemporary elegance. A curated experience for the discerning collector.
          </p>
        </div>
      </section>

      <MaisonSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel label="Our Story" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: MS.text, margin: '0 0 16px' }}>A Legacy of Excellence</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Founded on the principle that exceptional jewelry deserves an equally exceptional presentation, Vault Maison bridges the gap between heritage craftsmanship and modern sensibility.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Our team of master jewelers, gemologists, and design consultants work together to curate collections that honor tradition while embracing innovation.
              </p>
              <MaisonButton href="/maison/collections" variant="secondary">View Collections <ArrowRight size={12} /></MaisonButton>
            </div>
            <div style={{ position: 'relative', height: 420, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/maison/artisan-hands.jpg" alt="Artisan" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MaisonSection>

      <MaisonSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SectionLabel label="Our Values" style={{ marginBottom: 16, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text }}>What Guides Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { icon: <Gem size={22} />, title: 'Quality', desc: 'Only the finest materials and craftsmanship meet our exacting standards.' },
              { icon: <Shield size={22} />, title: 'Integrity', desc: 'Transparent sourcing, honest grading, and fair pricing — always.' },
              { icon: <Heart size={22} />, title: 'Passion', desc: 'Every piece we curate reflects our deep love for the art of jewelry.' },
              { icon: <Globe size={22} />, title: 'Sustainability', desc: 'Committed to ethical sourcing and environmentally conscious practices.' },
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <FeatureIcon icon={item.icon} title={item.title} description={item.desc} />
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </MaisonSection>
    </>
  )
}
