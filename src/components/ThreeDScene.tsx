'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';

// Using a custom geometry to represent the "women in a circle holding hands" concept
// Since we don't have a specific GLTF model, we'll build an abstract representation
// using primitives that conveys community, growth, and the brand colors.
function CommunitySymbol() {
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
    >
      <group rotation={[0.2, 0, 0]}>
        {/* Central Core (Growth) */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshStandardMaterial color="#B66D4B" roughness={0.3} metalness={0.2} />
        </mesh>
        
        {/* Three abstract figures (Community) */}
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3;
          const radius = 1.2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <group key={i} position={[x, 0.5, z]} rotation={[0, angle, 0]}>
              {/* Body */}
              <mesh position={[0, 0, 0]}>
                <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
                <meshStandardMaterial color="#1B3022" roughness={0.2} metalness={0.1} />
              </mesh>
              {/* Head */}
              <mesh position={[0, 0.7, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="#1B3022" roughness={0.2} metalness={0.1} />
              </mesh>
            </group>
          );
        })}
        
        {/* Connecting Ring (Holding Hands / Unity) */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 64]} />
          <meshStandardMaterial color="#D4926F" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeDScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none sm:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#FFFBF0" />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#B66D4B" />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <CommunitySymbol />
          </PresentationControls>
          {/* Preset environment for beautiful realistic lighting */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
