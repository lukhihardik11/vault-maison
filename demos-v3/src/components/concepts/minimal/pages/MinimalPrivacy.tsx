'use client'

import { MinimalPage } from '../MinimalPage'

const sections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly: name, email, shipping address, payment details, and communication preferences. We also collect usage data through cookies and analytics tools to improve your experience.',
  },
  {
    title: 'How We Use Your Information',
    content: 'Your information is used to process orders, communicate about your purchases, and improve our services. We do not sell or rent your personal information to third parties. Marketing communications are opt-in only.',
  },
  {
    title: 'Data Security',
    content: 'All transactions are encrypted using industry-standard SSL/TLS protocols. Payment information is processed through PCI-compliant payment processors and is never stored on our servers.',
  },
  {
    title: 'Cookies',
    content: 'We use essential cookies to maintain your session and preferences. Analytics cookies help us understand how our site is used. You may disable non-essential cookies through your browser settings.',
  },
  {
    title: 'Your Rights',
    content: 'You may request access to, correction of, or deletion of your personal data at any time. To exercise these rights, contact privacy@vaultmaison.com. We will respond within 30 days.',
  },
  {
    title: 'Contact',
    content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@vaultmaison.com or write to: Vault Maison, 742 Fifth Avenue, New York, NY 10019.',
  },
]

export function MinimalPrivacy() {
  return (
    <MinimalPage title="Privacy" subtitle="How we handle your data.">
      <div style={{ maxWidth: '600px' }}>
        <p style={{ fontSize: '11px', fontWeight: 300, opacity: 0.4, marginBottom: '48px' }}>
          Last updated: March 2024
        </p>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '12px' }}>{section.title}</h2>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </MinimalPage>
  )
}
