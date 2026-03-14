import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiOutlineDownload } from 'react-icons/hi'
import { personalInfo, aboutStats } from '../helpers/constants'
import { glassCardHover, btnPrimary, sectionHeader, sectionTitle, sectionSubtitle, titleHighlight } from '../helpers/styles'

const About = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" className="py-24" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className={sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={sectionTitle}>About <span className={titleHighlight}>Me</span></h2>
          <p className={sectionSubtitle}>My introduction</p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Image */}
          <motion.div style={{ y: imageY }} className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-72"
            >
              {/* CUSTOMIZE: Replace span with <img src="/your-photo.webp" className="w-full h-full object-cover relative z-10" /> */}
              <div className="w-full h-full bg-[var(--bg-secondary)] flex items-center justify-center text-7xl relative z-10 overflow-hidden">
                👨‍💻
              </div>
              <div className="absolute -inset-2 bg-[var(--text-primary)] opacity-15" />
            </motion.div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {aboutStats.map((stat) => (
                <div key={stat.label} className={`${glassCardHover} text-center p-5`}>
                  <span className="flex justify-center text-xl text-[var(--text-primary)] mb-2">{stat.icon}</span>
                  <h3 className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {personalInfo.aboutDescription.map((para, i) => (
              <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {para}
              </p>
            ))}

            <a href={personalInfo.cvPath} download className={`${btnPrimary} mt-4`}>
              Download CV <HiOutlineDownload />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
