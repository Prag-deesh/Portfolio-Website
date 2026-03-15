/* ── Component-specific style tokens ───────── */

import {
  container, headingFont, titleHighlight, label, labelSm, bodyText, headingSm,
  glassCardHover, btnPrimary, filterBtnBase, iconBtn, iconBtnSm,
} from './index'

/* ── Home ───────────────────────────────────── */
export const homeSection = 'relative min-h-screen flex items-center pt-28 overflow-hidden'
export const homeContainer = `${container} w-full relative z-10`
export const homeGrid = 'grid md:grid-cols-2 items-center gap-12'
export const homeHeading = `text-4xl sm:text-5xl md:text-6xl leading-tight mt-2 mb-4 ${titleHighlight}`
export const homeTitle = 'relative text-lg text-[var(--text-secondary)] font-medium mb-2 inline-block pb-2'
export const homeTitleUnderline = 'absolute bottom-0 left-0 w-14 h-px bg-[var(--text-primary)]'
export const homeDescription = `${bodyText} max-w-[480px] mb-8`
export const homeCtas = 'flex gap-4 flex-wrap'
export const homeHeroWrap = 'flex justify-center'
export const homeSocials = 'flex gap-3 mt-12'

/* ── About ──────────────────────────────────── */
export const aboutSection = 'py-24'
export const aboutStatsGrid = 'grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-[720px] mx-auto'
export const aboutStatIcon = 'flex justify-center text-xl text-[var(--text-primary)] mb-2'
export const aboutStatValue = `text-2xl font-bold mb-0.5 ${headingFont}`
export const aboutParagraph = `${bodyText} mb-4`
export const aboutCvBtn = `${btnPrimary} mt-6`

/* ── Skills ─────────────────────────────────── */
export const skillsSection = 'py-24'
export const skillsPrimaryCard = `${glassCardHover} p-8 mb-5`
export const skillsPrimaryHeading = `${headingSm} mb-6 text-[var(--text-primary)]`
export const skillsFocusLabel = `ml-3 ${labelSm} normal-case`
export const skillsPrimaryGrid = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3'
export const skillsPrimaryIcon = 'text-lg text-[var(--text-primary)] flex shrink-0 group-hover:text-[var(--bg-primary)] transition-colors duration-150'
export const skillsSecondaryWrap = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12'
export const skillsSecondaryCard = `${glassCardHover} p-5`
export const skillsSecondaryTitle = `${labelSm} font-bold mb-4`
export const skillsSecondaryGrid = 'flex flex-wrap gap-2'
export const skillsSecondaryIcon = 'text-sm flex shrink-0 group-hover:text-[var(--text-primary)] transition-colors duration-150'
export const skillsSoftWrap = 'text-center'
export const skillsSoftHeading = `${headingSm} mb-6`
export const skillsSoftGrid = 'flex justify-center gap-2.5 flex-wrap'
export const skillsSoftIcon = 'text-base flex'

/* ── Work / Portfolio ───────────────────────── */
export const workSection = 'py-24'
export const workTabsWrap = 'flex justify-center gap-3 flex-wrap mb-6'
export const workTabBtn = 'flex items-center gap-2 px-6 py-3'
export const workTabIcon = 'text-lg'
export const workSubFiltersWrap = 'flex justify-center gap-2 flex-wrap mb-12 overflow-hidden'
export const workSubFilterBtn = 'px-4 py-1.5 text-xs'
export const workCompanyGrid = 'grid gap-4'
export const workCollegeGrid = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
export const workCompanyCard = `${glassCardHover} flex items-start gap-4 p-5 group`
export const workCompanyEmoji = 'w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[var(--bg-secondary)] text-2xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300'
export const workCompanyBody = 'flex-1 min-w-0'
export const workCardTitle = `text-sm font-bold mb-1 text-[var(--text-primary)] ${headingFont}`
export const workCardTitleLg = `text-sm font-bold mb-2 text-[var(--text-primary)] ${headingFont}`
export const workCardDescription = `${bodyText} mb-2`
export const workCardDescriptionLg = `${bodyText} mb-3 flex-1`
export const workTagsWrap = 'flex flex-wrap gap-1.5'
export const workTagsWrapMb = 'flex flex-wrap gap-1.5 mb-3'
export const workTag = `${labelSm} px-2 py-0.5 bg-[var(--bg-secondary)]`
export const workCollegeCard = `${glassCardHover} flex flex-col overflow-hidden group`
export const workCollegeEmojiWrap = 'h-36 flex items-center justify-center bg-[var(--bg-secondary)]'
export const workCollegeEmoji = 'text-5xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300'
export const workCollegeBody = 'p-5 flex flex-col flex-1'
export const workProjectLink = 'inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium group-hover:text-[var(--text-primary)] transition-colors duration-150 mt-auto'
export const workInternalLabel = `${labelSm} mt-auto`
export const workCompanySpacer = 'mb-6'

/* ── Qualification ──────────────────────────── */
export const qualSection = 'py-24'
export const qualTabsWrap = 'flex justify-center gap-4 mb-12'
export const qualTimeline = 'max-w-[600px] mx-auto relative pl-8'
export const qualTimelineItems = 'flex flex-col gap-6'
export const qualTimelineItem = 'relative'
export const qualTimelineCard = `${glassCardHover} p-5 px-6`
export const qualTitle = `text-sm font-bold mb-1 ${headingFont}`
export const qualSubtitle = `${bodyText} mb-2`
export const qualPeriod = `flex items-center gap-1.5 ${labelSm}`

/* ── Contact ────────────────────────────────── */
export const contactSection = 'py-24'
export const contactGrid = 'grid md:grid-cols-[1fr_1.2fr] gap-12'
export const contactHeading = `${headingSm} ${headingFont} mb-6`
export const contactInfoTitle = 'text-sm font-semibold mb-0.5'
export const contactInfoValue = 'text-sm text-[var(--text-muted)] break-all'
export const contactCardSpaced = 'mb-4'
export const contactForm = 'flex flex-col gap-4'
export const contactTextarea = 'resize-y min-h-[120px]'
export const contactSubmitBtn = `${btnPrimary} self-start disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0`

/* ── Header ─────────────────────────────────── */
export const headerBase = 'fixed top-0 left-0 w-full z-50 transition-all duration-250'
export const headerScrolled = 'bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-glass)] shadow-sm py-2'
export const headerTop = 'py-4'
export const headerNav = `${container} flex items-center justify-between h-16`
export const headerLogo = `text-lg font-bold tracking-tight ${titleHighlight} ${headingFont}`
export const headerDesktopLinks = 'hidden md:flex gap-8'
export const headerActions = 'flex items-center gap-3'
export const headerThemeIcon = 'flex'
export const headerMobileToggle = 'flex md:hidden items-center justify-center w-10 h-10 text-xl text-[var(--text-primary)]'
export const headerMobileMenu = 'plexus-border absolute top-full mt-2 left-6 right-6 bg-[var(--bg-card)] backdrop-blur-xl shadow-lg p-4 flex flex-col gap-1'
export const headerMobileIcon = 'text-base'

/* ── Footer ─────────────────────────────────── */
export const footerSection = 'py-12 bg-[var(--bg-secondary)]'
export const footerInner = container
export const footerMotion = 'flex flex-col items-center gap-6'
export const footerLogo = `text-xl font-bold ${titleHighlight} ${headingFont}`
export const footerNav = 'flex gap-4 sm:gap-8 flex-wrap justify-center'
export const footerNavLink = `${label} hover:text-[var(--text-primary)] transition-colors duration-150`
export const footerSocials = 'flex gap-3'
export const footerSocialLink = `${iconBtnSm} hover:-translate-y-0.5`
export const footerDivider = 'w-full max-w-[400px] h-px bg-[var(--border-glass)]'
export const footerCopy = 'text-xs text-[var(--text-muted)]'
