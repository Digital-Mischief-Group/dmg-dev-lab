"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DotSphere = () => {
  const meshRef = useRef<THREE.Object3D>();
  const [dots, setDots] = useState<{ position: THREE.Vector3, scale: number }[]>([]);

  // Create dots in a circular pattern with deterministic positions
  useEffect(() => {
    const newDots: { position: THREE.Vector3, scale: number }[] = [];
    const radius = 1.6;
    const segments = 64;
    const rings = 12;

    for (let ring = 0; ring < rings; ring++) {
      const ringRadius = radius * (ring + 1) / rings;
      const circumference = 2 * Math.PI * ringRadius;
      const dotsInRing = Math.floor(circumference * 3.5);

      for (let i = 0; i < dotsInRing; i++) {
        const angle = (i / dotsInRing) * Math.PI * 2;
        // Use deterministic positioning instead of random
        const xPos = Math.cos(angle) * ringRadius * (1 + Math.sin(i * ring * 0.01) * 0.05);
        const yPos = Math.sin(angle) * ringRadius * (1 + Math.cos(i * ring * 0.01) * 0.05);
        const zPos = 0;

        // Decrease dot size as they get further from center
        const scale = 0.02 - (0.01 * ring / rings);

        newDots.push({
          position: new THREE.Vector3(xPos, yPos, zPos),
          scale
        });
      }
    }

    setDots(newDots);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle rotation animation
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.05) * 0.02;
    }
  });

  return (
    <group ref={meshRef}>
      {dots.map((dot, i) => (
        <mesh key={i} position={[dot.position.x, dot.position.y, dot.position.z]}>
          <circleGeometry args={[dot.scale, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

// Component for a glowing halo effect under the dot sphere
const GlowEffect = () => {
  return (
    <mesh position={[0, 0, -0.5]}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial
        color="#333333"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const OceanVisualizationCanvas = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace
      }}
      camera={{ position: [0, 0, 3], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <GlowEffect />
      <DotSphere />
    </Canvas>
  );
};

export const OceanVisualization = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full h-full max-w-[600px] max-h-[600px] mx-auto">
      {isMounted ? (
        <OceanVisualizationCanvas />
      ) : (
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full bg-black border border-gray-800"></div>
        </div>
      )}
    </div>
  );
};
