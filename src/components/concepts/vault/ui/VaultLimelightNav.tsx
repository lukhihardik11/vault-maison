'use client'

import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react'
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'

interface VaultNavItem {
  id: string
  icon: React.ReactElement
  label: string
  href: string
}

const defaultItems: VaultNavItem[] = [
  { id: 'home', icon: <Home />, label: 'Home', href: '/vault' },
  { id: 'search', icon: <Search />, label: 'Search', href: '/vault/search' },
  { id: 'wishlist', icon: <Heart />, label: 'Wishlist', href: '/vault/wishlist' },
  { id: 'cart', icon: <ShoppingBag />, label: 'Cart', href: '/vault/cart' },
  { id: 'account', icon: <User />, label: 'Account', href: '/vault/account' },
]

interface VaultLimelightNavProps {
  items?: VaultNavItem[]
  activeId?: string
}

export function VaultLimelightNav({ items = defaultItems, activeId }: VaultLimelightNavProps) {
  const [activeIndex, setActiveIndex] = useState(
    activeId ? items.findIndex(i => i.id === activeId) : 0
  )
  const [isReady, setIsReady] = useState(false)
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const spotlightRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (items.length === 0) return
    const spotlight = spotlightRef.current
    const activeItem = navRefs.current[activeIndex]
    if (spotlight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - spotlight.offsetWidth / 2
      spotlight.style.left = `${newLeft}px`
      if (!isReady) setTimeout(() => setIsReady(true), 50)
    }
  }, [activeIndex, isReady, items])

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '8px 0 env(safe-area-inset-bottom, 8px)',
      background: 'linear-gradient(to top, rgba(10,10,10,0.98), rgba(10,10,10,0.92))',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(212,175,55,0.15)',
    }}
    className="vault-limelight-nav-mobile"
    >
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', height: 56 }}>
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            ref={el => { navRefs.current[index] = el }}
            onClick={() => setActiveIndex(index)}
            aria-label={item.label}
            style={{
              position: 'relative', zIndex: 20,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '8px 20px', cursor: 'pointer', textDecoration: 'none',
            }}
          >
            {cloneElement(item.icon as React.ReactElement<any>, {
              size: 20,
              style: {
                color: activeIndex === index ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.3s, opacity 0.3s',
              },
            })}
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: activeIndex === index ? '#D4AF37' : 'rgba(255,255,255,0.35)',
              marginTop: 4,
              transition: 'color 0.3s',
            }}>
              {item.label}
            </span>
          </Link>
        ))}

        {/* Gold spotlight beam */}
        <div
          ref={spotlightRef}
          style={{
            position: 'absolute', top: 0, zIndex: 10,
            width: 40, height: 3, borderRadius: 4,
            background: '#D4AF37',
            boxShadow: '0 8px 20px rgba(212,175,55,0.4)',
            transition: isReady ? 'left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none',
            left: -999,
          }}
        >
          <div style={{
            position: 'absolute',
            left: '-30%', top: 3, width: '160%', height: 48,
            clipPath: 'polygon(5% 100%, 25% 0, 75% 0, 95% 100%)',
            background: 'linear-gradient(to bottom, rgba(212,175,55,0.25), transparent)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .vault-limelight-nav-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
