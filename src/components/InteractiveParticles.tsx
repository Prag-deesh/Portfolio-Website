/**
 * InteractiveParticles — Canvas 2D mouse-reactive particle system.
 *
 * Features:
 *  - Thousands of particles distributed across the viewport
 *  - Particles react to mouse: push away + color shift near cursor
 *  - Smooth spring physics for organic return to rest
 *  - Theme-aware colors (light/dark)
 *  - Efficient: requestAnimationFrame + spatial hashing
 */
import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number       // current x
  y: number       // current y
  baseX: number   // rest x
  baseY: number   // rest y
  vx: number      // velocity x
  vy: number      // velocity y
  size: number    // radius
  alpha: number   // base opacity
}

interface Props {
  theme?: 'dark' | 'light'
  className?: string
  particleCount?: number
  mouseRadius?: number
  pushStrength?: number
}

const InteractiveParticles = ({
  theme = 'dark',
  className = '',
  particleCount = 800,
  mouseRadius = 120,
  pushStrength = 8,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(0)
  const themeRef = useRef(theme)

  themeRef.current = theme

  const getColors = useCallback(() => {
    if (themeRef.current === 'dark') {
      return {
        base: 'rgba(100, 140, 255,',       // blue
        active: 'rgba(180, 140, 255,',      // purple near cursor
        connect: 'rgba(100, 140, 255,',     // connection lines
      }
    }
    return {
      base: 'rgba(37, 99, 235,',           // blue
      active: 'rgba(124, 58, 237,',         // purple near cursor
      connect: 'rgba(37, 99, 235,',         // connection lines
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Size canvas to viewport
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Create particles
    const w = window.innerWidth
    const h = window.innerHeight
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: 0, vy: 0,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }
    particlesRef.current = particles

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    const onMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)

      const vw = window.innerWidth
      const vh = window.innerHeight
      ctx.clearRect(0, 0, vw, vh)

      const { x: mx, y: my } = mouseRef.current
      const colors = getColors()
      const r2 = mouseRadius * mouseRadius

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction
        const dx = mx - p.x
        const dy = my - p.y
        const distSq = dx * dx + dy * dy

        if (distSq < r2 && distSq > 0) {
          const dist = Math.sqrt(distSq)
          const force = (mouseRadius - dist) / mouseRadius
          const angle = Math.atan2(dy, dx)
          p.vx -= Math.cos(angle) * force * pushStrength
          p.vy -= Math.sin(angle) * force * pushStrength
        }

        // Spring back to rest position
        const springX = (p.baseX - p.x) * 0.04
        const springY = (p.baseY - p.y) * 0.04
        p.vx += springX
        p.vy += springY

        // Damping
        p.vx *= 0.92
        p.vy *= 0.92

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Velocity magnitude for color interpolation
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const colorMix = Math.min(speed / 5, 1)

        // Draw particle
        const color = colorMix > 0.3 ? colors.active : colors.base
        const alpha = p.alpha * (0.6 + colorMix * 0.4)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + colorMix * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `${color}${alpha})`
        ctx.fill()
      }

      // Draw connections between nearby particles near mouse
      if (mx > -1000) {
        ctx.lineWidth = 0.5
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]
          const dax = mx - a.x
          const day = my - a.y
          const daSq = dax * dax + day * day
          if (daSq > r2 * 2) continue

          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]
            const dbx = mx - b.x
            const dby = my - b.y
            if (dbx * dbx + dby * dby > r2 * 2) continue

            const abx = a.x - b.x
            const aby = a.y - b.y
            const abDist = abx * abx + aby * aby
            if (abDist < 4000) { // ~63px connection radius
              const opacity = (1 - abDist / 4000) * 0.15
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `${colors.connect}${opacity})`
              ctx.stroke()
            }
          }
        }
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [particleCount, mouseRadius, pushStrength, getColors])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default InteractiveParticles
