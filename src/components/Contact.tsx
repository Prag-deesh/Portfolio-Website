import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { personalInfo, sections, contactLabels } from '../helpers/constants'
import { trackContactSubmit } from '../helpers/analytics'
import {
  container, contactCard, contactIcon, input, slideIn, fadeIn,
} from '../helpers/styles'
import {
  contactSection, contactGrid, contactHeading, contactInfoTitle, contactInfoValue,
  contactCardSpaced, contactForm, contactTextarea, contactSubmitBtn,
} from '../helpers/styles/components'
import SectionHeader from './SectionHeader'

const sec = sections.contact
const cl = contactLabels

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      // Dynamic import — emailjs is only loaded when the user actually submits
      const emailjs = await import('@emailjs/browser')
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      trackContactSubmit()
      formRef.current.reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id={sec.id} className={contactSection}>
      <div className={container}>
        <SectionHeader section={sec} animation={fadeIn()} />

        <div className={contactGrid}>
          <motion.div {...slideIn('left')}>
            <h3 className={contactHeading}>{cl.infoHeading}</h3>

            <a href={`mailto:${personalInfo.email}`} className={`${contactCard} ${contactCardSpaced}`}>
              <HiOutlineMail className={contactIcon} />
              <div>
                <h4 className={contactInfoTitle}>{cl.emailLabel}</h4>
                <p className={contactInfoValue}>{personalInfo.email}</p>
              </div>
            </a>

            <a
              href={`https://api.whatsapp.com/send?phone=${personalInfo.phone.replace(/\D/g, '')}&text=${cl.whatsappGreeting}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactCard} ${contactCardSpaced}`}
            >
              <FaWhatsapp className={contactIcon} />
              <div>
                <h4 className={contactInfoTitle}>{cl.whatsappLabel}</h4>
                <p className={contactInfoValue}>{personalInfo.phone}</p>
              </div>
            </a>

            <div className={contactCard}>
              <HiOutlineLocationMarker className={contactIcon} />
              <div>
                <h4 className={contactInfoTitle}>{cl.locationLabel}</h4>
                <p className={contactInfoValue}>{personalInfo.location}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...slideIn('right', 0.2)}>
            <h3 className={contactHeading}>{cl.formHeading}</h3>

            <form ref={formRef} onSubmit={handleSubmit} className={contactForm}>
              <input type="text" name="name" placeholder={cl.namePlaceholder} required className={input} />
              <input type="email" name="email" placeholder={cl.emailPlaceholder} required className={input} />
              <textarea name="project" placeholder={cl.messagePlaceholder} rows={6} required className={`${input} ${contactTextarea}`} />
              <button type="submit" disabled={status === 'sending'} className={contactSubmitBtn}>
                {status === 'idle' && <>{cl.sendBtn} <FiSend /></>}
                {status === 'sending' && <>{cl.sendingBtn}</>}
                {status === 'success' && <>{cl.successBtn} <FiCheck /></>}
                {status === 'error' && <>{cl.errorBtn} <FiAlertCircle /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
