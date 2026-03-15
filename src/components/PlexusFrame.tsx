import { motion } from 'framer-motion'
import { personalInfo } from '../helpers/constants'
import type { PlexusFrameProps } from '../helpers/interfaces'

const PlexusFrame = ({
  imageSrc,
  fallbackEmoji = '👨‍💻',
  width = 'w-64',
  height = 'h-72',
}: PlexusFrameProps) => {
  return (
    <div className={`relative ${width} ${height}`}>

      {/* ── Offset outer frame (behind, shifted) ── */}
      <div className="absolute -inset-3 pointer-events-none">
        {/* Outer border */}
        <div className="w-full h-full border border-[var(--text-primary)] opacity-[0.07]" />
        {/* Outer corner node dots */}
        <span className="absolute top-[-2px] left-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-25" />
        <span className="absolute top-[-2px] right-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-25" />
        <span className="absolute bottom-[-2px] left-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-25" />
        <span className="absolute bottom-[-2px] right-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-25" />
      </div>

      {/* ── Main frame ── */}
      <div className="relative w-full h-full overflow-hidden border border-[var(--text-primary)] opacity-100" style={{ borderColor: 'var(--border-glass)' }}>

        {/* Corner brackets + node dots */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Top-left */}
          <span className="absolute top-0 left-0 w-5 h-px bg-[var(--text-primary)] opacity-40" />
          <span className="absolute top-0 left-0 w-px h-5 bg-[var(--text-primary)] opacity-40" />
          <span className="absolute top-[-2px] left-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-50" />
          {/* Top-right */}
          <span className="absolute top-0 right-0 w-5 h-px bg-[var(--text-primary)] opacity-40" />
          <span className="absolute top-0 right-0 w-px h-5 bg-[var(--text-primary)] opacity-40" />
          <span className="absolute top-[-2px] right-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-50" />
          {/* Bottom-left */}
          <span className="absolute bottom-0 left-0 w-5 h-px bg-[var(--text-primary)] opacity-40" />
          <span className="absolute bottom-0 left-0 w-px h-5 bg-[var(--text-primary)] opacity-40" />
          <span className="absolute bottom-[-2px] left-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-50" />
          {/* Bottom-right */}
          <span className="absolute bottom-0 right-0 w-5 h-px bg-[var(--text-primary)] opacity-40" />
          <span className="absolute bottom-0 right-0 w-px h-5 bg-[var(--text-primary)] opacity-40" />
          <span className="absolute bottom-[-2px] right-[-2px] w-[4px] h-[4px] bg-[var(--text-primary)] opacity-50" />
        </div>

        {/* Background */}
        <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

        {/* Photo or fallback */}
        {imageSrc ? (
          <img src={imageSrc} alt={personalInfo.name} className="relative z-10 w-full h-full object-cover" />
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center text-7xl select-none">
            {fallbackEmoji}
          </div>
        )}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(var(--text-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 z-30 pointer-events-none hero-scanline" />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, transparent 40%, var(--bg-primary) 110%)', opacity: 0.35 }}
        />
      </div>

      {/* ── Animated dashed line connecting to offset frame ── */}
      <motion.div
        className="absolute -top-3 -left-3 w-[calc(100%+24px)] h-px pointer-events-none"
        style={{ background: 'repeating-linear-gradient(90deg, var(--text-primary) 0 3px, transparent 3px 9px)', opacity: 0.08 }}
        animate={{ x: [0, 9] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-3 -left-3 w-[calc(100%+24px)] h-px pointer-events-none"
        style={{ background: 'repeating-linear-gradient(90deg, var(--text-primary) 0 3px, transparent 3px 9px)', opacity: 0.08 }}
        animate={{ x: [9, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default PlexusFrame
