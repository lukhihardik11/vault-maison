'use client'

import Link from 'next/link'
import { minimal } from './design-system'

const font = minimal.font.primary
const mono = minimal.font.mono

const shopLinks = [
  { label: 'All Pieces', href: '/minimal/collections' },
  { label: 'Rings', href: '/minimal/category/diamond-rings' },
  { label: 'Necklaces', href: '/minimal/category/diamond-necklaces' },
  { label: 'Bracelets', href: '/minimal/category/diamond-bracelets' },
  { label: 'Earrings', href: '/minimal/category/diamond-earrings' },
  { label: 'Loose Diamonds', href: '/minimal/category/loose-diamonds' },
]

const infoLinks = [
  { label: 'About', href: '/minimal/about' },
  { label: 'Bespoke', href: '/minimal/bespoke' },
  { label: 'Shipping & Returns', href: '/minimal/shipping' },
  { label: 'Diamond Grading', href: '/minimal/grading' },
  { label: 'Contact', href: '/minimal/contact' },
  { label: 'FAQ', href: '/minimal/faq' },
]

export function MinimalFooter() {
  return (
    <footer style={{ borderTop: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 80px) clamp(24px, 3vw, 64px)',
        }}
      >
        {/* Top section — Brand statement */}
        <div style={{ marginBottom: 'clamp(48px, 6vh, 72px)' }}>
          <h4
            style={{
              fontFamily: font,
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              color: '#050505',
              maxWidth: '500px',
              margin: 0,
            }}
          >
            Precision in every facet.
            <br />
            Nothing more.
          </h4>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(32px, 4vw, 48px)',
            paddingBottom: 'clamp(48px, 6vh, 72px)',
          }}
        >
          {/* Newsletter (New) */}
          <div style={{ gridColumn: '1 / -1', marginBottom: '32px' }}>
            <h5
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                marginBottom: '20px',
              }}
            >
              Newsletter
            </h5>
            <div style={{ maxWidth: '400px', display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="minimal-newsletter-input"
                style={{
                  width: '100%',
                  padding: '12px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #E5E5E5',
                  fontFamily: font,
                  fontSize: '13px',
                  color: '#050505',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
              />
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontFamily: font,
                  fontSize: '13px',
                  color: '#050505',
                  cursor: 'pointer',
                  padding: '12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'opacity 0.2s ease',
                }}
                className="hover:opacity-60"
              >
                Subscribe
              </button>
            </div>
            <style>{`
              .minimal-newsletter-input:focus {
                border-bottom-color: #050505 !important;
              }
              .minimal-newsletter-input::placeholder {
                color: #9B9B9B;
              }
            `}</style>
          </div>

          {/* Shop */}
          <div>
            <h5
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                marginBottom: '20px',
              }}
            >
              Shop
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: font,
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    className="hover:!text-[#050505]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h5
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                marginBottom: '20px',
              }}
            >
              Information
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: font,
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    className="hover:!text-[#050505]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                marginBottom: '20px',
              }}
            >
              Services
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Ring Sizing', href: '/minimal/care' },
                { label: 'Engraving', href: '/minimal/bespoke' },
                { label: 'Cleaning & Care', href: '/minimal/care' },
                { label: 'Insurance', href: '/minimal/faq' },
                { label: 'Gift Cards', href: '/minimal/collections' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: font,
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    className="hover:!text-[#050505]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
                marginBottom: '20px',
              }}
            >
              Contact
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#6B6B6B', margin: 0 }}>
                +1 (212) 555-0174
              </p>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#6B6B6B', margin: 0 }}>
                concierge@minimalmachine.com
              </p>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>
                712 Fifth Avenue
                <br />
                New York, NY 10019
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #E5E5E5',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#9B9B9B',
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Minimal Machine. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Instagram', href: '#' },
              { label: 'Pinterest', href: '#' },
              { label: 'Journal', href: '#' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: mono,
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: '#9B9B9B',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  display: 'inline-block',
                }}
                className="hover:!text-[#050505] hover:-translate-y-[2px]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy', href: '/minimal/privacy' },
              { label: 'Terms', href: '/minimal/privacy' },
              { label: 'Cookies', href: '/minimal/privacy' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: mono,
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: '#9B9B9B',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                className="hover:!text-[#050505]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
