'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { MS, MaisonSection, RevealSection, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton, ElegantCard } from '../ui'
import { products, getBestsellers } from '@/data/products'
import { Shield, Truck, RotateCcw, Heart, Share2, Ruler } from 'lucide-react'

export function MaisonProductDetail() {
  const params = useParams()
  const product = products.find(p => p.slug === params.slug)
  const [mainImage, setMainImage] = useState(0)
  const related = getBestsellers().filter(p => p.slug !== params.slug).slice(0, 3)

  if (!product) return <MaisonSection><p style={{ color: MS.text }}>Piece not found.</p></MaisonSection>

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 48 }}>
            <div>
              <div style={{ position: 'relative', height: 540, borderRadius: 4, overflow: 'hidden', marginBottom: 12, border: `1px solid ${MS.borderLight}` }}>
                <Image src={product.images[mainImage]} alt={product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImage(i)} style={{
                    position: 'relative', width: 80, height: 80, borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                    border: mainImage === i ? `2px solid ${MS.accent}` : `1px solid ${MS.border}`, background: 'none', padding: 0,
                  }}>
                    <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: 8 }}>
              <SectionLabel label={product.category} style={{ marginBottom: 12 }} />
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text, margin: '0 0 4px' }}>{product.name}</h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, margin: '0 0 16px' }}>{product.subtitle}</p>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.5rem', fontWeight: 600, color: MS.accent, marginBottom: 20 }}>${product.price.toLocaleString()}</div>
              <GoldDivider style={{ marginBottom: 20 }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>{product.description}</p>
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <MaisonButton href="/maison/cart" size="lg" style={{ flex: 1 }}>Add to Collection</MaisonButton>
                <button style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: `1px solid ${MS.border}`, borderRadius: 3, color: MS.textSecondary, cursor: 'pointer' }}><Heart size={16} /></button>
                <button style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: `1px solid ${MS.border}`, borderRadius: 3, color: MS.textSecondary, cursor: 'pointer' }}><Share2 size={16} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { icon: <Shield size={14} />, label: 'Certified' },
                  { icon: <Truck size={14} />, label: 'Free Shipping' },
                  { icon: <RotateCcw size={14} />, label: '30-Day Returns' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: MS.bgAlt, borderRadius: 3 }}>
                    <span style={{ color: MS.accent }}>{item.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MS.textSecondary }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MaisonSection alt>
        <RevealSection>
          <SectionLabel label="You May Also Like" style={{ marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {related.map(p => (
              <ElegantCard key={p.slug} image={p.images[0]} title={p.name} subtitle={p.subtitle} price={p.price} href={`/maison/product/${p.slug}`} />
            ))}
          </div>
        </RevealSection>
      </MaisonSection>
    </>
  )
}
