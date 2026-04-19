'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = Math.random() * 0.0018 + 0.0008;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += Math.sin(t * 0.3 + i * 0.7) * 0.001;
      pos[i * 3 + 1] += speeds[i];
      pos[i * 3 + 2] += Math.cos(t * 0.2 + i * 0.5) * 0.0005;
      if (pos[i * 3 + 1] > 6) {
        pos[i * 3 + 1] = -6;
        pos[i * 3]     = (Math.random() - 0.5) * 22;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#A0A0A0" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

interface DiamondDustProps {
  className?: string;
  particleCount?: number;
}

/**
 * DiamondDust — Three.js ambient particle field for hero section.
 * Disabled on mobile, touch devices, and prefers-reduced-motion.
 * Import with Next.js dynamic() at call sites:
 *   const DiamondDust = dynamic(() => import('./3d/DiamondDust').then(m => ({ default: m.DiamondDust })), { ssr: false });
 */
export function DiamondDust({ className = '', particleCount = 150 }: DiamondDustProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShouldRender(true);
  }, []);

  if (!shouldRender) return <div className={className} />;

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
}
