"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"

const buttonVariants = {
  hover: { scale: 1.05, borderColor: "rgba(255,255,255,0.4)" },
  tap: { scale: 0.98 },
}

export function FrequencyAnalyzer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.beginPath()
      ctx.strokeStyle = "rgba(255,255,255,0.4)"
      ctx.lineWidth = 1

      // Draw frequency response curve
      ctx.moveTo(0, canvas.height * 0.2)
      ctx.bezierCurveTo(
        canvas.width * 0.3,
        canvas.height * 0.4,
        canvas.width * 0.6,
        canvas.height * 0.6,
        canvas.width,
        canvas.height * 0.8,
      )

      ctx.stroke()
    }

    drawGraph()
  }, [])

  return (
    <motion.div
      className="border border-white/10 bg-[#111111] rounded-lg p-4 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
      whileHover={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm">Analyser</span>
        <motion.button
          className="p-1 hover:bg-white/10 rounded"
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.canvas
        ref={canvasRef}
        className="w-full h-40 bg-[#0D0D0D] rounded border border-white/5"
        width={600}
        height={200}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />

      <div className="flex items-center justify-between text-sm">
        <span>LUCID</span>
        <div className="flex gap-2">
          {["-", "○", "+"].map((symbol, index) => (
            <motion.button
              key={index}
              className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {symbol}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
