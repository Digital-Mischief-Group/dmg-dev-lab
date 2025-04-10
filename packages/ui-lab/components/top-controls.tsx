"use client"

import { motion } from "framer-motion"
import { ChevronDown, Moon } from "lucide-react"

export function TopControls() {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"]

  return (
    <div className="flex justify-between items-start">
      <div className="flex-1" /> {/* Spacer for logo */}
      <motion.div
        className="flex-1 flex justify-end items-start gap-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 text-sm">
            <span>dark/light</span>
            <motion.button
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <Moon className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="flex flex-col gap-1">
            <button className="flex items-center justify-between px-3 py-1.5 bg-[#111111] rounded text-sm">
              <span>By Month</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center justify-between px-3 py-1.5 bg-[#111111] rounded text-sm">
              <span>Jan 2024 - Jun 2024</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center justify-between px-3 py-1.5 bg-[#111111] rounded text-sm">
              <span>Overall</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center justify-between px-3 py-1.5 bg-[#111111] rounded text-sm">
              <span>All types</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-64 bg-[#111111] rounded-lg p-4">
          <div className="mb-4">
            <div className="text-sm mb-1">Insights</div>
            <div className="text-xs text-white/60">ショーン・ルーカス</div>
          </div>

          <div className="h-32 relative">
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0,50 Q 25,40 50,60 T 100,50" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-white/60">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
