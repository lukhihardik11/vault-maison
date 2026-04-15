'use client'
import React, { useState } from 'react'
import { MK, MarketplaceSection, RevealSection, SectionLabel } from '../MarketplaceLayout'
import { MarketplaceButton } from '../ui'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'How does the bidding process work?', a: 'Bidding is straightforward. Register for an account, browse available lots, and place bids either live during timed auctions or as maximum auto-bids. You\'ll receive notifications when outbid and when you win.' },
  { q: 'What is the buyer\'s premium?', a: 'A 15% buyer\'s premium is added to the hammer price. This covers authentication, insurance, and platform services. All-in pricing is displayed before you confirm your bid.' },
  { q: 'How are items authenticated?', a: 'Every piece undergoes our 47-point authentication process, including verification by GIA/AGS-certified gemologists, provenance research, and condition assessment. High-value items receive blockchain-verified certificates.' },
  { q: 'What payment methods are accepted?', a: 'We accept wire transfer, credit/debit cards, and cryptocurrency (BTC, ETH) for purchases over $10,000. Payment is due within 7 days of winning a lot.' },
  { q: 'How does shipping work?', a: 'All items are shipped via insured, temperature-controlled courier with signature requirement. Domestic shipping is complimentary for purchases over $5,000. International shipping includes customs handling.' },
  { q: 'Can I return a purchase?', a: 'Items purchased at auction are generally final sale. However, if an item is found to be materially different from its description, we offer a full refund within 14 days of delivery.' },
  { q: 'How do I consign a piece?', a: 'Submit your piece through our consignment form with photos and description. Our specialists will evaluate it within 48 hours and provide a market estimate. Commission rates start at 10%.' },
]

export function MarketplaceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Help Center" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>Frequently Asked Questions</h1>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 40}>
              <div style={{ borderBottom: `1px solid ${MK.border}` }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: openIndex === i ? MK.accent : MK.text }}>{faq.q}</span>
                  <ChevronDown size={16} color={MK.accent} style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
                </button>
                {openIndex === i && (
                  <div style={{ paddingBottom: 18 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </MarketplaceSection>

      <MarketplaceSection alt style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: MK.text, margin: '0 0 10px' }}>Still Have Questions?</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, marginBottom: 20 }}>Our specialist team is here to help.</p>
        <MarketplaceButton href="/marketplace/contact">Contact Specialists</MarketplaceButton>
      </MarketplaceSection>
    </>
  )
}
