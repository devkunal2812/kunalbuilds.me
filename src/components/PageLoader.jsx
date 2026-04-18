import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PageLoader.module.css'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const MINIMUM_DURATION = 8500 // 8.5 seconds minimum
    const FADE_OUT_DELAY = 900 // Additional delay before fade starts
    const startTime = Date.now()
    let contentReady = false

    // Simulate loading progress - very slow for 9 second experience
    // 1.25% every 100ms = 80 intervals × 100ms = 8000ms = 8 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          contentReady = true
          setIsComplete(true)
          return 100
        }
        // Very slow progress: 1.25% every 100ms
        return prev + 1.25
      })
    }, 100)

    // Check if minimum duration has passed
    const checkMinimumDuration = () => {
      const elapsed = Date.now() - startTime
      const remaining = MINIMUM_DURATION - elapsed

      if (remaining > 0) {
        // Wait for minimum duration to complete
        setTimeout(() => {
          setTimeout(() => setIsLoading(false), FADE_OUT_DELAY)
        }, remaining)
      } else {
        // Minimum duration already passed
        setTimeout(() => setIsLoading(false), FADE_OUT_DELAY)
      }
    }

    // When content is ready, check minimum duration
    const readyCheck = setInterval(() => {
      if (contentReady) {
        clearInterval(readyCheck)
        checkMinimumDuration()
      }
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(readyCheck)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        >
          <motion.div
            className={styles.loaderContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              scale: 0.95, 
              opacity: 0,
              transition: { duration: 0.5 }
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated logo/icon */}
            <motion.div
              className={styles.logoWrapper}
              animate={isComplete ? {
                scale: [1, 1.15, 1],
              } : {
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={isComplete ? {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              } : {
                duration: 4, // Slower rotation for longer experience
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className={styles.logo}>
                <span className={styles.logoDot} />
                <span className={styles.logoText}>K</span>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <motion.div
                className={styles.progressBar}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                  duration: 0.5,
                  ease: "linear"
                }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className={styles.loadingText}
              animate={{ opacity: isComplete ? 1 : [0.5, 1, 0.5] }}
              transition={{ 
                duration: isComplete ? 0.3 : 2.5, 
                repeat: isComplete ? 0 : Infinity,
                ease: "easeInOut"
              }}
            >
              {isComplete ? 'Ready ✓' : 'Loading Experience...'}
            </motion.p>
          </motion.div>

          {/* Animated particles */}
          <div className={styles.particles}>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                style={{
                  '--angle': `${(360 / 12) * i}deg`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
