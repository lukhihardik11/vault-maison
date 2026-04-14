'use client'

import React, { useEffect, useState, useRef, useId } from 'react'

interface GalleryTypewriterProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  style?: React.CSSProperties
}

export function GalleryTypewriter({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  style,
}: GalleryTypewriterProps) {
  const uid = useId().replace(/:/g, '')
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(currentText.slice(0, displayed.length + 1))
        if (displayed.length + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        setDisplayed(currentText.slice(0, displayed.length - 1))
        if (displayed.length === 0) {
          setIsDeleting(false)
          setTextIndex((textIndex + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, textIndex, hasStarted, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <>
      <style>{`
        .gtw-${uid} .gtw-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #8B7355;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: gtw-blink-${uid} 0.8s step-end infinite;
        }
        @keyframes gtw-blink-${uid} {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <span ref={ref} className={`gtw-${uid}`} style={style}>
        {displayed}
        <span className="gtw-cursor" />
      </span>
    </>
  )
}
