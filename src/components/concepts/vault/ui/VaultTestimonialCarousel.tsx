'use client'

import React, { useState, useEffect, useId } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  name: string
  title: string
  text: string
  rating?: number
}

interface VaultTestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlayInterval?: number
}

export function VaultTestimonialCarousel({
  testimonials,
  autoPlayInterval = 5000,
}: VaultTestimonialCarouselProps) {
  const uid = useId().replace(/:/g, '')
  const [active, setActive] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setActive((p) => (p + 1) % testimonials.length)
        setFade(true)
      }, 300)
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [testimonials.length, autoPlayInterval])

  const goTo = (i: number) => {
    setFade(false)
    setTimeout(() => {
      setActive(i)
      setFade(true)
    }, 300)
  }

  const t = testimonials[active]

  return (
    <>
      <style>{`
        .vtc-${uid} {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          padding: 40px 20px;
        }
        .vtc-${uid} .vtc-content {
          opacity: ${fade ? 1 : 0};
          transform: translateY(${fade ? 0 : 10}px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .vtc-${uid} .vtc-quote {
          color: #D4AF37;
          margin-bottom: 20px;
          opacity: 0.4;
        }
        .vtc-${uid} .vtc-text {
          font-family: 'Lora', 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-style: italic;
          color: rgba(255,255,255,0.85);
          line-height: 1.8;
          margin: 0 0 24px;
        }
        .vtc-${uid} .vtc-name {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #D4AF37;
          margin: 0 0 4px;
        }
        .vtc-${uid} .vtc-title {
          font-family: Inter, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }
        .vtc-${uid} .vtc-stars {
          color: #D4AF37;
          font-size: 0.9rem;
          letter-spacing: 4px;
          margin-bottom: 8px;
        }
        .vtc-${uid} .vtc-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }
        .vtc-${uid} .vtc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid rgba(212,175,55,0.3);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .vtc-${uid} .vtc-dot.active {
          background: #D4AF37;
          border-color: #D4AF37;
          box-shadow: 0 0 8px rgba(212,175,55,0.4);
        }
        .vtc-${uid} .vtc-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: 1px solid rgba(212,175,55,0.2);
          color: rgba(212,175,55,0.6);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .vtc-${uid} .vtc-nav:hover {
          border-color: #D4AF37;
          color: #D4AF37;
          box-shadow: 0 0 12px rgba(212,175,55,0.2);
        }
      `}</style>
      <div className={`vtc-${uid}`}>
        <button
          className="vtc-nav"
          style={{ left: -20 }}
          onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          className="vtc-nav"
          style={{ right: -20 }}
          onClick={() => goTo((active + 1) % testimonials.length)}
        >
          <ChevronRight size={16} />
        </button>

        <div className="vtc-content">
          <div className="vtc-quote"><Quote size={32} /></div>
          {t.rating && (
            <div className="vtc-stars">
              {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
            </div>
          )}
          <p className="vtc-text">&ldquo;{t.text}&rdquo;</p>
          <p className="vtc-name">{t.name}</p>
          <p className="vtc-title">{t.title}</p>
        </div>

        <div className="vtc-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`vtc-dot ${i === active ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
