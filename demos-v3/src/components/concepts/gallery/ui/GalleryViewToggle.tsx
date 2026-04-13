'use client'

import React from 'react'
import { Grid3X3, List } from 'lucide-react'

interface GalleryViewToggleProps {
  view: 'grid' | 'list'
  onToggle: (view: 'grid' | 'list') => void
}

export function GalleryViewToggle({ view, onToggle }: GalleryViewToggleProps) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      background: '#F8F6F2', borderRadius: 4,
      border: '1px solid #E8E4DE', overflow: 'hidden',
    }}>
      <button
        onClick={() => onToggle('grid')}
        aria-label="Grid view"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 36, border: 'none', cursor: 'pointer',
          background: view === 'grid' ? '#2C2C2C' : 'transparent',
          color: view === 'grid' ? '#FDFBF7' : '#8B7355',
          transition: 'all 0.3s',
        }}
      >
        <Grid3X3 size={15} />
      </button>
      <div style={{ width: 1, height: 20, background: '#E8E4DE' }} />
      <button
        onClick={() => onToggle('list')}
        aria-label="List view"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 36, border: 'none', cursor: 'pointer',
          background: view === 'list' ? '#2C2C2C' : 'transparent',
          color: view === 'list' ? '#FDFBF7' : '#8B7355',
          transition: 'all 0.3s',
        }}
      >
        <List size={15} />
      </button>
    </div>
  )
}
