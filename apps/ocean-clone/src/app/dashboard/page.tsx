"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MessageInput from "@/components/MessageInput";
import ParticleSystem from "@/components/ParticleSystem";

export default function Dashboard() {
  const [promptsLeft, setPromptsLeft] = useState(50);
  const [activeTab, setActiveTab] = useState("CHAT");

  return (
    <main className="flex flex-col h-screen bg-black text-white overflow-hidden relative">
      {/* Navigation header */}
      <motion.header
        className="flex justify-between items-center p-4 sm:p-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-8">
            <h1 className="text-xl font-light tracking-wider">OCEAN</h1>
          </Link>

          <nav className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm ${activeTab === "CHAT" ? "bg-white text-black font-medium rounded" : "text-white/80 hover:text-white"}`}
              onClick={() => setActiveTab("CHAT")}
            >
              CHAT
            </button>
            <button
              className={`px-3 py-1 text-sm ${activeTab === "LIBRARY" ? "bg-white text-black font-medium rounded" : "text-white/80 hover:text-white"}`}
              onClick={() => setActiveTab("LIBRARY")}
            >
              LIBRARY
            </button>
            <button
              className={`px-3 py-1 text-sm ${activeTab === "DISCOVER" ? "bg-white text-black font-medium rounded" : "text-white/80 hover:text-white"}`}
              onClick={() => setActiveTab("DISCOVER")}
            >
              DISCOVER
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-xs text-white/80">
            <span className="font-medium">{promptsLeft}</span> PROMPTS LEFT
          </div>

          <button className="bg-black border border-white/30 text-xs px-4 py-1 rounded flex items-center space-x-1 hover:bg-white/10 transition-colors">
            <span>UPGRADE</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6-6 6 6"/>
              <path d="M12 3v18"/>
            </svg>
          </button>

          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Main content area with particle system */}
      <div className="flex-1 relative">
        <ParticleSystem />

        {/* Message input at the bottom */}
        <MessageInput />
      </div>

      {/* Help button */}
      <motion.button
        className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-white/90 transition-colors z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      </motion.button>
    </main>
  );
}
