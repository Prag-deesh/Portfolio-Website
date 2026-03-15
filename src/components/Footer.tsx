import { motion } from 'framer-motion'
import { personalInfo, socialLinks, footerLinks, footerLabels } from '../helpers/constants'
import {
  footerSection, footerInner, footerMotion, footerLogo, footerNav, footerNavLink,
  footerSocials, footerSocialLink, footerDivider, footerCopy,
} from '../helpers/styles/components'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={footerSection}>
      <div className={footerInner}>
        <motion.div
          className={footerMotion}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="#home" className={footerLogo}>{personalInfo.name}</a>

          <nav className={footerNav}>
            {footerLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className={footerNavLink}>
                {link}
              </a>
            ))}
          </nav>

          <div className={footerSocials}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={footerSocialLink}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className={footerDivider} />

          <p className={footerCopy}>
            &copy; {year} {personalInfo.name}. {footerLabels.copyright}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
