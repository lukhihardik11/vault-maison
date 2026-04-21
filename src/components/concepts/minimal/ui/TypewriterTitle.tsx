'use client'

/**
 * TypewriterTitle — adapted from KokonutUI
 * Cycles through words with a typing/deleting animation.
 * Pure black & white, system fonts, no external deps beyond motion/react.
 */

import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type TypewriterSequence = {
  text: string
  deleteAfter?: boolean
  pauseAfter?: number
}

interface TypewriterTitleProps {
  sequences?: TypewriterSequence[]
  typingSpeed?: number
  startDelay?: number
  autoLoop?: boolean
  loopDelay?: number
  deleteSpeed?: number
  pauseBeforeDelete?: number
  naturalVariance?: boolean
  className?: string
}

const DEFAULT_SEQUENCES: TypewriterSequence[] = [
  { text: 'Diamonds', deleteAfter: true },
  { text: 'Gold', deleteAfter: true },
  { text: 'Eternity', deleteAfter: true },
]

export default function TypewriterTitle({
  sequences = DEFAULT_SEQUENCES,
  typingSpeed = 60,
  startDelay = 400,
  autoLoop = true,
  loopDelay = 1200,
  deleteSpeed = 35,
  pauseBeforeDelete = 1400,
  naturalVariance = true,
  className = '',
}: TypewriterTitleProps) {
  const [displayText, setDisplayText] = useState('')
  const sequenceIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sequencesRef = useRef(sequences)

  useEffect(() => {
    sequencesRef.current = sequences
  }, [sequences])

  useEffect(() => {
    const getTypingDelay = () => {
      if (!naturalVariance) return typingSpeed
      const random = Math.random()
      if (random < 0.1) return typingSpeed * 2
      if (random > 0.9) return typingSpeed * 0.5
      const variance = 0.4
      const min = typingSpeed * (1 - variance)
      const max = typingSpeed * (1 + variance)
      return Math.random() * (max - min) + min
    }

    const runTypewriter = () => {
      const currentSequence = sequencesRef.current[sequenceIndexRef.current]
      if (!currentSequence) return

      if (isDeletingRef.current) {
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1
          setDisplayText(currentSequence.text.slice(0, charIndexRef.current))
          timeoutRef.current = setTimeout(runTypewriter, deleteSpeed)
        } else {
          isDeletingRef.current = false
          const isLast = sequenceIndexRef.current === sequencesRef.current.length - 1
          if (isLast && autoLoop) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current = 0
              runTypewriter()
            }, loopDelay)
          } else if (!isLast) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current += 1
              runTypewriter()
            }, 100)
          }
        }
      } else if (charIndexRef.current < currentSequence.text.length) {
        charIndexRef.current += 1
        setDisplayText(currentSequence.text.slice(0, charIndexRef.current))
        timeoutRef.current = setTimeout(runTypewriter, getTypingDelay())
      } else {
        const pauseDuration = currentSequence.pauseAfter ?? pauseBeforeDelete
        if (currentSequence.deleteAfter) {
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true
            runTypewriter()
          }, pauseDuration)
        } else {
          const isLast = sequenceIndexRef.current === sequencesRef.current.length - 1
          if (isLast && autoLoop) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current = 0
              charIndexRef.current = 0
              setDisplayText('')
              runTypewriter()
            }, loopDelay)
          } else if (!isLast) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current += 1
              charIndexRef.current = 0
              setDisplayText('')
              runTypewriter()
            }, pauseDuration)
          }
        }
      }
    }

    timeoutRef.current = setTimeout(runTypewriter, startDelay)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [typingSpeed, deleteSpeed, pauseBeforeDelete, autoLoop, loopDelay, startDelay, naturalVariance])

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={`flex items-center gap-1 ${className}`}
      initial={{ opacity: 0.01 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
        color: '#050505',
      }}
    >
      <span className="inline-block min-h-[1.2em] min-w-[0.5em]">
        {displayText}
      </span>
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        className="inline-block h-[1em] w-[2px]"
        style={{ backgroundColor: '#050505' }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}
