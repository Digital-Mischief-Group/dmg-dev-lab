"use client"

import { motion } from "framer-motion"

export function CenterSection() {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 my-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm">form/func</span>
        <div className="flex gap-2">
          <div className="w-8 h-12 bg-white rounded-sm" />
          <div className="flex flex-col gap-2">
            <div className="w-8 h-6 bg-white rounded-sm" />
            <div className="w-8 h-6 bg-white rounded-sm" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-sm">
        <span>i lucid</span>
        <div className="w-2 h-4 bg-white animate-pulse" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">src_of_ref</span>
        <span className="text-xs text-white/60">セレスティア</span>
      </div>
    </motion.div>
  )
}
