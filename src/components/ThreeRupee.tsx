'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Center, Environment } from '@react-three/drei';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

// ─── R3F INNER MESH (TRUE 3D EXTRUSION) ──────────────────────────────────────

function RupeeMesh({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree(); // Gets the exact screen width in 3D units

  // 1. Build a solid 3D shape from a perfect SVG path
  const shapes = useMemo(() => {
    const svg = `<svg viewBox="0 0 320 512"><path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h67.46C96.9 110.6 117.8 138 131.6 172.5H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h125.6c-10.7 44.5-44.1 79.4-89.6 86.8v6.2c0 20.3 11.2 38.6 28.7 48.4L202.9 455c8.3 4.7 18.7 2.9 25.1-4.2l28.6-31.7c6.1-6.8 4.9-17.5-2.5-22.9l-118.8-87.1c42.8-12.2 78-43 94.7-84.6H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-74.9c-2-12.7-5.4-24.8-10-36.5H308z"/></svg>`;
    const loader = new SVGLoader();
    const data = loader.parse(svg);
    return data.paths.flatMap(p => p.toShapes(true));
  }, []);

  // 2. Extrude it into a sleek piece of metal
  const extrudeSettings = useMemo(() => ({
    depth: 12,
    bevelEnabled: true,
    bevelThickness: 1.5,
    bevelSize: 1,
    bevelSegments: 4,
    curveSegments: 32,
  }), []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const s = scrollRef.current;

    // --- THE TRUE EDGE MATH WITH PADDING ---
    // Increased the padding from 1.5 to 3.5 to keep the edges of the symbol visible
    const horizontalEdge = (viewport.width / 2) - 3.5;

    // Vertical padding prevents "head" and "feet" clipping
    const topEdge = (viewport.height / 2) - 3.0;
    const bottomEdge = -(viewport.height / 2) + 3.0;

    // X-Axis: Weave from left to right
    const targetPosX = Math.cos(s * Math.PI * 3) * -horizontalEdge;

    // Y-Axis: Starts at safe topEdge, ends at safe bottomEdge
    const targetPosY = topEdge - (s * (topEdge - bottomEdge));

    // --- PERFECT STARTING POSTURE ---
    // Y-Axis Spin: ADDING 0.2 exposes the RIGHT-SIDE depth perfectly
    const targetRotY = 0.2 + (s * Math.PI * 8);

    // Z-Axis Tilt: POSITIVE 0.4 leans the top to the left (counter-clockwise)
    const targetRotZ = 0.4 + (s * 0.1);

    // Smooth movement execution
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, delta * 4);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, delta * 4);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 4);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0, 0]}>
        <Center>
          <mesh scale={[0.008, -0.008, 0.008]}>
            <extrudeGeometry args={[shapes, extrudeSettings]} />
            <meshStandardMaterial
              color="#D4926F"
              metalness={0.95}
              roughness={0.15}
              envMapIntensity={2.5}
            />
          </mesh>
        </Center>
      </group>
    </Float>
  );
}

// ─── FULL 3D SCENE ────────────────────────────────────────────────────────────

function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={1.0} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffe5c8" />
      <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#c5d5ff" />
      <Environment preset="studio" />
      <RupeeMesh scrollRef={scrollRef} />
    </>
  );
}

// ─── SCROLL VALUE BRIDGE ──────────────────────────────────────────────────────

function ScrollBridge({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v;
  });
  return null;
}

// ─── PUBLIC COMPONENT ─────────────────────────────────────────────────────────

export default function ThreeRupee() {
  const scrollRef = useRef(0);

  return (
    <>
      <ScrollBridge scrollRef={scrollRef} />

      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        style={{ zIndex: 99, left: 0, top: 0 }}
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <Suspense fallback={null}>
            <Scene scrollRef={scrollRef} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}