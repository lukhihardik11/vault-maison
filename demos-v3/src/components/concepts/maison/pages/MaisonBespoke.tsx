'use client'
import React from 'react'
import Image from 'next/image'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton, MaisonInput, ProcessStep } from '../ui'
import { Gem, Palette, Sparkles, ArrowRight } from 'lucide-react'

export function MaisonBespoke() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(44,36,24,0.7), rgba(44,36,24,0.9)), url('/images/maison/gold-jewelry.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="Made for You" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', fontWeight: 600, color: '#FAF8F5', margin: '0 0 16px' }}>Bespoke Service</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#FAF8F5cc' }}>Commission a one-of-a-kind piece that tells your unique story.</p>
        </div>
      </section>

      <MaisonSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
            {[
              { icon: <Palette size={22} />, title: 'Design', desc: 'Work with our designers to create a piece that reflects your vision and personality.' },
              { icon: <Gem size={22} />, title: 'Materials', desc: 'Choose from the world\'s finest gemstones and precious metals, hand-selected for your piece.' },
              { icon: <Sparkles size={22} />, title: 'Crafting', desc: 'Our master artisans bring your design to life with meticulous attention to every detail.' },
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', padding: 24, background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4 }}>
                  <div style={{ color: MS.accent, marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: MS.text, margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>

        <GoldDivider style={{ marginBottom: 48 }} />

        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <SectionLabel label="Begin Your Journey" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, color: MS.text, margin: '0 0 20px' }}>Bespoke Inquiry</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MaisonInput label="First Name" placeholder="First name" />
                <MaisonInput label="Last Name" placeholder="Last name" />
              </div>
              <MaisonInput label="Email" placeholder="your@email.com" type="email" />
              <MaisonInput label="Tell Us About Your Vision" placeholder="Describe the piece you envision..." multiline rows={5} />
              <MaisonButton size="lg">Submit Inquiry <ArrowRight size={12} /></MaisonButton>
            </div>
            <div style={{ position: 'relative', height: 500, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/maison/rose-gold.jpg" alt="Bespoke" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MaisonSection>
    </>
  )
}
