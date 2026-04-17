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
  const megaTimeout = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.items.length)
  const wishlistCount = useWishlistStore((s) => s.items.length)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMegaMenu(null) }, [pathname])

  const openMega = (key: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaMenu(key)
  }
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaMenu(null), 200)
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          borderBottom: '1px solid #E8E8E8',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'background-color 300ms ease',
        }}
      >
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
                  className="group flex items-center"
                  style={{
                    fontFamily: font,
                    fontSize: '11px',
                    fontWeight: isActive(link.href) ? 500 : 400,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive(link.href) ? '#050505' : '#8A8A8A',
                    transition: 'color 0.2s ease',
                    gap: '4px',
                  }}
                >
                  <span className="hover:text-[#050505]">{link.label}</span>
                  {link.mega && (
                    <ChevronDown
                      size={10}
                      strokeWidth={1.5}
                      style={{
                        opacity: 0.4,
                        transition: 'transform 200ms',
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
              onClick={() => setSearchOpen(true)}
              className="hidden md:block"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: '#8A8A8A',
                transition: 'color 0.2s ease',
              }}
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <Link
              href="/minimal/wishlist"
              className="hidden md:block"
              style={{ color: '#8A8A8A', transition: 'color 0.2s ease', position: 'relative' }}
            >
              <Heart size={17} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-3px', right: '-3px',
                  width: '6px', height: '6px', backgroundColor: '#050505', borderRadius: '50%',
                }} />
              )}
            </Link>
            <Link
              href="/minimal/cart"
              style={{ color: '#8A8A8A', transition: 'color 0.2s ease', position: 'relative' }}
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-3px', right: '-3px',
                  width: '6px', height: '6px', backgroundColor: '#050505', borderRadius: '50%',
                }} />
              )}
            </Link>
            <div className="hidden md:block">
              <ProfileDropdown />
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#050505',
              }}
              aria-label="Menu"
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
            borderBottom: '1px solid #E8E8E8',
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
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '20px' }}>
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
                    fontWeight: 300,
                    color: '#555555',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.2s ease',
                  }}
                  className="hover:!text-[#050505]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '20px' }}>
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
                    fontWeight: 300,
                    color: '#555555',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.2s ease',
                  }}
                  className="hover:!text-[#050505]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '20px' }}>
                Featured
              </p>
              <Link href="/minimal/category/wedding-bridal" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#555555', textDecoration: 'none', padding: '8px 0', transition: 'color 0.2s ease' }} className="hover:!text-[#050505]">Wedding & Bridal</Link>
              <Link href="/minimal/bespoke" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#555555', textDecoration: 'none', padding: '8px 0', transition: 'color 0.2s ease' }} className="hover:!text-[#050505]">Bespoke Creations</Link>
              <Link href="/minimal/collections" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#555555', textDecoration: 'none', padding: '8px 0', transition: 'color 0.2s ease' }} className="hover:!text-[#050505]">View All Collections</Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu — Full Screen Takeover */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#050505' }}>
              Minimal Machine
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: '#050505' }}
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
            {[
              ...navLinks,
              { label: 'Search', href: '/minimal/search', mega: null },
              { label: 'Wishlist', href: '/minimal/wishlist', mega: null },
              { label: 'Cart', href: '/minimal/cart', mega: null },
              { label: 'Account', href: '/minimal/account', mega: null },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: font,
                  fontSize: '13px',
                  fontWeight: isActive(link.href) ? 500 : 300,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive(link.href) ? '#050505' : '#8A8A8A',
                  padding: '16px 0',
                  borderBottom: '1px solid #F0F0F0',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '64px' }} />

      <style>{`
        @keyframes megaSlide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  )
}
