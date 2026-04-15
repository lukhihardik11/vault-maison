'use client'
import { VaultLayout } from '../VaultLayout'

const GOLD = '#D4AF37'
const TEXT = '#EAEAEA'

const sections = [
  { title: '1. Information We Collect', content: 'We collect personal information you provide directly, including name, email, shipping address, and payment details. We also collect browsing data through cookies to improve your experience.' },
  { title: '2. How We Use Your Information', content: 'Your information is used to process orders, provide customer support, send order updates, and with your consent, share new collections and exclusive offers.' },
  { title: '3. Data Security', content: 'We employ 256-bit SSL encryption, PCI DSS compliance, and industry-leading security measures to protect your personal and financial information.' },
  { title: '4. Third-Party Sharing', content: 'We never sell your personal data. Information is shared only with trusted partners necessary for order fulfillment: shipping carriers and payment processors.' },
  { title: '5. Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. Contact our privacy team at privacy@vaultmaison.com for any requests.' },
  { title: '6. Cookie Policy', content: 'We use essential cookies for site functionality and optional analytics cookies to improve our service. You can manage cookie preferences through your browser settings.' },
]

export function VaultPrivacy() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Legal</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Privacy Policy</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
          <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.35)', marginTop: 20, letterSpacing: '0.05em' }}>Last updated: March 2026</p>
        </div>
        {sections.map((s, i) => (
          <div key={s.title} style={{ marginBottom: 40, paddingBottom: i < sections.length - 1 ? 40 : 0, borderBottom: i < sections.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none' }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 400, color: TEXT, marginBottom: 14 }}>{s.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 2, color: 'rgba(234,234,234,0.5)' }}>{s.content}</p>
          </div>
        ))}
      </div>
    </VaultLayout>
  )
}
