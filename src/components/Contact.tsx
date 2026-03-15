import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { personalInfo } from '../helpers/constants'
import { glassCardHover, btnPrimary, sectionHeader, sectionTitle, sectionSubtitle, titleHighlight } from '../helpers/styles'

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className={sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={sectionTitle}>Get In <span className={titleHighlight}>Touch</span></h2>
          <p className={sectionSubtitle}>Let's work together</p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Talk to me</h3>

            <a href={`mailto:${personalInfo.email}`} className={`${glassCardHover} flex items-center gap-5 p-5 mb-4`}>
              <HiOutlineMail className="text-2xl text-[var(--text-primary)] shrink-0" />
              <div>
                <h4 className="text-sm font-semibold mb-0.5">Email</h4>
                <p className="text-sm text-[var(--text-muted)]">{personalInfo.email}</p>
              </div>
            </a>

            <a
              href={`https://api.whatsapp.com/send?phone=919944643952&text=Hello!`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${glassCardHover} flex items-center gap-5 p-5 mb-4`}
            >
              <FaWhatsapp className="text-2xl text-[var(--text-primary)] shrink-0" />
              <div>
                <h4 className="text-sm font-semibold mb-0.5">WhatsApp</h4>
                <p className="text-sm text-[var(--text-muted)]">{personalInfo.phone}</p>
              </div>
            </a>

            <div className={`${glassCardHover} flex items-center gap-5 p-5`}>
              <HiOutlineLocationMarker className="text-2xl text-[var(--text-primary)] shrink-0" />
              <div>
                <h4 className="text-sm font-semibold mb-0.5">Location</h4>
                <p className="text-sm text-[var(--text-muted)]">{personalInfo.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Write me something</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="plexus-border plexus-border-sm w-full px-5 py-3 bg-[var(--bg-card)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]! outline-none transition-colors duration-150"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="plexus-border plexus-border-sm w-full px-5 py-3 bg-[var(--bg-card)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]! outline-none transition-colors duration-150"
              />
              <textarea
                name="project"
                placeholder="Your message..."
                rows={6}
                required
                className="plexus-border plexus-border-sm w-full px-5 py-3 bg-[var(--bg-card)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]! outline-none transition-colors duration-150 resize-y min-h-[120px]"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`${btnPrimary} self-start disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
              >
                {status === 'idle' && <>Send Message <FiSend /></>}
                {status === 'sending' && <>Sending...</>}
                {status === 'success' && <>Message Sent! <FiCheck /></>}
                {status === 'error' && <>Failed — Try Again <FiAlertCircle /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
