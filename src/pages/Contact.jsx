import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const CONTACT_INFO = [
  {
    icon: '📧',
    label: 'Email',
    value: 'kunal.dev.official07@gmail.com',
    link: 'mailto:kunal.dev.official07@gmail.com'
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+91 7990381022',
    link: 'tel:+917990381022'
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Vadodara, Gujarat, India',
    link: null
  }
]

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: '💻',
    url: 'https://github.com/devkunal2812'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/kunal-chauhan-626164296/'
  },
  {
    name: 'X (Twitter)',
    icon: '🐦',
    url: 'https://x.com/KunalChauh48311'
  },
  {
    name: 'Linktree',
    icon: '🌿',
    url: 'https://linktr.ee/Kunal_Builds'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('') // '' | 'sending' | 'success' | 'error'
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xyklyrgw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        // Reset success message after 5 seconds
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 5000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    }
  }

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Have an idea or opportunity? Let's connect.
          </p>
        </motion.div>

        <div className={styles.content}>

          {/* Contact Form */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <motion.div 
                className={styles.formGroup}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.label 
                  htmlFor="name" 
                  className={`${styles.label} ${focusedField === 'name' || formData.name ? styles.labelFloating : ''}`}
                  animate={{
                    y: focusedField === 'name' || formData.name ? -24 : 0,
                    scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                    color: focusedField === 'name' ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Name
                </motion.label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={styles.input}
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div 
                className={styles.formGroup}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <motion.label 
                  htmlFor="email" 
                  className={`${styles.label} ${focusedField === 'email' || formData.email ? styles.labelFloating : ''}`}
                  animate={{
                    y: focusedField === 'email' || formData.email ? -24 : 0,
                    scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                    color: focusedField === 'email' ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Email
                </motion.label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={styles.input}
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div 
                className={styles.formGroup}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <motion.label 
                  htmlFor="message" 
                  className={`${styles.label} ${focusedField === 'message' || formData.message ? styles.labelFloating : ''}`}
                  animate={{
                    y: focusedField === 'message' || formData.message ? -24 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                    color: focusedField === 'message' ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Message
                </motion.label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  className={styles.textarea}
                  rows="6"
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending' || status === 'success'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <span className={styles.btnText}>
                  {status === 'sending'
                    ? 'Sending...'
                    : status === 'success'
                    ? 'Sent! ✓'
                    : 'Send Message'}
                </span>
                {status === 'sending' && (
                  <motion.span
                    className={styles.btnLoader}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  ✨ Thanks! I'll get back to you soon.
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  ⚠️ Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Contact Info */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <div className={styles.infoList}>
                {CONTACT_INFO.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={styles.infoItem}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <span className={styles.infoIcon}>{item.icon}</span>
                    <div className={styles.infoContent}>
                      <span className={styles.infoLabel}>{item.label}</span>
                      {item.link ? (
                        <a
                          href={item.link}
                          className={styles.infoValue}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className={styles.infoValue}>{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialCard}>
              <h3 className={styles.infoTitle}>Find Me Online</h3>
              <div className={styles.socialLinks}>
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                    <span className={styles.socialName}>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              className={styles.availability}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className={styles.availabilityDot} />
              <span className={styles.availabilityText}>
                Available for work &amp; collaborations
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
