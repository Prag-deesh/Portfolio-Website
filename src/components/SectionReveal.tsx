import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { SectionRevealProps } from '../helpers/interfaces'

const SectionReveal = ({
  children,
  className = '',
  parallaxY = 40,
  scaleFrom = 0.98,
}: SectionRevealProps) => {
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
