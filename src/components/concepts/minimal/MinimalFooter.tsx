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
    <footer style={{ borderTop: '1px solid #E8E8E8', backgroundColor: '#FFFFFF' }}>
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
          {/* Shop */}
          <div>
            <h5
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#8A8A8A',
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
                      color: '#555555',
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
                color: '#8A8A8A',
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
                      color: '#555555',
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
                color: '#8A8A8A',
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
                      color: '#555555',
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
                color: '#8A8A8A',
                marginBottom: '20px',
              }}
            >
              Contact
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#555555', margin: 0 }}>
                +1 (212) 555-0174
              </p>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#555555', margin: 0 }}>
                concierge@minimalmachine.com
              </p>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#555555', margin: 0, lineHeight: 1.6 }}>
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
            borderTop: '1px solid #E8E8E8',
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
              color: '#ABABAB',
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Minimal Machine. All rights reserved.
          </p>
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
                  color: '#ABABAB',
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
