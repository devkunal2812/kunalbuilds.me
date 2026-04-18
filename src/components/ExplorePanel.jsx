import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './ExplorePanel.module.css'

const EXPLORE_ITEMS = [
  { 
    id: 'timeline', 
    label: 'Timeline', 
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    route: '/timeline', 
    description: 'My journey & experiences' 
  },
  { 
    id: 'gallery', 
    label: 'Gallery', 
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    route: '/gallery', 
    description: 'Photos & moments' 
  },
  { 
    id: 'design-board', 
    label: 'Design Board', 
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    route: '/design-board', 
    description: 'UI/UX work showcase' 
  },
  { 
    id: 'fun-facts', 
    label: 'Fun Facts', 
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    route: '/fun-facts', 
    description: 'Get to know me' 
  },
  { 
    id: 'achievements', 
    label: 'Achievements', 
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    route: '/achievements', 
    description: 'Awards & milestones' 
  },
]

export default function ExplorePanel({ isOpen, onClose }) {
  const navigate = useNavigate()

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              delay: 0.05 
            }}
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
                  transition={{ delay: 0.15 + (0.05 * index), duration: 0.3 }}
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
