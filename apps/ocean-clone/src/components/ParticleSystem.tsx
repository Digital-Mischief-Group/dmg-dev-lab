"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const ParticleSystemFallback = () => (
  <div className="absolute inset-0 z-0 pointer-events-none bg-black">
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-[#00ff88]/10 animate-pulse"></div>
    </div>
  </div>
);

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render after component is mounted client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !loaded) return;

    // Create a script element for the particle system
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
      import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
      import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
      import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
      import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';

      let container;
      let camera, scene, renderer;
      let particles, particleSystem;
      let mouseX = 0, mouseY = 0;
      let windowHalfX = window.innerWidth / 2;
      let windowHalfY = window.innerHeight / 2;
      let particlePositions, particleVelocities;
      let controls, composer;
      let currentShape = 'sphere';

      init();
      animate();

      function init() {
          container = document.getElementById('particle-container');
          if (!container) return;

          camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
          camera.position.z = 1000;

          scene = new THREE.Scene();

          const particlesCount = 6000;
          const geometry = new THREE.BufferGeometry();
          particlePositions = new Float32Array(particlesCount * 3);
          particleVelocities = new Float32Array(particlesCount * 3);

          createShape('sphere', particlesCount, 400);

          geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

          const material = new THREE.PointsMaterial({ color: 0x888888, size: 2 });

          particleSystem = new THREE.Points(geometry, material);
          scene.add(particleSystem);

          renderer = new THREE.WebGLRenderer({ alpha: true });
          renderer.setClearColor(0x000000, 0);
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight);

          // Clear existing content in container and append renderer
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          container.appendChild(renderer.domElement);

          controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.25;
          controls.screenSpacePanning = false;
          controls.maxPolarAngle = Math.PI / 2;
          controls.enabled = false; // Disable user controls

          const renderScene = new RenderPass(scene, camera);

          const bloomPass = new UnrealBloomPass(
              new THREE.Vector2(window.innerWidth, window.innerHeight),
              1.5,
              0.4,
              0.85
          );
          bloomPass.threshold = 0;
          bloomPass.strength = 1.5;
          bloomPass.radius = 0;

          composer = new EffectComposer(renderer);
          composer.addPass(renderScene);
          composer.addPass(bloomPass);

          document.addEventListener('pointermove', onPointerMove, false);
          window.addEventListener('resize', onWindowResize, false);
      }

      function createShape(shape, particlesCount, radius) {
          // Use deterministic seed for particle positions to avoid hydration issues
          const seed = 12345;
          let randomValue = seed;

          // Simple deterministic random function
          const deterministicRandom = () => {
            randomValue = (randomValue * 9301 + 49297) % 233280;
            return randomValue / 233280;
          };

          for (let i = 0; i < particlesCount; i++) {
              let x, y, z;
              switch (shape) {
                  case 'sphere':
                      const theta = deterministicRandom() * 2 * Math.PI;
                      const phi = Math.acos(2 * deterministicRandom() - 1);
                      x = radius * Math.sin(phi) * Math.cos(theta);
                      y = radius * Math.sin(phi) * Math.sin(theta);
                      z = radius * Math.cos(phi);
                      break;
                  case 'mirror':
                      if (i < particlesCount / 5) {
                          x = deterministicRandom() * radius - radius / 2;
                          y = deterministicRandom() * radius - radius / 2;
                          z = radius / 2;
                      } else {
                          x = deterministicRandom() * radius - radius / 2;
                          y = deterministicRandom() * radius - radius / 2;
                          z = -radius / 2;
                      }
                      break;
                  case 'cube':
                      x = deterministicRandom() * radius - radius / 2;
                      y = deterministicRandom() * radius - radius / 2;
                      z = deterministicRandom() * radius - radius / 2;
                      break;
              }

              particlePositions[i * 3] = x;
              particlePositions[i * 3 + 1] = y;
              particlePositions[i * 3 + 2] = z;

              particleVelocities[i * 3] = (deterministicRandom() - 0.5) * 2;
              particleVelocities[i * 3 + 1] = (deterministicRandom() - 0.5) * 2;
              particleVelocities[i * 3 + 2] = (deterministicRandom() - 0.5) * 2;
          }
      }

      function onPointerMove(event) {
          if (event.isPrimary === false) return;

          mouseX = (event.clientX - windowHalfX) * 2;
          mouseY = (event.clientY - windowHalfY) * 2;
      }

      function onWindowResize() {
          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;

          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);
          composer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
          requestAnimationFrame(animate);
          render();
      }

      function render() {
          const positions = particleSystem.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
              // Move particles randomly
              positions[i] += particleVelocities[i] * 0.2;
              positions[i + 1] += particleVelocities[i + 1] * 0.2;
              positions[i + 2] += particleVelocities[i + 2] * 0.2;

              // Keep particles within shape bounds
              let dist;
              switch (currentShape) {
                  case 'sphere':
                      dist = Math.sqrt(
                          positions[i] * positions[i] +
                          positions[i + 1] * positions[i + 1] +
                          positions[i + 2] * positions[i + 2]
                      );
                      if (dist > 400) {
                          const factor = 400 / dist;
                          positions[i] *= factor;
                          positions[i + 1] *= factor;
                          positions[i + 2] *= factor;
                      }
                      break;
                  case 'mirror':
                      const mirrorHeight = 400;
                      if (Math.abs(positions[i + 2]) > mirrorHeight / 2) {
                          positions[i + 2] = Math.sign(positions[i + 2]) * mirrorHeight / 2;
                      }
                      break;
                  case 'cube':
                      if (Math.abs(positions[i]) > 200) positions[i] = Math.sign(positions[i]) * 200;
                      if (Math.abs(positions[i + 1]) > 200) positions[i + 1] = Math.sign(positions[i + 1]) * 200;
                      if (Math.abs(positions[i + 2]) > 200) positions[i + 2] = Math.sign(positions[i + 2]) * 200;
                      break;
              }

              // Mouse repulsion
              const dx = (mouseX - positions[i]);
              const dy = (-mouseY - positions[i + 1]);
              const mouseDist = Math.sqrt(dx * dx + dy * dy);
              const repulsionForce = Math.max(0, 300 - mouseDist) * 0.1;

              if (mouseDist > 0) {
                  positions[i] -= (dx / mouseDist) * repulsionForce;
                  positions[i + 1] -= (dy / mouseDist) * repulsionForce;
              }
          }

          particleSystem.geometry.attributes.position.needsUpdate = true;

          // Rotate the scene slowly
          particleSystem.rotation.y += 0.0005;

          controls.update();
          composer.render();
      }
    `;

    document.body.appendChild(script);

    return () => {
      // Clean up
      document.body.removeChild(script);
      const container = document.getElementById('particle-container');
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, [mounted, loaded]);

  if (!mounted) {
    return <ParticleSystemFallback />;
  }

  return (
    <>
      <Script
        src="https://cdn.skypack.dev/three@0.136.0"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      <div
        id="particle-container"
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      />
      {!loaded && <ParticleSystemFallback />}
    </>
  );
}
