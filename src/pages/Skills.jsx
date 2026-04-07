import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILL_CARDS } from '../data/skills'
import styles from './Skills.module.css'

const EXPERIENCE_ITEMS = [
  { id: 1, event: 'Tech Conference 2024', role: 'Speaker', year: '2024', icon: '🎤', iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>` },
  { id: 2, event: 'Startup Accelerator', role: 'Mentor', year: '2023', icon: '🚀', iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>` },
  { id: 3, event: 'Hackathon Winner', role: 'Team Lead', year: '2023', icon: '🏆', iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>` },
  { id: 4, event: 'Open Source Contributor', role: 'Maintainer', year: '2022-Present', icon: '💻', iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>` },
  { id: 5, event: 'Design Workshop', role: 'Instructor', year: '2023', icon: '🎨', iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z"/><circle cx="12" cy="12" r="3"/></svg>` },
  { id: 6, event: 'Tech Meetup', role: 'Organizer', year: '2022-2024', icon: '👥', iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
]

function TickerRow({ items, speed = 30, reverse = false, type = 'skill' }) {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className={styles.tickerRow}>
      {/* Gradient fades */}
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <motion.div
        className={styles.tickerTrack}
        animate={isPaused ? {} : {
          x: reverse ? [0, '-33.333%'] : ['-33.333%', 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
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
                        <div className={styles.detailBadge}>Experience</div>
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
