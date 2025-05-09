"use client"

import { motion } from "framer-motion"
import { Card } from "@dmg/components/ui/card"

export function WorkflowSection() {
  return (
    <section className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        /workflows
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-zinc-400 mb-8 max-w-2xl"
      >
        Durable graph-based state machines with built-in tracing, designed to execute complex sequences of LLM
        operations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border border-zinc-800 bg-black p-6">
          <div className="bg-zinc-900/50 rounded-lg p-4 mb-8">
            <pre className="font-mono text-sm overflow-x-auto">
              <code className="text-blue-400">
                <div>testWorkflow</div>
                <div>.step(llm)</div>
                <div>.then(decider)</div>
                <div>.then(agentOne)</div>
                <div>.then(workflow)</div>
                <div>.after(decider)</div>
                <div>.then(agentTwo)</div>
                <div>.then(workflow)</div>
                <div>.commit();</div>
              </code>
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-2 text-blue-400 font-medium text-sm">step()</div>
              <div className="border border-zinc-700 rounded-md p-2 text-zinc-400 text-sm">llm</div>
            </div>
            <div>
              <div className="mb-2 text-blue-400 font-medium text-sm">then()</div>
              <div className="border border-zinc-700 rounded-md p-2 text-zinc-400 text-sm">decider</div>
            </div>
            <div>
              <div className="mb-2 text-blue-400 font-medium text-sm">then()</div>
              <div className="border border-green-800/50 text-green-400 rounded-md p-2 text-sm">agentOne</div>
            </div>
            <div>
              <div className="mb-2 text-blue-400 font-medium text-sm">then()</div>
              <div className="border border-green-800/50 text-green-400 rounded-md p-2 text-sm">agentTwo</div>
            </div>
            <div className="col-span-2">
              <div className="mb-2 text-blue-400 font-medium text-sm">after()</div>
              <div className="border border-zinc-700 rounded-md p-2 text-zinc-400 text-sm">workflow</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
