/**
 * SectionReveal — Parallax scroll reveal wrapper.
 *
 * Adds:
 *  - Subtle parallax Y offset (children move slower than scroll)
 *  - Optional scale zoom-in from slightly shrunk
 *  - Content is always visible (no opacity gating)
 */
import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  /** Parallax intensity: 0 = none, 40 = gentle, 80 = strong */
  parallaxY?: number
  /** Zoom from this scale to 1 on scroll enter */
  scaleFrom?: number
}

const SectionReveal = ({
  children,
  className = '',
  parallaxY = 40,
  scaleFrom = 0.98,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallaxY, -parallaxY])
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [scaleFrom, 1, 1])

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default SectionReveal
