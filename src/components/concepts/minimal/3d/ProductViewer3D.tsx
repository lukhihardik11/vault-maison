'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * JewelryRing — Procedural 3D ring model
 * Creates a torus (ring) with metallic material.
 * Auto-rotates slowly. User can drag to orbit.
 */
function JewelryRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    // Gentle float
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} castShadow>
        {/* Ring shape: torus */}
        <torusGeometry args={[1, 0.15, 32, 100]} />
        <meshStandardMaterial
          color="#E5E5E5"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Small gem on top */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <octahedronGeometry args={[0.2, 2]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          ior={2.4}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

/**
 * JewelryBracelet — Procedural 3D bracelet model
 */
function JewelryBracelet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} castShadow rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

/**
 * JewelryNecklace — Procedural 3D pendant model
 */
function JewelryNecklace() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Chain arc */}
        <mesh>
          <torusGeometry args={[1.5, 0.02, 8, 100, Math.PI]} />
          <meshStandardMaterial
            color="#D0D0D0"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Pendant */}
        <mesh position={[0, -1.5, 0]} castShadow>
          <octahedronGeometry args={[0.3, 0]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0}
            transmission={0.85}
            thickness={0.5}
            ior={2.4}
            envMapIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * ReflectiveFloor — Subtle reflective ground plane
 */
function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={0.3}
        roughness={1}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  );
}

type JewelryType = 'ring' | 'bracelet' | 'necklace';

interface ProductViewer3DProps {
  className?: string;
  /** Type of jewelry to display. Default 'ring' */
  jewelryType?: JewelryType;
  /** Show orbit controls hint text. Default true */
  showHint?: boolean;
  /** Height of the viewer. Default '500px' */
  height?: string;
}

/**
 * ProductViewer3D — Interactive 3D jewelry viewer
 * Renders a procedural 3D jewelry model with orbit controls.
 * User can drag to rotate, scroll to zoom.
 * 
 * Lazy-loaded with Suspense. Falls back to static placeholder on mobile.
 * Respects prefers-reduced-motion (shows static view, no auto-rotation).
 */
export function ProductViewer3D({
  className = '',
  jewelryType = 'ring',
  showHint = true,
  height = '500px',
}: ProductViewer3DProps) {
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    // Check mobile
    if (window.innerWidth < 768) return;

    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    setShouldRender3D(true);
  }, []);

  const JewelryComponent = {
    ring: JewelryRing,
    bracelet: JewelryBracelet,
    necklace: JewelryNecklace,
  }[jewelryType];

  // Static fallback for mobile / reduced motion
  if (!shouldRender3D) {
    return (
      <div
        className={className}
        style={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          position: 'relative',
        }}
      >
        <div style={{
          width: '120px',
          height: '120px',
          border: '2px solid #6B6B6B',
          borderRadius: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <p style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#6B6B6B',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body, system-ui)',
        }}>
          3D VIEW — DESKTOP ONLY
        </p>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        height,
        position: 'relative',
        backgroundColor: '#050505',
        cursor: 'grab',
      }}
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
    >
      <Suspense fallback={
        <div style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6B6B6B',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body, system-ui)',
        }}>
          LOADING 3D VIEW...
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          style={{ background: '#050505' }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} />
          <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.3} penumbra={1} />

          <JewelryComponent />
          <ReflectiveFloor />

          <Environment preset="studio" />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate={!isInteracting}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>

      {/* Interaction hint */}
      {showHint && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#6B6B6B',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body, system-ui)',
          opacity: isInteracting ? 0 : 0.7,
          transition: 'opacity 300ms ease',
          pointerEvents: 'none',
        }}>
          DRAG TO ROTATE — SCROLL TO ZOOM
        </div>
      )}
    </div>
  );
}
