'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface UseKeyboardShortcutsOptions {
  onCommandPalette: () => void
}

/**
 * Global keyboard shortcuts for the Minimal concept.
 * 
 * Shortcuts:
 * - Cmd+K / Ctrl+K: Open command palette
 * - /: Open command palette (when not in input)
 * - Escape: Close any open modal/overlay
 * - G then H: Navigate to Home
 * - G then C: Navigate to Collections
 * - G then A: Navigate to About
 * - G then S: Navigate to Cart (Shopping)
 */
export function useKeyboardShortcuts({ onCommandPalette }: UseKeyboardShortcutsOptions) {
  const router = useRouter()
  const sequenceRef = useRef<string | null>(null)
  const sequenceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isInputFocused = useCallback(() => {
    const active = document.activeElement
    if (!active) return false
    const tag = active.tagName.toLowerCase()
    return tag === 'input' || tag === 'textarea' || tag === 'select' || (active as HTMLElement).isContentEditable
  }, [])

  const clearSequence = useCallback(() => {
    sequenceRef.current = null
    if (sequenceTimerRef.current) {
      clearTimeout(sequenceTimerRef.current)
      sequenceTimerRef.current = null
    }
  }, [])

  const startSequence = useCallback((key: string) => {
    sequenceRef.current = key
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current)
    sequenceTimerRef.current = setTimeout(() => {
      sequenceRef.current = null
    }, 500) // 500ms window for sequence completion
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K: Open command palette (works even in inputs)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onCommandPalette()
        return
      }

      // Don't process other shortcuts when input is focused
      if (isInputFocused()) return

      // / : Open command palette
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        onCommandPalette()
        return
      }

      // Sequence shortcuts (G then X)
      if (sequenceRef.current === 'g') {
        clearSequence()
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault()
            router.push('/minimal')
            break
          case 'c':
            e.preventDefault()
            router.push('/minimal/collections')
            break
          case 'a':
            e.preventDefault()
            router.push('/minimal/about')
            break
          case 's':
            e.preventDefault()
            router.push('/minimal/cart')
            break
        }
        return
      }

      // Start sequence with 'g'
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        startSequence('g')
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCommandPalette, isInputFocused, clearSequence, startSequence, router])
}

export default useKeyboardShortcuts
