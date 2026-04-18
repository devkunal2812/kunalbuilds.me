import { motion, AnimatePresence } from 'framer-motion'
import styles from './BugModeOverlay.module.css'

export default function BugModeOverlay({ isActive }) {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Red glitch overlay */}
          <motion.div
            className={styles.glitchOverlay}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0, 0.4, 0, 0.2, 0],
              x: [0, -5, 5, -3, 3, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5,
              times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
              repeat: 5
            }}
          />

          {/* Scanlines */}
          <motion.div
            className={styles.scanlines}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
          />

          {/* Bug emoji explosion */}
          <div className={styles.bugContainer}>
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2
              const distance = 40
              const targetX = 50 + Math.cos(angle) * distance
              const targetY = 50 + Math.sin(angle) * distance
              
              return (
                <motion.div
                  key={i}
                  className={styles.bug}
                  initial={{ 
                    left: '50%', 
                    top: '50%',
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    left: `${targetX}%`,
                    top: `${targetY}%`,
                    scale: [0, 1.5, 0],
                    rotate: Math.random() * 720
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                >
                  🐛
                </motion.div>
              )
            })}
          </div>

          {/* "BUG MODE" text */}
          <motion.div
            className={styles.bugText}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.8],
              rotate: [-5, 5, -3, 0]
            }}
            transition={{ duration: 2 }}
          >
            🐛 BUG MODE ACTIVATED 🐛
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
