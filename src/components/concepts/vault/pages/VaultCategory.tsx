'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type ProductCategory, categoryLabels, categoryDescriptions } from '@/data/concepts'
import { getProductsByCategory, type Product } from '@/data/products'
import { useWishlistStore } from '@/store/wishlist'
import { VaultLayout } from '../VaultLayout'
import { Heart, SlidersHorizontal, Grid, List, Search } from 'lucide-react'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'
import { VaultProductRevealCard } from '../ui/VaultProductRevealCard'

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
  const [searchQuery, setSearchQuery] = useState('')

  const { items: wishlist, addItem: addWish, removeItem: removeWish } = useWishlistStore()

  const filtered = useMemo(() => {
    let result = [...products]
    if (searchQuery) result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    if (materialFilter !== 'all') result = result.filter((p) => p.material === materialFilter)
    if (priceFilter === 'under5k') result = result.filter((p) => p.price < 5000)
    else if (priceFilter === '5k-10k') result = result.filter((p) => p.price >= 5000 && p.price <= 10000)
    else if (priceFilter === 'over10k') result = result.filter((p) => p.price > 10000)
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    return result
  }, [products, sort, materialFilter, priceFilter, searchQuery])

  return (
    <VaultLayout>
      {/* Hero */}
      <section style={{ position: 'relative', height: 420, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={heroImg} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 5, maxWidth: 1440, margin: '0 auto', width: '100%', padding: '0 24px 48px' }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(234,234,234,0.35)', marginBottom: 16 }}>
            <Link href="/vault" style={{ color: 'rgba(234,234,234,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link>
            <span>/</span>
            <Link href="/vault/collections" style={{ color: 'rgba(234,234,234,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}>Collections</Link>
            <span>/</span>
            <span style={{ color: GOLD }}>{label}</span>
          </div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: TEXT, margin: 0 }}>{label}</h1>
          {desc && <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.45)', marginTop: 10, maxWidth: 600, lineHeight: 1.7 }}>{desc}</p>}
        </div>
      </section>

      {/* Search */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '28px 24px 0' }}>
        <DarkNeumorphicInput
          placeholder="Search this collection..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Toolbar */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: filtersOpen ? 'rgba(212,175,55,0.06)' : 'none',
              border: `1px solid ${filtersOpen ? 'rgba(212,175,55,0.2)' : MUTED}`,
              borderRadius: 6, padding: '8px 18px', color: filtersOpen ? GOLD : TEXT,
              fontSize: 12, cursor: 'pointer', letterSpacing: '0.08em',
              transition: 'all 0.3s ease',
            }}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <span style={{ fontSize: 13, color: 'rgba(234,234,234,0.35)' }}>Showing {filtered.length} pieces</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            style={{
              background: 'none', border: `1px solid ${MUTED}`, borderRadius: 6,
              padding: '8px 14px', color: TEXT, fontSize: 12, cursor: 'pointer',
              appearance: 'none', paddingRight: 28,
            }}
          >
            <option value="featured" style={{ background: BG }}>Featured</option>
            <option value="price-asc" style={{ background: BG }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: BG }}>Price: High to Low</option>
            <option value="newest" style={{ background: BG }}>Newest</option>
          </select>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setViewMode('grid')} style={{
              padding: 8, borderRadius: 6, border: 'none', cursor: 'pointer',
              background: viewMode === 'grid' ? 'rgba(212,175,55,0.1)' : 'none',
              color: viewMode === 'grid' ? GOLD : 'rgba(234,234,234,0.35)',
              transition: 'all 0.3s ease',
            }}><Grid size={16} /></button>
            <button onClick={() => setViewMode('list')} style={{
              padding: 8, borderRadius: 6, border: 'none', cursor: 'pointer',
              background: viewMode === 'list' ? 'rgba(212,175,55,0.1)' : 'none',
              color: viewMode === 'list' ? GOLD : 'rgba(234,234,234,0.35)',
              transition: 'all 0.3s ease',
            }}><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {filtersOpen && (
        <div style={{
          maxWidth: 1440, margin: '0 auto', padding: '24px',
          display: 'flex', gap: 40,
          borderBottom: '1px solid rgba(212,175,55,0.08)',
          animation: 'vaultSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <style jsx>{`
            @keyframes vaultSlideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 12 }}>Material</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['all', 'Diamond', 'Gold', 'Diamond & Gold', 'Platinum'].map((m) => (
                <button key={m} onClick={() => setMaterialFilter(m)} style={{
                  padding: '8px 18px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
                  backgroundColor: materialFilter === m ? 'rgba(212,175,55,0.08)' : 'transparent',
                  border: materialFilter === m ? `1px solid rgba(212,175,55,0.3)` : `1px solid ${MUTED}`,
                  color: materialFilter === m ? GOLD : 'rgba(234,234,234,0.5)',
                  transition: 'all 0.3s ease',
                }}>
                  {m === 'all' ? 'All' : m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 12 }}>Price Range</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: 'All' },
                { key: 'under5k', label: 'Under $5K' },
                { key: '5k-10k', label: '$5K - $10K' },
                { key: 'over10k', label: 'Over $10K' },
              ].map((p) => (
                <button key={p.key} onClick={() => setPriceFilter(p.key)} style={{
                  padding: '8px 18px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
                  backgroundColor: priceFilter === p.key ? 'rgba(212,175,55,0.08)' : 'transparent',
                  border: priceFilter === p.key ? `1px solid rgba(212,175,55,0.3)` : `1px solid ${MUTED}`,
                  color: priceFilter === p.key ? GOLD : 'rgba(234,234,234,0.5)',
                  transition: 'all 0.3s ease',
                }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid — using VaultProductRevealCard for grid, enhanced list for list */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 24px 120px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
          gap: viewMode === 'grid' ? 24 : 16,
        }}>
          {filtered.map((p) => {
            const isWished = wishlist.some((w) => w.id === p.id)
            return viewMode === 'grid' ? (
              <VaultProductRevealCard
                key={p.slug}
                name={p.name}
                price={p.priceDisplay}
                image={p.images[0]}
                description={p.description?.slice(0, 140) || p.subtitle}
                category={p.category.replace(/-/g, ' ')}
                href={`/vault/product/${p.slug}`}
                isNew={p.isNew}
                onFavorite={() => isWished ? removeWish(p.id) : addWish(p)}
              />
            ) : (
              <Link key={p.slug} href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', gap: 24, padding: 20, borderRadius: 10,
                  border: '1px solid rgba(212,175,55,0.1)', backgroundColor: SURFACE,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <div style={{ width: 140, height: 140, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{p.category.replace(/-/g, ' ')}</div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: TEXT, marginBottom: 4, fontFamily: 'Cinzel, serif' }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(234,234,234,0.45)', marginBottom: 10, lineHeight: 1.6 }}>{p.subtitle}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 18, fontFamily: 'Cinzel, serif', color: TEXT }}>{p.priceDisplay}</span>
                      {p.isNew && <span style={{ padding: '3px 10px', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, fontSize: 9, color: GOLD, letterSpacing: '0.15em', textTransform: 'uppercase' }}>New</span>}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); isWished ? removeWish(p.id) : addWish(p) }}
                    style={{
                      alignSelf: 'center', width: 40, height: 40, borderRadius: '50%',
                      backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Heart size={16} color={isWished ? GOLD : 'rgba(234,234,234,0.4)'} fill={isWished ? GOLD : 'none'} />
                  </button>
                </div>
              </Link>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ fontSize: 16, color: 'rgba(234,234,234,0.45)', marginBottom: 20 }}>No pieces match your current filters.</p>
            <SparkleGlowButton onClick={() => { setMaterialFilter('all'); setPriceFilter('all'); setSearchQuery('') }}>
              Clear All Filters
            </SparkleGlowButton>
          </div>
        )}
      </div>
    </VaultLayout>
  )
}
