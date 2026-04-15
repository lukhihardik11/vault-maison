'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, ShoppingBag, Search, Bell } from 'lucide-react'

/* ═══ DESIGN TOKENS ═══ */
export const MK = {
  bg:           '#0D1117',
  bgAlt:        '#161B22',
  surface:      '#1C2128',
  card:         '#21262D',
  border:       '#30363D',
  borderAccent: '#2D6A4F',
  text:         '#F0F6FC',
  textSecondary:'#8B949E',
  accent:       '#2D6A4F',    // Deep emerald
  accentLight:  '#40916C',
  amber:        '#D4A843',    // Auction gold/amber
  amberLight:   '#E8C86A',
  urgent:       '#DA3633',    // Urgency red
  success:      '#3FB950',
  glow:         'rgba(45,106,79,0.08)',
} as const

const NAV_ITEMS = [
  { label: 'Lots', href: '/marketplace/collections' },
  { label: 'Auctions', href: '/marketplace/craftsmanship' },
  { label: 'Journal', href: '/marketplace/journal' },
  { label: 'Consign', href: '/marketplace/bespoke' },
  { label: 'About', href: '/marketplace/about' },
  { label: 'Contact', href: '/marketplace/contact' },
]

/* ═══ HEADER ═══ */
function MarketplaceHeader() {
  const [open, setOpen] = React.useState(false)
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: `${MK.bg}f5`, backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${MK.border}`,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/marketplace" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, background: MK.accent, transform: 'rotate(45deg)' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: MK.text, letterSpacing: '0.02em' }}>
            VAULT MAISON
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.15em', color: MK.accent, textTransform: 'uppercase', background: `${MK.accent}15`, padding: '2px 8px', borderRadius: 2 }}>
            MARKETPLACE
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 24 }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 500,
              color: MK.textSecondary, textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = MK.text)}
            onMouseLeave={e => (e.currentTarget.style.color = MK.textSecondary)}
            >{item.label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Link href="/marketplace/search" style={{ color: MK.textSecondary }}><Search size={17} /></Link>
          <Link href="/marketplace/wishlist" style={{ color: MK.textSecondary }}><Heart size={17} /></Link>
          <Link href="/marketplace/cart" style={{ color: MK.textSecondary, position: 'relative' }}>
            <ShoppingBag size={17} />
          </Link>
        </div>
      </div>
    </header>
  )
}

/* ═══ FOOTER ═══ */
function MarketplaceFooter() {
  return (
    <footer style={{ background: MK.bg, borderTop: `1px solid ${MK.border}`, padding: '56px 0 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 40 }}>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text, marginBottom: 12 }}>Marketplace</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, lineHeight: 1.6 }}>
              The premier destination for rare and exceptional jewelry. Authenticated, verified, and ready for acquisition.
            </p>
          </div>
          {[
            { title: 'Browse', links: ['Current Lots', 'New Arrivals', 'Consignment', 'Grading'] },
            { title: 'Support', links: ['Contact', 'Shipping', 'Care Guide', 'FAQ'] },
            { title: 'Company', links: ['About', 'Journal', 'Privacy', 'Terms'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: MK.accent, marginBottom: 12 }}>{col.title}</h4>
              {col.links.map(link => (
                <Link key={link} href={`/marketplace/${link.toLowerCase().replace(/\s+/g, '-')}`} style={{
                  display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
                  color: MK.textSecondary, textDecoration: 'none', marginBottom: 6,
                }}>{link}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${MK.border}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MK.textSecondary }}>
            &copy; 2024 Vault Maison — Marketplace of Rarity
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: MK.accent, textTransform: 'uppercase' }}>
            RARITY AUTHENTICATED
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ═══ MAIN LAYOUT ═══ */
export function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: MK.bg, color: MK.text, minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <MarketplaceHeader />
      <main>{children}</main>
      <MarketplaceFooter />
    </div>
  )
}

/* ═══ SHARED SECTION COMPONENTS ═══ */
export function MarketplaceSection({ children, alt, style, ...props }: { children: React.ReactNode; alt?: boolean; style?: React.CSSProperties }) {
  return (
    <section style={{ background: alt ? MK.bgAlt : MK.bg, padding: '72px 0', ...style }} {...props}>
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
  return <div ref={ref} className="marketplace-scroll-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
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
  return <div ref={ref} className={`marketplace-scroll-reveal marketplace-stagger-${Math.min(index, 6)}`}>{children}</div>
}

/* ═══ DECORATIVE ELEMENTS ═══ */
export function LotDivider({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${MK.border})` }} />
      <div style={{ width: 6, height: 6, background: MK.accent, transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${MK.border})` }} />
    </div>
  )
}

export function SectionLabel({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}>
      <div style={{ width: 16, height: 2, background: MK.accent }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: MK.accent }}>
        {label}
      </span>
    </div>
  )
}

export function UrgencyBadge({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: MK.urgent, background: `${MK.urgent}15`, padding: '3px 8px', borderRadius: 2,
      ...style,
    }}>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: MK.urgent, animation: 'marketplace-pulse 2s infinite' }} />
      {text}
    </span>
  )
}
