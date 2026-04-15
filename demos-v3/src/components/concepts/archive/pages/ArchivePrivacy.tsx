'use client'
import React from 'react'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'

export function ArchivePrivacy() {
  const sections = [
    { title: 'Information Collection', content: 'We collect personal information necessary to process acquisitions, provide authentication services, and maintain your collector account. This includes name, contact details, shipping address, and payment information.' },
    { title: 'Data Security', content: 'All personal and financial data is encrypted using industry-standard 256-bit SSL encryption. Payment information is processed through PCI-DSS compliant payment processors and is never stored on our servers.' },
    { title: 'Provenance Records', content: 'Provenance documentation and authentication records are maintained in our secure archive. These records are associated with the piece, not the collector, and may be transferred with ownership.' },
    { title: 'Collector Confidentiality', content: 'We maintain strict confidentiality regarding collector identities and acquisition details. Information is never shared with third parties without explicit consent, except as required by law.' },
    { title: 'Data Retention', content: 'Account information is retained for the duration of your membership. Authentication records are maintained permanently as part of the piece\'s provenance documentation.' },
    { title: 'Your Rights', content: 'You may request access to, correction of, or deletion of your personal data at any time. Contact our reference desk to exercise these rights.' },
  ]

  return (
    <>
      <section style={{ background: AR.bg, padding: '64px 32px 32px', textAlign: 'center', borderBottom: `1px solid ${AR.border}` }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>LEGAL</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>Privacy Policy</h1>
        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary }}>Last updated: March 2024</p>
      </section>

      <ArchiveSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {sections.map((s, i) => (
            <RevealSection key={i} delay={i * 60}>
              <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < sections.length - 1 ? `1px solid ${AR.border}` : 'none' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 500, color: AR.text, marginBottom: 12 }}>
                  {i + 1}. {s.title}
                </h2>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: AR.textSecondary, lineHeight: 1.7 }}>
                  {s.content}
                </p>
              </div>
            </RevealSection>
          ))}
          <GoldRule />
        </div>
      </ArchiveSection>
    </>
  )
}
