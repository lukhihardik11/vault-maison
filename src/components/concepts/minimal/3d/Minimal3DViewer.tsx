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
  floatIntensity = 0.12,
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

/* ─── Environment cube map for metallic reflections ─── */
function EnvironmentSetup() {
  const { scene } = useThree();

  useEffect(() => {
    // Create a simple gradient environment map for reflections
    const size = 64;
    const data = new Uint8Array(size * size * 4 * 6);

    for (let face = 0; face < 6; face++) {
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const offset = (face * size * size + y * size + x) * 4;
          // Create a subtle gradient: darker at bottom, lighter at top
          const ny = y / size;
          const brightness = Math.floor(40 + ny * 180);
          data[offset] = brightness;
          data[offset + 1] = brightness;
          data[offset + 2] = brightness + 10; // Slight cool tint
          data[offset + 3] = 255;
        }
      }
    }

    const cubeTexture = new THREE.CubeTexture();
    const faces: THREE.Texture[] = [];

    for (let i = 0; i < 6; i++) {
      const faceData = new Uint8Array(size * size * 4);
      faceData.set(data.subarray(i * size * size * 4, (i + 1) * size * size * 4));
      const dataTexture = new THREE.DataTexture(faceData, size, size, THREE.RGBAFormat);
      dataTexture.needsUpdate = true;
      faces.push(dataTexture);
    }

    cubeTexture.images = faces.map((t) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      const imageData = ctx.createImageData(size, size);
      const texData = (t as THREE.DataTexture).image?.data;
      if (texData) imageData.data.set(texData);
      ctx.putImageData(imageData, 0, 0);
      return canvas;
    });
    cubeTexture.needsUpdate = true;

    scene.environment = cubeTexture;

    return () => {
      scene.environment = null;
      cubeTexture.dispose();
    };
  }, [scene]);

  return null;
}

/* ─── Ring with brilliant-cut diamond accent ─── */
function RingWithDiamond() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float>
      {/* Ring band — bright silver/platinum material */}
      <mesh ref={ringRef} castShadow receiveShadow>
        <torusGeometry args={[1, 0.15, 32, 100]} />
        <meshStandardMaterial
          color="#E0E0E0"
          metalness={0.6}
          roughness={0.2}
          emissive="#404040"
          emissiveIntensity={0.3}
          envMapIntensity={2.0}
        />
      </mesh>
      {/* Brilliant-cut diamond on top */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <octahedronGeometry args={[0.2, 2]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={0.0}
          roughness={0}
          transmission={0.85}
          thickness={0.5}
          ior={2.42}
          emissive="#AAAACC"
          emissiveIntensity={0.15}
          envMapIntensity={3.0}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      {/* Prong settings (4 prongs) */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.12,
            0.95,
            Math.sin(angle) * 0.12,
          ]}
          castShadow
        >
          <cylinderGeometry args={[0.015, 0.01, 0.15, 8]} />
          <meshStandardMaterial
            color="#E0E0E0"
            metalness={0.6}
            roughness={0.2}
            emissive="#404040"
            emissiveIntensity={0.3}
            envMapIntensity={2.0}
          />
        </mesh>
      ))}
      {/* Reflection floor — subtle, semi-transparent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#1A1A1A"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

/* ─── Cinematic 5-light setup ─── */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Key light: top-front-right — bright */}
      <directionalLight position={[5, 5, 5]} intensity={2.0} castShadow />
      {/* Fill light: cooler, from left */}
      <directionalLight position={[-5, 3, -3]} intensity={0.8} color="#E8EFFF" />
      {/* Top spot for diamond sparkle */}
      <spotLight
        position={[0, 6, 0]}
        intensity={1.5}
        angle={0.35}
        penumbra={1}
        castShadow
      />
      {/* Rim back light: separates subject from dark bg */}
      <directionalLight position={[0, 2, -6]} intensity={1.0} color="#FFFFFF" />
      {/* Bottom bounce */}
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#FFFFFF" />
      {/* Front fill to prevent dark face */}
      <pointLight position={[0, 1, 4]} intensity={0.6} color="#FFFFFF" />
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
        className={`w-full flex items-center justify-center ${className}`}
        style={{ height: '500px', backgroundColor: '#050505' }}
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
      className={`relative w-full ${className}`}
      style={{
        height: 'min(600px, 60vh)',
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
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        style={{ background: '#050505' }}
      >
        <Suspense fallback={null}>
          <EnvironmentSetup />
          <Lighting />
          <RingWithDiamond />
          {!rotateOnly && <Controls onInteractChange={setIsInteracting} />}
        </Suspense>
      </Canvas>
      {!rotateOnly && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
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
          Drag to rotate · Scroll to zoom
        </div>
      )}
    </div>
  );
}
