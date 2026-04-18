'use client'

import { cn } from '@/lib/utils'

export interface ShimmerTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function ShimmerText({ text, className, style }: ShimmerTextProps) {
  return (
    <span className={cn('relative inline-block overflow-hidden', className)} style={style}>
      <span className="shimmer-text-inner relative">
        {text}
      </span>
      <style>{`
        .shimmer-text-inner {
          background: linear-gradient(
            90deg,
            #050505 0%,
            #050505 40%,
            #E8D5A8 50%,
            #050505 60%,
            #050505 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-sweep 3s ease-in-out infinite;
        }
        @keyframes shimmer-sweep {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </span>
  )
}
