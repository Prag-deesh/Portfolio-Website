import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineArrowUp } from 'react-icons/hi'

const ScrollUp = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-11 h-11 bg-[var(--text-primary)] text-[var(--bg-primary)] text-lg shadow-md hover:-translate-y-1 hover:shadow-lg hover:opacity-85 transition-all duration-150 cursor-pointer"
        >
          <HiOutlineArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollUp
