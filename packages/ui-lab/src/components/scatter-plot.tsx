"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

// Generate some random data points
const generateData = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    intensity: Math.random(),
  }))
}

export function ScatterPlot() {
  const [data] = useState(() => generateData(30))
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let i = 0; i <= 10; i++) {
        const x = (canvas.width / 10) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let i = 0; i <= 10; i++) {
        const y = (canvas.height / 10) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw axes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1

      // X-axis
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - 20)
      ctx.lineTo(canvas.width, canvas.height - 20)
      ctx.stroke()

      // Y-axis
      ctx.beginPath()
      ctx.moveTo(20, 0)
      ctx.lineTo(20, canvas.height)
      ctx.stroke()
    }

    drawGrid()
  }, [])

  return (
    <motion.div
      className="border border-white/10 bg-[#111111] rounded-lg p-4 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      whileHover={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono">SCATTER.PLOT</span>
        <motion.button
          className="p-1 hover:bg-white/10 rounded"
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="relative h-64 w-full bg-[#0D0D0D] rounded border border-white/5">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={600} height={300} />

        {/* Data points */}
        {data.map((point, index) => (
          <motion.div
            key={index}
            className="absolute w-1.5 h-1.5 rounded-full bg-white"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              opacity: hoveredPoint === index ? 1 : 0.2 + point.intensity * 0.8,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: hoveredPoint === index ? 1.5 : 1,
              opacity: hoveredPoint === index ? 1 : 0.2 + point.intensity * 0.8,
            }}
            transition={{ delay: index * 0.02, type: "spring" }}
            onMouseEnter={() => setHoveredPoint(index)}
            onMouseLeave={() => setHoveredPoint(null)}
            whileHover={{ scale: 1.5, opacity: 1 }}
          />
        ))}

        {/* Axis labels */}
        <div className="absolute bottom-1 right-2 text-[10px] text-white/40 font-mono">100.0</div>
        <div className="absolute top-2 left-2 text-[10px] text-white/40 font-mono">100.0</div>
        <div className="absolute bottom-1 left-2 text-[10px] text-white/40 font-mono">0.0</div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-white/60 font-mono">DISTRIBUTION</span>
        <div className="flex gap-2">
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            -
          </motion.button>
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            +
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
