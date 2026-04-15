'use client'
import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MS, MaisonSection, RevealSection, SectionLabel, GoldDivider } from '../MaisonLayout'
import { ElegantCard } from '../ui'
import { getProduct, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { Heart, Share2, Shield, Truck, RotateCcw, Minus, Plus, X, ChevronRight, RotateCw, Check, Ruler, Gift } from 'lucide-react'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

export function MaisonProductDetail() {
  const params = useParams()
  const product = getProduct(params.slug as string)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('7')
  const [selectedMetal, setSelectedMetal] = useState(() => {
    if (!product) return metals[0]
    return product.goldColor ? `${product.goldColor} Gold` : metals[0]
  })
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'care'>('description')
  const imgRef = useRef<HTMLDivElement>(null)

  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()

  if (!product) return <MaisonSection><p style={{ color: MS.text }}>This piece is not available.</p></MaisonSection>

  const wishlisted = isInWishlist(product.id)
  const related = getRelatedProducts(product.id, 3)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize, selectedMetal)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }, [])

  return (
    <>
      {/* Breadcrumb */}
      <section style={{ background: MS.bg, padding: '90px 0 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary }}>
            <Link href="/maison" style={{ color: MS.textSecondary, textDecoration: 'none' }}>Maison</Link>
            <ChevronRight size={10} color={MS.textSecondary} />
            <Link href="/maison/collections" style={{ color: MS.textSecondary, textDecoration: 'none' }}>Collections</Link>
            <ChevronRight size={10} color={MS.textSecondary} />
            <span style={{ color: MS.accent }}>{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main Product */}
      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 48 }}>
          {/* Left: Gallery */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 16px', background: `${MS.accent}08`, borderLeft: `3px solid ${MS.accent}` }}>
              <RotateCw size={14} color={MS.accent} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MS.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>360 View</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MS.textSecondary, marginLeft: 'auto' }}>GemLightBox Hub</span>
            </div>
            <div
              ref={imgRef}
              onClick={() => setLightboxOpen(true)}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              style={{ position: 'relative', height: 540, overflow: 'hidden', cursor: 'crosshair', border: `1px solid ${MS.border}`, background: MS.card }}
            >
              <Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'cover', transform: isZoomed ? 'scale(2)' : 'scale(1)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: isZoomed ? 'none' : 'transform 0.3s ease' }} />
              {product.isNew && <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 12px', background: MS.accent, color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>New</div>}
              {product.isBestseller && <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 12px', background: MS.accentLight, color: MS.text, fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Bestseller</div>}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} style={{ position: 'relative', width: 80, height: 80, overflow: 'hidden', cursor: 'pointer', border: selectedImage === i ? `2px solid ${MS.accent}` : `1px solid ${MS.border}`, background: 'none', padding: 0 }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div style={{ paddingTop: 8 }}>
            <SectionLabel label={product.category} style={{ marginBottom: 16 }} />
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 500, color: MS.text, margin: '0 0 4px' }}>{product.name}</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, margin: '0 0 16px' }}>{product.subtitle}</p>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 600, color: MS.accent, marginBottom: 20 }}>${product.price.toLocaleString()}</div>
            <GoldDivider style={{ marginBottom: 20 }} />

            {/* Size */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Size: <span style={{ color: MS.accent }}>{selectedSize}</span></span>
                <button onClick={() => setShowSizeGuide(true)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MS.accent, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Ruler size={12} /> Size Guide</button>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    width: 44, height: 36, fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem',
                    border: selectedSize === s ? `2px solid ${MS.accent}` : `1px solid ${MS.border}`,
                    background: selectedSize === s ? `${MS.accent}10` : MS.card,
                    color: selectedSize === s ? MS.accent : MS.textSecondary, cursor: 'pointer', borderRadius: 2,
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Metal */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Metal: <span style={{ color: MS.accent }}>{selectedMetal}</span></span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {metals.map(m => {
                  const colors: Record<string, string> = { 'White Gold': '#E8E8E8', 'Yellow Gold': '#FFD700', 'Rose Gold': '#B76E79', 'Platinum': '#C0C0C0' }
                  return (
                    <button key={m} onClick={() => setSelectedMetal(m)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 2,
                      border: selectedMetal === m ? `2px solid ${MS.accent}` : `1px solid ${MS.border}`,
                      background: selectedMetal === m ? `${MS.accent}08` : MS.card, cursor: 'pointer',
                    }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: colors[m], border: `1px solid ${MS.border}` }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: selectedMetal === m ? MS.accent : MS.textSecondary }}>{m}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${MS.border}`, width: 'fit-content', borderRadius: 2 }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity <= 1 ? MS.border : MS.textSecondary, cursor: quantity <= 1 ? 'not-allowed' : 'pointer' }}><Minus size={14} /></button>
                <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: MS.text, borderLeft: `1px solid ${MS.border}`, borderRight: `1px solid ${MS.border}` }}>{quantity}</div>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} disabled={quantity >= 10} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity >= 10 ? MS.border : MS.textSecondary, cursor: quantity >= 10 ? 'not-allowed' : 'pointer' }}><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <button onClick={handleAddToCart} style={{
                flex: 1, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 2,
                background: addedToCart ? MS.success : MS.accent, color: '#fff',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }}>
                {addedToCart ? <><Check size={16} /> Added</> : <>Add to Collection &mdash; ${(product.price * quantity).toLocaleString()}</>}
              </button>
              <button onClick={() => toggleItem(product)} style={{
                width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2,
                background: MS.card, border: `1px solid ${wishlisted ? MS.accent : MS.border}`,
                color: wishlisted ? MS.accent : MS.textSecondary, cursor: 'pointer',
              }}><Heart size={18} fill={wishlisted ? MS.accent : 'none'} /></button>
              <button style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, background: MS.card, border: `1px solid ${MS.border}`, color: MS.textSecondary, cursor: 'pointer' }}><Share2 size={18} /></button>
            </div>

            {/* Trust */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, padding: '16px 0', borderTop: `1px solid ${MS.border}` }}>
              {[
                { icon: <Shield size={14} />, label: 'Certified', sub: 'Authentic' },
                { icon: <Truck size={14} />, label: 'Free Ship', sub: 'Insured' },
                { icon: <RotateCcw size={14} />, label: '30 Days', sub: 'Returns' },
                { icon: <Gift size={14} />, label: 'Gift Wrap', sub: 'Complimentary' },
              ].map((g, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span style={{ color: MS.accent, display: 'block', marginBottom: 4 }}>{g.icon}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MS.text, display: 'block' }}>{g.label}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', color: MS.textSecondary }}>{g.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaisonSection>

      {/* Tabs */}
      <MaisonSection alt>
        <RevealSection>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${MS.border}`, marginBottom: 24 }}>
            {(['description', 'specifications', 'care'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '12px 24px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${MS.accent}` : '2px solid transparent',
                color: activeTab === tab ? MS.accent : MS.textSecondary, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ maxWidth: 800 }}>
            {activeTab === 'description' && (
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.textSecondary, lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>{product.description}</p>
                <p style={{ marginBottom: 16 }}>Crafted with the timeless elegance that defines our maison, this piece embodies the perfect balance of heritage craftsmanship and contemporary design sensibility.</p>
                <p>Material: {product.material}{product.goldKarat ? ` · ${product.goldKarat}` : ''}{product.goldColor ? ` · ${product.goldColor}` : ''}</p>
                <ul style={{ marginTop: 16, paddingLeft: 20 }}>
                  {product.features.map((f, i) => <li key={i} style={{ marginBottom: 6 }}>{f}</li>)}
                </ul>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div>
                {(product.diamondSpecs ? [
                  { label: 'Cut', value: product.diamondSpecs.cut },
                  { label: 'Clarity', value: product.diamondSpecs.clarity },
                  { label: 'Color', value: product.diamondSpecs.color },
                  { label: 'Carat', value: product.diamondSpecs.carat },
                  { label: 'Shape', value: product.diamondSpecs.shape },
                  { label: 'Certification', value: product.diamondSpecs.certification },
                ] : [
                  { label: 'Material', value: product.material },
                  { label: 'Karat', value: product.goldKarat || 'N/A' },
                  { label: 'Color', value: product.goldColor || 'N/A' },
                ]).map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${MS.border}` }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.accent, fontWeight: 500 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'care' && (
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.textSecondary, lineHeight: 1.8 }}>
                <p style={{ marginBottom: 12 }}>Store in the provided case when not wearing. Avoid contact with perfumes, lotions, and harsh chemicals.</p>
                <p style={{ marginBottom: 12 }}>Clean gently with a soft cloth. For deeper cleaning, use warm water with mild soap and a soft brush.</p>
                <p style={{ marginBottom: 12 }}>Professional cleaning recommended every 6-12 months to maintain brilliance.</p>
                <p>Lifetime warranty covering manufacturing defects and complimentary annual maintenance included.</p>
              </div>
            )}
          </div>
        </RevealSection>
      </MaisonSection>

      {/* Heritage Section */}
      <MaisonSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/maison/atelier-workspace.jpg" alt="Atelier" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <SectionLabel label="Heritage" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 500, color: MS.text, margin: '0 0 16px' }}>The Art of the Maison</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Every piece that bears our name is the result of generations of expertise. Our master artisans bring together traditional techniques and modern innovation to create jewelry that transcends time.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[{ val: '120h', lbl: 'Craft Hours' }, { val: '8', lbl: 'Artisans' }, { val: '35', lbl: 'Steps' }].map((d, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${MS.accent}`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: MS.accent }}>{d.val}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MS.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{d.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </MaisonSection>

      {/* Related */}
      {related.length > 0 && (
        <MaisonSection alt>
          <RevealSection>
            <SectionLabel label="You May Also Love" style={{ marginBottom: 32 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {related.map(p => (
                <ElegantCard key={p.slug} image={p.images[0]} title={p.name} subtitle={p.subtitle} price={p.price} href={`/maison/product/${p.slug}`} />
              ))}
            </div>
          </RevealSection>
        </MaisonSection>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${MS.border}`, color: '#fff', cursor: 'pointer', zIndex: 10 }}><X size={20} /></button>
          <div style={{ position: 'relative', width: '80vw', height: '80vh' }}><Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'contain' }} /></div>
        </div>
      )}

      {/* Size Guide */}
      {showSizeGuide && (
        <div onClick={() => setShowSizeGuide(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: MS.card, border: `1px solid ${MS.border}`, padding: 32, maxWidth: 500, width: '90%', borderRadius: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: MS.text, margin: 0 }}>Ring Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} style={{ background: 'none', border: 'none', color: MS.textSecondary, cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>{['US Size', 'Diameter (mm)', 'Circumference (mm)'].map(h => <th key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MS.accent, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 12px', borderBottom: `1px solid ${MS.border}`, textAlign: 'left' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {[['5','15.7','49.3'],['5.5','16.0','50.3'],['6','16.5','51.8'],['6.5','16.9','53.1'],['7','17.3','54.4'],['7.5','17.7','55.7'],['8','18.1','57.0'],['8.5','18.5','58.3'],['9','18.9','59.5']].map(([size, dia, circ]) => (
                  <tr key={size} style={{ background: selectedSize === size ? `${MS.accent}08` : 'transparent' }}>
                    <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: selectedSize === size ? MS.accent : MS.text, padding: '8px 12px', borderBottom: `1px solid ${MS.border}` }}>{size}</td>
                    <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${MS.border}` }}>{dia}</td>
                    <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${MS.border}` }}>{circ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
