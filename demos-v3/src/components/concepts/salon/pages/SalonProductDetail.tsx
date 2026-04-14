'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SalonLayout, S } from '../SalonLayout'
import { SalonCard } from '../ui/SalonCard'
import { SalonRevealCard } from '../ui/SalonRevealCard'
import { SalonButton } from '../ui/SalonButton'
import { getProduct, getBestsellers } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { Heart, Share2, Shield, Truck, RotateCcw, ChevronDown } from 'lucide-react'

const advisorInsights = [
  { name: 'Sophie', note: 'This piece catches the light beautifully in the evening. One of my personal favorites for special occasions.' },
  { name: 'James', note: 'The craftsmanship on this piece is exceptional. Notice the precision of the setting — each stone is perfectly aligned.' },
  { name: 'Aria', note: 'I love how versatile this piece is. It transitions effortlessly from day to evening wear.' },
]

export function SalonProductDetail() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProduct(slug)
  const addItem = useCartStore(s => s.addItem)
  const related = getBestsellers().filter(p => p.slug !== slug).slice(0, 4)

  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [openAccordion, setOpenAccordion] = useState<string | null>('details')

  if (!product) {
    return (
      <SalonLayout>
        <div style={{ padding: '120px 32px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: S.text }}>Piece Not Found</h1>
          <p style={{ fontFamily: "'Lora', serif", color: S.textSecondary, marginTop: 12 }}>We couldn&apos;t find this piece. Let our advisors help you.</p>
          <SalonButton href="/salon/collections" style={{ marginTop: 24 }}>Browse Collection</SalonButton>
        </div>
      </SalonLayout>
    )
  }

  const insight = advisorInsights[Math.floor(product.name.length % 3)]

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <SalonLayout>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px' }}>
        <div style={{ display: 'flex', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.textSecondary }}>
          <Link href="/salon" style={{ color: S.textSecondary, textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/salon/collections" style={{ color: S.textSecondary, textDecoration: 'none' }}>Collections</Link>
          <span>/</span>
          <span style={{ color: S.text }}>{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          {/* Left: Gallery */}
          <div>
            {/* Main image with zoom */}
            <div
              style={{
                aspectRatio: '4/5', borderRadius: S.radiusLg, overflow: 'hidden',
                background: S.warmPanel, cursor: 'crosshair', position: 'relative',
                border: `1px solid ${S.border}`,
              }}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleZoomMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.3s',
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  style={{
                    width: 72, height: 72, borderRadius: S.radiusSm, overflow: 'hidden',
                    border: i === selectedImage ? `2px solid ${S.accent}` : `1px solid ${S.border}`,
                    opacity: i === selectedImage ? 1 : 0.6, cursor: 'pointer',
                    transition: 'all 0.3s', background: 'none', padding: 0,
                  }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>
              {product.category?.replace(/-/g, ' ')}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: S.text, margin: '0 0 8px', lineHeight: 1.2 }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, margin: '0 0 20px' }}>
              {product.subtitle}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', fontWeight: 500, color: S.text, margin: '0 0 28px' }}>
              {product.priceDisplay}
            </p>

            {/* Advisor insight */}
            <div style={{
              background: S.warmPanel, borderRadius: S.radius, padding: '16px 20px',
              borderLeft: `3px solid ${S.accent}`, marginBottom: 28,
            }}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.82rem', fontStyle: 'italic', color: S.textSecondary, lineHeight: 1.6, margin: 0 }}>
                &ldquo;{insight.note}&rdquo;
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: S.accent, margin: '6px 0 0', fontWeight: 500 }}>
                — {insight.name}, Personal Advisor
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <SalonButton fullWidth onClick={() => addItem(product)}>
                Add to Bag
              </SalonButton>
              <button style={{
                width: 48, height: 48, borderRadius: S.radius, border: `1.5px solid ${S.border}`,
                background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: S.textSecondary, transition: 'all 0.3s', flexShrink: 0,
              }}>
                <Heart size={18} />
              </button>
              <button style={{
                width: 48, height: 48, borderRadius: S.radius, border: `1.5px solid ${S.border}`,
                background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: S.textSecondary, transition: 'all 0.3s', flexShrink: 0,
              }}>
                <Share2 size={18} />
              </button>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
              {[
                { icon: <Truck size={16} />, text: 'Complimentary Delivery' },
                { icon: <RotateCcw size={16} />, text: '30-Day Returns' },
                { icon: <Shield size={16} />, text: 'Lifetime Warranty' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.textSecondary }}>
                  <span style={{ color: S.accent }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Accordions */}
            {[
              { key: 'details', title: 'Product Details', content: product.description || 'Exquisitely crafted with the finest materials, this piece represents the pinnacle of our artisan tradition. Each element has been carefully considered to create a harmonious whole.' },
              { key: 'care', title: 'Care & Maintenance', content: 'Store in the provided pouch when not wearing. Clean gently with a soft cloth. Avoid contact with perfumes and chemicals. We offer complimentary professional cleaning — just bring it to any Salon.' },
              { key: 'shipping', title: 'Shipping & Returns', content: 'Complimentary insured delivery within 3-5 business days. Express delivery available. 30-day returns with full refund. Each piece arrives in our signature gift packaging.' },
            ].map((section) => (
              <div key={section.key} style={{ borderTop: `1px solid ${S.border}` }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === section.key ? null : section.key)}
                  style={{
                    width: '100%', padding: '16px 0', background: 'none', border: 'none',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: S.text }}>
                    {section.title}
                  </span>
                  <ChevronDown size={16} color={S.textSecondary}
                    style={{ transition: 'transform 0.3s', transform: openAccordion === section.key ? 'rotate(180deg)' : 'none' }} />
                </button>
                {openAccordion === section.key && (
                  <div style={{ paddingBottom: 16 }}>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: '0.82rem', color: S.textSecondary, lineHeight: 1.7, margin: 0 }}>
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      <section style={{ padding: '80px 32px 100px', background: S.warmPanel }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>
              You Might Also Love
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 400, color: S.text, margin: 0 }}>
              Sophie&apos;s Suggestions
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {related.map((p, i) => (
              <SalonRevealCard
                key={p.id}
                name={p.name}
                slug={p.slug}
                price={p.priceDisplay}
                image={p.images[0]}
                category={p.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            ))}
          </div>
        </div>
      </section>
    </SalonLayout>
  )
}
