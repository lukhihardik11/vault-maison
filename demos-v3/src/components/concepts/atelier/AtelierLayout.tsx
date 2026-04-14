'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Atelier Design Tokens ─── */
export const A = {
  bg:        '#F4F1EA',
  surface:   '#FEFCF8',
  workshop:  '#E8E2D8',
  border:    '#D4CCBE',
  text:      '#3A3228',
  textSoft:  '#7A7068',
  accent:    '#8B6914',   // antique brass (overriding garnet for craft warmth)
  gold:      '#C4A35A',
  sketch:    '#B8ADA0',
  paper:     '#FAF8F4',
  ink:       '#2C2620',
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
          background: scrolled ? 'rgba(244,241,234,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${A.border}` : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link href="/atelier" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: `1.5px solid ${A.accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 600,
              color: A.accent,
            }}>
              A
            </div>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, letterSpacing: '0.02em' }}>
              The Atelier
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="atelier-desktop-nav">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="atelier-nav-link"
                style={{
                  textDecoration: 'none',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: pathname === l.href ? A.accent : A.textSoft,
                  transition: 'color 0.3s',
                  position: 'relative',
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/atelier/search" style={{ color: A.textSoft, transition: 'color 0.3s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </Link>
            <Link href="/atelier/cart" style={{ color: A.textSoft, transition: 'color 0.3s' }}>
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
              background: A.bg, padding: '32px',
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
                  borderBottom: `1px solid ${A.border}`,
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 500, color: A.gold, marginBottom: 16 }}>
              The Atelier
            </div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(232,226,216,0.7)', maxWidth: 280 }}>
              Where every piece begins as a conversation and ends as a legacy. Handcrafted in our workshop since 1987.
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

          {/* Visit */}
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.gold, marginBottom: 20 }}>
              Visit the Workshop
            </div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(232,226,216,0.6)' }}>
              42 Hatton Garden<br />London EC1N 8EB<br /><br />
              Mon – Sat: 10am – 6pm<br />
              By appointment preferred
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: `1px solid rgba(232,226,216,0.15)`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(232,226,216,0.4)' }}>
            © 2024 Vault Maison — The Atelier
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Shipping', 'FAQ'].map(l => (
              <Link key={l} href={`/atelier/${l.toLowerCase()}`} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(232,226,216,0.4)',
                textDecoration: 'none', transition: 'color 0.3s',
              }}>
                {l}
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
    <div style={{ background: A.bg, color: A.text, minHeight: '100vh', fontFamily: 'Source Serif 4, serif' }}>
      <AtelierHeader />
      <main style={{ paddingTop: 72 }}>
        {children}
      </main>
      <AtelierFooter />
    </div>
  )
}
