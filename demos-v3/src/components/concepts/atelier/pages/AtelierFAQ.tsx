'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

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
      <AtelierSection style={{ padding: '80px 32px 60px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Questions
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 12px' }}>
            Frequently Asked
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            Everything you need to know about our workshop, commissions, and craft.
          </p>
        </div>
      </AtelierSection>

      <AtelierSection alt style={{ padding: '48px 32px 80px' }}>
        <div style={{ maxWidth: 750, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 50}>
              <div style={{
                borderBottom: `1px dashed ${A.sketch}`,
                background: open === i ? A.surface : 'transparent',
                transition: 'background 0.3s',
              }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', padding: '20px 16px', background: 'none', border: 'none',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500, color: A.ink, paddingRight: 16 }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 22, color: A.accent, flexShrink: 0 }}
                  >
                    +
                  </motion.span>
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
                      <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, padding: '0 16px 20px' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealSection>
          ))}
        </div>
      </AtelierSection>

      {/* CTA */}
      <AtelierSection style={{ padding: '72px 32px' }}>
        <RevealSection>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 400, color: A.ink, marginBottom: 12 }}>
              Still Have Questions?
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7, marginBottom: 28 }}>
              We&apos;re always happy to chat. Reach out by email, phone, or visit us in person.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <AtelierButton href="/atelier/contact">Contact Us</AtelierButton>
              <AtelierButton variant="secondary" href="/atelier/bespoke">Begin a Commission</AtelierButton>
            </div>
          </div>
        </RevealSection>
      </AtelierSection>
    </AtelierLayout>
  )
}
