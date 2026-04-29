'use client'

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Clock, Mail, MapPin, MessageSquare, Phone, Send, type LucideIcon } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import { FocusInput } from '../ui/FocusInput'
import { PressButton } from '../ui/PressButton'
import { useToast } from '../ui/Toast'

const font = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'Space Mono', 'SF Mono', monospace"

type ContactDetail = {
  icon: LucideIcon
  label: string
  value: string
}

const contactDetails: ContactDetail[] = [
  { icon: MapPin, label: 'Address', value: '127 Prince Street, SoHo\nNew York, NY 10012' },
  { icon: Phone, label: 'Phone', value: '+1 (212) 555-0187' },
  { icon: Mail, label: 'Email', value: 'concierge@vaultmaison.com' },
  { icon: Clock, label: 'Hours', value: 'Mon-Sat: 10am - 7pm\nSunday: By Appointment' },
]

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #E5E5E5',
  fontSize: '13px',
  fontWeight: 400,
  fontFamily: font,
  color: '#050505',
  backgroundColor: '#FFFFFF',
  outline: 'none',
}

function useReveal(reducedMotion: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('vm-contact-visible')
          observer.unobserve(element)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  return ref
}

interface RevealProps {
  children: ReactNode
  reducedMotion: boolean
  delay?: number
  style?: CSSProperties
}

function Reveal({ children, reducedMotion, delay = 0, style = {} }: RevealProps) {
  const ref = useReveal(reducedMotion)

  return (
    <div
      ref={ref}
      className={`vm-contact-reveal ${reducedMotion ? 'vm-contact-reduced' : ''}`}
      style={{
        ...style,
        transitionDelay: reducedMotion ? '0ms' : `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function MinimalContact() {
  const [submitted, setSubmitted] = useState(false)
  const reducedMotion = useReducedMotionPreference()
  const { toast } = useToast()

  return (
    <MinimalLayout>
      <section style={{ padding: '80px 5vw 0', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal reducedMotion={reducedMotion}>
          <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '16px' }}>01 — Get in Touch</span>
          <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, lineHeight: 1.8, color: '#6B6B6B', maxWidth: '500px', margin: '0 auto' }}>
            Our advisors are available for product questions, bespoke consultations, and after-purchase support.
          </p>
        </Reveal>
      </section>

      <section style={{ padding: '60px 5vw 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px' }} className="vm-contact-grid">
          <Reveal reducedMotion={reducedMotion}>
            <div>
              <div style={{ marginBottom: '36px' }}>
                <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 400, color: '#050505', marginBottom: '22px' }}>Visit Our Atelier</h2>
                {contactDetails.map((item, index) => (
                  <div key={item.label} className="vm-contact-row" style={{ display: 'flex', gap: '16px', marginBottom: index === contactDetails.length - 1 ? 0 : '10px' }}>
                    <item.icon size={18} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', marginBottom: '4px' }}>
                        {item.label}
                      </p>
                      <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#050505', lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0 }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="vm-contact-consult">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <MessageSquare size={18} strokeWidth={1.5} style={{ color: '#050505' }} />
                  <h3 style={{ fontFamily: font, fontSize: '15px', fontWeight: 500, color: '#050505', margin: 0 }}>Private Consultation</h3>
                </div>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, lineHeight: 1.7, color: '#6B6B6B', marginBottom: '16px' }}>
                  Schedule a one-on-one session with our gemologist for personalized guidance on engagement rings, bespoke pieces, or investment stones.
                </p>
                <Link
                  href="/minimal/bespoke"
                  className="vm-contact-inline-link"
                  style={{
                    fontFamily: font,
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#050505',
                    textDecoration: 'none',
                    borderBottom: '1px solid #050505',
                    paddingBottom: '2px',
                  }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal reducedMotion={reducedMotion} delay={120}>
            <div className="vm-contact-panel">
              {submitted ? (
                <div style={{ padding: '56px 30px', textAlign: 'center', background: '#E5E5E5' }}>
                  <Send size={30} strokeWidth={1.2} style={{ color: '#050505', marginBottom: '16px' }} />
                  <h3 style={{ fontFamily: font, fontSize: '20px', fontWeight: 400, color: '#050505', marginBottom: '8px' }}>Message Sent</h3>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#6B6B6B', lineHeight: 1.7, margin: 0 }}>
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); toast('Message sent successfully', 'success', 3000) }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 400, color: '#050505', marginBottom: '12px' }}>Send a Message</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="vm-contact-name-grid">
                    <FocusInput label="First Name" type="text" required />
                    <FocusInput label="Last Name" type="text" required />
                  </div>
                  <FocusInput label="Email" type="email" required />
                  <FocusInput label="Phone (Optional)" type="tel" />

                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="minimal-contact-subject" style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, color: '#767676', display: 'block', marginBottom: '6px' }}>
                      Subject
                    </label>
                    <select id="minimal-contact-subject" style={{ ...inputStyle, cursor: 'pointer' }} className="vm-contact-input">
                      <option>General Inquiry</option>
                      <option>Product Question</option>
                      <option>Bespoke Request</option>
                      <option>Order Support</option>
                      <option>Press & Media</option>
                    </select>
                  </div>

                  <FocusInput label="Message" multiline required rows={5} />

                  <div style={{ alignSelf: 'flex-start' }}>
                    <PressButton type="submit" variant="primary" size="md">
                      Send Message
                    </PressButton>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .vm-contact-reveal {
          opacity: 0.92;
          transform: translateY(10px);
          transition: opacity 460ms cubic-bezier(0.16, 1, 0.3, 1), transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .vm-contact-reveal.vm-contact-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .vm-contact-reveal.vm-contact-reduced {
          opacity: 1;
          transform: none;
          transition: none;
        }
        .vm-contact-row {
          border-bottom: 1px solid #E5E5E5;
          padding: 12px 0;
          transition: border-color 220ms ease, transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .vm-contact-row:hover {
          border-color: #050505;
          transform: translateX(2px);
        }
        .vm-contact-consult {
          padding: 26px;
          border: 1px solid #E5E5E5;
          background: #FFFFFF;
          transition: border-color 220ms ease, transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .vm-contact-consult:hover {
          border-color: #050505;
          transform: translateY(-2px);
        }
        .vm-contact-inline-link {
          transition: color 220ms ease, border-color 220ms ease;
        }
        .vm-contact-inline-link:hover {
          color: #6B6B6B !important;
          border-color: #6B6B6B !important;
        }
        .vm-contact-panel {
          border: 1px solid #E5E5E5;
          padding: 30px;
          background: #FFFFFF;
          transition: border-color 220ms ease;
        }
        .vm-contact-panel:hover {
          border-color: #767676;
        }
        .vm-contact-input {
          transition: border-color 220ms ease, box-shadow 220ms ease;
        }
        .vm-contact-input:focus-visible {
          border-color: #050505 !important;
          box-shadow: inset 0 0 0 1px #050505;
          outline: none;
        }
        .vm-contact-submit {
          min-height: 44px;
          border: 1px solid #050505;
          background: #050505;
          color: #FFFFFF;
          font-family: ${font};
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0 24px;
          transition: background-color 220ms ease, color 220ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .vm-contact-submit:hover {
          background: #FFFFFF;
          color: #050505;
          transform: translateY(-2px);
        }
        .vm-contact-submit:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }
        @media (max-width: 768px) {
          .vm-contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .vm-contact-name-grid {
            grid-template-columns: 1fr !important;
          }
          .vm-contact-panel {
            padding: 22px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vm-contact-reveal,
          .vm-contact-row,
          .vm-contact-consult,
          .vm-contact-inline-link,
          .vm-contact-panel,
          .vm-contact-input,
          .vm-contact-submit {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
