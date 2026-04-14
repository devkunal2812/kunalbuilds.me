import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './About.module.css'
import { LEFT_CHIPS, RIGHT_CHIPS, DESIGNS, STATS } from '../data/about'

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

function DesignCard({ item, index }) {
  return (
    <motion.div
      className={styles.designCard}
      style={{ '--card-accent': item.accent }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div className={styles.designImg}>
        {item.image
          ? <img src={item.image} alt={item.title} className={styles.designImgEl} />
          : <div className={styles.designPlaceholder}><span className={styles.designPlaceholderIcon}>🎨</span></div>
        }
        <span className={styles.designCategory}>{item.category}</span>
      </div>
      <div className={styles.designBody}>
        <h3 className={styles.designTitle}>{item.title}</h3>
        <p className={styles.designDesc}>{item.description}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
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
        </motion.div>
        <div className={styles.designGrid}>
          {DESIGNS.map((item, i) => <DesignCard key={item.id} item={item} index={i} />)}
        </div>
      </div>
    </div>
  )
}
