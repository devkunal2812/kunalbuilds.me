import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Timeline.module.css'
import { TIMELINE_DATA } from '../data/aboutSections'

function TimelineItem({ year, title, description, icon, delay }) {
  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.timelineIcon}>{icon}</div>
      <div className={styles.timelineContent}>
        <span className={styles.timelineYear}>{year}</span>
        <h3 className={styles.timelineTitle}>{title}</h3>
        <p className={styles.timelineDesc}>{description}</p>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
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
          <span className={styles.eyebrow}>My Journey</span>
          <h1 className={styles.title}>Timeline</h1>
          <p className={styles.subtitle}>
            Key moments and milestones that shaped my path
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {TIMELINE_DATA.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              icon={item.icon}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
