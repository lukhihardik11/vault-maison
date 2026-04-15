'use client'
import React from 'react'
import { MK } from '../MarketplaceLayout'

interface StatCardProps {
  value: string; label: string; icon?: React.ReactNode; trend?: string
}

export function StatCard({ value, label, icon, trend }: StatCardProps) {
  return (
    <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 20, textAlign: 'center' }}>
      {icon && <div style={{ color: MK.accent, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{icon}</div>}
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: MK.text, marginBottom: 4 }}>{value}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 500, color: MK.textSecondary, marginBottom: trend ? 4 : 0 }}>{label}</div>
      {trend && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 600, color: MK.success }}>{trend}</div>}
    </div>
  )
}
