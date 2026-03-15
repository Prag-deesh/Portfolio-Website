import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import { projects, projectCategories } from '../helpers/constants'
import { glassCardHover, sectionHeader, sectionTitle, sectionSubtitle, titleHighlight } from '../helpers/styles'

const Work = () => {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.category === filter.toLowerCase())
  }, [filter])

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className={sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={sectionTitle}>My <span className={titleHighlight}>Portfolio</span></h2>
          <p className={sectionSubtitle}>Recent projects</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex justify-center gap-2 flex-wrap mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`plexus-border plexus-border-sm px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-250
                ${filter === cat
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent!'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
                className={`${glassCardHover} flex flex-col overflow-hidden group`}
              >
                {/* Image area */}
                <div
                  className="h-48 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${project.color}33, ${project.color}11)` }}
                >
                  {/* CUSTOMIZE: Replace emoji with <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" /> */}
                  <span className="text-6xl opacity-80">{project.emoji}</span>
                </div>

                <div className="p-5">
                  <span className="text-xs text-[var(--text-primary)] font-bold uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-sm font-semibold mt-1.5 mb-2 text-[var(--text-primary)]">{project.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium group-hover:text-[var(--text-primary)] transition-colors duration-150">
                    View Project <FiExternalLink />
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Work
