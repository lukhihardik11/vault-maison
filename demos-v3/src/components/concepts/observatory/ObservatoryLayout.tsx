'use client'
import { AuthModal } from '@/components/shared/auth-modal'
import { ToastNotifications } from '@/components/shared/toast-notifications'
import { getConcept } from '@/data/concepts'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Heart, ShoppingBag, User, Activity, Crosshair, ChevronDown } from 'lucide-react'

/* ═══ OBSERVATORY DESIGN TOKENS ═══ */
export const OB = {
  bg:           '#0A0E1A',   // deep space navy
  bgAlt:        '#0F1424',   // slightly lighter navy
  surface:      '#151B2E',   // panel surface
  card:         '#1A2138',   // card background
  border:       '#2A3352',   // subtle border
  borderLight:  '#3A4568',   // lighter border
  text:         '#E8ECF4',   // cool white
  textSecondary:'#8892A8',   // muted blue-gray
  accent:       '#00D4FF',   // electric cyan
  accentSoft:   'rgba(0, 212, 255, 0.1)',
  accentHover:  '#33DDFF',
  accentDim:    'rgba(0, 212, 255, 0.5)',
  grid:         'rgba(0, 212, 255, 0.04)',
  glow:         'rgba(0, 212, 255, 0.15)',
  warning:      '#FF6B35',   // warm amber for data
  success:      '#00E676',   // green for verified
  shadow:       'rgba(0, 0, 0, 0.4)',
  shadowDeep:   'rgba(0, 0, 0, 0.6)',
}

/* Grid background SVG */
const GRID_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0v60' fill='none' stroke='rgba(0,212,255,0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`

/* ═══ SCROLL REVEAL (SSR-safe, uses globals.css classes) ═══ */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

export function RevealSection({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`observatory-scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

export function StaggerItem({ children, index = 0, style = {} }: {
  children: React.ReactNode; index?: number; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`observatory-scroll-reveal observatory-stagger-${Math.min(index, 6)} ${isVisible ? 'is-visible' : ''}`}
      style={style}>
      {children}
    </div>
  )
}

/* ═══ DECORATIVE COMPONENTS ═══ */
export function CyanRule({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${OB.accent}, transparent)`, margin: '0 auto', maxWidth: 400, ...style }} />
  )
}

export function ScanLine({ label, style = {} }: { label?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${OB.accent}, transparent)` }} />
      {label && (
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OB.accent }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${OB.accent})` }} />
    </div>
  )
}

export function DataLabel({ label, value, style = {} }: { label: string; value: string; style?: React.CSSProperties }) {
  return (
    <div style={{ ...style }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OB.textSecondary, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', color: OB.text, fontWeight: 500 }}>
        {value}
      </div>
    </div>
  )
}

/* ═══ SECTION WRAPPER ═══ */
export function ObservatorySection({ children, alt = false, style = {} }: {
  children: React.ReactNode; alt?: boolean; style?: React.CSSProperties
}) {
  return (
    <section style={{
      background: alt ? OB.bgAlt : OB.bg,
      backgroundImage: GRID_BG,
      padding: '80px 0',
      position: 'relative',
      ...style,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {children}
      </div>
    </section>
  )
}

/* ═══ NAVIGATION ═══ */
const navLinks = [
  { label: 'Collections', href: '/observatory/collections' },
  { label: 'Analysis', href: '/observatory/grading' },
  { label: 'Craftsmanship', href: '/observatory/craftsmanship' },
  { label: 'Journal', href: '/observatory/journal' },
  { label: 'About', href: '/observatory/about' },
  { label: 'Contact', href: '/observatory/contact' },
]

function ObservatoryNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10, 14, 26, 0.95)' : 'rgba(10, 14, 26, 0.7)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? OB.border : 'transparent'}`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/observatory" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Crosshair size={18} color={OB.accent} strokeWidth={1.5} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.text }}>
            Observatory
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="observatory-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', textDecoration: 'none',
              color: pathname === link.href ? OB.accent : OB.textSecondary,
              transition: 'color 0.2s',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/observatory/search" style={{ color: OB.textSecondary }}><Search size={16} /></Link>
          <Link href="/observatory/wishlist" style={{ color: OB.textSecondary }}><Heart size={16} /></Link>
          <Link href="/observatory/cart" style={{ color: OB.textSecondary }}><ShoppingBag size={16} /></Link>
          <Link href="/observatory/account" style={{ color: OB.textSecondary }}><User size={16} /></Link>
          <button className="observatory-mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: OB.text, cursor: 'pointer' }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: OB.bg, borderTop: `1px solid ${OB.border}`, padding: '16px 32px' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '12px 0', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: OB.textSecondary, borderBottom: `1px solid ${OB.border}` }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ═══ FOOTER ═══ */
function ObservatoryFooter() {
  const footerSections = [
    { title: 'Explore', links: [
      { label: 'Collections', href: '/observatory/collections' },
      { label: 'New Arrivals', href: '/observatory/collections' },
      { label: 'Bestsellers', href: '/observatory/collections' },
      { label: 'Bespoke', href: '/observatory/bespoke' },
    ]},
    { title: 'Knowledge', links: [
      { label: 'Gem Analysis', href: '/observatory/grading' },
      { label: 'Craftsmanship', href: '/observatory/craftsmanship' },
      { label: 'Journal', href: '/observatory/journal' },
      { label: 'Care Guide', href: '/observatory/care' },
    ]},
    { title: 'Support', links: [
      { label: 'Contact', href: '/observatory/contact' },
      { label: 'Shipping', href: '/observatory/shipping' },
      { label: 'FAQ', href: '/observatory/faq' },
      { label: 'Privacy', href: '/observatory/privacy' },
    ]},
  ]

  return (
    <footer style={{ background: OB.bg, borderTop: `1px solid ${OB.border}`, padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Crosshair size={16} color={OB.accent} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.text }}>
                Observatory
              </span>
            </div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, lineHeight: 1.7 }}>
              Precision gemological analysis meets curated luxury. Every stone examined, every facet measured, every piece certified.
            </p>
          </div>
          {footerSections.map(section => (
            <div key={section.title}>
              <h4 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OB.accent, marginBottom: 16 }}>
                {section.title}
              </h4>
              {section.links.map(link => (
                <Link key={link.href} href={link.href} style={{ display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, textDecoration: 'none', padding: '6px 0', transition: 'color 0.2s' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <CyanRule />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>
            &copy; 2024 Vault Maison Observatory. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/observatory/privacy" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary, textDecoration: 'none' }}>Privacy</Link>
            <Link href="/observatory/shipping" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary, textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══ MAIN LAYOUT ═══ */
export function ObservatoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: OB.bg, color: OB.text }}>
      <ObservatoryNav />
      <AuthModal concept={getConcept('observatory')!} />
      <ToastNotifications concept={getConcept('observatory')!} />
      <main style={{ paddingTop: 64 }}>
        {children}
      </main>
      <ObservatoryFooter />
    </div>
  )
}
