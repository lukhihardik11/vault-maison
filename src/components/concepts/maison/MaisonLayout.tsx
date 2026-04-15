'use client'
import { AuthModal } from '@/components/shared/auth-modal'
import { ToastNotifications } from '@/components/shared/toast-notifications'
import { getConcept } from '@/data/concepts'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react'

/* ── design tokens ── */
export const MS = {
  bg:            '#FAF8F5',
  bgAlt:         '#F3EFE9',
  surface:       '#EDE8E0',
  card:          '#FFFFFF',
  border:        '#E0D8CC',
  borderLight:   '#EDE8E0',
  text:          '#2C2418',
  textSecondary: '#8C7E6A',
  accent:        '#B8924A',
  accentDark:    '#96782E',
  accentLight:   '#D4B978',
  muted:         '#C4B8A4',
  success:       '#5A7A5A',
  error:         '#A65A5A',
  glow:          'rgba(184,146,74,0.06)',
} as const

/* ── shared components ── */
export function MaisonSection({ children, alt, style }: { children: React.ReactNode; alt?: boolean; style?: React.CSSProperties }) {
  return (
    <section style={{ background: alt ? MS.bgAlt : MS.bg, padding: '72px 0', ...style }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>{children}</div>
    </section>
  )
}

export function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el) } }, { threshold: 0.15 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} className="maison-scroll-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export function StaggerItem({ children, index }: { children: React.ReactNode; index: number }) {
  return <div className={`maison-scroll-reveal maison-stagger-${Math.min(index, 6)}`}>{children}</div>
}

export function SectionLabel({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <span style={{ width: 24, height: 1, background: MS.accent }} />
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: MS.accent }}>{label}</span>
    </div>
  )
}

export function GoldDivider({ style }: { style?: React.CSSProperties }) {
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${MS.accent}40, transparent)`, ...style }} />
}

/* ── layout ── */
const navItems = [
  { label: 'Collections', path: 'collections' },
  { label: 'About', path: 'about' },
  { label: 'Craftsmanship', path: 'craftsmanship' },
  { label: 'Journal', path: 'journal' },
  { label: 'Bespoke', path: 'bespoke' },
  { label: 'Contact', path: 'contact' },
]

export function MaisonLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const concept = params.concept as string
  const [menuOpen, setMenuOpen] = React.useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('.maison-scroll-reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [pathname])

  return (
    <div style={{ background: MS.bg, color: MS.text, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: `${MS.bg}f0`, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${MS.border}`,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={`/${concept}`} style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: MS.text, letterSpacing: '0.05em' }}>
              Vault <span style={{ color: MS.accent }}>Maison</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', gap: 28 }}>
            {navItems.map(item => {
              const href = `/${concept}/${item.path}`
              const active = pathname === href
              return (
                <Link key={item.path} href={href} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 500,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: active ? MS.accent : MS.textSecondary, textDecoration: 'none',
                  borderBottom: active ? `1px solid ${MS.accent}` : 'none', paddingBottom: 2,
                  transition: 'color 0.2s',
                }}>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href={`/${concept}/search`} style={{ color: MS.textSecondary }}><Search size={16} /></Link>
            <Link href={`/${concept}/wishlist`} style={{ color: MS.textSecondary }}><Heart size={16} /></Link>
            <Link href={`/${concept}/cart`} style={{ color: MS.textSecondary }}><ShoppingBag size={16} /></Link>
            <Link href={`/${concept}/account`} style={{ color: MS.textSecondary }}><User size={16} /></Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <AuthModal concept={getConcept('maison')!} />
      <ToastNotifications concept={getConcept('maison')!} />
      <main>{children}</main>

      {/* Footer */}
      <footer style={{ background: MS.text, color: `${MS.bg}cc`, padding: '56px 0 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 40 }}>
            <div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, color: MS.bg }}>
                Vault <span style={{ color: MS.accent }}>Maison</span>
              </span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', lineHeight: 1.7, marginTop: 12, color: `${MS.bg}99` }}>
                A modern maison where timeless craftsmanship meets contemporary elegance. Every piece tells a story of heritage and refinement.
              </p>
            </div>
            {[
              { title: 'Explore', links: [['Collections', 'collections'], ['Craftsmanship', 'craftsmanship'], ['Bespoke', 'bespoke'], ['Journal', 'journal']] },
              { title: 'Service', links: [['Shipping', 'shipping'], ['Care Guide', 'care'], ['FAQ', 'faq'], ['Contact', 'contact']] },
              { title: 'Legal', links: [['Privacy', 'privacy'], ['Grading', 'grading'], ['Account', 'account']] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: MS.accent, margin: '0 0 14px' }}>{col.title}</h4>
                {col.links.map(([label, path]) => (
                  <Link key={path} href={`/${concept}/${path}`} style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: `${MS.bg}88`, textDecoration: 'none', marginBottom: 8 }}>{label}</Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${MS.bg}15`, paddingTop: 20, textAlign: 'center' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: `${MS.bg}55` }}>
              &copy; 2024 Vault Maison. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
