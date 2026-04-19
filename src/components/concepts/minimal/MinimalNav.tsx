'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import ActionSearchBar from './ui/ActionSearchBar'
import ProfileDropdown from './ui/ProfileDropdown'
import { StickyNavBlur } from './ui/StickyNavBlur'
import { FullScreenMenu } from './ui/FullScreenMenu'
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
  const [megaMenu, setMegaMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [animateCart, setAnimateCart] = useState(false)
  const megaTimeout = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  
  const cartCount = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0))
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const prevCartCount = useRef(cartCount)

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setAnimateCart(true)
      setTimeout(() => setAnimateCart(false), 300)
    }
    prevCartCount.current = cartCount
  }, [cartCount])

  useEffect(() => { setMegaMenu(null) }, [pathname])

  const openMega = (key: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaMenu(key)
  }
  
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaMenu(null), 200)
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
      <StickyNavBlur>
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
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden md:block"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#9B9B9B',
              transition: 'color 0.2s ease',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Search"
          >
            <Search size={17} strokeWidth={1.5} />
          </button>
          <Link
            href="/minimal/wishlist"
            className="hidden md:flex"
            style={{
              color: '#9B9B9B',
              transition: 'color 0.2s ease',
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
            style={{
              color: '#9B9B9B',
              transition: 'color 0.2s ease',
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
              <span className={animateCart ? 'cart-bounce-anim' : ''} style={{
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
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          <div className="hidden md:block">
            <ProfileDropdown />
          </div>
          <FullScreenMenu links={mobileLinks} isActive={isActive} />
        </div>
      </StickyNavBlur>

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
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: '20px' }}>
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
                    color: '#6B6B6B',
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
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: '20px' }}>
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
                    color: '#6B6B6B',
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
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: '20px' }}>
                Featured
              </p>
              <Link href="/minimal/category/wedding-bridal" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#6B6B6B', textDecoration: 'none', padding: '8px 0', transition: 'color 0.2s ease' }} className="hover:!text-[#050505]">Wedding & Bridal</Link>
              <Link href="/minimal/bespoke" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#6B6B6B', textDecoration: 'none', padding: '8px 0', transition: 'color 0.2s ease' }} className="hover:!text-[#050505]">Bespoke Creations</Link>
              <Link href="/minimal/collections" style={{ display: 'block', fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#6B6B6B', textDecoration: 'none', padding: '8px 0', transition: 'color 0.2s ease' }} className="hover:!text-[#050505]">View All Collections</Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '64px' }} />

      <style>{`
        @keyframes megaSlide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        /* Nav link underline — slides in from left */
        .minimal-nav-link {
          position: relative;
        }
        .minimal-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #050505;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .minimal-nav-link:hover::after {
          width: 100%;
        }
        .minimal-nav-link:hover {
          color: #050505 !important;
        }
        .minimal-nav-link-active::after {
          width: 100%;
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
          background: rgba(5, 5, 5, 0.25);
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .cart-bounce-anim {
          animation: cartBounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes cartBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  )
}
