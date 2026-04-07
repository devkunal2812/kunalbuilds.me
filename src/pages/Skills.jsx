import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILL_CARDS } from '../data/skills'
import styles from './Skills.module.css'

const EXPERIENCE_ITEMS = [
  { id: 1, event: 'Tech Conference 2024', role: 'Speaker', year: '2024', icon: '🎤' },
  { id: 2, event: 'Startup Accelerator', role: 'Mentor', year: '2023', icon: '🚀' },
  { id: 3, event: 'Hackathon Winner', role: 'Team Lead', year: '2023', icon: '🏆' },
  { id: 4, event: 'Open Source Contributor', role: 'Maintainer', year: '2022-Present', icon: '💻' },
  { id: 5, event: 'Design Workshop', role: 'Instructor', year: '2023', icon: '🎨' },
  { id: 6, event: 'Tech Meetup', role: 'Organizer', year: '2022-2024', icon: '👥' },
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
                    <span className={styles.experienceIcon}>{item.icon}</span>
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
