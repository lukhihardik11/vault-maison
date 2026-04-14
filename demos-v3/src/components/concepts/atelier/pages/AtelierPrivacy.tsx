'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'

const sections = [
  { title: 'Information We Collect', content: 'We collect personal information you provide directly, including name, email, shipping address, and payment details. For bespoke commissions, we may also collect design preferences and reference images you share with us.' },
  { title: 'How We Use Your Information', content: 'Your information is used to process orders, manage commissions, communicate about your pieces, and improve our workshop services. We never sell your personal data to third parties.' },
  { title: 'Data Security', content: 'We employ industry-standard encryption and security measures to protect your personal information. Payment processing is handled by PCI-compliant partners.' },
  { title: 'Commission Records', content: 'Design sketches, correspondence, and commission details are retained as part of our workshop archive. This allows us to provide ongoing service, repairs, and complementary pieces in the future.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@vaultmaison.com to exercise these rights.' },
  { title: 'Cookies', content: 'We use essential cookies for site functionality and analytics cookies to understand how visitors interact with our workshop. You can manage cookie preferences in your browser settings.' },
]

export function AtelierPrivacy() {
  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>Legal</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>Privacy Policy</h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft }}>Last updated: March 2024</p>
        </div>
      </section>
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: A.ink, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.8 }}>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </AtelierLayout>
  )
}
