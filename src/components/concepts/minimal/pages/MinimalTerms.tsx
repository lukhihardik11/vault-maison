'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { FileText, ShoppingBag, CreditCard, Truck, RotateCcw, Scale, AlertTriangle, Globe } from 'lucide-react'

const F = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const sections = [
  {
    icon: <FileText size={18} color="#050505" />,
    title: 'Acceptance of Terms',
    content: [
      'By accessing, browsing, or purchasing from vaultmaison.com ("the Site"), you agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations.',
      'If you do not agree with any part of these terms, you must not use our services. We reserve the right to update these terms at any time; continued use of the Site after changes constitutes acceptance.',
      'You must be at least 18 years of age to make a purchase. By placing an order, you represent that you are of legal age to form a binding contract.',
    ],
  },
  {
    icon: <ShoppingBag size={18} color="#050505" />,
    title: 'Products & Availability',
    content: [
      'All products listed on the Site are subject to availability. We reserve the right to discontinue any product at any time without notice.',
      'Product images are representative. Due to the natural characteristics of gemstones and precious metals, each piece is unique. Minor variations in color, clarity, and texture are inherent and not considered defects.',
      'All diamonds and gemstones are conflict-free, sourced in compliance with the Kimberley Process Certification Scheme and applicable international regulations.',
      'Product specifications (carat weight, dimensions, metal purity) are accurate to industry-standard tolerances: ±0.01ct for diamonds, ±0.5mm for dimensions, and stated karat purity for precious metals.',
    ],
  },
  {
    icon: <CreditCard size={18} color="#050505" />,
    title: 'Pricing & Payment',
    content: [
      'All prices are displayed in United States Dollars (USD) unless otherwise stated. Prices include applicable taxes for domestic orders; international orders may be subject to import duties and taxes, which are the responsibility of the buyer.',
      'We accept Visa, Mastercard, American Express, and Apple Pay. All payments are processed through PCI-DSS Level 1 certified processors.',
      'We reserve the right to refuse or cancel any order if fraud is suspected. In such cases, you will be notified and any charges will be reversed.',
      'Promotional codes are single-use, non-transferable, and cannot be combined with other offers unless explicitly stated. We reserve the right to void any promotion at our discretion.',
    ],
  },
  {
    icon: <Truck size={18} color="#050505" />,
    title: 'Shipping & Delivery',
    content: [
      'All orders are shipped fully insured via bonded carriers. Risk of loss transfers to you upon delivery confirmation.',
      'Estimated delivery times are provided in good faith but are not guaranteed. Vault Maison is not liable for delays caused by carriers, customs, weather, or other circumstances beyond our control.',
      'A signature is required for all deliveries. If you are unavailable, the carrier will follow their standard redelivery procedures.',
      'For full shipping details, methods, and international delivery information, please refer to our Shipping & Returns page.',
    ],
  },
  {
    icon: <RotateCcw size={18} color="#050505" />,
    title: 'Returns & Exchanges',
    content: [
      'We offer a 30-day return window from the date of delivery for unworn, unaltered items in their original packaging with all tags and certificates intact.',
      'Custom, bespoke, or engraved items are final sale and cannot be returned unless defective.',
      'Refunds are processed to the original payment method within 5–10 business days of receiving the returned item and completing quality inspection.',
      'Exchanges are subject to availability. If the requested item is unavailable, a full refund will be issued.',
      'Return shipping is complimentary for domestic orders. International return shipping costs are the responsibility of the buyer.',
    ],
  },
  {
    icon: <Scale size={18} color="#050505" />,
    title: 'Intellectual Property',
    content: [
      'All content on this Site — including text, images, designs, logos, product photography, and code — is the exclusive property of Vault Maison and is protected by copyright, trademark, and other intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works from any content on this Site without prior written consent from Vault Maison.',
      'The Vault Maison name, logo, and all related marks are registered trademarks. Unauthorized use is strictly prohibited and may result in legal action.',
    ],
  },
  {
    icon: <AlertTriangle size={18} color="#050505" />,
    title: 'Limitation of Liability',
    content: [
      'Vault Maison provides this Site and its services on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation of the Site or the accuracy of its content.',
      'To the fullest extent permitted by law, Vault Maison shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or purchase of products.',
      'Our total liability for any claim arising from a purchase shall not exceed the purchase price of the product in question.',
      'Nothing in these terms excludes or limits liability for death, personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.',
    ],
  },
  {
    icon: <Globe size={18} color="#050505" />,
    title: 'Governing Law & Disputes',
    content: [
      'These Terms of Service are governed by and construed in accordance with the laws of the State of New York, United States, without regard to conflict of law principles.',
      'Any dispute arising from these terms or your use of the Site shall first be addressed through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under the rules of the American Arbitration Association.',
      'You agree that any claim or cause of action must be filed within one (1) year after the cause of action arose, or be permanently barred.',
      'If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.',
    ],
  },
]

export function MinimalTerms() {
  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 100px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: F, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: F, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Terms of Service
          </h1>
          <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, color: '#9B9B9B' }}>
            Effective: April 28, 2026
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 400, lineHeight: 1.9, color: '#555', marginBottom: '56px' }}>
          These Terms of Service govern your use of the Vault Maison website and your purchase of products from us. Please read them carefully. By using our Site, you acknowledge that you have read, understood, and agree to be bound by these terms.
        </p>

        {/* Table of Contents */}
        <div style={{ border: '1px solid #E5E5E5', padding: '24px 28px', marginBottom: '56px' }}>
          <p style={{ fontFamily: F, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: '16px' }}>
            Contents
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {sections.map((s, i) => (
              <span key={i} style={{ fontFamily: F, fontSize: '13px', color: '#050505', fontWeight: 400 }}>
                {String(i + 1).padStart(2, '0')} — {s.title}
              </span>
            ))}
          </div>
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
            Questions about these terms?
          </p>
          <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, color: '#9B9B9B', marginBottom: '16px' }}>
            Contact our legal team at{' '}
            <a href="mailto:legal@vaultmaison.com" style={{ color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              legal@vaultmaison.com
            </a>
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/minimal/privacy" style={{ fontFamily: F, fontSize: '12px', color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Privacy Policy
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
