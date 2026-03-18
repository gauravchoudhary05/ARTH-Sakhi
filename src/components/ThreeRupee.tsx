'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Center, Environment } from '@react-three/drei';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

// ─── 1. DESKTOP SPECIFIC CODE ─────────────────────────────────────────────────
function DesktopRupee({ scrollRef, shapes, extrudeSettings }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const s = scrollRef.current;

    // Desktop Math: Stays safely on screen with 3.5 padding
    const horizontalEdge = (viewport.width / 2) - 3.5;
    const topEdge = (viewport.height / 2) - 3.0;
    const bottomEdge = -(viewport.height / 2) + 3.0;

    const targetPosX = Math.cos(s * Math.PI * 3) * -horizontalEdge;
    const targetPosY = topEdge - (s * (topEdge - bottomEdge));
    const targetRotY = 0.2 + (s * Math.PI * 8);
    const targetRotZ = 0.4 + (s * 0.1);

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, delta * 4);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, delta * 4);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 4);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <Center>
          <mesh scale={[0.008, -0.008, 0.008]}>
            <extrudeGeometry args={[shapes, extrudeSettings]} />
            <meshStandardMaterial color="#D4926F" metalness={0.95} roughness={0.15} envMapIntensity={2.5} />
          </mesh>
        </Center>
      </group>
    </Float>
  );
}

// ─── 2. MOBILE SPECIFIC CODE ──────────────────────────────────────────────────
function MobileRupee({ scrollRef, shapes, extrudeSettings }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const s = scrollRef.current;

    // Mobile Math: Massive swing (12.0) to sweep completely off screen
    const horizontalSwing = 12.0;
    const topEdge = (viewport.height / 2) - 3.0;
    const bottomEdge = -(viewport.height / 2) + 3.0;

    const targetPosX = Math.cos(s * Math.PI * 3) * -horizontalSwing;
    const targetPosY = topEdge - (s * (topEdge - bottomEdge));
    const targetRotY = 0.2 + (s * Math.PI * 8);
    const targetRotZ = 0.4 + (s * 0.1);

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, delta * 4);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, delta * 4);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 4);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <Center>
          <mesh scale={[0.008, -0.008, 0.008]}> {/* Stays full size! */}
            <extrudeGeometry args={[shapes, extrudeSettings]} />
            <meshStandardMaterial color="#D4926F" metalness={0.95} roughness={0.15} envMapIntensity={2.5} />
          </mesh>
        </Center>
      </group>
    </Float>
  );
}

// ─── 3. THE SWITCHER COMPONENT ────────────────────────────────────────────────
function ResponsiveRupee({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { viewport } = useThree();

  // Create the shape data ONCE and pass it to whichever component is active
  const shapes = useMemo(() => {
    const svg = `<svg viewBox="0 0 320 512"><path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h67.46C96.9 110.6 117.8 138 131.6 172.5H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h125.6c-10.7 44.5-44.1 79.4-89.6 86.8v6.2c0 20.3 11.2 38.6 28.7 48.4L202.9 455c8.3 4.7 18.7 2.9 25.1-4.2l28.6-31.7c6.1-6.8 4.9-17.5-2.5-22.9l-118.8-87.1c42.8-12.2 78-43 94.7-84.6H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-74.9c-2-12.7-5.4-24.8-10-36.5H308z"/></svg>`;
    const loader = new SVGLoader();
    return loader.parse(svg).paths.flatMap(p => p.toShapes(true));
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 12, bevelEnabled: true, bevelThickness: 1.5, bevelSize: 1, bevelSegments: 4, curveSegments: 32,
  }), []);

  // Detect Mobile
  const isMobile = viewport.width < 5;

  // Render the correct component!
  if (isMobile) {
    return <MobileRupee scrollRef={scrollRef} shapes={shapes} extrudeSettings={extrudeSettings} />;
  } else {
    return <DesktopRupee scrollRef={scrollRef} shapes={shapes} extrudeSettings={extrudeSettings} />;
  }
}

// ─── FULL 3D SCENE ────────────────────────────────────────────────────────────
function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={1.0} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffe5c8" />
      <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#c5d5ff" />
      <Environment preset="studio" />
      <ResponsiveRupee scrollRef={scrollRef} />
    </>
  );
}

// ─── SCROLL VALUE BRIDGE & MAIN COMPONENT (REMAIN SAME) ───────────────────────
function ScrollBridge({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (v) => { scrollRef.current = v; });
  return null;
}

export default function ThreeRupee() {
  const scrollRef = useRef(0);
  return (
    <>
      <ScrollBridge scrollRef={scrollRef} />
      <div className="fixed inset-0 w-screen h-screen pointer-events-none" style={{ zIndex: 99, left: 0, top: 0 }} aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ width: '100vw', height: '100vh' }}>
          <Suspense fallback={null}><Scene scrollRef={scrollRef} /></Suspense>
        </Canvas>
      </div>
    </>
  );
}