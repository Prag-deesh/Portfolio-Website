/**
 * HeroAvatar — CSS + Framer Motion animated profile visual.
 * Morphing geometric clip-path, grid overlay, scan line,
 * orbiting dots, corner bracket HUD — all matching the
 * sharp monochrome plexus theme.
 */
import { motion } from 'framer-motion'

interface Props {
  imageSrc?: string
  fallbackEmoji?: string
}

/* 6 orbiting dots at different radii & speeds */
const orbitDots = [
  { r: 140, speed: 12, size: 4, delay: 0 },
  { r: 140, speed: 12, size: 3, delay: 4 },
  { r: 155, speed: 18, size: 3, delay: 1 },
  { r: 155, speed: 18, size: 2.5, delay: 7 },
  { r: 125, speed: 25, size: 2, delay: 3 },
  { r: 125, speed: 25, size: 2, delay: 13 },
]

const HeroAvatar = ({ imageSrc, fallbackEmoji = '👨‍💻' }: Props) => {
  return (
    <div className="hero-avatar-wrap relative w-[300px] h-[300px] md:w-[340px] md:h-[340px]">

      {/* ── Corner brackets (HUD) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* TL */}
        <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--text-primary)] opacity-15" />
        {/* TR */}
        <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--text-primary)] opacity-15" />
        {/* BL */}
        <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--text-primary)] opacity-15" />
        {/* BR */}
        <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--text-primary)] opacity-15" />
      </div>

      {/* ── Dashed orbit rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[280px] h-[280px] md:w-[310px] md:h-[310px] border border-dashed border-[var(--text-primary)] opacity-[0.06]"
          style={{ clipPath: 'circle(50%)' }} />
        <div className="absolute w-[250px] h-[250px] md:w-[280px] md:h-[280px] border border-dashed border-[var(--text-primary)] opacity-[0.04]"
          style={{ clipPath: 'circle(50%)' }} />
      </div>

      {/* ── Orbiting dots ── */}
      {orbitDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: dot.size,
            height: dot.size,
            background: 'var(--text-primary)',
            opacity: 0.35,
            top: '50%',
            left: '50%',
            marginTop: -dot.size / 2,
            marginLeft: -dot.size / 2,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: dot.speed,
            repeat: Infinity,
            ease: 'linear',
            delay: dot.delay,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: dot.size,
              height: dot.size,
              background: 'var(--text-primary)',
              top: -dot.r,
              left: 0,
            }}
          />
        </motion.div>
      ))}

      {/* ── Main image container with morph clip-path ── */}
      <div className="absolute inset-[24px] md:inset-[20px] overflow-hidden hero-avatar-clip">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

        {/* Photo or fallback */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Profile"
            className="relative z-10 w-full h-full object-cover"
          />
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center text-8xl select-none">
            {fallbackEmoji}
          </div>
        )}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--text-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 z-30 pointer-events-none hero-scanline" />

        {/* Vignette edge */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 50%, var(--bg-primary) 100%)',
            opacity: 0.4,
          }}
        />

        {/* Border */}
        <div className="absolute inset-0 z-20 border border-[var(--text-primary)] opacity-10 pointer-events-none hero-avatar-clip" />
      </div>

      {/* ── Rotating accent arcs ── */}
      <motion.div
        className="absolute inset-[14px] md:inset-[10px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
          <path
            d="M 150 10 A 140 140 0 0 1 240 40"
            stroke="var(--text-primary)"
            strokeWidth="1.5"
            opacity="0.2"
          />
          <path
            d="M 150 290 A 140 140 0 0 1 60 260"
            stroke="var(--text-primary)"
            strokeWidth="1.5"
            opacity="0.2"
          />
        </svg>
      </motion.div>

      {/* ── Counter-rotating arc ── */}
      <motion.div
        className="absolute inset-[8px] md:inset-[4px] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
          <path
            d="M 40 100 A 140 140 0 0 1 40 200"
            stroke="var(--text-primary)"
            strokeWidth="1"
            opacity="0.1"
            strokeDasharray="4 8"
          />
        </svg>
      </motion.div>

      {/* ── HUD labels ── */}
      <span
        className="absolute bottom-2 left-7 text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-40 font-medium pointer-events-none select-none"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        sys.render
      </span>
      <span
        className="absolute top-2 right-7 text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-40 font-medium pointer-events-none select-none"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        node.active
      </span>
    </div>
  )
}

export default HeroAvatar
