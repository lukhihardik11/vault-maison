'use client'
import { useState, useMemo } from 'react'
import { products } from '@/data/products'
import { VaultLayout } from '../VaultLayout'
import { Search } from 'lucide-react'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'
import { VaultProductRevealCard } from '../ui/VaultProductRevealCard'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Find Your Piece</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: TEXT, marginTop: 10, marginBottom: 28 }}>Search</h1>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <DarkNeumorphicInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search diamonds, rings, necklaces..."
            />
          </div>
        </div>

        {!query && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(234,234,234,0.35)', marginBottom: 20, letterSpacing: '0.05em' }}>Popular Searches</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Diamond Rings', 'Gold Necklaces', 'Engagement', 'Earrings', 'Platinum'].map((t) => (
                <button key={t} onClick={() => setQuery(t)} style={{
                  padding: '10px 20px', backgroundColor: 'rgba(212,175,55,0.04)',
                  border: '1px solid rgba(212,175,55,0.1)',
                  borderRadius: 24, color: TEXT, fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.3s ease', letterSpacing: '0.03em',
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div>
            <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.35)', marginBottom: 28 }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {results.map((p) => (
                <VaultProductRevealCard
                  key={p.id}
                  name={p.name}
                  price={`$${p.price.toLocaleString()}`}
                  image={p.images[0]}
                  description={p.description?.slice(0, 120) || p.subtitle}
                  category={p.category.replace(/-/g, ' ')}
                  href={`/vault/product/${p.slug}`}
                  isNew={p.isNew}
                />
              ))}
            </div>
            {results.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <Search size={36} color="rgba(212,175,55,0.2)" style={{ margin: '0 auto 20px', display: 'block' }} />
                <p style={{ fontSize: 16, color: 'rgba(234,234,234,0.4)' }}>No pieces found for &quot;{query}&quot;</p>
                <p style={{ fontSize: 13, color: 'rgba(234,234,234,0.25)', marginTop: 8 }}>Try a different search term</p>
              </div>
            )}
          </div>
        )}
      </div>
    </VaultLayout>
  )
}
