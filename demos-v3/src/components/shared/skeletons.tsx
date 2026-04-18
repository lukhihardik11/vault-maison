'use client'

interface SkeletonProps {
  className?: string
  bgColor?: string
}

function Skeleton({ className = '', bgColor = '#2A2A2A' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ backgroundColor: bgColor }}
    />
  )
}

export function ProductCardSkeleton({ bgColor = '#2A2A2A' }: { bgColor?: string }) {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full" bgColor={bgColor} />
      <Skeleton className="h-4 w-3/4" bgColor={bgColor} />
      <Skeleton className="h-3 w-1/2" bgColor={bgColor} />
      <Skeleton className="h-4 w-1/4" bgColor={bgColor} />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8, bgColor = '#2A2A2A' }: { count?: number; bgColor?: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} bgColor={bgColor} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton({ bgColor = '#2A2A2A' }: { bgColor?: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 py-20">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full" bgColor={bgColor} />
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="w-20 h-20" bgColor={bgColor} />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" bgColor={bgColor} />
        <Skeleton className="h-5 w-1/2" bgColor={bgColor} />
        <Skeleton className="h-6 w-1/4" bgColor={bgColor} />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" bgColor={bgColor} />
          <Skeleton className="h-4 w-full" bgColor={bgColor} />
          <Skeleton className="h-4 w-2/3" bgColor={bgColor} />
        </div>
        <Skeleton className="h-12 w-full" bgColor={bgColor} />
      </div>
    </div>
  )
}

export function HeroSkeleton({ bgColor = '#2A2A2A' }: { bgColor?: string }) {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl">
        <Skeleton className="h-12 w-64 mx-auto" bgColor={bgColor} />
        <Skeleton className="h-6 w-96 mx-auto" bgColor={bgColor} />
        <Skeleton className="h-12 w-48 mx-auto" bgColor={bgColor} />
      </div>
    </div>
  )
}

export function BreadcrumbSkeleton({ bgColor = '#2A2A2A' }: { bgColor?: string }) {
  return (
    <div className="flex items-center gap-2 py-4">
      <Skeleton className="h-3 w-12" bgColor={bgColor} />
      <span className="opacity-30">/</span>
      <Skeleton className="h-3 w-20" bgColor={bgColor} />
      <span className="opacity-30">/</span>
      <Skeleton className="h-3 w-32" bgColor={bgColor} />
    </div>
  )
}
