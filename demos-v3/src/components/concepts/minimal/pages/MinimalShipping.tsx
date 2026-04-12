'use client'

import { MinimalPage } from '../MinimalPage'

export function MinimalShipping() {
  return (
    <MinimalPage title="Shipping" subtitle="Secure delivery worldwide.">
      <div style={{ maxWidth: '600px' }}>
        {/* Shipping Options */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '20px' }}>Domestic Shipping</h2>
          <div style={{ borderTop: '1px solid #E5E5E5' }}>
            {[
              { method: 'Standard', time: '5–7 business days', price: 'Complimentary' },
              { method: 'Express', time: '2–3 business days', price: '$25' },
              { method: 'Priority Insured', time: 'Next business day', price: '$75' },
            ].map((opt, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E5E5E5' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 400 }}>{opt.method}</p>
                  <p style={{ fontSize: '11px', fontWeight: 300, opacity: 0.4 }}>{opt.time}</p>
                </div>
                <p style={{ fontSize: '13px', fontWeight: 300 }}>{opt.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '12px' }}>International Shipping</h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            We ship to over 40 countries. International orders are fully insured and include customs documentation. Duties and import taxes are calculated at checkout. Delivery typically takes 7–14 business days depending on destination.
          </p>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '12px' }}>Security</h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            All shipments are fully insured from our facility to your door. Packages are discreetly labeled with no indication of contents. Signature is required upon delivery for all orders.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '12px' }}>Returns</h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            We accept returns within 30 days of delivery. Items must be in original, unworn condition with all documentation and packaging. Return shipping is complimentary for domestic orders. Bespoke and engraved pieces are final sale.
          </p>
        </div>
      </div>
    </MinimalPage>
  )
}
