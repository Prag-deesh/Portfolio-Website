/* ── Shared tab bar ─────────────────────────── */

import { motion } from 'framer-motion'
import { filterBtnActive, filterBtnInactive } from '../helpers/styles'
import { workTabBtn, workTabIcon } from '../helpers/styles/components'
import type { TabItem } from '../helpers/interfaces'

interface TabBarProps<K extends string> {
  tabs: TabItem<K>[]
  active: K
  onSelect: (key: K) => void
  animation?: Record<string, unknown>
  className?: string
}

const TabBar = <K extends string>({ tabs, active, onSelect, animation = {}, className = '' }: TabBarProps<K>) => (
  <motion.div className={className} {...animation}>
    {tabs.map((t) => (
      <button
        key={t.key}
        onClick={() => onSelect(t.key)}
        className={`${active === t.key ? filterBtnActive : filterBtnInactive} ${workTabBtn}`}
      >
        <span className={workTabIcon}>{t.icon}</span>
        {t.label}
      </button>
    ))}
  </motion.div>
)

export default TabBar
