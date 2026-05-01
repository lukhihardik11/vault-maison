'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useIsMobile, usePrefersReducedMotion } from './hooks/useMediaQuery'
import { triggerHaptic } from './mobile-tokens'

/* ────────────────────────────────────────────────────────────────────
 * MobileBottomNav — Luxury Bottom Tab Navigation
 *
 * Visible only on mobile (< 768px). Features:
 * - 5 tabs: Home, Search, Wishlist, Cart, Account
 * - Safe area inset support for notched devices
 * - Active indicator with gold accent
 * - Badge for cart count
 * - Auto-hide on scroll down, show on scroll up
 * - Haptic feedback on tab change
 * - Respects prefers-reduced-motion
 * ──────────────────────────────────────────────────────────────── */

const SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, serif"
const SANS = "'Inter', 'Helvetica Neue', sans-serif"

const tabs = [
  { id: 'home', label: 'Home', href: '/minimal', icon: Home },
  { id: 'search', label: 'Search', href: '/minimal/collections', icon: Search },
  { id: 'wishlist', label: 'Wishlist', href: '/minimal/wishlist', icon: Heart },
  { id: 'cart', label: 'Cart', href: '/minimal/cart', icon: ShoppingBag },
  { id: 'account', label: 'Account', href: '/minimal/account', icon: User },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()
  const cartCount = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0))
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollThreshold = 10

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current

      if (Math.abs(delta) < scrollThreshold) return

      if (delta > 0 && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  if (!isMobile) return null

  const isActive = (href: string) => {
    if (href === '/minimal') return pathname === '/minimal' || pathname === '/minimal/'
    return pathname?.startsWith(href)
  }

  const handleTabPress = () => {
    if (!prefersReducedMotion) {
      triggerHaptic('light')
    }
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className="vm-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: prefersReducedMotion ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Frosted glass background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(232, 226, 218, 0.6)',
      }} />

      {/* Tab items */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '64px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        maxWidth: '500px',
        margin: '0 auto',
      }}>
        {tabs.map((tab) => {
          const active = isActive(tab.href)
          const Icon = tab.icon
          const badge = tab.id === 'cart' ? cartCount : tab.id === 'wishlist' ? wishlistCount : 0

          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={handleTabPress}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '8px 12px',
                minWidth: '44px',
                minHeight: '44px',
                textDecoration: 'none',
                position: 'relative',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {/* Active indicator dot */}
              {active && (
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#C9A96E',
                  borderRadius: '50%',
                }} />
              )}

              {/* Icon */}
              <div style={{ position: 'relative' }}>
                <Icon
                  size={20}
                  strokeWidth={active ? 2 : 1.5}
                  style={{
                    color: active ? '#2C2420' : '#6B5E54',
                    transition: prefersReducedMotion ? 'none' : 'color 0.2s ease',
                  }}
                />
                {/* Badge */}
                {badge > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-6px',
                    minWidth: '14px',
                    height: '14px',
                    backgroundColor: '#C9A96E',
                    color: '#FFFFFF',
                    fontFamily: SANS,
                    fontSize: '9px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '7px',
                    padding: '0 3px',
                    lineHeight: 1,
                  }}>
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span style={{
                fontFamily: SANS,
                fontSize: '9px',
                fontWeight: active ? 600 : 400,
                letterSpacing: '0.05em',
                color: active ? '#2C2420' : '#6B5E54',
                textTransform: 'uppercase',
                transition: prefersReducedMotion ? 'none' : 'color 0.2s ease',
              }}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>

      <style>{`
        .vm-bottom-nav {
          /* Safe area padding for bottom */
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        @media (min-width: 768px) {
          .vm-bottom-nav {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vm-bottom-nav {
            transition: none !important;
          }
        }
      `}</style>
    </nav>
  )
}

export default MobileBottomNav
