import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion'
import { SKILL_CARDS } from '../data/skills'
import styles from './Skills.module.css'

const EXPERIENCE_ITEMS = [
  {
    id: 1,
    event: 'TRAE - Minimax Vadodara Workshop',
    role: 'Event Manager',
    year: '2026',
    icon: '🎤',
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`
  },

  {
    id: 2,
    event: 'D3 Workshop',
    role: 'Speaker (Basics of Competitive Programming)',
    year: '2026',
    icon: '🎤',
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`
  },

  {
    id: 3,
    event: 'Tech Community Activities',
    role: 'Organizer / Contributor',
    year: '2025–2026',
    icon: '👥',
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },

  {
    id: 4,
    event: 'Tech Heist: Break the Code',
    role: 'Team Lead & Website Developer',
    year: '2024',
    icon: '👑',
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 7l5 5 5-5 5 5 5-5v13H2z"/></svg>`
  },

  {
    id: 5,
    event: 'Event Hosting & Coordination',
    role: 'Coordinator',
    year: '2024–2025',
    icon: '🎯',
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/></svg>`
  },

  {
    id: 6,
    event: 'Tech Meetup',
    role: 'Organizer',
    year: '2022–2024',
    icon: '👥',
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  }
];

function TickerRow({ items, speed = 30, reverse = false, type = 'skill' }) {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const x = useMotionValue(0)
  const trackRef = useRef(null)

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items]

  // Calculate velocity based on speed (pixels per second)
  const velocity = reverse ? 50 : -50
  const adjustedVelocity = velocity * (40 / speed)

  useAnimationFrame((time, delta) => {
    if (!isPaused && trackRef.current) {
      const currentX = x.get()
      const trackWidth = trackRef.current.offsetWidth / 3 // One third is one loop
      
      let newX = currentX + (adjustedVelocity * delta) / 1000

      // Reset position seamlessly when one loop completes
      if (reverse) {
        if (newX >= 0) {
          newX = -trackWidth
        }
      } else {
        if (newX <= -trackWidth) {
          newX = 0
        }
      }

      x.set(newX)
    }
  })

  return (
    <div className={styles.tickerRow}>
      {/* Gradient fades */}
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <motion.div
        ref={trackRef}
        className={styles.tickerTrack}
        style={{ x }}
      >
        {duplicatedItems.map((item, index) => {
          const itemKey = `${item.id}-${index}`
          const isHovered = hoveredItem === itemKey

          return (
            <div key={itemKey} className={styles.tickerItemWrapper}>
              <motion.div
                className={`${styles.tickerItem} ${type === 'experience' ? styles.experienceItem : ''} ${isHovered ? styles.tickerItemHovered : ''}`}
                onMouseEnter={() => {
                  setIsPaused(true)
                  setHoveredItem(itemKey)
                }}
                onMouseLeave={() => {
                  setIsPaused(false)
                  setHoveredItem(null)
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {type === 'skill' ? (
                  <>
                    <div 
                      className={styles.skillIcon}
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                    <div className={styles.skillContent}>
                      <span className={styles.skillTitle}>{item.title}</span>
                      <span className={styles.skillSub}>{item.sub}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.experienceIconWrapper}>
                      {item.iconSvg ? (
                        <div 
                          className={styles.experienceIconSvg}
                          dangerouslySetInnerHTML={{ __html: item.iconSvg }}
                        />
                      ) : (
                        <span className={styles.experienceIcon}>{item.icon}</span>
                      )}
                    </div>
                    <div className={styles.experienceContent}>
                      <span className={styles.experienceEvent}>{item.event}</span>
                      <span className={styles.experienceRole}>{item.role}</span>
                    </div>
                    <span className={styles.experienceYear}>{item.year}</span>
                  </>
                )}
              </motion.div>

              {/* Detail card on hover - outside ticker item */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className={styles.detailCard}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {type === 'skill' ? (
                      <>
                        <h4>{item.title}</h4>
                        <p className={styles.detailDescription}>{item.sub}</p>
                        <div className={styles.detailBadge}>Skill</div>
                      </>
                    ) : (
                      <>
                        <h4>{item.event}</h4>
                        <p className={styles.detailRole}>{item.role}</p>
                        <p className={styles.detailYear}>{item.year}</p>
                        <div className={styles.detailBadge}>Achievement</div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Skills & Experience</h2>
          <p className={styles.subtitle}>
            Hover to explore • Continuous scroll
          </p>
        </motion.div>

        <div className={styles.tickerContainer}>
          {/* Skills Row */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.rowLabel}>
              <span className={styles.labelIcon}>💡</span>
              <span>Skills</span>
            </div>
            <TickerRow items={SKILL_CARDS} speed={40} type="skill" />
          </motion.div>

          {/* Experience Row */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginTop: '40px' }}
          >
            <div className={styles.rowLabel}>
              <span className={styles.labelIcon}>🚀</span>
              <span>Experience</span>
            </div>
            <TickerRow items={EXPERIENCE_ITEMS} speed={35} reverse type="experience" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
