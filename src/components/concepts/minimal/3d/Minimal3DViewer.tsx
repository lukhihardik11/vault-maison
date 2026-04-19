'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';

/* ─── Controls: drag to orbit + auto-rotate when idle ─── */
function Controls({ onInteractChange }: { onInteractChange: (v: boolean) => void }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const controls = new OrbitControlsImpl(camera, gl.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.minDistance = 2.5;
    controls.maxDistance = 6;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = (Math.PI * 2) / 3;
    controlsRef.current = controls;

    const handleStart = () => {
      controls.autoRotate = false;
      onInteractChange(true);
    };
    const handleEnd = () => {
      controls.autoRotate = true;
      onInteractChange(false);
    };
    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
      controls.dispose();
      controlsRef.current = null;
    };
  }, [camera, gl, onInteractChange]);

  useFrame(() => controlsRef.current?.update());

  return null;
}

/* ─── Subtle floating motion ─── */
function Float({
  children,
  speed = 1,
  floatIntensity = 0.18,
}: {
  children: React.ReactNode;
  speed?: number;
  floatIntensity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed;
    groupRef.current.position.y = Math.sin(t) * floatIntensity;
  });
  return <group ref={groupRef}>{children}</group>;
}

/* ─── Ring with brilliant-cut diamond accent ─── */
function RingWithDiamond() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float>
      {/* Ring band */}
      <mesh ref={ringRef} castShadow receiveShadow>
        <torusGeometry args={[1, 0.15, 32, 100]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Brilliant-cut diamond on top */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <octahedronGeometry args={[0.2, 2]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0}
          transmission={0.95}
          thickness={0.5}
          ior={2.4}
          envMapIntensity={2.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      {/* Reflection floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

/* ─── Cinematic 5-light setup ─── */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      {/* Key light: top-front-right */}
      <directionalLight position={[5, 5, 5]} intensity={1.4} castShadow />
      {/* Fill light: cooler, from left */}
      <directionalLight position={[-5, 3, -3]} intensity={0.55} color="#E8EFFF" />
      {/* Top spot for diamond sparkle */}
      <spotLight
        position={[0, 6, 0]}
        intensity={1.1}
        angle={0.35}
        penumbra={1}
        castShadow
      />
      {/* Rim back light: separates subject from black bg */}
      <directionalLight position={[0, 2, -6]} intensity={0.7} color="#FFFFFF" />
      {/* Bottom bounce */}
      <pointLight position={[0, -3, 2]} intensity={0.25} color="#FFFFFF" />
    </>
  );
}

interface Minimal3DViewerProps {
  className?: string;
  /** Force-disable interaction (auto-rotate only). Default false. */
  rotateOnly?: boolean;
}

export default function Minimal3DViewer({
  className = '',
  rotateOnly = false,
}: Minimal3DViewerProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
  }, []);

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
    <div
      className={`relative aspect-square w-full max-w-md mx-auto ${className}`}
      style={{
        backgroundColor: '#050505',
        cursor: rotateOnly ? 'default' : isInteracting ? 'grabbing' : 'grab',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 4], fov: 45 }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, 2]}
        shadows
        style={{ background: '#050505' }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <RingWithDiamond />
          {!rotateOnly && <Controls onInteractChange={setIsInteracting} />}
        </Suspense>
      </Canvas>
      {!rotateOnly && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#6B6B6B',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            opacity: isInteracting ? 0 : 0.55,
            transition: 'opacity 300ms ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          DRAG · ROTATE · ZOOM
        </div>
      )}
    </div>
  );
}
