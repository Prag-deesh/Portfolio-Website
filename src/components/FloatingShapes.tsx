/**
 * GradientBlobs — Large, soft animated gradient blobs for background depth.
 * Pure CSS + framer-motion. No WebGL needed.
 */
import { motion } from 'framer-motion'

const blobs = [
  { id: 1, size: 500, x: '-5%',  y: '-10%', color1: '#888888', color2: '#666666', duration: 22, delay: 0 },
  { id: 2, size: 400, x: '60%',  y: '10%',  color1: '#999999', color2: '#777777', duration: 26, delay: 3 },
  { id: 3, size: 350, x: '30%',  y: '50%',  color1: '#777777', color2: '#999999', duration: 20, delay: 1 },
  { id: 4, size: 300, x: '75%',  y: '60%',  color1: '#888888', color2: '#aaaaaa', duration: 24, delay: 5 },
]

const GradientBlobs = ({ theme }: { theme: 'light' | 'dark' }) => {
  const opacity = theme === 'dark' ? 0.15 : 0.08

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden>
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          style={{
            position: 'absolute',
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${blob.color1}, ${blob.color2}, transparent 70%)`,
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
