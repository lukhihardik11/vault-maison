'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { AtelierCard } from '../ui/AtelierCard'
import { SketchToggle } from '../ui/SketchToggle'
import { getProduct, getRelatedProducts } from '@/data/products'

const makingSteps = [
  { title: 'Design & Wax Model', desc: 'The design is refined in consultation, then carved in wax to create a precise 3D model of the final piece. Every proportion is considered, every angle reviewed.', image: '/images/atelier/wax-carving.jpg' },
  { title: 'Casting', desc: 'The wax model is invested in plaster, burned out, and molten metal is poured into the cavity using the ancient lost-wax technique — a process unchanged for 5,000 years.', image: '/images/atelier/molten-gold.jpg' },
  { title: 'Stone Setting', desc: 'Each stone is individually set by hand under 10x magnification, ensuring perfect alignment and security. Our master setter has 22 years of experience.', image: '/images/atelier/gemstone-inspection.jpg' },
  { title: 'Finishing & Polish', desc: 'Multiple stages of hand-polishing bring the metal to its final lustre. Every surface is inspected under strong light for absolute perfection.', image: '/images/atelier/hand-engraving.jpg' },
]

const artisanNames = ['Elena M.', 'Thomas A.', 'Yuki T.']

export function AtelierProductDetail() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProduct(slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details')

  if (!product) {
    return (
      <AtelierLayout>
        <div style={{ padding: '120px 32px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: A.ink }}>Piece Not Found</h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', color: A.textSoft, marginTop: 12 }}>This piece may have found its forever home.</p>
          <AtelierButton href="/atelier/collections" style={{ marginTop: 24 }}>Browse Workshop</AtelierButton>
        </div>
      </AtelierLayout>
    )
  }

  const images = product.images?.length ? product.images : ['/images/placeholder.jpg']
  const related = getRelatedProducts(product.id, 4)

  return (
    <AtelierLayout>
      {/* ═══ MAIN PRODUCT SECTION ═══ */}
      <AtelierSection style={{ padding: '60px 32px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32,
            padding: '12px 0',
            borderBottom: `1px dashed ${A.sketch}`,
          }}>
            <Link href="/atelier" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none' }}>Workshop</Link>
            <span style={{ color: A.sketch, fontSize: 11 }}>→</span>
            <Link href={`/atelier/category/${product.category}`} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none', textTransform: 'capitalize' }}>
              {product.category.replace(/-/g, ' ')}
            </Link>
            <span style={{ color: A.sketch, fontSize: 11 }}>→</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.accent }}>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            {/* ─── Left: Gallery ─── */}
            <div>
              <div style={{
                border: `1px dashed ${A.sketch}`,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: `inset 0 1px 2px ${A.shadow}`,
              }}>
                <SketchToggle title={product.name} photoSrc={images[selectedImage]} />
              </div>
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      whileHover={{ y: -2 }}
                      style={{
                        width: 72, height: 72, borderRadius: 2, overflow: 'hidden', cursor: 'pointer',
                        border: `2px ${selectedImage === i ? 'solid' : 'dashed'} ${selectedImage === i ? A.accent : A.sketch}`,
                        transition: 'border-color 0.3s',
                        boxShadow: selectedImage === i ? `0 4px 12px ${A.shadowMd}` : 'none',
                      }}
                    >
                      <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                      }} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Artisan credit under gallery */}
              <div style={{
                marginTop: 24, padding: '16px 20px',
                background: A.surface,
                border: `1px dashed ${A.sketch}`,
                borderRadius: 2,
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  backgroundImage: 'url(/images/atelier/female-jeweler.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  border: `2px solid ${A.border}`,
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: 15, color: A.accent }}>
                    Crafted by Elena Marchetti
                  </div>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: 12, color: A.textSoft }}>
                    Master Stone Setter · 22 years at the bench
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right: Details ─── */}
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
                {product.category.replace(/-/g, ' ')}
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.ink, margin: '0 0 8px', lineHeight: 1.2 }}>
                {product.name}
              </h1>
              {product.subtitle && (
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft, marginBottom: 16, lineHeight: 1.5 }}>
                  {product.subtitle}
                </p>
              )}
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 28, fontWeight: 500, color: A.accent, marginBottom: 8 }}>
                £{product.price.toLocaleString()}
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 13, color: A.sketch, marginBottom: 24 }}>
                Includes certificate of authenticity & care guide
              </div>

              <WarmDivider style={{ maxWidth: '100%', margin: '0 0 24px' }} />

              {/* Tab navigation */}
              <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: `1px solid ${A.border}` }}>
                {(['details', 'specs', 'care'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '12px 20px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: activeTab === tab ? A.accent : A.textSoft,
                      borderBottom: activeTab === tab ? `2px solid ${A.accent}` : '2px solid transparent',
                      transition: 'all 0.3s',
                      marginBottom: -1,
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === 'details' && (
                    <div>
                      <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.text, lineHeight: 1.8, marginBottom: 20 }}>
                        {product.description || 'A masterwork of handcraft, this piece represents over 60 hours of meticulous work at the bench. Every detail has been considered, every surface hand-finished to perfection.'}
                      </p>
                      {product.features && product.features.length > 0 && (
                        <div style={{ marginBottom: 20 }}>
                          {product.features.map((f, i) => (
                            <div key={i} style={{
                              display: 'flex', gap: 10, alignItems: 'flex-start',
                              padding: '8px 0',
                            }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={A.accent} strokeWidth="2" style={{ marginTop: 3, flexShrink: 0 }}>
                                <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
                              </svg>
                              <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.text, lineHeight: 1.6 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div style={{
                      background: A.surface,
                      border: `1px dashed ${A.sketch}`,
                      borderRadius: 2,
                      padding: 20,
                      boxShadow: `inset 0 1px 2px ${A.shadow}`,
                    }}>
                      {[
                        { label: 'Material', value: product.material },
                        ...(product.goldKarat ? [{ label: 'Gold Karat', value: product.goldKarat }] : []),
                        ...(product.goldColor ? [{ label: 'Gold Color', value: product.goldColor }] : []),
                        ...(product.diamondSpecs ? [
                          { label: 'Diamond Carat', value: product.diamondSpecs.carat },
                          { label: 'Cut', value: product.diamondSpecs.cut },
                          { label: 'Color Grade', value: product.diamondSpecs.color },
                          { label: 'Clarity', value: product.diamondSpecs.clarity },
                          { label: 'Shape', value: product.diamondSpecs.shape },
                          { label: 'Origin', value: product.diamondSpecs.origin },
                          { label: 'Certification', value: product.diamondSpecs.certification },
                        ] : []),
                        { label: 'Availability', value: product.inStock ? 'In Stock' : 'Made to Order' },
                      ].map((row, i) => (
                        <div key={i} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '10px 0',
                          borderBottom: `1px dashed ${A.sketch}30`,
                        }}>
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: A.textSoft }}>
                            {row.label}
                          </span>
                          <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.ink }}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div>
                      {[
                        { title: 'Storage', text: 'Store in the provided soft pouch or lined jewelry box, away from direct sunlight and humidity.' },
                        { title: 'Cleaning', text: 'Gently clean with a soft, lint-free cloth. For deeper cleaning, use warm water with mild soap and a soft brush.' },
                        { title: 'Wearing', text: 'Remove before swimming, bathing, or exercising. Apply perfume and cosmetics before putting on jewelry.' },
                        { title: 'Service', text: 'We recommend professional cleaning and inspection every 12 months. Complimentary for Vault Maison pieces.' },
                      ].map((item, i) => (
                        <div key={i} style={{ marginBottom: 16 }}>
                          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.accent, marginBottom: 6 }}>
                            {item.title}
                          </div>
                          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7, margin: 0 }}>
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <WarmDivider style={{ maxWidth: '100%', margin: '24px 0' }} />

              {/* Quantity + Add to Cart */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  border: `1px dashed ${A.sketch}`, borderRadius: 2,
                }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: A.textSoft }}>−</button>
                  <span style={{ padding: '10px 18px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: A.ink, borderLeft: `1px dashed ${A.sketch}`, borderRight: `1px dashed ${A.sketch}` }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{ padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: A.textSoft }}>+</button>
                </div>
                <AtelierButton style={{ flex: 1 }}>Add to Workshop Bag</AtelierButton>
              </div>

              <AtelierButton variant="secondary" fullWidth href="/atelier/bespoke">
                Commission a Custom Version
              </AtelierButton>
            </div>
          </div>
        </div>
      </AtelierSection>

      {/* ═══ MAKING-OF ACCORDION WITH IMAGES ═══ */}
      <AtelierSection alt style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                Behind the Piece
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
                The Making Process
              </h2>
            </div>
          </RevealSection>

          {makingSteps.map((step, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div style={{
                borderBottom: `1px dashed ${A.sketch}`,
                background: openAccordion === i ? A.surface : 'transparent',
                transition: 'background 0.3s',
              }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  style={{
                    width: '100%', padding: '20px 0', background: 'none', border: 'none',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingLeft: openAccordion === i ? 20 : 0,
                    paddingRight: openAccordion === i ? 20 : 0,
                    transition: 'padding 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 300,
                      color: openAccordion === i ? A.accent : `${A.accent}40`,
                      transition: 'color 0.3s',
                      minWidth: 32,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500,
                      color: A.ink, textAlign: 'left',
                    }}>
                      {step.title}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: openAccordion === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 22, color: A.accent }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openAccordion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32,
                        padding: '0 20px 24px',
                      }}>
                        <div style={{
                          height: 200, borderRadius: 2,
                          backgroundImage: `url(${step.image})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          border: `1px dashed ${A.sketch}`,
                        }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, margin: 0 }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealSection>
          ))}
        </div>
      </AtelierSection>

      {/* ═══ RELATED PIECES ═══ */}
      {related.length > 0 && (
        <AtelierSection style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <RevealSection>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                  From the Same Collection
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: A.ink, margin: 0 }}>
                  You May Also Admire
                </h2>
              </div>
            </RevealSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {related.map((p, i) => (
                <StaggerItem key={p.slug} index={i}>
                  <AtelierCard
                    title={p.name}
                    subtitle={p.category.replace(/-/g, ' ')}
                    price={`£${p.price.toLocaleString()}`}
                    image={p.images?.[0]}
                    href={`/atelier/product/${p.slug}`}
                    artisan={artisanNames[i % artisanNames.length]}
                  />
                </StaggerItem>
              ))}
            </div>
          </div>
        </AtelierSection>
      )}

      {/* ═══ COMMISSION CTA ═══ */}
      <section style={{
        position: 'relative', padding: '80px 32px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/goldsmith-crafting.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.6)' }} />
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 12 }}>
              Bespoke
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 300, color: '#FEFCF8', margin: '0 0 16px' }}>
              Want Something Truly Unique?
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: 'rgba(232,226,216,0.7)', lineHeight: 1.7, marginBottom: 28 }}>
              Commission a bespoke version of this piece, tailored to your exact specifications by our master artisans.
            </p>
            <AtelierButton href="/atelier/bespoke" style={{ background: A.gold, color: A.ink }}>
              Begin Your Commission
            </AtelierButton>
          </div>
        </RevealSection>
      </section>
    </AtelierLayout>
  )
}
