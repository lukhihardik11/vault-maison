'use client'

import React, { useEffect, useRef, useState, useId } from 'react'
import { Award, Star, Crown, Gem } from 'lucide-react'

interface SalonLoyaltyProgressProps {
  currentPoints: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  name: string
}

const tiers = [
  { key: 'bronze', label: 'Bronze', points: 0, icon: Award, color: '#CD7F32' },
  { key: 'silver', label: 'Silver', points: 500, icon: Star, color: '#A8A8A8' },
  { key: 'gold', label: 'Gold', points: 1500, icon: Crown, color: '#D4A54A' },
  { key: 'platinum', label: 'Platinum', points: 5000, icon: Gem, color: '#8B6914' },
]

export function SalonLoyaltyProgress({ currentPoints, tier, name }: SalonLoyaltyProgressProps) {
  const uid = useId().replace(/:/g, '')
  const [animatedWidth, setAnimatedWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const currentTierIdx = tiers.findIndex((t) => t.key === tier)
  const nextTier = tiers[currentTierIdx + 1]
  const currentTierData = tiers[currentTierIdx]
  const progressPercent = nextTier
    ? ((currentPoints - currentTierData.points) / (nextTier.points - currentTierData.points)) * 100
    : 100

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimatedWidth(Math.min(progressPercent, 100)), 200)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [progressPercent])

  return (
    <>
      <style>{`
        .slp-${uid} {
          background: white;
          border: 1px solid #E8E0D4;
          border-radius: 16px;
          padding: 28px;
          font-family: Inter, sans-serif;
        }
        .slp-${uid} .slp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .slp-${uid} .slp-greeting {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: #2D2A26;
        }
        .slp-${uid} .slp-points {
          font-size: 0.7rem;
          font-weight: 600;
          color: #8B6914;
          background: #FDF6E9;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .slp-${uid} .slp-bar-bg {
          width: 100%;
          height: 8px;
          background: #F5F2ED;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .slp-${uid} .slp-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, ${currentTierData.color}, ${nextTier?.color || currentTierData.color});
          width: ${animatedWidth}%;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slp-${uid} .slp-tiers {
          display: flex;
          justify-content: space-between;
          position: relative;
        }
        .slp-${uid} .slp-tier {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .slp-${uid} .slp-tier-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #E8E0D4;
          background: white;
          transition: all 0.3s;
        }
        .slp-${uid} .slp-tier-icon.active {
          border-color: ${currentTierData.color};
          background: #FDF6E9;
        }
        .slp-${uid} .slp-tier-icon.completed {
          border-color: ${currentTierData.color};
          background: ${currentTierData.color};
          color: white;
        }
        .slp-${uid} .slp-tier-label {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #B8B0A4;
        }
        .slp-${uid} .slp-tier-label.active {
          color: #8B6914;
          font-weight: 600;
        }
        .slp-${uid} .slp-next {
          font-size: 0.72rem;
          color: #6B6560;
          text-align: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #E8E0D4;
        }
        .slp-${uid} .slp-next strong {
          color: #8B6914;
        }
      `}</style>
      <div ref={ref} className={`slp-${uid}`}>
        <div className="slp-header">
          <span className="slp-greeting">Welcome back, {name}</span>
          <span className="slp-points">{currentPoints.toLocaleString()} pts</span>
        </div>
        <div className="slp-bar-bg">
          <div className="slp-bar-fill" />
        </div>
        <div className="slp-tiers">
          {tiers.map((t, i) => {
            const Icon = t.icon
            const isCompleted = i < currentTierIdx
            const isActive = i === currentTierIdx
            return (
              <div key={t.key} className="slp-tier">
                <div className={`slp-tier-icon ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  <Icon size={14} color={isCompleted ? 'white' : t.color} />
                </div>
                <span className={`slp-tier-label ${isActive ? 'active' : ''}`}>{t.label}</span>
              </div>
            )
          })}
        </div>
        {nextTier && (
          <div className="slp-next">
            <strong>{(nextTier.points - currentPoints).toLocaleString()}</strong> points to {nextTier.label}
          </div>
        )}
      </div>
    </>
  )
}
