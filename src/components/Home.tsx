import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { HiOutlineDownload } from 'react-icons/hi'
import { personalInfo, socialLinks, homeLabels } from '../helpers/constants'
import { trackCvDownload, trackSocialClick } from '../helpers/analytics'
import { btnPrimary, btnOutline, label, iconBtnMd } from '../helpers/styles'
import {
  homeSection, homeContainer, homeGrid, homeHeading, homeTitle, homeTitleUnderline,
  homeDescription, homeCtas, homeHeroWrap, homeSocials,
} from '../helpers/styles/components'
import HeroAvatar from './HeroAvatar'

const Home = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollY } = useScroll()
  // Disable scroll-linked transforms entirely on mobile for smoother scrolling
  const textY = useTransform(scrollY, [0, 500], isMobile ? [0, 0] : [0, -60])
  const imageY = useTransform(scrollY, [0, 500], isMobile ? [0, 0] : [0, 50])
  const heroOpacity = useTransform(scrollY, [0, 400], isMobile ? [1, 1] : [1, 0.3])

  return (
    <section id="home" className={homeSection}>
      <div className={homeContainer}>
        <motion.div style={isMobile ? undefined : { opacity: heroOpacity }} className={homeGrid}>
          <motion.div style={isMobile ? undefined : { y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className={label}>{personalInfo.greeting}</span>
              <h1 className={homeHeading}>
                {personalInfo.name}
              </h1>
              <p className={homeTitle}>
                {personalInfo.title}
                <span className={homeTitleUnderline} />
              </p>
              <p className={homeDescription}>
                {personalInfo.description}
              </p>

              <div className={homeCtas}>
                <a href="#contact" className={btnPrimary}>
                  {homeLabels.ctaPrimary} <FiArrowDown />
                </a>
                <a href={personalInfo.cvPath} download className={btnOutline} onClick={trackCvDownload}>
                  {homeLabels.ctaSecondary} <HiOutlineDownload />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={isMobile ? undefined : { y: imageY }} className={homeHeroWrap}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <HeroAvatar imageSrc={personalInfo.profileImage} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={homeSocials}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
              className={iconBtnMd}
              onClick={() => trackSocialClick(link.label, link.href)}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Home
