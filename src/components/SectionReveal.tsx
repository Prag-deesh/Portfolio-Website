import { useRef } from 'react'
import { m as motion, useScroll, useTransform } from 'framer-motion'
import type { SectionRevealProps } from '../helpers/interfaces'
import { useIsMobile } from '../helpers/useIsMobile'

const SectionReveal = ({
  children,
  className = '',
  parallaxY = 40,
  scaleFrom = 0.98,
}: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // On mobile: no parallax, no scale = zero scroll-linked transform cost
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [parallaxY, -parallaxY])
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], isMobile ? [1, 1, 1] : [scaleFrom, 1, 1])

  return (
    <motion.div
      ref={ref}
      style={isMobile ? undefined : { y, scale }}
      className={`${className} overflow-visible`}
    >
      {children}
    </motion.div>
  )
}

export default SectionReveal
