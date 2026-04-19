'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 150 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 20;
      arr[i + 1] = (Math.random() - 0.5) * 10;
      arr[i + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.02;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] += Math.sin(Date.now() * 0.0002 + i) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#C0C0C0" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function ParticleField({
  className = 'absolute inset-0 pointer-events-none',
}: {
  className?: string;
}) {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) return null;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  }

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true, antialias: false }}>
        <Particles />
      </Canvas>
    </div>
  );
}
