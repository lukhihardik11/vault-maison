'use client'

import React, { useState } from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  { q: 'How do I schedule a private viewing?', a: 'Contact our gallery team via email or phone. We offer private viewings by appointment, Monday through Saturday. Our curators will guide you through the collection in an intimate setting.' },
  { q: 'Are all diamonds certified?', a: 'Yes. Every diamond in our collection comes with certification from GIA, AGS, or equivalent internationally recognized gemological laboratories. Full documentation is provided with each acquisition.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy for unworn pieces in their original packaging. Bespoke commissions are non-refundable once production begins, as each piece is crafted specifically to your specifications.' },
  { q: 'Do you offer international shipping?', a: 'Yes. We provide complimentary insured shipping worldwide. All pieces are shipped via secure courier with full insurance coverage and tracking.' },
  { q: 'Can I commission a bespoke piece?', a: 'Absolutely. Our bespoke service allows you to create a one-of-a-kind piece. The process begins with a consultation and typically takes 8-12 weeks from design approval to completion.' },
  { q: 'How do you ensure ethical sourcing?', a: 'We work exclusively with mines and cutting houses that adhere to the Kimberley Process and beyond. Our supply chain is fully transparent, and we can provide provenance documentation for every stone.' },
  { q: 'Do you offer jewelry care services?', a: 'Yes. We provide complimentary cleaning and inspection services for all pieces purchased from our gallery. We also offer professional restoration and repair services.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, bank transfers, and can arrange financing for significant acquisitions. Please contact us for details on payment plans.' },
]

export function GalleryFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <MuseumCaption align="center">Information</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Frequently Asked Questions
        </h1>
      </section>

      <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px 140px' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${G.border}` }}>
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.95rem', fontWeight: 400, color: G.text, paddingRight: 16 }}>{faq.q}</span>
              {openIdx === i ? <ChevronUp size={16} color={G.caption} /> : <ChevronDown size={16} color={G.caption} />}
            </button>
            {openIdx === i && (
              <div style={{ padding: '0 0 24px', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary, lineHeight: 1.8 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </section>
    </GalleryLayout>
  )
}
