/* ── Social Links ──────────────────────────── */

import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi'
import { BsDiscord } from 'react-icons/bs'
import { SiMedium } from 'react-icons/si'
import type { SocialLink } from '../interfaces'

export const socialLinks: SocialLink[] = [
  { icon: <FiGithub />, href: 'https://github.com/Prag-deesh', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/wpragadeesh/', label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://www.instagram.com/wpragdeesh/', label: 'Instagram' },
  { icon: <FiYoutube />, href: 'https://www.youtube.com/channel/UCSyMhE-Z1d4DRRiQj4ZhWzQ', label: 'YouTube' },
  { icon: <SiMedium />, href: 'https://medium.com/@pragadeeshgg', label: 'Medium' },
  { icon: <BsDiscord />, href: 'https://discord.com/users/755092821911929092', label: 'Discord' },
]
