'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { buildConceptUrl } from '@/lib/concept-utils'

interface MobileNavProps {
  concept: ConceptConfig
}

export function MobileNav({ concept }: MobileNavProps) {
  const [mounted, setMounted] = useState(false)
  const cartCount = useCartStore((s) => s.getItemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)

  useEffect(() => {
    setMounted(true)
  }, [])

  const items = [
    { icon: Home, label: 'Home', href: buildConceptUrl(concept.id, '') },
    { icon: Search, label: 'Search', href: buildConceptUrl(concept.id, 'search') },
    { icon: Heart, label: 'Wishlist', href: buildConceptUrl(concept.id, 'wishlist'), badge: mounted ? wishlistCount : 0 },
    { icon: ShoppingBag, label: 'Cart', href: buildConceptUrl(concept.id, 'cart'), badge: mounted ? cartCount : 0 },
    { icon: User, label: 'Account', href: buildConceptUrl(concept.id, 'account') },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[9990] lg:hidden"
      style={{
        backgroundColor: concept.palette.bg,
        borderTop: `1px solid ${concept.palette.muted}`,
      }}
    >
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 py-2 px-3 min-w-[44px] min-h-[44px] justify-center relative"
          >
            <item.icon size={20} strokeWidth={1.5} style={{ color: concept.palette.text }} />
            <span
              className="text-[9px] uppercase tracking-[0.1em]"
              style={{ color: concept.palette.text, opacity: 0.6 }}
            >
              {item.label}
            </span>
            {item.badge !== undefined && item.badge > 0 && (
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold animate-badge-pulse"
                style={{
                  backgroundColor: concept.palette.accent,
                  color: concept.palette.bg,
                }}
              >
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}
