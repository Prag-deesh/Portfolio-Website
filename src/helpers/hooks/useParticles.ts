import { useMemo } from 'react'

/**
 * Confetti-like particles for mouse parallax.
 * Each particle has a random position, size, shape, rotation, opacity,
 * and depth (which controls how much it moves with the mouse).
 */

interface Particle {
  id: number
  x: string          // CSS left %
  y: string          // CSS top %
  size: number        // px
  opacity: number
  depth: number       // multiplier for mouse movement (higher = more movement = closer)
  rotation: number    // degrees
  shape: 'circle' | 'dash' | 'dot'
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function useParticles(count = 40): Particle[] {
  return useMemo(() => {
    const shapes: Particle['shape'][] = ['circle', 'dash', 'dot']
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${randomBetween(2, 98)}%`,
      y: `${randomBetween(2, 98)}%`,
      size: randomBetween(2, 6),
      opacity: randomBetween(0.08, 0.35),
      depth: randomBetween(10, 60),
      rotation: randomBetween(0, 360),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }))
  }, [count])
}

export function getParticleStyle(shape: Particle['shape'], size: number) {
  switch (shape) {
    case 'dash':
      return { width: size * 3, height: size * 0.6, borderRadius: size * 0.3 }
    case 'dot':
      return { width: size * 0.8, height: size * 0.8, borderRadius: '50%' }
    case 'circle':
    default:
      return { width: size, height: size, borderRadius: '50%' }
  }
}
