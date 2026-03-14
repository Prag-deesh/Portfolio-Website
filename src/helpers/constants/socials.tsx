/* ──────────────────────────────────────────
   Social Links
   Add/remove social platforms here.
   ────────────────────────────────────────── */

import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi'
import { BsDiscord } from 'react-icons/bs'
import type { ReactNode } from 'react'

export interface SocialLink {
  icon: ReactNode
  href: string
  label: string
}

export const socialLinks: SocialLink[] = [
  { icon: <FiGithub />, href: 'https://github.com/Prag-deesh', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/pragadeeshwaran-k-j-440908268/', label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://www.instagram.com/wpragdeesh/', label: 'Instagram' },
  { icon: <FiYoutube />, href: 'https://www.youtube.com/channel/UCSyMhE-Z1d4DRRiQj4ZhWzQ', label: 'YouTube' },
  { icon: <BsDiscord />, href: 'https://discord.com/users/755092821911929092', label: 'Discord' },
]
