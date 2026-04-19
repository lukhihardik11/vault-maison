'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { minimal } from '../design-system'

export function Breadcrumb() {
  const pathname = usePathname()
  
  if (!pathname || pathname === '/minimal') return null

  const paths = pathname.split('/').filter(p => p && p !== 'minimal')
  
  if (paths.length === 0) return null

  return (
    <nav 
      aria-label="Breadcrumb"
      style={{
        padding: '24px clamp(24px, 3vw, 64px)',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: minimal.font.primary,
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      <Link 
        href="/minimal"
        style={{ color: '#9B9B9B', textDecoration: 'none', transition: 'color 0.2s ease' }}
        className="hover:!text-[#050505]"
      >
        Home
      </Link>
      
      {paths.map((path, i) => {
        const href = '/minimal/' + paths.slice(0, i + 1).join('/')
        const isLast = i === paths.length - 1
        const label = path.replace(/-/g, ' ')

        return (
          <div key={path} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChevronRight size={10} style={{ color: '#E5E5E5' }} />
            {isLast ? (
              <span style={{ color: '#050505' }}>{label}</span>
            ) : (
              <Link 
                href={href}
                style={{ color: '#9B9B9B', textDecoration: 'none', transition: 'color 0.2s ease' }}
                className="hover:!text-[#050505]"
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
