'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 150 }) {
  const meshRef = useRef<THREE.Points>(null);

  const seededUnit = (index: number) => {
    const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453123;
    return value - Math.floor(value);
  };

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (seededUnit(i + 1) - 0.5) * 20;
      arr[i + 1] = (seededUnit(i + 2) - 0.5) * 10;
      arr[i + 2] = (seededUnit(i + 3) - 0.5) * 5;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += delta * 0.02;

    const attribute = meshRef.current.geometry.attributes.position;
    const points = attribute.array as Float32Array;
    for (let i = 1; i < points.length; i += 3) {
      points[i] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.002;
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C0C0C0"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField({
  className = 'absolute inset-0 pointer-events-none',
}: {
  className?: string;
}) {
  const enabled =
    typeof window !== 'undefined' &&
    window.innerWidth >= 768 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!enabled) return null;

  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true, antialias: false }}>
        <Particles />
      </Canvas>
    </div>
  );
}
