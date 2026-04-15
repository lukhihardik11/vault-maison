'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { Grid, ArrowRight } from 'lucide-react'

export function ObservatoryCategory() {
  const params = useParams()
  const category = params.category as ProductCategory
  const products = getProductsByCategory(category)
  const label = categoryLabels[category] || category.replace(/-/g, ' ')
  const desc = categoryDescriptions[category] || ''

  return (
    <>
      {/* Header */}
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Link href="/observatory/collections" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary, textDecoration: 'none' }}>Collections</Link>
            <ArrowRight size={10} color={OB.textSecondary} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent }}>{label}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.2rem', fontWeight: 600, color: OB.text, margin: '0 0 12px' }}>{label}</h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, maxWidth: 600 }}>{desc}</p>
          <div style={{ marginTop: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent }}>
            {products.length} VERIFIED PIECES
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {products.map((product, i) => (
            <StaggerItem key={product.slug} index={i % 6}>
              <Link href={`/observatory/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 220 }}>
                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(10,14,26,0.9)', padding: '3px 8px', border: `1px solid ${OB.border}` }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: OB.success }}>VERIFIED</span>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>{product.name}</h3>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, margin: '0 0 12px' }}>{product.subtitle}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${OB.border}`, paddingTop: 12 }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 600, color: OB.accent }}>${product.price.toLocaleString()}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: OB.textSecondary }}>VIEW ANALYSIS →</span>
                    </div>
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
