'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Ring() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x = state.pointer.y * 0.2;
    meshRef.current.rotation.z = state.pointer.x * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.3, 32, 100]} />
      <meshStandardMaterial color="#E8E8E8" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

export default function Minimal3DViewer({ className = '' }: { className?: string }) {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      return (
        <div className={`aspect-square w-full max-w-md mx-auto ${className} bg-[#F0F0F0]`} />
      );
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return (
        <div className={`aspect-square w-full max-w-md mx-auto ${className} bg-[#F0F0F0]`} />
      );
    }
  }

  return (
    <div className={`aspect-square w-full max-w-md mx-auto ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-4, -2, 3]} intensity={0.6} />
        <Suspense fallback={null}>
          <Ring />
        </Suspense>
      </Canvas>
    </div>
  );
}
