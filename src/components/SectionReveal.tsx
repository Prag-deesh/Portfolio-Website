import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { SectionRevealProps } from '../helpers/interfaces'

const SectionReveal = ({
  children,
  className = '',
  parallaxY = 40,
  scaleFrom = 0.98,
}: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const mobileY = isMobile ? 0 : parallaxY
  const mobileScale = isMobile ? 1 : scaleFrom

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [mobileY, -mobileY])
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [mobileScale, 1, 1])

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className={`${className} overflow-visible`}
    >
      {children}
    </motion.div>
  )
}

export default SectionReveal
