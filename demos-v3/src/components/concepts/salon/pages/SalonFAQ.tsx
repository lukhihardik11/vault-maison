'use client'

import React, { useState } from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonButton } from '../ui/SalonButton'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'How do I book a private session?', a: 'You can book a session through our contact page, by calling us, or by chatting with Sophie in the corner. We offer both in-person and virtual appointments.' },
  { q: 'What is the home try-on service?', a: 'Select up to 5 pieces from our collection and we\'ll deliver them to your door. Try them at your own pace for up to 3 days with no obligation to purchase.' },
  { q: 'How long does custom design take?', a: 'A bespoke piece typically takes 6-8 weeks from initial consultation to delivery. Complex designs may take longer, and we\'ll keep you updated throughout.' },
  { q: 'Do you offer financing?', a: 'Yes, we offer flexible payment plans through our partners. Speak with your advisor to find an option that works for you.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all pieces. Custom and bespoke items are non-refundable but we\'ll work with you to ensure you\'re completely satisfied.' },
  { q: 'Are your diamonds ethically sourced?', a: 'Absolutely. All our diamonds are conflict-free and come with full certification. We work only with suppliers who meet our strict ethical standards.' },
  { q: 'Do you offer jewelry cleaning?', a: 'Yes! Bring any piece purchased from The Salon for complimentary professional cleaning. We recommend cleaning every 6 months.' },
  { q: 'Can I resize a ring after purchase?', a: 'Most of our rings can be resized within 2 sizes up or down. The first resize is complimentary within the first year of purchase.' },
]

export function SalonFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <SalonLayout>
      <section style={{ padding: '60px 32px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Help & Support</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Frequently Asked Questions</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 480, margin: '0 auto' }}>Can&apos;t find what you&apos;re looking for? Chat with Sophie or contact our team.</p>
      </section>

      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 80px' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{ width: '100%', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: S.text, fontWeight: 400 }}>{faq.q}</span>
              <ChevronDown size={18} color={S.textSecondary} style={{ transition: 'transform 0.3s', transform: openIdx === i ? 'rotate(180deg)' : 'none', flexShrink: 0, marginLeft: 16 }} />
            </button>
            {openIdx === i && (
              <div style={{ paddingBottom: 20 }}>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      <section style={{ padding: '60px 32px 80px', background: S.warmPanel, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Still Have Questions?</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>Our advisors are always happy to help.</p>
        <SalonButton href="/salon/contact">Contact Us</SalonButton>
      </section>
    </SalonLayout>
  )
}
