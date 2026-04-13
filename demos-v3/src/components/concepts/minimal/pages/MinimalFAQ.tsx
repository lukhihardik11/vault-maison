'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'
import { SmoothTab, SlideTextButton } from '../ui'
import type { SmoothTabItem } from '../ui/SmoothTab'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface FAQ {
  q: string
  a: string
}

const faqsByCategory: Record<string, FAQ[]> = {
  'Diamonds & Quality': [
    { q: 'Are your diamonds certified?', a: 'Every diamond above 0.30ct comes with a GIA or IGI certificate. Certification documents are included with your purchase and available digitally through your account.' },
    { q: 'What is the 4Cs grading system?', a: 'The 4Cs — Carat, Cut, Color, and Clarity — are the universal standard for evaluating diamond quality established by GIA. Our gemologists hand-select stones that excel across all four criteria.' },
    { q: 'Do you offer lab-grown diamonds?', a: 'Our collection focuses exclusively on natural diamonds. Each stone is ethically sourced through established, transparent supply chains with full provenance documentation.' },
  ],
  'Orders & Payment': [
    { q: 'Do you offer financing?', a: 'Yes. We offer 12-month interest-free financing on purchases over $5,000. Extended payment plans up to 36 months are available for select pieces.' },
    { q: 'What is your return policy?', a: 'We offer a 30-day return window for all standard purchases. Items must be in original condition with all documentation. Bespoke pieces are non-returnable.' },
    { q: 'Can I modify my order after placing it?', a: 'Orders can be modified within 2 hours of placement. After that, contact our team directly — we will accommodate changes whenever possible.' },
  ],
  'Shipping & Delivery': [
    { q: 'How long does shipping take?', a: 'Standard shipping: 5–7 business days. Express: 2–3 business days. All orders are fully insured and require signature upon delivery.' },
    { q: 'Do you ship internationally?', a: 'We ship to over 40 countries. International orders include full insurance and customs documentation. Duties and taxes are calculated at checkout.' },
    { q: 'Is my shipment insured?', a: 'Every shipment is fully insured from our vault to your door. We use discreet, unmarked packaging with tamper-evident seals for security.' },
  ],
  'Services': [
    { q: 'Can I schedule a private appointment?', a: 'Yes. Private viewings are available Monday through Saturday. Contact us to arrange a one-on-one consultation with a gemologist.' },
    { q: 'How should I care for my jewelry?', a: 'Store pieces individually in soft pouches. Clean with warm water and mild soap. Avoid exposure to chemicals and extreme temperatures. Professional cleaning is recommended annually.' },
    { q: 'Can I customize an existing design?', a: 'Yes. Most pieces can be modified — metal type, stone size, engraving. Contact our bespoke team to discuss modifications.' },
  ],
}

function AccordionItem({ faq, index, isOpen, onToggle }: { faq: FAQ; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #E5E5E5' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 0',
          border: 'none',
          backgroundColor: 'transparent',
          color: '#050505',
          fontSize: '13px',
          fontWeight: 400,
          fontFamily: font,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            fontSize: '18px',
            fontWeight: 200,
            opacity: 0.3,
            marginLeft: '16px',
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#050505',
              opacity: 0.6,
              paddingBottom: '20px',
              maxWidth: '500px',
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          faq={faq}
          index={i}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  )
}

export function MinimalFAQ() {
  const tabItems: SmoothTabItem[] = Object.entries(faqsByCategory).map(([category, faqs]) => ({
    id: category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: category,
    content: <FAQAccordion faqs={faqs} />,
  }))

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
            Support
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            Everything you need to know about our diamonds, ordering process, and services.
          </p>
        </motion.div>
      </section>

      {/* FAQ Tabs */}
      <section style={{ padding: '60px 5vw 80px', maxWidth: '700px' }}>
        <SmoothTab items={tabItems} />
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5vw 120px', borderTop: '1px solid #E5E5E5', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <h2 style={{
            fontFamily: font,
            fontSize: '20px',
            fontWeight: 200,
            color: '#050505',
            marginBottom: '12px',
          }}>
            Still have questions?
          </h2>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            lineHeight: 1.8,
            marginBottom: '32px',
          }}>
            Our team is available for personal consultations. We are happy to help with any inquiry.
          </p>
          <SlideTextButton
            text="Contact Us"
            hoverText="Get in Touch"
            href="/minimal/contact"
          />
        </motion.div>
      </section>
    </MinimalLayout>
  )
}
