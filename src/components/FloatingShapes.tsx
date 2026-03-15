import { motion } from 'framer-motion'
import type { GradientBlobsProps } from '../helpers/interfaces'

const blobPositions = [
  { id: 1, size: 500, x: '-5%',  y: '-10%', duration: 22, delay: 0 },
  { id: 2, size: 400, x: '60%',  y: '10%',  duration: 26, delay: 3 },
  { id: 3, size: 350, x: '30%',  y: '50%',  duration: 20, delay: 1 },
  { id: 4, size: 300, x: '75%',  y: '60%',  duration: 24, delay: 5 },
]

const GradientBlobs = ({ theme }: GradientBlobsProps) => {
  const isDark = theme === 'dark'
  const opacity = isDark ? 0.15 : 0.12
  // Dark mode: slightly lighter than bg to create subtle bright patches
  // Light mode: slightly darker than bg to create subtle shadow patches
  // Both create visible depth without clashing
  const colors = isDark
    ? [
        { c1: '#3a3a3a', c2: '#2a2a2a' },
        { c1: '#404040', c2: '#303030' },
        { c1: '#353535', c2: '#3e3e3e' },
        { c1: '#383838', c2: '#444444' },
      ]
    : [
        { c1: '#888888', c2: '#666666' },
        { c1: '#999999', c2: '#777777' },
        { c1: '#777777', c2: '#999999' },
        { c1: '#888888', c2: '#aaaaaa' },
      ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden>
      {blobPositions.map((blob, i) => (
        <motion.div
          key={blob.id}
          style={{
            position: 'absolute',
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${colors[i].c1}, ${colors[i].c2}, transparent 70%)`,
            filter: 'blur(80px)',
            opacity,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay,
          }}
        />
      ))}
    </div>
  )
}

export default GradientBlobs
