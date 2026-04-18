import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Achievements.module.css'
import { ACHIEVEMENTS_DATA, ACHIEVEMENT_STATS } from '../data/achievements'

function AchievementCard({ category, icon, color, items, delay }) {
  return (
    <motion.div
      className={styles.achievementCard}
      style={{ '--card-color': color }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <h3 className={styles.cardCategory}>{category}</h3>
      </div>
      <div className={styles.cardItems}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={styles.achievementItem}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 * (index + 1) }}
          >
            <div className={styles.itemBullet} />
            <div className={styles.itemContent}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Achievements() {
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
          <span className={styles.eyebrow}>Milestones & Recognition</span>
          <h1 className={styles.title}>Achievements</h1>
          <p className={styles.subtitle}>
            Highlights from my journey as a developer and designer
          </p>
        </motion.div>

        <div className={styles.achievementsGrid}>
          {ACHIEVEMENTS_DATA.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              category={achievement.category}
              icon={achievement.icon}
              color={achievement.color}
              items={achievement.items}
              delay={0.1 * index}
            />
          ))}
        </div>

        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {ACHIEVEMENT_STATS.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
