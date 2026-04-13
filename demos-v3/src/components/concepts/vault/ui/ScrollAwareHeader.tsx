'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, X, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface NavLink {
  label: string;
  href: string;
}

interface ScrollAwareHeaderProps {
  links?: NavLink[];
  conceptSlug?: string;
}

export function ScrollAwareHeader({
  links = [
    { label: 'Diamonds', href: '/vault/category/diamond-rings' },
    { label: 'Gold', href: '/vault/category/gold-jewelry' },
    { label: 'Collections', href: '/vault/collections' },
    { label: 'Bespoke', href: '/vault/bespoke' },
  ],
  conceptSlug = 'vault',
}: ScrollAwareHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.length);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled
            ? 'rgba(10, 10, 10, 0.95)'
            : 'rgba(10, 10, 10, 0.4)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
          borderBottom: scrolled
            ? '1px solid rgba(212, 175, 55, 0.1)'
            : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href={`/${conceptSlug}`}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: scrolled ? '1rem' : '1.2rem',
              fontWeight: 400,
              letterSpacing: '0.2em',
              color: '#EAEAEA',
              textDecoration: 'none',
              transition: 'font-size 0.4s ease',
            }}
          >
            VAULT MAISON
          </Link>

          {/* Desktop nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}
            className="hidden md:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="vault-nav-link"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#8A8A8A',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#8A8A8A';
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link
              href={`/${conceptSlug}/search`}
              style={{ color: '#8A8A8A', transition: 'color 0.3s' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A8A'; }}
            >
              <Search size={18} />
            </Link>
            <Link
              href={`/${conceptSlug}/wishlist`}
              style={{ color: '#8A8A8A', transition: 'color 0.3s' }}
              className="hidden md:block"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A8A'; }}
            >
              <Heart size={18} />
            </Link>
            <Link
              href={`/${conceptSlug}/account`}
              style={{ color: '#8A8A8A', transition: 'color 0.3s' }}
              className="hidden md:block"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A8A'; }}
            >
              <User size={18} />
            </Link>
            <Link
              href={`/${conceptSlug}/cart`}
              style={{
                color: '#8A8A8A',
                transition: 'color 0.3s',
                position: 'relative',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A8A'; }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -8,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#D4AF37',
                    color: '#0A0A0A',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#EAEAEA',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.5rem',
                letterSpacing: '0.15em',
                color: '#EAEAEA',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#EAEAEA'; }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ width: 40, height: 1, background: '#2A2A2A', margin: '8px 0' }} />

          <Link
            href={`/${conceptSlug}/account`}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              color: '#8A8A8A',
              textDecoration: 'none',
            }}
          >
            Account
          </Link>
          <Link
            href={`/${conceptSlug}/wishlist`}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              color: '#8A8A8A',
              textDecoration: 'none',
            }}
          >
            Wishlist
          </Link>
        </div>
      )}
    </>
  );
}
