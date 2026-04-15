'use client'

import React, { useEffect, useRef, useState, useId } from 'react'
import { Quote, Star } from 'lucide-react'

interface Testimonial {
  name: string
  title: string
  text: string
  rating: number
  advisor?: string
}

interface SalonTestimonialWallProps {
  testimonials: Testimonial[]
}

export function SalonTestimonialWall({ testimonials }: SalonTestimonialWallProps) {
  const uid = useId().replace(/:/g, '')
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, idx]))
          }
        })
      },
      { threshold: 0.2 }
    )
    itemRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [testimonials.length])

  return (
    <>
      <style>{`
        .stw-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .stw-${uid} .stw-card {
          background: white;
          border: 1px solid #E8E0D4;
          border-radius: 14px;
          padding: 24px;
          opacity: 0;
          transform: translateY(24px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stw-${uid} .stw-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stw-${uid} .stw-card:hover {
          box-shadow: 0 8px 24px rgba(139,105,20,0.08);
          border-color: rgba(139,105,20,0.2);
        }
        .stw-${uid} .stw-quote {
          color: #D4A54A;
          opacity: 0.4;
          margin-bottom: 12px;
        }
        .stw-${uid} .stw-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 12px;
        }
        .stw-${uid} .stw-text {
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          font-style: italic;
          color: #4A4540;
          line-height: 1.7;
          margin: 0 0 16px;
        }
        .stw-${uid} .stw-divider {
          width: 40px;
          height: 1px;
          background: #E8E0D4;
          margin-bottom: 12px;
        }
        .stw-${uid} .stw-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2D2A26;
          margin: 0 0 2px;
        }
        .stw-${uid} .stw-title {
          font-family: Inter, sans-serif;
          font-size: 0.65rem;
          color: #B8B0A4;
          letter-spacing: 0.04em;
          margin: 0;
        }
        .stw-${uid} .stw-advisor {
          font-family: Inter, sans-serif;
          font-size: 0.65rem;
          color: #8B6914;
          margin-top: 6px;
        }
      `}</style>
      <div className={`stw-${uid}`}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el }}
            data-index={i}
            className={`stw-card ${visibleItems.has(i) ? 'visible' : ''}`}
            style={{ transitionDelay: `${(i % 3) * 0.12}s` }}
          >
            <div className="stw-quote"><Quote size={20} /></div>
            <div className="stw-stars">
              {Array.from({ length: 5 }, (_, j) => (
                <Star key={j} size={14} fill={j < t.rating ? '#D4A54A' : 'none'} color={j < t.rating ? '#D4A54A' : '#D4CFC8'} />
              ))}
            </div>
            <p className="stw-text">&ldquo;{t.text}&rdquo;</p>
            <div className="stw-divider" />
            <p className="stw-name">{t.name}</p>
            <p className="stw-title">{t.title}</p>
            {t.advisor && <div className="stw-advisor">Assisted by {t.advisor}</div>}
          </div>
        ))}
      </div>
    </>
  )
}
