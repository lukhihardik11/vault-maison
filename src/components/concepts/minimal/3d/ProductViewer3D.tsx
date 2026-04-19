'use client';

import { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Orbit Controls (pure @react-three/fiber, no drei) ─── */
function OrbitControls({
  autoRotateSpeed = 0.5,
  enableZoom = true,
  minDistance = 2.5,
  maxDistance = 6,
  minPolarAngle = Math.PI / 4,
  maxPolarAngle = Math.PI / 2,
  isInteracting = false,
}: {
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  isInteracting?: boolean;
}) {
  const { camera, gl } = useThree();
  const spherical = useRef({ theta: 0.5, phi: Math.PI / 3, radius: 4 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;
    const onDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = (e.clientX - lastPointer.current.x) * 0.008;
      const dy = (e.clientY - lastPointer.current.y) * 0.008;
      spherical.current.theta -= dx;
      spherical.current.phi = Math.max(minPolarAngle, Math.min(maxPolarAngle, spherical.current.phi + dy));
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { isDragging.current = false; };
    const onWheel = (e: WheelEvent) => {
      if (!enableZoom) return;
      e.preventDefault();
      spherical.current.radius = Math.max(minDistance, Math.min(maxDistance, spherical.current.radius + e.deltaY * 0.01));
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [gl, enableZoom, minDistance, maxDistance, minPolarAngle, maxPolarAngle]);

  useFrame((_, delta) => {
    if (!isDragging.current && !isInteracting) {
      spherical.current.theta += autoRotateSpeed * delta * 0.3;
    }
    const { theta, phi, radius } = spherical.current;
    camera.position.set(
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.cos(theta),
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Float wrapper (replaces drei Float) ─── */
function FloatWrapper({ children, speed = 1, intensity = 0.08 }: {
  children: React.ReactNode;
  speed?: number;
  intensity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * speed) * intensity;
  });
  return <group ref={groupRef}>{children}</group>;
}

/* ─── Jewelry models ─── */
function JewelryRing() {
  return (
    <FloatWrapper>
      <mesh castShadow>
        <torusGeometry args={[1, 0.15, 32, 100]} />
        <meshStandardMaterial color="#E5E5E5" metalness={0.95} roughness={0.05} envMapIntensity={1.5} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <octahedronGeometry args={[0.18, 2]} />
        <meshPhysicalMaterial
          color="#FFFFFF" metalness={0.1} roughness={0}
          transmission={0.9} thickness={0.5} ior={2.4} envMapIntensity={2}
        />
      </mesh>
    </FloatWrapper>
  );
}

function JewelryBracelet() {
  return (
    <FloatWrapper>
      <mesh castShadow rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 100]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.08} />
      </mesh>
    </FloatWrapper>
  );
}

function JewelryNecklace() {
  return (
    <FloatWrapper>
      <mesh>
        <torusGeometry args={[1.5, 0.02, 8, 100, Math.PI]} />
        <meshStandardMaterial color="#D0D0D0" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.5, 0]} castShadow>
        <octahedronGeometry args={[0.3, 0]} />
        <meshPhysicalMaterial
          color="#FFFFFF" metalness={0.1} roughness={0}
          transmission={0.85} thickness={0.5} ior={2.4} envMapIntensity={2}
        />
      </mesh>
    </FloatWrapper>
  );
}

/* ─── Scene ─── */
type JewelryType = 'ring' | 'bracelet' | 'necklace';

function Scene({ jewelryType, isInteracting }: { jewelryType: JewelryType; isInteracting: boolean }) {
  const components = { ring: JewelryRing, bracelet: JewelryBracelet, necklace: JewelryNecklace };
  const Jewelry = components[jewelryType];
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} />
      <spotLight position={[0, 6, 0]} intensity={1} angle={0.35} penumbra={1} />
      <pointLight position={[3, -2, 3]} intensity={0.3} />
      <Jewelry />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#050505" metalness={0.6} roughness={0.4} transparent opacity={0.6} />
      </mesh>
      <OrbitControls isInteracting={isInteracting} />
    </>
  );
}

/* ─── Public API ─── */
interface ProductViewer3DProps {
  className?: string;
  jewelryType?: JewelryType;
  showHint?: boolean;
  height?: string;
}

/**
 * ProductViewer3D — Interactive 3D jewelry viewer.
 * No @react-three/drei dependency — pure @react-three/fiber + three.
 * Import with Next.js dynamic() at call sites for SSR safety.
 */
export function ProductViewer3D({ className = '', jewelryType = 'ring', showHint = true, height = '500px' }: ProductViewer3DProps) {
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShouldRender3D(true);
  }, []);

  if (!shouldRender3D) {
    return (
      <div className={className} style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505', position: 'relative' }}>
        <div style={{ width: '100px', height: '100px', border: '1.5px solid #6B6B6B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <p style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', color: '#6B6B6B', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif", whiteSpace: 'nowrap' }}>
          3D — DESKTOP ONLY
        </p>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ height, position: 'relative', backgroundColor: '#050505', cursor: isInteracting ? 'grabbing' : 'grab' }}
      onPointerDown={() => setIsInteracting(true)}
      onPointerUp={() => setIsInteracting(false)}
    >
      <Suspense fallback={
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B6B6B', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif" }}>
          LOADING 3D…
        </div>
      }>
        <Canvas camera={{ position: [0, 1.2, 4], fov: 45 }} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }} dpr={[1, 2]} style={{ background: '#050505' }}>
          <Scene jewelryType={jewelryType} isInteracting={isInteracting} />
        </Canvas>
      </Suspense>
      {showHint && (
        <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', color: '#6B6B6B', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif", opacity: isInteracting ? 0 : 0.6, transition: 'opacity 300ms ease', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          DRAG · ROTATE · ZOOM
        </div>
      )}
    </div>
  );
}
