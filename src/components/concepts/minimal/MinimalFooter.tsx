'use client'

import Link from 'next/link'
import { minimal } from './design-system'
import { NewsletterInput } from './ui/NewsletterInput'

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
        {/* Top section — Brand statement & Newsletter */}
        <div style={{ marginBottom: 'clamp(48px, 6vh, 72px)', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
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
          <div>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#6B6B6B', marginBottom: '16px', maxWidth: '300px' }}>
              Subscribe to receive updates on new collections, private events, and bespoke commissions.
            </p>
            <NewsletterInput />
          </div>
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
          {/* Shop */}
          <div>
            <h5
              style={{
                fontFamily: mono,
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050505',
                marginBottom: '24px',
              }}
            >
              Shop
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050505',
                marginBottom: '24px',
              }}
            >
              Information
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050505',
                marginBottom: '24px',
              }}
            >
              Services
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050505',
                marginBottom: '24px',
              }}
            >
              Contact
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #E5E5E5',
            paddingTop: '32px',
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
          <div style={{ display: 'flex', gap: '32px' }}>
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
      <style>{`
        .social-icon {
          color: #6B6B6B;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-icon:hover {
          color: #050505;
          transform: scale(1.15) translateY(-2px);
        }
      `}</style>
    </footer>
  )
}
