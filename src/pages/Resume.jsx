import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Resume.module.css'

export default function Resume() {
  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Link to="/about" className={styles.backLink}>← Back to About</Link>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>Professional Profile</span>
          <h1 className={styles.title}>Resume</h1>
          <p className={styles.subtitle}>
            View or download my complete CV
          </p>
        </motion.div>

        <motion.div
          className={styles.resumeCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.resumeIcon}>📄</div>
          <h2 className={styles.resumeTitle}>Kunal Chauhan - Resume</h2>
          <p className={styles.resumeDesc}>
            Full-Stack Engineer & Product Designer
          </p>

          <div className={styles.resumeActions}>
            <motion.a
              href="/resume.pdf"
              download
              className={styles.btnPrimary}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Download PDF</span>
              <span>↓</span>
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Online</span>
              <span>↗</span>
            </motion.a>
          </div>

          <div className={styles.resumeNote}>
            <span className={styles.noteIcon}>💡</span>
            <p className={styles.noteText}>
              Add your resume PDF to the <code>public/</code> folder and name it <code>resume.pdf</code>
            </p>
          </div>
        </motion.div>

        <motion.div
          className={styles.quickInfo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className={styles.quickTitle}>Quick Info</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🎓</span>
              <div>
                <div className={styles.infoLabel}>Education</div>
                <div className={styles.infoValue}>B.Tech IT - SVIT, Vasad</div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoValue}>Vadodara, Gujarat</div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>💼</span>
              <div>
                <div className={styles.infoLabel}>Experience</div>
                <div className={styles.infoValue}>4+ Projects</div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <div>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>kunal.dev.official07@gmail.com</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
