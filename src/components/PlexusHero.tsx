/**
 * PlexusHero — Geometric photo frame with constellation nodes,
 * scan-line animation, HUD corner brackets, data grid, and
 * mouse-reactive particles orbiting around a clipped profile image.
 */
import { useEffect, useRef, useState } from 'react'

interface Props {
  imageSrc?: string
  fallbackLetter?: string
  theme?: 'light' | 'dark'
  size?: number
}

const TAU = Math.PI * 2

interface OrbNode {
  angle: number
  radius: number
  speed: number
  baseSize: number
  phase: number
}

interface Spark {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number
}

const PlexusHero = ({
  imageSrc,
  fallbackLetter = 'P',
  theme = 'light',
  size = 340,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  themeRef.current = theme

  /* Load image */
  useEffect(() => {
    if (!imageSrc) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => { imgRef.current = img; setImgLoaded(true) }
    img.src = imageSrc
  }, [imageSrc])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = size / 2
    const cy = size / 2
    const imgRadius = size * 0.28

    /* ── Orbital nodes (2 rings) ── */
    const rings: OrbNode[][] = []
    const ringDefs = [
      { count: 10, r: size * 0.36, spd: 0.06 },
      { count: 14, r: size * 0.46, spd: -0.04 },
    ]
    for (const def of ringDefs) {
      const ring: OrbNode[] = []
      for (let i = 0; i < def.count; i++) {
        ring.push({
          angle: (TAU * i) / def.count + Math.random() * 0.3,
          radius: def.r + (Math.random() - 0.5) * 12,
          speed: def.spd * (0.8 + Math.random() * 0.4),
          baseSize: 1.2 + Math.random() * 0.8,
          phase: Math.random() * TAU,
        })
      }
      rings.push(ring)
    }

    /* ── Spark particles ── */
    const sparks: Spark[] = []
    const spawnSpark = () => {
      const angle = Math.random() * TAU
      const r = imgRadius + 10 + Math.random() * 20
      sparks.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        life: 0,
        maxLife: 60 + Math.random() * 80,
        size: 0.5 + Math.random() * 0.8,
      })
    }

    /* ── Mouse ── */
    const getRect = canvas.getBoundingClientRect.bind(canvas)
    const onMove = (e: MouseEvent) => {
      const r = getRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true }
    }
    const onLeave = () => { mouseRef.current.active = false }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    let t = 0
    let raf = 0

    const draw = () => {
      raf = requestAnimationFrame(draw)
      t += 0.016

      const isDark = themeRef.current === 'dark'
      const fg = isDark ? '230,230,230' : '25,25,25'
      const fgFull = isDark ? '#e6e6e6' : '#191919'
      const bg = isDark ? '#0e1015' : '#f9fafb'
      const scanAlpha = isDark ? 0.04 : 0.025

      ctx.fillStyle = bg
      ctx.fillRect(0, 0, size, size)

      /* ── Data grid (subtle) ── */
      ctx.strokeStyle = `rgba(${fg},0.04)`
      ctx.lineWidth = 0.5
      const gridStep = size / 16
      for (let i = 1; i < 16; i++) {
        const pos = i * gridStep
        ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, size); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(size, pos); ctx.stroke()
      }

      /* ── Outer frame with corner brackets ── */
      const pad = size * 0.06
      const bracketLen = size * 0.1
      ctx.strokeStyle = `rgba(${fg},0.12)`
      ctx.lineWidth = 1
      // top-left
      ctx.beginPath(); ctx.moveTo(pad, pad + bracketLen); ctx.lineTo(pad, pad); ctx.lineTo(pad + bracketLen, pad); ctx.stroke()
      // top-right
      ctx.beginPath(); ctx.moveTo(size - pad - bracketLen, pad); ctx.lineTo(size - pad, pad); ctx.lineTo(size - pad, pad + bracketLen); ctx.stroke()
      // bottom-right
      ctx.beginPath(); ctx.moveTo(size - pad, size - pad - bracketLen); ctx.lineTo(size - pad, size - pad); ctx.lineTo(size - pad - bracketLen, size - pad); ctx.stroke()
      // bottom-left
      ctx.beginPath(); ctx.moveTo(pad + bracketLen, size - pad); ctx.lineTo(pad, size - pad); ctx.lineTo(pad, size - pad - bracketLen); ctx.stroke()

      /* ── Orbit ring guides (dashed circles) ── */
      ctx.setLineDash([3, 6])
      ctx.strokeStyle = `rgba(${fg},0.06)`
      ctx.lineWidth = 0.5
      for (const def of ringDefs) {
        ctx.beginPath(); ctx.arc(cx, cy, def.r, 0, TAU); ctx.stroke()
      }
      ctx.setLineDash([])

      /* ── Profile image (circular clip) ── */
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, imgRadius, 0, TAU)
      ctx.clip()

      if (imgRef.current) {
        const img = imgRef.current
        const aspect = img.width / img.height
        let dw: number, dh: number
        if (aspect > 1) {
          dh = imgRadius * 2
          dw = dh * aspect
        } else {
          dw = imgRadius * 2
          dh = dw / aspect
        }
        ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh)

        // Slight vignette over image
        const grad = ctx.createRadialGradient(cx, cy, imgRadius * 0.5, cx, cy, imgRadius)
        grad.addColorStop(0, 'rgba(0,0,0,0)')
        grad.addColorStop(1, isDark ? 'rgba(14,16,21,0.45)' : 'rgba(249,250,251,0.35)')
        ctx.fillStyle = grad
        ctx.fillRect(cx - imgRadius, cy - imgRadius, imgRadius * 2, imgRadius * 2)
      } else {
        // Fallback: draw letter
        ctx.fillStyle = isDark ? 'rgba(230,230,230,0.06)' : 'rgba(25,25,25,0.04)'
        ctx.fillRect(cx - imgRadius, cy - imgRadius, imgRadius * 2, imgRadius * 2)
        const letterSize = size * 0.24
        ctx.font = `700 ${letterSize}px 'Space Grotesk', 'Inter', sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = fgFull
        ctx.fillText(fallbackLetter, cx, cy)
      }
      ctx.restore()

      /* ── Circle border around image ── */
      ctx.beginPath()
      ctx.arc(cx, cy, imgRadius, 0, TAU)
      ctx.strokeStyle = `rgba(${fg},0.15)`
      ctx.lineWidth = 1.5
      ctx.stroke()

      /* ── Rotating arc accent ── */
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(t * 0.3)
      ctx.beginPath()
      ctx.arc(0, 0, imgRadius + 6, 0, Math.PI * 0.4)
      ctx.strokeStyle = `rgba(${fg},0.25)`
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.rotate(Math.PI)
      ctx.beginPath()
      ctx.arc(0, 0, imgRadius + 6, 0, Math.PI * 0.4)
      ctx.stroke()
      ctx.restore()

      /* ── Scan line ── */
      const scanY = cy - imgRadius + ((t * 40) % (imgRadius * 2))
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, imgRadius, 0, TAU)
      ctx.clip()
      const scanGrad = ctx.createLinearGradient(cx - imgRadius, scanY - 8, cx + imgRadius, scanY + 8)
      scanGrad.addColorStop(0, `rgba(${fg},0)`)
      scanGrad.addColorStop(0.5, `rgba(${fg},${scanAlpha})`)
      scanGrad.addColorStop(1, `rgba(${fg},0)`)
      ctx.fillStyle = scanGrad
      ctx.fillRect(cx - imgRadius, scanY - 4, imgRadius * 2, 8)
      ctx.restore()

      /* ── Orbital nodes ── */
      const allPos: { x: number; y: number; sz: number }[] = []
      for (const ring of rings) {
        for (const n of ring) {
          const a = n.angle + t * n.speed
          const wobble = Math.sin(t * 1.2 + n.phase) * 4
          const r = n.radius + wobble
          const x = cx + Math.cos(a) * r
          const y = cy + Math.sin(a) * r
          const pulse = 1 + Math.sin(t * 2.5 + n.phase) * 0.3
          allPos.push({ x, y, sz: n.baseSize * pulse })
        }
      }

      /* Sparks */
      if (Math.random() < 0.15) spawnSpark()
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx; s.y += s.vy; s.life++
        if (s.life > s.maxLife) { sparks.splice(i, 1); continue }
        const alpha = 1 - s.life / s.maxLife
        allPos.push({ x: s.x, y: s.y, sz: s.size * alpha })
      }

      /* ── Connections between nearby nodes ── */
      const connectDist = size * 0.16
      const cd2 = connectDist * connectDist
      for (let i = 0; i < allPos.length; i++) {
        for (let j = i + 1; j < allPos.length; j++) {
          const dx = allPos[i].x - allPos[j].x
          const dy = allPos[i].y - allPos[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < cd2) {
            const alpha = (1 - d2 / cd2) * 0.12
            ctx.beginPath()
            ctx.moveTo(allPos[i].x, allPos[i].y)
            ctx.lineTo(allPos[j].x, allPos[j].y)
            ctx.strokeStyle = `rgba(${fg},${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      /* ── Mouse connections ── */
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        for (const p of allPos) {
          const dx = p.x - mx
          const dy = p.y - my
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < size * 0.2) {
            const alpha = (1 - d / (size * 0.2)) * 0.2
            ctx.beginPath()
            ctx.moveTo(mx, my)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(${fg},${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
        // Mouse repel sparks
        for (const s of sparks) {
          const dx = s.x - mx; const dy = s.y - my
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 50 && d > 1) {
            s.vx += (dx / d) * 0.2
            s.vy += (dy / d) * 0.2
          }
        }
      }

      /* ── Draw all nodes ── */
      for (const p of allPos) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.sz, 0, TAU)
        ctx.fillStyle = `rgba(${fg},0.5)`
        ctx.fill()
      }

      /* ── HUD text labels ── */
      ctx.save()
      ctx.font = `500 ${size * 0.025}px 'Space Grotesk', monospace`
      ctx.fillStyle = `rgba(${fg},0.18)`
      ctx.textAlign = 'left'
      ctx.fillText(`NODE_FIELD: ${allPos.length}`, pad + 4, size - pad - 6)
      ctx.textAlign = 'right'
      ctx.fillText(`SYS.ACTIVE`, size - pad - 4, pad + 14)
      ctx.restore()

      /* ── Crosshair at center (tiny) ── */
      const chLen = 6
      ctx.strokeStyle = `rgba(${fg},0.1)`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(cx - chLen, cy); ctx.lineTo(cx - 3, cy)
      ctx.moveTo(cx + 3, cy); ctx.lineTo(cx + chLen, cy)
      ctx.moveTo(cx, cy - chLen); ctx.lineTo(cx, cy - 3)
      ctx.moveTo(cx, cy + 3); ctx.lineTo(cx, cy + chLen)
      ctx.stroke()
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [fallbackLetter, size, imgLoaded])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="pointer-events-auto"
    />
  )
}

export default PlexusHero
