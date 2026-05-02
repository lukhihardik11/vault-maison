'use client'

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, Diamond, Gem, Globe, type LucideIcon } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import { minimal } from '../design-system';

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
          <img src="/images/products/editorial-model-jewelry.jpg" alt="Atelier portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async"/>
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505', opacity: 0.52 }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw', maxWidth: '720px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: font, fontSize: minimal.type.caption, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E5E5E5' }}>Our Story</p>
          <h1 style={{ margin: '0 0 16px', fontFamily: font, fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 600, lineHeight: 1.08, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
            Where Craft Meets Conviction
          </h1>
          <p style={{ margin: 0, maxWidth: '560px', fontFamily: font, fontSize: minimal.type.body, fontWeight: 400, lineHeight: 1.8, color: '#E5E5E5' }}>
            Vault Maison was built on a simple principle: extraordinary jewelry should feel intentional, traceable, and deeply personal.
          </p>
        </div>
      </section>

      <section style={{ padding: '96px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="abt-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
          <FadeIn>
            <div>
              <p style={{ margin: '0 0 12px', fontFamily: font, fontSize: minimal.type.caption, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#767676' }}>Philosophy</p>
              <h2 style={{ margin: '0 0 18px', fontFamily: font, fontSize: minimal.type.h2, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#050505' }}>The Art of Less, Refined</h2>
              <p style={{ margin: '0 0 14px', fontFamily: font, fontSize: minimal.type.body, lineHeight: 1.85, color: '#6B6B6B' }}>
                We focus on precision. Every curve, setting, and surface is iterated until it feels inevitable.
              </p>
              <p style={{ margin: 0, fontFamily: font, fontSize: minimal.type.body, lineHeight: 1.85, color: '#6B6B6B' }}>
                Material choices and pricing context are documented so clients can make informed, confident decisions.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="abt-image-shell" style={{ border: '1px solid #E5E5E5', aspectRatio: '4 / 5', overflow: 'hidden' }}>
              <img src="/images/products/classic-gold-ring.jpg" alt="Craftsmanship detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async"/>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: '80px 5vw', borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5', overflow: 'hidden', maxWidth: '100vw', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn style={{ marginBottom: '34px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 10px', fontFamily: font, fontSize: minimal.type.caption, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#767676' }}>Our Values</p>
            <h2 style={{ margin: 0, fontFamily: font, fontSize: minimal.type.h2, fontWeight: 600, color: '#050505' }}>What We Stand For</h2>
          </FadeIn>
          <div className="abt-values-grid">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 70}>
                <article className="abt-value-card">
                  <value.icon size={20} strokeWidth={1.5} style={{ color: '#050505', marginBottom: '12px' }} />
                  <h3 style={{ margin: '0 0 8px', fontFamily: font, fontSize: minimal.type.bodyLg, fontWeight: 500, color: '#050505' }}>{value.title}</h3>
                  <p style={{ margin: 0, fontFamily: font, fontSize: minimal.type.bodySm, lineHeight: 1.75, color: '#6B6B6B' }}>{value.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 5vw', maxWidth: '920px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '44px' }}>
          <p style={{ margin: '0 0 10px', fontFamily: font, fontSize: minimal.type.caption, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#767676' }}>Journey</p>
          <h2 style={{ margin: 0, fontFamily: font, fontSize: minimal.type.h2, fontWeight: 600, color: '#050505' }}>Milestones</h2>
        </FadeIn>
        <div className="abt-timeline-list">
          {milestones.map((milestone, index) => (
            <FadeIn key={milestone.year} delay={index * 70}>
              <article className="abt-timeline-item">
                <p style={{ margin: '0 0 6px', fontFamily: font, fontSize: minimal.type.h4, fontWeight: 600, color: '#050505' }}>{milestone.year}</p>
                <h3 style={{ margin: '0 0 6px', fontFamily: font, fontSize: minimal.type.bodyLg, fontWeight: 500, color: '#050505' }}>{milestone.title}</h3>
                <p style={{ margin: 0, fontFamily: font, fontSize: minimal.type.bodySm, lineHeight: 1.75, color: '#6B6B6B' }}>{milestone.desc}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: '96px 5vw', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ margin: '0 0 12px', fontFamily: font, fontSize: minimal.type.caption, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#767676' }}>Begin Your Journey</p>
          <h2 style={{ margin: '0 0 12px', fontFamily: font, fontSize: minimal.type.h2, fontWeight: 600, color: '#050505' }}>Let Us Create Something Lasting</h2>
          <p style={{ margin: '0 auto 28px', maxWidth: '520px', fontFamily: font, fontSize: minimal.type.body, lineHeight: 1.8, color: '#6B6B6B' }}>
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
