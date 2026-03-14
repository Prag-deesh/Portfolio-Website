/* ──────────────────────────────────────────
   Projects / Portfolio
   Add/remove projects here.
   To add a new project, just add an object
   to the array below.
   ────────────────────────────────────────── */

export interface Project {
  id: number
  title: string
  category: string
  link: string
  color: string
  emoji: string
  // CUSTOMIZE: add `image: '/path-to-screenshot.webp'` and
  // update Work.tsx to render <img> instead of emoji
}

export const projects: Project[] = [
  { id: 1, title: 'Tshirt Design AI', category: 'web', link: 'https://youtu.be/3E-xX94rtjM', color: '#FF6B6B', emoji: '🌐' },
  { id: 2, title: 'Voice Assistance App', category: 'mobile', link: 'https://youtu.be/m_V7Q04H1fU', color: '#4ECDC4', emoji: '📱' },
  { id: 3, title: 'Digital Signature (Outlook)', category: 'security', link: 'https://youtu.be/fGTC6Yf1rhM', color: '#45B7D1', emoji: '🔐' },
  { id: 4, title: 'Chat Analysis (Sentiment)', category: 'ml', link: 'https://youtu.be/gasHa5I2LvU', color: '#96CEB4', emoji: '🤖' },
  { id: 5, title: 'All Digital Arts', category: 'design', link: 'https://www.instagram.com/wdraftz/', color: '#DDA0DD', emoji: '🎨' },
  { id: 6, title: 'Chatting Web App', category: 'web', link: 'https://youtu.be/KsPLLYHCCC8', color: '#FFEAA7', emoji: '💬' },
  { id: 7, title: 'Pharmacy Management', category: 'web', link: 'https://youtu.be/kGl_zlnjPGo', color: '#74B9FF', emoji: '💊' },
  { id: 8, title: 'Ecommerce App', category: 'mobile', link: 'https://youtu.be/Uenm5duRRGA', color: '#FD79A8', emoji: '🛒' },
]

/** Filter tabs — add new categories here to show them as filter buttons */
export const projectCategories = ['All', 'Web', 'Mobile', 'Security', 'ML', 'Design'] as const
