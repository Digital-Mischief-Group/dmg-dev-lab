"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

interface Node {
  id: string
  label: string
  type: "square" | "circle" | "hexagon" | "triangle"
  position: { x: number; y: number }
  number?: number
  isMain?: boolean
  isPlus?: boolean
  connections: Connection[]
  labelColor?: string
}

interface Connection {
  to: string
  type: "solid" | "dashed"
  path: string
}

export default function InteractiveDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)

  const nodes: Node[] = [
    {
      id: "andrew",
      label: "Andrew Trousdale\nb. 1995",
      type: "circle",
      position: { x: 50, y: 50 },
      isMain: true,
      connections: [],
    },
    {
      id: "character",
      label: "Character\nDevelopment",
      type: "square",
      position: { x: 25, y: 20 },
      connections: [{ to: "positive", type: "solid", path: "M25,25 L35,35" }],
    },
    {
      id: "positive",
      label: "Positive Psychology",
      type: "hexagon",
      position: { x: 35, y: 35 },
      number: 3,
      connections: [{ to: "andrew", type: "solid", path: "M35,35 L50,50" }],
    },
    {
      id: "narratives",
      label: "Personal Narratives",
      type: "square",
      position: { x: 15, y: 35 },
      labelColor: "text-gray-500",
      connections: [{ to: "positive", type: "dashed", path: "M15,35 L35,35" }],
    },
    {
      id: "friction",
      label: "Friction Paper",
      type: "square",
      position: { x: 15, y: 50 },
      isPlus: true,
      connections: [{ to: "andrew", type: "solid", path: "M15,50 L50,50" }],
    },
    {
      id: "information",
      label: "Information",
      type: "circle",
      position: { x: 50, y: 25 },
      connections: [{ to: "andrew", type: "solid", path: "M50,25 L50,50" }],
    },
    {
      id: "social",
      label: "Social Intervention",
      type: "circle",
      position: { x: 65, y: 40 },
      number: 4,
      connections: [{ to: "andrew", type: "solid", path: "M65,40 L50,50" }],
    },
    {
      id: "apossible",
      label: "APOSSIBLE",
      type: "triangle",
      position: { x: 75, y: 25 },
      connections: [{ to: "social", type: "dashed", path: "M75,25 L65,40" }],
    },
    {
      id: "festival",
      label: "The Festival of Urgent\nReinventions",
      type: "triangle",
      position: { x: 75, y: 50 },
      connections: [{ to: "social", type: "dashed", path: "M75,50 L65,40" }],
    },
    {
      id: "machines",
      label: "Interactive Machines",
      type: "hexagon",
      position: { x: 50, y: 60 },
      number: 2,
      connections: [{ to: "andrew", type: "solid", path: "M50,60 L50,50" }],
    },
    {
      id: "expression",
      label: "Human Expression",
      type: "hexagon",
      position: { x: 40, y: 70 },
      number: 1,
      connections: [{ to: "machines", type: "solid", path: "M40,70 L50,60" }],
    },
    {
      id: "evolutionary",
      label: "Evolutionary Systems",
      type: "hexagon",
      position: { x: 40, y: 85 },
      number: 5,
      connections: [{ to: "expression", type: "solid", path: "M40,85 L40,70" }],
    },
  ]

  useEffect(() => {
    if (!svgRef.current) return

    // Animation with GSAP
    const timeline = gsap.timeline()

    // Animate nodes
    nodes.forEach((node, index) => {
      timeline.fromTo(
        `#node-${node.id}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
        index * 0.1,
      )
    })

    // Animate connections
    nodes.forEach((node) => {
      node.connections.forEach((connection, index) => {
        timeline.fromTo(
          `#connection-${node.id}-${connection.to}`,
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" },
          0.5 + index * 0.1,
        )
      })
    })
  }, [])

  const renderNode = (node: Node) => {
    let nodeElement = null

    switch (node.type) {
      case "square":
        nodeElement = node.isPlus ? (
          <div className="w-5 h-5 border border-black flex items-center justify-center">
            <span className="text-xs">+</span>
          </div>
        ) : (
          <div className="w-5 h-5 border border-black"></div>
        )
        break
      case "circle":
        nodeElement = node.isMain ? (
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
        ) : (
          <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center">
            {node.number ? <span className="text-xs">{node.number}</span> : <span className="text-xs">•</span>}
          </div>
        )
        break
      case "hexagon":
        nodeElement = (
          <div className="w-6 h-6 border border-black rotate-45 flex items-center justify-center">
            {node.number && <span className="text-xs -rotate-45">{node.number}</span>}
          </div>
        )
        break
      case "triangle":
        nodeElement = (
          <div className="w-5 h-5 border-black" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}>
            <div className="w-full h-full border border-black"></div>
          </div>
        )
        break
    }

    return (
      <motion.div
        id={`node-${node.id}`}
        className="absolute flex flex-col items-center"
        style={{
          left: `${node.position.x}%`,
          top: `${node.position.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {nodeElement}
        <p className={`text-center text-sm mt-2 whitespace-pre-line ${node.labelColor || ""}`}>{node.label}</p>
      </motion.div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
        {nodes.map((node) =>
          node.connections.map((connection) => (
            <path
              key={`${node.id}-${connection.to}`}
              id={`connection-${node.id}-${connection.to}`}
              d={connection.path}
              stroke="black"
              strokeWidth="1"
              fill="none"
              strokeDasharray={connection.type === "dashed" ? "4" : "0"}
              style={{
                strokeDashoffset: 1000,
                strokeDasharray: connection.type === "dashed" ? "4" : "1000",
              }}
            />
          )),
        )}
      </svg>

      {nodes.map((node) => renderNode(node))}
    </div>
  )
}

