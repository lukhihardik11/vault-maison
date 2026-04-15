'use client'
import React from 'react'
import { MK, MarketplaceSection, RevealSection, SectionLabel, LotDivider } from '../MarketplaceLayout'

const sections = [
  { title: 'Information We Collect', content: 'We collect personal information you provide directly, including name, email, shipping address, payment details, and bidding history. We also collect browsing data through cookies to enhance your marketplace experience.' },
  { title: 'How We Use Your Information', content: 'Your information is used to process bids and purchases, provide customer service, send auction notifications, and improve our platform. We never sell your personal data to third parties.' },
  { title: 'Data Security', content: 'We employ 256-bit SSL encryption, PCI-compliant payment processing, and regular security audits. Your financial information is tokenized and never stored on our servers.' },
  { title: 'Bidder Privacy', content: 'All bidding activity is confidential. Bidder identities are never disclosed to sellers or other bidders. Paddle numbers are used for anonymity during live auctions.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time. Contact our privacy team for any requests.' },
  { title: 'Contact', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@vaultmaison.com or write to our registered office at 47 Madison Avenue, New York, NY 10010.' },
]

export function MarketplacePrivacy() {
  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Legal" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary }}>Last updated: March 2024</p>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {sections.map((section, i) => (
            <RevealSection key={i} delay={i * 40}>
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: MK.accent, margin: '0 0 10px' }}>{section.title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, lineHeight: 1.8, margin: 0 }}>{section.content}</p>
                {i < sections.length - 1 && <LotDivider style={{ marginTop: 28 }} />}
              </div>
            </RevealSection>
          ))}
        </div>
      </MarketplaceSection>
    </>
  )
}
