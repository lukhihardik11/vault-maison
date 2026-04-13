'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { GalleryLayout, G } from '../GalleryLayout'
import { PedestalCard } from '../ui/PedestalCard'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { type Product, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { ChevronDown, ChevronUp, Minus, Plus, Heart } from 'lucide-react'

export function GalleryProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [qty, setQty] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('details')
  const imageRef = useRef<HTMLDivElement>(null)
  const related = getRelatedProducts(product.id, 4)
  const addItem = useCartStore((s) => s.addItem)

  const handleZoomMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handleAddToCart = () => {
    addItem(product)
  }

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key)
  }

  const accordions = [
    { key: 'details', title: 'Exhibition Notes', content: product.description },
    { key: 'specs', title: 'Specifications', content: product.diamondSpecs
      ? `Carat: ${product.diamondSpecs.carat}\nCut: ${product.diamondSpecs.cut}\nColor: ${product.diamondSpecs.color}\nClarity: ${product.diamondSpecs.clarity}\nShape: ${product.diamondSpecs.shape}\nOrigin: ${product.diamondSpecs.origin}\nCertification: ${product.diamondSpecs.certification}`
      : `Material: ${product.material}${product.goldKarat ? `\nGold: ${product.goldKarat} ${product.goldColor}` : ''}` },
    { key: 'features', title: 'Provenance & Features', content: product.features.join('\n') },
    { key: 'shipping', title: 'Shipping & Returns', content: 'Complimentary worldwide shipping via insured courier. 30-day return policy for unworn pieces in original packaging. Each piece arrives in our signature museum-quality presentation box.' },
  ]

  return (
    <GalleryLayout>
      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 32px 32px' }}>
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/gallery" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.caption, textDecoration: 'none' }}>Gallery</Link>
          <span style={{ color: G.border, fontSize: '0.6rem' }}>/</span>
          <Link href={`/gallery/category/${product.category}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.caption, textDecoration: 'none' }}>
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span style={{ color: G.border, fontSize: '0.6rem' }}>/</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent }}>{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Left: Gallery */}
          <div>
            {/* Main image with zoom */}
            <div
              ref={imageRef}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleZoomMove}
              style={{
                background: G.surface,
                border: `1px solid ${G.border}`,
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                position: 'relative',
              }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                style={{
                  width: '80%',
                  height: '80%',
                  objectFit: 'contain',
                  transition: isZoomed ? 'none' : 'transform 0.3s ease',
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
              {product.isNew && (
                <span style={{
                  position: 'absolute', top: 20, left: 20,
                  fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: G.accent, background: 'rgba(139,115,85,0.08)', padding: '4px 10px',
                }}>
                  New Acquisition
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    style={{
                      width: 72, height: 72, padding: 8,
                      background: G.surface,
                      border: `${selectedImage === i ? '2px' : '1px'} solid ${selectedImage === i ? G.accent : G.border}`,
                      cursor: 'pointer',
                      opacity: selectedImage === i ? 1 : 0.5,
                      transition: 'all 0.3s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => { if (selectedImage !== i) (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
                    onMouseLeave={(e) => { if (selectedImage !== i) (e.currentTarget as HTMLElement).style.opacity = '0.5' }}>
                    <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product info (museum wall label style) */}
          <div style={{ paddingTop: 8 }}>
            <MuseumCaption>{product.category.replace(/-/g, ' ')}</MuseumCaption>
            <h1 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400,
              color: G.text,
              margin: '12px 0 8px',
              lineHeight: 1.3,
            }}>
              {product.name}
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 300,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: G.textSecondary, margin: '0 0 24px',
            }}>
              {product.subtitle}
            </p>

            <p style={{
              fontFamily: "'Libre Baskerville', serif", fontSize: '1.4rem',
              fontWeight: 400, color: G.text, margin: '0 0 32px',
            }}>
              {product.priceDisplay}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: G.border, marginBottom: 32 }} />

            {/* Quantity + Add to cart */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{
                display: 'flex', alignItems: 'center', border: `1px solid ${G.border}`,
              }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ background: 'none', border: 'none', padding: '12px 14px', cursor: 'pointer', color: G.text }}>
                  <Minus size={14} />
                </button>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', minWidth: 32, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  style={{ background: 'none', border: 'none', padding: '12px 14px', cursor: 'pointer', color: G.text }}>
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={handleAddToCart}
                style={{
                  flex: 1, padding: '14px 24px', background: G.accent, color: '#fff',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer', transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = G.accentHover }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = G.accent }}>
                Acquire This Piece
              </button>
            </div>

            {/* Wishlist */}
            <button onClick={() => setWishlist(!wishlist)}
              style={{
                width: '100%', padding: '14px', background: 'transparent',
                border: `1px solid ${G.border}`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: wishlist ? G.accent : G.text,
                transition: 'all 0.3s',
              }}>
              <Heart size={14} fill={wishlist ? G.accent : 'none'} />
              {wishlist ? 'In Your Collection' : 'Add to Collection'}
            </button>

            {/* Divider */}
            <div style={{ height: 1, background: G.border, margin: '32px 0' }} />

            {/* Accordions */}
            {accordions.map((acc) => (
              <div key={acc.key} style={{ borderBottom: `1px solid ${G.border}` }}>
                <button onClick={() => toggleAccordion(acc.key)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer',
                  }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: G.text,
                  }}>
                    {acc.title}
                  </span>
                  {openAccordion === acc.key ? <ChevronUp size={16} color={G.caption} /> : <ChevronDown size={16} color={G.caption} />}
                </button>
                {openAccordion === acc.key && (
                  <div style={{
                    padding: '0 0 20px',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary,
                    lineHeight: 1.8, whiteSpace: 'pre-line',
                  }}>
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related pieces */}
      {related.length > 0 && (
        <section style={{ padding: '100px 32px 140px', borderTop: `1px solid ${G.border}` }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <MuseumCaption align="center">Also on View</MuseumCaption>
              <h2 style={{
                fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight: 400, color: G.text, margin: '12px 0 0',
              }}>
                Related Works
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {related.map((p) => (
                <PedestalCard
                  key={p.id}
                  name={p.name}
                  price={p.priceDisplay}
                  image={p.images[0]}
                  material={p.subtitle}
                  href={`/gallery/product/${p.slug}`}
                  isNew={p.isNew}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </GalleryLayout>
  )
}
