'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { MS, MaisonSection, StaggerItem, SectionLabel } from '../MaisonLayout'
import { ElegantCard } from '../ui'
import { products } from '@/data/products'
import { categoryLabels } from '@/data/concepts'

export function MaisonCategory() {
  const params = useParams()
  const cat = params.category as string
  const label = categoryLabels[cat as keyof typeof categoryLabels] || cat
  const filtered = products.filter(p => p.category === cat)

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Category" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 600, color: MS.text, margin: '0 0 8px' }}>{label}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary }}>{filtered.length} pieces</p>
        </div>
      </section>

      <MaisonSection>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filtered.map((product, i) => (
              <StaggerItem key={product.slug} index={i % 6}>
                <ElegantCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/maison/product/${product.slug}`} />
              </StaggerItem>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: MS.text }}>No pieces in this category yet.</p>
          </div>
        )}
      </MaisonSection>
    </>
  )
}
