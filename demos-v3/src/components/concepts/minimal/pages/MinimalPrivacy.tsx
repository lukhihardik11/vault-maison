'use client'

import { motion } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

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
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '100px 5vw 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '8px',
          }}>
            Legal
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Privacy Policy
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.35,
          }}>
            Last updated: March 2024
          </p>
        </motion.div>
      </section>

      {/* Sections */}
      <section style={{ padding: '60px 5vw 120px', maxWidth: '700px' }}>
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '16px',
              padding: '32px 0',
              borderBottom: '1px solid #E5E5E5',
            }}
          >
            <span style={{
              fontFamily: font,
              fontSize: '11px',
              fontWeight: 400,
              color: '#050505',
              opacity: 0.2,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 style={{
                fontFamily: font,
                fontSize: '15px',
                fontWeight: 400,
                color: '#050505',
                marginBottom: '8px',
              }}>
                {section.title}
              </h2>
              <p style={{
                fontFamily: font,
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#050505',
                opacity: 0.6,
              }}>
                {section.content}
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </MinimalLayout>
  )
}
