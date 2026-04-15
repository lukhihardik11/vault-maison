'use client'
import React, { useState } from 'react'
import { TH, TheaterSection, RevealSection, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton } from '../ui'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'What makes The Immersive Theater different?', a: 'We approach jewelry as a theatrical experience. From our dramatic showroom design to our storytelling approach to each piece, we believe luxury should be felt, not just seen. Every interaction is choreographed to create lasting emotional impact.' },
  { q: 'How do I book a private showing?', a: 'Contact our concierge team via phone, email, or the contact form. Private showings are available by appointment and include a curated presentation of pieces matched to your preferences, accompanied by champagne service.' },
  { q: 'What certifications do your diamonds carry?', a: 'All diamonds above 0.3 carats come with GIA or AGS certification. We also provide our own Theater Authentication Report with detailed provenance and quality assessment.' },
  { q: 'How does the bespoke process work?', a: 'Our bespoke journey unfolds in five acts: consultation, stone selection, design development with 3D rendering, artisan creation (8-12 weeks), and a private unveiling ceremony. Commissions start at $5,000.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return window for all standard purchases. Bespoke commissions are non-refundable after the design approval stage. All returns include complimentary insured shipping.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship worldwide via insured, temperature-controlled courier. All shipments include real-time tracking, signature requirement, and full insurance coverage.' },
  { q: 'How should I care for my jewelry?', a: 'Each piece comes with a detailed care guide. We recommend professional cleaning every 6 months and offer complimentary lifetime cleaning and inspection for all Theater purchases.' },
]

export function TheaterFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <ActLabel label="Program Notes" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>Frequently Asked Questions</h1>
        </div>
      </section>

      <TheaterSection>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 50}>
              <div style={{ borderBottom: `1px solid ${TH.border}` }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, color: openIndex === i ? TH.gold : TH.text }}>{faq.q}</span>
                  <ChevronDown size={16} color={TH.gold} style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
                </button>
                {openIndex === i && (
                  <div style={{ paddingBottom: 20 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </TheaterSection>

      <TheaterSection alt style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: TH.text, margin: '0 0 12px' }}>Still Have Questions?</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, marginBottom: 24 }}>Our concierge team is available to assist you.</p>
        <TheaterButton href="/theater/contact">Contact Concierge</TheaterButton>
      </TheaterSection>
    </>
  )
}
