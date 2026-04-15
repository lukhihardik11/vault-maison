'use client'
import React, { useState } from 'react'
import { MS, MaisonSection, RevealSection, SectionLabel } from '../MaisonLayout'
import { MaisonButton } from '../ui'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'What makes Vault Maison different?', a: 'We combine the expertise of a traditional maison with a modern, curated approach. Every piece in our collection is hand-selected by our team of gemologists and design experts for its exceptional quality and timeless appeal.' },
  { q: 'Do you offer bespoke services?', a: 'Yes, our bespoke service allows you to commission a one-of-a-kind piece. From initial consultation to final delivery, our master artisans work closely with you to bring your vision to life.' },
  { q: 'How are your pieces certified?', a: 'All diamonds and gemstones are certified by GIA or equivalent independent laboratories. Each piece comes with a certificate of authenticity and detailed grading report.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy for all standard purchases. Items must be returned in their original condition and packaging. Bespoke pieces are final sale.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide with fully insured, tracked delivery. International orders include customs handling and duty calculation. Complimentary shipping on orders over $5,000.' },
  { q: 'How should I care for my jewelry?', a: 'We recommend professional cleaning every 6 months. Store pieces separately in their original boxes. Avoid contact with perfumes, lotions, and household chemicals. Visit our Care Guide for detailed instructions.' },
  { q: 'Can I schedule a private viewing?', a: 'Absolutely. We welcome private appointments at our boutique. Contact us to arrange a personal consultation with one of our specialists.' },
]

export function MaisonFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Help" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>Frequently Asked Questions</h1>
        </div>
      </section>

      <MaisonSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 40}>
              <div style={{ borderBottom: `1px solid ${MS.border}` }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: openIndex === i ? MS.accent : MS.text }}>{faq.q}</span>
                  <ChevronDown size={16} color={MS.accent} style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
                </button>
                {openIndex === i && (
                  <div style={{ paddingBottom: 18 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </MaisonSection>

      <MaisonSection alt style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: MS.text, margin: '0 0 10px' }}>Need More Help?</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, marginBottom: 20 }}>Our team is always happy to assist.</p>
        <MaisonButton href="/maison/contact">Contact Us</MaisonButton>
      </MaisonSection>
    </>
  )
}
