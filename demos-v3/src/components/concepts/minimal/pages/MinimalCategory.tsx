'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory, type Product } from '@/data/products'
import { Grid3X3, LayoutList, SlidersHorizontal, ChevronDown, X, Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'
type ViewMode = 'grid' | 'list'

interface Props { category: ProductCategory }

export function MinimalCategory({ category }: Props) {
  const allProducts = getProductsByCategory(category)
  const label = categoryLabels[category]
  const description = categoryDescriptions[category]

  const [sort, setSort] = useState<SortOption>('featured')
  const [view, setView] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all')
  const { toggleItem, isInWishlist } = useWishlistStore()

  const materials = useMemo(() => {
    const mats = new Set(allProducts.map(p => p.material))
    return ['all', ...Array.from(mats)]
  }, [allProducts])

  const products = useMemo(() => {
    let filtered = allProducts.filter(p => {
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false
      if (selectedMaterial !== 'all' && p.material !== selectedMaterial) return false
      return true
    })
    switch (sort) {
      case 'price-asc': return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...filtered].sort((a, b) => b.price - a.price)
      case 'newest': return [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      default: return filtered
    }
  }, [allProducts, sort, priceRange, selectedMaterial])

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '40px 5vw 0', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: font, fontSize: '11px', color: '#8B8B8B', marginBottom: '40px' }}>
          <Link href="/minimal" style={{ color: '#8B8B8B', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/minimal/collections" style={{ color: '#8B8B8B', textDecoration: 'none' }}>Collections</Link>
          <span>/</span>
          <span style={{ color: '#1A1A1A' }}>{label}</span>
        </nav>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontFamily: font, fontSize: '36px', fontWeight: 200, color: '#1A1A1A', marginBottom: '8px' }}>{label}</h1>
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#8B8B8B', maxWidth: '500px' }}>{description}</p>
          </div>
          <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#8B8B8B' }}>
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '1px solid #E8E5E0', borderBottom: '1px solid #E8E5E0', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button onClick={() => setShowFilters(!showFilters)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', background: 'none', border: 'none', cursor: 'pointer' }}>
              <SlidersHorizontal size={14} /> Filters {showFilters && <X size={12} />}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Sort */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <label style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B8B8B' }}>Sort:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#1A1A1A', background: 'none', border: 'none', cursor: 'pointer', appearance: 'none', paddingRight: '16px' }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown size={12} style={{ color: '#8B8B8B', position: 'absolute', right: 0, pointerEvents: 'none' }} />
            </div>
            {/* View Toggle */}
            <div style={{ display: 'flex', gap: '4px', borderLeft: '1px solid #E8E5E0', paddingLeft: '16px' }}>
              <button onClick={() => setView('grid')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', opacity: view === 'grid' ? 1 : 0.3 }}><Grid3X3 size={16} /></button>
              <button onClick={() => setView('list')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', opacity: view === 'list' ? 1 : 0.3 }}><LayoutList size={16} /></button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div style={{ display: 'flex', gap: '40px', padding: '24px 0', borderBottom: '1px solid #E8E5E0', marginBottom: '40px' }}>
            <div>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px' }}>Material</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {materials.map(m => (
                  <button key={m} onClick={() => setSelectedMaterial(m)} style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, padding: '8px 14px', border: selectedMaterial === m ? '1px solid #1A1A1A' : '1px solid #E8E5E0', backgroundColor: selectedMaterial === m ? '#1A1A1A' : 'transparent', color: selectedMaterial === m ? '#FFF' : '#1A1A1A', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 200ms ease' }}>
                    {m === 'all' ? 'All' : m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px' }}>Price Range</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { label: 'All', range: [0, 100000] as [number, number] },
                  { label: 'Under $5K', range: [0, 5000] as [number, number] },
                  { label: '$5K-$15K', range: [5000, 15000] as [number, number] },
                  { label: '$15K+', range: [15000, 100000] as [number, number] },
                ].map(f => (
                  <button key={f.label} onClick={() => setPriceRange(f.range)} style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, padding: '8px 14px', border: priceRange[0] === f.range[0] && priceRange[1] === f.range[1] ? '1px solid #1A1A1A' : '1px solid #E8E5E0', backgroundColor: priceRange[0] === f.range[0] && priceRange[1] === f.range[1] ? '#1A1A1A' : 'transparent', color: priceRange[0] === f.range[0] && priceRange[1] === f.range[1] ? '#FFF' : '#1A1A1A', cursor: 'pointer', transition: 'all 200ms ease' }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Product Grid / List */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '1400px', margin: '0 auto' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 300, color: '#8B8B8B' }}>No pieces match your filters.</p>
            <button onClick={() => { setPriceRange([0, 100000]); setSelectedMaterial('all') }} style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#C4A265', background: 'none', border: 'none', cursor: 'pointer', marginTop: '12px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Clear all filters</button>
          </div>
        ) : view === 'grid' ? (
          <div className="vm-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} toggleItem={toggleItem} isInWishlist={isInWishlist(p.id)} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {products.map((p) => (
              <ProductListItem key={p.id} product={p} toggleItem={toggleItem} isInWishlist={isInWishlist(p.id)} />
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 1024px) { .vm-cat-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .vm-cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </MinimalLayout>
  )
}

function ProductCard({ product, toggleItem, isInWishlist }: { product: Product; toggleItem: (p: Product) => void; isInWishlist: boolean }) {
  return (
    <div style={{ position: 'relative' }}>
      <Link href={`/minimal/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="vm-pcard-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '12px', overflow: 'hidden' }}>
          <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover', transition: 'transform 600ms ease' }} unoptimized />
          {product.isNew && (
            <span style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', backgroundColor: 'rgba(250,250,248,0.92)', padding: '4px 10px' }}>New</span>
          )}
        </div>
        <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A', marginBottom: '2px' }}>{product.name}</p>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#8B8B8B', marginBottom: '6px' }}>{product.subtitle}</p>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{product.priceDisplay}</p>
      </Link>
      <button onClick={(e) => { e.preventDefault(); toggleItem(product) }} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(250,250,248,0.9)', border: 'none', cursor: 'pointer', zIndex: 2 }}>
        <Heart size={14} fill={isInWishlist ? '#C4A265' : 'none'} color={isInWishlist ? '#C4A265' : '#8B8B8B'} />
      </button>
      <style>{`.vm-pcard-img:hover img { transform: scale(1.04) !important; }`}</style>
    </div>
  )
}

function ProductListItem({ product, toggleItem, isInWishlist }: { product: Product; toggleItem: (p: Product) => void; isInWishlist: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '24px', padding: '16px 0', borderBottom: '1px solid #F5F4F0' }}>
      <Link href={`/minimal/product/${product.slug}`} style={{ position: 'relative', width: '120px', height: '120px', backgroundColor: '#F5F4F0', flexShrink: 0, overflow: 'hidden' }}>
        <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} unoptimized />
      </Link>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Link href={`/minimal/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{product.name}</p>
          <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#8B8B8B', marginBottom: '8px' }}>{product.subtitle}</p>
        </Link>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#8B8B8B', marginBottom: '4px' }}>{product.material}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '12px' }}>
        <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#1A1A1A' }}>{product.priceDisplay}</p>
        <button onClick={() => toggleItem(product)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Heart size={16} fill={isInWishlist ? '#C4A265' : 'none'} color={isInWishlist ? '#C4A265' : '#8B8B8B'} />
        </button>
      </div>
    </div>
  )
}
