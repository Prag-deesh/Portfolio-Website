import { motion } from 'framer-motion'
import { HiOutlineDownload } from 'react-icons/hi'
import { personalInfo, aboutStats, sections, aboutLabels } from '../helpers/constants'
import { container, labelSm, fadeIn, fadeUp, statCard } from '../helpers/styles'
import {
  aboutSection, aboutStatsGrid, aboutStatIcon,
  aboutStatValue, aboutParagraph, aboutCvBtn,
} from '../helpers/styles/components'
import SectionHeader from './SectionHeader'

const sec = sections.about

const About = () => {
  return (
    <section id={sec.id} className={aboutSection}>
      <div className={container}>
        <SectionHeader section={sec} animation={fadeIn()} />

        {/* Stats row */}
        <motion.div className={aboutStatsGrid} {...fadeUp}>
          {aboutStats.map((stat) => (
            <div key={stat.label} className={statCard}>
              <span className={aboutStatIcon}>{stat.icon}</span>
              <h3 className={aboutStatValue}>{stat.value}</h3>
              <p className={labelSm}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          className="max-w-[720px] mx-auto text-center"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {personalInfo.aboutDescription.map((para, i) => (
            <p key={i} className={aboutParagraph}>{para}</p>
          ))}

          <a href={personalInfo.cvPath} download className={aboutCvBtn}>
            {aboutLabels.downloadCv} <HiOutlineDownload />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default About
