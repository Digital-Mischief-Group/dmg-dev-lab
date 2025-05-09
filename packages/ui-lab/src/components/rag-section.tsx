"use client"

import { motion } from "framer-motion"
import { Card } from "@dmg/components/ui/card"

export function RagSection() {
  return (
    <section className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        *rag
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-zinc-400 mb-8 max-w-2xl"
      >
        Equip agents with the right context. Sync data from SaaS tools. Scrape the web. Pipe it into a knowledge base
        and embed, query, and rerank.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border border-zinc-800 bg-black p-6">
          <div className="flex justify-between mb-8">
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">.embed()</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">.query()</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">.rerank()</div>
          </div>

          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">input</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">embedding model</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">retrieval</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">llm</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">output</div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="border border-red-800/50 rounded-md px-3 py-1 text-red-400 text-sm">knowledge base</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">embedding model</div>
            <div className="border border-zinc-700 rounded-md px-3 py-1 text-zinc-400 text-sm">vector stores</div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
