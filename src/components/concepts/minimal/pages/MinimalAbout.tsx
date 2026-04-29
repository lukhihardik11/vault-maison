'use client'

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, Diamond, Gem, Globe, type LucideIcon } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import { ScrollWordReveal } from '../animations/ScrollScrub'
import { KineticHeadline } from '../animations/KineticType'

const font = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'Space Mono', 'SF Mono', monospace"

const milestones = [
  { year: '2018', title: 'Founded in New York', desc: 'Vault Maison was established with a vision to redefine luxury jewelry through transparency and craftsmanship.' },
  { year: '2019', title: 'First Atelier Opens', desc: 'Our flagship atelier opened in SoHo, combining retail with an open workshop where clients watch artisans at work.' },
  { year: '2020', title: 'GIA Partnership', desc: 'Became an authorized GIA partner, ensuring every diamond comes with independent certification.' },
  { year: '2021', title: 'Bespoke Program Launch', desc: 'Introduced our one-on-one bespoke consultation service, creating over 200 custom pieces in the first year.' },
  { year: '2023', title: 'Sustainability Pledge', desc: 'Committed to recycled precious metals and conflict-free sourcing across our supply chain.' },
  { year: '2025', title: 'Digital Maison', desc: 'Launched our immersive digital experience, bringing the atelier to clients worldwide.' },
]

type ValueItem = {
  icon: LucideIcon
  title: string
  desc: string
}

const values: ValueItem[] = [
  { icon: Diamond, title: 'Uncompromising Quality', desc: 'Every stone is hand-selected and every setting is precision-crafted with long-term wear in mind.' },
  { icon: Award, title: 'Certified Transparency', desc: 'Each center stone is independently certified and every quote is shared with clear material details.' },
  { icon: Globe, title: 'Ethical Sourcing', desc: 'Responsible partners and traceable sourcing shape every decision from stone origin to final polish.' },
  { icon: Gem, title: 'Timeless Design', desc: 'We design for decades, not seasons, so each piece can be worn now and inherited later.' },
]

function useReveal(reducedMotion: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('abt-vis')
          observer.unobserve(element)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  return ref
}

interface RevealProps {
  children: ReactNode
  reducedMotion: boolean
  delay?: number
  style?: CSSProperties
}

function Reveal({ children, reducedMotion, delay = 0, style = {} }: RevealProps) {
  const ref = useReveal(reducedMotion)

  return (
    <div
      ref={ref}
      className={`abt-fade ${reducedMotion ? 'abt-reduced' : ''}`}
      style={{
        ...style,
        transitionDelay: reducedMotion ? '0ms' : `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function MinimalAbout() {
  const heroImageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotionPreference()

  useEffect(() => {
    if (reducedMotion) return

    const onScroll = () => {
      if (!heroImageRef.current) return
      heroImageRef.current.style.transform = `translateY(${window.scrollY * 0.12}px) scale(1.04)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reducedMotion])

  return (
    <MinimalLayout>
      <section
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '420px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          ref={heroImageRef}
          style={{
            position: 'absolute',
            inset: '-8%',
            willChange: reducedMotion ? 'auto' : 'transform',
            transform: 'translateY(0) scale(1.04)',
          }}
        >
          <img src="/images/products/editorial-model-jewelry.jpg" alt="About Vault Maison" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: '#050505', opacity: 0.56 }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '700px' }}>
          <span className="brutalist-section-num" style={{ color: '#E5E5E5', display: 'block', marginBottom: '16px' }}>01 — Our Story</span>
          {/* Phase 6: Per-character kinetic headline on dark hero */}
          <KineticHeadline
            text="Where Craft Meets Conviction"
            as="h1"
            variant="slide-up"
            style={{ fontFamily: font, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.1 }}
            stagger={0.02}
            once
            duration={0.9}
            start="top 95%"
          />
          <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 400, lineHeight: 1.8, color: '#E5E5E5', maxWidth: '520px' }}>
            Vault Maison was born from a simple belief: extraordinary jewelry should be transparent, personal, and built to last.
          </p>
        </div>
      </section>

      <section style={{ padding: '100px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="vm-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <Reveal reducedMotion={reducedMotion}>
            <div>
              <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '16px' }}>02 — Philosophy</span>
              <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505', marginBottom: '20px', lineHeight: 1.2 }}>
                The Art of Less, Perfected
              </h2>
              <ScrollWordReveal
                text="In an industry often defined by excess, we choose restraint. Every design is refined until each detail carries purpose."
                as="p"
                baseOpacity={0.15}
                start="top 85%"
                end="top 35%"
                className="vm-about-philosophy"
              />
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, lineHeight: 1.9, color: '#6B6B6B', marginBottom: '16px' }}>
                Our New York jewelers combine inherited bench technique with modern precision, balancing craft tradition and contemporary performance.
              </p>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, lineHeight: 1.9, color: '#6B6B6B' }}>
                We share stone details, metal composition, and pricing context so clients can make high-confidence choices.
              </p>
            </div>
          </Reveal>

          <Reveal reducedMotion={reducedMotion} delay={140}>
            <div className="abt-image-card" style={{ position: 'relative', aspectRatio: '4 / 5', background: '#E5E5E5', overflow: 'hidden' }}>
              <img src="/images/products/classic-gold-ring.jpg" alt="Craftsmanship detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '80px 5vw', background: '#E5E5E5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal reducedMotion={reducedMotion} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '12px' }}>03 — Our Values</span>
            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505' }}>What We Stand For</h2>
          </Reveal>

          <div className="abt-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Reveal key={value.title} reducedMotion={reducedMotion} delay={index * 90}>
                  <article className="abt-value-card">
                    <div className="abt-value-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontFamily: font, fontSize: '17px', fontWeight: 400, color: '#050505', margin: '0 0 10px' }}>{value.title}</h3>
                    <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#6B6B6B', lineHeight: 1.7, margin: 0 }}>{value.desc}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 5vw', maxWidth: '980px', margin: '0 auto' }}>
        <Reveal reducedMotion={reducedMotion} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '12px' }}>04 — Journey</span>
          <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505' }}>Our Milestones</h2>
        </Reveal>

        <div className="abt-timeline-list">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone.year} reducedMotion={reducedMotion} delay={index * 90}>
              <article className="abt-timeline-item">
                <p style={{ fontFamily: mono, fontSize: '22px', fontWeight: 700, color: '#050505', margin: '0 0 6px', letterSpacing: '0.05em' }}>{milestone.year}</p>
                <h3 style={{ fontFamily: font, fontSize: '17px', fontWeight: 500, color: '#050505', margin: '0 0 8px' }}>{milestone.title}</h3>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#6B6B6B', margin: 0 }}>{milestone.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 5vw', background: '#050505' }}>
        <div className="vm-numbers-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
          {[
            { num: '5,000+', label: 'Pieces Crafted' },
            { num: '98%', label: 'Client Satisfaction' },
            { num: '12', label: 'Master Artisans' },
            { num: '100%', label: 'GIA Certified' },
          ].map((stat, index) => (
            <Reveal key={stat.label} reducedMotion={reducedMotion} delay={index * 80}>
              <div>
                <p style={{ fontFamily: mono, fontSize: '36px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', letterSpacing: '0.02em' }}>{stat.num}</p>
                <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E5E5E5' }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 5vw', textAlign: 'center' }}>
        <Reveal reducedMotion={reducedMotion}>
          <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '16px' }}>06 — Begin Your Journey</span>
          <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505', marginBottom: '16px' }}>Let Us Create Something Extraordinary</h2>
          <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, lineHeight: 1.8, color: '#6B6B6B', maxWidth: '500px', margin: '0 auto 32px' }}>
            Whether you are selecting an engagement ring or a bespoke heirloom, our advisors are here to guide every step.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/minimal/bespoke"
              className="abt-cta-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                background: '#050505',
                color: '#FFFFFF',
                fontFamily: font,
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Book Consultation <ArrowRight size={14} />
            </Link>
            <Link
              href="/minimal/collections"
              className="abt-cta-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                border: '1px solid #E5E5E5',
                color: '#050505',
                fontFamily: font,
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Browse Collections
            </Link>
          </div>
        </Reveal>
      </section>

      <style>{`
        .vm-about-philosophy {
          font-family: ${font};
          font-size: 14px;
          font-weight: 400;
          line-height: 1.9;
          color: #6B6B6B;
          margin-bottom: 16px;
        }
        .abt-fade {
          opacity: 0.9;
          transform: translateY(12px);
          transition: opacity 540ms cubic-bezier(0.16, 1, 0.3, 1), transform 540ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .abt-fade.abt-vis {
          opacity: 1;
          transform: translateY(0);
        }
        .abt-fade.abt-reduced {
          opacity: 1;
          transform: none;
          transition: none;
        }
        .abt-image-card {
          border: 1px solid #E5E5E5;
          transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease;
        }
        .abt-values-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .abt-value-card {
          border: 1px solid #9B9B9B;
          background: #FFFFFF;
          padding: 24px;
          min-height: 180px;
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease;
        }
        .abt-value-icon {
          width: 36px;
          height: 36px;
          border: 1px solid #E5E5E5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          color: #050505;
        }
        .abt-timeline-list {
          border-left: 1px solid #E5E5E5;
          display: grid;
          gap: 18px;
          padding-left: 20px;
        }
        .abt-timeline-item {
          border: 1px solid #E5E5E5;
          background: #FFFFFF;
          padding: 22px;
          transition: border-color 220ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .abt-cta-primary,
        .abt-cta-secondary {
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease, background-color 220ms ease, color 220ms ease;
        }
        .abt-cta-primary:hover {
          background: #FFFFFF !important;
          color: #050505 !important;
          transition: none;
        }
        .abt-cta-secondary:hover {
          background: #050505 !important;
          color: #FFFFFF !important;
          transition: none;
        }
        .abt-cta-primary:focus-visible,
        .abt-cta-secondary:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }
        .abt-image-card:hover,
        .abt-value-card:hover,
        .abt-timeline-item:hover {
          opacity: 0.85;
          border-color: #050505;
        }
        @media (max-width: 768px) {
          .vm-about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .abt-values-grid {
            grid-template-columns: 1fr !important;
          }
          .vm-numbers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .abt-timeline-list {
            padding-left: 14px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .abt-fade,
          .abt-image-card,
          .abt-value-card,
          .abt-timeline-item,
          .abt-cta-primary,
          .abt-cta-secondary {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
/*
'use client'

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, Diamond, Gem, Globe, type LucideIcon } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

const font = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'Space Mono', 'SF Mono', monospace"

const milestones = [
  { year: '2018', title: 'Founded in New York', desc: 'Vault Maison launched with a clear brief: remove excess and let craftsmanship lead every decision.' },
  { year: '2019', title: 'First Atelier Opens', desc: 'Our SoHo atelier opened with visible workbenches so clients could watch each finishing step.' },
  { year: '2021', title: 'Bespoke Program', desc: 'Private consultations became core, pairing each client with a designer and gemologist from sketch onward.' },
  { year: '2023', title: 'Responsible Materials', desc: 'We moved core categories to recycled precious metals and tightened provenance requirements.' },
  { year: '2025', title: 'Digital Maison', desc: 'Remote consultations and digital previews brought atelier-level guidance to clients globally.' },
]

const values: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  { icon: Diamond, title: 'Uncompromising Quality', desc: 'Every stone is hand-reviewed and every setting is measured before it leaves the bench.' },
  { icon: Award, title: 'Certified Transparency', desc: 'Independent certification and clear material details are standard for every quote.' },
  { icon: Globe, title: 'Ethical Sourcing', desc: 'Conflict-free sourcing and responsible metal recovery are integrated across production.' },
  { icon: Gem, title: 'Timeless Design', desc: 'We prioritize proportion and wearability so each piece remains relevant for decades.' },
]

function FadeIn({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotionPreference()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (prefersReducedMotion) {
      element.classList.add('abt-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('abt-visible')
          observer.unobserve(element)
        }
      },
      { threshold: 0.16 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return (
    <div ref={ref} className="abt-fade" style={{ ...style, transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}>
      {children}
    </div>
  )
}

export function MinimalAbout() {
  const heroImageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotionPreference()

  useEffect(() => {
    if (prefersReducedMotion) return
    let frame = 0

    const handleScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        if (!heroImageRef.current) return
        const offset = Math.min(window.scrollY * 0.16, 46)
        heroImageRef.current.style.transform = `translateY(${offset}px) scale(1.04)`
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [prefersReducedMotion])

  return (
    <MinimalLayout>
      <section style={{ position: 'relative', minHeight: '420px', height: '62vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div ref={heroImageRef} style={{ position: 'absolute', inset: '-6%', transform: prefersReducedMotion ? 'none' : 'scale(1.04)', willChange: prefersReducedMotion ? 'auto' : 'transform' }}>
          <img src="/images/products/editorial-model-jewelry.jpg" alt="Atelier portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505', opacity: 0.52 }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw', maxWidth: '720px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E5E5E5' }}>Our Story</p>
          <h1 style={{ margin: '0 0 16px', fontFamily: font, fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 600, lineHeight: 1.08, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
            Where Craft Meets Conviction
          </h1>
          <p style={{ margin: 0, maxWidth: '560px', fontFamily: font, fontSize: '15px', fontWeight: 400, lineHeight: 1.8, color: '#E5E5E5' }}>
            Vault Maison was built on a simple principle: extraordinary jewelry should feel intentional, traceable, and deeply personal.
          </p>
        </div>
      </section>

      <section style={{ padding: '96px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="abt-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
          <FadeIn>
            <div>
              <p style={{ margin: '0 0 12px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B' }}>Philosophy</p>
              <h2 style={{ margin: '0 0 18px', fontFamily: font, fontSize: '32px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#050505' }}>The Art of Less, Refined</h2>
              <p style={{ margin: '0 0 14px', fontFamily: font, fontSize: '14px', lineHeight: 1.85, color: '#6B6B6B' }}>
                We focus on precision. Every curve, setting, and surface is iterated until it feels inevitable.
              </p>
              <p style={{ margin: 0, fontFamily: font, fontSize: '14px', lineHeight: 1.85, color: '#6B6B6B' }}>
                Material choices and pricing context are documented so clients can make informed, confident decisions.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="abt-image-shell" style={{ border: '1px solid #E5E5E5', aspectRatio: '4 / 5', overflow: 'hidden' }}>
              <img src="/images/products/classic-gold-ring.jpg" alt="Craftsmanship detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: '80px 5vw', borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn style={{ marginBottom: '34px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 10px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B' }}>Our Values</p>
            <h2 style={{ margin: 0, fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505' }}>What We Stand For</h2>
          </FadeIn>
          <div className="abt-values-grid">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 70}>
                <article className="abt-value-card">
                  <value.icon size={20} strokeWidth={1.5} style={{ color: '#050505', marginBottom: '12px' }} />
                  <h3 style={{ margin: '0 0 8px', fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#050505' }}>{value.title}</h3>
                  <p style={{ margin: 0, fontFamily: font, fontSize: '13px', lineHeight: 1.75, color: '#6B6B6B' }}>{value.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 5vw', maxWidth: '920px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '44px' }}>
          <p style={{ margin: '0 0 10px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B' }}>Journey</p>
          <h2 style={{ margin: 0, fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505' }}>Milestones</h2>
        </FadeIn>
        <div className="abt-timeline-list">
          {milestones.map((milestone, index) => (
            <FadeIn key={milestone.year} delay={index * 70}>
              <article className="abt-timeline-item">
                <p style={{ margin: '0 0 6px', fontFamily: font, fontSize: '20px', fontWeight: 600, color: '#050505' }}>{milestone.year}</p>
                <h3 style={{ margin: '0 0 6px', fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#050505' }}>{milestone.title}</h3>
                <p style={{ margin: 0, fontFamily: font, fontSize: '13px', lineHeight: 1.75, color: '#6B6B6B' }}>{milestone.desc}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: '96px 5vw', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ margin: '0 0 12px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B9B9B' }}>Begin Your Journey</p>
          <h2 style={{ margin: '0 0 12px', fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505' }}>Let Us Create Something Lasting</h2>
          <p style={{ margin: '0 auto 28px', maxWidth: '520px', fontFamily: font, fontSize: '14px', lineHeight: 1.8, color: '#6B6B6B' }}>
            From engagement rings to bespoke heirlooms, our advisors guide each decision with clarity and care.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/minimal/bespoke" className="abt-cta abt-cta-primary">
              Book Consultation <ArrowRight size={14} strokeWidth={1.6} />
            </Link>
            <Link href="/minimal/collections" className="abt-cta abt-cta-secondary">
              Browse Collections
            </Link>
          </div>
        </FadeIn>
      </section>

      <style>{`
        .abt-fade { opacity: 0; transform: translateY(16px); transition: opacity 620ms cubic-bezier(0.16, 1, 0.3, 1), transform 620ms cubic-bezier(0.16, 1, 0.3, 1); }
        .abt-fade.abt-visible { opacity: 1; transform: translateY(0); }
        .abt-image-shell { transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease; }
        .abt-image-shell:hover { transform: translateY(-3px); border-color: #050505 !important; }
        .abt-values-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .abt-value-card { border: 1px solid #E5E5E5; background: #FFFFFF; padding: 20px; transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease; }
        .abt-value-card:hover { transform: translateY(-3px); border-color: #050505; }
        .abt-timeline-list { border-left: 1px solid #E5E5E5; padding-left: 20px; display: grid; gap: 14px; }
        .abt-timeline-item { border: 1px solid #E5E5E5; padding: 18px; transition: transform 220ms ease, border-color 220ms ease; }
        .abt-timeline-item:hover { transform: translateY(-2px); border-color: #050505; }
        .abt-cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 20px; border: 1px solid #E5E5E5; text-decoration: none; font-family: ${font}; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; transition: background-color 220ms ease, color 220ms ease, border-color 220ms ease, transform 220ms ease; }
        .abt-cta-primary { background: #050505; border-color: #050505; color: #FFFFFF; }
        .abt-cta-primary:hover { background: #FFFFFF; color: #050505; transform: translateY(-1px); }
        .abt-cta-secondary { background: #FFFFFF; color: #050505; }
        .abt-cta-secondary:hover { border-color: #050505; transform: translateY(-1px); }
        .abt-cta:focus-visible { outline: 1px solid #050505; outline-offset: 2px; }
        @media (max-width: 900px) {
          .abt-story-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .abt-values-grid { grid-template-columns: 1fr; }
          .abt-timeline-list { padding-left: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .abt-fade { opacity: 1 !important; transform: none !important; transition: none !important; }
          .abt-image-shell, .abt-value-card, .abt-timeline-item, .abt-cta { transition: none !important; }
          .abt-image-shell:hover, .abt-value-card:hover, .abt-timeline-item:hover, .abt-cta-primary:hover, .abt-cta-secondary:hover { transform: none !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
*/
