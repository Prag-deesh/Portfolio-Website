import { motion } from 'framer-motion'
import { skillCategories, softSkills } from '../helpers/constants'
import { glassCardHover, sectionHeader, sectionTitle, sectionSubtitle, titleHighlight } from '../helpers/styles'

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className={sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={sectionTitle}>My <span className={titleHighlight}>Skills</span></h2>
          <p className={sectionSubtitle}>Technologies I work with</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.title} variants={itemVariants} className={`${glassCardHover} p-6`}>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-5 text-[var(--text-primary)]">{cat.title}</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="plexus-border plexus-border-sm flex items-center gap-2.5 px-3 py-2 bg-[var(--bg-secondary)] text-xs font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:translate-x-1 transition-all duration-150 group"
                  >
                    <span className="text-base text-[var(--text-primary)] flex shrink-0 group-hover:text-[var(--bg-primary)] transition-colors duration-150">
                      {skill.icon}
                    </span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft skills */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Soft Skills</h3>
          <div className="flex justify-center gap-2.5 flex-wrap">
            {softSkills.map((skill) => (
              <span
                key={skill.name}
                className="plexus-border plexus-border-sm inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-y-0.5 transition-all duration-250"
              >
                <span className="text-base flex">{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
