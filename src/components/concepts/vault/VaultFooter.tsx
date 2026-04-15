'use client'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const GOLD = '#D4AF37'
const MUTED = '#333333'

const footerLinks = {
  Collections: [
    { label: 'Diamond Rings', href: '/vault/category/diamond-rings' },
    { label: 'Gold Rings', href: '/vault/category/gold-rings' },
    { label: 'Necklaces', href: '/vault/category/necklaces' },
    { label: 'Earrings', href: '/vault/category/earrings' },
    { label: 'Bracelets', href: '/vault/category/bracelets' },
  ],
  Services: [
    { label: 'Bespoke', href: '/vault/bespoke' },
    { label: 'Craftsmanship', href: '/vault/craftsmanship' },
    { label: 'Diamond Grading', href: '/vault/grading' },
    { label: 'Care Guide', href: '/vault/care' },
  ],
  Company: [
    { label: 'About', href: '/vault/about' },
    { label: 'Journal', href: '/vault/journal' },
    { label: 'Contact', href: '/vault/contact' },
    { label: 'FAQ', href: '/vault/faq' },
  ],
  Legal: [
    { label: 'Privacy', href: '/vault/privacy' },
    { label: 'Shipping', href: '/vault/shipping' },
  ],
}

export function VaultFooter() {
  return (
    <footer style={{ backgroundColor: '#050505', borderTop: `1px solid ${MUTED}` }}>
      {/* Newsletter Section */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '64px 24px 48px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ maxWidth: 400 }}>
            <h3
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 24,
                fontWeight: 500,
                color: GOLD,
                letterSpacing: '0.1em',
                marginBottom: 12,
              }}
            >
              THE VAULT
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(234,234,234,0.5)', marginBottom: 24 }}>
              Access to the world&apos;s most extraordinary diamonds and fine jewelry. Each piece curated for those who demand nothing less than perfection.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${MUTED}`,
                  borderRadius: 4,
                  color: '#EAEAEA',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: GOLD,
                  color: '#0A0A0A',
                  border: 'none',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(234,234,234,0.4)',
                  marginBottom: 16,
                }}
              >
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      fontSize: 13,
                      color: 'rgba(234,234,234,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(234,234,234,0.5)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: `1px solid ${MUTED}`,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(234,234,234,0.3)' }}>
          &copy; {new Date().getFullYear()} Vault Maison. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Instagram', 'Pinterest', 'WhatsApp'].map((social) => (
            <a
              key={social}
              href="#"
              style={{
                fontSize: 12,
                color: 'rgba(234,234,234,0.4)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(234,234,234,0.4)')}
            >
              {social} <ArrowUpRight size={10} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
