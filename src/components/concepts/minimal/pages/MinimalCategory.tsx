'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { MinimalProductCard } from '../MinimalProductCard'
import { products } from '@/data/products'
import { categoryLabels, type ProductCategory } from '@/data/concepts'
import { SmoothDrawer } from '../ui'
import { MINIMAL } from '../design-tokens'
import { ScrollReveal } from '../ScrollReveal'

const { colors, font } = MINIMAL

const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/minimal-engagement-ring.jpg',
  'diamond-necklaces': '/images/minimal-necklace-pendant.jpg',
  'diamond-earrings': '/images/minimal-diamond-studs.jpg',
  'diamond-bracelets': '/images/minimal-tennis-bracelet.jpg',
  'gold-rings': '/images/products/classic-gold-ring.jpg',
  'gold-necklaces': '/images/products/gold-chain-necklace.jpg',
  'gold-earrings': '/images/products/gold-hoop-earrings.jpg',
  'gold-bracelets': '/images/products/gold-bangle-bracelet.jpg',
  'wedding-bridal': '/images/minimal-wedding-rings.jpg',
  'loose-diamonds': '/images/minimal-loose-diamond.jpg',
}

const materialFilters = ['All', 'Diamond', 'Gold', 'Diamond & Gold', 'Platinum']
const priceFilters = ['All', 'Under $5,000', '$5,000-$10,000', '$10,000-$20,000', 'Over $20,000']
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Name A-Z']

export function MinimalCategory({ category }: { category?: string }) {
  const params = useParams()
  const slug = category || (params?.category as string)
  const catName = (slug && categoryLabels[slug as ProductCategory]) ? categoryLabels[slug as ProductCategory] : slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'All'

  const [material, setMaterial] = useState('All')
  const [price, setPrice] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let items = slug ? products.filter((p) => p.category === slug) : products
    if (material !== 'All') items = items.filter((p) => p.material === material)
    if (price !== 'All') {
      if (price === 'Under $5,000') items = items.filter((p) => p.price < 5000)
      else if (price === '$5,000-$10,000') items = items.filter((p) => p.price >= 5000 && p.price <= 10000)
      else if (price === '$10,000-$20,000') items = items.filter((p) => p.price >= 10000 && p.price <= 20000)
      else if (price === 'Over $20,000') items = items.filter((p) => p.price > 20000)
    }
    if (sort === 'Price: Low to High') items = [...items].sort((a, b) => a.price - b.price)
    else if (sort === 'Price: High to Low') items = [...items].sort((a, b) => b.price - a.price)
    else if (sort === 'Name A-Z') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [slug, material, price, sort])

  const hasActiveFilters = material !== 'All' || price !== 'All'

  return (
    <MinimalLayout>
      {/* Minimal category header — no hero image, just typography */}
      <section style={{ padding: '60px 5vw 40px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <Link href="/minimal" style={{ color: colors.textSecondary, textDecoration: 'none' }} className="mn-underline-hover">Home</Link>
          <span>/</span>
          <Link href="/minimal/collections" style={{ color: colors.textSecondary, textDecoration: 'none' }} className="mn-underline-hover">Collections</Link>
          <span>/</span>
          <span style={{ color: colors.text }}>{catName}</span>
        </div>

        <ScrollReveal>
          <h1 style={{ fontFamily: font, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 200, color: colors.text, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px' }}>
            {catName}
          </h1>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: colors.textSecondary, maxWidth: '480px' }}>
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </p>
        </ScrollReveal>
      </section>

      {/* Filter / Sort bar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setFilterOpen(true)} style={{
              display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text,
              background: 'none', border: `1px solid ${colors.border}`, padding: '8px 16px', cursor: 'pointer',
              transition: 'all 200ms ease',
            }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
            {hasActiveFilters && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {material !== 'All' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '10px', fontWeight: 400, color: colors.text, padding: '4px 10px', border: `1px solid ${colors.border}` }}>
                    {material}
                    <button onClick={() => setMaterial('All')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: colors.text, display: 'flex' }}><X size={10} /></button>
                  </span>
                )}
                {price !== 'All' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '10px', fontWeight: 400, color: colors.text, padding: '4px 10px', border: `1px solid ${colors.border}` }}>
                    {price}
                    <button onClick={() => setPrice('All')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: colors.text, display: 'flex' }}><X size={10} /></button>
                  </span>
                )}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.textSecondary }}>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{
              fontFamily: font, fontSize: '11px', fontWeight: 400, color: colors.text,
              background: 'none', border: `1px solid ${colors.border}`, padding: '8px 12px', cursor: 'pointer',
              appearance: 'none', paddingRight: '28px',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23050505' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
            }}>
              {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid — 3 columns */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw 80px' }}>
        {filtered.length > 0 ? (
          <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} delay={Math.min(i * 60, 300)}>
                <MinimalProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 300, color: colors.textSecondary }}>No pieces match your filters.</p>
            <button onClick={() => { setMaterial('All'); setPrice('All') }} className="mn-underline-hover" style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: colors.text, background: 'none', border: 'none', cursor: 'pointer', marginTop: '12px' }}>Clear all filters</button>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <SmoothDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} title="Filters" side="right">
        <div style={{ fontFamily: font }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text, marginBottom: '12px' }}>Material</p>
            {materialFilters.map((m) => (
              <button key={m} onClick={() => setMaterial(m)} style={{
                display: 'block', width: '100%', fontFamily: font, fontSize: '12px',
                fontWeight: material === m ? 500 : 300,
                color: material === m ? colors.text : colors.textSecondary,
                background: material === m ? colors.hover : 'transparent',
                border: 'none', padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                transition: 'all 200ms ease', marginBottom: '2px',
              }}>{m}</button>
            ))}
          </div>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text, marginBottom: '12px' }}>Price Range</p>
            {priceFilters.map((p) => (
              <button key={p} onClick={() => setPrice(p)} style={{
                display: 'block', width: '100%', fontFamily: font, fontSize: '12px',
                fontWeight: price === p ? 500 : 300,
                color: price === p ? colors.text : colors.textSecondary,
                background: price === p ? colors.hover : 'transparent',
                border: 'none', padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                transition: 'all 200ms ease', marginBottom: '2px',
              }}>{p}</button>
            ))}
          </div>
          <button onClick={() => setFilterOpen(false)} style={{
            width: '100%', fontFamily: font, fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px',
            backgroundColor: colors.text, color: colors.bg, border: 'none', cursor: 'pointer',
            transition: 'opacity 200ms',
          }}>Apply Filters</button>
        </div>
      </SmoothDrawer>

      <style>{`
        @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </MinimalLayout>
  )
}
