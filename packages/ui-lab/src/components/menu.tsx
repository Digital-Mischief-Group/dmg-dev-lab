"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@dmg/lib/utils"

interface MenuItem {
  id: string
  icon: "circle" | "triangle" | "square" | "dot"
  title: string
  content?: string
  link?: string
  items?: { title: string; href: string }[]
}

const menuItems: MenuItem[] = [
  {
    id: "index",
    icon: "dot",
    title: "INDEX",
    content:
      "Andrew Trousdale is a researcher and designer. His initiatives and projects bridge positive psychology, human-computer interaction, and the creative arts —",
    link: "more information",
  },
  {
    id: "initiatives",
    icon: "triangle",
    title: "INITIATIVES",
    items: [
      { title: "APOSSIBLE", href: "#" },
      { title: "The Festival of Urgent Reinventions", href: "#" },
    ],
  },
  {
    id: "research",
    icon: "square",
    title: "RESEARCH",
    items: [
      { title: "Character Development", href: "#" },
      { title: "Personal Narratives", href: "#" },
      { title: "Friction Paper", href: "#" },
    ],
  },
  {
    id: "artifacts",
    icon: "circle",
    title: "ARTIFACTS",
    items: [
      { title: "Interactive Machines", href: "#" },
      { title: "Human Expression", href: "#" },
      { title: "Evolutionary Systems", href: "#" },
    ],
  },
  {
    id: "paths",
    icon: "circle",
    title: "PATHS",
    items: [
      { title: "Information", href: "#" },
      { title: "Social Intervention", href: "#" },
    ],
  },
]

interface MenuIconProps {
  type: MenuItem["icon"]
  className?: string
}

const MenuIcon = ({ type, className }: MenuIconProps) => {
  switch (type) {
    case "circle":
      return <div className={cn("w-2 h-2 rounded-full border border-black", className)} />
    case "triangle":
      return (
        <div className={cn("w-2 h-2", className)}>
          <div
            className="w-full h-full border border-black bg-white"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </div>
      )
    case "square":
      return <div className={cn("w-2 h-2 border border-black", className)} />
    case "dot":
      return <div className={cn("w-2 h-2 rounded-full bg-orange-500", className)} />
    default:
      return null
  }
}

export function Menu() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="fixed left-8 top-8 w-[400px] bg-white shadow-lg">
      <div className="p-6 space-y-4">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button onClick={() => toggleSection(item.id)} className="w-full flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <MenuIcon type={item.icon} />
                <span className="font-medium">{item.title}</span>
              </div>
              {item.items && (
                <span className="text-gray-400">
                  {openSections[item.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              )}
            </button>

            {item.content && (
              <div className="mt-4 pl-6 text-sm">
                <p>{item.content}</p>
                {item.link && (
                  <a href="#" className="inline-block mt-2 underline">
                    {item.link}
                  </a>
                )}
              </div>
            )}

            <AnimatePresence>
              {item.items && openSections[item.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-6 py-4 space-y-2">
                    {item.items.map((subItem) => (
                      <a key={subItem.title} href={subItem.href} className="block text-sm hover:underline">
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 border-t border-dotted border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  )
}

