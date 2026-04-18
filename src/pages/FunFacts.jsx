import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './FunFacts.module.css'
import { FUN_FACTS_DATA } from '../data/aboutSections'

function FactCard({ icon, title, description, delay }) {
  return (
    <motion.div
      className={styles.factCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <span className={styles.factIcon}>{icon}</span>
      <h3 className={styles.factTitle}>{title}</h3>
      <p className={styles.factDesc}>{description}</p>
    </motion.div>
  )
}

export default function FunFacts() {
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
          <span className={styles.eyebrow}>Get to Know Me</span>
          <h1 className={styles.title}>Fun Facts</h1>
          <p className={styles.subtitle}>
            A peek into my personality, habits, and quirks
          </p>
        </motion.div>

        <div className={styles.factsGrid}>
          {FUN_FACTS_DATA.map((item, index) => (
            <FactCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
