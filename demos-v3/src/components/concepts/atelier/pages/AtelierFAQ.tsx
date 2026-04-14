'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AtelierLayout, A } from '../AtelierLayout'

const faqs = [
  { q: 'How long does a bespoke commission take?', a: 'Most commissions take 4–12 weeks from initial consultation to final unveiling. Complex pieces with rare stones may take longer. We\'ll give you a detailed timeline during your first meeting.' },
  { q: 'Can I visit the workshop?', a: 'Absolutely. We welcome visitors by appointment Monday through Saturday. You\'re welcome to watch our artisans at work and discuss your ideas in person.' },
  { q: 'What is the minimum budget for a commission?', a: 'Our bespoke commissions typically start from £2,000. The final cost depends on materials, complexity, and the time required. We\'ll provide a detailed quote before any work begins.' },
  { q: 'Do you offer repairs and resizing?', a: 'Yes. Our artisans can repair, resize, and restore jewelry — including pieces not made by us. We treat every piece with the same care as our own creations.' },
  { q: 'How do you source your materials?', a: 'We work with trusted suppliers who share our commitment to ethical sourcing. All diamonds are conflict-free, and we offer Fairmined gold options. Full provenance documentation is provided.' },
  { q: 'What if I don\'t like the design?', a: 'Our process includes multiple review stages with sketches, 3D renderings, and wax models. You approve each stage before we proceed. We don\'t start crafting until you\'re completely happy.' },
  { q: 'Do you ship internationally?', a: 'Yes. We ship worldwide with full insurance and tracking. All pieces are hand-delivered in our signature workshop packaging.' },
  { q: 'Can I see the artisan working on my piece?', a: 'Commission clients receive progress updates with photos at each stage. Workshop visits during the making process can also be arranged.' },
]

export function AtelierFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
              Questions
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0 }}>
              Frequently Asked
            </h1>
          </div>

          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${A.border}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 0', background: 'none', border: 'none',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500, color: A.ink, paddingRight: 16 }}>
                  {faq.q}
                </span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 20, color: A.textSoft, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7, paddingBottom: 20 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </AtelierLayout>
  )
}
