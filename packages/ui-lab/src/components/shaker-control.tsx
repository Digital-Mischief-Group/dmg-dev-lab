"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function ShakerControl() {
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      })
    }
  }, [])

  return (
    <div className="p-6 bg-[#111111] border border-white/10 rounded-lg space-y-8 font-mono">
      {/* Controls Header */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-1 text-xs tracking-wider">
          <span>└</span>
          <span>CONTROLS</span>
          <span>┘</span>
        </div>

        {/* Dials */}
        <div className="grid grid-cols-3 gap-8">
          {[
            { label: "L", value: "8.58" },
            { label: "R", value: "4.042" },
            { label: "T", value: "20MHz" },
          ].map((dial, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-white/80">{dial.label}</span>
              <motion.div
                className="w-6 h-6 rounded-full border border-white/40"
                whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
              />
              <span className="text-[10px] text-white/60">{dial.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Circle */}
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
          {/* Main circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" />

          {/* Connection lines */}
          <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.25" opacity="0.2" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="0.25" opacity="0.2" />

          {/* Rotating dot */}
          <circle ref={circleRef} cx="50" cy="5" r="2" fill="white" />
        </svg>

        {/* Center shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="w-2 h-2 border border-white" />
            <div className="w-2 h-2 rounded-full border border-white" />
            <div
              className="w-2 h-2 border-t-2 border-l border-r border-white"
              style={{ transform: "rotate(180deg)" }}
            />
          </div>
        </div>
      </div>

      {/* Shaker Footer */}
      <div className="flex justify-center items-center gap-1 text-xs tracking-wider">
        <span>└</span>
        <span>SHAKER</span>
        <span>┘</span>
      </div>
    </div>
  )
}
