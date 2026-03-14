import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Smooth mouse-tracking parallax (like Antigravity website).
 * Uses requestAnimationFrame + linear interpolation for fluid movement.
 * Returns smoothly interpolated x/y values from -1 to 1.
 */
export function useMouseParallax(smoothing = 0.08) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  const animate = useCallback(() => {
    // Lerp (linear interpolation) for buttery smooth movement
    current.current.x += (target.current.x - current.current.x) * smoothing
    current.current.y += (target.current.y - current.current.y) * smoothing
    setPosition({ x: current.current.x, y: current.current.y })
    raf.current = requestAnimationFrame(animate)
  }, [smoothing])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf.current)
    }
  }, [animate])

  return position
}
