'use client'

import { motion } from 'motion/react'
import { Package, Globe, Lock, RotateCcw } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

export function MinimalShipping() {
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
            Shipping & Returns
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Secure Delivery Worldwide
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            Every order is fully insured, discreetly packaged, and delivered with care.
          </p>
        </motion.div>
      </section>

      {/* Shipping Options Table */}
      <section style={{ padding: '60px 5vw 0', maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '20px', marginBottom: '40px' }}>
            <Package size={20} strokeWidth={1} style={{ color: '#050505', opacity: 0.3, marginTop: '2px' }} />
            <div>
              <h2 style={{ fontFamily: font, fontSize: '15px', fontWeight: 400, color: '#050505', marginBottom: '20px' }}>
                Domestic Shipping
              </h2>
              <div style={{ borderTop: '1px solid #E5E5E5' }}>
                {[
                  { method: 'Standard', time: '5–7 business days', price: 'Complimentary' },
                  { method: 'Express', time: '2–3 business days', price: '$25' },
                  { method: 'Priority Insured', time: 'Next business day', price: '$75' },
                ].map((opt, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #E5E5E5' }}>
                    <div>
                      <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#050505' }}>{opt.method}</p>
                      <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#050505', opacity: 0.4 }}>{opt.time}</p>
                    </div>
                    <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{opt.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Info Sections */}
      <section style={{ padding: '20px 5vw 120px', maxWidth: '700px' }}>
        {[
          {
            icon: Globe,
            title: 'International Shipping',
            content: 'We ship to over 40 countries. International orders are fully insured and include customs documentation. Duties and import taxes are calculated at checkout. Delivery typically takes 7–14 business days depending on destination.',
          },
          {
            icon: Lock,
            title: 'Security',
            content: 'All shipments are fully insured from our facility to your door. Packages are discreetly labeled with no indication of contents. Signature is required upon delivery for all orders.',
          },
          {
            icon: RotateCcw,
            title: 'Returns',
            content: 'We accept returns within 30 days of delivery. Items must be in original, unworn condition with all documentation and packaging. Return shipping is complimentary for domestic orders. Bespoke and engraved pieces are final sale.',
          },
        ].map((section, i) => {
          const Icon = section.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '20px',
                padding: '32px 0',
                borderBottom: '1px solid #E5E5E5',
              }}
            >
              <Icon size={20} strokeWidth={1} style={{ color: '#050505', opacity: 0.3, marginTop: '2px' }} />
              <div>
                <h2 style={{ fontFamily: font, fontSize: '15px', fontWeight: 400, color: '#050505', marginBottom: '8px' }}>
                  {section.title}
                </h2>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#050505', opacity: 0.6 }}>
                  {section.content}
                </p>
              </div>
            </motion.div>
          )
        })}
      </section>
    </MinimalLayout>
  )
}
