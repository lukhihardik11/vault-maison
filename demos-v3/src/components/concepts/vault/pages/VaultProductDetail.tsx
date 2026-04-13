'use client'
import { useState } from 'react'
import Link from 'next/link'
import { type Product, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { VaultLayout } from '../VaultLayout'
import { Heart, ShoppingBag, Share2, Shield, Truck, RotateCcw, ChevronDown, X, Minus, Plus } from 'lucide-react'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'
import { ElegantDarkButton } from '../ui/ElegantDarkButton'
import { VaultProductRevealCard } from '../ui/VaultProductRevealCard'

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
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
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
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(234,234,234,0.35)' }}>
          <Link href="/vault" style={{ color: 'rgba(234,234,234,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link>
          <span>/</span>
          <Link href="/vault/collections" style={{ color: 'rgba(234,234,234,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}>Collections</Link>
          <span>/</span>
          <Link href={`/vault/category/${product.category}`} style={{ color: 'rgba(234,234,234,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}>{product.category.replace(/-/g, ' ')}</Link>
          <span>/</span>
          <span style={{ color: GOLD }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 24px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
        {/* Gallery — with working thumbnails + zoom on hover */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Main image with zoom */}
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
            }}
            onClick={() => setLightboxOpen(true)}
            style={{
              aspectRatio: '1/1', borderRadius: 10, overflow: 'hidden',
              cursor: isZoomed ? 'zoom-in' : 'zoom-in',
              border: '1px solid rgba(212,175,55,0.1)', backgroundColor: SURFACE, position: 'relative',
            }}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transform: isZoomed ? 'scale(2)' : 'scale(1)',
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            />
            {product.isNew && (
              <span style={{
                position: 'absolute', top: 16, left: 16, padding: '6px 16px',
                background: `linear-gradient(135deg, ${GOLD}, #B8962E)`,
                color: BG, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 3,
                pointerEvents: 'none',
              }}>New</span>
            )}
            {product.isLimited && (
              <span style={{
                position: 'absolute', top: 16, right: 16, padding: '6px 16px',
                backgroundColor: 'rgba(212,175,55,0.1)', color: GOLD,
                fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                borderRadius: 3, border: '1px solid rgba(212,175,55,0.25)',
                backdropFilter: 'blur(8px)', pointerEvents: 'none',
              }}>Limited</span>
            )}
          </div>
          {/* Thumbnail row */}
          <div style={{ display: 'flex', gap: 10 }}>
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{
                  width: 80, height: 80, borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                  border: selectedImage === i ? `2px solid ${GOLD}` : '2px solid rgba(212,175,55,0.08)',
                  backgroundColor: SURFACE, padding: 0,
                  transition: 'all 0.3s ease',
                  opacity: selectedImage === i ? 1 : 0.5,
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: 10, fontWeight: 500 }}>
            {product.category.replace(/-/g, ' ')}
          </div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 400, color: TEXT, marginBottom: 8, lineHeight: 1.2 }}>{product.name}</h1>
          <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.45)', marginBottom: 24, lineHeight: 1.6 }}>{product.subtitle}</p>
          <div style={{ fontSize: 30, fontFamily: 'Cinzel, serif', color: TEXT, marginBottom: 32 }}>{product.priceDisplay}</div>

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
                  padding: '14px 8px', textAlign: 'center', borderRadius: 8,
                  backgroundColor: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(234,234,234,0.35)', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontFamily: 'Cinzel, serif', color: GOLD, fontWeight: 500 }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Metal Selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: TEXT, marginBottom: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Metal: <span style={{ color: 'rgba(234,234,234,0.45)', fontWeight: 400 }}>{selectedMetal}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {metals.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMetal(m)}
                  style={{
                    padding: '10px 18px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
                    backgroundColor: selectedMetal === m ? 'rgba(212,175,55,0.08)' : 'transparent',
                    border: selectedMetal === m ? `1px solid rgba(212,175,55,0.3)` : `1px solid ${MUTED}`,
                    color: selectedMetal === m ? GOLD : 'rgba(234,234,234,0.5)',
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
              <span style={{ fontSize: 10, fontWeight: 600, color: TEXT, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Size: <span style={{ color: 'rgba(234,234,234,0.45)', fontWeight: 400 }}>{selectedSize}</span>
              </span>
              <Link href="/vault/grading" style={{ fontSize: 12, color: GOLD, textDecoration: 'none', letterSpacing: '0.05em' }}>Size Guide</Link>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: 44, height: 44, borderRadius: 6, cursor: 'pointer', fontSize: 13,
                    backgroundColor: selectedSize === s ? GOLD : 'transparent',
                    border: selectedSize === s ? `1px solid ${GOLD}` : `1px solid ${MUTED}`,
                    color: selectedSize === s ? BG : 'rgba(234,234,234,0.5)',
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
            <div style={{ fontSize: 10, fontWeight: 600, color: TEXT, marginBottom: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Quantity</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: `1px solid rgba(212,175,55,0.1)`, borderRadius: 6, width: 'fit-content', overflow: 'hidden' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 44, height: 44, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}><Minus size={14} /></button>
              <span style={{ width: 44, textAlign: 'center', fontSize: 14, color: TEXT, borderLeft: '1px solid rgba(212,175,55,0.08)', borderRight: '1px solid rgba(212,175,55,0.08)' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 44, height: 44, background: 'none', border: 'none', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}><Plus size={14} /></button>
            </div>
          </div>

          {/* Add to Cart + Wishlist */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <SparkleGlowButton onClick={() => addItem(product, selectedSize)}>
                <ShoppingBag size={16} style={{ marginRight: 8 }} /> Add to Cart — {product.priceDisplay}
              </SparkleGlowButton>
            </div>
            <button
              onClick={() => isWished ? removeWish(product.id) : addWish(product)}
              style={{
                width: 52, height: 52, borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${isWished ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.1)'}`,
                backgroundColor: isWished ? 'rgba(212,175,55,0.08)' : 'transparent',
                color: isWished ? GOLD : 'rgba(234,234,234,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
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
                <span style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', letterSpacing: '0.03em' }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, cursor: 'pointer' }}>
            <Share2 size={14} color="rgba(234,234,234,0.35)" />
            <span style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', letterSpacing: '0.05em' }}>Share this piece</span>
          </div>

          {/* Accordions */}
          <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}>
            {accordions.map((a) => (
              <div key={a.key} style={{ borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === a.key ? null : a.key)}
                  style={{
                    width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: openAccordion === a.key ? TEXT : 'rgba(234,234,234,0.6)',
                    fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {a.title}
                  <ChevronDown
                    size={16}
                    color={openAccordion === a.key ? GOLD : 'rgba(234,234,234,0.3)'}
                    style={{
                      transition: 'transform 0.3s ease, color 0.3s ease',
                      transform: openAccordion === a.key ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <div style={{
                  maxHeight: openAccordion === a.key ? 300 : 0, overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(234,234,234,0.5)', paddingBottom: 20 }}>{a.content}</p>
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
            backgroundColor: 'rgba(0,0,0,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(12px)',
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
            style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 10 }}
          />
        </div>
      )}

      {/* Related Products — using VaultProductRevealCard */}
      {related.length > 0 && (
        <section style={{ padding: '100px 24px', backgroundColor: SURFACE }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
              <div>
                <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>You May Also Like</span>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px, 3vw, 30px)', fontWeight: 400, color: TEXT, marginTop: 8 }}>Related Pieces</h2>
              </div>
              <ElegantDarkButton href={`/vault/category/${product.category}`}>
                View All
              </ElegantDarkButton>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map((p) => (
                <VaultProductRevealCard
                  key={p.slug}
                  name={p.name}
                  price={p.priceDisplay}
                  image={p.images[0]}
                  description={p.description?.slice(0, 120) || p.subtitle}
                  category={p.category.replace(/-/g, ' ')}
                  href={`/vault/product/${p.slug}`}
                  isNew={p.isNew}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </VaultLayout>
  )
}
