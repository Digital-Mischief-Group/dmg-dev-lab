"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@dmg/components/ui/card"
import {
  UnifiedProviderIllustration,
  MemoryIllustration,
  PromptTuningIllustration,
  ToolCallingIllustration,
} from "@dmg/components/feature-illustrations"

export function AgentInterface() {
  return (
    <section className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        /agents
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-zinc-400 mb-8 max-w-2xl"
      >
        Build intelligent agents that execute tasks, access knowledge bases, and maintain memory persistently within
        threads.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border border-zinc-800 bg-black overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Code and diagram */}
            <div className="w-full lg:w-1/2 border-r border-zinc-800 p-4">
              <div className="border border-white/10 rounded-md p-3">
                <div className="bg-zinc-900/50 rounded-lg p-4 mb-8">
                  <pre className="font-mono text-sm overflow-x-auto">
                    <CodeSnippet />
                  </pre>
                </div>

                <div className="relative px-2 py-4">
                  {/* Connection lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 500 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Horizontal line connecting input, agent, output */}
                    <path
                      d="M100 40 L250 40 L400 40"
                      stroke="#1AFB6F"
                      strokeWidth="2"
                      strokeDasharray="4"
                      opacity="0.5"
                    />

                    {/* Vertical line from agent to middle row */}
                    <path d="M250 50 L250 90" stroke="#1AFB6F" strokeWidth="2" strokeDasharray="4" opacity="0.5" />

                    {/* Horizontal line connecting llm, memory, tools */}
                    <path
                      d="M100 100 L250 100 L400 100"
                      stroke="#1AFB6F"
                      strokeWidth="2"
                      strokeDasharray="4"
                      opacity="0.5"
                    />

                    {/* Vertical lines from middle row to bottom row */}
                    <path
                      d="M100 110 L100 150 M250 110 L250 150 M400 110 L400 150"
                      stroke="#1AFB6F"
                      strokeWidth="2"
                      strokeDasharray="4"
                      opacity="0.5"
                    />

                    {/* Horizontal line connecting workflow and rag */}
                    <path d="M175 150 L325 150" stroke="#1AFB6F" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
                  </svg>

                  {/* First row */}
                  <div className="flex justify-between mb-12 relative z-10">
                    <DiagramBadge text="input" icon="target" />
                    <DiagramBadge text="agent" icon="agent" active />
                    <DiagramBadge text="output" icon="target" />
                  </div>

                  {/* Second row */}
                  <div className="flex justify-between mb-12 relative z-10">
                    <DiagramBadge text="llm" icon="llm" active />
                    <DiagramBadge text="memory" icon="memory" />
                    <DiagramBadge text="tools" icon="tools" active />
                  </div>

                  {/* Third row */}
                  <div className="flex justify-around relative z-10">
                    <DiagramBadge text="workflow" icon="workflow" active />
                    <DiagramBadge text="rag" icon="rag" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Features */}
            <div className="w-full lg:w-1/2 flex flex-col h-full">
              <FeaturePanel
                title="Unified provider API"
                description="Switch between AI providers by changing a single line of code using the AI SDK"
                icon="unified-api"
                illustration={<UnifiedProviderIllustration />}
                className="flex-1"
              />
              <FeaturePanel
                title="Memory"
                description="Combine long-term memory with recent messages for more robust agent recall"
                icon="book"
                illustration={<MemoryIllustration />}
                className="flex-1"
              />
              <FeaturePanel
                title="Prompt tuning"
                description="Bootstrap, iterate, and eval prompts in a local playground with LLM assistance."
                icon="message"
                illustration={<PromptTuningIllustration />}
                className="flex-1"
              />
              <FeaturePanel
                title="Tool calling"
                description="Allow agents to call your functions, interact with other systems, and trigger real-world actions"
                icon="tools"
                illustration={<ToolCallingIllustration />}
                isLast
                className="flex-1"
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}

function CodeSnippet() {
  return (
    <code className="text-green-400">
      <div>
        <span className="text-pink-500">const</span> chefAgent = <span className="text-pink-500">new</span>{" "}
        <span className="text-blue-400">Agent</span>
        {"({"}
      </div>
      <div>
        {" "}
        name: <span className="text-green-300">'Chef Agent'</span>,
      </div>
      <div> instructions:</div>
      <div>
        {" "}
        <span className="text-green-300">"You are Michel, a practical and experienced home chef"</span> +
      </div>
      <div>
        {" "}
        <span className="text-green-300">"who helps people cook great meals."</span>
      </div>
      <div>
        {" "}
        model: <span className="text-blue-400">openai</span>(<span className="text-green-300">'gpt-4o-mini'</span>),
      </div>
      <div> memory,</div>
      <div> workflow: {"{ chefWorkflow }"}</div>
      <div>{"})"}</div>
    </code>
  )
}

function DiagramBadge({ text, icon, active = false }: { text: string; icon: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center ${
        active ? "bg-zinc-900 border-green-500 text-green-400" : "bg-zinc-900 border-zinc-700 text-zinc-400"
      } border rounded-md overflow-hidden h-10`}
    >
      <div className="bg-zinc-800 p-2 h-full flex items-center border-r border-zinc-700">
        <IconPlaceholder name={icon} active={active} />
      </div>
      <div className="px-3 py-1 font-medium text-sm">
        {text}
        {active && text === "agent" && <div className="text-xs text-green-400 opacity-70">you are a...</div>}
      </div>
    </div>
  )
}

function FeaturePanel({
  title,
  description,
  icon,
  illustration,
  isLast = false,
  className = "",
}: {
  title: string
  description: string
  icon: string
  illustration: React.ReactNode
  isLast?: boolean
  className?: string
}) {
  return (
    <div
      className={`p-6 ${!isLast && "border-b border-zinc-800"} hover:bg-zinc-900/50 transition-colors group flashlight relative ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <IconPlaceholder name={icon} />
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-zinc-400 text-sm max-w-[70%]">{description}</p>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 transition-all duration-300">
        {illustration}
      </div>
    </div>
  )
}

function IconPlaceholder({ name, active = false }: { name: string; active?: boolean }) {
  // In a real implementation, you would use actual icons
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center rounded-sm ${active ? "text-green-400" : "text-zinc-400"}`}
    >
      {name === "target" && <span>◎</span>}
      {name === "agent" && <span>⚙</span>}
      {name === "llm" && <span>⚡</span>}
      {name === "book" && <span>📖</span>}
      {name === "tools" && <span>🔧</span>}
      {name === "workflow" && <span>📊</span>}
      {name === "knowledge-base" && <span>🧠</span>}
      {name === "unified-api" && <span>🔌</span>}
      {name === "message" && <span>💬</span>}
      {name === "memory" && <span>📖</span>}
      {name === "rag" && <span>🧠</span>}
    </div>
  )
}

function FeatureGraphic() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
      <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
