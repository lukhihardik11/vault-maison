'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import ActionSearchBar from './ui/ActionSearchBar'
import ProfileDropdown from './ui/ProfileDropdown'
import { minimal } from './design-system'
import { useReducedMotionPreference } from './animations/useResponsiveMotion'

const font = minimal.font.primary
const mono = minimal.font.mono

const navLinks = [
  { label: 'Collection', href: '/minimal/collections', mega: 'diamonds' as const },
  { label: 'Wedding', href: '/minimal/category/wedding-bridal', mega: null },
  { label: 'Bespoke', href: '/minimal/bespoke', mega: null },
  { label: 'About', href: '/minimal/about', mega: null },
  { label: 'Contact', href: '/minimal/contact', mega: null },
]

const diamondLinks = [
  { label: 'Diamond Rings', href: '/minimal/category/diamond-rings' },
  { label: 'Diamond Necklaces', href: '/minimal/category/diamond-necklaces' },
  { label: 'Diamond Earrings', href: '/minimal/category/diamond-earrings' },
  { label: 'Diamond Bracelets', href: '/minimal/category/diamond-bracelets' },
  { label: 'Loose Diamonds', href: '/minimal/category/loose-diamonds' },
]

const goldLinks = [
  { label: 'Gold Rings', href: '/minimal/category/gold-rings' },
  { label: 'Gold Necklaces', href: '/minimal/category/gold-necklaces' },
  { label: 'Gold Earrings', href: '/minimal/category/gold-earrings' },
  { label: 'Gold Bracelets', href: '/minimal/category/gold-bracelets' },
]

export function MinimalNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaMenu, setMegaMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const megaTimeout = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotionPreference()
  const cartCount = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0))
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const previousCartCount = useRef(cartCount)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMegaMenu(null)
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const increased = cartCount > previousCartCount.current
    previousCartCount.current = cartCount

    if (!increased || prefersReducedMotion) return

    setCartPulse(true)
    const timeout = window.setTimeout(() => setCartPulse(false), 280)
    return () => window.clearTimeout(timeout)
  }, [cartCount, prefersReducedMotion])

  const openMega = (key: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaMenu(key)
  }
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaMenu(null), 140)
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  const mobileLinks = [
    ...navLinks,
    { label: 'Search', href: '/minimal/search', mega: null },
    { label: 'Wishlist', href: '/minimal/wishlist', mega: null },
    { label: 'Cart', href: '/minimal/cart', mega: null },
    { label: 'Account', href: '/minimal/account', mega: null },
  ]

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`minimal-nav-shell ${scrolled ? 'is-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
        }}
      >
        <div className={`minimal-nav-border ${scrolled ? 'is-visible' : ''}`} aria-hidden="true" />
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 clamp(24px, 3vw, 64px)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/minimal"
            style={{
              fontFamily: font,
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#050505',
              textDecoration: 'none',
            }}
          >
            Minimal Machine
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: '36px' }}>
            {navLinks.map((link) => (
              <div
                key={link.href}
                onMouseEnter={() => link.mega ? openMega(link.mega) : setMegaMenu(null)}
                onMouseLeave={closeMega}
                style={{ position: 'relative' }}
              >
                <Link
                  href={link.href}
                  className={`minimal-nav-link group flex items-center ${isActive(link.href) ? 'minimal-nav-link-active' : ''}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  style={{
                    fontFamily: font,
                    fontSize: '11px',
                    fontWeight: isActive(link.href) ? 500 : 400,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive(link.href) ? '#050505' : '#6B6B6B',
                    gap: '4px',
                    paddingBottom: '2px',
                  }}
                >
                  <span>{link.label}</span>
                  {link.mega && (
                    <ChevronDown
                      size={10}
                      strokeWidth={1.5}
                      style={{
                        opacity: 0.4,
                        transition: prefersReducedMotion ? 'none' : 'transform 200ms',
                        transform: megaMenu === link.mega ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              type="button"
              onClick={() => {
                // Dispatch custom event to open command palette in Layout
                window.dispatchEvent(new CustomEvent('open-command-palette'))
              }}
              className="minimal-icon-button hidden md:flex"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                minWidth: '44px',
                minHeight: '44px',
              }}
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <Link
              href="/minimal/wishlist"
              className="minimal-icon-button hidden md:flex"
              style={{
                position: 'relative',
                minWidth: '44px',
                minHeight: '44px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Wishlist"
            >
              <Heart size={17} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: '6px', right: '6px',
                  width: '6px', height: '6px', backgroundColor: '#050505',
                }} />
              )}
            </Link>
            <Link
              href="/minimal/cart"
              className="minimal-icon-button"
              style={{
                position: 'relative',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span
                  className={`minimal-cart-badge ${cartPulse ? 'pulse' : ''}`}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    minWidth: '16px',
                    height: '16px',
                    backgroundColor: '#050505',
                    color: '#FFFFFF',
                    fontFamily: font,
                    fontSize: '9px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    padding: '0 3px',
                  }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <div className="hidden md:block">
              <ProfileDropdown />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="minimal-icon-button md:hidden"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                minWidth: '44px',
                minHeight: '44px',
              }}
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="vm-mobile-menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <ActionSearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mega Menu */}
      {megaMenu === 'diamonds' && (
        <div
          onMouseEnter={() => openMega('diamonds')}
          onMouseLeave={closeMega}
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 49,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E5E5',
            animation: 'megaSlide 200ms ease',
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '48px clamp(24px, 3vw, 64px)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '48px',
            }}
          >
            <div>
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#767676', marginBottom: '20px' }}>
                Diamonds
              </p>
              {diamondLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: 'block',
                    fontFamily: font,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#6B6B6B',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'opacity 0.2s ease',
                  }}
                  className="hover:opacity-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#767676', marginBottom: '20px' }}>
                Gold
              </p>
              {goldLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: 'block',
                    fontFamily: font,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#6B6B6B',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'opacity 0.2s ease',
                  }}
                  className="hover:opacity-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#767676', marginBottom: '20px' }}>
                Featured
              </p>
              <Link href="/minimal/category/wedding-bridal" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#6B6B6B', textDecoration: 'none', padding: '8px 0', transition: 'opacity 0.2s ease' }} className="hover:opacity-50">Wedding & Bridal</Link>
              <Link href="/minimal/bespoke" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#6B6B6B', textDecoration: 'none', padding: '8px 0', transition: 'opacity 0.2s ease' }} className="hover:opacity-50">Bespoke Creations</Link>
              <Link href="/minimal/collections" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#6B6B6B', textDecoration: 'none', padding: '8px 0', transition: 'opacity 0.2s ease' }} className="hover:opacity-50">View All Collections</Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu — Full-Screen Black Overlay (Tier 1: jilsander/celine pattern) */}
      {menuOpen && (
        <div
          id="vm-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="minimal-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#050505',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', padding: '0 24px' }}>
            <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF' }}>
              Vault Maison
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                minWidth: '44px',
                minHeight: '44px',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Large nav links — Tier 1 pattern: big type, staggered reveal */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(32px, 6vw, 80px)' }}>
            {mobileLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`minimal-mobile-link ${isActive(link.href) ? 'active' : ''}`}
                style={{
                  fontFamily: font,
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive(link.href) ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                  padding: 'clamp(12px, 2vh, 20px) 0',
                  animationDelay: prefersReducedMotion ? '0ms' : `${i * 50}ms`,
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom info */}
          <div style={{ padding: '24px clamp(32px, 6vw, 80px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              Vault Maison — Est. 1974
            </p>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '64px' }} />

      <style>{`
        .minimal-nav-shell {
          background-color: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          transition: background-color 300ms ease, backdrop-filter 300ms ease;
        }
        .minimal-nav-shell.is-scrolled {
          background-color: rgba(255,255,255,0.95);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
        }
        .minimal-nav-border {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: #E5E5E5;
          opacity: 0;
          transition: opacity 260ms ease;
          pointer-events: none;
        }
        .minimal-nav-border.is-visible {
          opacity: 1;
        }
        @keyframes megaSlide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        /* Nav link underline — slides in from left */
        .minimal-nav-link {
          position: relative;
          transition: color 220ms ease;
        }
        .minimal-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #050505;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .minimal-nav-link:hover::after {
          transform: scaleX(1);
        }
        .minimal-nav-link:hover {
          opacity: 0.5;
        }
        .minimal-nav-link-active::after {
          transform: scaleX(1);
        }

        .minimal-icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6B6B6B;
          transition: opacity 220ms ease;
          text-decoration: none;
        }
        .minimal-icon-button:hover {
          opacity: 0.5;
        }
        .minimal-icon-button:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }

        /* Product card title underline — slides in from left */
        .group:hover .minimal-card-title::after {
          width: 100%;
        }
        .minimal-card-title::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: #767676;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .minimal-mobile-overlay {
          animation: fadeIn 220ms ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Mobile menu stagger fade-in */
        .minimal-mobile-link {
          animation: mobileMenuFadeIn 440ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transition: color 220ms ease, background-color 220ms ease;
        }
        .minimal-mobile-link:hover {
          opacity: 0.6;
        }
        .minimal-mobile-link.active {
          color: #FFFFFF !important;
        }
        @keyframes mobileMenuFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .minimal-cart-badge {
          transition: transform 220ms ease;
          transform-origin: center;
        }
        .minimal-cart-badge.pulse {
          animation: minimalCartPulse 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes minimalCartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.16); }
          100% { transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .minimal-nav-shell,
          .minimal-nav-border,
          .minimal-nav-link,
          .minimal-nav-link::after,
          .minimal-icon-button,
          .minimal-mobile-link,
          .minimal-cart-badge,
          .minimal-mobile-overlay {
            transition: none !important;
            animation: none !important;
          }
          .minimal-icon-button:hover,
          .minimal-mobile-link:hover,
          .minimal-cart-badge.pulse {
            transform: none !important;
          }
        }
      `}</style>
    </>
  )
}
