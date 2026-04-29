'use client'

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import gsap from 'gsap'

/* ────────────────────────────────────────────────────────────────────
 * Toast — Notification system with GSAP entrance/exit choreography
 *
 * Features:
 * - Slide-in from right + fade entrance
 * - Auto-dismiss with progress bar countdown
 * - Exit: slide-out right + fade
 * - Stacked layout (newest on top)
 * - Variants: success, error, info
 * - prefers-reduced-motion respected
 * ──────────────────────────────────────────────────────────────── */

type ToastVariant = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

/* ── Variant styles ──────────────────────────────────────────── */
const VARIANT_STYLES: Record<
  ToastVariant,
  { bg: string; border: string; icon: string; barColor: string }
> = {
  success: {
    bg: '#050505',
    border: '1px solid #2D2D2D',
    icon: '✓',
    barColor: '#4ADE80',
  },
  error: {
    bg: '#050505',
    border: '1px solid #2D2D2D',
    icon: '✕',
    barColor: '#F87171',
  },
  info: {
    bg: '#050505',
    border: '1px solid #2D2D2D',
    icon: 'i',
    barColor: '#FAFAFA',
  },
}

/* ── Single Toast ────────────────────────────────────────────── */
function ToastMessage({
  item,
  onDismiss,
}: {
  item: ToastItem
  onDismiss: (id: string) => void
}) {
  const elRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* Entrance + auto-dismiss */
  useEffect(() => {
    const el = elRef.current
    const bar = barRef.current
    if (!el || !bar) return

    if (reduced) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      const timer = setTimeout(() => onDismiss(item.id), item.duration)
      return () => clearTimeout(timer)
    }

    // Entrance
    gsap.fromTo(
      el,
      { x: 80, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    )

    // Progress bar countdown
    gsap.fromTo(
      bar,
      { scaleX: 1 },
      {
        scaleX: 0,
        duration: item.duration / 1000,
        ease: 'none',
        onComplete: () => {
          // Exit animation
          gsap.to(el, {
            x: 80,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => onDismiss(item.id),
          })
        },
      }
    )
  }, [item, onDismiss, reduced])

  const v = VARIANT_STYLES[item.variant]
  const F = "'Inter', 'Helvetica Neue', sans-serif"

  return (
    <div
      ref={elRef}
      role="alert"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 20px',
        backgroundColor: v.bg,
        border: v.border,
        minWidth: '280px',
        maxWidth: '380px',
        marginBottom: '8px',
        overflow: 'hidden',
        opacity: reduced ? 1 : 0,
        cursor: 'pointer',
      }}
      onClick={() => {
        if (!reduced && elRef.current) {
          gsap.to(elRef.current, {
            x: 80,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => onDismiss(item.id),
          })
        } else {
          onDismiss(item.id)
        }
      }}
    >
      {/* Icon */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: v.barColor,
          color: '#050505',
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: F,
          flexShrink: 0,
        }}
      >
        {v.icon}
      </span>

      {/* Message */}
      <span
        style={{
          fontFamily: F,
          fontSize: '13px',
          fontWeight: 400,
          color: '#FAFAFA',
          lineHeight: 1.5,
          letterSpacing: '0.01em',
        }}
      >
        {item.message}
      </span>

      {/* Progress bar */}
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: v.barColor,
          transformOrigin: 'left center',
          opacity: 0.6,
        }}
      />
    </div>
  )
}

/* ── Toast Provider ──────────────────────────────────────────── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      setToasts((prev) => [{ id, message, variant, duration }, ...prev])
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container — fixed top-right */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          {toasts.map((t) => (
            <ToastMessage key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
