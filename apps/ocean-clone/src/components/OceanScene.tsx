"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Sphere, MeshDistortMaterial, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

// Move clientside animations to a useEffect to avoid hydration issues
const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.01 * delta;
      sphereRef.current.rotation.y += 0.005 * delta;
      // Add subtle movement to make it more lively
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]} scale={[1, 1, 1]}>
      <Sphere ref={sphereRef} args={[1.8, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00ff88"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </Sphere>
      {/* Add a subtle glow effect with a larger sphere */}
      <Sphere args={[2.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#00ff88" transparent opacity={0.05} />
      </Sphere>
    </group>
  );
};

const LensFlare = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 3;
      ref.current.position.y = Math.cos(clock.getElapsedTime() * 0.2) * 2;
    }
  });

  return (
    <mesh ref={ref} position={[3, 2, -2]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
};

const SphereWithEffects = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 6;
  }, [camera]);

  return (
    <>
      <AnimatedSphere />
      <LensFlare />
      <hemisphereLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <spotLight position={[-5, 5, 2]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[0, 0, -5]} intensity={0.5} color="#00ff88" />
      <Environment preset="city" />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={15}
        blur={2}
        far={5}
      />
    </>
  );
};

const OceanSceneClient = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <SphereWithEffects />
      </Suspense>
      <color attach="background" args={["#000000"]} />
    </Canvas>
  );
};

// Wrap the component to avoid hydration issues
export const OceanScene = () => {
  const [mounted, setMounted] = useState(false);

  // Only render the scene after mounting on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute h-full w-full z-0 pointer-events-none">
      {mounted ? <OceanSceneClient /> : <div className="h-full w-full bg-black" />}
    </div>
  );
};
