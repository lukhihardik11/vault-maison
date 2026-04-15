'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { OB, ObservatorySection, RevealSection, StaggerItem } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { products } from '@/data/products'
import { Search, Filter, X } from 'lucide-react'

export function ObservatorySearch() {
  const [query, setQuery] = useState('')
  const filtered = query.length > 0
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
    : products.slice(0, 8)

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: '0 0 24px' }}>Search Observatory</h1>
          <div style={{ position: 'relative' }}>
            <Search size={16} color={OB.textSecondary} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, stone type, or specification..."
              style={{
                width: '100%', padding: '16px 16px 16px 44px',
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem',
                color: OB.text, background: OB.surface, border: `1px solid ${OB.border}`,
                outline: 'none',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: OB.textSecondary, cursor: 'pointer' }}>
                <X size={14} />
              </button>
            )}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary, marginTop: 12 }}>
            {filtered.length} results {query && `for "${query}"`}
          </div>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {filtered.map((product, i) => (
            <StaggerItem key={product.slug} index={i % 4}>
              <Link href={`/observatory/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 180 }}>
                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 12 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>{product.name}</h3>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: OB.accent }}>${product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>
    </>
  )
}
