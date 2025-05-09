"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Music } from "lucide-react"

export function InteractiveAlbum() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMockMode, setIsMockMode] = useState(false) // Set to false since we have real audio files
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const tracks = [
    {
      number: 1,
      title: "Witch Hunt",
      duration: "03:35",
      top: "5%",
      left: "10%",
      durationSeconds: 215,
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/witchhunt-bGOxtv2VlPRnCwBosFHVULQfw89HmZ.mp3",
    },
    {
      number: 2,
      title: "Coming Down",
      duration: "04:26",
      top: "15%",
      left: "40%",
      durationSeconds: 266,
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dandylion%20Warpaint%20-%20How%20Your%20New%20Life%20Can%20Begin%20-%2002%20Coming%20Down-HikkmoKxicgoMw2uGKHcsWIzDqvYfV.mp3",
    },
    {
      number: 3,
      title: "Control Freak",
      duration: "03:09",
      top: "10%",
      left: "75%",
      durationSeconds: 189,
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dandylion%20Warpaint%20-%20How%20Your%20New%20Life%20Can%20Begin%20-%2003%20Control%20Freak-cydsnsY9D8P9hGGYKbGK5OFrxGItFn.mp3",
    },
    {
      number: 4,
      title: "How Your New Life Can Begin",
      duration: "05:35",
      top: "25%",
      left: "15%",
      durationSeconds: 335,
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dandylion%20Warpaint%20-%20How%20Your%20New%20Life%20Can%20Begin%20-%2004%20How%20Your%20New%20Life%20Can%20Begin-a09zFQ5C36uDlVPYsGSGzitrnnio6T.mp3",
    },
    {
      number: 5,
      title: "Star Gaze",
      duration: "04:17",
      top: "35%",
      left: "60%",
      durationSeconds: 257,
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dandylion%20Warpaint%20-%20How%20Your%20New%20Life%20Can%20Begin%20-%2009%20Star%20Gaze-5y56uov6wSQBGsOZu4Es4Sb43JBaPp.mp3",
    },
  ]

  // Mock playback functionality (as fallback)
  useEffect(() => {
    if (isMockMode && currentTrack !== null) {
      if (isPlaying) {
        // Simulate playback with progress updates
        const totalDuration = tracks[currentTrack - 1].durationSeconds
        const updateInterval = 100 // Update every 100ms
        const increment = (100 / totalDuration) * (updateInterval / 1000)

        progressIntervalRef.current = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + increment
            if (newProgress >= 100) {
              // Track ended, play next track
              const nextTrackNumber = (currentTrack % tracks.length) + 1
              setCurrentTrack(nextTrackNumber)
              setProgress(0)
              return 0
            }
            return newProgress
          })
        }, updateInterval)
      } else if (progressIntervalRef.current) {
        // Pause the mock playback
        clearInterval(progressIntervalRef.current)
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying, currentTrack, tracks, isMockMode])

  // Real audio playback
  useEffect(() => {
    if (!isMockMode && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error)
          setIsPlaying(false)
          // Switch to mock mode if audio fails
          setIsMockMode(true)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack, isMockMode])

  // Real audio progress tracking
  useEffect(() => {
    if (!isMockMode) {
      const audio = audioRef.current
      if (audio) {
        const updateProgress = () => {
          setProgress((audio.currentTime / audio.duration) * 100)
        }
        const handleEnded = () => {
          const nextTrackNumber = currentTrack !== null ? (currentTrack % tracks.length) + 1 : 1
          setCurrentTrack(nextTrackNumber)
          setProgress(0)
          if (audio) {
            audio.src = tracks[nextTrackNumber - 1].audio
            audio.play().catch((error) => {
              console.error("Audio playback failed:", error)
              setIsPlaying(false)
              setIsMockMode(true)
            })
          }
        }
        audio.addEventListener("timeupdate", updateProgress)
        audio.addEventListener("ended", handleEnded)
        return () => {
          audio.removeEventListener("timeupdate", updateProgress)
          audio.removeEventListener("ended", handleEnded)
        }
      }
    }
  }, [currentTrack, tracks, isMockMode])

  const togglePlay = (trackNumber: number) => {
    if (currentTrack === trackNumber) {
      setIsPlaying(!isPlaying)
    } else {
      // Clear any existing interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }

      setCurrentTrack(trackNumber)
      setIsPlaying(true)
      setProgress(0)

      // Set audio source for real playback
      if (!isMockMode && audioRef.current) {
        audioRef.current.src = tracks[trackNumber - 1].audio
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error)
          setIsPlaying(false)
          setIsMockMode(true)
        })
      }
    }
  }

  return (
    <motion.div
      className="border border-white/10 bg-[#111111] rounded-lg p-4 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)] col-span-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      whileHover={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono">DANDYLION WARPAINT</span>
        <div className="flex items-center gap-2">
          {isMockMode && (
            <motion.div
              className="flex items-center gap-1 text-xs text-white/60 bg-white/5 px-2 py-1 rounded"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <Music className="w-3 h-3" />
              <span>Demo Mode</span>
            </motion.div>
          )}
          <motion.button
            className="p-1 hover:bg-white/10 rounded"
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="relative aspect-square w-full max-h-[500px]">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="49.75" fill="none" stroke="#333" strokeWidth="0.25" opacity="0.4" />
          <circle
            cx="50"
            cy="50"
            r="49.75"
            fill="none"
            stroke="#fff"
            strokeWidth="0.25"
            strokeDasharray="312.56"
            strokeDashoffset={312.56 - (progress / 100) * 312.56}
            transform="rotate(-90 50 50)"
            className="transition-all duration-300 ease-linear"
            opacity="0.4"
          />
        </svg>
        {tracks.map((track) => (
          <motion.div
            key={track.number}
            className="absolute text-[0.375rem] md:text-[0.5rem]"
            style={{
              top: track.top,
              left: track.left,
            }}
            whileHover={{ scale: 1.1 }}
            animate={currentTrack === track.number ? { scale: 1.1 } : { scale: 1 }}
          >
            <div className="font-bold text-white/80 flex items-center gap-1">{track.number}</div>
            <motion.button
              onClick={() => togglePlay(track.number)}
              className="max-w-[75px] md:max-w-[100px] truncate text-left focus:outline-none"
              whileHover={{ color: "#ffffff" }}
              animate={currentTrack === track.number && isPlaying ? { color: "#ffffff" } : { color: "#ffffffcc" }}
            >
              {track.title}
            </motion.button>
            <div className="text-white/60">{track.duration}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-white/60 font-mono">
          {currentTrack ? `NOW PLAYING: ${tracks[currentTrack - 1].title}` : "SELECT A TRACK"}
        </span>
        <div className="flex gap-2">
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (currentTrack !== null) {
                const prevTrack = currentTrack > 1 ? currentTrack - 1 : tracks.length
                togglePlay(prevTrack)
              }
            }}
          >
            ←
          </motion.button>
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (currentTrack !== null) {
                setIsPlaying(!isPlaying)
              }
            }}
          >
            {isPlaying ? "∥" : "▶"}
          </motion.button>
          <motion.button
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (currentTrack !== null) {
                const nextTrack = currentTrack < tracks.length ? currentTrack + 1 : 1
                togglePlay(nextTrack)
              }
            }}
          >
            →
          </motion.button>
        </div>
      </div>
      <div className="text-xs text-white/60 text-center mt-2">HOW YOUR NEW LIFE CAN BEGIN</div>
      <audio ref={audioRef} />
    </motion.div>
  )
}
