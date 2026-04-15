'use client'
import React, { useState } from 'react'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ArchiveFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { q: 'How does the authentication process work?', a: 'Every piece undergoes our five-stage authentication process: visual inspection, laboratory analysis, material verification, provenance research, and final certification. This comprehensive approach ensures the highest standard of authenticity verification.' },
    { q: 'What documentation accompanies each piece?', a: 'Each acquisition includes a certificate of authenticity, detailed condition report, provenance record, gemological grading report (where applicable), and high-resolution photography documentation.' },
    { q: 'Can I have my own jewelry authenticated?', a: 'Yes. Our authentication service is available for pieces outside our catalog. Submit an inquiry through our Advisory & Authentication page for pricing and scheduling.' },
    { q: 'What is your return policy?', a: 'We offer a 14-day return window for all acquisitions. Pieces must be returned in original condition with all documentation. Authentication fees are non-refundable.' },
    { q: 'How are pieces shipped?', a: 'All acquisitions are shipped via insured courier with signature confirmation. Pieces are packaged in archival-quality materials with tamper-evident seals.' },
    { q: 'Do you offer collection appraisals?', a: 'Yes. Our team provides comprehensive collection appraisals for insurance, estate planning, or sale preparation. Contact our advisory team for details.' },
  ]

  return (
    <>
      <section style={{ background: AR.bg, padding: '64px 32px 32px', textAlign: 'center', borderBottom: `1px solid ${AR.border}` }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>KNOWLEDGE BASE</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>Frequently Asked Questions</h1>
      </section>

      <ArchiveSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 60}>
              <div style={{ borderBottom: `1px solid ${AR.border}` }}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: AR.text, fontWeight: 500 }}>{faq.q}</span>
                  {openIndex === i ? <ChevronUp size={18} color={AR.accent} /> : <ChevronDown size={18} color={AR.accent} />}
                </button>
                {openIndex === i && (
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: AR.textSecondary, lineHeight: 1.7, padding: '0 0 20px' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </ArchiveSection>

      <ArchiveSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center' }}>
            <GoldRule style={{ marginBottom: 24 }} />
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, marginBottom: 24 }}>
              Have a question not answered here? Contact our reference desk.
            </p>
            <ArchiveButton variant="secondary" href="/archive/contact">Contact Reference Desk</ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
