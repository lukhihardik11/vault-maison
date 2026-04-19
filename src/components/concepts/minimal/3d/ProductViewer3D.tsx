'use client';

import Minimal3DViewer from './Minimal3DViewer';

type JewelryType = 'ring' | 'bracelet' | 'necklace';

interface ProductViewer3DProps {
  className?: string;
  jewelryType?: JewelryType;
  showHint?: boolean;
  height?: string;
}

export function ProductViewer3D({
  className = '',
  height = '500px',
}: ProductViewer3DProps) {
  return (
    <div style={{ minHeight: height }}>
      <Minimal3DViewer className={className} />
    </div>
  );
}
