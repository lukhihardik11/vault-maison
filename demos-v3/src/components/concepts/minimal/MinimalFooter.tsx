'use client'

import Link from 'next/link'

export function MinimalFooter() {
  const links = [
    { label: 'Contact', href: '/minimal/contact' },
    { label: 'Shipping', href: '/minimal/shipping' },
    { label: 'Privacy', href: '/minimal/privacy' },
    { label: 'FAQ', href: '/minimal/faq' },
  ]

  return (
    <footer
      style={{
        borderTop: '1px solid #E5E5E5',
        padding: '40px 5vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: '#050505',
            opacity: 0.4,
          }}
        >
          &copy; {new Date().getFullYear()} Vault Maison
        </span>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 400,
                color: '#050505',
                opacity: 0.4,
                textDecoration: 'none',
                transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
