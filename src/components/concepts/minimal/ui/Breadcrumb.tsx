'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { minimal } from '../design-system'

const font = minimal.font.primary

export function Breadcrumb() {
  const pathname = usePathname()
  
  if (!pathname || pathname === '/minimal') return null
  
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length <= 1) return null

  // Skip the first segment if it's 'minimal' for display, but keep for links
  const displaySegments = segments.slice(1)

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px clamp(24px, 3vw, 64px) 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Link
        href="/minimal"
        className="minimal-breadcrumb-link"
        style={{
          fontFamily: font,
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#9B9B9B',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
        }}
      >
        Home
      </Link>
      
      {displaySegments.map((segment, index) => {
        const isLast = index === displaySegments.length - 1
        const href = `/${segments.slice(0, index + 2).join('/')}`
        const label = segment.replace(/-/g, ' ')

        return (
          <div key={href} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChevronRight size={10} style={{ color: '#E5E5E5' }} />
            {isLast ? (
              <span
                style={{
                  fontFamily: font,
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#050505',
                }}
              >
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="minimal-breadcrumb-link"
                style={{
                  fontFamily: font,
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#9B9B9B',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
