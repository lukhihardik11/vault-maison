'use client'

import { useState } from 'react'
import Image from 'next/image'
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

const steps = [
  { num: '01', title: 'Consultation', desc: 'Share your vision with our design team' },
  { num: '02', title: 'Design', desc: 'Receive hand-drawn sketches and 3D renders' },
  { num: '03', title: 'Stone Selection', desc: 'Choose from hand-picked certified stones' },
  { num: '04', title: 'Crafting', desc: '6–8 weeks of meticulous handwork' },
  { num: '05', title: 'Delivery', desc: 'Presented in our signature packaging' },
]

export function MinimalBespoke() {
  const [submitted, setSubmitted] = useState(false)

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
            Bespoke
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Commission a Piece
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            Every bespoke creation begins with a conversation. Tell us your vision, and we will bring it to life with precision and care.
          </p>
        </motion.div>
      </section>

      {/* Editorial: Image + Process Timeline */}
      <section style={{ padding: '80px 5vw' }}>
        <div className="minimal-bespoke-editorial" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <Image
                src="/images/jewelry-ring-closeup.jpg"
                alt="Bespoke craftsmanship"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          </motion.div>

          {/* Right: Process Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ paddingTop: '20px' }}
          >
            <p style={{
              fontFamily: font,
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#050505',
              opacity: 0.35,
              marginBottom: '32px',
            }}>
              The Process
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr',
                    gap: '16px',
                    padding: '24px 0',
                    borderBottom: '1px solid #E5E5E5',
                  }}
                >
                  <span style={{
                    fontFamily: font,
                    fontSize: '11px',
                    fontWeight: 400,
                    color: '#050505',
                    opacity: 0.25,
                  }}>
                    {step.num}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: font,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#050505',
                      marginBottom: '4px',
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: font,
                      fontSize: '12px',
                      fontWeight: 300,
                      color: '#050505',
                      opacity: 0.5,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section style={{ padding: '80px 5vw 120px', borderTop: '1px solid #E5E5E5' }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ maxWidth: '500px', textAlign: 'center', margin: '0 auto', padding: '40px 0' }}
            >
              <h2 style={{
                fontFamily: font,
                fontSize: '24px',
                fontWeight: 200,
                color: '#050505',
                marginBottom: '16px',
              }}>
                Inquiry Received
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
                Thank you. A member of our bespoke team will be in touch within 48 hours to discuss your vision.
              </p>
              <SlideTextButton
                text="View Collections"
                hoverText="Browse"
                href="/minimal/collections"
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ maxWidth: '600px' }}
            >
              <p style={{
                fontFamily: font,
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050505',
                opacity: 0.35,
                marginBottom: '32px',
              }}>
                Begin Your Commission
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="minimal-bespoke-form-row">
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="minimal-bespoke-form-row">
                  <div>
                    <label style={labelStyle}>Type of Piece</label>
                    <select required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select</option>
                      <option value="ring">Ring</option>
                      <option value="necklace">Necklace</option>
                      <option value="bracelet">Bracelet</option>
                      <option value="earrings">Earrings</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Budget Range</label>
                    <select required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select</option>
                      <option value="5k-15k">$5,000 – $15,000</option>
                      <option value="15k-30k">$15,000 – $30,000</option>
                      <option value="30k-50k">$30,000 – $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Your Vision</label>
                  <textarea required rows={5} style={{ ...inputStyle, resize: 'none' }} placeholder="Describe your ideal piece — materials, style, occasion..." onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
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
                  Submit Inquiry
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-bespoke-editorial { grid-template-columns: 1fr !important; gap: 40px !important; }
          .minimal-bespoke-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
