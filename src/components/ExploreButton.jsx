import { motion } from 'framer-motion'
import { useExplorePanel } from '../App'
import styles from './ExploreButton.module.css'

export default function ExploreButton() {
  const { openExplorePanel } = useExplorePanel()

  return (
    <motion.button
      className={styles.exploreBtn}
      onClick={openExplorePanel}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
      <span>Explore</span>
    </motion.button>
  )
}
