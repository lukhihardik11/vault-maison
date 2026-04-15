'use client'
import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MK, MarketplaceSection, RevealSection, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { RarityBadge } from '../ui'
import { getProduct, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { Heart, Share2, Shield, Truck, RotateCcw, Minus, Plus, X, ChevronRight, RotateCw, Check, Ruler, Award, Gift } from 'lucide-react'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

export function MarketplaceProductDetail() {
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
  const [activeTab, setActiveTab] = useState<'details' | 'provenance' | 'care'>('details')
  const imgRef = useRef<HTMLDivElement>(null)

  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()

  if (!product) return <MarketplaceSection><p style={{ color: MK.text }}>Lot not found in catalog.</p></MarketplaceSection>

  const wishlisted = isInWishlist(product.id)
  const related = getRelatedProducts(product.id, 4)

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

  const lotNumber = `LOT-${product.id.slice(0, 6).toUpperCase()}`

  return (
    <>
      {/* Breadcrumb */}
      <section style={{ background: MK.bg, padding: '90px 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: MK.textSecondary }}>
            <Link href="/marketplace" style={{ color: MK.textSecondary, textDecoration: 'none' }}>Marketplace</Link>
            <ChevronRight size={10} color={MK.textSecondary} />
            <Link href="/marketplace/collections" style={{ color: MK.textSecondary, textDecoration: 'none' }}>Catalog</Link>
            <ChevronRight size={10} color={MK.textSecondary} />
            <span style={{ color: MK.accent }}>{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main Product */}
      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 48 }}>
          {/* Left: Gallery */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: `${MK.amber}15`, border: `1px solid ${MK.amber}40` }}>
                <Award size={14} color={MK.amber} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: MK.amber, letterSpacing: '0.1em' }}>{lotNumber}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: `${MK.accent}10`, border: `1px solid ${MK.accent}30` }}>
                <RotateCw size={12} color={MK.accent} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: MK.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>360 Live View</span>
              </div>
            </div>
            <div
              ref={imgRef}
              onClick={() => setLightboxOpen(true)}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              style={{ position: 'relative', height: 520, overflow: 'hidden', cursor: 'crosshair', border: `1px solid ${MK.border}`, background: MK.surface }}
            >
              <Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'cover', transform: isZoomed ? 'scale(2)' : 'scale(1)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: isZoomed ? 'none' : 'transform 0.3s ease' }} />
              {product.isLimited && <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', background: MK.urgent, color: '#fff', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Limited</div>}
              {product.isNew && <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', background: MK.accent, color: '#fff', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>New Listing</div>}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} style={{ position: 'relative', width: 80, height: 80, overflow: 'hidden', cursor: 'pointer', border: selectedImage === i ? `2px solid ${MK.accent}` : `1px solid ${MK.border}`, background: 'none', padding: 0 }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div style={{ paddingTop: 8 }}>
            <SectionLabel label="Lot Details" style={{ marginBottom: 16 }} />
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 600, color: MK.text, margin: '0 0 4px' }}>{product.name}</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, margin: '0 0 16px' }}>{product.subtitle}</p>
            <div style={{ padding: '16px', background: `${MK.accent}08`, border: `1px solid ${MK.accent}30`, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.accent }}>${product.price.toLocaleString()}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: MK.textSecondary, marginTop: 4 }}>Market estimate: ${Math.round(product.price * 1.15).toLocaleString()} &mdash; ${Math.round(product.price * 1.35).toLocaleString()}</div>
            </div>
            <LotDivider style={{ marginBottom: 20 }} />

            {/* Size */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: MK.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size: <span style={{ color: MK.accent }}>{selectedSize}</span></span>
                <button onClick={() => setShowSizeGuide(true)} style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: MK.accent, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Ruler size={12} /> Size Guide</button>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    width: 44, height: 36, fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
                    border: selectedSize === s ? `2px solid ${MK.accent}` : `1px solid ${MK.border}`,
                    background: selectedSize === s ? `${MK.accent}15` : 'transparent',
                    color: selectedSize === s ? MK.accent : MK.textSecondary, cursor: 'pointer',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Metal */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: MK.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Metal: <span style={{ color: MK.accent }}>{selectedMetal}</span></span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {metals.map(m => {
                  const colors: Record<string, string> = { 'White Gold': '#E8E8E8', 'Yellow Gold': '#FFD700', 'Rose Gold': '#B76E79', 'Platinum': '#C0C0C0' }
                  return (
                    <button key={m} onClick={() => setSelectedMetal(m)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                      border: selectedMetal === m ? `2px solid ${MK.accent}` : `1px solid ${MK.border}`,
                      background: selectedMetal === m ? `${MK.accent}10` : 'transparent', cursor: 'pointer',
                    }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: colors[m], border: `1px solid ${MK.border}` }} />
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: selectedMetal === m ? MK.accent : MK.textSecondary }}>{m}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: MK.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${MK.border}`, width: 'fit-content' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity <= 1 ? MK.border : MK.textSecondary, cursor: quantity <= 1 ? 'not-allowed' : 'pointer' }}><Minus size={14} /></button>
                <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: MK.text, borderLeft: `1px solid ${MK.border}`, borderRight: `1px solid ${MK.border}` }}>{quantity}</div>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} disabled={quantity >= 10} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity >= 10 ? MK.border : MK.textSecondary, cursor: quantity >= 10 ? 'not-allowed' : 'pointer' }}><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button onClick={handleAddToCart} style={{
                flex: 1, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: addedToCart ? MK.success : MK.accent, color: '#fff',
                fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }}>
                {addedToCart ? <><Check size={16} /> Secured</> : <>Acquire Now &mdash; ${(product.price * quantity).toLocaleString()}</>}
              </button>
              <button onClick={() => toggleItem(product)} style={{
                width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: `1px solid ${wishlisted ? MK.amber : MK.border}`,
                color: wishlisted ? MK.amber : MK.textSecondary, cursor: 'pointer',
              }}><Heart size={18} fill={wishlisted ? MK.amber : 'none'} /></button>
              <button style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${MK.border}`, color: MK.textSecondary, cursor: 'pointer' }}><Share2 size={18} /></button>
            </div>

            {/* Trust */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, padding: '20px 0', borderTop: `1px solid ${MK.border}` }}>
              {[
                { icon: <Shield size={14} />, label: 'Verified', sub: 'Authenticated' },
                { icon: <Truck size={14} />, label: 'Insured', sub: 'Free shipping' },
                { icon: <RotateCcw size={14} />, label: '30 Days', sub: 'Returns' },
                { icon: <Gift size={14} />, label: 'Packaging', sub: 'Premium' },
              ].map((g, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span style={{ color: MK.accent, display: 'block', marginBottom: 4 }}>{g.icon}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: MK.text, display: 'block' }}>{g.label}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', color: MK.textSecondary }}>{g.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MarketplaceSection>

      {/* Tabs */}
      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${MK.border}`, marginBottom: 24 }}>
            {(['details', 'provenance', 'care'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '12px 24px', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
                letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${MK.accent}` : '2px solid transparent',
                color: activeTab === tab ? MK.accent : MK.textSecondary, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ maxWidth: 800 }}>
            {activeTab === 'details' && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MK.textSecondary, lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>{product.description}</p>
                <p style={{ marginBottom: 16 }}>This piece has been independently verified and authenticated by our panel of expert gemologists. Every aspect has been documented and certified to ensure complete transparency in the marketplace.</p>
                <p>Material: {product.material}{product.goldKarat ? ` · ${product.goldKarat}` : ''}{product.goldColor ? ` · ${product.goldColor}` : ''}</p>
                <ul style={{ marginTop: 16, paddingLeft: 20 }}>
                  {product.features.map((f, i) => <li key={i} style={{ marginBottom: 6 }}>{f}</li>)}
                </ul>
              </div>
            )}
            {activeTab === 'provenance' && (
              <div>
                {(product.diamondSpecs ? [
                  { label: 'Cut', value: product.diamondSpecs.cut },
                  { label: 'Clarity', value: product.diamondSpecs.clarity },
                  { label: 'Color', value: product.diamondSpecs.color },
                  { label: 'Carat', value: product.diamondSpecs.carat },
                  { label: 'Shape', value: product.diamondSpecs.shape },
                  { label: 'Origin', value: product.diamondSpecs.origin },
                  { label: 'Certification', value: product.diamondSpecs.certification },
                ] : [
                  { label: 'Material', value: product.material },
                  { label: 'Karat', value: product.goldKarat || 'N/A' },
                  { label: 'Color', value: product.goldColor || 'N/A' },
                ]).map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${MK.border}` }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: MK.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: MK.accent, fontWeight: 500 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'care' && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MK.textSecondary, lineHeight: 1.8 }}>
                <p style={{ marginBottom: 12 }}>Store in the provided case when not wearing. Avoid contact with perfumes, lotions, and harsh chemicals.</p>
                <p style={{ marginBottom: 12 }}>Clean gently with a soft cloth. For deeper cleaning, use warm water with mild soap and a soft brush.</p>
                <p style={{ marginBottom: 12 }}>Professional cleaning recommended every 6-12 months to maintain brilliance.</p>
                <p>Lifetime warranty covering manufacturing defects and complimentary annual maintenance included.</p>
              </div>
            )}
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* Market Context */}
      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel label="Market Intelligence" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 600, color: MK.text, margin: '0 0 16px' }}>Investment Potential</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MK.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Pieces of this caliber have shown consistent appreciation in the secondary market. Our data analysts track over 10,000 comparable sales annually to provide accurate market positioning.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[{ val: '+12%', lbl: 'YoY Growth' }, { val: '97%', lbl: 'Retention' }, { val: 'AAA', lbl: 'Rating' }].map((d, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${MK.accent}`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: MK.accent }}>{d.val}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: MK.textSecondary, textTransform: 'uppercase' }}>{d.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/marketplace/auction-gavel.jpg" alt="Market" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* Related */}
      {related.length > 0 && (
        <MarketplaceSection alt>
          <RevealSection>
            <SectionLabel label="Similar Lots" style={{ marginBottom: 32 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/marketplace/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ border: `1px solid ${MK.border}`, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text, margin: '0 0 4px' }}>{p.name}</h3>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: MK.accent }}>${p.price.toLocaleString()}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RevealSection>
        </MarketplaceSection>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${MK.border}`, color: '#fff', cursor: 'pointer', zIndex: 10 }}><X size={20} /></button>
          <div style={{ position: 'relative', width: '80vw', height: '80vh' }}><Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'contain' }} /></div>
        </div>
      )}

      {/* Size Guide */}
      {showSizeGuide && (
        <div onClick={() => setShowSizeGuide(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: MK.surface, border: `1px solid ${MK.border}`, padding: 32, maxWidth: 500, width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', color: MK.text, margin: 0 }}>Ring Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} style={{ background: 'none', border: 'none', color: MK.textSecondary, cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>{['US Size', 'Diameter (mm)', 'Circumference (mm)'].map(h => <th key={h} style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: MK.accent, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 12px', borderBottom: `1px solid ${MK.border}`, textAlign: 'left' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {[['5','15.7','49.3'],['5.5','16.0','50.3'],['6','16.5','51.8'],['6.5','16.9','53.1'],['7','17.3','54.4'],['7.5','17.7','55.7'],['8','18.1','57.0'],['8.5','18.5','58.3'],['9','18.9','59.5']].map(([size, dia, circ]) => (
                  <tr key={size} style={{ background: selectedSize === size ? `${MK.accent}10` : 'transparent' }}>
                    <td style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: selectedSize === size ? MK.accent : MK.text, padding: '8px 12px', borderBottom: `1px solid ${MK.border}` }}>{size}</td>
                    <td style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: MK.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${MK.border}` }}>{dia}</td>
                    <td style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: MK.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${MK.border}` }}>{circ}</td>
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
