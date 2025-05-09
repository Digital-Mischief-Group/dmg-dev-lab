"use client"

import { motion } from "framer-motion"

const buttonVariants = {
  hover: { scale: 1.05, borderColor: "rgba(255,255,255,0.4)" },
  tap: { scale: 0.98 },
}

export function DrumPad() {
  return (
    <motion.div
      className="p-6 bg-[#111111] border border-white/10 rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-4"
      whileHover={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="text-xs tracking-wider text-white/60 text-center mb-4">CONTROLS</div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[8.58, 4.042, 0].map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.button
              className="w-6 h-6 rounded-full border border-white/20"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
            <span className="text-[10px] text-white/60">{value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {["P1", "P2", "P3", "P4"].map((pad, i) => (
          <motion.button
            key={pad}
            className={`aspect-square ${i === 0 ? "bg-white/5" : "bg-[#0D0D0D]"} border ${
              i === 0 ? "border-white/20" : "border-white/10"
            } rounded-sm flex items-center justify-center text-sm`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {pad}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <span className="text-[10px] tracking-wider text-white/60">DRUMS</span>
      </div>
    </motion.div>
  )
}
