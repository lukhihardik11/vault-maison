'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, User } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import ActionSearchBar from './ui/ActionSearchBar'
import ProfileDropdown from './ui/ProfileDropdown'
import { MINIMAL } from './design-tokens'

const { colors, font } = MINIMAL

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

  const navLinks = [
    { label: 'Diamonds', href: '/minimal/collections', mega: 'diamonds' },
    { label: 'Gold', href: '/minimal/category/gold-rings', mega: 'gold' },
    { label: 'Wedding', href: '/minimal/category/wedding-bridal', mega: null },
    { label: 'New Arrivals', href: '/minimal/category/diamond-necklaces', mega: null },
    { label: 'Bespoke', href: '/minimal/bespoke', mega: null },
  ]

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.98)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          zIndex: 50,
          borderBottom: `1px solid ${scrolled ? colors.border : 'transparent'}`,
          transition: 'all 400ms cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '0 5vw', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Logo */}
          <Link href="/minimal" style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors.text, textDecoration: 'none' }}>
            VAULT MAISON
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="mn-desktop-only">
            {navLinks.map((link) => (
              <div
                key={link.href}
                onMouseEnter={() => link.mega ? openMega(link.mega) : setMegaMenu(null)}
                onMouseLeave={closeMega}
                style={{ position: 'relative' }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: colors.text,
                    textDecoration: 'none',
                    opacity: isActive(link.href) ? 1 : 0.6,
                    display: 'flex', alignItems: 'center', gap: '4px',
                    borderBottom: isActive(link.href) ? `1px solid ${colors.text}` : '1px solid transparent',
                    paddingBottom: '2px',
                    transition: 'all 300ms ease',
                  }}
                  className="mn-nav-link"
                >
                  {link.label}
                  {link.mega && <ChevronDown size={12} style={{ opacity: 0.5, transition: 'transform 200ms', transform: megaMenu === link.mega ? 'rotate(180deg)' : 'rotate(0)' }} />}
                </Link>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={() => setSearchOpen(true)} className="mn-desktop-only mn-icon-link" style={{ background: 'none', border: 'none', color: colors.text, opacity: 0.5, transition: 'all 300ms', cursor: 'pointer', padding: 0 }} aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/minimal/wishlist" className="mn-desktop-only mn-icon-link" style={{ color: colors.text, opacity: 0.5, position: 'relative', transition: 'all 300ms' }}>
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, backgroundColor: colors.text, width: '6px', height: '6px', borderRadius: '50%' }} />}
            </Link>
            <Link href="/minimal/cart" className="mn-icon-link" style={{ color: colors.text, opacity: 0.5, position: 'relative', transition: 'all 300ms' }}>
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, backgroundColor: colors.text, width: '6px', height: '6px', borderRadius: '50%' }} />}
            </Link>
            <div className="mn-desktop-only">
              <ProfileDropdown />
            </div>
            <button onClick={() => setMenuOpen(true)} className="mn-mobile-only" style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', padding: '4px' }} aria-label="Menu">
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* ActionSearchBar Overlay */}
      <ActionSearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mega Menu: Diamonds */}
      {megaMenu === 'diamonds' && (
        <div
          onMouseEnter={() => openMega('diamonds')}
          onMouseLeave={closeMega}
          style={{
            position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 49,
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(24px)',
            borderBottom: `1px solid ${colors.border}`,
            animation: 'mn-mega-slide 250ms ease',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 5vw', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
            <div>
              <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '16px' }}>Diamond Jewelry</p>
              {diamondLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{ display: 'block', fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.text, textDecoration: 'none', padding: '8px 0', transition: 'opacity 200ms' }} className="mn-mega-link">{l.label}</Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '16px' }}>By Occasion</p>
              <Link href="/minimal/category/wedding-bridal" style={{ display: 'block', fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.text, textDecoration: 'none', padding: '8px 0' }} className="mn-mega-link">Wedding & Bridal</Link>
              <Link href="/minimal/bespoke" style={{ display: 'block', fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.text, textDecoration: 'none', padding: '8px 0' }} className="mn-mega-link">Bespoke Creations</Link>
              <Link href="/minimal/collections" style={{ display: 'block', fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.text, textDecoration: 'none', padding: '8px 0' }} className="mn-mega-link">View All Collections</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '200px', height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src="/images/minimal-engagement-ring.jpg" alt="Diamond Collection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mega Menu: Gold */}
      {megaMenu === 'gold' && (
        <div
          onMouseEnter={() => openMega('gold')}
          onMouseLeave={closeMega}
          style={{
            position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 49,
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(24px)',
            borderBottom: `1px solid ${colors.border}`,
            animation: 'mn-mega-slide 250ms ease',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 5vw', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
            <div>
              <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '16px' }}>Gold Jewelry</p>
              {goldLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{ display: 'block', fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.text, textDecoration: 'none', padding: '8px 0' }} className="mn-mega-link">{l.label}</Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '16px' }}>Featured</p>
              <Link href="/minimal/craftsmanship" style={{ display: 'block', fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.text, textDecoration: 'none', padding: '8px 0' }} className="mn-mega-link">Our Craftsmanship</Link>
              <Link href="/minimal/care" style={{ display: 'block', fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.text, textDecoration: 'none', padding: '8px 0' }} className="mn-mega-link">Jewelry Care</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '200px', height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src="/images/products/classic-gold-ring.jpg" alt="Gold Collection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu — fullscreen overlay, large typography, staggered */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(255,255,255,0.99)', backdropFilter: 'blur(20px)', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '20px 5vw' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
            <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors.text }}>VAULT MAISON</span>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', padding: '8px' }} aria-label="Close"><X size={22} strokeWidth={1.5} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
            {[
              ...navLinks,
              { label: 'Search', href: '/minimal/search', mega: null },
              { label: 'Wishlist', href: '/minimal/wishlist', mega: null },
              { label: 'Cart', href: '/minimal/cart', mega: null },
              { label: 'Account', href: '/minimal/account', mega: null },
              { label: 'Contact', href: '/minimal/contact', mega: null },
            ].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: font, fontSize: '24px', fontWeight: 200, letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: isActive(link.href) ? colors.text : colors.text,
                  opacity: isActive(link.href) ? 1 : 0.6,
                  textDecoration: 'none', padding: '16px 0',
                  borderBottom: `1px solid ${colors.border}`,
                  animation: `mn-stagger-in 0.4s ease-out ${i * 50}ms both`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: '62px' }} />

      <style>{`
        @keyframes mn-mega-slide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mn-stagger-in { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        .mn-nav-link:hover { opacity: 1 !important; }
        .mn-icon-link:hover { opacity: 1 !important; }
        .mn-mega-link:hover { opacity: 0.6 !important; padding-left: 4px !important; }
      `}</style>
    </>
  )
}
