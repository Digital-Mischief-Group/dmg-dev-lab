"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Define the ParticleImageDisplayer type
interface ParticleImageConfig {
  particles: {
    array: any[]
    density: number
    color: string
    size: {
      value: number
      random: boolean
    }
    movement: {
      speed: number
      restless: {
        enabled: boolean
        value: number
        sync: boolean
      }
    }
    interactivity: {
      on_hover: {
        enabled: boolean
        action: string
      }
      on_click: {
        enabled: boolean
        action: string
      }
      on_touch: {
        enabled: boolean
        action: string
      }
      fn_array: any[]
    }
  }
  image: {
    src: {
      path: string
      is_external: boolean
    }
    size: {
      canvas_pct: number
      min_px: number
      max_px: number
    }
    obj?: HTMLImageElement
    aspect_ratio?: number
    x?: number
    y?: number
  }
  interactions: {
    repulse: {
      distance: number
      strength: number
    }
    big_repulse: {
      distance: number
      strength: number
    }
    grab: {
      distance: number
      line_width: number
    }
  }
  canvas: {
    el: HTMLCanvasElement
    w: number
    h: number
    context?: CanvasRenderingContext2D
    aspect_ratio?: number
  }
  functions: {
    particles: any
    image: any
    canvas: any
    interactivity: any
    utils: any
    launch?: () => void
  }
  mouse: {
    x: number | null
    y: number | null
    click_x: number | null
    click_y: number | null
  }
  disabled?: boolean
}

export function ParticleFaceFullscreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pImageRef = useRef<ParticleImageConfig | null>(null)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    // Hide controls after 3 seconds
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Deep extend helper function
    const deepExtend = (destination: any, source: any) => {
      for (const property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
          destination[property] = destination[property] || {}
          deepExtend(destination[property], source[property])
        } else {
          destination[property] = source[property]
        }
      }
      return destination
    }

    // Initialize the particle image displayer
    const initParticleImage = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const pImageConfig: ParticleImageConfig = {
        particles: {
          array: [],
          density: 2, // Decreased density for more particles and better definition
          color: "#ffffff",
          size: {
            value: 1.2,
            random: true,
          },
          movement: {
            speed: 0.8, // Slightly faster for more dynamic effect
            restless: {
              enabled: true,
              value: 0.1, // Add slight restlessness
              sync: false,
            },
          },
          interactivity: {
            on_hover: {
              enabled: true,
              action: "repulse",
            },
            on_click: {
              enabled: true,
              action: "big_repulse",
            },
            on_touch: {
              enabled: false,
              action: "repulse",
            },
            fn_array: [],
          },
        },
        image: {
          src: {
            path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/299224B1-2FA7-4318-BFDA-3E72F1F43AA4-removebg-preview-D4aPqSV0gdA4DGrR3IyHAv0V8Tcir4.png",
            is_external: true,
          },
          size: {
            canvas_pct: 120, // Increased to make the face larger and more prominent
            min_px: 300,
            max_px: 2000, // Increased max size for fullscreen
          },
        },
        interactions: {
          repulse: {
            distance: 120,
            strength: 200,
          },
          big_repulse: {
            distance: 300,
            strength: 300,
          },
          grab: {
            distance: 100,
            line_width: 1,
          },
        },
        canvas: {
          el: canvas,
          w: canvas.offsetWidth,
          h: canvas.offsetHeight,
        },
        functions: {
          particles: {},
          image: {},
          canvas: {},
          interactivity: {},
          utils: {},
        },
        mouse: {
          x: null,
          y: null,
          click_x: null,
          click_y: null,
        },
      }

      // Canvas functions
      pImageConfig.functions.canvas.init = () => {
        pImageConfig.canvas.context = pImageConfig.canvas.el.getContext("2d")
        pImageConfig.canvas.el.width = pImageConfig.canvas.w
        pImageConfig.canvas.el.height = pImageConfig.canvas.h
        pImageConfig.canvas.aspect_ratio = pImageConfig.canvas.w / pImageConfig.canvas.h
        window.addEventListener(
          "resize",
          pImageConfig.functions.utils.debounce(pImageConfig.functions.canvas.onResize, 200),
        )
      }

      pImageConfig.functions.canvas.onResize = () => {
        pImageConfig.canvas.w = pImageConfig.canvas.el.offsetWidth
        pImageConfig.canvas.h = pImageConfig.canvas.el.offsetHeight
        pImageConfig.canvas.el.width = pImageConfig.canvas.w
        pImageConfig.canvas.el.height = pImageConfig.canvas.h
        pImageConfig.canvas.aspect_ratio = pImageConfig.canvas.w / pImageConfig.canvas.h

        // Clear existing particles
        pImageConfig.particles.array = []

        pImageConfig.functions.image.resize()
        const image_pixels = pImageConfig.functions.canvas.getImagePixels()
        if (image_pixels) {
          pImageConfig.functions.particles.createImageParticles(image_pixels, true)
        }
      }

      pImageConfig.functions.canvas.clear = () => {
        if (pImageConfig.canvas.context) {
          pImageConfig.canvas.context.clearRect(0, 0, pImageConfig.canvas.w, pImageConfig.canvas.h)
        }
      }

      pImageConfig.functions.canvas.getImagePixels = () => {
        pImageConfig.functions.canvas.clear()
        if (
          pImageConfig.canvas.context &&
          pImageConfig.image.obj &&
          pImageConfig.image.x !== undefined &&
          pImageConfig.image.y !== undefined
        ) {
          pImageConfig.canvas.context.drawImage(
            pImageConfig.image.obj,
            pImageConfig.image.x,
            pImageConfig.image.y,
            pImageConfig.image.obj.width,
            pImageConfig.image.obj.height,
          )
          const pixel_data = pImageConfig.canvas.context.getImageData(
            pImageConfig.image.x,
            pImageConfig.image.y,
            pImageConfig.image.obj.width,
            pImageConfig.image.obj.height,
          )
          pImageConfig.functions.canvas.clear()
          return pixel_data
        }
        return null
      }

      // Image functions
      pImageConfig.functions.image.resize = () => {
        if (
          pImageConfig.image.obj &&
          pImageConfig.image.aspect_ratio !== undefined &&
          pImageConfig.canvas.aspect_ratio !== undefined
        ) {
          // Calculate the appropriate size based on canvas dimensions
          let targetWidth, targetHeight

          if (pImageConfig.image.aspect_ratio < pImageConfig.canvas.aspect_ratio) {
            // Height is the limiting factor
            targetHeight = pImageConfig.functions.utils.clamp(
              Math.round((pImageConfig.canvas.h * pImageConfig.image.size.canvas_pct) / 100),
              pImageConfig.image.size.min_px,
              pImageConfig.image.size.max_px,
            )
            targetWidth = Math.round(targetHeight * pImageConfig.image.aspect_ratio)
          } else {
            // Width is the limiting factor
            targetWidth = pImageConfig.functions.utils.clamp(
              Math.round((pImageConfig.canvas.w * pImageConfig.image.size.canvas_pct) / 100),
              pImageConfig.image.size.min_px,
              pImageConfig.image.size.max_px,
            )
            targetHeight = Math.round(targetWidth / pImageConfig.image.aspect_ratio)
          }

          // Set the dimensions
          pImageConfig.image.obj.width = targetWidth
          pImageConfig.image.obj.height = targetHeight

          // Center the image on the canvas
          pImageConfig.image.x = Math.round((pImageConfig.canvas.w - targetWidth) / 2)
          pImageConfig.image.y = Math.round((pImageConfig.canvas.h - targetHeight) / 2)
        }
      }

      pImageConfig.functions.image.init = () => {
        pImageConfig.image.obj = new Image()
        pImageConfig.image.obj.addEventListener("load", () => {
          // Clear any existing particles
          pImageConfig.particles.array = []

          // get aspect ratio (only have to compute once on initial load)
          pImageConfig.image.aspect_ratio = pImageConfig.image.obj!.width / pImageConfig.image.obj!.height
          pImageConfig.functions.image.resize()
          const img_pixels = pImageConfig.functions.canvas.getImagePixels()
          if (img_pixels) {
            pImageConfig.functions.particles.createImageParticles(img_pixels)
            pImageConfig.functions.particles.animateParticles()
          }
        })
        pImageConfig.image.obj.src = pImageConfig.image.src.path
        if (pImageConfig.image.src.is_external) {
          pImageConfig.image.obj.crossOrigin = "anonymous"
        }
      }

      // Particle functions
      pImageConfig.functions.particles.SingleImageParticle = function (init_xy: any, dest_xy: any) {
        this.x = init_xy.x
        this.y = init_xy.y
        this.dest_x = dest_xy.x
        this.dest_y = dest_xy.y
        this.vx = (Math.random() - 0.5) * pImageConfig.particles.movement.speed
        this.vy = (Math.random() - 0.5) * pImageConfig.particles.movement.speed
        this.acc_x = 0
        this.acc_y = 0
        this.friction = 0.94
        this.radius = pImageConfig.particles.size.value * (pImageConfig.particles.size.random ? Math.random() + 0.5 : 1)
      }

      pImageConfig.functions.particles.SingleImageParticle.prototype.draw = function () {
        if (pImageConfig.canvas.context) {
          pImageConfig.canvas.context.fillStyle = this.color
          pImageConfig.canvas.context.beginPath()
          pImageConfig.canvas.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
          pImageConfig.canvas.context.fill()
        }
      }

      pImageConfig.functions.particles.createImageParticles = (pixel_data: any, at_dest = false) => {
        const increment = pImageConfig.particles.density
        const width = pixel_data.width
        const height = pixel_data.height
        const imageX = pImageConfig.image.x || 0
        const imageY = pImageConfig.image.y || 0

        for (let i = 0; i < width; i += increment) {
          for (let j = 0; j < height; j += increment) {
            const index = (i + j * width) * 4
            const alpha = pixel_data.data[index + 3]

            if (alpha > 30) {
              // Only create particles for non-transparent pixels
              const r = pixel_data.data[index]
              const g = pixel_data.data[index + 1]
              const b = pixel_data.data[index + 2]

              const dest_xy = {
                x: imageX + i,
                y: imageY + j,
              }

              const init_xy = at_dest
                ? dest_xy
                : {
                    x: Math.random() * pImageConfig.canvas.w,
                    y: Math.random() * pImageConfig.canvas.h,
                  }

              const particle = new pImageConfig.functions.particles.SingleImageParticle(init_xy, dest_xy)
              // Use the actual color from the image
              particle.color = `rgba(${r},${g},${b},${alpha / 255})`
              pImageConfig.particles.array.push(particle)
            }
          }
        }
      }

      pImageConfig.functions.particles.updateParticles = () => {
        for (const p of pImageConfig.particles.array) {
          // Add some restlessness
          if (pImageConfig.particles.movement.restless.enabled) {
            p.dest_x += (Math.random() - 0.5) * pImageConfig.particles.movement.restless.value
            p.dest_y += (Math.random() - 0.5) * pImageConfig.particles.movement.restless.value
          }

          p.acc_x = (p.dest_x - p.x) / 500
          p.acc_y = (p.dest_y - p.y) / 500
          p.vx = (p.vx + p.acc_x) * p.friction
          p.vy = (p.vy + p.acc_y) * p.friction
          p.x += p.vx
          p.y += p.vy

          pImageConfig.functions.interactivity.interactWithClient(p)
        }
      }

      pImageConfig.functions.particles.animateParticles = () => {
        if (pImageConfig.canvas.context) {
          pImageConfig.canvas.context.clearRect(0, 0, pImageConfig.canvas.w, pImageConfig.canvas.h)
          pImageConfig.functions.particles.updateParticles()

          for (const p of pImageConfig.particles.array) {
            pImageConfig.canvas.context.fillStyle = p.color
            pImageConfig.canvas.context.beginPath()
            pImageConfig.canvas.context.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
            pImageConfig.canvas.context.fill()
          }

          requestAnimationFrame(pImageConfig.functions.particles.animateParticles)
        }
      }

      // Interactivity functions
      pImageConfig.functions.interactivity.repulseParticle = (p: any, args: any) => {
        // compute distance to mouse
        const dx_mouse = p.x - pImageConfig.mouse.x,
          dy_mouse = p.y - pImageConfig.mouse.y,
          mouse_dist = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
          inv_strength = pImageConfig.functions.utils.clamp(300 - args.strength, 10, 300)
        if (mouse_dist <= args.distance) {
          p.acc_x = (p.x - pImageConfig.mouse.x!) / inv_strength
          p.acc_y = (p.y - pImageConfig.mouse.y!) / inv_strength
          p.vx += p.acc_x
          p.vy += p.acc_y
        }
      }

      pImageConfig.functions.interactivity.grabParticle = (p: any, args: any) => {
        const dx_mouse = p.x - pImageConfig.mouse.x,
          dy_mouse = p.y - pImageConfig.mouse.y,
          mouse_dist = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse)
        if (mouse_dist <= args.distance && pImageConfig.canvas.context) {
          pImageConfig.canvas.context.strokeStyle = p.color
          pImageConfig.canvas.context.lineWidth = Math.min(args.line_width, p.radius * 2)
          pImageConfig.canvas.context.beginPath()
          pImageConfig.canvas.context.moveTo(p.x, p.y)
          pImageConfig.canvas.context.lineTo(pImageConfig.mouse.x!, pImageConfig.mouse.y!)
          pImageConfig.canvas.context.stroke()
          pImageConfig.canvas.context.closePath()
        }
      }

      pImageConfig.functions.interactivity.onMouseMove = (func: any, args: any, p: any) => {
        if (pImageConfig.mouse.x != null && pImageConfig.mouse.y != null) {
          func(p, args)
        }
      }

      pImageConfig.functions.interactivity.onMouseClick = (func: any, args: any, p: any) => {
        if (pImageConfig.mouse.click_x != null && pImageConfig.mouse.click_y != null) {
          func(p, args)
        }
      }

      pImageConfig.functions.interactivity.addEventListeners = () => {
        if (
          pImageConfig.particles.interactivity.on_hover.enabled ||
          pImageConfig.particles.interactivity.on_click.enabled
        ) {
          pImageConfig.canvas.el.addEventListener("mousemove", (e) => {
            const pos_x = e.offsetX || e.clientX,
              pos_y = e.offsetY || e.clientY
            pImageConfig.mouse.x = pos_x
            pImageConfig.mouse.y = pos_y
            setShowControls(true) // Show controls on mouse movement
          })
          pImageConfig.canvas.el.addEventListener("mouseleave", (e) => {
            pImageConfig.mouse.x = null
            pImageConfig.mouse.y = null
          })
          pImageConfig.functions.utils.addEventActions("on_hover")
        }
        if (pImageConfig.particles.interactivity.on_click.enabled) {
          pImageConfig.canvas.el.addEventListener("mousedown", (e) => {
            pImageConfig.mouse.click_x = pImageConfig.mouse.x
            pImageConfig.mouse.click_y = pImageConfig.mouse.y
          })
          pImageConfig.canvas.el.addEventListener("mouseup", (e) => {
            pImageConfig.mouse.click_x = null
            pImageConfig.mouse.click_y = null
          })
          pImageConfig.functions.utils.addEventActions("on_click")
        }
        if (pImageConfig.particles.interactivity.on_touch.enabled) {
          pImageConfig.canvas.el.addEventListener("touchmove", (e) => {
            const pos_x = e.touches[0].clientX,
              pos_y = e.touches[0].clientY
            pImageConfig.mouse.x = pos_x
            pImageConfig.mouse.y = pos_y
            setShowControls(true) // Show controls on touch movement
          })
          pImageConfig.canvas.el.addEventListener("touchend", (e) => {
            pImageConfig.mouse.x = null
            pImageConfig.mouse.y = null
          })
          pImageConfig.functions.utils.addEventActions("on_touch")
        }
      }

      pImageConfig.functions.interactivity.interactWithClient = (p: any) => {
        for (const func of pImageConfig.particles.interactivity.fn_array) {
          func(p)
        }
      }

      // Utils functions
      pImageConfig.functions.utils.randIntInRange = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min

      pImageConfig.functions.utils.clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

      pImageConfig.functions.utils.debounce = (func: Function, min_interval: number) => {
        let timer: any
        return (event: any) => {
          if (timer) clearTimeout(timer)
          timer = setTimeout(func, min_interval, event)
        }
      }

      pImageConfig.functions.utils.addEventActions = (event: string) => {
        const action_funcs: any = {
          repulse: pImageConfig.functions.interactivity.repulseParticle,
          big_repulse: pImageConfig.functions.interactivity.repulseParticle,
          grab: pImageConfig.functions.interactivity.grabParticle,
        }
        const event_wrapper =
          event === "on_click"
            ? pImageConfig.functions.interactivity.onMouseClick
            : pImageConfig.functions.interactivity.onMouseMove
        if (pImageConfig.particles.interactivity[event].enabled) {
          const func = action_funcs[pImageConfig.particles.interactivity[event].action],
            args = pImageConfig.interactions[pImageConfig.particles.interactivity[event].action]
          const partial_func = event_wrapper.bind(null, func, args)
          pImageConfig.particles.interactivity.fn_array.push(partial_func)
        }
      }

      // Launch functions
      pImageConfig.functions.launch = () => {
        pImageConfig.functions.interactivity.addEventListeners()
        pImageConfig.functions.canvas.init()
        pImageConfig.functions.image.init()
      }

      if (!pImageConfig.disabled) {
        pImageConfig.functions.launch()
      }

      return pImageConfig
    }

    // Initialize the particle image
    pImageRef.current = initParticleImage()

    // Cleanup function
    return () => {
      if (pImageRef.current) {
        window.removeEventListener("resize", pImageRef.current.functions.canvas.onResize)
      }
    }
  }, [])

  // Show controls when mouse moves
  const handleMouseMove = () => {
    setShowControls(true)
    // Hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)
    return () => clearTimeout(timer)
  }

  return (
    <div
      className="min-h-screen w-full bg-[#000000] overflow-hidden relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />

      <motion.div
        className="absolute top-4 left-4 z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <motion.button
            className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white/60 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
