'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { GalleryLayout, G } from '../GalleryLayout'
import { PedestalCard } from '../ui/PedestalCard'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { type Product, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { ChevronDown, ChevronUp, Minus, Plus, Heart, Check } from 'lucide-react'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

export function GalleryProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [qty, setQty] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('details')
  const [selectedSize, setSelectedSize] = useState('7')
  const [selectedMetal, setSelectedMetal] = useState(() => {
    return product.goldColor ? `${product.goldColor} Gold` : metals[0]
  })
  const [addedToCart, setAddedToCart] = useState(false)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const wishlisted = isInWishlist(product.id)
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
    for (let i = 0; i < qty; i++) addItem(product, selectedSize, selectedMetal)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
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
            <div style={{ height: 1, background: G.border, marginBottom: 24 }} />

            {/* Size Selector */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: G.textSecondary, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Size: <span style={{ color: G.accent }}>{selectedSize}</span></span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    width: 42, height: 34, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
                    border: selectedSize === s ? `2px solid ${G.accent}` : `1px solid ${G.border}`,
                    background: selectedSize === s ? `${G.accent}10` : 'transparent',
                    color: selectedSize === s ? G.accent : G.textSecondary, cursor: 'pointer',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Metal Selector */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: G.textSecondary, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Metal: <span style={{ color: G.accent }}>{selectedMetal}</span></span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {metals.map(m => {
                  const colors: Record<string, string> = { 'White Gold': '#E8E8E8', 'Yellow Gold': '#FFD700', 'Rose Gold': '#B76E79', 'Platinum': '#C0C0C0' }
                  return (
                    <button key={m} onClick={() => setSelectedMetal(m)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                      border: selectedMetal === m ? `2px solid ${G.accent}` : `1px solid ${G.border}`,
                      background: selectedMetal === m ? `${G.accent}08` : 'transparent', cursor: 'pointer',
                    }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: colors[m], border: `1px solid ${G.border}` }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: selectedMetal === m ? G.accent : G.textSecondary }}>{m}</span>
                    </button>
                  )
                })}
              </div>
            </div>

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
                  flex: 1, padding: '14px 24px', background: addedToCart ? '#5A7A5A' : G.accent, color: '#fff',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                {addedToCart ? <><Check size={14} /> Acquired</> : <>Acquire &mdash; ${(product.price * qty).toLocaleString()}</>}
              </button>
            </div>

            {/* Wishlist */}
            <button onClick={() => toggleItem(product)}
              style={{
                width: '100%', padding: '14px', background: 'transparent',
                border: `1px solid ${wishlisted ? G.accent : G.border}`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: wishlisted ? G.accent : G.text,
                transition: 'all 0.3s',
              }}>
              <Heart size={14} fill={wishlisted ? G.accent : 'none'} />
              {wishlisted ? 'In Your Collection' : 'Add to Collection'}
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
