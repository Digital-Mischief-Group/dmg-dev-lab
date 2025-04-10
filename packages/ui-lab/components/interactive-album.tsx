"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

export function InteractiveAlbum() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const tracks = [
    {
      number: 1,
      title: "Reputation",
      duration: "4:08",
      top: "2%",
      left: "5%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Post%20Malone%20-%20Reputation%20(Official%20Audio)%20%5B%20ezmp3.cc%20%5D-5SUWvVrKOrnnLYYtaHhDpYvFz8ygif.mp3",
    },
    {
      number: 2,
      title: "Cooped Up w. Roddy Ricch",
      duration: "3:05",
      top: "15%",
      left: "40%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02-Cooped%20Up%20(Ft.%20Roddy%20Ricch)-LgfBFOaoKNUbXjdHM70C2GEYTkWEku.mp3",
    },
    {
      number: 3,
      title: "Lemon Tree",
      duration: "4:03",
      top: "10%",
      left: "75%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-Lemon%20Tree-gd3L6wgMWRNve0OUrEPpTI97sAGhdh.mp3",
    },
    {
      number: 4,
      title: "Wrapped Around Your Finger",
      duration: "3:13",
      top: "25%",
      left: "10%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04-Wrapped%20Around%20Your%20Finger-7jZ75DqZZvn8eScbEiAgEYZW3LWIuN.mp3",
    },
    {
      number: 5,
      title: "I Like You (A Happier Song) w. Doja Cat",
      duration: "3:12",
      top: "35%",
      left: "60%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05-I%20Like%20You%20(A%20Happier%20Song)%20(Ft.%20Doja%20Cat)-PixiSzZgS6YcwRXze0VXiCUd7efGn0.mp3",
    },
    {
      number: 6,
      title: "I Cannot Be (A Sadder Song) w. Gunna",
      duration: "2:49",
      top: "45%",
      left: "35%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06-I%20Cannot%20Be%20(A%20Sadder%20Song)%20(Ft.%20Gunna)-cFPac5c7dk8k7NtKOLhuEcerkU6Zwy.mp3",
    },
    {
      number: 7,
      title: "Insane",
      duration: "2:49",
      top: "55%",
      left: "15%",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/07-Insane-B1vZZyqKXppUHIl4IMYhhryjMqbK1Y.mp3",
    },
    {
      number: 8,
      title: "Love/Hate Letter to Alcohol w. Fleet Foxes",
      duration: "3:03",
      top: "50%",
      left: "65%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/08-Love%E2%81%84Hate%20Letter%20To%20Alcohol%20(Ft.%20Fleet%20Foxes)-Fas2f9Wm63DRKPY2PufluvNNsVOeRu.mp3",
    },
    {
      number: 9,
      title: "Wasting Angels w. The Kid LAROI",
      duration: "4:03",
      top: "65%",
      left: "5%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/09-Wasting%20Angels%20(Ft.%20The%20Kid%20LAROI)-FwyohO3itjrKTufhToDOtbCE1kYHjB.mp3",
    },
    {
      number: 10,
      title: "Euthanasia",
      duration: "2:25",
      top: "70%",
      left: "80%",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-Euthanasia-xdk5J1gmK8OHLfTCTDtSHN0OZFWRTA.mp3",
    },
    {
      number: 11,
      title: "When I'm Alone",
      duration: "3:15",
      top: "75%",
      left: "40%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-When%20I%E2%80%99m%20Alone-CwNPvTKNryFIKMRiOm1oGFTtQIclrE.mp3",
    },
    {
      number: 12,
      title: "Waiting For a Miracle",
      duration: "2:21",
      top: "80%",
      left: "70%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-Waiting%20For%20A%20Miracle-h8ARGjTCHwml6GQY3DrLTLG5zjXHn2.mp3",
    },
    {
      number: 13,
      title: "One Right Now w. The Weeknd",
      duration: "3:12",
      top: "85%",
      left: "20%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-One%20Right%20Now%20(Ft.%20The%20Weeknd)-RLo9akTd6oDuV4gPFZne8dInasuRnl.mp3",
    },
    {
      number: 14,
      title: "New Recording 12, Jan 3 2020",
      duration: "1:32",
      top: "90%",
      left: "55%",
      audio:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-New%20Recording%2012,%20Jan%203,%202020-WSLC5J103KfYAXaipB6gkEN6PKCPie.mp3",
    },
  ]

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
      const handleEnded = () => {
        const nextTrackNumber = currentTrack !== null ? (currentTrack % tracks.length) + 1 : 1
        setCurrentTrack(nextTrackNumber)
        setProgress(0)
        audio.src = tracks[nextTrackNumber - 1].audio
        audio.play()
      }
      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("ended", handleEnded)
      return () => {
        audio.removeEventListener("timeupdate", updateProgress)
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [currentTrack, tracks])

  const togglePlay = (trackNumber: number) => {
    if (currentTrack === trackNumber) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(trackNumber)
      setIsPlaying(true)
      setProgress(0)
      if (audioRef.current) {
        audioRef.current.src = tracks[trackNumber - 1].audio || ""
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    }
  }

  return (
    <motion.div
      className="border border-white/10 bg-gradient-to-b from-[#640402] to-[#111111] rounded-lg p-4 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)] col-span-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      whileHover={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono">TWELVE CARAT TOOTHACHE</span>
        <motion.button
          className="p-1 hover:bg-white/10 rounded"
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
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
      <audio ref={audioRef} />
    </motion.div>
  )
}
