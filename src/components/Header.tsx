import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsSun, BsMoon, BsList, BsX } from 'react-icons/bs'
import { navLinks } from '../helpers/constants'
import { titleHighlight } from '../helpers/styles'

interface Props {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const Header = ({ theme, toggleTheme }: Props) => {
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-250 ${
        scrolled
          ? 'bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-glass)] shadow-sm py-2'
          : 'py-4'
      }`}
    >
      <nav className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#home" className={`text-lg font-bold tracking-tight ${titleHighlight}`} style={{ fontFamily: 'var(--font-heading)' }}>
          Pragadeesh
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`relative text-xs font-semibold uppercase tracking-widest transition-colors duration-150 pb-1 
                  ${activeSection === link.href ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                  after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[var(--text-primary)] after:transition-all after:duration-250
                  ${activeSection === link.href ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-9 h-9 text-base text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-glass)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-150"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {theme === 'dark' ? <BsSun /> : <BsMoon />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex md:hidden items-center justify-center w-10 h-10 text-xl text-[var(--text-primary)]"
          >
            {mobileOpen ? <BsX /> : <BsList />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 left-6 right-6 bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border-glass)] shadow-lg p-4 flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`flex items-center gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-150
                    ${activeSection === link.href
                      ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  <span className="text-base">{link.icon}</span>
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
