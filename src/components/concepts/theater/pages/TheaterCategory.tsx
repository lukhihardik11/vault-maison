'use client'
import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { TH, TheaterSection, StaggerItem, ActLabel } from '../TheaterLayout'
import { SceneCard } from '../ui'
import { categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { ArrowRight } from 'lucide-react'

export function TheaterCategory() {
  const params = useParams()
  const category = params.category as ProductCategory
  const products = getProductsByCategory(category)
  const label = categoryLabels[category] || category.replace(/-/g, ' ')

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Link href="/theater/collections" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.textSecondary, textDecoration: 'none' }}>Collections</Link>
            <ArrowRight size={10} color={TH.textSecondary} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.gold }}>{label}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 500, color: TH.text, margin: '0 0 8px' }}>{label}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary }}>{products.length} scenes in this act</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {products.map((product, i) => (
            <StaggerItem key={product.slug} index={i % 6}>
              <SceneCard
                image={product.images[0]}
                title={product.name}
                subtitle={product.subtitle}
                price={product.price}
                href={`/theater/product/${product.slug}`}
                act={`Scene ${i + 1}`}
              />
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>
    </>
  )
}
