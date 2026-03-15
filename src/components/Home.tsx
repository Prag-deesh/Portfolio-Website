import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { HiOutlineDownload } from 'react-icons/hi'
import { personalInfo, socialLinks } from '../helpers/constants'
import { btnPrimary, btnOutline, titleHighlight } from '../helpers/styles'
import HeroAvatar from './HeroAvatar'

/**
 * ── Profile Image ──
 * To use your photo, either:
 *  1) Import it:  import profileImg from '../assets/profile.jpg'
 *  2) Or use a URL string: const PROFILE_IMAGE = '/profile.jpg'
 * Then pass it as imageSrc={PROFILE_IMAGE} to HeroAvatar.
 */
const PROFILE_IMAGE: string | undefined = undefined

const Home = () => {
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 500], [0, -60])
  const imageY = useTransform(scrollY, [0, 500], [0, 50])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 w-full relative z-10">
        <motion.div style={{ opacity: heroOpacity }} className="grid md:grid-cols-2 items-center gap-12">
          {/* ── Text ── */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">{personalInfo.greeting}</span>
              <h1 className={`text-5xl md:text-6xl leading-tight mt-2 mb-4 ${titleHighlight}`} style={{ fontFamily: 'var(--font-heading)' }}>
                {personalInfo.name}
              </h1>
              <p className="relative text-lg text-[var(--text-secondary)] font-medium mb-2 inline-block pb-2">
                {personalInfo.title}
                <span className="absolute bottom-0 left-0 w-14 h-px bg-[var(--text-primary)]" />
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[480px] mb-8">
                {personalInfo.description}
              </p>

              <div className="flex gap-4 flex-wrap">
                <a href="#contact" className={btnPrimary}>
                  Let's Talk <FiArrowDown />
                </a>
                <a href={personalInfo.cvPath} download className={btnOutline}>
                  Download CV <HiOutlineDownload />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Animated hero visual ── */}
          <motion.div style={{ y: imageY }} className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <HeroAvatar imageSrc={PROFILE_IMAGE} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Social links ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-3 mt-12"
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
              className="plexus-border plexus-border-sm flex items-center justify-center w-10 h-10 bg-[var(--bg-card)] text-base text-[var(--text-secondary)] hover:text-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:border-transparent! hover:-translate-y-1 transition-all duration-250"
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
