'use client'

import { useState } from 'react'
import { MinimalPage } from '../MinimalPage'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  border: 'none',
  borderBottom: '1px solid #E5E5E5',
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: 'inherit',
  color: '#050505',
  backgroundColor: 'transparent',
  outline: 'none',
  transition: 'border-color 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontWeight: 400,
  color: '#050505',
  opacity: 0.4,
  display: 'block',
  marginBottom: '4px',
}

export function MinimalBespoke() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <MinimalPage title="Bespoke" subtitle="Your inquiry has been received.">
        <div style={{ maxWidth: '600px' }}>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            Thank you. A member of our team will be in touch within 48 hours to discuss your vision.
          </p>
        </div>
      </MinimalPage>
    )
  }

  return (
    <MinimalPage title="Bespoke" subtitle="Commission a piece designed exclusively for you.">
      <div style={{ maxWidth: '600px' }}>
        {/* Process */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }} className="minimal-bespoke-steps">
            {['Consultation', 'Design', 'Stone Selection', 'Crafting', 'Delivery'].map((step, i) => (
              <div key={step}>
                <p style={{ fontSize: '11px', fontWeight: 400, opacity: 0.3, marginBottom: '8px' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p style={{ fontSize: '13px', fontWeight: 300 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <div>
            <label style={labelStyle}>Name</label>
            <input type="text" required style={inputStyle} placeholder="Your name" />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" required style={inputStyle} placeholder="your@email.com" />
          </div>
          <div>
            <label style={labelStyle}>Type of Piece</label>
            <select
              required
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
            >
              <option value="">Select</option>
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="bracelet">Bracelet</option>
              <option value="earrings">Earrings</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Your Vision</label>
            <textarea
              required
              rows={4}
              style={{ ...inputStyle, resize: 'none' }}
              placeholder="Describe your ideal piece"
            />
          </div>
          <div>
            <label style={labelStyle}>Budget Range</label>
            <select
              required
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
            >
              <option value="">Select</option>
              <option value="5k-15k">$5,000 – $15,000</option>
              <option value="15k-30k">$15,000 – $30,000</option>
              <option value="30k-50k">$30,000 – $50,000</option>
              <option value="50k+">$50,000+</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              padding: '14px 40px',
              border: '1px solid #050505',
              backgroundColor: 'transparent',
              color: '#050505',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#050505'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#050505'
            }}
          >
            Submit Inquiry
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .minimal-bespoke-steps {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </MinimalPage>
  )
}
