'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { type Product, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { Heart, Share2, Minus, Plus, ChevronDown, Truck, Shield, RotateCcw, ArrowRight } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

interface Props { product: Product }

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid #E8E5E0' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A' }}>{title}</span>
        <ChevronDown size={16} style={{ color: '#9B9590', transition: 'transform 300ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: '20px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function MinimalProductDetail({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('7')
  const [selectedMetal, setSelectedMetal] = useState(product.goldColor || 'White Gold')
  const [quantity, setQuantity] = useState(1)
  const [zoomed, setZoomed] = useState(false)
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const related = getRelatedProducts(product.id, 4)
  const inWishlist = isInWishlist(product.id)
  const isRing = product.category.includes('ring')

  return (
    <MinimalLayout>
      {/* ── Breadcrumb ── */}
      <nav style={{ padding: '24px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: font, fontSize: '11px', color: '#9B9590' }}>
          <Link href="/minimal" style={{ color: '#9B9590', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/minimal/collections" style={{ color: '#9B9590', textDecoration: 'none' }}>Collections</Link>
          <span>/</span>
          <Link href={`/minimal/category/${product.category}`} style={{ color: '#9B9590', textDecoration: 'none' }}>{product.category.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</Link>
          <span>/</span>
          <span style={{ color: '#1A1A1A' }}>{product.name}</span>
        </div>
      </nav>

      {/* ── Main PDP Grid ── */}
      <section className="vm-pdp" style={{ padding: '0 5vw 80px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '55% 1fr', gap: '64px' }}>
        {/* LEFT: Gallery */}
        <div>
          {/* Main Image */}
          <div
            onClick={() => setZoomed(!zoomed)}
            style={{ position: 'relative', width: '100%', aspectRatio: '1', backgroundColor: '#F5F4F0', overflow: 'hidden', cursor: 'zoom-in', marginBottom: '12px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover', transform: zoomed ? 'scale(1.5)' : 'scale(1)', transition: 'transform 400ms ease' }}
                  priority
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
            {product.isNew && (
              <span style={{ position: 'absolute', top: '16px', left: '16px', fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', backgroundColor: 'rgba(250,250,248,0.92)', padding: '6px 14px', backdropFilter: 'blur(4px)', zIndex: 2 }}>New</span>
            )}
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{ position: 'relative', width: '72px', height: '72px', backgroundColor: '#F5F4F0', border: selectedImage === i ? '2px solid #C4A265' : '1px solid #E8E5E0', cursor: 'pointer', overflow: 'hidden', padding: 0, transition: 'border-color 300ms ease' }}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill style={{ objectFit: 'cover' }} unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div style={{ paddingTop: '8px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>
            {product.category.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
          </p>
          <h1 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A', marginBottom: '8px' }}>{product.name}</h1>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '20px' }}>{product.subtitle}</p>
          <p style={{ fontFamily: font, fontSize: '28px', fontWeight: 300, color: '#1A1A1A', marginBottom: '32px' }}>{product.priceDisplay}</p>

          {/* Metal Selector */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px' }}>
              Metal: <span style={{ fontWeight: 300, color: '#9B9590' }}>{selectedMetal}</span>
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {metals.map((m) => (
                <button key={m} onClick={() => setSelectedMetal(m)} style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, padding: '10px 16px', border: selectedMetal === m ? '1px solid #C4A265' : '1px solid #E8E5E0', backgroundColor: selectedMetal === m ? '#1A1A1A' : 'transparent', color: selectedMetal === m ? '#FFFFFF' : '#1A1A1A', cursor: 'pointer', transition: 'all 200ms ease' }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector (rings only) */}
          {isRing && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A' }}>
                  Size: <span style={{ fontWeight: 300, color: '#9B9590' }}>{selectedSize}</span>
                </p>
                <Link href="/minimal/care" style={{ fontFamily: font, fontSize: '11px', color: '#C4A265', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Size Guide</Link>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: selectedSize === s ? '1px solid #C4A265' : '1px solid #E8E5E0', backgroundColor: selectedSize === s ? '#1A1A1A' : 'transparent', color: selectedSize === s ? '#FFFFFF' : '#1A1A1A', cursor: 'pointer', transition: 'all 200ms ease' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px' }}>Quantity</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E8E5E0' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><Minus size={14} color="#9B9590" /></button>
              <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, width: '44px', textAlign: 'center', color: '#1A1A1A' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><Plus size={14} color="#9B9590" /></button>
            </div>
          </div>

          {/* Add to Cart + Wishlist */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={() => { for (let i = 0; i < quantity; i++) addItem(product) }}
              className="vm-btn-gold"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#C4A265', padding: '16px 32px', border: 'none', cursor: 'pointer', transition: 'background-color 200ms ease' }}
            >
              Add to Cart — {product.priceDisplay}
            </button>
            <button
              onClick={() => toggleItem(product)}
              style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E8E5E0', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 200ms ease' }}
            >
              <Heart size={18} fill={inWishlist ? '#C4A265' : 'none'} color={inWishlist ? '#C4A265' : '#9B9590'} />
            </button>
          </div>

          {/* Share */}
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '11px', color: '#9B9590', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', padding: 0 }}
          >
            <Share2 size={14} /> Share this piece
          </button>

          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: '24px', padding: '20px 0', borderTop: '1px solid #E8E5E0', borderBottom: '1px solid #E8E5E0', marginBottom: '32px' }}>
            {[
              { icon: Truck, text: 'Free Insured Shipping' },
              { icon: Shield, text: 'GIA Certified' },
              { icon: RotateCcw, text: '30-Day Returns' },
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <b.icon size={16} strokeWidth={1.5} style={{ color: '#C4A265' }} />
                <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, color: '#9B9590' }}>{b.text}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <Accordion title="Description" defaultOpen>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#555' }}>{product.description}</p>
          </Accordion>
          {product.diamondSpecs && (
            <Accordion title="Diamond Specifications">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                {[
                  ['Carat', product.diamondSpecs.carat],
                  ['Cut', product.diamondSpecs.cut],
                  ['Color', product.diamondSpecs.color],
                  ['Clarity', product.diamondSpecs.clarity],
                  ['Shape', product.diamondSpecs.shape],
                  ['Origin', product.diamondSpecs.origin],
                  ['Certification', product.diamondSpecs.certification],
                ].filter(([,v]) => v).map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px 12px 0', borderBottom: '1px solid #F5F4F0' }}>
                    <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9590' }}>{label}</span>
                    <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A' }}>{value}</span>
                  </div>
                ))}
              </div>
            </Accordion>
          )}
          {product.features.length > 0 && (
            <Accordion title="Features">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {product.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#555' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C4A265', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </Accordion>
          )}
          <Accordion title="Shipping & Returns">
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#555' }}>
              Complimentary insured shipping on all orders. Delivered in our signature packaging within 3-5 business days. 30-day return policy for unworn items in original condition. International shipping available.
            </p>
          </Accordion>
          <Accordion title="Care Instructions">
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#555' }}>
              Store in the provided box when not worn. Clean gently with a soft cloth. Professional cleaning recommended every 6 months. Avoid contact with chemicals, perfumes, and abrasives. Complimentary lifetime cleaning and inspection included.
            </p>
          </Accordion>
        </div>
      </section>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section style={{ padding: '80px 5vw', maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid #E8E5E0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>You May Also Like</p>
              <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#1A1A1A' }}>Related Pieces</h2>
            </div>
            <Link href={`/minimal/category/${product.category}`} style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="vm-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {related.map((p) => (
              <Link key={p.id} href={`/minimal/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="vm-card-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '12px', overflow: 'hidden' }}>
                  <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover', transition: 'transform 600ms ease' }} unoptimized />
                </div>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{p.name}</p>
                <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{p.priceDisplay}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .vm-btn-gold:hover { background-color: #B3924F !important; }
        .vm-card-img:hover img { transform: scale(1.04) !important; }
        .vm-card-img:hover { box-shadow: 0 4px 20px rgba(180, 170, 160, 0.12) !important; }
        @media (max-width: 768px) {
          .vm-pdp { grid-template-columns: 1fr !important; gap: 32px !important; }
          .vm-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
