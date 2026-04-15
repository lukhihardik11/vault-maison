'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { TH, TheaterSection, RevealSection, ActLabel, GoldRule, Curtain } from '../TheaterLayout'
import { TheaterButton } from '../ui'
import { getProduct } from '@/data/products'
import { Heart, Share2, Shield, Truck, RotateCcw, ArrowRight } from 'lucide-react'

export function TheaterProductDetail() {
  const params = useParams()
  const product = getProduct(params.slug as string)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) return null

  return (
    <>
      <section style={{ background: TH.bg, padding: '80px 0 0', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/theater/collections" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.textSecondary, textDecoration: 'none' }}>Collections</Link>
            <ArrowRight size={10} color={TH.textSecondary} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.gold }}>{product.name}</span>
          </div>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <div style={{ position: 'relative', height: 500, background: TH.card, border: `1px solid ${TH.border}`, overflow: 'hidden' }}>
              <Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 30%, ${TH.accent}10 0%, transparent 60%)` }} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} style={{
                  width: 80, height: 80, position: 'relative', border: `2px solid ${i === selectedImage ? TH.gold : TH.border}`,
                  background: 'none', cursor: 'pointer', overflow: 'hidden', padding: 0,
                }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <ActLabel label="Center Stage" style={{ marginBottom: 16 }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 500, color: TH.text, margin: '0 0 8px' }}>{product.name}</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary, margin: '0 0 24px' }}>{product.subtitle}</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.gold, marginBottom: 24 }}>${product.price.toLocaleString()}</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>{product.description}</p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              <TheaterButton href="/theater/cart" size="lg" style={{ flex: 1 }}>Add to Collection</TheaterButton>
              <button style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${TH.border}`, color: TH.textSecondary, cursor: 'pointer' }}>
                <Heart size={18} />
              </button>
              <button style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${TH.border}`, color: TH.textSecondary, cursor: 'pointer' }}>
                <Share2 size={18} />
              </button>
            </div>

            <GoldRule style={{ marginBottom: 24 }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { icon: <Shield size={16} />, label: 'Authenticated' },
                { icon: <Truck size={16} />, label: 'Insured Delivery' },
                { icon: <RotateCcw size={16} />, label: '30-Day Returns' },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: TH.gold }}>{g.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: TH.textSecondary }}>{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TheaterSection>

      <Curtain />

      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ActLabel label="Behind the Scenes" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>The Story of This Piece</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, lineHeight: 1.8 }}>
                Every piece in our collection has a narrative. This creation began as a vision — a master artisan&apos;s interpretation of light captured in precious metal and stone. Over 120 hours of meticulous handwork brought this vision to life, each facet placed with theatrical precision.
              </p>
            </div>
            <div style={{ position: 'relative', height: 350, overflow: 'hidden' }}>
              <Image src="/images/theater/artisan-hands.jpg" alt="Artisan at work" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </TheaterSection>
    </>
  )
}
