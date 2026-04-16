'use client'

import Link from 'next/link'
import { AnimatedSocialIcons } from './ui'
import { MINIMAL } from './design-tokens'

const { colors, font } = MINIMAL

export function MinimalFooter() {
  const shopLinks = [
    { label: 'Diamond Rings', href: '/minimal/category/diamond-rings' },
    { label: 'Necklaces', href: '/minimal/category/diamond-necklaces' },
    { label: 'Earrings', href: '/minimal/category/diamond-earrings' },
    { label: 'Bracelets', href: '/minimal/category/diamond-bracelets' },
    { label: 'Gold Collection', href: '/minimal/category/gold-rings' },
  ]

  const aboutLinks = [
    { label: 'Our Story', href: '/minimal/about' },
    { label: 'Craftsmanship', href: '/minimal/craftsmanship' },
    { label: 'Journal', href: '/minimal/journal' },
    { label: 'Bespoke', href: '/minimal/bespoke' },
    { label: 'Certification', href: '/minimal/certification' },
  ]

  const helpLinks = [
    { label: 'Contact', href: '/minimal/contact' },
    { label: 'FAQ', href: '/minimal/faq' },
    { label: 'Shipping', href: '/minimal/shipping' },
    { label: 'Care Guide', href: '/minimal/care' },
    { label: 'Privacy', href: '/minimal/privacy' },
  ]

  const linkStyle: React.CSSProperties = {
    fontFamily: font,
    fontSize: '12px',
    fontWeight: 300,
    color: colors.textSecondary,
    textDecoration: 'none',
    transition: 'color 300ms ease',
    display: 'block',
    padding: '4px 0',
  }

  const headingStyle: React.CSSProperties = {
    fontFamily: font,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: colors.text,
    marginBottom: '16px',
  }

  return (
    <footer style={{ borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bg }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 5vw 40px' }}>
        {/* Top: 4 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          {/* Brand */}
          <div>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors.text, marginBottom: '12px' }}>
              VAULT MAISON
            </p>
            <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: colors.textSecondary, lineHeight: 1.7 }}>
              Precision-cut diamonds and fine gold jewelry. Every piece is GIA certified and crafted to last generations.
            </p>
          </div>
          {/* Shop */}
          <div>
            <p style={headingStyle}>Shop</p>
            {shopLinks.map((link) => (
              <Link key={link.href} href={link.href} style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary }}
              >{link.label}</Link>
            ))}
          </div>
          {/* About */}
          <div>
            <p style={headingStyle}>About</p>
            {aboutLinks.map((link) => (
              <Link key={link.href} href={link.href} style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary }}
              >{link.label}</Link>
            ))}
          </div>
          {/* Help */}
          <div>
            <p style={headingStyle}>Help</p>
            {helpLinks.map((link) => (
              <Link key={link.href} href={link.href} style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary }}
              >{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: colors.textSecondary }}>
            &copy; {new Date().getFullYear()} Vault Maison. All rights reserved.
          </span>
          <AnimatedSocialIcons size={36} />
          <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: colors.textSecondary }}>
            GIA Certified &middot; Ethically Sourced &middot; Lifetime Warranty
          </span>
        </div>
      </div>
    </footer>
  )
}
