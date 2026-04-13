'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

const navStyle = {
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.2em',
  fontWeight: 400,
}

export function MinimalNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useCartStore((s) => s.items.length)
  const wishlistCount = useWishlistStore((s) => s.items.length)

  const links = [
    { label: 'Collections', href: '/minimal/collections' },
    { label: 'Journal', href: '/minimal/journal' },
    { label: 'Bespoke', href: '/minimal/bespoke' },
    { label: 'About', href: '/minimal/about' },
  ]

  return (
    <>
      {/* Desktop Nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '56px',
          backgroundColor: '#FFFFFF',
          zIndex: 50,
          borderBottom: '1px solid #E5E5E5',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 5vw',
          }}
        >
          {/* Left: Logo */}
          <Link
            href="/minimal"
            style={{
              ...navStyle,
              color: '#050505',
              textDecoration: 'none',
            }}
          >
            VAULT MAISON
          </Link>

          {/* Center: Nav Links (desktop only) */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center',
            }}
            className="minimal-nav-desktop"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  ...navStyle,
                  color: '#050505',
                  textDecoration: 'none',
                  opacity: 0.6,
                  transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Utility links */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link
              href="/minimal/search"
              style={{ ...navStyle, color: '#050505', textDecoration: 'none', opacity: 0.6 }}
              className="minimal-nav-desktop"
            >
              Search
            </Link>
            <Link
              href="/minimal/wishlist"
              style={{ ...navStyle, color: '#050505', textDecoration: 'none', opacity: 0.6 }}
              className="minimal-nav-desktop"
            >
              Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}
            </Link>
            <Link
              href="/minimal/cart"
              style={{ ...navStyle, color: '#050505', textDecoration: 'none', opacity: 0.6 }}
            >
              Cart{cartCount > 0 ? ` (${cartCount})` : ''}
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                ...navStyle,
                background: 'none',
                border: 'none',
                color: '#050505',
                cursor: 'pointer',
                padding: 0,
              }}
              className="minimal-nav-mobile-only"
              aria-label="Menu"
            >
              &#9776;
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
            <span style={{ ...navStyle, color: '#050505' }}>VM</span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#050505',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '8px',
                minHeight: '44px',
                minWidth: '44px',
              }}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                  ...navStyle,
                  color: '#050505',
                  textDecoration: 'none',
                  fontSize: '13px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div style={{ height: '56px' }} />

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .minimal-nav-desktop { display: none !important; }
          .minimal-nav-mobile-only { display: block !important; }
        }
        @media (min-width: 769px) {
          .minimal-nav-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  )
}
