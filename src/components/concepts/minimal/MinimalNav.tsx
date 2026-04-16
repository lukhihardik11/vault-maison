'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import ActionSearchBar from './ui/ActionSearchBar'
import ProfileDropdown from './ui/ProfileDropdown'

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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E5E5E5] h-16" style={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', transition: 'background-color 300ms ease' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/minimal" className="text-[15px] font-medium tracking-[0.08em] uppercase text-[#050505] no-underline">
            Minimal Machine
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                onMouseEnter={() => link.mega ? openMega(link.mega) : setMegaMenu(null)}
                onMouseLeave={closeMega}
                className="relative"
              >
                <Link
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.1em] no-underline transition-colors duration-300 relative group flex items-center gap-1"
                  style={{ color: isActive(link.href) ? '#050505' : '#6B6B6B' }}
                >
                  {link.label}
                  {link.mega && <ChevronDown size={12} style={{ opacity: 0.5, transition: 'transform 200ms', transform: megaMenu === link.mega ? 'rotate(180deg)' : 'rotate(0)' }} />}
                  <span
                    className="absolute left-0 -bottom-1 h-px bg-[#050505] transition-all duration-300"
                    style={{ width: isActive(link.href) ? '100%' : '0' }}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button onClick={() => setSearchOpen(true)} className="hidden md:block bg-transparent border-none cursor-pointer p-0 text-[#6B6B6B] hover:text-[#050505] transition-colors" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/minimal/wishlist" className="hidden md:block text-[#6B6B6B] hover:text-[#050505] transition-colors relative">
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#050505] rounded-full" />}
            </Link>
            <Link href="/minimal/cart" className="text-[#6B6B6B] hover:text-[#050505] transition-colors relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#050505] rounded-full" />}
            </Link>
            <div className="hidden md:block">
              <ProfileDropdown />
            </div>
            <button onClick={() => setMenuOpen(true)} className="md:hidden bg-transparent border-none cursor-pointer p-1 text-[#050505]" aria-label="Menu">
              <Menu size={22} strokeWidth={1.5} />
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
          className="fixed top-16 left-0 right-0 z-49 bg-white border-b border-[#E5E5E5]"
          style={{ animation: 'megaSlide 200ms ease' }}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid grid-cols-3 gap-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B] mb-4">Diamonds</p>
              {diamondLinks.map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-[#6B6B6B] no-underline py-2 hover:text-[#050505] transition-colors duration-300">{l.label}</Link>
              ))}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B] mb-4">Gold</p>
              {goldLinks.map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-[#6B6B6B] no-underline py-2 hover:text-[#050505] transition-colors duration-300">{l.label}</Link>
              ))}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B] mb-4">Featured</p>
              <Link href="/minimal/category/wedding-bridal" className="block text-sm text-[#6B6B6B] no-underline py-2 hover:text-[#050505] transition-colors">Wedding & Bridal</Link>
              <Link href="/minimal/bespoke" className="block text-sm text-[#6B6B6B] no-underline py-2 hover:text-[#050505] transition-colors">Bespoke Creations</Link>
              <Link href="/minimal/collections" className="block text-sm text-[#6B6B6B] no-underline py-2 hover:text-[#050505] transition-colors">View All Collections</Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col px-5 pt-5">
          <div className="flex justify-between items-center h-16">
            <span className="text-[15px] font-medium tracking-[0.08em] uppercase text-[#050505]">Minimal Machine</span>
            <button onClick={() => setMenuOpen(false)} className="bg-transparent border-none cursor-pointer p-2 text-[#050505]" aria-label="Close"><X size={22} strokeWidth={1.5} /></button>
          </div>
          <div className="flex flex-col mt-8">
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
                className="text-sm uppercase tracking-[0.1em] no-underline py-4 transition-colors duration-300"
                style={{
                  color: isActive(link.href) ? '#050505' : '#6B6B6B',
                  borderBottom: '1px solid #E5E5E5',
                  fontWeight: isActive(link.href) ? 500 : 400,
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
