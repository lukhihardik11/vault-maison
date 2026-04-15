'use client'
import React from 'react'
import { TH, TheaterSection, RevealSection, ActLabel, GoldRule } from '../TheaterLayout'

const sections = [
  { title: 'Information We Collect', content: 'We collect personal information you provide directly, including name, email, shipping address, and payment details. We also collect browsing data through cookies to enhance your experience.' },
  { title: 'How We Use Your Information', content: 'Your information is used to process orders, provide customer service, send relevant communications, and improve our theatrical experience. We never sell your personal data to third parties.' },
  { title: 'Data Security', content: 'We employ 256-bit SSL encryption, PCI-compliant payment processing, and regular security audits. Your financial information is never stored on our servers.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time. Contact our privacy team for any requests.' },
  { title: 'Cookie Policy', content: 'We use essential cookies for site functionality and optional analytics cookies to improve our service. You can manage your cookie preferences through your browser settings.' },
  { title: 'Contact', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@vaultmaison.com or write to our registered office.' },
]

export function TheaterPrivacy() {
  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <ActLabel label="Legal" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary }}>Last updated: March 2024</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {sections.map((section, i) => (
            <RevealSection key={i} delay={i * 50}>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, color: TH.gold, margin: '0 0 12px' }}>{section.title}</h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, lineHeight: 1.8, margin: 0 }}>{section.content}</p>
                {i < sections.length - 1 && <GoldRule style={{ marginTop: 32 }} />}
              </div>
            </RevealSection>
          ))}
        </div>
      </TheaterSection>
    </>
  )
}
