/* ── Shared Tailwind class tokens ──────────── */

/* ── Layout ─────────────────────────────────── */
export const container = 'max-w-[1280px] mx-auto px-4 sm:px-6'
export const headingFont = 'font-heading'

/* ── Glass cards ────────────────────────────── */
export const glassCard =
  'plexus-border bg-[var(--bg-card)] shadow-sm backdrop-blur-sm transition-all duration-250'
export const glassCardHover =
  `${glassCard} hover:bg-[var(--bg-card-hover)] hover:shadow-md hover:-translate-y-1`

/* ── Typography ─────────────────────────────── */
export const titleHighlight = 'font-heading text-[var(--text-primary)] font-bold tracking-tight'
export const label = 'text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium'
export const labelSm = 'text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium'
export const bodyText = 'text-sm text-[var(--text-secondary)] leading-relaxed'
export const headingSm = 'text-sm font-bold uppercase tracking-widest'

/* ── Section header ─────────────────────────── */
export const sectionHeader = 'text-center mb-16'
export const sectionTitle = `${headingFont} text-3xl md:text-4xl font-bold tracking-tight mb-2`
export const sectionSubtitle = label

/* ── Buttons ────────────────────────────────── */
const btnBase =
  'plexus-border plexus-border-sm inline-flex items-center justify-center gap-2 px-5 py-3 md:px-7 md:py-3.5 font-semibold text-xs uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-lg transition-all duration-250'
export const btnPrimary =
  `${btnBase} bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent! hover:opacity-85`
export const btnOutline =
  `${btnBase} border-2! border-[var(--text-primary)]! text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]`

/* ── Icon button (social links, theme toggle) ── */
export const iconBtn =
  'plexus-border plexus-border-sm flex items-center justify-center bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:border-transparent! transition-all duration-250'
export const iconBtnSm = `${iconBtn} w-9 h-9 text-base`
export const iconBtnMd = `${iconBtn} w-10 h-10 text-base hover:-translate-y-1`

/* ── Filter / tab toggle button ─────────────── */
export const filterBtnBase =
  'plexus-border plexus-border-sm px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-250'
export const filterBtnActive =
  `${filterBtnBase} bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent!`
export const filterBtnInactive =
  `${filterBtnBase} bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)]`

/* ── Form inputs ────────────────────────────── */
export const input =
  'plexus-border plexus-border-sm w-full px-5 py-3 bg-[var(--bg-card)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]! outline-none transition-colors duration-150'

/* ── Skill pills ────────────────────────────── */
export const skillPillPrimary =
  'plexus-border plexus-border-sm flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] text-sm font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:translate-x-1 transition-all duration-150 group'
export const skillPillSecondary =
  'plexus-border plexus-border-sm flex items-center gap-2 px-2.5 py-1.5 bg-[var(--bg-secondary)] text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all duration-150 group'
export const softSkillPill =
  'plexus-border plexus-border-sm inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-y-0.5 transition-all duration-250'

/* ── Nav link (header) ──────────────────────── */
export const navLink =
  'relative text-xs font-semibold uppercase tracking-widest transition-colors duration-150 pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[var(--text-primary)] after:transition-all after:duration-250'
export const navLinkActive = `${navLink} text-[var(--text-primary)] after:w-full`
export const navLinkInactive = `${navLink} text-[var(--text-secondary)] hover:text-[var(--text-primary)] after:w-0 hover:after:w-full`

/* ── Mobile nav link ────────────────────────── */
export const mobileNavLink =
  'flex items-center gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-150'
export const mobileNavActive = `${mobileNavLink} bg-[var(--bg-secondary)] text-[var(--text-primary)]`
export const mobileNavInactive = `${mobileNavLink} text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]`

/* ── Stat card (about) ──────────────────────── */
export const statCard = `${glassCardHover} text-center p-5`

/* ── Contact info card ──────────────────────── */
export const contactCard = `${glassCardHover} flex items-center gap-5 p-5`
export const contactIcon = 'text-2xl text-[var(--text-primary)] shrink-0'

/* ── Scroll-to-top button ───────────────────── */
export const scrollUpBtn =
  'plexus-border plexus-border-sm fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-11 h-11 bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent! text-lg shadow-md hover:-translate-y-1 hover:shadow-lg hover:opacity-85 transition-all duration-150 cursor-pointer'

/* ── Timeline (qualification) ───────────────── */
export const timelineLine = 'absolute left-2 top-0 bottom-0 w-0.5 bg-[var(--border-glass)]'
export const timelineDot = 'absolute -left-[22px] top-6 w-3 h-3 rounded-sm bg-[var(--text-primary)] border-[3px] border-[var(--bg-primary)] z-10 rotate-45'

/* ── Framer Motion presets ──────────────────── */
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' as const },
  transition: { duration: 0.5 },
}

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' as const },
  transition: { duration: 0.6, delay },
})

export const slideIn = (direction: 'left' | 'right', delay = 0) => ({
  initial: { opacity: 0, x: direction === 'left' ? -30 : 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-40px' as const },
  transition: { duration: 0.5, delay },
})
