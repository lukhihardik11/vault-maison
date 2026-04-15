'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { MinimalLayout } from './MinimalLayout'

interface MinimalPageProps {
  title: string
  subtitle?: string
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function MinimalPage({ title, subtitle, children, hideNav, hideFooter }: MinimalPageProps) {
  return (
    <MinimalLayout hideNav={hideNav} hideFooter={hideFooter}>
      {/* Page Header */}
      <section style={{ padding: '80px 5vw 40px' }} className="minimal-page-header">
        <div style={{ maxWidth: '800px' }}>
          <nav style={{ marginBottom: '24px' }}>
            <Link
              href="/minimal"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#050505',
                opacity: 0.4,
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
            <span style={{ margin: '0 8px', opacity: 0.2 }}>/</span>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#050505',
                opacity: 0.6,
              }}
            >
              {title}
            </span>
          </nav>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.7,
                marginTop: '12px',
                opacity: 0.6,
                maxWidth: '500px',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Page Content */}
      <section style={{ padding: '0 5vw 120px' }} className="minimal-page-content">
        {children}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-page-header { padding: 60px 20px 30px !important; }
          .minimal-page-content { padding: 0 20px 80px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
