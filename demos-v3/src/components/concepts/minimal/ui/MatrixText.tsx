'use client'

import { motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

interface LetterState {
  char: string
  isMatrix: boolean
  isSpace: boolean
}

interface MatrixTextProps {
  text?: string
  className?: string
  initialDelay?: number
  letterAnimationDuration?: number
  letterInterval?: number
  chars?: string
}

const MatrixText = ({
  text = 'Vault Maison',
  className,
  initialDelay = 200,
  letterAnimationDuration = 400,
  letterInterval = 80,
  chars = '◇◆○●□■△▽',
}: MatrixTextProps) => {
  const [letters, setLetters] = useState<LetterState[]>(() =>
    text.split('').map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === ' ',
    }))
  )
  const [isAnimating, setIsAnimating] = useState(false)

  const getRandomChar = useCallback(
    () => chars[Math.floor(Math.random() * chars.length)],
    [chars]
  )

  const animateLetter = useCallback(
    (index: number) => {
      if (index >= text.length) return

      requestAnimationFrame(() => {
        setLetters((prev) => {
          const newLetters = [...prev]
          if (!newLetters[index].isSpace) {
            newLetters[index] = {
              ...newLetters[index],
              char: getRandomChar(),
              isMatrix: true,
            }
          }
          return newLetters
        })

        setTimeout(() => {
          setLetters((prev) => {
            const newLetters = [...prev]
            newLetters[index] = {
              ...newLetters[index],
              char: text[index],
              isMatrix: false,
            }
            return newLetters
          })
        }, letterAnimationDuration)
      })
    },
    [getRandomChar, text, letterAnimationDuration]
  )

  const startAnimation = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    let currentIndex = 0

    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false)
        return
      }

      animateLetter(currentIndex)
      currentIndex++
      setTimeout(animate, letterInterval)
    }

    animate()
  }, [animateLetter, text, isAnimating, letterInterval])

  useEffect(() => {
    const timer = setTimeout(startAnimation, initialDelay)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const motionVariants = useMemo(
    () => ({
      matrix: {
        color: '#999999',
        textShadow: '0 0 8px rgba(5, 5, 5, 0.1)',
      },
      normal: {
        color: '#050505',
        textShadow: 'none',
      },
    }),
    []
  )

  return (
    <div
      aria-label={text}
      className={cn('flex items-center', className)}
    >
      <div className="flex flex-wrap items-center">
        {letters.map((letter, index) => (
          <motion.span
            key={`${index}-${letter.char}`}
            animate={letter.isMatrix ? 'matrix' : 'normal'}
            className="inline-block w-[1ch] text-center"
            style={{
              fontVariantNumeric: 'tabular-nums',
            }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            variants={motionVariants}
          >
            {letter.isSpace ? '\u00A0' : letter.char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default MatrixText
