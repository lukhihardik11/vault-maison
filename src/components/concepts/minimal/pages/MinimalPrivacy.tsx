'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Shield, Lock, Eye, Database, Globe, UserCheck, Trash2, Mail } from 'lucide-react'

const F = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const sections = [
  {
    icon: <Database size={18} color="#050505" />,
    title: 'Information We Collect',
    content: [
      'Personal identifiers: name, email address, phone number, shipping and billing addresses.',
      'Payment data: card type and last four digits only — full card numbers are processed exclusively by our PCI-DSS Level 1 certified payment processor and never touch our servers.',
      'Order history: items purchased, dates, amounts, and shipping details for fulfillment and support.',
      'Device and usage data: IP address, browser type, pages visited, time on site, and referral source — collected via first-party analytics only.',
      'Communications: messages you send to our support team, survey responses, and review submissions.',
    ],
  },
  {
    icon: <Eye size={18} color="#050505" />,
    title: 'How We Use Your Data',
    content: [
      'Order processing: to fulfill purchases, arrange shipping, process returns, and send transactional emails (confirmation, shipping updates, delivery notification).',
      'Customer support: to respond to inquiries, resolve disputes, and provide after-sale care guidance.',
      'Service improvement: to analyze aggregate usage patterns, optimize site performance, and improve product presentation.',
      'Marketing (opt-in only): with your explicit consent, to send curated collection announcements and exclusive offers. You may withdraw consent at any time.',
      'Legal compliance: to meet tax reporting obligations, respond to lawful government requests, and enforce our Terms of Service.',
    ],
  },
  {
    icon: <Lock size={18} color="#050505" />,
    title: 'Security Measures',
    content: [
      '256-bit TLS encryption on every page — not just checkout. Your connection is encrypted from the moment you arrive.',
      'PCI-DSS Level 1 compliance for all payment processing. Card data is tokenized and never stored in our database.',
      'SOC 2 Type II audited infrastructure hosted on enterprise-grade cloud providers with 99.99% uptime SLA.',
      'Regular penetration testing and vulnerability assessments conducted by independent third-party security firms.',
      'Role-based access controls: employee access to customer data is limited to the minimum necessary for their function and is fully audited.',
      'Automated breach detection with 24-hour notification commitment should any incident occur.',
    ],
  },
  {
    icon: <Globe size={18} color="#050505" />,
    title: 'Cookies & Tracking',
    content: [
      'Essential cookies: required for cart functionality, authentication, and security. These cannot be disabled.',
      'Analytics cookies (first-party only): we use privacy-respecting analytics to understand aggregate traffic patterns. No third-party tracking pixels.',
      'We do not use Facebook Pixel, Google Ads remarketing, or any cross-site tracking technology.',
      'You may manage cookie preferences through your browser settings. Disabling non-essential cookies will not affect your ability to browse or purchase.',
    ],
  },
  {
    icon: <Shield size={18} color="#050505" />,
    title: 'Third-Party Sharing',
    content: [
      'We do not sell, rent, or trade your personal information. Period.',
      'We share data only with: (1) shipping carriers to deliver your order, (2) our payment processor to complete transactions, (3) our email service provider to send transactional messages.',
      'All third-party processors are contractually bound to use your data solely for the services they provide to us and are required to maintain equivalent security standards.',
      'We may disclose information if required by law, court order, or to protect the rights, property, or safety of Vault Maison, our customers, or the public.',
    ],
  },
  {
    icon: <UserCheck size={18} color="#050505" />,
    title: 'Your Rights (GDPR & CCPA)',
    content: [
      'Right to access: request a complete copy of all personal data we hold about you.',
      'Right to rectification: correct any inaccurate or incomplete data.',
      'Right to erasure: request deletion of your personal data ("right to be forgotten").',
      'Right to portability: receive your data in a structured, machine-readable format.',
      'Right to opt out: withdraw marketing consent or object to data processing at any time.',
      'Right to non-discrimination: exercising your privacy rights will never affect the quality of service you receive.',
      'California residents: under CCPA, you have the right to know what personal information is collected, request deletion, and opt out of sale (we do not sell data).',
      'EU/EEA residents: under GDPR, you may lodge a complaint with your local supervisory authority.',
    ],
  },
  {
    icon: <Trash2 size={18} color="#050505" />,
    title: 'Data Retention',
    content: [
      'Active account data: retained while your account is active and for 30 days after deletion request to allow for recovery.',
      'Order records: retained for 7 years to comply with tax and financial reporting obligations.',
      'Analytics data: aggregated and anonymized after 26 months; individual session data is purged.',
      'Marketing preferences: deleted immediately upon opt-out request.',
      'Support communications: retained for 3 years after resolution for quality assurance.',
    ],
  },
  {
    icon: <Mail size={18} color="#050505" />,
    title: 'Policy Updates & Contact',
    content: [
      'This policy was last updated on April 28, 2026. We review and update it at least annually.',
      'Material changes will be communicated via email to registered customers at least 30 days before taking effect.',
      'For any privacy-related questions, data requests, or concerns, contact our Data Protection Officer at privacy@vaultmaison.com.',
      'Response time: we acknowledge all privacy requests within 48 hours and fulfill them within 30 days as required by GDPR.',
    ],
  },
]

export function MinimalPrivacy() {
  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 100px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: F, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: F, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, color: '#9B9B9B' }}>
            Last updated: April 28, 2026
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 400, lineHeight: 1.9, color: '#555', marginBottom: '24px' }}>
          At Vault Maison, your privacy is not a feature — it is a fundamental right. We collect only what is necessary, protect it with enterprise-grade security, and never monetize your data. This policy explains exactly what we collect, why, and what control you have.
        </p>

        {/* Compliance badges */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '56px', flexWrap: 'wrap' }}>
          {['GDPR Compliant', 'CCPA Compliant', 'PCI-DSS Level 1', 'SOC 2 Type II', '256-bit TLS'].map((badge) => (
            <span key={badge} style={{
              fontFamily: F,
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#050505',
              border: '1px solid #050505',
              padding: '6px 12px',
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: F, fontSize: '12px', fontWeight: 500, color: '#9B9B9B', letterSpacing: '0.05em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.icon}
              <h2 style={{ fontFamily: F, fontSize: '18px', fontWeight: 400, color: '#050505', margin: 0 }}>
                {s.title}
              </h2>
            </div>
            <div style={{ paddingLeft: '48px' }}>
              {s.content.map((paragraph, j) => (
                <p key={j} style={{
                  fontFamily: F,
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.9,
                  color: '#555',
                  marginBottom: j < s.content.length - 1 ? '12px' : '0',
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Contact block */}
        <div style={{ padding: '32px', backgroundColor: '#FAFAFA', marginTop: '48px', borderLeft: '2px solid #050505' }}>
          <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 400, color: '#050505', marginBottom: '8px' }}>
            Questions about your privacy?
          </p>
          <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, color: '#9B9B9B', marginBottom: '16px' }}>
            Contact our Data Protection Officer at{' '}
            <a href="mailto:privacy@vaultmaison.com" style={{ color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              privacy@vaultmaison.com
            </a>
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/minimal/terms" style={{ fontFamily: F, fontSize: '12px', color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Terms of Service
            </Link>
            <Link href="/minimal/shipping" style={{ fontFamily: F, fontSize: '12px', color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Shipping & Returns
            </Link>
            <Link href="/minimal/authenticity" style={{ fontFamily: F, fontSize: '12px', color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Authenticity Guarantee
            </Link>
          </div>
        </div>
      </section>
    </MinimalLayout>
  )
}
