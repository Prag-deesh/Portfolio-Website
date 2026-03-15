import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import { companyProjects, collegeProjects, collegeCategories, sections, portfolioTabs, portfolioLabels } from '../helpers/constants'
import { container, filterBtnActive, filterBtnInactive, fadeIn, fadeUp } from '../helpers/styles'
import {
  workSection, workTabsWrap, workSubFiltersWrap, workSubFilterBtn,
  workCompanyGrid, workCollegeGrid, workCompanyCard, workCompanyEmoji, workCompanyBody,
  workCardTitle, workCardTitleLg, workCardDescription, workCardDescriptionLg,
  workTagsWrap, workTagsWrapMb, workTag, workCollegeCard, workCollegeEmojiWrap,
  workCollegeEmoji, workCollegeBody, workProjectLink, workInternalLabel, workCompanySpacer,
} from '../helpers/styles/components'
import SectionHeader from './SectionHeader'
import TabBar from './TabBar'

const sec = sections.portfolio

const Work = () => {
  const [tab, setTab] = useState<'company' | 'college'>('company')
  const [collegeFilter, setCollegeFilter] = useState<string>('All')

  const items = tab === 'company'
    ? companyProjects
    : collegeFilter === 'All'
      ? collegeProjects
      : collegeProjects.filter((p) => p.category === collegeFilter)

  return (
    <section id={sec.id} className={workSection}>
      <div className={container}>
        <SectionHeader section={sec} animation={fadeIn()} />

        <TabBar
          tabs={portfolioTabs}
          active={tab}
          onSelect={(key) => { setTab(key); setCollegeFilter('All') }}
          animation={fadeIn(0.2)}
          className={workTabsWrap}
        />

        <AnimatePresence>
          {tab === 'college' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={workSubFiltersWrap}
            >
              {collegeCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCollegeFilter(cat)}
                  className={`${collegeFilter === cat ? filterBtnActive : filterBtnInactive} ${workSubFilterBtn}`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {tab === 'company' && <div className={workCompanySpacer} />}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${collegeFilter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={tab === 'company' ? workCompanyGrid : workCollegeGrid}
          >
            {items.map((project, i) => {
              if (tab === 'company') {
                return (
                  <motion.div
                    key={project.id}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={workCompanyCard}
                  >
                    <div className={workCompanyEmoji}>{project.emoji}</div>
                    <div className={workCompanyBody}>
                      <h3 className={workCardTitle}>{project.title}</h3>
                      <p className={workCardDescription}>{project.description}</p>
                      <div className={workTagsWrap}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={workTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              }

              const inner = (
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={workCollegeCard}
                >
                  <div className={workCollegeEmojiWrap}>
                    <span className={workCollegeEmoji}>{project.emoji}</span>
                  </div>
                  <div className={workCollegeBody}>
                    <h3 className={workCardTitleLg}>{project.title}</h3>
                    <p className={workCardDescriptionLg}>{project.description}</p>
                    <div className={workTagsWrapMb}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={workTag}>{tag}</span>
                      ))}
                    </div>
                    {project.link ? (
                      <span className={workProjectLink}>{portfolioLabels.viewProject} <FiExternalLink /></span>
                    ) : (
                      <span className={workInternalLabel}>{portfolioLabels.internalProject}</span>
                    )}
                  </div>
                </motion.div>
              )

              return project.link ? (
                <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer">{inner}</a>
              ) : (
                <div key={project.id}>{inner}</div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Work
