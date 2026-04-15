'use client'
import { AuthModal } from '@/components/shared/auth-modal'
import { ToastNotifications } from '@/components/shared/toast-notifications'
import { getConcept } from '@/data/concepts'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, ShoppingBag, Search } from 'lucide-react'

/* ═══ DESIGN TOKENS ═══ */
export const TH = {
  bg:           '#0C0A0D',
  bgAlt:        '#140F16',
  surface:      '#1A141D',
  card:         '#1E1720',
  border:       '#2E2433',
  borderGold:   '#8B6914',
  text:         '#F5F0E8',
  textSecondary:'#9B8FA0',
  accent:       '#C8102E',    // Crimson red
  gold:         '#D4A843',    // Theater gold
  goldLight:    '#E8C86A',
  warm:         '#F5E6D0',
  glow:         'rgba(200,16,46,0.08)',
  success:      '#4CAF50',
  warning:      '#FF9800',
} as const

const NAV_ITEMS = [
  { label: 'Collections', href: '/theater/collections' },
  { label: 'Craftsmanship', href: '/theater/craftsmanship' },
  { label: 'Journal', href: '/theater/journal' },
  { label: 'Bespoke', href: '/theater/bespoke' },
  { label: 'About', href: '/theater/about' },
  { label: 'Contact', href: '/theater/contact' },
]

/* ═══ HEADER ═══ */
function TheaterHeader() {
  const [open, setOpen] = React.useState(false)
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: `linear-gradient(${TH.bg}f0, ${TH.bg}cc)`,
      backdropFilter: 'blur(16px)', borderBottom: `1px solid ${TH.border}`,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/theater" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: TH.accent, boxShadow: `0 0 12px ${TH.accent}60` }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 600, color: TH.text, letterSpacing: '0.05em' }}>
            VAULT MAISON
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: TH.gold, marginLeft: 4 }}>
            THEATER
          </span>
        </Link>

        <nav className="theater-desktop-nav" style={{ display: 'flex', gap: 28 }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: TH.textSecondary, textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = TH.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = TH.textSecondary)}
            >{item.label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/theater/search" style={{ color: TH.textSecondary }}><Search size={18} /></Link>
          <Link href="/theater/wishlist" style={{ color: TH.textSecondary }}><Heart size={18} /></Link>
          <Link href="/theater/cart" style={{ color: TH.textSecondary }}><ShoppingBag size={18} /></Link>
          <button className="theater-mobile-menu-btn" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: TH.text, cursor: 'pointer' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: TH.bg, borderTop: `1px solid ${TH.border}`, padding: '24px 32px' }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0', fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1rem', color: TH.text, textDecoration: 'none', borderBottom: `1px solid ${TH.border}`,
            }}>{item.label}</Link>
          ))}
        </div>
      )}
    </header>
  )
}

/* ═══ FOOTER ═══ */
function TheaterFooter() {
  return (
    <footer style={{ background: TH.bg, borderTop: `1px solid ${TH.border}`, padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 48 }}>
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: TH.text, marginBottom: 16 }}>The Theater</h4>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, lineHeight: 1.7 }}>
              Where every jewel tells a story. Experience luxury as a performance — dramatic, emotional, unforgettable.
            </p>
          </div>
          {[
            { title: 'Explore', links: ['Collections', 'New Arrivals', 'Bespoke', 'Grading'] },
            { title: 'Service', links: ['Contact', 'Shipping', 'Care Guide', 'FAQ'] },
            { title: 'Company', links: ['About', 'Journal', 'Privacy', 'Terms'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TH.gold, marginBottom: 16 }}>{col.title}</h4>
              {col.links.map(link => (
                <Link key={link} href={`/theater/${link.toLowerCase().replace(/\s+/g, '-')}`} style={{
                  display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem',
                  color: TH.textSecondary, textDecoration: 'none', marginBottom: 8,
                }}>{link}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${TH.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: TH.textSecondary }}>
            &copy; 2024 Vault Maison — The Immersive Theater
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: TH.gold }}>
            ACT WITH INTENTION
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ═══ MAIN LAYOUT ═══ */
export function TheaterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: TH.bg, color: TH.text, minHeight: '100vh',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    }}>
      <TheaterHeader />
      <AuthModal concept={getConcept('theater')!} />
      <ToastNotifications concept={getConcept('theater')!} />
      <main>{children}</main>
      <TheaterFooter />
    </div>
  )
}

/* ═══ SHARED SECTION COMPONENTS ═══ */
export function TheaterSection({ children, alt, style, ...props }: { children: React.ReactNode; alt?: boolean; style?: React.CSSProperties }) {
  return (
    <section style={{ background: alt ? TH.bgAlt : TH.bg, padding: '80px 0', ...style }} {...props}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>{children}</div>
    </section>
  )
}

export function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); observer.unobserve(el) }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className="theater-scroll-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export function StaggerItem({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); observer.unobserve(el) }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`theater-scroll-reveal theater-stagger-${Math.min(index, 6)}`}>{children}</div>
}

/* ═══ DECORATIVE ELEMENTS ═══ */
export function GoldRule({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${TH.gold}40)` }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: TH.accent, boxShadow: `0 0 8px ${TH.accent}40` }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${TH.gold}40)` }} />
    </div>
  )
}

export function ActLabel({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <div style={{ width: 24, height: 1, background: TH.accent }} />
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: TH.gold }}>
        {label}
      </span>
      <div style={{ width: 24, height: 1, background: TH.accent }} />
    </div>
  )
}

export function Curtain({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ height: 4, background: `linear-gradient(90deg, transparent, ${TH.accent}, ${TH.gold}, ${TH.accent}, transparent)`, ...style }} />
  )
}
