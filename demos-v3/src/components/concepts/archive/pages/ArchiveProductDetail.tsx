'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'
import { ArchiveButton, ProvenanceTimeline, AuthenticationStamp, CatalogBadge, type ProvenanceEntry } from '../ui'
import { getProduct, getRelatedProducts, formatPrice } from '@/data/products'
import { DocumentCard } from '../ui'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { ShoppingBag, Heart, FileText, ChevronDown, ChevronUp, Check, Minus, Plus } from 'lucide-react'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

export function ArchiveProductDetail() {
  const params = useParams()
  const slug = params?.slug as string
  const product = getProduct(slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showSpecs, setShowSpecs] = useState(true)
  const [showProvenance, setShowProvenance] = useState(true)
  const [selectedSize, setSelectedSize] = useState('7')
  const [selectedMetal, setSelectedMetal] = useState(() => {
    if (!product) return metals[0]
    return product.goldColor ? `${product.goldColor} Gold` : metals[0]
  })
  const [qty, setQty] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()

  if (!product) {
    return (
      <ArchiveSection>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: AR.text }}>Record Not Found</h1>
          <ArchiveButton href="/archive/collections" style={{ marginTop: 24 }}>Return to Catalog</ArchiveButton>
        </div>
      </ArchiveSection>
    )
  }

  const related = getRelatedProducts(product.id, 4)
  const catalogNum = `VM-${product.id.toUpperCase()}-${new Date().getFullYear()}`

  const provenance: ProvenanceEntry[] = [
    { year: '2024', title: 'Acquired by Vault Maison Archive', description: 'Piece entered the permanent collection after rigorous authentication process.', location: 'Vault Maison, New York', document: 'Acquisition Certificate #AC-2024-' + product.id, verified: true },
    { year: '2024', title: 'Independent Authentication', description: 'Full gemological assessment and materials verification completed by certified laboratory.', document: 'GIA Report / IGI Certificate', verified: true },
    { year: '2023', title: 'Master Craftsman Workshop', description: `Created by master artisans using traditional techniques. ${product.material} construction with meticulous attention to detail.`, location: 'Artisan Workshop', verified: true },
    { year: '2023', title: 'Material Sourcing', description: 'Raw materials ethically sourced and verified for quality and origin compliance.', document: 'Kimberley Process Certificate', verified: false },
  ]

  const specs = [
    { label: 'Material', value: product.material },
    ...(product.goldKarat ? [{ label: 'Gold Purity', value: product.goldKarat }] : []),
    ...(product.goldColor ? [{ label: 'Gold Color', value: product.goldColor }] : []),
    ...(product.diamondSpecs ? [
      { label: 'Carat Weight', value: product.diamondSpecs.carat },
      { label: 'Cut Grade', value: product.diamondSpecs.cut },
      { label: 'Color Grade', value: product.diamondSpecs.color },
      { label: 'Clarity', value: product.diamondSpecs.clarity },
      { label: 'Shape', value: product.diamondSpecs.shape },
      { label: 'Origin', value: product.diamondSpecs.origin },
      { label: 'Certification', value: product.diamondSpecs.certification },
    ] : []),
  ]

  return (
    <>
      {/* Breadcrumb */}
      <section style={{ background: AR.bg, padding: '16px 32px', borderBottom: `1px solid ${AR.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="/archive" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textDecoration: 'none' }}>ARCHIVE</a>
          <span style={{ color: AR.border }}>/</span>
          <a href="/archive/collections" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textDecoration: 'none' }}>CATALOG</a>
          <span style={{ color: AR.border }}>/</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.accent }}>{product.name.toUpperCase()}</span>
        </div>
      </section>

      {/* Main Product */}
      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          {/* Gallery */}
          <div>
            <div style={{
              position: 'relative', height: 480, background: '#0a0808',
              border: `1px solid ${AR.border}`, marginBottom: 16,
            }}>
              <Image src={product.images[selectedImage] || product.images[0]} alt={product.name} fill style={{ objectFit: 'contain', padding: 32 }} />
              {/* Catalog number overlay */}
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <CatalogBadge number={catalogNum} level="premium" />
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} style={{
                    width: 72, height: 72, background: '#0a0808',
                    border: `1px solid ${selectedImage === i ? AR.accent : AR.border}`,
                    cursor: 'pointer', position: 'relative', padding: 0,
                  }}>
                    <Image src={img} alt="" fill style={{ objectFit: 'contain', padding: 4 }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <CatalogBadge number={catalogNum} level="premium" style={{ marginBottom: 16 }} />

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text, margin: '0 0 8px' }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, fontStyle: 'italic', margin: '0 0 24px' }}>
              {product.subtitle}
            </p>

            <GoldRule style={{ marginBottom: 24 }} />

            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.accent, margin: '0 0 24px' }}>
              {formatPrice(product.price)}
            </p>

            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: AR.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>
              {product.description}
            </p>

            {/* Authentication stamp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32, padding: '20px', background: AR.surface, border: `1px solid ${AR.border}` }}>
              <AuthenticationStamp status="verified" certifier="VM Authentication" size="sm" />
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: AR.accent, textTransform: 'uppercase', marginBottom: 4 }}>
                  FULLY AUTHENTICATED
                </p>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', color: AR.textSecondary }}>
                  Verified by certified gemologists with full provenance documentation
                </p>
              </div>
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Size: <span style={{ color: AR.accent }}>{selectedSize}</span></span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    width: 42, height: 34, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem',
                    border: selectedSize === s ? `2px solid ${AR.accent}` : `1px solid ${AR.border}`,
                    background: selectedSize === s ? `${AR.accent}15` : 'transparent',
                    color: selectedSize === s ? AR.accent : AR.textSecondary, cursor: 'pointer',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Metal Selector */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Metal: <span style={{ color: AR.accent }}>{selectedMetal}</span></span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {metals.map(m => {
                  const colors: Record<string, string> = { 'White Gold': '#E8E8E8', 'Yellow Gold': '#FFD700', 'Rose Gold': '#B76E79', 'Platinum': '#C0C0C0' }
                  return (
                    <button key={m} onClick={() => setSelectedMetal(m)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                      border: selectedMetal === m ? `2px solid ${AR.accent}` : `1px solid ${AR.border}`,
                      background: selectedMetal === m ? `${AR.accent}10` : 'transparent', cursor: 'pointer',
                    }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: colors[m], border: `1px solid ${AR.border}` }} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: selectedMetal === m ? AR.accent : AR.textSecondary }}>{m}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${AR.border}`, width: 'fit-content' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: AR.textSecondary, cursor: 'pointer' }}><Minus size={12} /></button>
                <div style={{ width: 40, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: AR.text, borderLeft: `1px solid ${AR.border}`, borderRight: `1px solid ${AR.border}` }}>{qty}</div>
                <button onClick={() => setQty(Math.min(10, qty + 1))} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: AR.textSecondary, cursor: 'pointer' }}><Plus size={12} /></button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button onClick={() => { if (!product) return; for (let i = 0; i < qty; i++) addItem(product, selectedSize, selectedMetal); setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2500) }} style={{
                flex: 1, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: addedToCart ? '#5A7A5A' : AR.accent, color: addedToCart ? '#fff' : AR.bg,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }}>
                {addedToCart ? <><Check size={14} /> Acquired</> : <><ShoppingBag size={14} /> Acquire &mdash; {formatPrice(product.price * qty)}</>}
              </button>
              <button onClick={() => product && toggleItem(product)} style={{
                width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: `1px solid ${product && isInWishlist(product.id) ? AR.accent : AR.border}`,
                color: product && isInWishlist(product.id) ? AR.accent : AR.textSecondary, cursor: 'pointer',
              }}>
                <Heart size={18} fill={product && isInWishlist(product.id) ? AR.accent : 'none'} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: AR.textSecondary }}>
              <FileText size={14} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                Includes certificate of authenticity & provenance record
              </span>
            </div>
          </div>
        </div>
      </ArchiveSection>

      {/* Specifications Accordion */}
      <ArchiveSection alt>
        <RevealSection>
          <button onClick={() => setShowSpecs(!showSpecs)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px',
            borderBottom: `1px solid ${AR.border}`, marginBottom: showSpecs ? 24 : 0,
          }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: AR.accent }}>
              TECHNICAL SPECIFICATIONS
            </span>
            {showSpecs ? <ChevronUp size={18} color={AR.accent} /> : <ChevronDown size={18} color={AR.accent} />}
          </button>

          {showSpecs && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: AR.border }}>
              {specs.map((spec, i) => (
                <div key={i} style={{ background: AR.card, padding: '14px 20px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.08em', color: AR.textSecondary, textTransform: 'uppercase' }}>
                    {spec.label}
                  </span>
                  <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', color: AR.text, fontWeight: 600 }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </RevealSection>
      </ArchiveSection>

      {/* Provenance Timeline */}
      <ArchiveSection>
        <RevealSection>
          <button onClick={() => setShowProvenance(!showProvenance)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px',
            borderBottom: `1px solid ${AR.border}`, marginBottom: showProvenance ? 32 : 0,
          }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: AR.accent }}>
              PROVENANCE RECORD
            </span>
            {showProvenance ? <ChevronUp size={18} color={AR.accent} /> : <ChevronDown size={18} color={AR.accent} />}
          </button>

          {showProvenance && <ProvenanceTimeline entries={provenance} />}
        </RevealSection>
      </ArchiveSection>

      {/* Related */}
      {related.length > 0 && (
        <ArchiveSection alt>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>
                FROM THE SAME COLLECTION
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: AR.text }}>
                Related Records
              </h2>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {related.map((p, i) => (
              <DocumentCard
                key={p.id}
                title={p.name}
                subtitle={p.subtitle}
                catalogNumber={`VM-${p.id.toUpperCase()}`}
                image={p.images[0]}
                href={`/archive/product/${p.slug}`}
                price={formatPrice(p.price)}
                authenticated={true}
              />
            ))}
          </div>
        </ArchiveSection>
      )}
    </>
  )
}
