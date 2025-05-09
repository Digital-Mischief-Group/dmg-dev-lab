'use client'

import {useEffect, useState} from 'react'

interface EffectsProps {
  isActive: boolean
}

export function Effects({isActive}: EffectsProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const interval = setInterval(() => {
      // Create new particles
      if (particles.length < 20) {
        setParticles((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
          },
        ])
      }

      // Update particle positions
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            y: particle.y - particle.speed,
            opacity: particle.opacity - 0.01,
          }))
          .filter((particle) => particle.opacity > 0)
      )
    }, 150)

    return () => clearInterval(interval)
  }, [isActive, particles.length])

  if (!isActive) return null

  return (
    <div className='absolute inset-0 pointer-events-none overflow-hidden'>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className='absolute rounded-full bg-blue-500'
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}
