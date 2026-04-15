'use client'
import React from 'react'
import Image from 'next/image'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton, ProcessStep } from '../ui'
import { ArrowRight } from 'lucide-react'

export function MaisonCraftsmanship() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(44,36,24,0.7), rgba(44,36,24,0.9)), url('/images/maison/artisan-hands.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="The Art" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', fontWeight: 600, color: '#FAF8F5', margin: '0 0 16px' }}>Craftsmanship</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#FAF8F5cc' }}>The intersection of heritage technique and modern mastery.</p>
        </div>
      </section>

      <MaisonSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel label="Our Process" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text, margin: '0 0 20px' }}>From Vision to Reality</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <ProcessStep number="01" title="Design Consultation" description="Begin with a personal consultation to understand your vision, preferences, and the story you wish to tell." />
                <ProcessStep number="02" title="Material Selection" description="Our gemologists source the finest stones and metals, presenting only those that meet our exacting standards." />
                <ProcessStep number="03" title="Master Crafting" description="Skilled artisans bring the design to life using techniques passed down through generations." />
                <ProcessStep number="04" title="Quality Assurance" description="Every piece undergoes rigorous inspection before receiving our hallmark of excellence." />
              </div>
            </div>
            <div style={{ position: 'relative', height: 500, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/maison/gold-jewelry.jpg" alt="Craftsmanship" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MaisonSection>

      <MaisonSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <SectionLabel label="Materials" style={{ marginBottom: 16, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>Only the Finest</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 32 }}>
              We source our materials from the world&apos;s most reputable mines and suppliers, ensuring ethical provenance and exceptional quality at every step.
            </p>
            <MaisonButton href="/maison/grading">View Grading Standards <ArrowRight size={12} /></MaisonButton>
          </div>
        </RevealSection>
      </MaisonSection>
    </>
  )
}
