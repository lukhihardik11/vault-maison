'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { MinimalLayout } from './MinimalLayout'
import { minimal } from './design-system'

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
      <section className={`${minimal.cn.section} pb-0`}>
        <div className={minimal.cn.container}>
          <nav className="flex items-center gap-2 mb-8">
            <Link href="/minimal" className={`${minimal.cn.label} no-underline hover:text-[#050505] transition-colors`}>Home</Link>
            <span className={minimal.cn.label}>/</span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#050505]">{title}</span>
          </nav>
          <h1 className={minimal.cn.sectionHeadline}>{title}</h1>
          {subtitle && (
            <p className={`${minimal.cn.body} mt-3 max-w-lg`}>{subtitle}</p>
          )}
        </div>
      </section>

      <section className="px-5 md:px-8 pb-20 md:pb-32 max-w-7xl mx-auto">
        {children}
      </section>
    </MinimalLayout>
  )
}
