import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './About.module.css'
import { LEFT_CHIPS, RIGHT_CHIPS, STATS } from '../data/about'

function FloatChip({ label, icon, x, y, rotate, delay }) {
  return (
    <motion.div
      className={styles.chip}
      style={{ '--cx': `${x}px`, '--cy': `${y}px`, rotate }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y: { duration: 3.5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 }
      }}
      whileHover={{ scale: 1.08, rotate: 0 }}
    >
      <span className={styles.chipIcon}>{icon}</span>
      <span className={styles.chipLabel}>{label}</span>
    </motion.div>
  )
}


export default function About() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>
      </div>

      {/* ── Hero scene ── */}
      <div className={styles.scene}>

        {/* Chips are absolute inside .chipsLayer which is centered */}
        <div className={styles.chipsLayer}>
          {LEFT_CHIPS.map((c) => <FloatChip key={c.label} {...c} />)}
          {RIGHT_CHIPS.map((c) => <FloatChip key={c.label} {...c} />)}
        </div>

        {/* Center card — sticky so it stays in view while chips scroll */}
        <div className={styles.centerWrap}>
          <motion.div
            className={styles.centerCard}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrow}>About Me</span>
            <h1 className={styles.heading}>
              Builder.<br />Designer.<br />
              <span className={styles.accent}>Problem Solver.</span>
            </h1>
            <p className={styles.bio}>
              I'm Kunal — a B.Tech IT student who builds things that actually work.
              I sit at the intersection of engineering and design, writing code that
              performs and crafting interfaces that feel right.
            </p>
            <p className={styles.bio}>
              Whether it's a full-stack web app, an automation workflow, or a
              pixel-perfect UI — I care about the details that most people skip.
            </p>
            <div className={styles.meta}>
              <div className={styles.metaItem}><span>🎓</span><span>B.Tech IT — SVIT, Vasad</span></div>
              <div className={styles.metaItem}><span>📍</span><span>Vadodara, Gujarat, India</span></div>
            </div>
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statNum}>{s.value}</span>
                  <span className={styles.statLbl}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.ctaRow}>
              <a href="mailto:kunal.dev.official07@gmail.com" className={styles.btnPrimary}>Let's Talk</a>
              <a href="https://linktr.ee/Kunal_Builds" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>Linktree ↗</a>
            </div>
          </motion.div>
        </div>

      </div>

      {/* ── Design Showcase ── */}
      <div className={styles.designSection}>
        <motion.div
          className={styles.designHeader}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.sectionEyebrow}>Creative Work</p>
          <h2 className={styles.sectionTitle}>UI/UX & Graphic Design</h2>
          <p className={styles.sectionSubtitle}>A selection of design work — interfaces, editorial, and branding</p>
          <motion.button
            className={styles.boardBtn}
            onClick={() => navigate('/design-board')}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View Design Board</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
