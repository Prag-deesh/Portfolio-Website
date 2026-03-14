/** Shared Tailwind class strings — plexus / constellation theme */

/** Glass card — sharp edges */
export const glassCard =
  'bg-[var(--bg-card)] border border-[var(--border-glass)] shadow-sm backdrop-blur-sm transition-all duration-250'

export const glassCardHover =
  `${glassCard} hover:bg-[var(--bg-card-hover)] hover:shadow-md hover:-translate-y-1`

/** Bold text highlight — heading font */
export const titleHighlight = 'font-[var(--font-heading)] text-[var(--text-primary)] font-bold tracking-tight'

/** Primary button — sharp, geometric */
export const btnPrimary =
  'inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-xs uppercase tracking-widest bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-85 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-250'

/** Outline button — sharp, geometric */
export const btnOutline =
  'inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-xs uppercase tracking-widest border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-250'

/** Section header */
export const sectionHeader = 'text-center mb-16'
export const sectionTitle = 'font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold tracking-tight mb-2'
export const sectionSubtitle = 'text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium'
