'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { ConceptLayout, FeaturedProducts, SplitSection, Testimonial, CTABanner, CategoryGrid } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

interface Message {
  role: 'concierge' | 'user'
  text: string
}

const salonTestimonials = [
  { quote: 'The Salon concierge understood exactly what I wanted before I could even articulate it.', name: 'Elena Vasquez', title: 'Client, New York' },
  { quote: 'Within minutes, they presented three options — and one was absolutely perfect for our anniversary.', name: 'David Park', title: 'Client, Seoul' },
  { quote: 'A truly bespoke experience. The concierge made me feel like the only client in the world.', name: 'Sophia Laurent', title: 'Client, Paris' },
  { quote: 'The level of personal attention is unmatched. They remembered every detail from our first conversation.', name: 'Aisha Khan', title: 'Client, Dubai' },
]

function ConciergeChat({ concept }: { concept: ConceptConfig }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const conciergeResponses = [
    "Welcome to the Salon. I'm your personal concierge. How may I assist you today?",
    "I'd be delighted to help. Are you looking for something specific, or shall I guide you through our collection?",
    "Excellent taste. Let me curate a selection that matches your preferences. May I ask about the occasion?",
    "We have several exquisite pieces that would be perfect. Shall I arrange a private viewing?",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{ role: 'concierge', text: conciergeResponses[0] }])
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setTyping(true)
    const responseIdx = Math.min(messages.filter((m) => m.role === 'concierge').length, conciergeResponses.length - 1)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'concierge', text: conciergeResponses[responseIdx] }])
    }, 1500 + Math.random() * 1000)
  }

  return (
    <div
      className="flex flex-col h-[400px] rounded-none"
      style={{ backgroundColor: concept.palette.surface, border: `1px solid ${concept.palette.muted}` }}
    >
      <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${concept.palette.muted}` }}>
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: concept.palette.text, opacity: 0.6 }}>Concierge Online</span>
      </div>
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[80%] px-4 py-3 text-xs font-light leading-relaxed"
                style={{
                  backgroundColor: msg.role === 'user' ? concept.palette.accent : 'transparent',
                  color: msg.role === 'user' ? concept.palette.bg : concept.palette.text,
                  border: msg.role === 'concierge' ? `1px solid ${concept.palette.muted}` : 'none',
                  opacity: msg.role === 'concierge' ? 0.8 : 1,
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <div className="flex gap-1 px-4 py-3">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: concept.palette.accent }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-3" style={{ borderTop: `1px solid ${concept.palette.muted}` }}>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-xs px-3 py-2 focus:outline-none"
            style={{ color: concept.palette.text }}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 text-[9px] uppercase tracking-[0.15em]"
            style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export function SalonHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 4)

  return (
    <ConceptLayout concept={concept}>
      {/* Chat-first hero */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: concept.palette.accent }}>
                The Salon Experience
              </p>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.02em] leading-[1.1] mb-6 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
                Your Personal<br />
                <span style={{ color: concept.palette.accent }}>Concierge</span>
              </h1>
              <p className="text-sm font-light mb-8 leading-relaxed max-w-md" style={{ color: concept.palette.text, opacity: 0.5 }}>
                The Salon reimagines luxury shopping as a conversation. No browsing, no searching —
                simply tell us what you desire and our concierge will curate the perfect selection for you.
              </p>
              <div className="flex gap-4">
                <Link
                  href={buildConceptUrl('salon', 'appointments')}
                  className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                  style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                >
                  Book Appointment
                </Link>
                <Link
                  href={buildConceptUrl('salon', 'collections')}
                  className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.2em] border transition-opacity hover:opacity-80"
                  style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
                >
                  Browse Independently &rarr;
                </Link>
              </div>
            </div>
            <div>
              <ConciergeChat concept={concept} />
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts
        concept={concept}
        products={featured}
        title="Concierge Picks"
        subtitle="Curated by our team for discerning collectors"
      />

      <SplitSection
        concept={concept}
        title="The Art of Service"
        description="Our concierge team consists of certified gemologists and luxury consultants with decades of combined experience. They don't just sell jewelry — they listen, advise, and guide you to the piece that perfectly matches your story, your style, and your budget."
        image="/images/diamond-collection-1.jpg"
        ctaLabel="Meet the Team"
        ctaHref={buildConceptUrl('salon', 'about')}
      />

      <div className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.bg }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-10 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Browse Categories
          </h2>
          <CategoryGrid concept={concept} />
        </div>
      </div>

      {/* Testimonials grid */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: concept.palette.surface }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className={`text-xl font-light tracking-[0.05em] mb-12 ${concept.fonts.headingClass}`} style={{ color: concept.palette.text }}>
            Client Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {salonTestimonials.map((t) => (
              <div key={t.name} className="p-8" style={{ backgroundColor: concept.palette.bg }}>
                <p className="text-sm font-light leading-relaxed mb-6" style={{ color: concept.palette.text, opacity: 0.7 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[11px] font-medium" style={{ color: concept.palette.text }}>{t.name}</p>
                <p className="text-[10px] mt-1" style={{ color: concept.palette.text, opacity: 0.4 }}>{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        concept={concept}
        title="Start a Conversation"
        description="Our concierge is available 24/7 to assist you."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl('salon', 'contact')}
      />
    </ConceptLayout>
  )
}
