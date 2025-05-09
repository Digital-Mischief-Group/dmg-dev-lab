"use client"

import React from "react"

import { motion } from "framer-motion"
import { MoreHorizontal } from "lucide-react"

export function BottomSlider() {
  // Define the sections and their controls
  const sections = [
    {
      label: "ENV",
      controls: [
        { type: "knob", value: "0" },
        { type: "knob", value: "1" },
      ],
    },
    {
      label: "MOD",
      controls: [
        { type: "knob", value: "2" },
        { type: "knob", value: "3" },
      ],
    },
    {
      label: "SLIDER",
      controls: [
        { type: "knob", value: "4" },
        { type: "knob", value: "5" },
        { type: "knob", value: "6" },
        { type: "knob", value: "7" },
      ],
    },
    {
      label: "FLT",
      controls: [
        { type: "knob", value: "8" },
        { type: "knob", value: "9" },
      ],
    },
    {
      label: "EFX",
      controls: [
        { type: "knob", value: "10" },
        { type: "knob", value: "11" },
      ],
    },
  ]

  return (
    <>
      {/* Top Row - Controls */}
      {sections.map((section, sectionIndex) => (
        <React.Fragment key={sectionIndex}>
          <motion.div
            className="text-[10px] uppercase tracking-wider text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 * sectionIndex }}
          >
            {section.label}
          </motion.div>
          <div className={`flex items-center ${section.label === "SLIDER" ? "gap-4" : "gap-2"}`}>
            {section.controls.map((control, controlIndex) => (
              <motion.button
                key={controlIndex}
                className="group relative w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"
                whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * (sectionIndex + controlIndex),
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <span className="text-[10px] text-white/60 group-hover:text-white">{control.value}</span>
              </motion.button>
            ))}
          </div>
        </React.Fragment>
      ))}

      {/* Bottom Row - Progress Bar */}
      <div className="flex items-center gap-6">
        <div className="flex-1 h-1 bg-[#111111] rounded-full relative">
          <motion.div
            className="absolute left-1/3 top-1/2 -translate-y-1/2"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] text-yellow-400 font-medium tracking-wider">
                HOLD
              </div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium tracking-wider">92.00</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-1 h-4 bg-white/20 rounded-full" />
            <div className="w-1 h-4 bg-white/40 rounded-full" />
            <div className="w-1 h-4 bg-white/60 rounded-full" />
          </div>
          <motion.button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreHorizontal className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </>
  )
}
