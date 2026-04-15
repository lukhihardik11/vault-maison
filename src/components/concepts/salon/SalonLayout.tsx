'use client'
import { AuthModal } from '@/components/shared/auth-modal'
import { ToastNotifications } from '@/components/shared/toast-notifications'
import { getConcept } from '@/data/concepts'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Heart, ShoppingBag, User } from 'lucide-react'
import { ConciergeChat } from './ui/ConciergeChat'

// ═══ SALON DESIGN TOKENS ═══
export const S = {
  bg: '#FDF5EE',
  surface: '#FFFFFF',
  warmPanel: '#F5EDE4',
  border: '#E6DDD4',
  text: '#2C2420',
  textSecondary: '#8A7E75',
  accent: '#B8860B',
  accentSoft: 'rgba(184, 134, 11, 0.08)',
  accentHover: '#9A7209',
  chatBubbleThem: '#F5EDE4',
  chatBubbleYou: '#2C2420',
  success: '#6B8E6B',
  shadow: 'rgba(44, 36, 32, 0.08)',
  shadowDeep: 'rgba(44, 36, 32, 0.14)',
  radius: '14px',
  radiusSm: '10px',
  radiusLg: '20px',
}

const navLinks = [
  { label: 'Collections', href: '/salon/collections' },
  { label: 'Rings', href: '/salon/category/diamond-rings' },
  { label: 'Necklaces', href: '/salon/category/gold-necklaces' },
  { label: 'Earrings', href: '/salon/category/diamond-earrings' },
  { label: 'Bracelets', href: '/salon/category/diamond-bracelets' },
  { label: 'Bespoke', href: '/salon/bespoke' },
  { label: 'Journal', href: '/salon/journal' },
]

export function SalonLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div style={{ background: S.bg, color: S.text, minHeight: '100vh', fontFamily: "'Lora', 'Georgia', serif" }}>
      {/* ═══ HEADER ═══ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(253, 245, 238, 0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${S.border}`,
      }}>
        {/* Top bar */}
        <div style={{
          maxWidth: 1320, margin: '0 auto', padding: '14px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Left: hamburger on mobile */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: S.text, cursor: 'pointer', padding: 4 }}
            className="salon-mobile-menu-btn">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/salon" style={{ textDecoration: 'none', color: S.text }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 400, margin: 0, letterSpacing: '0.04em' }}>
                Vault Maison
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: S.textSecondary, margin: '2px 0 0' }}>
                The Salon
              </p>
            </div>
          </Link>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/salon/search" style={{ color: S.textSecondary, transition: 'color 0.3s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = S.accent }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = S.textSecondary }}>
              <Search size={18} />
            </Link>
            <Link href="/salon/wishlist" style={{ color: S.textSecondary, transition: 'color 0.3s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = S.accent }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = S.textSecondary }}>
              <Heart size={18} />
            </Link>
            <Link href="/salon/cart" style={{ color: S.textSecondary, transition: 'color 0.3s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = S.accent }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = S.textSecondary }}>
              <ShoppingBag size={18} />
            </Link>
            <Link href="/salon/account" style={{ color: S.textSecondary, transition: 'color 0.3s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = S.accent }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = S.textSecondary }}>
              <User size={18} />
            </Link>
          </div>
        </div>

        {/* Desktop nav */}
        <nav style={{ borderTop: `1px solid ${S.border}`, padding: '0 32px' }}
          className="salon-desktop-nav">
          <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 36 }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href}
                  className="salon-nav-link"
                  style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 400,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: isActive ? S.accent : S.textSecondary,
                    textDecoration: 'none', padding: '12px 0',
                    borderBottom: isActive ? `2px solid ${S.accent}` : '2px solid transparent',
                    transition: 'all 0.3s',
                  }}>
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav style={{ padding: '16px 32px', borderTop: `1px solid ${S.border}`, background: S.bg }}
            className="salon-mobile-nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem',
                  color: S.text, textDecoration: 'none', padding: '12px 0',
                  borderBottom: `1px solid ${S.border}`,
                }}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <AuthModal concept={getConcept('salon')!} />
      <ToastNotifications concept={getConcept('salon')!} />
      <main>{children}</main>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: S.warmPanel, borderTop: `1px solid ${S.border}`, padding: '80px 32px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 60 }}>
            {/* Col 1: Brand */}
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>
                Vault Maison
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, lineHeight: 1.7 }}>
                Your personal jewelry experience. We&apos;re here to help you find something extraordinary.
              </p>
            </div>
            {/* Col 2: Explore */}
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.text, margin: '0 0 16px' }}>Explore</p>
              {['Collections', 'New Arrivals', 'Bespoke', 'Gift Guide'].map((item) => (
                <Link key={item} href={`/salon/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="salon-nav-link"
                  style={{ display: 'block', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, textDecoration: 'none', padding: '4px 0', transition: 'color 0.3s' }}>
                  {item}
                </Link>
              ))}
            </div>
            {/* Col 3: Services */}
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.text, margin: '0 0 16px' }}>Services</p>
              {['Virtual Appointment', 'Home Try-On', 'Custom Design', 'Gift Concierge'].map((item) => (
                <Link key={item} href="/salon/bespoke"
                  className="salon-nav-link"
                  style={{ display: 'block', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, textDecoration: 'none', padding: '4px 0', transition: 'color 0.3s' }}>
                  {item}
                </Link>
              ))}
            </div>
            {/* Col 4: Help */}
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.text, margin: '0 0 16px' }}>Help</p>
              {[{ label: 'Contact Us', href: '/salon/contact' }, { label: 'Shipping', href: '/salon/shipping' }, { label: 'FAQ', href: '/salon/faq' }, { label: 'Privacy', href: '/salon/privacy' }].map((item) => (
                <Link key={item.label} href={item.href}
                  className="salon-nav-link"
                  style={{ display: 'block', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, textDecoration: 'none', padding: '4px 0', transition: 'color 0.3s' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Personal sign-off */}
          <div style={{ textAlign: 'center', borderTop: `1px solid ${S.border}`, paddingTop: 32 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: S.textSecondary, margin: '0 0 8px' }}>
              With love, The Vault Maison Team
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: S.textSecondary, letterSpacing: '0.05em' }}>
              &copy; 2025 Vault Maison. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ CONCIERGE CHAT (persistent on every page) ═══ */}
      <ConciergeChat />

      <style>{`
        .salon-nav-link:hover { color: ${S.accent} !important; }
        @media (max-width: 768px) {
          .salon-desktop-nav { display: none !important; }
          .salon-mobile-menu-btn { display: block !important; }
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
