'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { ArrowRight, Diamond, Award, Globe, Gem } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const milestones = [
  { year: '2018', title: 'Founded in New York', desc: 'Vault Maison was established with a vision to redefine luxury jewelry through transparency and craftsmanship.' },
  { year: '2019', title: 'First Atelier Opens', desc: 'Our flagship atelier opened in SoHo, combining retail with an open workshop where clients watch artisans at work.' },
  { year: '2020', title: 'GIA Partnership', desc: 'Became an authorized GIA partner, ensuring every diamond comes with independent certification.' },
  { year: '2021', title: 'Bespoke Program Launch', desc: 'Introduced our one-on-one bespoke consultation service, creating over 200 custom pieces in the first year.' },
  { year: '2023', title: 'Sustainability Pledge', desc: 'Committed to 100% recycled precious metals and conflict-free sourcing across our entire supply chain.' },
  { year: '2025', title: 'Digital Maison', desc: 'Launched our immersive digital experience, bringing the atelier to clients worldwide.' },
]

const values = [
  { icon: Diamond, title: 'Uncompromising Quality', desc: 'Every stone is hand-selected. Every setting is precision-crafted. We accept nothing less than excellence.' },
  { icon: Award, title: 'Certified Transparency', desc: 'GIA-certified diamonds, fully traceable origins, and honest pricing without traditional retail markups.' },
  { icon: Globe, title: 'Ethical Sourcing', desc: 'Conflict-free diamonds, recycled precious metals, and partnerships with responsible mining communities.' },
  { icon: Gem, title: 'Timeless Design', desc: 'Our pieces transcend trends. Designed to be worn for decades, passed through generations, and cherished forever.' },
]

export function MinimalAbout() {
  return (
    <MinimalLayout>
      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: '400px', backgroundColor: '#1A1A1A', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <Image src="/images/products/editorial-model-jewelry.jpg" alt="About Vault Maison" fill style={{ objectFit: 'cover', opacity: 0.35 }} priority unoptimized />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '700px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Our Story</p>
          <h1 style={{ fontFamily: font, fontSize: '48px', fontWeight: 200, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.1 }}>Where Craft Meets Conviction</h1>
          <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', maxWidth: '520px' }}>
            Vault Maison was born from a simple belief: that extraordinary jewelry should be accessible, transparent, and deeply personal.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: '100px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="vm-about-grid">
          <div>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Philosophy</p>
            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A', marginBottom: '20px', lineHeight: 1.2 }}>The Art of Less, Perfected</h2>
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555', marginBottom: '16px' }}>
              In an industry often defined by excess, we chose restraint. Every piece in our collection is the result of months of design refinement — stripping away the unnecessary until only the essential remains.
            </p>
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555', marginBottom: '16px' }}>
              Our master jewelers in New York work with techniques passed down through generations, combined with modern precision technology. The result is jewelry that feels both timeless and unmistakably contemporary.
            </p>
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555' }}>
              We believe luxury should be transparent. That is why every diamond is GIA-certified, every gold karat is verified, and every price reflects honest value without traditional retail markups.
            </p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/5', backgroundColor: '#F5F4F0', overflow: 'hidden' }}>
            <Image src="/images/products/classic-gold-ring.jpg" alt="Craftsmanship" fill style={{ objectFit: 'cover' }} unoptimized />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 5vw', backgroundColor: '#F5F4F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>Our Values</p>
            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A' }}>What We Stand For</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }} className="vm-values-grid">
            {values.map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <v.icon size={28} strokeWidth={1} style={{ color: '#C4A265', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: font, fontSize: '15px', fontWeight: 500, color: '#1A1A1A', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#9B9590' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 5vw', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>Journey</p>
          <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A' }}>Our Milestones</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: '#E8E5E0', transform: 'translateX(-50%)' }} className="vm-timeline-line" />
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', position: 'relative', marginBottom: '48px' }} className="vm-timeline-item">
              <div style={{ width: '45%', padding: i % 2 === 0 ? '0 40px 0 0' : '0 0 0 40px', textAlign: i % 2 === 0 ? 'right' : 'left' }} className="vm-timeline-content">
                <p style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#C4A265', marginBottom: '8px' }}>{m.year}</p>
                <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#1A1A1A', marginBottom: '8px' }}>{m.title}</h3>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#9B9590' }}>{m.desc}</p>
              </div>
              <div style={{ position: 'absolute', left: '50%', top: '8px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#C4A265', transform: 'translateX(-50%)', zIndex: 2 }} className="vm-timeline-dot" />
            </div>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section style={{ padding: '80px 5vw', backgroundColor: '#1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }} className="vm-numbers-grid">
          {[
            { num: '5,000+', label: 'Pieces Crafted' },
            { num: '98%', label: 'Client Satisfaction' },
            { num: '12', label: 'Master Artisans' },
            { num: '100%', label: 'GIA Certified' },
          ].map((n, i) => (
            <div key={i}>
              <p style={{ fontFamily: font, fontSize: '36px', fontWeight: 200, color: '#C4A265', marginBottom: '8px' }}>{n.num}</p>
              <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 5vw', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Begin Your Journey</p>
        <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A', marginBottom: '16px' }}>Let Us Create Something Extraordinary</h2>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9590', maxWidth: '500px', margin: '0 auto 32px' }}>
          Whether you are searching for the perfect engagement ring or a bespoke heirloom, our team is here to guide you.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/minimal/bespoke" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', backgroundColor: '#C4A265', color: '#FFFFFF', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Book Consultation <ArrowRight size={14} />
          </Link>
          <Link href="/minimal/collections" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', border: '1px solid #E8E5E0', color: '#1A1A1A', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Browse Collections
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .vm-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vm-numbers-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vm-timeline-line { display: none !important; }
          .vm-timeline-dot { display: none !important; }
          .vm-timeline-item { justify-content: flex-start !important; }
          .vm-timeline-content { width: 100% !important; text-align: left !important; padding: 0 !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
