'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { ChevronDown, Search, MessageSquare } from 'lucide-react'

const font = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'Space Mono', 'SF Mono', monospace"

const categories = ['Ordering', 'Shipping', 'Returns', 'Diamonds', 'Care', 'Bespoke']

const faqs: Record<string, { q: string; a: string }[]> = {
  Ordering: [
    { q: 'How do I place an order?', a: 'Browse our collections, select your piece, choose your preferred metal and size, then proceed to checkout. We accept all major credit cards and offer secure payment processing.' },
    { q: 'Can I modify my order after placing it?', a: 'Orders can be modified within 2 hours of placement. Contact our concierge team at concierge@vaultmaison.com or call +1 (212) 555-0187.' },
    { q: 'Do you offer gift wrapping?', a: 'Every order arrives in our signature presentation box with a hand-tied ribbon. Complimentary gift messaging is available at checkout.' },
    { q: 'Is my payment information secure?', a: 'Absolutely. We use 256-bit SSL encryption and never store your full card details. All transactions are PCI-DSS compliant.' },
  ],
  Shipping: [
    { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express (2-3 days) and White Glove next-day delivery are also available. All orders are fully insured.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship to over 40 countries. International orders typically arrive within 7-14 business days. Import duties may apply depending on your location.' },
    { q: 'Is shipping free?', a: 'Complimentary insured shipping is included on all orders. Express and White Glove options are available at additional cost.' },
  ],
  Returns: [
    { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy for unworn items in their original condition and packaging. Bespoke and engraved pieces are final sale.' },
    { q: 'How do I initiate a return?', a: 'Contact our team to receive a prepaid, insured return label. Once we receive and inspect your item, a full refund will be processed within 5 business days.' },
    { q: 'Can I exchange my piece?', a: 'Yes, exchanges are welcome within 30 days. If the new piece is a different price, we will adjust accordingly.' },
  ],
  Diamonds: [
    { q: 'Are your diamonds GIA certified?', a: 'Yes, every diamond 0.30ct and above comes with an independent GIA certification verifying the 4Cs (carat, cut, color, clarity).' },
    { q: 'Do you offer lab-grown diamonds?', a: 'We offer both natural and lab-grown diamonds. Lab-grown stones are chemically identical to natural diamonds and offer excellent value.' },
    { q: 'How do I read a GIA certificate?', a: 'Visit our Diamond Grading Guide for a comprehensive breakdown of GIA certificates, the 4Cs, and how to evaluate diamond quality.' },
  ],
  Care: [
    { q: 'How should I care for my jewelry?', a: 'Store pieces individually in their boxes. Clean gently with a soft cloth. Avoid contact with chemicals, perfumes, and chlorine. Professional cleaning is recommended every 6 months.' },
    { q: 'Do you offer cleaning services?', a: 'Yes, complimentary lifetime cleaning and inspection is included with every purchase. Simply visit our atelier or ship your piece to us.' },
    { q: 'Can you resize my ring?', a: 'Most rings can be resized up to 2 sizes. The first resize within 12 months of purchase is complimentary.' },
  ],
  Bespoke: [
    { q: 'What is the bespoke process?', a: 'It begins with a consultation where we discuss your vision. Our designers create sketches and 3D renders for approval. Once confirmed, our artisans craft your piece over 4-8 weeks.' },
    { q: 'How much does a bespoke piece cost?', a: 'Pricing depends on materials, complexity, and stone selection. Most bespoke pieces start from $3,000. We provide a detailed quote after your initial consultation.' },
    { q: 'Can I use my own stone?', a: 'Absolutely. We welcome heirloom stones and can design a setting that showcases your gem beautifully. We will inspect and clean the stone before setting.' },
  ],
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #E5E5E5' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontFamily: font, fontSize: '15px', fontWeight: 400, color: '#050505', flex: 1, paddingRight: '16px' }}>{q}</span>
        <ChevronDown size={16} style={{ color: '#050505', transition: 'transform 300ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ paddingBottom: '20px' }}>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#9B9B9B' }}>{a}</p>
        </div>
      )}
    </div>
  )
}

export function MinimalFAQ() {
  const [activeTab, setActiveTab] = useState('Ordering')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = searchQuery
    ? Object.values(faqs).flat().filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs[activeTab] || []

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '11px', }}><span className="brutalist-section-num">01 — Support</span></p>
        <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px' }}>Frequently Asked Questions</h1>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#9B9B9B', marginBottom: '32px' }}>
          Find answers to common questions about our products, services, and policies.
        </p>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
          <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9B9B9B' }} />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '14px 16px 14px 44px', border: '1px solid #E5E5E5', fontSize: '13px', fontWeight: 400, fontFamily: font, color: '#050505', backgroundColor: '#FFFFFF', outline: 'none' }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#050505'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
          />
        </div>
      </section>

      <section style={{ padding: '48px 5vw 100px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Tabs */}
        {!searchQuery && (
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #E5E5E5', marginBottom: '32px', overflowX: 'auto' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)} style={{ fontFamily: font, fontSize: '12px', fontWeight: activeTab === cat ? 500 : 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: activeTab === cat ? '#050505' : '#9B9B9B', padding: '12px 20px', border: 'none', borderBottom: activeTab === cat ? '2px solid #050505' : '2px solid transparent', backgroundColor: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 300ms ease' }}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {searchQuery && (
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#9B9B9B', marginBottom: '24px' }}>
            {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {/* FAQ Items */}
        <div>
          {filteredFaqs.map((f, i) => (
            <AccordionItem key={i} q={f.q} a={f.a} />
          ))}
        </div>

        {/* Still need help */}
        <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#FAFAFA', textAlign: 'center' }}>
          <MessageSquare size={28} strokeWidth={1} style={{ color: '#050505', marginBottom: '12px' }} />
          <h3 style={{ fontFamily: font, fontSize: '18px', fontWeight: 400, color: '#050505', marginBottom: '8px' }}>Still Have Questions?</h3>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#9B9B9B', marginBottom: '20px' }}>
            Our concierge team is available Monday through Saturday, 10am to 7pm EST.
          </p>
          <Link href="/minimal/contact" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#050505', color: '#FFFFFF', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Contact Us
          </Link>
        </div>
      </section>
    </MinimalLayout>
  )
}
