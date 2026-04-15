'use client'

import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: number
  color?: string
  message?: string
}

export function LoadingSpinner({ size = 24, color, message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2
        size={size}
        className="animate-spin"
        style={{ color: color || '#C4A265' }}
      />
      {message && (
        <p className="text-sm opacity-50 tracking-wide">{message}</p>
      )}
    </div>
  )
}
