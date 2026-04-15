'use client'

import React from 'react'
import { G } from '../GalleryLayout'

export function SectionDivider() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
      <div style={{ height: 1, background: G.border }} />
    </div>
  )
}
