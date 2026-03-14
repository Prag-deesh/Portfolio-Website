/* ──────────────────────────────────────────
   Navigation Links
   Add/remove/reorder nav items here.
   ────────────────────────────────────────── */

import { HiOutlineHome, HiOutlineUser, HiOutlineBriefcase, HiOutlineMail } from 'react-icons/hi'
import { BsCodeSlash } from 'react-icons/bs'
import type { ReactNode } from 'react'

export interface NavLink {
  name: string
  href: string
  icon: ReactNode
}

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home', icon: <HiOutlineHome /> },
  { name: 'About', href: '#about', icon: <HiOutlineUser /> },
  { name: 'Skills', href: '#skills', icon: <BsCodeSlash /> },
  { name: 'Portfolio', href: '#portfolio', icon: <HiOutlineBriefcase /> },
  { name: 'Contact', href: '#contact', icon: <HiOutlineMail /> },
]
