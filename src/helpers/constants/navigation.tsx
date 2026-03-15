/* ── Navigation Links ──────────────────────── */

import { HiOutlineHome, HiOutlineUser, HiOutlineBriefcase, HiOutlineMail, HiOutlineAcademicCap } from 'react-icons/hi'
import { BsCodeSlash } from 'react-icons/bs'
import type { NavLink } from '../interfaces'

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home', icon: <HiOutlineHome /> },
  { name: 'About', href: '#about', icon: <HiOutlineUser /> },
  { name: 'Skills', href: '#skills', icon: <BsCodeSlash /> },
  { name: 'Portfolio', href: '#portfolio', icon: <HiOutlineBriefcase /> },
  { name: 'Qualification', href: '#qualification', icon: <HiOutlineAcademicCap /> },
  { name: 'Contact', href: '#contact', icon: <HiOutlineMail /> },
]
