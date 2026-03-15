import { motion } from 'framer-motion'
import { personalInfo, socialLinks } from '../helpers/constants'
import { titleHighlight } from '../helpers/styles'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 bg-[var(--bg-secondary)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="#home" className={`text-xl font-bold ${titleHighlight}`} style={{ fontFamily: 'var(--font-heading)' }}>
            {personalInfo.name}
          </a>

          <nav className="flex gap-8 flex-wrap justify-center">
            {['About', 'Skills', 'Portfolio', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="plexus-border plexus-border-sm flex items-center justify-center w-9 h-9 text-base text-[var(--text-secondary)] bg-[var(--bg-card)] hover:text-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:border-transparent! hover:-translate-y-0.5 transition-all duration-250"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="w-full max-w-[400px] h-px bg-[var(--border-glass)]" />

          <p className="text-xs text-[var(--text-muted)]">
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
