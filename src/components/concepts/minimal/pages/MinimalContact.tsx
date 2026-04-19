'use client'

import { useState } from 'react'
import { MinimalLayout } from '../MinimalLayout'
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react'
import { AnimatedSendButton } from '../ui'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', border: '1px solid #E5E5E5',
  fontSize: '13px', fontWeight: 300, fontFamily: font, color: '#050505',
  backgroundColor: '#FFFFFF', outline: 'none', transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
  letterSpacing: '0.15em', fontWeight: 500, color: '#9B9B9B',
  display: 'block', marginBottom: '6px',
}

export function MinimalContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Get in Touch</p>
        <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 200, color: '#050505', marginBottom: '12px' }}>Contact Us</h1>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9B9B', maxWidth: '500px', margin: '0 auto' }}>
          Our client advisors are available to assist you with any inquiry — from product questions to bespoke consultations.
        </p>
      </section>

      {/* Contact Grid */}
      <section style={{ padding: '60px 5vw 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px' }} className="vm-contact-grid">
          {/* Left: Info */}
          <div>
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#050505', marginBottom: '24px' }}>Visit Our Atelier</h2>
              {[
                { icon: MapPin, label: 'Address', value: '127 Prince Street, SoHo\nNew York, NY 10012' },
                { icon: Phone, label: 'Phone', value: '+1 (212) 555-0187' },
                { icon: Mail, label: 'Email', value: 'concierge@vaultmaison.com' },
                { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10am – 7pm\nSunday: By Appointment' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                  <item.icon size={18} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: '4px' }}>{item.label}</p>
                    <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#050505', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '28px', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <MessageSquare size={18} strokeWidth={1.5} style={{ color: '#050505' }} />
                <h3 style={{ fontFamily: font, fontSize: '15px', fontWeight: 500, color: '#050505' }}>Private Consultation</h3>
              </div>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#9B9B9B', marginBottom: '16px' }}>
                Schedule a one-on-one session with our gemologist for personalized guidance on engagement rings, bespoke pieces, or investment stones.
              </p>
              <a href="/minimal/bespoke" style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#050505', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Book Now
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div style={{ padding: '80px 40px', textAlign: 'center', backgroundColor: '#FAFAFA' }}>
                <Send size={32} strokeWidth={1} style={{ color: '#050505', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#050505', marginBottom: '8px' }}>Message Sent</h3>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9B9B', lineHeight: 1.7 }}>
                  Thank you for reaching out. Our team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#050505', marginBottom: '4px' }}>Send a Message</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={labelStyle}>First Name</label><input type="text" required style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = '#050505'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }} /></div>
                  <div><label style={labelStyle}>Last Name</label><input type="text" required style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = '#050505'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }} /></div>
                </div>
              <div><label style={labelStyle}>Email</label><input type="email" required style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = '#050505'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }} /></div>
              <div><label style={labelStyle}>Phone (Optional)</label><input type="tel" style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = '#050505'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }} /></div>
              <div>
                <label style={labelStyle}>Subject</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#050505'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <option>General Inquiry</option>
                    <option>Product Question</option>
                    <option>Bespoke Request</option>
                    <option>Order Support</option>
                  <option>Press & Media</option>
                </select>
              </div>
              <div><label style={labelStyle}>Message</label><textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#050505'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }} /></div>
              <div style={{ alignSelf: 'flex-start' }}>
                  <AnimatedSendButton text="Send Message" sentText="Message Sent!" type="submit" />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
