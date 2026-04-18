'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { ArrowRight, Diamond, Award, Globe, Gem } from 'lucide-react'
import { BentoGrid } from '../ui'

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

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('abt-vis'); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useFadeIn()
  return <div ref={ref} className="abt-fade" style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</div>
}

export function MinimalAbout() {
  const heroImgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (heroImgRef.current) heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.1)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MinimalLayout>
      {/* Parallax Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div ref={heroImgRef} style={{ position: 'absolute', inset: '-10%', willChange: 'transform' }}>
          <img src="/images/products/editorial-model-jewelry.jpg" alt="About Vault Maison" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,26,26,0.75), rgba(26,26,26,0.4))' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '700px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Our Story</p>
          <h1 style={{ fontFamily: font, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 200, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.1 }}>Where Craft Meets Conviction</h1>
          <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', maxWidth: '520px' }}>
            Vault Maison was born from a simple belief: that extraordinary jewelry should be accessible, transparent, and deeply personal.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: '100px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="vm-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeIn>
            <div>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Philosophy</p>
              <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#050505', marginBottom: '20px', lineHeight: 1.2 }}>The Art of Less, Perfected</h2>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555', marginBottom: '16px' }}>
                In an industry often defined by excess, we chose restraint. Every piece in our collection is the result of months of design refinement — stripping away the unnecessary until only the essential remains.
              </p>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555', marginBottom: '16px' }}>
                Our master jewelers in New York work with techniques passed down through generations, combined with modern precision technology.
              </p>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555' }}>
                We believe luxury should be transparent. Every diamond is GIA-certified, every gold karat verified, and every price reflects honest value.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ position: 'relative', aspectRatio: '4/5', backgroundColor: '#FAFAFA', overflow: 'hidden', borderRadius: 0 }}>
              <img src="/images/products/classic-gold-ring.jpg" alt="Craftsmanship" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values (BentoGrid - KokonutUI) */}
      <section style={{ padding: '80px 5vw', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', marginBottom: '12px' }}>Our Values</p>
            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#050505' }}>What We Stand For</h2>
          </FadeIn>
          <BentoGrid items={[
            { title: 'Uncompromising Quality', description: 'Every stone is hand-selected. Every setting is precision-crafted. We accept nothing less than excellence.', icon: <Diamond size={24} strokeWidth={1} />, span: 'wide' },
            { title: 'Certified Transparency', description: 'GIA-certified diamonds, fully traceable origins, and honest pricing without traditional retail markups.', icon: <Award size={24} strokeWidth={1} /> },
            { title: 'Ethical Sourcing', description: 'Conflict-free diamonds, recycled precious metals, and partnerships with responsible mining communities.', icon: <Globe size={24} strokeWidth={1} /> },
            { title: 'Timeless Design', description: 'Our pieces transcend trends. Designed to be worn for decades, passed through generations, and cherished forever.', icon: <Gem size={24} strokeWidth={1} />, span: 'wide' },
          ]} />
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 5vw', maxWidth: '900px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', marginBottom: '12px' }}>Journey</p>
          <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#050505' }}>Our Milestones</h2>
        </FadeIn>
        <div style={{ position: 'relative' }}>
          <div className="vm-timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: '#E5E5E5', transform: 'translateX(-50%)' }} />
          {milestones.map((m, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="vm-timeline-item" style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', position: 'relative', marginBottom: '48px' }}>
                <div className="vm-timeline-content" style={{ width: '45%', padding: i % 2 === 0 ? '0 40px 0 0' : '0 0 0 40px', textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <p style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#050505', marginBottom: '8px' }}>{m.year}</p>
                  <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#050505', marginBottom: '8px' }}>{m.title}</h3>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#9B9B9B' }}>{m.desc}</p>
                </div>
                <div className="vm-timeline-dot" style={{ position: 'absolute', left: '50%', top: '8px', width: '10px', height: '10px', borderRadius: 0, backgroundColor: '#050505', transform: 'translateX(-50%)', zIndex: 2 }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section style={{ padding: '80px 5vw', backgroundColor: '#050505' }}>
        <div className="vm-numbers-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
          {[
            { num: '5,000+', label: 'Pieces Crafted' },
            { num: '98%', label: 'Client Satisfaction' },
            { num: '12', label: 'Master Artisans' },
            { num: '100%', label: 'GIA Certified' },
          ].map((n, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div>
                <p style={{ fontFamily: font, fontSize: '36px', fontWeight: 200, color: '#050505', marginBottom: '8px' }}>{n.num}</p>
                <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{n.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 5vw', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Begin Your Journey</p>
          <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#050505', marginBottom: '16px' }}>Let Us Create Something Extraordinary</h2>
          <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9B9B', maxWidth: '500px', margin: '0 auto 32px' }}>
            Whether you are searching for the perfect engagement ring or a bespoke heirloom, our team is here to guide you.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/minimal/bespoke" className="abt-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', backgroundColor: '#050505', color: '#FFFFFF', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 0, transition: 'all 300ms' }}>
              Book Consultation <ArrowRight size={14} />
            </Link>
            <Link href="/minimal/collections" className="abt-cta-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', border: '1px solid #E5E5E5', color: '#050505', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 0, transition: 'all 300ms' }}>
              Browse Collections
            </Link>
          </div>
        </FadeIn>
      </section>

      <style>{`
        .abt-fade { opacity: 1; transform: translateY(0); transition: opacity 0.7s ease, transform 0.7s ease; }
        .abt-fade.abt-vis { opacity: 1; transform: translateY(0); }
        .abt-value-card:hover { transform: translateY(-4px); box-shadow: 6px 6px 12px #E5E5E5, -6px -6px 12px #ffffff !important; }
        .abt-cta-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .abt-cta-secondary:hover { border-color: #050505 !important; color: #050505 !important; }
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
