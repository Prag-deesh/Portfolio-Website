import { useEffect, useRef, memo } from 'react'
import type { ConstellationFieldProps } from '../helpers/interfaces'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; phase: number
}

const ConstellationField = memo(({ theme = 'dark', className = '' }: ConstellationFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // ── Sizing ──
    let w = window.innerWidth
    let h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio, 2)
    const isMobile = w < 768

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

    // ── Particles — much fewer on mobile ──
    const COUNT = isMobile ? 60 : 200
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

    // ── Touch support — particles react to finger on mobile ──
    let touchFadeTimer: ReturnType<typeof setTimeout>
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        mouseRef.current.x = touch.clientX
        mouseRef.current.y = touch.clientY
        clearTimeout(touchFadeTimer)
      }
    }
    const onTouchEnd = () => {
      // Gradually fade out interaction after finger lifts (feels natural)
      clearTimeout(touchFadeTimer)
      touchFadeTimer = setTimeout(() => {
        mouseRef.current.x = -9999
        mouseRef.current.y = -9999
      }, 600)
    }

    // Debounce resize to avoid layout thrash
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setSize, 150)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('resize', onResize)

    // ── Config ──
    const MOUSE_R = 180
    const REPEL_R = 50
    const CONNECT_R = isMobile ? 80 : 110
    const TARGET_FPS = isMobile ? 30 : 60
    const FRAME_INTERVAL = 1000 / TARGET_FPS
    let time = 0
    let raf = 0
    let lastFrameTime = 0

    // Pre-compute squared distances to avoid sqrt where possible
    const MOUSE_R2 = (MOUSE_R * 2.5) ** 2
    const cR2 = CONNECT_R * CONNECT_R

    // ── Loop ──
    const loop = (timestamp: number) => {
      raf = requestAnimationFrame(loop)

      // Frame throttle — skip frames to hit target FPS
      const delta = timestamp - lastFrameTime
      if (delta < FRAME_INTERVAL) return
      lastFrameTime = timestamp - (delta % FRAME_INTERVAL)

      time += 0.01

      const isDark = themeRef.current === 'dark'
      const bgR = isDark ? 18 : 250
      const bgG = isDark ? 18 : 250
      const bgB = isDark ? 18 : 250

      // Trail: semi-transparent bg fill creates ghosting
      ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},0.15)`
      ctx.fillRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseOn = mx > -1000

      // Pre-calc sin for breathing (shared across all particles this frame)
      const sinTime = Math.sin(time * 2)

      // ── Update + draw particles ──
      // Batch particle drawing into a single path per alpha group
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i]

        // Mouse interaction
        if (mouseOn) {
          const dx = mx - p.x
          const dy = my - p.y
          const d2 = dx * dx + dy * dy

          if (d2 < MOUSE_R * MOUSE_R && d2 > 1) {
            const dist = Math.sqrt(d2)
            const nx = dx / dist
            const ny = dy / dist

            if (dist < REPEL_R) {
              const f = (REPEL_R - dist) / REPEL_R
              p.vx -= nx * f * 2.5
              p.vy -= ny * f * 2.5
            } else {
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

        // Breathing — use shared sinTime, offset by phase
        const breath = 1 + (sinTime * Math.cos(p.phase) + Math.cos(time * 2) * Math.sin(p.phase)) * 0.075
        const r = p.size * breath + t

        // Color
        let cr: number, cg: number, cb: number
        if (isDark) {
          cr = 140 + t * 40
          cg = 140 + t * 40
          cb = 150 + t * 40
        } else {
          cr = 80 + t * 30
          cg = 80 + t * 30
          cb = 90 + t * 30
        }
        const alpha = 0.15 + t * 0.25

        // Skip glow halo on mobile — expensive per-particle arc calls
        if (!isMobile && r > 1.2) {
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

      // ── Connections — only near mouse, with early exit ──
      for (let i = 0; i < COUNT; i++) {
        const a = particles[i]
        if (mouseOn) {
          const da = (mx - a.x) ** 2 + (my - a.y) ** 2
          if (da > MOUSE_R2) continue
        } else {
          // No mouse: sparse connections only
          if (i % 6 !== 0) continue
        }

        for (let j = i + 1; j < COUNT; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          // Fast axis-aligned rejection before computing full distance
          if (dx > CONNECT_R || dx < -CONNECT_R) continue
          const dy = a.y - b.y
          if (dy > CONNECT_R || dy < -CONNECT_R) continue

          const d2 = dx * dx + dy * dy
          if (d2 < cR2) {
            const opacity = (1 - d2 / cR2) * 0.08

            let boost = 1
            if (mouseOn) {
              const midX = (a.x + b.x) * 0.5 - mx
              const midY = (a.y + b.y) * 0.5 - my
              const midDist2 = midX * midX + midY * midY
              if (midDist2 < MOUSE_R * MOUSE_R) {
                boost = 1 + (1 - Math.sqrt(midDist2) / MOUSE_R) * 2
              }
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

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      clearTimeout(touchFadeTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
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
})

ConstellationField.displayName = 'ConstellationField'

export default ConstellationField
