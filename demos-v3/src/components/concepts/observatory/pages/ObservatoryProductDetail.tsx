'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { OB, ObservatorySection, RevealSection, ScanLine, CyanRule } from '../ObservatoryLayout'
import { ObservatoryButton, SpectrumChart, AnalysisPanel, CertificationBadge, PrecisionMeter } from '../ui'
import { getProduct } from '@/data/products'
import { Heart, Share2, Shield, Truck, RotateCcw, ArrowRight } from 'lucide-react'

export function ObservatoryProductDetail() {
  const params = useParams()
  const product = getProduct(params.slug as string)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) return null

  const specs = [
    { label: 'Cut Grade', value: 'Excellent' },
    { label: 'Clarity', value: 'VS1' },
    { label: 'Color', value: 'D-F Range' },
    { label: 'Carat Weight', value: '1.50 ct' },
    { label: 'Symmetry', value: 'Excellent' },
    { label: 'Fluorescence', value: 'None' },
  ]

  const spectrumData = [
    { label: 'Brilliance', value: 96 },
    { label: 'Fire', value: 92 },
    { label: 'Scintillation', value: 88 },
    { label: 'Light Return', value: 94 },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <section style={{ background: OB.bg, padding: '80px 0 0', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/observatory/collections" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary, textDecoration: 'none' }}>Collections</Link>
            <ArrowRight size={10} color={OB.textSecondary} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent }}>{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Main */}
      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          {/* Images */}
          <div>
            <div style={{ position: 'relative', height: 500, background: OB.card, border: `1px solid ${OB.border}`, overflow: 'hidden', marginBottom: 16 }}>
              <Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <CertificationBadge type="observatory" size="sm" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} style={{
                  width: 80, height: 80, position: 'relative', border: `2px solid ${i === selectedImage ? OB.accent : OB.border}`,
                  background: 'none', cursor: 'pointer', overflow: 'hidden', padding: 0,
                }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OB.accent, marginBottom: 8 }}>
              OBSERVATORY VERIFIED
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: '0 0 8px' }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, margin: '0 0 24px' }}>
              {product.subtitle}
            </p>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.accent, marginBottom: 24 }}>
              ${product.price.toLocaleString()}
            </div>

            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
              {product.description}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              <ObservatoryButton href="/observatory/cart" size="lg" style={{ flex: 1 }}>Add to Collection</ObservatoryButton>
              <button style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${OB.border}`, color: OB.textSecondary, cursor: 'pointer' }}>
                <Heart size={18} />
              </button>
              <button style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${OB.border}`, color: OB.textSecondary, cursor: 'pointer' }}>
                <Share2 size={18} />
              </button>
            </div>

            {/* Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '20px 0', borderTop: `1px solid ${OB.border}` }}>
              {[
                { icon: <Shield size={16} />, label: 'Certified Authentic' },
                { icon: <Truck size={16} />, label: 'Insured Shipping' },
                { icon: <RotateCcw size={16} />, label: '30-Day Returns' },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: OB.accent }}>{g.icon}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ObservatorySection>

      {/* Analysis Section */}
      <ObservatorySection alt>
        <RevealSection>
          <ScanLine label="Gemological Analysis" style={{ marginBottom: 32 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <AnalysisPanel title={product.name} grade="Exceptional" specs={specs} />
            <SpectrumChart data={spectrumData} title="Light Performance Analysis" />
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* Making Of */}
      <ObservatorySection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ScanLine label="Artisan Profile" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>
                The Making of This Piece
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Crafted by master artisan Elena Marchetti in our Antwerp atelier, this piece required 120 hours of meticulous handwork. The stone was selected from a parcel of 2,000 candidates, chosen for its exceptional light performance metrics.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div style={{ borderLeft: `2px solid ${OB.accent}`, paddingLeft: 12 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: OB.accent }}>120h</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.textSecondary }}>CRAFT TIME</div>
                </div>
                <div style={{ borderLeft: `2px solid ${OB.accent}`, paddingLeft: 12 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: OB.accent }}>2000</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.textSecondary }}>STONES REVIEWED</div>
                </div>
                <div style={{ borderLeft: `2px solid ${OB.accent}`, paddingLeft: 12 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: OB.accent }}>47pt</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.textSecondary }}>ANALYSIS</div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/observatory/precision-tools.jpg" alt="Craftsmanship" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>
    </>
  )
}
