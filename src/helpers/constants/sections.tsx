/* ── Section Configuration ─────────────────── */

import type { SectionConfig, TabItem } from '../interfaces'
import { HiOutlineBriefcase, HiOutlineAcademicCap } from 'react-icons/hi'

export const sections: Record<string, SectionConfig> = {
  home: {
    id: 'home',
    title: '',
    titleHighlight: '',
    subtitle: '',
  },
  about: {
    id: 'about',
    title: 'About',
    titleHighlight: 'Me',
    subtitle: 'My introduction',
  },
  skills: {
    id: 'skills',
    title: 'My',
    titleHighlight: 'Skills',
    subtitle: 'Technologies I work with',
  },
  portfolio: {
    id: 'portfolio',
    title: 'My',
    titleHighlight: 'Portfolio',
    subtitle: 'Recent projects',
  },
  qualification: {
    id: 'qualification',
    title: '',
    titleHighlight: 'Qualification',
    subtitle: 'My journey so far',
  },
  contact: {
    id: 'contact',
    title: 'Get In',
    titleHighlight: 'Touch',
    subtitle: "Let's work together",
  },
} as const

/* ── Contact section labels ────────────────── */
export const contactLabels = {
  infoHeading: 'Talk to me',
  formHeading: 'Write me something',
  emailLabel: 'Email',
  whatsappLabel: 'WhatsApp',
  whatsappGreeting: 'Hello!',
  locationLabel: 'Location',
  namePlaceholder: 'Your Name',
  emailPlaceholder: 'Your Email',
  messagePlaceholder: 'Your message...',
  sendBtn: 'Send Message',
  sendingBtn: 'Sending...',
  successBtn: 'Message Sent!',
  errorBtn: 'Failed — Try Again',
} as const

/* ── Footer nav links ──────────────────────── */
export const footerLinks = ['About', 'Skills', 'Portfolio', 'Contact'] as const

/* ── Footer labels ─────────────────────────── */
export const footerLabels = {
  copyright: 'All rights reserved.',
} as const

/* ── Home section labels ───────────────────── */
export const homeLabels = {
  ctaPrimary: "Let's Talk",
  ctaSecondary: 'Download CV',
} as const

/* ── About section labels ──────────────────── */
export const aboutLabels = {
  downloadCv: 'Download CV',
} as const

/* ── Skills section labels ─────────────────── */
export const skillsLabels = {
  currentFocus: '— current focus',
  softSkillsTitle: 'Soft Skills',
} as const

/* ── Portfolio tab items ───────────────────── */
export const portfolioLabels = {
  viewProject: 'View Project',
  internalProject: 'Internal Project',
} as const

export const portfolioTabs: TabItem<'company' | 'college'>[] = [
  { key: 'company', icon: <HiOutlineBriefcase />, label: 'Company' },
  { key: 'college', icon: <HiOutlineAcademicCap />, label: 'College' },
]

/* ── Qualification tab items ───────────────── */
export const qualificationTabs: TabItem<'experience' | 'education'>[] = [
  { key: 'experience', icon: <HiOutlineBriefcase />, label: 'Experience' },
  { key: 'education', icon: <HiOutlineAcademicCap />, label: 'Education' },
]
