'use client'
import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { TH, TheaterSection, RevealSection, ActLabel, GoldRule } from '../TheaterLayout'
import { getProduct, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { Heart, Share2, Shield, Truck, RotateCcw, Minus, Plus, X, ChevronRight, RotateCw, Check, Ruler, Gift } from 'lucide-react'

const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum']

export function TheaterProductDetail() {
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
  const [activeTab, setActiveTab] = useState<'story' | 'specs' | 'care'>('story')
  const imgRef = useRef<HTMLDivElement>(null)

  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()

  if (!product) return <TheaterSection><p style={{ color: TH.text }}>This act has not yet been written.</p></TheaterSection>

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

  return (
    <>
      {/* Breadcrumb */}
      <section style={{ background: TH.bg, padding: '90px 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.textSecondary }}>
            <Link href="/theater" style={{ color: TH.textSecondary, textDecoration: 'none' }}>Theater</Link>
            <ChevronRight size={10} color={TH.textSecondary} />
            <Link href="/theater/collections" style={{ color: TH.textSecondary, textDecoration: 'none' }}>Collections</Link>
            <ChevronRight size={10} color={TH.textSecondary} />
            <span style={{ color: TH.gold }}>{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main Product */}
      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 48 }}>
          {/* Left: Gallery */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 16px', background: `${TH.accent}10`, borderLeft: `3px solid ${TH.accent}` }}>
              <RotateCw size={14} color={TH.gold} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>360 Spotlight View</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.textSecondary, marginLeft: 'auto' }}>GemLightBox Hub</span>
            </div>
            <div
              ref={imgRef}
              onClick={() => setLightboxOpen(true)}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              style={{ position: 'relative', height: 540, overflow: 'hidden', cursor: 'crosshair', border: `1px solid ${TH.border}`, background: TH.surface }}
            >
              <Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'cover', transform: isZoomed ? 'scale(2)' : 'scale(1)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: isZoomed ? 'none' : 'transform 0.3s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 60%, ${TH.bg}80 100%)`, pointerEvents: 'none' }} />
              {product.isNew && <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 12px', background: TH.accent, color: '#fff', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Premiere</div>}
              {product.isBestseller && <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 12px', background: TH.gold, color: '#000', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Standing Ovation</div>}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} style={{ position: 'relative', width: 80, height: 80, overflow: 'hidden', cursor: 'pointer', border: selectedImage === i ? `2px solid ${TH.gold}` : `1px solid ${TH.border}`, background: 'none', padding: 0 }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div style={{ paddingTop: 8 }}>
            <ActLabel label="Center Stage" style={{ marginBottom: 16 }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 400, color: TH.text, margin: '0 0 4px', fontStyle: 'italic' }}>{product.name}</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, margin: '0 0 16px' }}>{product.subtitle}</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 400, color: TH.gold, marginBottom: 24 }}>${product.price.toLocaleString()}</div>
            <GoldRule style={{ marginBottom: 20 }} />

            {/* Size */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size: <span style={{ color: TH.gold }}>{selectedSize}</span></span>
                <button onClick={() => setShowSizeGuide(true)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.gold, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Ruler size={12} /> Size Guide</button>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    width: 44, height: 36, fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem',
                    border: selectedSize === s ? `2px solid ${TH.gold}` : `1px solid ${TH.border}`,
                    background: selectedSize === s ? `${TH.gold}15` : 'transparent',
                    color: selectedSize === s ? TH.gold : TH.textSecondary, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Metal */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Metal: <span style={{ color: TH.gold }}>{selectedMetal}</span></span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {metals.map(m => {
                  const colors: Record<string, string> = { 'White Gold': '#E8E8E8', 'Yellow Gold': '#FFD700', 'Rose Gold': '#B76E79', 'Platinum': '#C0C0C0' }
                  return (
                    <button key={m} onClick={() => setSelectedMetal(m)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                      border: selectedMetal === m ? `2px solid ${TH.gold}` : `1px solid ${TH.border}`,
                      background: selectedMetal === m ? `${TH.gold}10` : 'transparent', cursor: 'pointer',
                    }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: colors[m], border: `1px solid ${TH.border}` }} />
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: selectedMetal === m ? TH.gold : TH.textSecondary }}>{m}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${TH.border}`, width: 'fit-content' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity <= 1 ? TH.border : TH.textSecondary, cursor: quantity <= 1 ? 'not-allowed' : 'pointer' }}><Minus size={14} /></button>
                <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: TH.text, borderLeft: `1px solid ${TH.border}`, borderRight: `1px solid ${TH.border}` }}>{quantity}</div>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} disabled={quantity >= 10} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: quantity >= 10 ? TH.border : TH.textSecondary, cursor: quantity >= 10 ? 'not-allowed' : 'pointer' }}><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button onClick={handleAddToCart} style={{
                flex: 1, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: addedToCart ? '#4CAF50' : TH.accent, color: '#fff',
                fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }}>
                {addedToCart ? <><Check size={16} /> Added to Collection</> : <>Reserve Your Seat &mdash; ${(product.price * quantity).toLocaleString()}</>}
              </button>
              <button onClick={() => toggleItem(product)} style={{
                width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: `1px solid ${wishlisted ? TH.accent : TH.border}`,
                color: wishlisted ? TH.accent : TH.textSecondary, cursor: 'pointer',
              }}><Heart size={18} fill={wishlisted ? TH.accent : 'none'} /></button>
              <button style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${TH.border}`, color: TH.textSecondary, cursor: 'pointer' }}><Share2 size={18} /></button>
            </div>

            {/* Trust */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, padding: '20px 0', borderTop: `1px solid ${TH.border}` }}>
              {[
                { icon: <Shield size={14} />, label: 'Authentic', sub: 'Certified' },
                { icon: <Truck size={14} />, label: 'Free Ship', sub: 'Insured' },
                { icon: <RotateCcw size={14} />, label: '30 Days', sub: 'Returns' },
                { icon: <Gift size={14} />, label: 'Gift Wrap', sub: 'Included' },
              ].map((g, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span style={{ color: TH.gold, display: 'block', marginBottom: 4 }}>{g.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.text, display: 'block' }}>{g.label}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', color: TH.textSecondary }}>{g.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TheaterSection>

      {/* Tabs */}
      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${TH.border}`, marginBottom: 24 }}>
            {(['story', 'specs', 'care'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '12px 24px', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem',
                letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${TH.gold}` : '2px solid transparent',
                color: activeTab === tab ? TH.gold : TH.textSecondary, cursor: 'pointer',
              }}>{tab === 'story' ? 'The Story' : tab}</button>
            ))}
          </div>
          <div style={{ maxWidth: 800 }}>
            {activeTab === 'story' && (
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary, lineHeight: 1.9 }}>
                <p style={{ marginBottom: 16 }}>{product.description}</p>
                <p style={{ marginBottom: 16 }}>Every great piece of jewelry tells a story &mdash; a narrative of fire and brilliance, of ancient earth transformed by human artistry into something transcendent. This piece is no exception.</p>
                <p>Material: {product.material}{product.goldKarat ? ` · ${product.goldKarat}` : ''}{product.goldColor ? ` · ${product.goldColor}` : ''}</p>
                <ul style={{ marginTop: 16, paddingLeft: 20 }}>
                  {product.features.map((f, i) => <li key={i} style={{ marginBottom: 6 }}>{f}</li>)}
                </ul>
              </div>
            )}
            {activeTab === 'specs' && (
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
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${TH.border}` }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.gold, fontWeight: 500 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'care' && (
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary, lineHeight: 1.9 }}>
                <p style={{ marginBottom: 12 }}>Store in the provided velvet-lined case when not wearing. Avoid contact with perfumes, lotions, and harsh chemicals.</p>
                <p style={{ marginBottom: 12 }}>Clean gently with a soft cloth. For deeper cleaning, use warm water with mild soap and a soft brush.</p>
                <p style={{ marginBottom: 12 }}>Professional cleaning recommended every 6-12 months to maintain brilliance.</p>
                <p>Lifetime warranty covering manufacturing defects and complimentary annual maintenance included.</p>
              </div>
            )}
          </div>
        </RevealSection>
      </TheaterSection>

      {/* Behind the Curtain */}
      <TheaterSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/theater/velvet-curtain.jpg" alt="Behind the curtain" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 40%, ${TH.bg}90 100%)` }} />
            </div>
            <div>
              <ActLabel label="Behind the Curtain" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 400, color: TH.text, margin: '0 0 16px', fontStyle: 'italic' }}>The Art of Creation</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary, lineHeight: 1.9, marginBottom: 16 }}>
                Like a theatrical production, the creation of this piece involved an ensemble of master craftspeople. From the initial sketch to the final polish, every step was choreographed with precision.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[{ val: '160h', lbl: 'Craft Hours' }, { val: '12', lbl: 'Artisans' }, { val: '47', lbl: 'Steps' }].map((d, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${TH.gold}`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: TH.gold }}>{d.val}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{d.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </TheaterSection>

      {/* Related */}
      {related.length > 0 && (
        <TheaterSection alt>
          <RevealSection>
            <ActLabel label="Also Performing" style={{ marginBottom: 32 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/theater/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ border: `1px solid ${TH.border}`, overflow: 'hidden', transition: 'border-color 0.3s' }}>
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 400, color: TH.text, margin: '0 0 4px', fontStyle: 'italic' }}>{p.name}</h3>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', color: TH.gold }}>${p.price.toLocaleString()}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RevealSection>
        </TheaterSection>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${TH.border}`, color: '#fff', cursor: 'pointer', zIndex: 10 }}><X size={20} /></button>
          <div style={{ position: 'relative', width: '80vw', height: '80vh' }}><Image src={product.images[selectedImage]} alt={product.name} fill style={{ objectFit: 'contain' }} /></div>
        </div>
      )}

      {/* Size Guide */}
      {showSizeGuide && (
        <div onClick={() => setShowSizeGuide(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: TH.surface, border: `1px solid ${TH.border}`, padding: 32, maxWidth: 500, width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: TH.text, margin: 0, fontStyle: 'italic' }}>Ring Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} style={{ background: 'none', border: 'none', color: TH.textSecondary, cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>{['US Size', 'Diameter (mm)', 'Circumference (mm)'].map(h => <th key={h} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.gold, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 12px', borderBottom: `1px solid ${TH.border}`, textAlign: 'left' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {[['5','15.7','49.3'],['5.5','16.0','50.3'],['6','16.5','51.8'],['6.5','16.9','53.1'],['7','17.3','54.4'],['7.5','17.7','55.7'],['8','18.1','57.0'],['8.5','18.5','58.3'],['9','18.9','59.5']].map(([size, dia, circ]) => (
                  <tr key={size} style={{ background: selectedSize === size ? `${TH.gold}10` : 'transparent' }}>
                    <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: selectedSize === size ? TH.gold : TH.text, padding: '8px 12px', borderBottom: `1px solid ${TH.border}` }}>{size}</td>
                    <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${TH.border}` }}>{dia}</td>
                    <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, padding: '8px 12px', borderBottom: `1px solid ${TH.border}` }}>{circ}</td>
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
