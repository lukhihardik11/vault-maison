'use client'
import React from 'react'
import { OB } from '../ObservatoryLayout'
import { Activity, Shield, Eye, Zap } from 'lucide-react'

interface AnalysisPanelProps {
  title: string
  grade?: string
  status?: 'verified' | 'pending' | 'analyzing'
  specs: { label: string; value: string }[]
  style?: React.CSSProperties
}

export function AnalysisPanel({ title, grade, status = 'verified', specs, style = {} }: AnalysisPanelProps) {
  const statusColors = { verified: OB.success, pending: OB.warning, analyzing: OB.accent }
  const statusLabels = { verified: 'Verified', pending: 'Pending', analyzing: 'Analyzing' }
  const statusIcons = { verified: <Shield size={12} />, pending: <Activity size={12} />, analyzing: <Eye size={12} /> }

  return (
    <div style={{
      background: OB.surface, border: `1px solid ${OB.border}`,
      padding: 24, position: 'relative', ...style,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OB.accent, marginBottom: 6 }}>
            ANALYSIS REPORT
          </div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 500, color: OB.text, margin: 0 }}>
            {title}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: `${statusColors[status]}15`, border: `1px solid ${statusColors[status]}30` }}>
          {statusIcons[status]}
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColors[status] }}>
            {statusLabels[status]}
          </span>
        </div>
      </div>

      {/* Grade */}
      {grade && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '12px 16px', background: OB.card, border: `1px solid ${OB.border}` }}>
          <Zap size={16} color={OB.accent} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>GRADE:</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 600, color: OB.accent }}>{grade}</span>
        </div>
      )}

      {/* Specs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {specs.map((spec, i) => (
          <div key={i} style={{ borderLeft: `2px solid ${OB.accent}20`, paddingLeft: 12 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.textSecondary }}>
              {spec.label}
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: OB.text, fontWeight: 500, marginTop: 2 }}>
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
