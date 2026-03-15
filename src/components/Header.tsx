import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsSun, BsMoon, BsList, BsX } from 'react-icons/bs'
import { navLinks, personalInfo } from '../helpers/constants'
import type { HeaderProps } from '../helpers/interfaces'
import { iconBtnSm, navLinkActive, navLinkInactive, mobileNavActive, mobileNavInactive } from '../helpers/styles'
import {
  headerBase, headerScrolled, headerTop, headerNav, headerLogo,
  headerDesktopLinks, headerActions, headerThemeIcon, headerMobileToggle,
  headerMobileMenu, headerMobileIcon,
} from '../helpers/styles/components'

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNav = useCallback((href: string) => {
    setActiveSection(href)
    setMobileOpen(false)
  }, [])

  return (
    <header className={`${headerBase} ${scrolled ? headerScrolled : headerTop}`}>
      <nav className={headerNav}>
        <a href="#home" className={headerLogo}>{personalInfo.name}</a>

        <ul className={headerDesktopLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={activeSection === link.href ? navLinkActive : navLinkInactive}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className={headerActions}>
          <button onClick={toggleTheme} aria-label="Toggle theme" className={iconBtnSm}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className={headerThemeIcon}
              >
                {theme === 'dark' ? <BsSun /> : <BsMoon />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className={headerMobileToggle}
          >
            {mobileOpen ? <BsX /> : <BsList />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className={headerMobileMenu}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNav(link.href)}
                  className={activeSection === link.href ? mobileNavActive : mobileNavInactive}
                >
                  <span className={headerMobileIcon}>{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header
