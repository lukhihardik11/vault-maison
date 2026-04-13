'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type ProductCategory, categoryLabels, categoryDescriptions } from '@/data/concepts'
import { getProductsByCategory, type Product } from '@/data/products'
import { useWishlistStore } from '@/store/wishlist'
import { VaultLayout } from '../VaultLayout'
import { Heart, SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/vault/diamond-ring-dark-1.jpg',
  'gold-rings': '/images/vault/gold-flatlay-dark.jpg',
  'necklaces': '/images/vault/gold-necklace-dark-1.jpg',
  'earrings': '/images/vault/diamond-earring-dark-1.jpg',
  'bracelets': '/images/vault/gold-bracelets-dark-3.jpg',
  'watches': '/images/vault/diamond-macro-dark.jpg',
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'

export function VaultCategory({ category }: { category: string }) {
  const slug = category as ProductCategory
  const products = getProductsByCategory(slug)
  const label = categoryLabels[slug] || category.replace(/-/g, ' ')
  const desc = categoryDescriptions[slug] || ''
  const heroImg = categoryImages[slug] || '/images/vault/diamond-macro-dark.jpg'

  const [sort, setSort] = useState<SortOption>('featured')
  const [materialFilter, setMaterialFilter] = useState<string>('all')
  const [priceFilter, setPriceFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { items: wishlist, addItem: addWish, removeItem: removeWish } = useWishlistStore()

  const filtered = useMemo(() => {
    let result = [...products]
    if (materialFilter !== 'all') result = result.filter((p) => p.material === materialFilter)
    if (priceFilter === 'under5k') result = result.filter((p) => p.price < 5000)
    else if (priceFilter === '5k-10k') result = result.filter((p) => p.price >= 5000 && p.price <= 10000)
    else if (priceFilter === 'over10k') result = result.filter((p) => p.price > 10000)
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    return result
  }, [products, sort, materialFilter, priceFilter])

  return (
    <VaultLayout>
      {/* Hero */}
      <section style={{ position: 'relative', height: 400, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={heroImg} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 5, maxWidth: 1440, margin: '0 auto', width: '100%', padding: '0 24px 48px' }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(234,234,234,0.4)', marginBottom: 16 }}>
            <Link href="/vault" style={{ color: 'rgba(234,234,234,0.4)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/vault/collections" style={{ color: 'rgba(234,234,234,0.4)', textDecoration: 'none' }}>Collections</Link>
            <span>/</span>
            <span style={{ color: GOLD }}>{label}</span>
          </div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT }}>{label}</h1>
          {desc && <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', marginTop: 8, maxWidth: 600 }}>{desc}</p>}
        </div>
      </section>

      {/* Toolbar */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${MUTED}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: `1px solid ${MUTED}`, borderRadius: 4, padding: '8px 16px', color: TEXT, fontSize: 12, cursor: 'pointer', letterSpacing: '0.05em' }}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <span style={{ fontSize: 13, color: 'rgba(234,234,234,0.4)' }}>Showing {filtered.length} pieces</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            style={{ background: 'none', border: `1px solid ${MUTED}`, borderRadius: 4, padding: '8px 12px', color: TEXT, fontSize: 12, cursor: 'pointer', appearance: 'none', paddingRight: 28 }}
          >
            <option value="featured" style={{ background: BG }}>Featured</option>
            <option value="price-asc" style={{ background: BG }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: BG }}>Price: High to Low</option>
            <option value="newest" style={{ background: BG }}>Newest</option>
          </select>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setViewMode('grid')} style={{ padding: 8, background: viewMode === 'grid' ? 'rgba(212,175,55,0.1)' : 'none', border: 'none', borderRadius: 4, cursor: 'pointer', color: viewMode === 'grid' ? GOLD : 'rgba(234,234,234,0.4)' }}><Grid size={16} /></button>
            <button onClick={() => setViewMode('list')} style={{ padding: 8, background: viewMode === 'list' ? 'rgba(212,175,55,0.1)' : 'none', border: 'none', borderRadius: 4, cursor: 'pointer', color: viewMode === 'list' ? GOLD : 'rgba(234,234,234,0.4)' }}><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {filtersOpen && (
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px', display: 'flex', gap: 32, borderBottom: `1px solid ${MUTED}`, animation: 'vaultSlideUp 0.3s ease' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(234,234,234,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>Material</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['all', 'Diamond', 'Gold', 'Diamond & Gold', 'Platinum'].map((m) => (
                <button key={m} onClick={() => setMaterialFilter(m)} style={{
                  padding: '8px 16px', fontSize: 12, borderRadius: 4, cursor: 'pointer',
                  backgroundColor: materialFilter === m ? 'rgba(212,175,55,0.1)' : 'transparent',
                  border: materialFilter === m ? `1px solid ${GOLD}` : `1px solid ${MUTED}`,
                  color: materialFilter === m ? GOLD : 'rgba(234,234,234,0.6)',
                }}>
                  {m === 'all' ? 'All' : m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(234,234,234,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>Price Range</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: 'All' },
                { key: 'under5k', label: 'Under $5K' },
                { key: '5k-10k', label: '$5K - $10K' },
                { key: 'over10k', label: 'Over $10K' },
              ].map((p) => (
                <button key={p.key} onClick={() => setPriceFilter(p.key)} style={{
                  padding: '8px 16px', fontSize: 12, borderRadius: 4, cursor: 'pointer',
                  backgroundColor: priceFilter === p.key ? 'rgba(212,175,55,0.1)' : 'transparent',
                  border: priceFilter === p.key ? `1px solid ${GOLD}` : `1px solid ${MUTED}`,
                  color: priceFilter === p.key ? GOLD : 'rgba(234,234,234,0.6)',
                }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 24px 100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
          gap: viewMode === 'grid' ? 20 : 16,
        }}>
          {filtered.map((p) => {
            const isWished = wishlist.some((w) => w.id === p.id)
            return viewMode === 'grid' ? (
              <Link key={p.slug} href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  borderRadius: 8, overflow: 'hidden', backgroundColor: SURFACE,
                  border: '1px solid rgba(212,175,55,0.15)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.3s ease',
                }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)', transition: 'transform 0.6s ease' }} />
                    {p.isNew && <span style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', backgroundColor: GOLD, color: BG, fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>New</span>}
                    <button
                      onClick={(e) => { e.preventDefault(); isWished ? removeWish(p.id) : addWish(p) }}
                      style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Heart size={14} color={isWished ? GOLD : TEXT} fill={isWished ? GOLD : 'none'} />
                    </button>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{p.category.replace(/-/g, ' ')}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)', marginBottom: 12 }}>{p.subtitle}</div>
                    <div style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: TEXT }}>{p.priceDisplay}</div>
                  </div>
                </div>
              </Link>
            ) : (
              <Link key={p.slug} href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', gap: 24, padding: 16, borderRadius: 8,
                  border: '1px solid rgba(212,175,55,0.15)', backgroundColor: SURFACE,
                  transition: 'border-color 0.3s ease',
                }}>
                  <div style={{ width: 120, height: 120, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 4 }}>{p.category.replace(/-/g, ' ')}</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)', marginBottom: 8 }}>{p.subtitle}</div>
                    <div style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: TEXT }}>{p.priceDisplay}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 16, color: 'rgba(234,234,234,0.5)' }}>No pieces match your current filters.</p>
            <button onClick={() => { setMaterialFilter('all'); setPriceFilter('all') }} style={{ marginTop: 16, padding: '12px 24px', backgroundColor: GOLD, color: BG, border: 'none', borderRadius: 4, fontSize: 13, cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </VaultLayout>
  )
}
