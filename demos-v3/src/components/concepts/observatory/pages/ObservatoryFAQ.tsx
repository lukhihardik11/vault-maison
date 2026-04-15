'use client'
import React, { useState } from 'react'
import { OB, ObservatorySection, RevealSection, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  { q: 'What is the Observatory verification process?', a: 'Every piece undergoes our 47-point analysis including spectroscopic examination, light performance testing, and independent certification verification. This process takes 48-72 hours and results in a comprehensive Observatory Report.' },
  { q: 'How do you source your diamonds?', a: 'We work exclusively with certified suppliers who adhere to the Kimberley Process. Each stone is traceable to its origin mine, and we maintain full chain-of-custody documentation.' },
  { q: 'What certifications do you accept?', a: 'We accept GIA, AGS, and HRD certifications. All pieces also receive our proprietary Observatory verification, which includes additional light performance metrics not covered by standard grading reports.' },
  { q: 'Do you offer custom commissions?', a: 'Yes, our bespoke service allows you to commission unique pieces. The process includes stone selection from our analyzed inventory, CAD design, and full Observatory certification of the finished piece.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return window for all standard purchases. Custom commissions are non-refundable but include a satisfaction guarantee with complimentary adjustments.' },
  { q: 'How is shipping handled?', a: 'All pieces are shipped via insured, temperature-controlled courier with real-time GPS tracking. Domestic orders arrive within 2-3 business days; international within 5-7 business days.' },
  { q: 'Can I view pieces in person?', a: 'Absolutely. Schedule a private viewing at our New York laboratory where you can examine pieces under controlled lighting conditions with our gemologists present.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, wire transfers, and cryptocurrency (BTC, ETH). For purchases over $50,000, we offer structured payment plans.' },
]

export function ObservatoryFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <HelpCircle size={20} color={OB.accent} style={{ margin: '0 auto 12px' }} />
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '0 0 12px' }}>Frequently Asked Questions</h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary }}>Everything you need to know about The Observatory.</p>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 50}>
              <div style={{ borderBottom: `1px solid ${OB.border}` }}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text }}>{faq.q}</span>
                  <ChevronDown size={16} color={OB.accent} style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {openIndex === i && (
                  <div style={{ padding: '0 0 20px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.textSecondary, lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </ObservatorySection>

      <ObservatorySection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', color: OB.text, margin: '0 0 12px' }}>Still Have Questions?</h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, marginBottom: 24 }}>Our team is ready to help.</p>
          <ObservatoryButton href="/observatory/contact">Contact Our Team</ObservatoryButton>
        </RevealSection>
      </ObservatorySection>
    </>
  )
}
