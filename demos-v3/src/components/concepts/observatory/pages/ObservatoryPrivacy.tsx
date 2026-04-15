'use client'
import React from 'react'
import { OB, ObservatorySection, RevealSection, ScanLine } from '../ObservatoryLayout'
import { Lock, Shield, Eye, Database } from 'lucide-react'

export function ObservatoryPrivacy() {
  const sections = [
    { title: 'Data Collection', content: 'We collect only the information necessary to process your orders and provide our gemological analysis services. This includes contact information, shipping addresses, and transaction records. We do not sell or share your personal data with third parties.' },
    { title: 'Analysis Data', content: 'Gemological analysis reports and certification data are stored securely and associated with your account. You may request copies of all analysis reports at any time. This data is never shared without your explicit consent.' },
    { title: 'Security Measures', content: 'All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit. Our systems undergo regular third-party security audits. Access to customer data is restricted to authorized personnel only.' },
    { title: 'Cookie Policy', content: 'We use essential cookies for site functionality and analytics cookies to improve our services. You can manage cookie preferences through your browser settings. We do not use cookies for advertising purposes.' },
    { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. You may also request a complete export of your data in machine-readable format. Contact our data protection officer for any privacy-related inquiries.' },
    { title: 'Data Retention', content: 'Transaction records are retained for 7 years as required by financial regulations. Analysis reports are retained indefinitely as part of our gemological archive. Account data is deleted within 30 days of account closure.' },
  ]

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Lock size={20} color={OB.accent} style={{ margin: '0 auto 12px' }} />
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '0 0 12px' }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary }}>How we protect and handle your data.</p>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {sections.map((section, i) => (
            <RevealSection key={i} delay={i * 50}>
              <div style={{ padding: '32px 0', borderBottom: `1px solid ${OB.border}` }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', fontWeight: 500, color: OB.text, margin: '0 0 12px' }}>{section.title}</h2>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.textSecondary, lineHeight: 1.8, margin: 0 }}>{section.content}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </ObservatorySection>
    </>
  )
}
