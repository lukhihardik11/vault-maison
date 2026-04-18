'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Heart, ShoppingBag, User, BookOpen, Shield, ChevronDown } from 'lucide-react'

// ═══ ARCHIVE DESIGN TOKENS ═══
export const AR = {
  bg:           '#1E1614',   // deep mahogany dark
  surface:      '#2A2220',   // dark leather panel
  card:         '#332A27',   // warm dark surface
  border:       '#4A3F3B',   // worn leather edge
  borderLight:  '#5C524D',   // lighter border
  text:         '#E8DDD4',   // aged parchment white
  textSecondary:'#9A8E86',   // worn catalog text
  accent:       '#C19A49',   // antique gold
  accentSoft:   'rgba(193, 154, 73, 0.12)',
  accentHover:  '#D4AD5C',
  docBg:        '#F5EDE2',   // cream for document cards
  docText:      '#3A3228',   // ink on documents
  docBorder:    '#D4CCBE',   // document card border
  stamp:        '#8B2E2E',   // deep red authentication
  stampLight:   '#A84040',
  shadow:       'rgba(0, 0, 0, 0.3)',
  shadowDeep:   'rgba(0, 0, 0, 0.5)',
}

// Leather texture SVG
const LEATHER_TEXTURE = `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

// ═══ SCROLL REVEAL (SSR-safe, uses globals.css classes) ═══
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
    <div ref={ref} className={`archive-scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
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
    <div ref={ref} className={`archive-scroll-reveal archive-stagger-${Math.min(index, 6)} ${isVisible ? 'is-visible' : ''}`}
      style={style}>
      {children}
    </div>
  )
}

// ═══ DECORATIVE COMPONENTS ═══
export function GoldRule({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${AR.accent}, transparent)`, margin: '0 auto', maxWidth: 400, ...style }} />
  )
}

export function ArchiveSection({ children, alt = false, dark = false, style = {} }: {
  children: React.ReactNode; alt?: boolean; dark?: boolean; style?: React.CSSProperties
}) {
  const bg = dark ? '#151110' : alt ? AR.surface : AR.bg
  return (
    <section style={{ background: bg, backgroundImage: LEATHER_TEXTURE, padding: '72px 32px', ...style }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

// Catalog number badge
export function CatalogNumber({ number, style = {} }: { number: string; style?: React.CSSProperties }) {
  return (
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.08em',
      color: AR.accent, background: AR.accentSoft, padding: '3px 10px',
      border: `1px solid ${AR.accent}33`, display: 'inline-block', ...style
    }}>
      {number}
    </span>
  )
}

// ═══ HEADER ═══
function ArchiveHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navLinks = [
    { label: 'Catalog', href: '/archive/collections' },
    { label: 'Rings', href: '/archive/category/diamond-rings' },
    { label: 'Necklaces', href: '/archive/category/gold-necklaces' },
    { label: 'Earrings', href: '/archive/category/diamond-earrings' },
    { label: 'Bracelets', href: '/archive/category/diamond-bracelets' },
    { label: 'Provenance', href: '/archive/craftsmanship' },
    { label: "Scholar's Notes", href: '/archive/journal' },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(30, 22, 20, 0.97)' : 'rgba(30, 22, 20, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? AR.accent + '33' : AR.border}`,
      transition: 'all 0.4s ease',
    }}>
      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent 10%, ${AR.accent} 50%, transparent 90%)` }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Mobile menu */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: AR.text, cursor: 'pointer', padding: 4 }}
          className="archive-mobile-menu-btn">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link href="/archive" style={{ textDecoration: 'none', color: AR.text }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 500, margin: 0, letterSpacing: '0.06em', color: AR.accent }}>
              VAULT MAISON
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.textSecondary, margin: '3px 0 0' }}>
              THE ARCHIVE &middot; EST. MMXXIV
            </p>
          </div>
        </Link>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {[
            { icon: <Search size={18} />, href: '/archive/search' },
            { icon: <BookOpen size={18} />, href: '/archive/journal' },
            { icon: <Heart size={18} />, href: '/archive/wishlist' },
            { icon: <ShoppingBag size={18} />, href: '/archive/cart' },
            { icon: <User size={18} />, href: '/archive/account' },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{ color: AR.textSecondary, transition: 'color 0.3s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = AR.accent }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = AR.textSecondary }}>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        maxWidth: 1320, margin: '0 auto', padding: '0 32px 12px',
        display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap',
      }} className="archive-desktop-nav">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href} style={{
              textDecoration: 'none',
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', fontWeight: 400,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: isActive ? AR.accent : AR.textSecondary,
              borderBottom: isActive ? `1px solid ${AR.accent}` : '1px solid transparent',
              paddingBottom: 4,
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = AR.accent }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = AR.textSecondary }}>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={{ background: AR.bg, borderTop: `1px solid ${AR.border}`, padding: '16px 32px' }} className="archive-mobile-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '10px 0', textDecoration: 'none',
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: pathname === link.href ? AR.accent : AR.textSecondary,
              borderBottom: `1px solid ${AR.border}`,
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

// ═══ FOOTER ═══
function ArchiveFooter() {
  const footerSections = [
    { title: 'The Archive', links: [
      { label: 'Full Catalog', href: '/archive/collections' },
      { label: 'New Acquisitions', href: '/archive/collections' },
      { label: 'Authentication', href: '/archive/craftsmanship' },
      { label: 'Provenance Records', href: '/archive/craftsmanship' },
    ]},
    { title: 'Reference Desk', links: [
      { label: "Scholar's Notes", href: '/archive/journal' },
      { label: 'Grading Standards', href: '/archive/grading' },
      { label: 'Care & Preservation', href: '/archive/care' },
      { label: 'FAQ', href: '/archive/faq' },
    ]},
    { title: 'Institutional', links: [
      { label: 'About the Archive', href: '/archive/about' },
      { label: 'Contact', href: '/archive/contact' },
      { label: 'Shipping & Handling', href: '/archive/shipping' },
      { label: 'Privacy Policy', href: '/archive/privacy' },
    ]},
  ]

  return (
    <footer style={{
      background: '#151110', backgroundImage: LEATHER_TEXTURE,
      borderTop: `1px solid ${AR.accent}33`,
      padding: '64px 32px 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Gold rule */}
        <GoldRule style={{ marginBottom: 48 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {footerSections.map((section) => (
            <div key={section.title}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 20 }}>
                {section.title}
              </p>
              {section.links.map((link) => (
                <Link key={link.label} href={link.href} style={{
                  display: 'block', textDecoration: 'none', color: AR.textSecondary,
                  fontFamily: "'Crimson Text', 'Georgia', serif", fontSize: '0.9rem',
                  padding: '5px 0', transition: 'color 0.3s',
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = AR.accent }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = AR.textSecondary }}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Archive seal */}
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              border: `2px solid ${AR.accent}`, margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: AR.accentSoft,
            }}>
              <Shield size={28} color={AR.accent} />
            </div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: AR.accent, textTransform: 'uppercase' }}>
              Authenticated &middot; Cataloged
            </p>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.8rem', color: AR.textSecondary, marginTop: 8, fontStyle: 'italic' }}>
              Every piece verified, every provenance traced
            </p>
          </div>
        </div>

        <GoldRule style={{ marginBottom: 24 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary }}>
            &copy; {new Date().getFullYear()} VAULT MAISON &middot; THE ARCHIVE
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary }}>
            CATALOG REF: VM-ARCHIVE-{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

// ═══ MAIN LAYOUT ═══
export function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: AR.bg, backgroundImage: LEATHER_TEXTURE,
      color: AR.text, minHeight: '100vh',
      fontFamily: "'Crimson Text', 'Georgia', serif",
    }}>
      <ArchiveHeader />
      <main>{children}</main>
      <ArchiveFooter />
    </div>
  )
}
