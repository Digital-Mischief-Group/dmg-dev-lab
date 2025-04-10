"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AudioWaveformIcon as Waveform, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 30,
        ease: "none",
        paused: !isPlaying,
      })
    }
  }, [isPlaying])

  const controls = [
    { label: "F", onClick: () => console.log("F clicked") },
    { label: "R", onClick: () => console.log("R clicked") },
    { label: "G", onClick: () => console.log("G clicked") },
  ]

  const rightControls = [
    { icon: "□", onClick: () => console.log("Square clicked") },
    { icon: "⟳", onClick: () => console.log("Circle clicked") },
    { icon: "△", onClick: () => console.log("Triangle clicked") },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center" ref={containerRef}>
      <div className="w-full max-w-6xl px-8 py-12 relative">
        {/* Scroll Text */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs tracking-widest">
          <div className="h-px w-12 bg-white/20" />
          <span className="rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
        </div>

        {/* Right Controls */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {rightControls.map((control, index) => (
            <motion.button
              key={index}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={control.onClick}
            >
              {control.icon}
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold tracking-tight"
          >
            THE MUSIC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            The music below is a curated playlist of songs prototyped in deep moments.
          </motion.p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 pt-4">
            {controls.map((control, index) => (
              <motion.button
                key={index}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={control.onClick}
              >
                {control.label}
              </motion.button>
            ))}
            <motion.button
              className="px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 ml-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Waveform className="w-4 h-4" />
              ANALYSE AUDIO
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <div className="flex-1 h-px bg-white/20 relative">
              <motion.div ref={progressRef} className="absolute inset-0 bg-white origin-left" initial={{ scaleX: 0 }} />
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
