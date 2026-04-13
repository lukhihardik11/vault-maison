'use client'
import { useState } from 'react'
import Link from 'next/link'
import { type Product, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { VaultLayout } from '../VaultLayout'
import { Heart, ShoppingBag, Share2, Shield, Truck, RotateCcw, ChevronDown, ChevronUp, X, Minus, Plus, ArrowRight, Diamond } from 'lucide-react'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

export function VaultProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('7')
  const [selectedMetal, setSelectedMetal] = useState(product.goldColor ? `${product.goldColor} Gold` : metals[0])
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')
  const addItem = useCartStore((s) => s.addItem)
  const { items: wishlist, addItem: addWish, removeItem: removeWish } = useWishlistStore()
  const isWished = wishlist.some((w) => w.id === product.id)
  const related = getRelatedProducts(product.id, 4)

  const accordions = [
    { key: 'description', title: 'Description', content: product.description },
    ...(product.diamondSpecs ? [{
      key: 'specs',
      title: 'Diamond Specifications',
      content: `Carat: ${product.diamondSpecs.carat} · Cut: ${product.diamondSpecs.cut} · Color: ${product.diamondSpecs.color} · Clarity: ${product.diamondSpecs.clarity} · Shape: ${product.diamondSpecs.shape} · Origin: ${product.diamondSpecs.origin} · Certification: ${product.diamondSpecs.certification}`,
    }] : []),
    { key: 'features', title: 'Features', content: product.features.join(' · ') },
    { key: 'shipping', title: 'Shipping & Returns', content: 'Complimentary insured shipping worldwide. 30-day returns with full refund. Each piece arrives in our signature presentation box.' },
    { key: 'care', title: 'Care Instructions', content: 'Store in the provided jewelry box. Clean with a soft cloth. Avoid contact with chemicals. Annual professional inspection recommended.' },
  ]

  return (
    <VaultLayout>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '100px 24px 0' }}>
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(234,234,234,0.4)' }}>
          <Link href="/vault" style={{ color: 'rgba(234,234,234,0.4)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/vault/collections" style={{ color: 'rgba(234,234,234,0.4)', textDecoration: 'none' }}>Collections</Link>
          <span>/</span>
          <Link href={`/vault/category/${product.category}`} style={{ color: 'rgba(234,234,234,0.4)', textDecoration: 'none' }}>{product.category.replace(/-/g, ' ')}</Link>
          <span>/</span>
          <span style={{ color: GOLD }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        {/* Gallery */}
        <div>
          <div
            onClick={() => setLightboxOpen(true)}
            style={{
              aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'zoom-in',
              border: '1px solid rgba(212,175,55,0.15)', backgroundColor: SURFACE, position: 'relative',
            }}
          >
            <img src={product.images[selectedImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {product.isNew && (
              <span style={{ position: 'absolute', top: 16, left: 16, padding: '6px 14px', backgroundColor: GOLD, color: BG, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>New</span>
            )}
            {product.isLimited && (
              <span style={{ position: 'absolute', top: 16, right: 16, padding: '6px 14px', backgroundColor: 'rgba(212,175,55,0.15)', color: GOLD, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2, border: '1px solid rgba(212,175,55,0.3)' }}>Limited</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{
                  width: 80, height: 80, borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
                  border: selectedImage === i ? `2px solid ${GOLD}` : '1px solid rgba(212,175,55,0.15)',
                  backgroundColor: SURFACE, padding: 0,
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 8 }}>
            {product.category.replace(/-/g, ' ')}
          </div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 400, color: TEXT, marginBottom: 8 }}>{product.name}</h1>
          <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.5)', marginBottom: 24 }}>{product.subtitle}</p>
          <div style={{ fontSize: 28, fontFamily: 'Cinzel, serif', color: TEXT, marginBottom: 32 }}>{product.priceDisplay}</div>

          {/* Diamond Specs Cards */}
          {product.diamondSpecs && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
              {[
                { label: 'Carat', value: product.diamondSpecs.carat },
                { label: 'Cut', value: product.diamondSpecs.cut },
                { label: 'Color', value: product.diamondSpecs.color },
                { label: 'Clarity', value: product.diamondSpecs.clarity },
              ].map((s) => (
                <div key={s.label} style={{
                  padding: '12px 8px', textAlign: 'center', borderRadius: 6,
                  backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)',
                }}>
                  <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(234,234,234,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: GOLD, fontWeight: 500 }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Metal Selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: TEXT, marginBottom: 10, letterSpacing: '0.05em' }}>
              METAL: <span style={{ color: 'rgba(234,234,234,0.5)' }}>{selectedMetal}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {metals.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMetal(m)}
                  style={{
                    padding: '10px 16px', fontSize: 12, borderRadius: 4, cursor: 'pointer',
                    backgroundColor: selectedMetal === m ? 'rgba(212,175,55,0.1)' : 'transparent',
                    border: selectedMetal === m ? `1px solid ${GOLD}` : `1px solid ${MUTED}`,
                    color: selectedMetal === m ? GOLD : 'rgba(234,234,234,0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: TEXT, letterSpacing: '0.05em' }}>SIZE: <span style={{ color: 'rgba(234,234,234,0.5)' }}>{selectedSize}</span></span>
              <Link href="/vault/grading" style={{ fontSize: 12, color: GOLD, textDecoration: 'none' }}>Size Guide</Link>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: 44, height: 44, borderRadius: 4, cursor: 'pointer', fontSize: 13,
                    backgroundColor: selectedSize === s ? GOLD : 'transparent',
                    border: selectedSize === s ? `1px solid ${GOLD}` : `1px solid ${MUTED}`,
                    color: selectedSize === s ? BG : 'rgba(234,234,234,0.6)',
                    fontWeight: selectedSize === s ? 600 : 400,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: TEXT, marginBottom: 10, letterSpacing: '0.05em' }}>QUANTITY</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: `1px solid ${MUTED}`, borderRadius: 4, width: 'fit-content' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 44, height: 44, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14} /></button>
              <span style={{ width: 44, textAlign: 'center', fontSize: 14, color: TEXT }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 44, height: 44, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14} /></button>
            </div>
          </div>

          {/* Add to Cart + Wishlist */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <button
              onClick={() => addItem(product, selectedSize)}
              style={{
                flex: 1, padding: '16px 32px', backgroundColor: GOLD, color: BG,
                border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <ShoppingBag size={16} /> Add to Cart — {product.priceDisplay}
            </button>
            <button
              onClick={() => isWished ? removeWish(product.id) : addWish(product)}
              style={{
                width: 52, height: 52, borderRadius: 4, cursor: 'pointer',
                border: `1px solid ${isWished ? GOLD : MUTED}`,
                backgroundColor: isWished ? 'rgba(212,175,55,0.1)' : 'transparent',
                color: isWished ? GOLD : 'rgba(234,234,234,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Heart size={18} fill={isWished ? GOLD : 'none'} />
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            {[
              { icon: Truck, label: 'Free Insured Shipping' },
              { icon: Shield, label: 'GIA Certified' },
              { icon: RotateCcw, label: '30-Day Returns' },
            ].map((b) => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b.icon size={14} color={GOLD} />
                <span style={{ fontSize: 12, color: 'rgba(234,234,234,0.5)' }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
            <Share2 size={14} color="rgba(234,234,234,0.4)" />
            <span style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)' }}>Share this piece</span>
          </div>

          {/* Accordions */}
          <div style={{ borderTop: `1px solid ${MUTED}` }}>
            {accordions.map((a) => (
              <div key={a.key} style={{ borderBottom: `1px solid ${MUTED}` }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === a.key ? null : a.key)}
                  style={{
                    width: '100%', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer', color: TEXT, fontSize: 13,
                    fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}
                >
                  {a.title}
                  {openAccordion === a.key ? <ChevronUp size={16} color="rgba(234,234,234,0.4)" /> : <ChevronDown size={16} color="rgba(234,234,234,0.4)" />}
                </button>
                <div style={{
                  maxHeight: openAccordion === a.key ? 300 : 0, overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(234,234,234,0.6)', paddingBottom: 18 }}>{a.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'vaultFadeIn 0.3s ease',
          }}
        >
          <button onClick={() => setLightboxOpen(false)} style={{
            position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: TEXT, cursor: 'pointer',
          }}>
            <X size={24} />
          </button>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }}
          />
        </div>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: '80px 24px', backgroundColor: SURFACE }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>You May Also Like</span>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 400, color: TEXT, marginTop: 8 }}>Related Pieces</h2>
              </div>
              <Link href={`/vault/category/${product.category}`} style={{ color: GOLD, textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map((p) => (
                <Link key={p.slug} href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.15)', backgroundColor: BG, transition: 'transform 0.4s ease, box-shadow 0.4s ease' }}>
                    <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 4 }}>{p.category.replace(/-/g, ' ')}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 14, fontFamily: 'Cinzel, serif', color: TEXT }}>{p.priceDisplay}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </VaultLayout>
  )
}
