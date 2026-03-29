import { memo, useState, useEffect } from 'react'
import type { GradientBlobsProps } from '../helpers/interfaces'

/*
 * Performance-optimized gradient blobs.
 *
 * Old: 4 <motion.div> each with `filter: blur(80px)` + infinite JS animations
 *      = 4 GPU composite layers constantly repainting (paint storm on mobile).
 *
 * New: Pure CSS @keyframes with `will-change: transform`. The blur is baked into
 *      the radial-gradient (soft fade to transparent), so no real-time blur filter.
 *      CSS animations run on the compositor thread = zero main-thread cost.
 */

const blobPositions = [
  { id: 1, size: 500, sizeSm: 300, x: '-5%',  y: '-10%', duration: '22s', delay: '0s' },
  { id: 2, size: 400, sizeSm: 250, x: '60%',  y: '10%',  duration: '26s', delay: '-3s' },
  { id: 3, size: 350, sizeSm: 0,   x: '30%',  y: '50%',  duration: '20s', delay: '-1s' },   // hidden on mobile
  { id: 4, size: 300, sizeSm: 200, x: '75%',  y: '60%',  duration: '24s', delay: '-5s' },
]

const GradientBlobs = memo(({ theme }: GradientBlobsProps) => {
  const isDark = theme === 'dark'
  const opacity = isDark ? 0.15 : 0.12
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Soft radial gradients that naturally fade — no blur filter needed
  const colors = isDark
    ? [
        { c1: 'rgba(58,58,58,0.6)', c2: 'rgba(42,42,42,0)' },
        { c1: 'rgba(64,64,64,0.5)', c2: 'rgba(48,48,48,0)' },
        { c1: 'rgba(53,53,53,0.5)', c2: 'rgba(62,62,62,0)' },
        { c1: 'rgba(56,56,56,0.5)', c2: 'rgba(68,68,68,0)' },
      ]
    : [
        { c1: 'rgba(136,136,136,0.5)', c2: 'rgba(102,102,102,0)' },
        { c1: 'rgba(153,153,153,0.5)', c2: 'rgba(119,119,119,0)' },
        { c1: 'rgba(119,119,119,0.5)', c2: 'rgba(153,153,153,0)' },
        { c1: 'rgba(136,136,136,0.5)', c2: 'rgba(170,170,170,0)' },
      ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden>
      {blobPositions.map((blob, i) => {
        const blobSize = isMobile ? blob.sizeSm : blob.size
        if (blobSize === 0) return null  // skip blob on mobile
        return (
          <div
            key={blob.id}
            className="absolute blob-float"
            style={{
              left: blob.x,
              top: blob.y,
              width: blobSize,
              height: blobSize,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, ${colors[i].c1}, ${colors[i].c2})`,
              opacity,
              willChange: 'transform',
              animationDuration: blob.duration,
              animationDelay: blob.delay,
            }}
          />
        )
      })}
    </div>
  )
})

GradientBlobs.displayName = 'GradientBlobs'

export default GradientBlobs
