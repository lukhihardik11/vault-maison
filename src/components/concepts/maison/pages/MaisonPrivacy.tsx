'use client'
import React from 'react'
import { MS, MaisonSection, RevealSection, SectionLabel, GoldDivider } from '../MaisonLayout'

const sections = [
  { title: 'Information We Collect', content: 'We collect personal information you provide when making purchases, creating an account, or contacting us. This includes your name, email, shipping address, and payment details. We also collect browsing data to enhance your experience.' },
  { title: 'How We Use Your Information', content: 'Your information is used to process orders, provide personalized recommendations, send collection updates (with your consent), and improve our services. We never sell your personal data to third parties.' },
  { title: 'Data Protection', content: 'We employ industry-standard security measures including SSL encryption, secure payment processing, and regular security audits to protect your personal information.' },
  { title: 'Cookies', content: 'We use cookies to remember your preferences, maintain your shopping cart, and analyze site usage. You can manage cookie preferences through your browser settings.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications. Contact our privacy team for any requests.' },
  { title: 'Contact', content: 'For privacy-related inquiries, please contact our Data Protection Officer at privacy@vaultmaison.com or write to 12 Place Vendôme, Paris, 75001.' },
]

export function MaisonPrivacy() {
  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Legal" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary }}>Last updated: March 2024</p>
        </div>
      </section>

      <MaisonSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {sections.map((section, i) => (
            <RevealSection key={i} delay={i * 40}>
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: MS.accent, margin: '0 0 10px' }}>{section.title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, margin: 0 }}>{section.content}</p>
                {i < sections.length - 1 && <GoldDivider style={{ marginTop: 28 }} />}
              </div>
            </RevealSection>
          ))}
        </div>
      </MaisonSection>
    </>
  )
}
