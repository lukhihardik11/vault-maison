'use client'

import React, { useEffect, useRef, useState, useId } from 'react'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface GalleryTimelineProps {
  events: TimelineEvent[]
}

export function GalleryTimeline({ events }: GalleryTimelineProps) {
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
      { threshold: 0.3 }
    )
    itemRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [events.length])

  return (
    <>
      <style>{`
        .gtl-${uid} {
          position: relative;
          padding: 20px 0;
        }
        .gtl-${uid}::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #8B7355, transparent);
          transform: translateX(-50%);
        }
        .gtl-${uid} .gtl-item {
          position: relative;
          display: flex;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gtl-${uid} .gtl-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .gtl-${uid} .gtl-item:nth-child(odd) {
          flex-direction: row;
          padding-right: 52%;
          text-align: right;
        }
        .gtl-${uid} .gtl-item:nth-child(even) {
          flex-direction: row-reverse;
          padding-left: 52%;
          text-align: left;
        }
        .gtl-${uid} .gtl-dot {
          position: absolute;
          left: 50%;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #FDFBF7;
          border: 2px solid #8B7355;
          transform: translateX(-50%);
          z-index: 2;
          transition: all 0.3s;
        }
        .gtl-${uid} .gtl-item.visible .gtl-dot {
          background: #8B7355;
          box-shadow: 0 0 12px rgba(139,115,85,0.3);
        }
        .gtl-${uid} .gtl-year {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #8B7355;
          margin: 0 0 4px;
        }
        .gtl-${uid} .gtl-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 1rem;
          color: #2C2C2C;
          margin: 0 0 6px;
          line-height: 1.4;
        }
        .gtl-${uid} .gtl-desc {
          font-family: Inter, sans-serif;
          font-size: 0.8rem;
          color: #6B6B6B;
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 768px) {
          .gtl-${uid}::before { left: 20px; }
          .gtl-${uid} .gtl-item,
          .gtl-${uid} .gtl-item:nth-child(odd),
          .gtl-${uid} .gtl-item:nth-child(even) {
            flex-direction: row;
            padding-left: 48px;
            padding-right: 0;
            text-align: left;
          }
          .gtl-${uid} .gtl-dot { left: 20px; }
        }
      `}</style>
      <div className={`gtl-${uid}`}>
        {events.map((event, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el }}
            data-index={i}
            className={`gtl-item ${visibleItems.has(i) ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="gtl-dot" />
            <div>
              <p className="gtl-year">{event.year}</p>
              <p className="gtl-title">{event.title}</p>
              <p className="gtl-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
