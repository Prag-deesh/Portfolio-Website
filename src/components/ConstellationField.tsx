import { useEffect, useRef } from 'react'
import type { ConstellationFieldProps } from '../helpers/interfaces'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; phase: number
}

const ConstellationField = ({ theme = 'dark', className = '' }: ConstellationFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Sizing ──
    let w = window.innerWidth
    let h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio, 2)

    const setSize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    // ── Particles ──
    const COUNT = 300
    const particles: Particle[] = []
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // ── Events ──
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    const onLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }
    const onResize = () => setSize()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    // ── Config ──
    const MOUSE_R = 180
    const REPEL_R = 50
    const CONNECT_R = 110
    let time = 0
    let raf = 0

    // ── Loop ──
    const loop = () => {
      raf = requestAnimationFrame(loop)
      time += 0.01

      const isDark = themeRef.current === 'dark'
      // Match exactly with CSS --bg-primary: dark = hsl(0,0%,7%) = rgb(18,18,18), light = hsl(0,0%,98%) = rgb(250,250,250)
      const bgR = isDark ? 18 : 250
      const bgG = isDark ? 18 : 250
      const bgB = isDark ? 18 : 250

      // Trail: semi-transparent bg fill creates ghosting
      ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},0.15)`
      ctx.fillRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseOn = mx > -1000

      // ── Update + draw particles ──
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i]

        // Mouse interaction: attract from far, repel from close, swirl
        if (mouseOn) {
          const dx = mx - p.x
          const dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_R && dist > 1) {
            const nx = dx / dist
            const ny = dy / dist

            if (dist < REPEL_R) {
              // Repel
              const f = (REPEL_R - dist) / REPEL_R
              p.vx -= nx * f * 2.5
              p.vy -= ny * f * 2.5
            } else {
              // Attract + swirl
              const f = (1 - (dist - REPEL_R) / (MOUSE_R - REPEL_R)) * 0.015
              p.vx += nx * f + (-ny) * f * 2
              p.vy += ny * f + nx * f * 2
            }
          }
        }

        // Drift
        p.vx *= 0.97
        p.vy *= 0.97
        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < -10) p.x += w + 20
        if (p.x > w + 10) p.x -= w + 20
        if (p.y < -10) p.y += h + 20
        if (p.y > h + 10) p.y -= h + 20

        // Speed for color
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const t = Math.min(speed / 3, 1)

        // Breathing
        const breath = 1 + Math.sin(time * 2 + p.phase) * 0.15
        const r = p.size * breath + t * 1

        // Color: neutral gray — subtle, won't clash with text
        let cr: number, cg: number, cb: number
        if (isDark) {
          cr = 140 + t * 40      // light gray
          cg = 140 + t * 40
          cb = 150 + t * 40      // very slight cool tint
        } else {
          cr = 80 + t * 30       // medium gray
          cg = 80 + t * 30
          cb = 90 + t * 30       // very slight cool tint
        }
        const alpha = 0.15 + t * 0.25

        // Glow halo — very subtle
        if (r > 1.2) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha * 0.05})`
          ctx.fill()
        }

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha})`
        ctx.fill()
      }

      // ── Connections ──
      const cR2 = CONNECT_R * CONNECT_R
      for (let i = 0; i < COUNT; i++) {
        const a = particles[i]
        // Only draw connections near the mouse for performance + visual focus
        if (mouseOn) {
          const da = (mx - a.x) ** 2 + (my - a.y) ** 2
          if (da > (MOUSE_R * 2.5) ** 2) continue
        } else {
          // When no mouse, only connect very close particles
          if (i % 4 !== 0) continue
        }

        for (let j = i + 1; j < COUNT; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < cR2) {
            const opacity = (1 - d2 / cR2) * 0.08

            // Boost near mouse
            let boost = 1
            if (mouseOn) {
              const midDist = Math.sqrt(((a.x + b.x) / 2 - mx) ** 2 + ((a.y + b.y) / 2 - my) ** 2)
              if (midDist < MOUSE_R) boost = 1 + (1 - midDist / MOUSE_R) * 2
            }

            const lc = isDark ? 150 : 100
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${lc},${lc},${lc + 10},${Math.min(opacity * boost, 0.15)})`
            ctx.lineWidth = (1 - d2 / cR2) * 0.8
            ctx.stroke()
          }
        }
      }
    }

    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default ConstellationField
