export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E5E5E5] ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-4 py-8">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-5 w-1/4" />
        <div className="pt-8 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <Skeleton className="h-14 w-full mt-8" />
      </div>
    </div>
  );
}
