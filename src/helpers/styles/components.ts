/* ── Component-specific style tokens ───────── */

import {
  container, headingFont, titleHighlight, label, labelSm, bodyText, headingSm,
  glassCardHover, btnPrimary, filterBtnBase, iconBtn, iconBtnSm,
} from './index'

/* ── Home ───────────────────────────────────── */
export const homeSection = 'relative min-h-screen flex items-center pt-24 pb-8 md:pt-28 md:pb-0 overflow-x-hidden'
export const homeContainer = `${container} w-full relative z-10`
export const homeGrid = 'grid md:grid-cols-2 items-center gap-8 md:gap-12'
export const homeHeading = `text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-2 mb-3 md:mb-4 ${titleHighlight}`
export const homeTitle = 'relative text-base md:text-lg text-[var(--text-secondary)] font-medium mb-2 inline-block pb-2'
export const homeTitleUnderline = 'absolute bottom-0 left-0 w-14 h-px bg-[var(--text-primary)]'
export const homeDescription = `${bodyText} max-w-[480px] mb-6 md:mb-8`
export const homeCtas = 'flex gap-3 md:gap-4 flex-wrap'
export const homeHeroWrap = 'flex justify-center order-first md:order-last'
export const homeSocials = 'flex gap-3 mt-8 md:mt-12 justify-center md:justify-start'

/* ── About ──────────────────────────────────── */
export const aboutSection = 'py-16 md:py-24'
export const aboutStatsGrid = 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12 max-w-[720px] mx-auto'
export const aboutStatIcon = 'flex justify-center text-xl text-[var(--text-primary)] mb-2'
export const aboutStatValue = `text-2xl font-bold mb-0.5 ${headingFont}`
export const aboutParagraph = `${bodyText} mb-4`
export const aboutCvBtn = `${btnPrimary} mt-6`

/* ── Skills ─────────────────────────────────── */
export const skillsSection = 'py-16 md:py-24'
export const skillsPrimaryCard = `${glassCardHover} p-5 md:p-8 mb-5`
export const skillsPrimaryHeading = `${headingSm} mb-4 md:mb-6 text-[var(--text-primary)]`
export const skillsFocusLabel = `ml-3 ${labelSm} normal-case`
export const skillsPrimaryGrid = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3'
export const skillsPrimaryIcon = 'text-lg text-[var(--text-primary)] flex shrink-0 group-hover:text-[var(--bg-primary)] transition-colors duration-150'
export const skillsSecondaryWrap = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5 mb-8 md:mb-12'
export const skillsSecondaryCard = `${glassCardHover} p-4 md:p-5`
export const skillsSecondaryTitle = `${labelSm} font-bold mb-4`
export const skillsSecondaryGrid = 'flex flex-wrap gap-2'
export const skillsSecondaryIcon = 'text-sm flex shrink-0 group-hover:text-[var(--text-primary)] transition-colors duration-150'
export const skillsSoftWrap = 'text-center'
export const skillsSoftHeading = `${headingSm} mb-6`
export const skillsSoftGrid = 'flex justify-center gap-2.5 flex-wrap'
export const skillsSoftIcon = 'text-base flex'

/* ── Work / Portfolio ───────────────────────── */
export const workSection = 'py-16 md:py-24'
export const workTabsWrap = 'flex justify-center gap-2 md:gap-3 flex-wrap mb-6'
export const workTabBtn = 'flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3'
export const workTabIcon = 'text-lg'
export const workSubFiltersWrap = 'flex justify-center gap-2 flex-wrap mb-8 md:mb-12 px-2'
export const workSubFilterBtn = 'px-3 md:px-4 py-1.5 text-[10px] md:text-xs'
export const workCompanyGrid = 'grid gap-3 md:gap-4'
export const workCollegeGrid = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
export const workCompanyCard = `${glassCardHover} flex items-start gap-3 md:gap-4 p-4 md:p-5 group`
export const workCompanyEmoji = 'w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-[var(--bg-secondary)] text-xl md:text-2xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300'
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
export const qualSection = 'py-16 md:py-24'
export const qualTabsWrap = 'flex justify-center gap-3 md:gap-4 mb-8 md:mb-12'
export const qualTimeline = 'max-w-[600px] mx-auto relative pl-6 md:pl-8'
export const qualTimelineItems = 'flex flex-col gap-6'
export const qualTimelineItem = 'relative'
export const qualTimelineCard = `${glassCardHover} p-4 px-5 md:p-5 md:px-6`
export const qualTitle = `text-sm font-bold mb-1 ${headingFont}`
export const qualSubtitle = `${bodyText} mb-2`
export const qualPeriod = `flex items-center gap-1.5 ${labelSm}`

/* ── Contact ────────────────────────────────── */
export const contactSection = 'py-16 pb-24 md:py-24 md:pb-32'
export const contactGrid = 'grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12'
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
export const headerMobileMenu = 'plexus-border absolute top-full mt-2 left-4 right-4 sm:left-6 sm:right-6 bg-[var(--bg-card)] backdrop-blur-xl shadow-lg p-3 sm:p-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto'
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
