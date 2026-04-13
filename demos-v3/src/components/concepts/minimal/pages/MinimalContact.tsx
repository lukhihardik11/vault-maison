'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { SlideTextButton } from '../ui'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  border: 'none',
  borderBottom: '1px solid #E5E5E5',
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: font,
  color: '#050505',
  backgroundColor: 'transparent',
  outline: 'none',
  transition: 'border-color 300ms ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontWeight: 400,
  color: '#050505',
  opacity: 0.35,
  display: 'block',
  marginBottom: '4px',
}

export function MinimalContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '100px 5vw 0' }}>
        <div
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
            Contact
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            We respond within 24 hours. Every interaction is personal, unhurried, and entirely on your terms.
          </p>
        </div>
      </section>

      {/* Main Content: Info + Form side by side */}
      <section style={{ padding: '60px 5vw 120px' }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            <div
              key="success"
              style={{ maxWidth: '500px', textAlign: 'center', margin: '0 auto', padding: '80px 0' }}
            >
              <h2 style={{
                fontFamily: font,
                fontSize: '24px',
                fontWeight: 200,
                color: '#050505',
                marginBottom: '16px',
              }}>
                Message Received
              </h2>
              <p style={{
                fontFamily: font,
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#050505',
                opacity: 0.6,
                marginBottom: '32px',
              }}>
                Thank you for reaching out. A member of our team will respond within 24 hours. For urgent inquiries, please call us directly.
              </p>
              <SlideTextButton
                text="Back to Home"
                hoverText="Continue"
                href="/minimal"
              />
            </div>
          ) : (
            <div
              key="form"
              className="minimal-contact-layout"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px' }}
            >
              {/* Left: Contact Info */}
              <div
              >
                <div style={{ marginBottom: '40px' }}>
                  <p style={labelStyle}>Visit</p>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#050505' }}>
                    742 Fifth Avenue<br />New York, NY 10019
                  </p>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <p style={labelStyle}>Hours</p>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#050505' }}>
                    Mon – Sat: 10am – 7pm<br />Sun: By Appointment
                  </p>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <p style={labelStyle}>Phone</p>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>+1 (212) 555-0100</p>
                </div>
                <div>
                  <p style={labelStyle}>Email</p>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>contact@vaultmaison.com</p>
                </div>
              </div>

              {/* Right: Form */}
              <div
              >
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="minimal-contact-form-row">
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
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
                    <textarea required rows={5} style={{ ...inputStyle, resize: 'none' }} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <button
                    type="submit"
                    style={{
                      alignSelf: 'flex-start',
                      padding: '14px 48px',
                      border: '1px solid #050505',
                      backgroundColor: '#050505',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 400,
                      cursor: 'pointer',
                      fontFamily: font,
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}
        </AnimatePresence>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-contact-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
          .minimal-contact-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
