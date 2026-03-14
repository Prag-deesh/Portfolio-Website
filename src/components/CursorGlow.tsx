import { useEffect, useState } from 'react'

/**
 * Enhanced cursor glow with dual-layer radial gradient.
 * Creates a spotlight + accent halo effect that follows the mouse.
 */
const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -300, y: -300 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Primary soft glow */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: pos.x - 250,
          top: pos.y - 250,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--cursor-glow) 0%, transparent 60%)',
          transition: 'left 0.12s ease-out, top 0.12s ease-out',
        }}
      />
      {/* Secondary accent halo */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: pos.x - 150,
          top: pos.y - 150,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-orb-1) 0%, transparent 70%)',
          transition: 'left 0.08s ease-out, top 0.08s ease-out',
          opacity: 0.6,
        }}
      />
    </>
  )
}

export default CursorGlow
