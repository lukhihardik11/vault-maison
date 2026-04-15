'use client'
import React from 'react'
import { MK } from '../MarketplaceLayout'
import { MarketplaceButton } from './MarketplaceButton'
import { Gavel, Clock, TrendingUp } from 'lucide-react'

interface BidPanelProps {
  currentBid: number; estimateLow: number; estimateHigh: number; bids: number; timeLeft?: string
}

export function BidPanel({ currentBid, estimateLow, estimateHigh, bids, timeLeft }: BidPanelProps) {
  return (
    <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: MK.textSecondary }}>Current Bid</span>
        {timeLeft && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: MK.urgent }}>
            <Clock size={12} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 600 }}>{timeLeft}</span>
          </div>
        )}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.accent, marginBottom: 8 }}>${currentBid.toLocaleString()}</div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TrendingUp size={12} color={MK.textSecondary} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MK.textSecondary }}>{bids} bids</span>
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MK.textSecondary }}>Est. ${estimateLow.toLocaleString()} – ${estimateHigh.toLocaleString()}</span>
      </div>
      <MarketplaceButton fullWidth size="lg">
        <Gavel size={14} /> Place Bid
      </MarketplaceButton>
      <MarketplaceButton variant="secondary" fullWidth style={{ marginTop: 8 }}>
        Buy Now — ${(currentBid * 1.3).toLocaleString()}
      </MarketplaceButton>
    </div>
  )
}
