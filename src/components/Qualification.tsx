import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCalendar } from 'react-icons/hi'
import { education, experience, sections, qualificationTabs } from '../helpers/constants'
import {
  container, timelineLine, timelineDot, fadeIn,
} from '../helpers/styles'
import {
  qualSection, qualTabsWrap, qualTimeline, qualTimelineItems, qualTimelineItem,
  qualTimelineCard, qualTitle, qualSubtitle, qualPeriod,
} from '../helpers/styles/components'
import SectionHeader from './SectionHeader'
import TabBar from './TabBar'

const sec = sections.qualification

const Qualification = () => {
  const [tab, setTab] = useState<'education' | 'experience'>('experience')
  const items = tab === 'education' ? education : experience

  return (
    <section id={sec.id} className={qualSection}>
      <div className={container}>
        <SectionHeader section={sec} animation={fadeIn()} />

        <TabBar
          tabs={qualificationTabs}
          active={tab}
          onSelect={setTab}
          animation={fadeIn(0.2)}
          className={qualTabsWrap}
        />

        <div className={qualTimeline}>
          <div className={timelineLine} />
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === 'education' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === 'education' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className={qualTimelineItems}
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={qualTimelineItem}
                >
                  <div className={timelineDot} />
                  <div className={qualTimelineCard}>
                    <h3 className={qualTitle}>{item.title}</h3>
                    <p className={qualSubtitle}>{item.subtitle}</p>
                    <span className={qualPeriod}>
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
