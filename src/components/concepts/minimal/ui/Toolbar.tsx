'use client'
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { minimal } from '../design-system';

const font = "'Inter', 'Helvetica Neue', sans-serif"

const items = [
  { icon: Home, label: 'Home', href: '/minimal' },
  { icon: Search, label: 'Search', href: '/minimal/search' },
  { icon: Heart, label: 'Wishlist', href: '/minimal/wishlist' },
  { icon: ShoppingBag, label: 'Cart', href: '/minimal/cart' },
  { icon: User, label: 'Account', href: '/minimal/account' },
]

export default function Toolbar() {
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.items.length)

  return (
    <>
      <div className="vm-toolbar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60,
        /* Height includes safe area for iPhone home indicator */
        height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        background: 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid #E5E5E5',
        display: 'none', /* shown via media query */
        alignItems: 'center', justifyContent: 'space-around',
        padding: '0 8px',
        /* Prevent iOS tap highlight */
        WebkitTapHighlightColor: 'transparent',
      }}>
        {items.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
              textDecoration: 'none', position: 'relative',
              transition: 'transform 200ms ease',
              /* Ensure minimum 44px touch target */
              minWidth: '44px',
              minHeight: '44px',
              justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}>
              <item.icon size={20} strokeWidth={1.5} style={{ color: active ? '#050505' : '#767676', transition: 'color 200ms' }} />
              <span style={{ fontFamily: font, fontSize: minimal.type.micro, fontWeight: active ? 500 : 400, color: active ? '#050505' : '#767676', letterSpacing: '0.05em' }}>{item.label}</span>
              {item.label === 'Cart' && cartCount > 0 && (
                <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', borderRadius: 0, backgroundColor: '#050505' }} />
              )}
            </Link>
          )
        })}
      </div>
      {/* Spacer to prevent content from being hidden behind the toolbar on mobile */}
      <div className="vm-toolbar-spacer" />
      <style>{`
        @media (max-width: 768px) {
          .vm-toolbar {
            display: flex !important;
            /* Override inline padding to include safe area */
            padding: 0 8px env(safe-area-inset-bottom, 0px) 8px !important;
          }
          .vm-toolbar-spacer {
            height: calc(64px + env(safe-area-inset-bottom, 0px));
          }
        }
        @media (min-width: 769px) {
          .vm-toolbar-spacer {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
