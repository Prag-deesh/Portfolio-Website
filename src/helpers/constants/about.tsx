/* ──────────────────────────────────────────
   About Stats
   Update the stats cards shown in About section.
   ────────────────────────────────────────── */

import type { ReactNode } from 'react'
import { HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineCode } from 'react-icons/hi'

export interface Stat {
  icon: ReactNode
  value: string
  label: string
}

export const aboutStats: Stat[] = [
  { icon: <HiOutlineCode />, value: '8+', label: 'Projects' },
  { icon: <HiOutlineBriefcase />, value: '5+', label: 'Domains' },
  { icon: <HiOutlineAcademicCap />, value: 'KCT', label: 'B.Tech' },
]
