"use client"

import { motion } from "framer-motion"
import { Card } from "@dmg/components/ui/card"

export function FeatureGrid() {
  return (
    <section className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-12 text-center"
      >
        Loved by builders, backed by founders
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Cloud or local dev"
          description="Run your agents in the cloud or locally during development."
          icon="cloud"
        />
        <FeatureCard
          title="Framework agnostic"
          description="Use with any JavaScript framework or runtime."
          icon="code"
        />
        <FeatureCard
          title="Typescript native"
          description="Built with TypeScript for better developer experience."
          icon="typescript"
        />
      </div>
    </section>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-zinc-800 bg-black p-6 h-full hover:border-zinc-700 transition-colors">
        <div className="mb-4 text-zinc-400">
          <IconPlaceholder name={icon} />
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </Card>
    </motion.div>
  )
}

function IconPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
      {name === "cloud" && <span>☁️</span>}
      {name === "code" && <span>⚙️</span>}
      {name === "typescript" && <span>TS</span>}
    </div>
  )
}
