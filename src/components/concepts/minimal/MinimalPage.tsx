'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { MinimalLayout } from './MinimalLayout'
import { MINIMAL } from './design-tokens'

const { colors, font } = MINIMAL

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
          <nav style={{ marginBottom: '24px', fontFamily: font, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            <Link
              href="/minimal"
              className="mn-underline-hover"
              style={{
                color: colors.textSecondary,
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
            <span style={{ margin: '0 8px', color: colors.textSecondary }}>/</span>
            <span style={{ color: colors.text }}>
              {title}
            </span>
          </nav>
          <h1
            style={{
              fontFamily: font,
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
              color: colors.text,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontFamily: font,
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.7,
                marginTop: '12px',
                color: colors.textSecondary,
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
