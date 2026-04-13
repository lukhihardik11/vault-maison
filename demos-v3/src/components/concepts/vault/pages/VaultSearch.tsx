'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { products } from '@/data/products'
import { VaultLayout } from '../VaultLayout'
import { Search, X } from 'lucide-react'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const MUTED = '#333333'
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
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT, marginBottom: 24 }}>Search</h1>
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
            <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.4)', marginBottom: 20 }}>Popular Searches</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Diamond Rings', 'Gold Necklaces', 'Engagement', 'Earrings', 'Platinum'].map((t) => (
                <button key={t} onClick={() => setQuery(t)} style={{ padding: '8px 16px', backgroundColor: SURFACE, border: `1px solid ${MUTED}`, borderRadius: 20, color: TEXT, fontSize: 13, cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div>
            <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.4)', marginBottom: 24 }}>{results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {results.map((p) => (
                <Link key={p.id} href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.1)', backgroundColor: SURFACE, transition: 'border-color 0.3s ease' }}>
                    <div style={{ aspectRatio: '1', overflow: 'hidden', backgroundColor: '#111' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 4 }}>{p.category.replace(/-/g, ' ')}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 14, fontFamily: 'Cinzel, serif', color: TEXT }}>${p.price.toLocaleString()}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </VaultLayout>
  )
}
