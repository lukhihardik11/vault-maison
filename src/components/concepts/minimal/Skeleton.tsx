'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  /** Custom width */
  width?: string | number
  /** Custom height */
  height?: string | number
}

/**
 * Minimal Machine Skeleton — monochrome shimmer loading state.
 * Matches brutalist design: no rounded corners, no colored accents.
 */
export function Skeleton({ className, width, height }: SkeletonProps) {
  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(
        'mn-skeleton relative overflow-hidden bg-[#F5F5F5]',
        className
      )}
      style={style}
    />
  )
}

/** Product card skeleton matching the brutalist card layout */
export function ProductCardSkeleton() {
  return (
    <div className="block">
      <Skeleton className="w-full aspect-[3/4]" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  )
}

/** Product detail skeleton */
export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
      <Skeleton className="h-3 w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
        <div className="md:col-span-3">
          <Skeleton className="w-full aspect-square" />
          <div className="flex gap-3 mt-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-20" />
            ))}
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-14 w-full mt-8" />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
