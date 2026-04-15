'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { MK, MarketplaceSection, RevealSection, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton, BidPanel, RarityBadge, LotCard } from '../ui'
import { products, getBestsellers } from '@/data/products'
import { Shield, FileText, Truck, Eye, Heart, Share2 } from 'lucide-react'

export function MarketplaceProductDetail() {
  const params = useParams()
  const product = products.find(p => p.slug === params.slug)
  const [mainImage, setMainImage] = useState(0)
  const related = getBestsellers().filter(p => p.slug !== params.slug).slice(0, 3)

  if (!product) return <MarketplaceSection><p style={{ color: MK.text }}>Lot not found.</p></MarketplaceSection>

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 48 }}>
            <div>
              <div style={{ position: 'relative', height: 520, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
                <Image src={product.images[mainImage]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <RarityBadge level="exceptional" />
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                  <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${MK.bg}cc`, border: `1px solid ${MK.border}`, borderRadius: 4, color: MK.textSecondary, cursor: 'pointer' }}><Heart size={16} /></button>
                  <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${MK.bg}cc`, border: `1px solid ${MK.border}`, borderRadius: 4, color: MK.textSecondary, cursor: 'pointer' }}><Share2 size={16} /></button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImage(i)} style={{
                    position: 'relative', width: 80, height: 80, borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                    border: mainImage === i ? `2px solid ${MK.accent}` : `1px solid ${MK.border}`, background: 'none', padding: 0,
                  }}>
                    <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: 8 }}>
              <SectionLabel label={`Lot #${Math.floor(Math.random() * 900) + 100}`} style={{ marginBottom: 12 }} />
              <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: MK.text, margin: '0 0 4px' }}>{product.name}</h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, margin: '0 0 16px' }}>{product.subtitle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Eye size={12} color={MK.textSecondary} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MK.textSecondary }}>247 watching</span>
                </div>
              </div>
              <BidPanel currentBid={product.price} estimateLow={Math.floor(product.price * 0.8)} estimateHigh={Math.floor(product.price * 1.5)} bids={14} timeLeft="2d 14h 32m" />
              <LotDivider style={{ margin: '20px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { icon: <Shield size={14} />, label: 'Authenticated' },
                  { icon: <FileText size={14} />, label: 'GIA Certified' },
                  { icon: <Truck size={14} />, label: 'Insured Shipping' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: MK.surface, borderRadius: 3 }}>
                    <span style={{ color: MK.accent }}>{item.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MK.textSecondary }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketplaceSection>
        <RevealSection>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Lot Description</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, lineHeight: 1.8, maxWidth: 700 }}>{product.description}</p>
        </RevealSection>
      </MarketplaceSection>

      <MarketplaceSection alt>
        <RevealSection>
          <SectionLabel label="Similar Lots" style={{ marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {related.map((p, i) => (
              <LotCard key={p.slug} image={p.images[0]} title={p.name} subtitle={p.subtitle} price={p.price} href={`/marketplace/product/${p.slug}`} lotNumber={String(300 + i)} bids={Math.floor(Math.random() * 12) + 3} />
            ))}
          </div>
        </RevealSection>
      </MarketplaceSection>
    </>
  )
}
