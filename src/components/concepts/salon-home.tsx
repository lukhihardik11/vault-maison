'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SalonLayout, S } from './salon/SalonLayout'
import { SalonCard } from './salon/ui/SalonCard'
import { SalonRevealCard } from './salon/ui/SalonRevealCard'
import { AdvisorCard } from './salon/ui/AdvisorCard'
import { SalonButton } from './salon/ui/SalonButton'
import { SalonToast } from './salon/ui/SalonToast'
import { SalonTestimonialWall } from './salon/ui/SalonTestimonialWall'
import { SalonPulseIndicator } from './salon/ui/SalonPulseIndicator'
import { getBestsellers } from '@/data/products'
import { Video, Home, PenTool, Gift, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const advisors = [
  { name: 'Sophie Laurent', specialty: 'Engagement & Bridal', experience: '12 years in fine jewelry', initials: 'SL', avatar: '/images/atelier/female-jeweler.jpg' },
  { name: 'James Chen', specialty: 'Investment Diamonds', experience: '15 years as certified gemologist', initials: 'JC', avatar: '/images/atelier/artisan-portrait-1.jpg' },
  { name: 'Aria Patel', specialty: 'Bespoke & Custom Design', experience: '10 years in luxury design', initials: 'AP', avatar: '/images/atelier/artisan-portrait-2.jpg' },
]

const services = [
  { icon: <Video size={24} />, title: 'Virtual Appointment', desc: 'Connect face-to-face with a gemologist from the comfort of your home. We\'ll guide you through our collection via video call.' },
  { icon: <Home size={24} />, title: 'Home Try-On', desc: 'Select up to 5 pieces delivered to your door. Try them in your own light, at your own pace, with no obligation.' },
  { icon: <PenTool size={24} />, title: 'Custom Design', desc: 'From initial sketch to final setting, we\'ll bring your vision to life. A truly one-of-a-kind creation.' },
  { icon: <Gift size={24} />, title: 'Gift Concierge', desc: 'Tell us about the recipient and occasion. We handle everything — selection, wrapping, and delivery.' },
]

const testimonials = [
  { quote: 'Sophie helped us find the perfect engagement ring. The process felt like having a friend in the jewelry world.', name: 'Sarah M.', occasion: 'Engagement Ring' },
  { quote: 'The home try-on service was incredible. I could see how each piece looked in natural light before deciding.', name: 'David R.', occasion: 'Anniversary Gift' },
  { quote: 'James guided me through the investment diamond process with such patience and expertise. I felt completely confident.', name: 'Elena K.', occasion: 'Investment Diamond' },
]

const advisorNotes = [
  'Sophie loves this for evening wear',
  'James recommends for a milestone gift',
  'Aria\'s pick for everyday elegance',
  'Sophie says: a timeless classic',
]

export function SalonHome() {
  const featured = getBestsellers().slice(0, 4)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <SalonLayout>
      {/* ═══ SECTION 1: WARM WELCOME ═══ */}
      <section style={{
        minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 32px 80px', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${S.bg} 0%, #FAF0E6 50%, ${S.bg} 100%)`,
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23B8860B\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 24px' }}>
            Welcome to The Salon
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, color: S.text, margin: '0 0 24px', lineHeight: 1.2 }}>
            Your Personal<br />Jewelry Experience
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '1rem', color: S.textSecondary, lineHeight: 1.8, maxWidth: 500, margin: '0 auto 40px' }}>
            Since 2025, we&apos;ve helped thousands find their perfect piece. Let us help you too.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <SalonButton href="/salon/collections">Explore Collection</SalonButton>
            <SalonButton variant="secondary" href="/salon/contact">Talk to an Advisor</SalonButton>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: MEET YOUR ADVISORS ═══ */}
      <section style={{ padding: '100px 32px', background: S.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>
              Your Personal Team
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>
              Meet Your Advisors
            </h2>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              Each of our advisors brings years of expertise and a genuine passion for helping you find something extraordinary.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {advisors.map((advisor) => (
              <AdvisorCard key={advisor.name} {...advisor} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: HANDPICKED FOR YOU ═══ */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>
              Curated with Care
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: S.text, margin: 0 }}>
              Our Advisors&apos; Picks This Week
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {featured.map((product, i) => (
              <div key={product.id} style={{ transform: i % 2 === 1 ? 'translateY(24px)' : 'none' }}>
                <SalonRevealCard
                  name={product.name}
                  slug={product.slug}
                  price={product.priceDisplay}
                  image={product.images[0]}
                  category={product.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  advisorNote={advisorNotes[i]}
                  isNew={i === 0}
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <SalonButton variant="secondary" href="/salon/collections">View Full Collection</SalonButton>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: THE SALON EXPERIENCE ═══ */}
      <section style={{ padding: '100px 32px', background: S.warmPanel }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>
              At Your Service
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: S.text, margin: 0 }}>
              The Salon Experience
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {services.map((service) => (
              <div key={service.title}
                className="salon-service-card"
                style={{
                  background: S.surface, borderRadius: S.radiusLg,
                  padding: '32px 24px', border: `1px solid ${S.border}`,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                <div style={{
                  width: 52, height: 52, borderRadius: S.radius,
                  background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: S.accent, marginBottom: 20,
                }}>
                  {service.icon}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: S.text, margin: '0 0 10px' }}>
                  {service.title}
                </h3>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '0.82rem', color: S.textSecondary, lineHeight: 1.7, margin: '0 0 16px' }}>
                  {service.desc}
                </p>
                <Link href="/salon/bespoke" className="salon-nav-link"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: S.accent, textDecoration: 'none', fontWeight: 500 }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: CLIENT STORIES ═══ */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>
            Client Stories
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: S.text, margin: '0 0 48px' }}>
            What Our Clients Say
          </h2>
          <div style={{ position: 'relative' }}>
            <Quote size={32} color={S.accent} style={{ opacity: 0.2, marginBottom: 16 }} />
            <blockquote style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontStyle: 'italic', color: S.text, lineHeight: 1.8, margin: '0 0 24px', minHeight: 80 }}>
              &ldquo;{testimonials[testimonialIdx].quote}&rdquo;
            </blockquote>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, color: S.text, margin: '0 0 4px' }}>
              — {testimonials[testimonialIdx].name}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.accent }}>
              {testimonials[testimonialIdx].occasion}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
              <button onClick={() => setTestimonialIdx(Math.max(0, testimonialIdx - 1))}
                style={{ background: 'none', border: `1px solid ${S.border}`, borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.textSecondary, transition: 'all 0.3s' }}>
                <ChevronLeft size={16} />
              </button>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', background: i === testimonialIdx ? S.accent : S.border, transition: 'all 0.3s' }} />
              ))}
              <button onClick={() => setTestimonialIdx(Math.min(testimonials.length - 1, testimonialIdx + 1))}
                style={{ background: 'none', border: `1px solid ${S.border}`, borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.textSecondary, transition: 'all 0.3s' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL WALL ═══ */}
      <section style={{ padding: '80px 32px', background: S.bg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: S.accent, marginBottom: 12 }}>What Our Clients Say</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 400, color: S.text, margin: '0 0 40px' }}>
            Stories from Our Salon
          </h2>
          <SalonTestimonialWall
            testimonials={[
              { name: 'Emma Richardson', title: 'Bride-to-be', text: 'Sophie helped me find the perfect engagement ring. Her patience and expertise made the experience truly special.', rating: 5, advisor: 'Sophie Laurent' },
              { name: 'Michael Torres', title: 'Anniversary Gift', text: 'James guided me through the diamond selection with incredible knowledge. My wife was absolutely thrilled.', rating: 5, advisor: 'James Chen' },
              { name: 'Priya Sharma', title: 'Custom Design', text: 'Aria brought my grandmother\'s brooch back to life as a modern pendant. The craftsmanship is breathtaking.', rating: 5, advisor: 'Aria Patel' },
              { name: 'David Kim', title: 'Investment Collector', text: 'The team\'s knowledge of rare stones is unmatched. Every purchase has been a wise investment and a joy to own.', rating: 5 },
              { name: 'Sarah Mitchell', title: 'Repeat Client', text: 'I\'ve been coming here for 5 years. They remember my preferences and always surprise me with perfect suggestions.', rating: 5, advisor: 'Sophie Laurent' },
              { name: 'Robert Chen', title: 'Wedding Bands', text: 'The matching wedding bands they designed for us are absolutely perfect. Every detail was considered.', rating: 5, advisor: 'Aria Patel' },
            ]}
          />
        </div>
      </section>

      {/* ═══ SECTION 6: NEWSLETTER ═══ */}
      <section style={{ padding: '80px 32px', background: S.warmPanel }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>
            Stay in Touch
          </h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, lineHeight: 1.7, marginBottom: 28 }}>
            Receive personal recommendations, new arrival previews, and exclusive invitations from your advisor.
          </p>
          <div style={{ display: 'flex', gap: 0 }}>
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1, padding: '14px 18px', fontFamily: "'Lora', serif", fontSize: '0.85rem',
                color: S.text, background: S.surface, border: `1.5px solid ${S.border}`,
                borderRight: 'none', borderRadius: `${S.radius} 0 0 ${S.radius}`, outline: 'none',
                transition: 'border-color 0.3s',
              }} />
            <button style={{
              padding: '14px 24px', fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: S.accent, color: '#fff', border: 'none',
              borderRadius: `0 ${S.radius} ${S.radius} 0`, cursor: 'pointer',
              transition: 'background 0.3s',
            }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = S.accentHover }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = S.accent }}>
              Join Our Circle
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Toast Notifications */}
      <SalonToast
        messages={[
          { icon: 'bag', text: 'A client in London just acquired the Celestial Diamond Ring' },
          { icon: 'heart', text: 'The Aurora Cocktail Ring was added to 12 wishlists today' },
          { icon: 'chat', text: 'Sophie is currently helping a client find their perfect piece' },
          { icon: 'bag', text: 'A bespoke commission was just completed in our atelier' },
          { icon: 'heart', text: 'The Eternal Solitaire is trending this week' },
        ]}
        interval={15000}
        initialDelay={8000}
      />

      <style>{`
        .salon-service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px ${S.shadow};
          border-color: ${S.accent}20;
        }
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SalonLayout>
  )
}
