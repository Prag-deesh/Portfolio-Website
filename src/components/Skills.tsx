import { motion } from 'framer-motion'
import { primarySkills, secondarySkills, softSkills, sections, skillsLabels } from '../helpers/constants'
import {
  container, skillPillPrimary, skillPillSecondary, softSkillPill, fadeUp,
} from '../helpers/styles'
import {
  skillsSection, skillsPrimaryCard, skillsPrimaryHeading, skillsFocusLabel,
  skillsPrimaryGrid, skillsPrimaryIcon, skillsSecondaryWrap, skillsSecondaryCard,
  skillsSecondaryTitle, skillsSecondaryGrid, skillsSecondaryIcon,
  skillsSoftWrap, skillsSoftHeading, skillsSoftGrid, skillsSoftIcon,
} from '../helpers/styles/components'
import SectionHeader from './SectionHeader'

const sec = sections.skills

const Skills = () => {
  return (
    <section id={sec.id} className={skillsSection}>
      <div className={container}>
        <SectionHeader section={sec} animation={fadeUp} />

        <motion.div {...fadeUp} className={skillsPrimaryCard}>
          <h3 className={skillsPrimaryHeading}>
            {primarySkills.title}
            <span className={skillsFocusLabel}>{skillsLabels.currentFocus}</span>
          </h3>
          <div className={skillsPrimaryGrid}>
            {primarySkills.skills.map((skill) => (
              <div key={skill.name} className={skillPillPrimary}>
                <span className={skillsPrimaryIcon}>{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </motion.div>

        <div className={skillsSecondaryWrap}>
          {secondarySkills.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className={skillsSecondaryCard}
            >
              <h3 className={skillsSecondaryTitle}>{cat.title}</h3>
              <div className={skillsSecondaryGrid}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className={skillPillSecondary}>
                    <span className={skillsSecondaryIcon}>{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className={skillsSoftWrap} {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <h3 className={skillsSoftHeading}>{skillsLabels.softSkillsTitle}</h3>
          <div className={skillsSoftGrid}>
            {softSkills.map((skill) => (
              <span key={skill.name} className={softSkillPill}>
                <span className={skillsSoftIcon}>{skill.icon}</span>
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
