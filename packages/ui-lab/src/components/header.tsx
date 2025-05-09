"use client"

import Link from "next/link"
import { Button } from "@dmg/components/ui/button"
import { Github } from "lucide-react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <header className="border-b border-zinc-800 py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="relative w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center"
          >
            <div className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 opacity-80"></div>
            <div className="absolute w-3 h-3 rounded-full bg-black"></div>
          </motion.div>
          <span className="font-semibold text-xl">mastra</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/showcase" className="text-zinc-400 hover:text-white transition-colors">
            Showcase
          </Link>
          <Link href="/examples" className="text-zinc-400 hover:text-white transition-colors">
            Examples
          </Link>
          <Link href="/docs" className="text-zinc-400 hover:text-white transition-colors">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/mastra-ai/mastra"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Github size={20} />
            <span className="hidden sm:inline">11.8k</span>
          </Link>
          <Button className="bg-white text-black hover:bg-zinc-200">Request Access</Button>
        </div>
      </div>
    </header>
  )
}
