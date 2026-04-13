'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { products } from '@/data/products'
import { Search, X, TrendingUp } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const popularSearches = ['Diamond Ring', 'Gold Chain', 'Tennis Bracelet', 'Engagement Ring', 'Pearl Earrings', 'Solitaire']

export function MinimalSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 100px', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: font, fontSize: '36px', fontWeight: 200, color: '#1A1A1A', marginBottom: '24px' }}>Search</h1>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <Search size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9B9590' }} />
            <input
              type="text"
              placeholder="Search for rings, necklaces, diamonds..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              style={{ width: '100%', padding: '18px 48px 18px 52px', border: '1px solid #E8E5E0', fontSize: '15px', fontWeight: 300, fontFamily: font, color: '#1A1A1A', backgroundColor: '#FFFFFF', outline: 'none', transition: 'border-color 200ms ease' }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#C4A265'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E8E5E0'}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} color="#9B9590" />
              </button>
            )}
          </div>
        </div>

        {!query ? (
          /* Popular Searches */
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
              <TrendingUp size={14} color="#C4A265" />
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590' }}>Popular Searches</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {popularSearches.map(s => (
                <button key={s} onClick={() => setQuery(s)} style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, padding: '10px 20px', border: '1px solid #E8E5E0', backgroundColor: 'transparent', color: '#1A1A1A', cursor: 'pointer', transition: 'all 300ms ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C4A265'; e.currentTarget.style.color = '#C4A265' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E5E0'; e.currentTarget.style.color = '#1A1A1A' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 300, color: '#1A1A1A', marginBottom: '8px' }}>No results for &ldquo;{query}&rdquo;</p>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590' }}>Try a different search term or browse our collections.</p>
          </div>
        ) : (
          <div>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '24px' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="vm-search-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {results.map(p => (
                <Link key={p.id} href={`/minimal/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="vm-search-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '12px', overflow: 'hidden' }}>
                    <img src={p.images[0]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%",  objectFit: 'cover', transition: 'transform 600ms ease'  }} />
                  </div>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A', marginBottom: '2px' }}>{p.name}</p>
                  <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590', marginBottom: '6px' }}>{p.material}</p>
                  <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{p.priceDisplay}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <style>{`
        .vm-search-img:hover img { transform: scale(1.04) !important; }
        .vm-search-img:hover { box-shadow: 0 4px 20px rgba(180, 170, 160, 0.12) !important; }
        @media (max-width: 1024px) { .vm-search-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .vm-search-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </MinimalLayout>
  )
}
