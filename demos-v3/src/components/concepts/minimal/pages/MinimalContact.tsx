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

export function MinimalContact() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <MinimalPage title="Contact" subtitle="Message received.">
        <div style={{ maxWidth: '600px' }}>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            Thank you. We will respond within 24 hours.
          </p>
        </div>
      </MinimalPage>
    )
  }

  return (
    <MinimalPage title="Contact" subtitle="We respond within 24 hours.">
      <div style={{ maxWidth: '600px' }}>
        {/* Contact Info */}
        <div style={{ marginBottom: '60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="minimal-contact-info">
          <div>
            <p style={labelStyle}>Visit</p>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7 }}>
              742 Fifth Avenue<br />New York, NY 10019
            </p>
          </div>
          <div>
            <p style={labelStyle}>Hours</p>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7 }}>
              Mon – Sat: 10am – 7pm<br />Sun: By Appointment
            </p>
          </div>
          <div>
            <p style={labelStyle}>Phone</p>
            <p style={{ fontSize: '13px', fontWeight: 300 }}>+1 (212) 555-0100</p>
          </div>
          <div>
            <p style={labelStyle}>Email</p>
            <p style={{ fontSize: '13px', fontWeight: 300 }}>contact@vaultmaison.com</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #E5E5E5', marginBottom: '60px' }} />

        {/* Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="minimal-contact-form-row">
            <div>
              <label style={labelStyle}>First Name</label>
              <input type="text" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input type="text" required style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Subject</label>
            <select required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
              <option value="">Select</option>
              <option value="general">General Inquiry</option>
              <option value="product">Product Question</option>
              <option value="order">Order Status</option>
              <option value="bespoke">Bespoke Commission</option>
              <option value="appointment">Private Appointment</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Message</label>
            <textarea required rows={4} style={{ ...inputStyle, resize: 'none' }} />
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
            Send
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .minimal-contact-info { grid-template-columns: 1fr !important; }
          .minimal-contact-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalPage>
  )
}
