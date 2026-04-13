'use client'
import { useState } from 'react'
import { VaultLayout } from '../VaultLayout'
import { ChevronDown, ChevronUp } from 'lucide-react'

const GOLD = '#D4AF37'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const faqs = [
  { q: 'Are all diamonds GIA certified?', a: 'Yes, every diamond in our collection is independently certified by the Gemological Institute of America (GIA), ensuring the highest standards of quality and authenticity.' },
  { q: 'Do you offer custom designs?', a: 'Absolutely. Our Bespoke service allows you to commission a one-of-a-kind piece. Our designers will work closely with you from concept to completion.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy with full refund for all standard pieces. Bespoke commissions are final sale. All items must be returned in original condition.' },
  { q: 'How is shipping handled?', a: 'All orders are shipped via insured, tracked courier at no additional cost. Pieces are packaged in our signature presentation box with tamper-evident seals.' },
  { q: 'Do you offer financing?', a: 'Yes, we partner with Affirm to offer 0% APR financing on purchases over $5,000 for qualified buyers. Split your purchase into 6, 12, or 24 monthly payments.' },
  { q: 'Can I schedule a private viewing?', a: 'Of course. Private viewings are available at our New York showroom by appointment. Contact our concierge team to arrange your visit.' },
  { q: 'What about ring sizing?', a: 'We offer complimentary ring sizing for all purchases. If your ring doesn\'t fit perfectly, we\'ll resize it at no charge within the first year.' },
  { q: 'Do you provide insurance appraisals?', a: 'Yes, every piece over $5,000 comes with a detailed insurance appraisal document. We also partner with Jewelers Mutual for comprehensive coverage.' },
]

export function VaultFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <VaultLayout>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Help Center</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT, marginTop: 12 }}>Frequently Asked Questions</h1>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${MUTED}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: TEXT, fontSize: 15, fontWeight: 500, textAlign: 'left' }}
              >
                {faq.q}
                {open === i ? <ChevronUp size={16} color="rgba(234,234,234,0.4)" /> : <ChevronDown size={16} color="rgba(234,234,234,0.4)" />}
              </button>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(234,234,234,0.6)', paddingBottom: 20 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
