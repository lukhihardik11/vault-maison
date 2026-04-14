'use client'
import React, { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierCard } from '../ui/AtelierCard'
import { AtelierButton } from '../ui/AtelierButton'
import { getProductsByCategory } from '@/data/products'
import { allCategories, categoryLabels, type ProductCategory } from '@/data/concepts'

const artisanNames = ['Elena M.', 'Thomas A.', 'Yuki T.', 'Marie D.']

export function AtelierCategory() {
  const params = useParams()
  const categorySlug = params.category as string
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')

  const categoryLabel = categoryLabels[categorySlug as keyof typeof categoryLabels] || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const products = useMemo(() => getProductsByCategory(categorySlug as ProductCategory), [categorySlug])

  const sorted = useMemo(() => {
    const arr = [...products]
    if (sortBy === 'price-asc') arr.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') arr.sort((a, b) => b.price - a.price)
    return arr
  }, [products, sortBy])

  return (
    <AtelierLayout>
      {/* Header */}
      <section style={{ padding: '80px 32px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24 }}>
            <Link href="/atelier" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none' }}>Workshop</Link>
            <span style={{ color: A.sketch }}>→</span>
            <Link href="/atelier/collections" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none' }}>Collections</Link>
            <span style={{ color: A.sketch }}>→</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.accent }}>{categoryLabel}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: A.ink, margin: '0 0 8px', textTransform: 'capitalize' }}>
                {categoryLabel}
              </h1>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft }}>
                {sorted.length} piece{sorted.length !== 1 ? 's' : ''} — each handcrafted in our London workshop
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['featured', 'price-asc', 'price-desc'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  style={{
                    padding: '6px 14px', border: `1px solid ${sortBy === s ? A.accent : A.border}`,
                    background: sortBy === s ? 'rgba(139,105,20,0.06)' : 'transparent',
                    color: sortBy === s ? A.accent : A.textSoft,
                    fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    cursor: 'pointer', borderRadius: 2, transition: 'all 0.3s',
                  }}
                >
                  {s === 'featured' ? 'Featured' : s === 'price-asc' ? 'Price ↑' : 'Price ↓'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft }}>
                No pieces in this category yet. Our artisans are at work.
              </p>
              <AtelierButton href="/atelier/collections" style={{ marginTop: 24 }}>Browse All</AtelierButton>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {sorted.map((p, i) => (
                <AtelierCard
                  key={p.slug}
                  title={p.name}
                  subtitle={p.subtitle || p.category.replace(/-/g, ' ')}
                  price={`£${p.price.toLocaleString()}`}
                  image={p.images?.[0]}
                  href={`/atelier/product/${p.slug}`}
                  artisan={artisanNames[i % artisanNames.length]}
                  badge={p.isNew ? 'New from the bench' : p.isBestseller ? 'Workshop favourite' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </AtelierLayout>
  )
}
