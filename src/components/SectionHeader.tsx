/* ── Shared section header ──────────────────── */

import { motion } from 'framer-motion'
import { sectionHeader, sectionTitle, sectionSubtitle, titleHighlight } from '../helpers/styles'
import type { SectionConfig } from '../helpers/interfaces'

interface SectionHeaderProps {
  section: SectionConfig
  animation?: Record<string, unknown>
}

const SectionHeader = ({ section, animation = {} }: SectionHeaderProps) => (
  <motion.div className={sectionHeader} {...animation}>
    <h2 className={sectionTitle}>
      {section.title && <>{section.title} </>}
      <span className={titleHighlight}>{section.titleHighlight}</span>
    </h2>
    <p className={sectionSubtitle}>{section.subtitle}</p>
  </motion.div>
)

export default SectionHeader
