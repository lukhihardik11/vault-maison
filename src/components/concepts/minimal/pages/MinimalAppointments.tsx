'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Calendar, Clock, MapPin, Phone, ArrowRight, Check } from 'lucide-react'

const F = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

/* ── Data ─────────────────────────────────────────────────────────── */

const consultationTypes = [
  {
    title: 'Engagement Ring Consultation',
    duration: '60 minutes',
    desc: 'One-on-one session with a gemologist to explore diamond options, settings, and design your perfect engagement ring.',
  },
  {
    title: 'Bespoke Design Session',
    duration: '90 minutes',
    desc: 'Work directly with our design team to create a one-of-a-kind piece from initial concept through 3D prototype.',
  },
  {
    title: 'Collection Viewing',
    duration: '45 minutes',
    desc: 'Private viewing of our current collections in a relaxed setting. Ideal for gifts or personal additions.',
  },
  {
    title: 'Jewelry Appraisal',
    duration: '30 minutes',
    desc: 'Professional evaluation of existing pieces for insurance, resale, or personal knowledge.',
  },
]

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM',
]

const expectations = [
  'A dedicated gemologist or designer for your entire session',
  'Complimentary refreshments in our private viewing room',
  'No purchase obligation — consultations are always free',
  'Full confidentiality on all bespoke design discussions',
  'Follow-up summary with recommendations and next steps',
]

export function MinimalAppointments() {
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <MinimalLayout>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ padding: '120px 5vw 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{
          fontFamily: F, fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#9B9B9B', marginBottom: '24px',
        }}>
          Private Consultations
        </p>
        <h1 style={{
          fontFamily: F, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 200,
          color: '#050505', lineHeight: 1.1, letterSpacing: '-0.03em',
          marginBottom: '24px', maxWidth: '800px',
        }}>
          Your Time.<br />
          Your Vision.
        </h1>
        <p style={{
          fontFamily: F, fontSize: '15px', fontWeight: 300,
          lineHeight: 1.9, color: '#6B6B6B', maxWidth: '560px',
        }}>
          Every exceptional piece begins with a conversation. Book a private consultation
          with our team of gemologists and designers — complimentary, confidential,
          and entirely on your terms.
        </p>
      </section>

      {/* ── Location Info ──────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 64px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px',
          padding: '32px', backgroundColor: '#FAFAFA',
        }} className="vm-appt-info">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <MapPin size={18} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 500, color: '#050505', marginBottom: '4px' }}>
                Atelier & Showroom
              </p>
              <p style={{ fontFamily: F, fontSize: '12px', fontWeight: 300, color: '#9B9B9B', lineHeight: 1.6 }}>
                580 Fifth Avenue, Suite 1200<br />New York, NY 10036
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Clock size={18} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 500, color: '#050505', marginBottom: '4px' }}>
                Appointment Hours
              </p>
              <p style={{ fontFamily: F, fontSize: '12px', fontWeight: 300, color: '#9B9B9B', lineHeight: 1.6 }}>
                Monday – Saturday<br />10:00 AM – 6:00 PM EST
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Phone size={18} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 500, color: '#050505', marginBottom: '4px' }}>
                Direct Line
              </p>
              <p style={{ fontFamily: F, fontSize: '12px', fontWeight: 300, color: '#9B9B9B', lineHeight: 1.6 }}>
                +1 (212) 555-0180<br />Virtual consultations available
              </p>
            </div>
          </div>
        </div>
      </section>

      {submitted ? (
        /* ── Confirmation ────────────────────────────────────── */
        <section style={{ padding: '0 5vw 100px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ border: '1px solid #050505', padding: '64px 32px' }}>
            <Check size={32} strokeWidth={1} style={{ color: '#050505', marginBottom: '24px' }} />
            <h2 style={{
              fontFamily: F, fontSize: '24px', fontWeight: 200,
              color: '#050505', marginBottom: '16px',
            }}>
              Request Received
            </h2>
            <p style={{
              fontFamily: F, fontSize: '14px', fontWeight: 300,
              lineHeight: 1.8, color: '#555', marginBottom: '32px',
            }}>
              Thank you. Our team will confirm your appointment within 24 hours
              via email. For immediate assistance, please call our direct line.
            </p>
            <Link
              href="/minimal/collections"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: F, fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#050505', textDecoration: 'none',
                border: '1px solid #050505', padding: '12px 24px',
              }}
            >
              Browse Collections
            </Link>
          </div>
        </section>
      ) : (
        /* ── Booking Form ────────────────────────────────────── */
        <form onSubmit={handleSubmit} style={{ padding: '0 5vw 100px', maxWidth: '900px', margin: '0 auto' }}>
          {/* Step 1: Consultation Type */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{
              fontFamily: F, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#9B9B9B', marginBottom: '20px',
            }}>
              01 — Select Consultation Type
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#E5E5E5' }} className="vm-appt-types">
              {consultationTypes.map((type, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedType(i)}
                  style={{
                    padding: '28px 24px',
                    backgroundColor: selectedType === i ? '#050505' : '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background-color 200ms ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{
                      fontFamily: F, fontSize: '15px', fontWeight: 500,
                      color: selectedType === i ? '#FFFFFF' : '#050505', margin: 0,
                    }}>
                      {type.title}
                    </h3>
                    <span style={{
                      fontFamily: F, fontSize: '11px', fontWeight: 400,
                      color: selectedType === i ? 'rgba(255,255,255,0.5)' : '#9B9B9B',
                    }}>
                      {type.duration}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: F, fontSize: '12px', fontWeight: 300,
                    lineHeight: 1.7,
                    color: selectedType === i ? 'rgba(255,255,255,0.6)' : '#9B9B9B',
                    margin: 0,
                  }}>
                    {type.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Date & Time */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{
              fontFamily: F, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#9B9B9B', marginBottom: '20px',
            }}>
              02 — Choose Date & Time
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="vm-appt-datetime">
              <div>
                <label style={{
                  fontFamily: F, fontSize: '12px', fontWeight: 400,
                  color: '#9B9B9B', display: 'block', marginBottom: '8px',
                }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  style={{
                    fontFamily: F, fontSize: '14px', fontWeight: 300,
                    width: '100%', padding: '12px 0',
                    border: 'none', borderBottom: '1px solid #E5E5E5',
                    outline: 'none', backgroundColor: 'transparent',
                    color: '#050505',
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: F, fontSize: '12px', fontWeight: 400,
                  color: '#9B9B9B', display: 'block', marginBottom: '8px',
                }}>
                  Preferred Time
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        fontFamily: F, fontSize: '11px', fontWeight: 400,
                        letterSpacing: '0.05em',
                        padding: '8px 14px',
                        border: '1px solid',
                        borderColor: selectedTime === slot ? '#050505' : '#E5E5E5',
                        backgroundColor: selectedTime === slot ? '#050505' : 'transparent',
                        color: selectedTime === slot ? '#FFFFFF' : '#050505',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Contact Details */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{
              fontFamily: F, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#9B9B9B', marginBottom: '20px',
            }}>
              03 — Your Details
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="vm-appt-fields">
              <div style={{ gridColumn: 'span 2' }} className="vm-appt-fullname">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  style={{
                    fontFamily: F, fontSize: '14px', fontWeight: 300,
                    width: '100%', padding: '12px 0',
                    border: 'none', borderBottom: '1px solid #E5E5E5',
                    outline: 'none', backgroundColor: 'transparent',
                    color: '#050505',
                  }}
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                style={{
                  fontFamily: F, fontSize: '14px', fontWeight: 300,
                  width: '100%', padding: '12px 0',
                  border: 'none', borderBottom: '1px solid #E5E5E5',
                  outline: 'none', backgroundColor: 'transparent',
                  color: '#050505',
                }}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                style={{
                  fontFamily: F, fontSize: '14px', fontWeight: 300,
                  width: '100%', padding: '12px 0',
                  border: 'none', borderBottom: '1px solid #E5E5E5',
                  outline: 'none', backgroundColor: 'transparent',
                  color: '#050505',
                }}
              />
              <div style={{ gridColumn: 'span 2' }} className="vm-appt-notes">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific pieces, styles, or topics you'd like to discuss? (Optional)"
                  rows={3}
                  style={{
                    fontFamily: F, fontSize: '14px', fontWeight: 300,
                    width: '100%', padding: '12px 0',
                    border: 'none', borderBottom: '1px solid #E5E5E5',
                    outline: 'none', backgroundColor: 'transparent',
                    color: '#050505', resize: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#FFFFFF', backgroundColor: '#050505',
              padding: '16px 40px', border: 'none',
              cursor: 'pointer',
            }}
          >
            Request Appointment <ArrowRight size={14} />
          </button>
        </form>
      )}

      {/* ── What to Expect ─────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: F, fontSize: '20px', fontWeight: 300,
          color: '#050505', marginBottom: '24px',
        }}>
          What to Expect
        </h2>
        <div style={{ display: 'grid', gap: '0' }}>
          {expectations.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 0',
              borderBottom: i < expectations.length - 1 ? '1px solid #E5E5E5' : 'none',
            }}>
              <Check size={14} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0 }} />
              <p style={{
                fontFamily: F, fontSize: '14px', fontWeight: 300,
                color: '#555', margin: 0,
              }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cross-links ────────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <Link href="/minimal/collections" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Collections
          </Link>
          <Link href="/minimal/craftsmanship" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Craftsmanship
          </Link>
          <Link href="/minimal/bespoke" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Bespoke
          </Link>
          <Link href="/minimal/contact" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Contact
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-appt-info { grid-template-columns: 1fr !important; }
          .vm-appt-types { grid-template-columns: 1fr !important; }
          .vm-appt-datetime { grid-template-columns: 1fr !important; }
          .vm-appt-fields { grid-template-columns: 1fr !important; }
          .vm-appt-fullname, .vm-appt-notes { grid-column: span 1 !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
