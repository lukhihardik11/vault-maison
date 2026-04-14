'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { SketchToggle } from '../ui/SketchToggle'
import { getProduct } from '@/data/products'

const makingSteps = [
  { title: 'Design & Wax Model', desc: 'The design is refined in consultation, then carved in wax to create a precise 3D model of the final piece.' },
  { title: 'Casting', desc: 'The wax model is invested in plaster, burned out, and molten metal is poured into the cavity using the lost-wax technique.' },
  { title: 'Stone Setting', desc: 'Each stone is individually set by hand under 10x magnification, ensuring perfect alignment and security.' },
  { title: 'Finishing & Polish', desc: 'Multiple stages of hand-polishing bring the metal to its final lustre. Every surface is inspected under strong light.' },
]

export function AtelierProductDetail() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProduct(slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [qty, setQty] = useState(1)

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

  return (
    <AtelierLayout>
      <section style={{ padding: '60px 32px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}>
            <Link href="/atelier" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none' }}>Workshop</Link>
            <span style={{ color: A.sketch }}>→</span>
            <Link href={`/atelier/category/${product.category}`} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none', textTransform: 'capitalize' }}>
              {product.category.replace(/-/g, ' ')}
            </Link>
            <span style={{ color: A.sketch }}>→</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.accent }}>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            {/* Left: Gallery + Sketch Toggle */}
            <div>
              <SketchToggle title={product.name} photoSrc={images[selectedImage]} />
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      style={{
                        width: 64, height: 64, borderRadius: 2, overflow: 'hidden', cursor: 'pointer',
                        border: `2px solid ${selectedImage === i ? A.accent : A.border}`,
                        transition: 'border-color 0.3s',
                      }}
                    >
                      <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                      }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.sketch, marginBottom: 8 }}>
                Crafted by Elena Marchetti
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 8px' }}>
                {product.name}
              </h1>
              {product.subtitle && (
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, marginBottom: 16 }}>
                  {product.subtitle}
                </p>
              )}
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 24, fontWeight: 500, color: A.accent, marginBottom: 24 }}>
                £{product.price.toLocaleString()}
              </div>

              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.text, lineHeight: 1.8, marginBottom: 32 }}>
                {product.description || 'A masterwork of handcraft, this piece represents over 60 hours of meticulous work at the bench. Every detail has been considered, every surface hand-finished.'}
              </p>

              {/* Quantity + Add to Cart */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${A.border}`, borderRadius: 2 }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: A.textSoft }}>−</button>
                  <span style={{ padding: '8px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: A.ink, borderLeft: `1px solid ${A.border}`, borderRight: `1px solid ${A.border}` }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{ padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: A.textSoft }}>+</button>
                </div>
                <AtelierButton style={{ flex: 1 }}>Add to Workshop Bag</AtelierButton>
              </div>

              <AtelierButton variant="secondary" fullWidth href="/atelier/bespoke">
                Commission a Custom Version
              </AtelierButton>

              {/* Making-of Accordion */}
              <div style={{ marginTop: 48 }}>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
                  The Making Process
                </div>
                {makingSteps.map((step, i) => (
                  <div key={i} style={{ borderBottom: `1px solid ${A.border}` }}>
                    <button
                      onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                      style={{
                        width: '100%', padding: '16px 0', background: 'none', border: 'none',
                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      }}
                    >
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 500, color: A.ink }}>
                        {step.title}
                      </span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 18, color: A.textSoft, transition: 'transform 0.3s', transform: openAccordion === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                        +
                      </span>
                    </button>
                    <AnimatePresence>
                      {openAccordion === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7, paddingBottom: 16 }}>
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AtelierLayout>
  )
}
