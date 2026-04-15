'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Heart, Menu, X, Search, User, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const navLinks = [
  {
    label: 'Collections',
    href: '/vault/collections',
    mega: [
      { label: 'Diamond Rings', href: '/vault/category/diamond-rings' },
      { label: 'Gold Rings', href: '/vault/category/gold-rings' },
      { label: 'Necklaces', href: '/vault/category/necklaces' },
      { label: 'Earrings', href: '/vault/category/earrings' },
      { label: 'Bracelets', href: '/vault/category/bracelets' },
      { label: 'Watches', href: '/vault/category/watches' },
    ],
  },
  { label: 'Bespoke', href: '/vault/bespoke' },
  { label: 'Journal', href: '/vault/journal' },
  { label: 'About', href: '/vault/about' },
]

export function VaultNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.getItemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(212,175,55,0.1)` : '1px solid transparent',
        }}
      >
        {/* Gold progress bar */}
        <div
          id="vault-progress"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${GOLD}, #F5E6A3, ${GOLD})`,
            width: '0%',
            transition: 'width 0.1s linear',
          }}
        />

        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
            {/* Logo */}
            <Link href="/vault" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: GOLD,
                    lineHeight: 1.2,
                  }}
                >
                  VAULT MAISON
                </span>
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.35em',
                    color: 'rgba(212,175,55,0.5)',
                    textTransform: 'uppercase',
                    fontWeight: 300,
                  }}
                >
                  Fine Jewelry
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden md:flex">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => link.mega && setMegaOpen(link.label)}
                  onMouseLeave={() => setMegaOpen(null)}
                >
                  <Link
                    href={link.href}
                    style={{
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 400,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: pathname.startsWith(link.href) ? GOLD : 'rgba(234,234,234,0.7)',
                      transition: 'color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    {link.label}
                    {link.mega && <ChevronDown size={12} style={{ opacity: 0.5 }} />}
                  </Link>

                  {/* Mega Menu */}
                  {link.mega && megaOpen === link.label && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        paddingTop: 16,
                        animation: 'vaultFadeDown 0.3s ease',
                      }}
                    >
                      <div
                        style={{
                          background: 'rgba(20,20,20,0.95)',
                          backdropFilter: 'blur(20px)',
                          border: `1px solid rgba(212,175,55,0.15)`,
                          borderRadius: 8,
                          padding: '20px 24px',
                          minWidth: 220,
                          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}
                      >
                        {link.mega.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            style={{
                              display: 'block',
                              padding: '8px 0',
                              fontSize: 13,
                              color: 'rgba(234,234,234,0.7)',
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                              letterSpacing: '0.05em',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(234,234,234,0.7)')}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <Link href="/vault/search" style={{ color: 'rgba(234,234,234,0.7)', transition: 'color 0.3s' }}>
                <Search size={18} />
              </Link>
              <Link href="/vault/wishlist" style={{ color: 'rgba(234,234,234,0.7)', position: 'relative' }}>
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -6,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: GOLD,
                    }}
                  />
                )}
              </Link>
              <Link href="/vault/account" style={{ color: 'rgba(234,234,234,0.7)' }}>
                <User size={18} />
              </Link>
              <Link href="/vault/cart" style={{ color: 'rgba(234,234,234,0.7)', position: 'relative' }}>
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -6,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: GOLD,
                    }}
                  />
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: TEXT, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(20px)',
            paddingTop: 100,
            animation: 'vaultFadeIn 0.3s ease',
          }}
        >
          <div style={{ padding: '0 24px' }}>
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '16px 0',
                    fontSize: 18,
                    fontFamily: 'Cinzel, serif',
                    letterSpacing: '0.1em',
                    color: TEXT,
                    textDecoration: 'none',
                    borderBottom: `1px solid ${MUTED}`,
                  }}
                >
                  {link.label}
                </Link>
                {link.mega && (
                  <div style={{ paddingLeft: 16 }}>
                    {link.mega.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'block',
                          padding: '10px 0',
                          fontSize: 14,
                          color: 'rgba(234,234,234,0.5)',
                          textDecoration: 'none',
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll progress script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              window.addEventListener('scroll',function(){
                var h=document.documentElement;
                var pct=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
                var bar=document.getElementById('vault-progress');
                if(bar)bar.style.width=pct+'%';
              },{passive:true});
            })();
          `,
        }}
      />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes vaultFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes vaultFadeDown { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes vaultGlow { 0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.1); } 50% { box-shadow: 0 0 40px rgba(212,175,55,0.2); } }
        @keyframes vaultShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes vaultPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes vaultSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes vaultScaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </>
  )
}
