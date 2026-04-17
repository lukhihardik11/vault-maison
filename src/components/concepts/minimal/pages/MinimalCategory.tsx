'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { minimal } from '../design-system'
import { products } from '@/data/products'
import { categoryLabels, type ProductCategory } from '@/data/concepts'

const font = minimal.font.primary
const mono = minimal.font.mono

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
]

export function MinimalCategory({ category }: { category?: string }) {
  const params = useParams()
  const slug = category || (params?.category as string)
  const catName = (slug && categoryLabels[slug as ProductCategory])
    ? categoryLabels[slug as ProductCategory]
    : slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'All'

  const [sort, setSort] = useState('newest')
  const [showCount, setShowCount] = useState(12)

  const filtered = useMemo(() => {
    let items = slug ? products.filter((p) => p.category === slug) : products
    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    else if (sort === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [slug, sort])

  const visible = filtered.slice(0, showCount)
  const hasMore = showCount < filtered.length

  return (
    <MinimalLayout>
      {/* Header */}
      <div style={{ padding: 'clamp(48px, 8vh, 96px) 0 clamp(32px, 4vh, 48px)' }}>
        <div className={minimal.cn.container}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px' }}>
            <Link
              href="/minimal"
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8A8A8A',
                textDecoration: 'none',
              }}
              className="hover:!text-[#050505]"
            >
              Home
            </Link>
            <span style={{ fontFamily: mono, fontSize: '10px', color: '#ABABAB' }}>/</span>
            <Link
              href="/minimal/collections"
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8A8A8A',
                textDecoration: 'none',
              }}
              className="hover:!text-[#050505]"
            >
              Collections
            </Link>
            <span style={{ fontFamily: mono, fontSize: '10px', color: '#ABABAB' }}>/</span>
            <span
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#050505',
                fontWeight: 500,
              }}
            >
              {catName}
            </span>
          </div>

          <h1
            style={{
              fontFamily: font,
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#050505',
              margin: 0,
            }}
          >
            {catName}
          </h1>
          <p
            style={{
              fontFamily: mono,
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#8A8A8A',
              marginTop: '12px',
            }}
          >
            {filtered.length} {filtered.length === 1 ? 'Piece' : 'Pieces'}
          </p>
        </div>
      </div>

      {/* Sort Bar */}
      <div className={minimal.cn.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #E8E8E8',
            borderBottom: '1px solid #E8E8E8',
            padding: '16px 0',
            marginBottom: 'clamp(32px, 4vh, 48px)',
          }}
        >
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                style={{
                  fontFamily: mono,
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  color: sort === opt.value ? '#050505' : '#8A8A8A',
                  fontWeight: sort === opt.value ? 500 : 400,
                  borderBottom: sort === opt.value ? '1px solid #050505' : '1px solid transparent',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <span
            style={{
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#8A8A8A',
            }}
          >
            {filtered.length} Results
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className={minimal.cn.container} style={{ paddingBottom: 'clamp(64px, 10vh, 120px)' }}>
        {visible.length > 0 ? (
          <>
            <div className={minimal.cn.gridProduct}>
              {visible.map((p) => (
                <div key={p.id}>
                  <MinimalProductCard product={p} />
                </div>
              ))}
            </div>
            {hasMore && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '64px' }}>
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
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <p
              style={{
                fontFamily: font,
                fontSize: '18px',
                fontWeight: 300,
                color: '#8A8A8A',
              }}
            >
              No pieces found in this collection.
            </p>
            <Link
              href="/minimal/collections"
              className={`${minimal.cn.btnPrimary} no-underline mt-8 inline-flex`}
            >
              Browse Collections
            </Link>
          </div>
        )}
      </div>
    </MinimalLayout>
  )
}
