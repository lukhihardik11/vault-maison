'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DiamondDustParticlesProps {
  count?: number;
}

/**
 * DiamondDustParticles — Internal R3F component
 * Renders floating diamond dust particles.
 * Particles are tiny white/silver points that drift slowly.
 */
function DiamondDustParticles({ count = 200 }: DiamondDustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // x: spread wide
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;  // y: spread tall
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;   // z: shallow depth
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.5 + 0.2;
    }
    return s;
  }, [count]);

  const speeds = useMemo(() => {
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sp[i] = Math.random() * 0.002 + 0.001;
    }
    return sp;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      // Gentle drift upward + slight horizontal wave
      positions[i * 3] += Math.sin(time * 0.3 + i) * 0.001;
      positions[i * 3 + 1] += speeds[i];
      positions[i * 3 + 2] += Math.cos(time * 0.2 + i) * 0.0005;

      // Reset particles that drift too high
      if (positions[i * 3 + 1] > 5) {
        positions[i * 3 + 1] = -5;
        positions[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#9B9B9B"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface DiamondDustProps {
  className?: string;
  particleCount?: number;
}

/**
 * DiamondDust — Ambient diamond dust particle effect
 * Renders barely-visible floating particles over the hero section.
 * Uses React Three Fiber with lazy loading.
 * 
 * Disabled on mobile and when prefers-reduced-motion is set.
 * Renders as empty div when disabled (no 3D overhead).
 */
export function DiamondDust({
  className = '',
  particleCount = 150,
}: DiamondDustProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check mobile
    if (window.innerWidth < 768) return;

    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    setShouldRender(true);

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setShouldRender(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!shouldRender) {
    return <div className={className} />;
  }

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <DiamondDustParticles count={particleCount} />
      </Canvas>
    </div>
  );
}
