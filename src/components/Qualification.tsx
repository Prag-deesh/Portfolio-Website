import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCalendar } from 'react-icons/hi'
import { education, experience } from '../helpers/constants'
import { sectionHeader, sectionTitle, sectionSubtitle, titleHighlight, glassCardHover } from '../helpers/styles'

const Qualification = () => {
  const [tab, setTab] = useState<'education' | 'experience'>('education')
  const items = tab === 'education' ? education : experience

  return (
    <section id="qualification" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className={sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={sectionTitle}><span className={titleHighlight}>Qualification</span></h2>
          <p className={sectionSubtitle}>My journey so far</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {([
            { key: 'education' as const, icon: <HiOutlineAcademicCap />, label: 'Education' },
            { key: 'experience' as const, icon: <HiOutlineBriefcase />, label: 'Experience' },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`plexus-border plexus-border-sm flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-250
                ${tab === t.key
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent!'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
            >
              <span className="text-lg">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="max-w-[600px] mx-auto relative pl-8">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[var(--border-glass)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === 'education' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === 'education' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[22px] top-6 w-3 h-3 rounded-sm bg-[var(--text-primary)] border-[3px] border-[var(--bg-primary)] z-10 rotate-45" />
                  <div className={`${glassCardHover} p-5 px-6`}>
                    <h3 className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mb-2">{item.subtitle}</p>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                      <HiOutlineCalendar /> {item.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Qualification
