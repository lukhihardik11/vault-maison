'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';

function Controls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const controls = new OrbitControlsImpl(camera, gl.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = (Math.PI * 2) / 3;
    controlsRef.current = controls;

    return () => {
      controls.dispose();
      controlsRef.current = null;
    };
  }, [camera, gl]);

  useFrame(() => controlsRef.current?.update());

  return null;
}

function Ring() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.4, 0.2, 0]}>
      <torusGeometry args={[1, 0.3, 32, 100]} />
      <meshStandardMaterial color="#E8E8E8" metalness={0.92} roughness={0.12} />
    </mesh>
  );
}

function ViewerScene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <directionalLight position={[-4, -1, 3]} intensity={0.35} />
      <Ring />
      <Controls />
    </>
  );
}

export default function Minimal3DViewer({ className = '' }: { className?: string }) {
  const enabled =
    typeof window !== 'undefined' &&
    window.innerWidth >= 768 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!enabled) {
    return (
      <div
        className={`aspect-square w-full max-w-md mx-auto bg-[#F0F0F0] flex items-center justify-center ${className}`}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
          }}
        >
          3D view unavailable on this device
        </span>
      </div>
    );
  }

  return (
    <div className={`aspect-square w-full max-w-md mx-auto ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ViewerScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
