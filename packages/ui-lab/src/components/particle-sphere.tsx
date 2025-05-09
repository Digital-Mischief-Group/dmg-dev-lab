"use client"

import { useRef, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"
import { X } from "lucide-react"

function ParticleCloud({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random points on a sphere
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const radius = 1
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08
  })

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.01} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

export function ParticleSphere() {
  const [rotating, setRotating] = useState(true)
  const [intensity, setIntensity] = useState(0.5)

  return (
    <motion.div
      className="border border-white/10 bg-[#111111] rounded-lg p-4 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      whileHover={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono">PARTICLE.SPHERE</span>
        <motion.button
          className="p-1 hover:bg-white/10 rounded"
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="h-64 w-full bg-[#0D0D0D] rounded border border-white/5 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <ambientLight intensity={intensity} />
          <ParticleCloud />
          {rotating && <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />}
        </Canvas>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-white/60 font-mono">DENSITY: {Math.round(intensity * 100)}%</span>
        <div className="flex gap-2">
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIntensity(Math.max(0.1, intensity - 0.1))}
          >
            -
          </motion.button>
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRotating(!rotating)}
          >
            {rotating ? "∥" : "▶"}
          </motion.button>
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIntensity(Math.min(1.0, intensity + 0.1))}
          >
            +
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
