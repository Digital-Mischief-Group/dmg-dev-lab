"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="w-full py-20 border-b border-zinc-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,128,0,0.1),transparent_70%)]"></div>
        <div className="grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] h-full w-full opacity-20">
          {Array.from({ length: 20 }).map((_, rowIndex) =>
            Array.from({ length: 20 }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="border-[0.5px] border-zinc-800" />
            )),
          )}
        </div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm border border-green-500/30">
              FRI APR 12 @ 9AM PT • MCP + Mastra: Build a Personal Assistant
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            The TypeScript
            <br />
            Agent Framework
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg mb-8"
          >
            From the team that brought you{" "}
            <Link href="https://www.gatsbyjs.com/" className="text-white underline underline-offset-4">
              Gatsby
            </Link>
            : prototype and productionize AI features with a modern Javascript stack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-md p-4 font-mono text-sm mb-8"
          >
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">$</span>
              <span>npm create mastra@latest</span>
            </div>
            <div className="text-zinc-500 text-xs mt-1">press to copy</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
