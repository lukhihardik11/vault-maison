'use client'

import { useEffect, useState } from 'react'
import { X, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { type ConceptConfig } from '@/data/concepts'

interface ToastNotificationsProps {
  concept: ConceptConfig
}

export function ToastNotifications({ concept }: ToastNotificationsProps) {
  const { toasts, removeToast } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-5 py-4 shadow-2xl animate-slide-up"
          style={{
            backgroundColor: concept.palette.surface,
            color: concept.palette.text,
            border: `1px solid ${concept.palette.muted}`,
            minWidth: '300px',
            maxWidth: '420px',
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: concept.palette.accent }}
          >
            <Check size={12} style={{ color: concept.palette.bg }} />
          </div>
          <p className="text-xs tracking-wide flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-40 hover:opacity-100 transition-opacity flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
