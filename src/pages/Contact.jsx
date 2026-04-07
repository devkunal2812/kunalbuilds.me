import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const CONTACT_INFO = [
  {
    icon: '📧',
    label: 'Email',
    value: 'kunal@example.com',
    link: 'mailto:kunal@example.com'
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567'
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'San Francisco, CA',
    link: null
  }
]

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: '💻',
    url: 'https://github.com',
    color: '#333'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://linkedin.com',
    color: '#0077b5'
  },
  {
    name: 'Twitter',
    icon: '🐦',
    url: 'https://twitter.com',
    color: '#1da1f2'
  },
  {
    name: 'Dribbble',
    icon: '🎨',
    url: 'https://dribbble.com',
    color: '#ea4c89'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1500)
  }

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Have a project in mind? Let's work together to create something amazing
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
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Project inquiry"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Tell me about your project..."
                  rows="6"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent! ✓' : 'Send Message'}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
                        <a href={item.link} className={styles.infoValue}>
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

            <div className={styles.socialCard}>
              <h3 className={styles.infoTitle}>Follow Me</h3>
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
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                    <span className={styles.socialName}>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              className={styles.availability}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className={styles.availabilityDot} />
              <span className={styles.availabilityText}>Available for work</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
