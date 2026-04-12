'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Menu, X, Search, User } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { buildConceptUrl } from '@/lib/concept-utils'

interface LuxuryNavProps {
  concept: ConceptConfig
}

export function LuxuryNav({ concept }: LuxuryNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.getItemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)

  const navLinks = [
    { label: 'Collections', href: buildConceptUrl(concept.id, 'collections') },
    { label: 'Diamonds', href: buildConceptUrl(concept.id, 'category/diamond-rings') },
    { label: 'Gold', href: buildConceptUrl(concept.id, 'category/gold-rings') },
    { label: 'Bespoke', href: buildConceptUrl(concept.id, 'bespoke') },
    { label: 'About', href: buildConceptUrl(concept.id, 'about') },
    { label: 'Journal', href: buildConceptUrl(concept.id, 'journal') },
  ]

  const isMinimal = concept.id === 'minimal'

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          backgroundColor: concept.palette.bg,
          color: concept.palette.text,
          borderBottom: `1px solid ${concept.palette.muted}`,
          transitionDuration: isMinimal ? '0ms' : '600ms',
        }}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href={buildConceptUrl(concept.id)}
              className="transition-opacity hover:opacity-60"
              style={{
                fontFamily: concept.fonts.heading,
                transitionDuration: isMinimal ? '0ms' : '600ms',
              }}
            >
              <span
                className={`text-sm lg:text-base uppercase tracking-[0.2em] font-light ${concept.fonts.headingClass}`}
              >
                {isMinimal ? 'VM' : 'Vault Maison'}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-opacity hover:opacity-60"
                  style={{
                    fontSize: isMinimal ? '12px' : '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 300,
                    opacity: pathname === link.href ? 1 : 0.7,
                    transitionDuration: isMinimal ? '0ms' : '600ms',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              <Link
                href={buildConceptUrl(concept.id, 'search')}
                className="transition-opacity hover:opacity-60 hidden lg:block"
                style={{ transitionDuration: '600ms' }}
                aria-label="Search"
              >
                <Search size={isMinimal ? 16 : 18} strokeWidth={1.5} />
              </Link>
              <Link
                href={buildConceptUrl(concept.id, 'account')}
                className="transition-opacity hover:opacity-60 hidden lg:block"
                style={{ transitionDuration: '600ms' }}
                aria-label="Account"
              >
                <User size={isMinimal ? 16 : 18} strokeWidth={1.5} />
              </Link>
              <Link
                href={buildConceptUrl(concept.id, 'wishlist')}
                className="relative transition-opacity hover:opacity-60"
                style={{ transitionDuration: '600ms' }}
                aria-label="Wishlist"
              >
                <Heart size={isMinimal ? 16 : 18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1 -right-2 text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: concept.palette.accent,
                      color: concept.palette.bg,
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href={buildConceptUrl(concept.id, 'cart')}
                className="relative transition-opacity hover:opacity-60"
                style={{ transitionDuration: '600ms' }}
                aria-label="Cart"
              >
                <ShoppingBag size={isMinimal ? 16 : 18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-2 text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: concept.palette.accent,
                      color: concept.palette.bg,
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                className="lg:hidden transition-opacity hover:opacity-60"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Menu"
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: concept.palette.bg }}
          >
            <div className="flex flex-col h-full px-6 py-6">
              <div className="flex justify-between items-center mb-16">
                <span
                  className={`text-sm uppercase tracking-[0.2em] font-light ${concept.fonts.headingClass}`}
                  style={{ color: concept.palette.text }}
                >
                  Vault Maison
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  style={{ color: concept.palette.text }}
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-2xl font-light tracking-[0.1em]"
                      style={{
                        color: concept.palette.text,
                        fontFamily: concept.fonts.heading,
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-8 pt-8 space-y-4" style={{ borderTop: `1px solid ${concept.palette.muted}` }}>
                  {[
                    { label: 'Search', href: buildConceptUrl(concept.id, 'search') },
                    { label: 'Wishlist', href: buildConceptUrl(concept.id, 'wishlist') },
                    { label: 'Cart', href: buildConceptUrl(concept.id, 'cart') },
                    { label: 'Account', href: buildConceptUrl(concept.id, 'account') },
                    { label: concept.ctaText.contact, href: buildConceptUrl(concept.id, 'contact') },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-xs uppercase tracking-[0.2em] font-light opacity-60"
                      style={{ color: concept.palette.text }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  )
}
