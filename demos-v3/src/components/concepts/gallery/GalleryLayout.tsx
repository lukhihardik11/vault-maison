'use client'

import { type ReactNode, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingBag, User, X, Menu } from 'lucide-react'
import { useCartStore } from '@/store/cart'

// ═══════════════════════════════════════════════════════════
// THE GALLERY — Design Tokens
// ═══════════════════════════════════════════════════════════
export const G = {
  bg: '#FDFBF7',
  surface: '#FFFFFF',
  border: '#E8E4DE',
  text: '#1A1816',
  textSecondary: '#8C8680',
  accent: '#8B7355',
  accentHover: '#A08968',
  caption: '#6B6560',
  dark: '#1A1816',
  cream: '#FDFBF7',
} as const

// ═══════════════════════════════════════════════════════════
// GALLERY HEADER — Museum-style minimal navigation
// ═══════════════════════════════════════════════════════════
function GalleryHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = useCartStore((s) => s.items.length)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const navLinks = [
    { label: 'Exhibition', href: '/gallery/collections' },
    { label: 'Rooms', href: '/gallery/category/diamond-rings' },
    { label: 'Journal', href: '/gallery/journal' },
    { label: 'Commission', href: '/gallery/bespoke' },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '14px 0' : '24px 0',
          background: scrolled ? 'rgba(253,251,247,0.97)' : 'rgba(253,251,247,0.6)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
          borderBottom: scrolled ? `1px solid ${G.border}` : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link
            href="/gallery"
            style={{
              fontFamily: "'Libre Baskerville', 'Playfair Display', serif",
              fontSize: scrolled ? '0.95rem' : '1.1rem',
              fontWeight: 400,
              letterSpacing: '0.25em',
              color: G.text,
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'font-size 0.4s ease',
            }}
          >
            Vault Maison
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="gallery-nav-link"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: G.textSecondary,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G.accent }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = G.textSecondary }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/gallery/search" style={{ color: G.textSecondary, transition: 'color 0.3s' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G.accent }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = G.textSecondary }}>
              <Search size={17} strokeWidth={1.5} />
            </Link>
            <Link href="/gallery/wishlist" style={{ color: G.textSecondary, transition: 'color 0.3s' }} className="hidden md:block"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G.accent }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = G.textSecondary }}>
              <Heart size={17} strokeWidth={1.5} />
            </Link>
            <Link href="/gallery/account" style={{ color: G.textSecondary, transition: 'color 0.3s' }} className="hidden md:block"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G.accent }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = G.textSecondary }}>
              <User size={17} strokeWidth={1.5} />
            </Link>
            <Link href="/gallery/cart" style={{ color: G.textSecondary, transition: 'color 0.3s', position: 'relative' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G.accent }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = G.textSecondary }}>
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -8, width: 15, height: 15, borderRadius: '50%',
                  background: G.accent, color: '#fff', fontSize: '0.55rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', color: G.text, cursor: 'pointer', padding: 4 }}>
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden" style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(253,251,247,0.98)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
        }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', letterSpacing: '0.15em',
                color: G.text, textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G.accent }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = G.text }}>
              {link.label}
            </Link>
          ))}
          <div style={{ width: 40, height: 1, background: G.border, margin: '8px 0' }} />
          <Link href="/gallery/account" onClick={() => setMobileOpen(false)}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em', color: G.textSecondary, textDecoration: 'none' }}>
            Account
          </Link>
          <Link href="/gallery/wishlist" onClick={() => setMobileOpen(false)}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em', color: G.textSecondary, textDecoration: 'none' }}>
            Wishlist
          </Link>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// GALLERY FOOTER — Minimal museum-style
// ═══════════════════════════════════════════════════════════
function GalleryFooter() {
  const footerLinks = [
    { label: 'Privacy', href: '/gallery/privacy' },
    { label: 'Shipping', href: '/gallery/shipping' },
    { label: 'FAQ', href: '/gallery/faq' },
    { label: 'Contact', href: '/gallery/contact' },
    { label: 'Care', href: '/gallery/care' },
  ]

  return (
    <footer style={{ background: G.bg, borderTop: `1px solid ${G.border}` }}>
      {/* CTA section */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: G.accent, marginBottom: 16 }}>
          Begin Your Journey
        </p>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: G.text, margin: '0 0 16px', lineHeight: 1.3 }}>
          Every piece deserves its own wall.
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, maxWidth: 420, margin: '0 auto 32px', lineHeight: 1.7 }}>
          Schedule a private viewing to discover pieces crafted for those who appreciate the extraordinary.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gallery/collections" style={{
            display: 'inline-flex', padding: '14px 36px', background: G.accent, color: '#fff',
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', textDecoration: 'none', borderRadius: 0, transition: 'background 0.3s',
          }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = G.accentHover }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = G.accent }}>
            View Exhibition
          </Link>
          <Link href="/gallery/bespoke" style={{
            display: 'inline-flex', padding: '14px 36px', background: 'transparent',
            border: `1px solid ${G.border}`, color: G.text,
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', textDecoration: 'none', borderRadius: 0, transition: 'all 0.3s',
          }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = G.accent; (e.target as HTMLElement).style.color = G.accent }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = G.border; (e.target as HTMLElement).style.color = G.text }}>
            Private Viewing
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ height: 1, background: G.border }} />
      </div>

      {/* Bottom */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 48px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: G.caption }}>
          Open Daily. Worldwide Delivery. &copy; {new Date().getFullYear()} Vault Maison
        </div>
        <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="gallery-nav-link"
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: G.caption, textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G.accent }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = G.caption }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════
// GALLERY LAYOUT WRAPPER
// ═══════════════════════════════════════════════════════════
interface GalleryLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function GalleryLayout({ children, hideNav = false, hideFooter = false }: GalleryLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: G.bg, color: G.text, fontFamily: 'Inter, sans-serif' }}>
      {!hideNav && <GalleryHeader />}
      <main>{children}</main>
      {!hideFooter && <GalleryFooter />}

      <style>{`
        .gallery-nav-link {
          position: relative;
        }
        .gallery-nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          width: 0;
          height: 1px;
          background: ${G.accent};
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-nav-link:hover::after {
          width: 100%;
          left: 0;
        }
        ::selection {
          background: rgba(139, 115, 85, 0.2);
          color: inherit;
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 1px rgba(139, 115, 85, 0.3), 0 0 12px rgba(139, 115, 85, 0.06);
          border-color: rgba(139, 115, 85, 0.5) !important;
        }
      `}</style>
    </div>
  )
}
