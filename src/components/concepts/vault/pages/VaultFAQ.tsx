'use client'
import { useState } from 'react'
import { VaultLayout } from '../VaultLayout'
import { ChevronDown } from 'lucide-react'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'

const GOLD = '#D4AF37'
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
  const [search, setSearch] = useState('')

  const filtered = search
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs

  return (
    <VaultLayout>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Help Center</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Frequently Asked Questions</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
        </div>

        <div style={{ maxWidth: 500, margin: '0 auto 48px' }}>
          <DarkNeumorphicInput
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          {filtered.map((faq, i) => (
            <div key={i} style={{
              borderBottom: '1px solid rgba(212,175,55,0.08)',
              transition: 'background-color 0.3s ease',
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '22px 0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: open === i ? TEXT : 'rgba(234,234,234,0.7)',
                  fontSize: 15, fontWeight: 500, textAlign: 'left',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 0.3s ease',
                }}
              >
                {faq.q}
                <ChevronDown
                  size={16}
                  color={open === i ? GOLD : 'rgba(234,234,234,0.3)'}
                  style={{
                    transition: 'transform 0.3s ease, color 0.3s ease',
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0, marginLeft: 16,
                  }}
                />
              </button>
              <div style={{
                maxHeight: open === i ? 300 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <p style={{
                  fontSize: 14, lineHeight: 1.8,
                  color: 'rgba(234,234,234,0.5)',
                  paddingBottom: 22, paddingLeft: 0,
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
