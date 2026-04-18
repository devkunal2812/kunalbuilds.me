import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './ExplorePanel.module.css'

const EXPLORE_ITEMS = [
  { id: 'timeline', label: 'Timeline', icon: '📅', route: '/timeline', description: 'My journey & experiences' },
  { id: 'gallery', label: 'Gallery', icon: '📸', route: '/gallery', description: 'Photos & moments' },
  { id: 'design-board', label: 'Design Board', icon: '🎨', route: '/design-board', description: 'UI/UX work showcase' },
  { id: 'fun-facts', label: 'Fun Facts', icon: '✨', route: '/fun-facts', description: 'Get to know me' },
  { id: 'achievements', label: 'Achievements', icon: '🏆', route: '/achievements', description: 'Awards & milestones' },
]

export default function ExplorePanel({ isOpen, onClose }) {
  const navigate = useNavigate()

  const handleItemClick = (route) => {
    navigate(route)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Explore</h2>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>

            <div className={styles.items}>
              {EXPLORE_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={styles.item}
                  onClick={() => handleItemClick(item.route)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.itemIcon}>{item.icon}</span>
                  <div className={styles.itemContent}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemDesc}>{item.description}</span>
                  </div>
                  <span className={styles.itemArrow}>→</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
