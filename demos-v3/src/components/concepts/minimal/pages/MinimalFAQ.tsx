'use client'

import { useState } from 'react'
import { MinimalPage } from '../MinimalPage'

const faqs = [
  {
    q: 'Are your diamonds certified?',
    a: 'Every diamond above 0.30ct comes with a GIA or IGI certificate. Certification documents are included with your purchase and available digitally through your account.',
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes. We offer 12-month interest-free financing on purchases over $5,000. Extended payment plans up to 36 months are available for select pieces.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day return window for all standard purchases. Items must be in original condition with all documentation. Bespoke pieces are non-returnable.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping: 5–7 business days. Express: 2–3 business days. All orders are fully insured and require signature upon delivery.',
  },
  {
    q: 'Can I schedule a private appointment?',
    a: 'Yes. Private viewings are available Monday through Saturday. Contact us to arrange a one-on-one consultation with a gemologist.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'We ship to over 40 countries. International orders include full insurance and customs documentation. Duties and taxes are calculated at checkout.',
  },
  {
    q: 'How should I care for my jewelry?',
    a: 'Store pieces individually in soft pouches. Clean with warm water and mild soap. Avoid exposure to chemicals and extreme temperatures. Professional cleaning is recommended annually.',
  },
  {
    q: 'Can I customize an existing design?',
    a: 'Yes. Most pieces can be modified — metal type, stone size, engraving. Contact our bespoke team to discuss modifications.',
  },
]

export function MinimalFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <MinimalPage title="FAQ" subtitle="Common questions answered.">
      <div style={{ maxWidth: '600px' }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottom: '1px solid #E5E5E5' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%',
                padding: '20px 0',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#050505',
                fontSize: '13px',
                fontWeight: 400,
                fontFamily: 'inherit',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{faq.q}</span>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 300,
                  opacity: 0.3,
                  marginLeft: '16px',
                  flexShrink: 0,
                  transition: 'transform 300ms ease',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                +
              </span>
            </button>
            {open === i && (
              <div style={{ paddingBottom: '20px' }}>
                <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.6 }}>
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </MinimalPage>
  )
}
