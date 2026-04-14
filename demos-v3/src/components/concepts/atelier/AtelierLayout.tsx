'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Atelier Design Tokens ─── */
export const A = {
  bg:        '#F4F1EA',
  bgAlt:     '#EDE8DF',
  surface:   '#FEFCF8',
  workshop:  '#E8E2D8',
  border:    '#D4CCBE',
  text:      '#3A3228',
  textSoft:  '#7A7068',
  accent:    '#8B6914',
  gold:      '#C4A35A',
  sketch:    '#B8ADA0',
  paper:     '#FAF8F4',
  ink:       '#2C2620',
  shadow:    'rgba(60,50,40,0.06)',
  shadowMd:  'rgba(60,50,40,0.12)',
}

/* ─── Paper texture SVG data URI ─── */
const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`

/* ─── Scroll Reveal Hook ─── */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

/* ─── Animated Section Wrapper ─── */
export function RevealSection({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
      }}
    >
      {children}
    </div>
  )
}

/* ─── Stagger Grid Item ─── */
export function StaggerItem({ children, index = 0, style = {} }: {
  children: React.ReactNode; index?: number; style?: React.CSSProperties
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  return (
    <div
      ref={ref}
      style={{
        ...style,
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {children}
    </div>
  )
}

/* ─── Warm Gradient Divider ─── */
export function WarmDivider({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, transparent, ${A.border}, transparent)`,
      margin: '0 auto',
      maxWidth: 600,
      ...style,
    }} />
  )
}

/* ─── Section with alternating backgrounds ─── */
export function AtelierSection({ children, alt = false, dark = false, style = {} }: {
  children: React.ReactNode; alt?: boolean; dark?: boolean; style?: React.CSSProperties
}) {
  const bg = dark ? A.ink : alt ? A.bgAlt : A.bg
  return (
    <section style={{
      background: bg,
      backgroundImage: dark ? 'none' : PAPER_TEXTURE,
      position: 'relative',
      ...style,
    }}>
      {children}
    </section>
  )
}

/* ─── Header ─── */
function AtelierHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navLinks = [
    { label: 'Workshop', href: '/atelier/collections' },
    { label: 'Craft', href: '/atelier/craftsmanship' },
    { label: 'Journal', href: '/atelier/journal' },
    { label: 'Commission', href: '/atelier/bespoke' },
    { label: 'About', href: '/atelier/about' },
    { label: 'Contact', href: '/atelier/contact' },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(244,241,234,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid ${A.border}` : '1px solid transparent',
          boxShadow: scrolled ? `0 2px 20px ${A.shadow}` : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link href="/atelier" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              border: `1.5px solid ${A.accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 600,
              color: A.accent,
              boxShadow: `0 0 0 3px rgba(139,105,20,0.08)`,
            }}>
              A
            </div>
            <div>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, letterSpacing: '0.02em', display: 'block', lineHeight: 1 }}>
                The Atelier
              </span>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 11, color: A.sketch, letterSpacing: '0.05em' }}>
                est. 1987
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="atelier-desktop-nav">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="atelier-nav-link"
                style={{
                  textDecoration: 'none',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: pathname === l.href ? A.accent : A.textSoft,
                  transition: 'color 0.3s',
                  position: 'relative',
                }}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ width: 1, height: 20, background: A.border, margin: '0 4px' }} />
            <Link href="/atelier/search" className="atelier-icon-link" style={{ color: A.textSoft, transition: 'color 0.3s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </Link>
            <Link href="/atelier/wishlist" className="atelier-icon-link" style={{ color: A.textSoft, transition: 'color 0.3s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </Link>
            <Link href="/atelier/cart" className="atelier-icon-link" style={{ color: A.textSoft, transition: 'color 0.3s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="atelier-mobile-menu-btn"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: A.ink }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen
                ? <path d="M18 6L6 18M6 6l12 12"/>
                : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>
              }
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, bottom: 0, zIndex: 99,
              background: A.bg, backgroundImage: PAPER_TEXTURE, padding: '32px',
            }}
          >
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '16px 0',
                  fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 400,
                  color: A.ink, textDecoration: 'none',
                  borderBottom: `1px dashed ${A.sketch}`,
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Caveat:wght@400;500;600&display=swap');

        .atelier-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 1px;
          background: ${A.accent};
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .atelier-nav-link:hover::after {
          width: 100%;
        }
        .atelier-nav-link:hover {
          color: ${A.accent} !important;
        }
        .atelier-icon-link:hover {
          color: ${A.accent} !important;
        }

        /* Sketch border utility */
        .sketch-border {
          border: 1px dashed ${A.sketch};
          border-radius: 2px;
        }

        /* Card hover lift */
        .atelier-lift {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .atelier-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px ${A.shadow}, 0 4px 12px ${A.shadow};
        }

        @media (max-width: 768px) {
          .atelier-desktop-nav { display: none !important; }
          .atelier-mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

/* ─── Footer ─── */
function AtelierFooter() {
  return (
    <footer style={{ background: A.ink, color: A.workshop, padding: '80px 32px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top decorative line */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${A.gold}40, transparent)`, marginBottom: 60 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 500, color: A.gold, marginBottom: 8 }}>
              The Atelier
            </div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: `${A.gold}80`, marginBottom: 16 }}>
              Handcrafted since 1987
            </div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, lineHeight: 1.8, color: 'rgba(232,226,216,0.6)', maxWidth: 280 }}>
              Where every piece begins as a conversation and ends as a legacy. Our Hatton Garden workshop is a place where extraordinary jewelry is born from extraordinary hands.
            </p>
          </div>

          {/* Workshop */}
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.gold, marginBottom: 20 }}>
              The Workshop
            </div>
            {[
              { label: 'All Pieces', href: '/atelier/collections' },
              { label: 'Craftsmanship', href: '/atelier/craftsmanship' },
              { label: 'Commission', href: '/atelier/bespoke' },
              { label: 'Diamond Grading', href: '/atelier/grading' },
              { label: 'Care Guide', href: '/atelier/care' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="atelier-nav-link" style={{
                display: 'block', marginBottom: 12,
                fontFamily: 'Source Serif 4, serif', fontSize: 14, color: 'rgba(232,226,216,0.6)',
                textDecoration: 'none', transition: 'color 0.3s', position: 'relative',
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Maison */}
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.gold, marginBottom: 20 }}>
              Our Maison
            </div>
            {[
              { label: 'Our Story', href: '/atelier/about' },
              { label: 'Journal', href: '/atelier/journal' },
              { label: 'Contact', href: '/atelier/contact' },
              { label: 'FAQ', href: '/atelier/faq' },
              { label: 'Shipping', href: '/atelier/shipping' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="atelier-nav-link" style={{
                display: 'block', marginBottom: 12,
                fontFamily: 'Source Serif 4, serif', fontSize: 14, color: 'rgba(232,226,216,0.6)',
                textDecoration: 'none', transition: 'color 0.3s', position: 'relative',
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Visit */}
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.gold, marginBottom: 20 }}>
              Visit the Workshop
            </div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, lineHeight: 1.8, color: 'rgba(232,226,216,0.6)' }}>
              42 Hatton Garden<br />London EC1N 8EB<br /><br />
              Mon – Fri: 9am – 6pm<br />
              Saturday: 10am – 4pm<br />
              Sunday: By appointment
            </p>
            <div style={{ marginTop: 16, fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(232,226,216,0.5)' }}>
              atelier@vaultmaison.com<br />
              +44 (0)20 7242 1987
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: `1px solid rgba(232,226,216,0.1)`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(232,226,216,0.35)' }}>
            © 2024 Vault Maison — The Atelier. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Privacy', href: '/atelier/privacy' },
              { label: 'Shipping', href: '/atelier/shipping' },
              { label: 'FAQ', href: '/atelier/faq' },
              { label: 'Terms', href: '/atelier/terms' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(232,226,216,0.35)',
                textDecoration: 'none', transition: 'color 0.3s',
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Layout Wrapper ─── */
export function AtelierLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: A.bg,
      backgroundImage: PAPER_TEXTURE,
      color: A.text,
      minHeight: '100vh',
      fontFamily: 'Source Serif 4, serif',
    }}>
      <AtelierHeader />
      <main style={{ paddingTop: 72 }}>
        {children}
      </main>
      <AtelierFooter />
    </div>
  )
}
