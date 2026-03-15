/* ══════════════════════════════════════════
   Interfaces & Types
   Single source of truth for every type
   used across the application.
   ══════════════════════════════════════════ */

import type { ReactNode } from 'react'

/* ── Navigation ────────────────────────────── */
export interface NavLink {
  name: string
  href: string
  icon: ReactNode
}

/* ── Social Links ──────────────────────────── */
export interface SocialLink {
  icon: ReactNode
  href: string
  label: string
}

/* ── Skills ────────────────────────────────── */
export interface Skill {
  name: string
  icon: ReactNode
}

export interface SkillCategory {
  title: string
  featured?: boolean
  skills: Skill[]
}

export interface SoftSkill {
  name: string
  icon: ReactNode
}

/* ── Projects ──────────────────────────────── */
export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  link?: string
  emoji: string
  category?: string
}

/* ── Qualification / Timeline ──────────────── */
export interface TimelineItem {
  title: string
  subtitle: string
  period: string
}

/* ── About Stats ───────────────────────────── */
export interface Stat {
  icon: ReactNode
  value: string
  label: string
}

/* ── Section Configuration ─────────────────── */
export interface SectionConfig {
  id: string
  title: string
  titleHighlight: string
  subtitle: string
}

/* ── Tab Item (shared by Work, Qualification) ─ */
export interface TabItem<K extends string = string> {
  key: K
  icon: ReactNode
  label: string
}

/* ── Component Props ───────────────────────── */
export interface HeaderProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export interface HeroAvatarProps {
  imageSrc?: string
  fallbackEmoji?: string
}

export interface PlexusFrameProps {
  imageSrc?: string
  fallbackEmoji?: string
  width?: string
  height?: string
}

export interface ConstellationFieldProps {
  theme?: 'dark' | 'light'
  className?: string
}

export interface SectionRevealProps {
  children: ReactNode
  className?: string
  parallaxY?: number
  scaleFrom?: number
}

export interface GradientBlobsProps {
  theme: 'light' | 'dark'
}
