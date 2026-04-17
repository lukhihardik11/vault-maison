'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { minimal } from '../design-system'
import { products } from '@/data/products'
import { categoryLabels, type ProductCategory } from '@/data/concepts'

const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Name A-Z']

export function MinimalCategory({ category }: { category?: string }) {
  const params = useParams()
  const slug = category || (params?.category as string)
  const catName = (slug && categoryLabels[slug as ProductCategory])
    ? categoryLabels[slug as ProductCategory]
    : slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'All'

  const [sort, setSort] = useState('Newest')
  const [showCount, setShowCount] = useState(12)

  const filtered = useMemo(() => {
    let items = slug ? products.filter((p) => p.category === slug) : products
    if (sort === 'Price: Low to High') items = [...items].sort((a, b) => a.price - b.price)
    else if (sort === 'Price: High to Low') items = [...items].sort((a, b) => b.price - a.price)
    else if (sort === 'Name A-Z') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [slug, sort])

  const visible = filtered.slice(0, showCount)
  const hasMore = showCount < filtered.length

  return (
    <MinimalLayout>
      {/* Header */}
      <section className={`${minimal.cn.section} pb-0`}>
        <div className={minimal.cn.container}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-12">
            <Link href="/minimal" className={`${minimal.cn.label} no-underline hover:text-[#050505] transition-colors`}>Home</Link>
            <span className={minimal.cn.label}>/</span>
            <Link href="/minimal/collections" className={`${minimal.cn.label} no-underline hover:text-[#050505] transition-colors`}>Collections</Link>
            <span className={minimal.cn.label}>/</span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#050505]">{catName}</span>
          </div>

          <div>
            <h1 className={minimal.cn.sectionHeadline}>{catName}</h1>
            <p className={`${minimal.cn.label} mt-3`}>{filtered.length} pieces</p>
          </div>
        </div>
      </section>

      {/* Filter/Sort Bar */}
      <section className="py-8">
        <div className={`${minimal.cn.container} flex justify-between items-center ${minimal.cn.divider} pb-6`} style={{ borderBottom: '1px solid #E5E5E5' }}>
          <div className="flex gap-6 overflow-x-auto minimal-filter-scroll">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSort(opt)}
                className="shrink-0 bg-transparent border-none cursor-pointer text-[11px] uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap"
                style={{
                  color: sort === opt ? '#050505' : '#9B9B9B',
                  fontWeight: sort === opt ? 500 : 400,
                  borderBottom: sort === opt ? '1px solid #050505' : '1px solid transparent',
                  paddingBottom: '4px',
                  padding: 0,
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <span className={minimal.cn.label}>{filtered.length} results</span>
        </div>
      </section>

      {/* Product Grid — NO ScrollReveal to avoid opacity/lazy-load conflicts */}
      <section className="pb-20 md:pb-32">
        <div className={minimal.cn.container}>
          {visible.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {visible.map((p) => (
                  <div key={p.id}>
                    <MinimalProductCard product={p} />
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={() => setShowCount((c) => c + 12)}
                    className={minimal.cn.btnSecondary}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className={minimal.cn.body}>No pieces found in this collection.</p>
              <Link href="/minimal/collections" className={`${minimal.cn.btnSecondary} mt-6 no-underline inline-flex`}>
                Browse All
              </Link>
            </div>
          )}
        </div>
      </section>
    </MinimalLayout>
  )
}
