import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const DESIGNS = [
  {
    id: 1,
    title: 'Portfolio UI Design',
    description: 'Personal portfolio concept with dark theme and motion',
    image: null,
    tag: 'UI Design'
  },
  {
    id: 2,
    title: 'College Magazine Layout',
    description: 'Editorial design for annual college publication',
    image: null,
    tag: 'Print Design'
  },
  {
    id: 3,
    title: 'Yearbook Design',
    description: 'Full yearbook layout with consistent visual identity',
    image: null,
    tag: 'Graphic Design'
  },
  {
    id: 4,
    title: 'App UI Prototype',
    description: 'Mobile-first app wireframe and high-fidelity prototype',
    image: null,
    tag: 'Figma'
  },
  {
    id: 5,
    title: 'Brand Identity',
    description: 'Logo and visual system for a student-run community',
    image: null,
    tag: 'Branding'
  },
  {
    id: 6,
    title: 'Dashboard Concept',
    description: 'Data-rich analytics dashboard with clean layout',
    image: null,
    tag: 'UI Design'
  }
]

const FACTS = [
  { icon: '🎓', label: 'Degree', value: 'B.Tech — Information Technology' },
  { icon: '📍', label: 'Based in', value: 'Vadodara, Gujarat, India' },
  { icon: '🏆', label: 'Hackathons', value: 'Top 5 in 6+ events' },
  { icon: '🚀', label: 'Community', value: 'Builder @ P.R.A.X.I.S Club' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function About() {
  return (
    <section className={styles.about} id="about">

      {/* ── Back link ── */}
      <div className={styles.backRow}>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </div>

      {/* ── Intro ── */}
      <div className={styles.introWrap}>
        <motion.div
          className={styles.intro}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp} custom={0}>
            About Me
          </motion.p>

          <motion.h1 className={styles.heading} variants={fadeUp} custom={1}>
            Builder. Designer.
            <span className={styles.headingAccent}> Problem Solver.</span>
          </motion.h1>

          <motion.p className={styles.bio} variants={fadeUp} custom={2}>
            I'm Kunal — a B.Tech IT student who builds things that actually work.
            I sit at the intersection of engineering and design, writing code that
            performs and crafting interfaces that feel right. Whether it's a
            full-stack web app, an automation workflow, or a pixel-perfect UI,
            I care about the details that most people skip.
          </motion.p>

          <motion.p className={styles.bio} variants={fadeUp} custom={3}>
            Outside of shipping projects, I mentor at workshops, contribute to
            open source, and organise community events through P.R.A.X.I.S Club.
            I believe the best work happens when curiosity meets execution.
          </motion.p>

          {/* Quick facts */}
          <motion.div className={styles.facts} variants={fadeUp} custom={4}>
            {FACTS.map((f) => (
              <div key={f.label} className={styles.factItem}>
                <span className={styles.factIcon}>{f.icon}</span>
                <div>
                  <span className={styles.factLabel}>{f.label}</span>
                  <span className={styles.factValue}>{f.value}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div className={styles.ctaRow} variants={fadeUp} custom={5}>
            <a
              href="mailto:kunal.dev.official07@gmail.com"
              className={styles.btnPrimary}
            >
              Let's Talk
            </a>
            <a
              href="https://linktr.ee/Kunal_Builds"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Linktree ↗
            </a>
          </motion.div>
        </motion.div>
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
          <p className={styles.eyebrow}>Creative Work</p>
          <h2 className={styles.designTitle}>Designs</h2>
          <p className={styles.designSubtitle}>
            A selection of UI, graphic, and editorial work
          </p>
        </motion.div>

        <div className={styles.grid}>
          {DESIGNS.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {/* Image placeholder */}
              <div className={styles.cardImage}>
                <div className={styles.cardImagePlaceholder}>
                  <span className={styles.cardImageIcon}>🎨</span>
                </div>
                <span className={styles.cardTag}>{item.tag}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
