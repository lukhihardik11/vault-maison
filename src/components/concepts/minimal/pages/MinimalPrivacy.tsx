'use client'

import { MinimalLayout } from '../MinimalLayout'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly, including name, email, shipping address, and payment details when you make a purchase. We also collect browsing data such as pages visited, time spent, and device information to improve our services.' },
  { title: 'How We Use Your Information', content: 'Your information is used to process orders, provide customer support, send order updates, and improve our website experience. With your consent, we may send promotional communications about new collections and exclusive offers.' },
  { title: 'Data Protection', content: 'We employ industry-standard security measures including 256-bit SSL encryption, PCI-DSS compliant payment processing, and secure data storage. Your payment information is never stored on our servers.' },
  { title: 'Cookies & Tracking', content: 'We use essential cookies for site functionality and analytics cookies to understand how visitors interact with our website. You can manage cookie preferences through your browser settings at any time.' },
  { title: 'Third-Party Sharing', content: 'We do not sell your personal information. We share data only with trusted service providers necessary for order fulfillment (shipping carriers, payment processors) and as required by law.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time. For data requests, contact our privacy team at privacy@vaultmaison.com.' },
  { title: 'Data Retention', content: 'We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Order records are retained for 7 years for tax and legal compliance.' },
  { title: 'Updates to This Policy', content: 'We may update this privacy policy periodically. Changes will be posted on this page with an updated effective date. We encourage you to review this policy regularly.' },
]

export function MinimalPrivacy() {
  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 100px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Legal</p>
          <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 200, color: '#050505', marginBottom: '12px' }}>Privacy Policy</h1>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9B9B' }}>Last updated: March 2025</p>
        </div>

        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555', marginBottom: '48px' }}>
          At Vault Maison, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase.
        </p>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: font, fontSize: '18px', fontWeight: 400, color: '#050505', marginBottom: '12px' }}>
              <span style={{ color: '#050505', marginRight: '8px' }}>{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </h2>
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555' }}>{s.content}</p>
          </div>
        ))}

        <div style={{ padding: '32px', backgroundColor: '#FAFAFA', marginTop: '48px' }}>
          <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#050505', marginBottom: '8px' }}>Questions about your privacy?</p>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9B9B' }}>
            Contact our privacy team at <a href="mailto:privacy@vaultmaison.com" style={{ color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>privacy@vaultmaison.com</a>
          </p>
        </div>
      </section>
    </MinimalLayout>
  )
}
