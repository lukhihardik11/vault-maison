'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

export function MinimalNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.items.length)
  const wishlistCount = useWishlistStore((s) => s.items.length)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Collections', href: '/minimal/collections' },
    { label: 'Journal', href: '/minimal/journal' },
    { label: 'Bespoke', href: '/minimal/bespoke' },
    { label: 'About', href: '/minimal/about' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Scroll Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '1px', backgroundColor: '#C4A265', zIndex: 51, transition: 'width 100ms linear' }} />
      <nav
        style={{
          position: 'fixed',
          top: 1,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: scrolled ? 'rgba(250, 250, 248, 0.85)' : 'rgba(250, 250, 248, 1)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          zIndex: 50,
          borderBottom: `1px solid ${scrolled ? '#E8E5E0' : 'transparent'}`,
          transition: 'all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 5vw',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {/* Left: Logo */}
          <Link
            href="/minimal"
            style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              textDecoration: 'none',
            }}
          >
            VAULT MAISON
          </Link>

          {/* Center: Nav Links (desktop) */}
          <div
            style={{ display: 'flex', gap: '36px', alignItems: 'center' }}
            className="vm-nav-desktop"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: font,
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: isActive(link.href) ? '#C4A265' : '#1A1A1A',
                  textDecoration: 'none',
                  opacity: isActive(link.href) ? 1 : 0.6,
                  borderBottom: isActive(link.href) ? '2px solid #C4A265' : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'all 300ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.color = '#C4A265'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.opacity = '0.6'
                    e.currentTarget.style.color = '#1A1A1A'
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Icons */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/minimal/search" className="vm-nav-desktop" style={{ color: '#1A1A1A', opacity: 0.6, transition: 'opacity 300ms' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6' }}>
              <Search size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/minimal/wishlist" className="vm-nav-desktop" style={{ color: '#1A1A1A', opacity: 0.6, position: 'relative', transition: 'opacity 300ms' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6' }}>
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, backgroundColor: '#C4A265', width: '8px', height: '8px', borderRadius: '50%', display: 'block' }} />
              )}
            </Link>
            <Link href="/minimal/cart" style={{ color: '#1A1A1A', opacity: 0.6, position: 'relative', transition: 'opacity 300ms' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6' }}>
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, backgroundColor: '#C4A265', width: '8px', height: '8px', borderRadius: '50%', display: 'block' }} />
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="vm-nav-mobile-only"
              style={{ background: 'none', border: 'none', color: '#1A1A1A', cursor: 'pointer', padding: '4px' }}
              aria-label="Menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#FAFAF8', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '20px 5vw' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
            <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1A1A1A' }}>VAULT MAISON</span>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#1A1A1A', cursor: 'pointer', padding: '8px' }} aria-label="Close menu">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '40px' }}>
            {[
              ...links,
              { label: 'Search', href: '/minimal/search' },
              { label: 'Wishlist', href: '/minimal/wishlist' },
              { label: 'Cart', href: '/minimal/cart' },
              { label: 'Account', href: '/minimal/account' },
              { label: 'Contact', href: '/minimal/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: font,
                  fontSize: '14px',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive(link.href) ? '#C4A265' : '#1A1A1A',
                  textDecoration: 'none',
                  padding: '16px 0',
                  borderBottom: '1px solid #E8E5E0',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '62px' }} />

      <style>{`
        @media (max-width: 768px) {
          .vm-nav-desktop { display: none !important; }
          .vm-nav-mobile-only { display: block !important; }
        }
        @media (min-width: 769px) {
          .vm-nav-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  )
}
