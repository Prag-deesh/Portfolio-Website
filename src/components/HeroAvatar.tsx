import { useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../helpers/constants'
import type { HeroAvatarProps } from '../helpers/interfaces'

/* Orbiting dots — 3 rings at different speeds & sizes */
/* Radii are for md+ (370 container → 185 radius). Mobile uses scaled values. */
const orbitDotsMd = [
  /* Inner ring — fast, small */
  { r: 155, speed: 12, size: 4, delay: 0 },
  { r: 155, speed: 12, size: 3, delay: 6 },
  /* Mid ring — medium */
  { r: 175, speed: 18, size: 5, delay: 1 },
  { r: 175, speed: 18, size: 4, delay: 9 },
  { r: 175, speed: 18, size: 3, delay: 4 },
  /* Outer ring — slow, large */
  { r: 195, speed: 26, size: 3, delay: 2 },
  { r: 195, speed: 26, size: 2.5, delay: 13 },
  { r: 195, speed: 26, size: 2.5, delay: 20 },
]
/* Mobile: fewer dots + tighter radii to avoid overflow */
const orbitDotsSm = [
  { r: 120, speed: 14, size: 3, delay: 0 },
  { r: 130, speed: 20, size: 4, delay: 2 },
  { r: 130, speed: 20, size: 3, delay: 8 },
  { r: 140, speed: 26, size: 2.5, delay: 4 },
]

const HeroAvatar = memo(({ imageSrc, fallbackEmoji = '👨‍💻' }: HeroAvatarProps) => {
  const [isMd, setIsMd] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  const orbitDots = isMd ? orbitDotsMd : orbitDotsSm

  return (
    <div className="hero-avatar-wrap relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[370px] md:h-[370px] mx-auto"
      style={{ overflow: 'visible', isolation: 'isolate' }}
    >

      {/* ── Corner brackets + node dots ── */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-0 left-0 w-8 h-px bg-[var(--text-primary)] opacity-35" />
        <span className="absolute top-0 left-0 w-px h-8 bg-[var(--text-primary)] opacity-35" />
        <span className="absolute top-[-2px] left-[-2px] w-[5px] h-[5px] bg-[var(--text-primary)] opacity-45" />

        <span className="absolute top-0 right-0 w-8 h-px bg-[var(--text-primary)] opacity-35" />
        <span className="absolute top-0 right-0 w-px h-8 bg-[var(--text-primary)] opacity-35" />
        <span className="absolute top-[-2px] right-[-2px] w-[5px] h-[5px] bg-[var(--text-primary)] opacity-45" />

        <span className="absolute bottom-0 left-0 w-8 h-px bg-[var(--text-primary)] opacity-35" />
        <span className="absolute bottom-0 left-0 w-px h-8 bg-[var(--text-primary)] opacity-35" />
        <span className="absolute bottom-[-2px] left-[-2px] w-[5px] h-[5px] bg-[var(--text-primary)] opacity-45" />

        <span className="absolute bottom-0 right-0 w-8 h-px bg-[var(--text-primary)] opacity-35" />
        <span className="absolute bottom-0 right-0 w-px h-8 bg-[var(--text-primary)] opacity-35" />
        <span className="absolute bottom-[-2px] right-[-2px] w-[5px] h-[5px] bg-[var(--text-primary)] opacity-45" />
      </div>

      {/* ── Pulsing orbit rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[230px] h-[230px] sm:w-[270px] sm:h-[270px] md:w-[360px] md:h-[360px] border border-dashed border-[var(--text-primary)] rounded-full"
          animate={{ opacity: [0.06, 0.1, 0.06], scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[330px] md:h-[330px] border border-dashed border-[var(--text-primary)] rounded-full"
          animate={{ opacity: [0.04, 0.07, 0.04], scale: [1, 0.98, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* ── Orbiting dots ── */}
      {orbitDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: dot.size,
            height: dot.size,
            top: '50%',
            left: '50%',
            marginTop: -dot.size / 2,
            marginLeft: -dot.size / 2,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: dot.speed, repeat: Infinity, ease: 'linear', delay: dot.delay }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              background: 'var(--text-primary)',
              top: -dot.r,
              left: 0,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: dot.delay * 0.3 }}
          />
        </motion.div>
      ))}

      {/* ── Main image container ── */}
      <div className="absolute inset-[18px] sm:inset-[22px] md:inset-[18px] overflow-hidden hero-avatar-clip">
        <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

        {imageSrc ? (
          <motion.div
            className="relative z-10 w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <picture>
              <source
                type="image/webp"
                srcSet="/profile-400.webp 400w, /profile-480.webp 480w, /profile-800.webp 800w"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 370px"
              />
              <source
                type="image/jpeg"
                srcSet="/profile-400.jpg 400w, /profile-480.jpg 480w, /profile-800.jpg 800w"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 370px"
              />
              <img
                src="/profile-800.jpg"
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                width={800}
                height={800}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </motion.div>
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center text-8xl select-none">
            {fallbackEmoji}
          </div>
        )}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: '20px 20px',
          }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 z-30 pointer-events-none hero-scanline" />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, transparent 35%, var(--bg-primary) 100%)', opacity: 0.55 }}
        />
      </div>

      {/* ── Primary rotating arcs ── */}
      <motion.div
        className="absolute inset-[10px] sm:inset-[12px] md:inset-[8px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
          <path d="M 150 6 A 144 144 0 0 1 260 50" stroke="var(--text-primary)" strokeWidth="1.5" opacity="0.25" />
          <path d="M 150 294 A 144 144 0 0 1 40 250" stroke="var(--text-primary)" strokeWidth="1.5" opacity="0.25" />
        </svg>
      </motion.div>

      {/* ── Counter-rotating dashed arcs ── */}
      <motion.div
        className="absolute inset-[4px] sm:inset-[6px] md:inset-[2px] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
          <path d="M 30 80 A 148 148 0 0 1 30 220" stroke="var(--text-primary)" strokeWidth="1" opacity="0.12" strokeDasharray="5 10" />
          <path d="M 270 80 A 148 148 0 0 0 270 220" stroke="var(--text-primary)" strokeWidth="1" opacity="0.12" strokeDasharray="5 10" />
        </svg>
      </motion.div>

      {/* ── Breathing glow ring ── */}
      <motion.div
        className="absolute inset-[14px] sm:inset-[18px] md:inset-[14px] pointer-events-none rounded-full"
        style={{ border: '1px solid var(--text-primary)' }}
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [0.99, 1.01, 0.99] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Label ── */}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-30 font-medium pointer-events-none select-none font-heading"
      >
        {personalInfo.name.toLowerCase()}
      </span>
    </div>
  )
})

HeroAvatar.displayName = 'HeroAvatar'

export default HeroAvatar
