'use client'
import { useEffect, useRef } from 'react'

const font = "'Inter', 'Helvetica Neue', sans-serif"

interface DynamicTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  effect?: 'shimmer' | 'reveal' | 'glow'
}

export default function DynamicText({ text, className = '', style = {}, effect = 'shimmer' }: DynamicTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('vm-dynamic-active')
        observer.unobserve(el)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <span
        ref={ref}
        className={`vm-dynamic-text vm-dynamic-${effect} ${className}`}
        style={{ fontFamily: font, display: 'inline-block', ...style }}
      >
        {text}
      </span>
      <style>{`
        .vm-dynamic-shimmer {
          background: linear-gradient(90deg, #050505 0%, #050505 40%, #050505 80%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .vm-dynamic-shimmer.vm-dynamic-active {
          animation: vmShimmer 3s ease infinite;
        }
        @keyframes vmShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .vm-dynamic-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .vm-dynamic-reveal.vm-dynamic-active {
          opacity: 1;
          transform: translateY(0);
        }
        .vm-dynamic-glow {
          text-shadow: 0 0 0px transparent;
          transition: text-shadow 1s ease;
        }
        .vm-dynamic-glow.vm-dynamic-active {
          text-shadow: 0 0 20px rgba(5,5,5,0.15), 0 0 40px rgba(5,5,5,0.05);
        }
      `}</style>
    </>
  )
}
