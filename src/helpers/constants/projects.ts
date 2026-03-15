/* ── Projects / Portfolio ──────────────────── */

import type { Project } from '../interfaces'

/* ── Company projects (most recent first) ──── */
export const companyProjects: Project[] = [
  {
    id: 1,
    title: 'Vincent — B2B Application',
    description: 'Currently building Vincent, a B2B application — the only non-customer-facing project. Internal business-to-business platform.',
    tags: ['React', 'TypeScript', 'Tailwind', 'pnpm', 'Jest', 'Storybook'],
    emoji: '🏢',
  },
  {
    id: 2,
    title: 'NA Buy — Cart & Checkout Migration',
    description: 'Migration project to monorepo architecture for North America Buy flow — Cart and Checkout modules. Customer-facing website.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'npm', 'Jest', 'Storybook'],
    emoji: '🛒',
  },
  {
    id: 3,
    title: 'MFE Vehicle Configurator — IMG Markets',
    description: 'Built the next-gen Micro Frontend vehicle configurator for IMG markets (AU, NZ, TH, VN, PH, ZA). Customer-facing websites with modular architecture.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'npm', 'Jest', 'Storybook'],
    emoji: '⚡',
  },
  {
    id: 4,
    title: 'Vehicle Configurator — IMG Markets',
    description: 'Supported incidents, feature development, and analytics for Ford\'s existing vehicle configurator across AU, NZ, TH, PH, VN, ZA markets and PDW (developed for UAE). Customer-facing websites.',
    tags: ['React', 'Java', 'SCSS', 'JavaScript', 'Analytics'],
    emoji: '🚗',
  },
]

/* ── College projects ──────────────────────── */
export const collegeProjects: Project[] = [
  {
    id: 13,
    title: 'VR Education Game',
    description: 'Virtual reality game built for education — immersive learning experience using VR technology.',
    tags: ['VR', 'Unity', 'Game'],
    link: 'https://youtu.be/rEvkF0h4YrA',
    emoji: '🥽',
    category: 'VR',
  },
  {
    id: 5,
    title: 'Tshirt Design AI',
    description: 'AI-powered t-shirt design generator using web technologies and machine learning.',
    tags: ['Web', 'AI'],
    link: 'https://youtu.be/3E-xX94rtjM',
    emoji: '👕',
    category: 'Web',
  },
  {
    id: 6,
    title: 'Voice Assistance App',
    description: 'Mobile voice assistant application with natural language processing capabilities.',
    tags: ['Mobile', 'NLP'],
    link: 'https://youtu.be/m_V7Q04H1fU',
    emoji: '🎙️',
    category: 'Mobile',
  },
  {
    id: 7,
    title: 'Digital Signature (Outlook)',
    description: 'Cybersecurity project — digital signature verification system integrated with Outlook.',
    tags: ['Security', 'Outlook'],
    link: 'https://youtu.be/fGTC6Yf1rhM',
    emoji: '🔐',
    category: 'Security',
  },
  {
    id: 8,
    title: 'Chat Analysis (Sentiment)',
    description: 'ML-based chat sentiment analysis tool for real-time conversation insights.',
    tags: ['ML', 'Python'],
    link: 'https://youtu.be/gasHa5I2LvU',
    emoji: '🤖',
    category: 'ML',
  },
  {
    id: 9,
    title: 'All Digital Arts',
    description: 'Collection of digital art and design work across various mediums.',
    tags: ['Design', 'Art'],
    link: 'https://www.instagram.com/wdraftz/',
    emoji: '🎨',
    category: 'Design',
  },
  {
    id: 10,
    title: 'Chatting Web App',
    description: 'Real-time web chat application with modern UI and instant messaging.',
    tags: ['Web', 'Real-time'],
    link: 'https://youtu.be/KsPLLYHCCC8',
    emoji: '💬',
    category: 'Web',
  },
  {
    id: 11,
    title: 'Pharmacy Management',
    description: 'Full-stack pharmacy management system with inventory and billing.',
    tags: ['Web', 'Full-stack'],
    link: 'https://youtu.be/kGl_zlnjPGo',
    emoji: '💊',
    category: 'Web',
  },
  {
    id: 12,
    title: 'Ecommerce App',
    description: 'Mobile e-commerce application with cart, payments, and order tracking.',
    tags: ['Mobile', 'E-commerce'],
    link: 'https://youtu.be/Uenm5duRRGA',
    emoji: '🛒',
    category: 'Mobile',
  },
]

export const collegeCategories = ['All', 'Web', 'Mobile', 'VR', 'Security', 'ML', 'Design'] as const
