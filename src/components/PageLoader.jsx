import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PageLoader.module.css'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const MINIMUM_DURATION = 2000 // 2 seconds minimum
    const FADE_OUT_DELAY = 400 // Additional delay before fade starts
    const startTime = Date.now()
    let contentReady = false

    // Simulate loading progress - faster for 2 second experience
    // 5% every 100ms = 20 intervals × 100ms = 2000ms = 2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          contentReady = true
          setIsComplete(true)
          return 100
        }
        // Faster progress: 5% every 100ms
        return prev + 5
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
            {/* Premium animated logo */}
            <motion.div
              className={styles.logoWrapper}
              animate={isComplete ? {
                scale: [1, 1.2, 1],
                rotateY: [0, 360],
              } : {
                rotateY: [0, 360],
              }}
              transition={isComplete ? {
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              } : {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className={styles.logo}>
                <motion.div 
                  className={styles.logoRing}
                  animate={{
                    rotate: [0, -360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className={styles.logoRingInner}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 0.95, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className={styles.logoText}>K</span>
                <motion.div
                  className={styles.logoPulse}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            {/* Premium progress bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
                <motion.div
                  className={styles.progressGlow}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              </div>
              <motion.span 
                className={styles.progressPercent}
                key={Math.floor(progress)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>

            {/* Loading text with status */}
            <motion.div className={styles.statusContainer}>
              <motion.p
                className={styles.loadingText}
                animate={{ opacity: isComplete ? 1 : [0.6, 1, 0.6] }}
                transition={{ 
                  duration: isComplete ? 0.3 : 1.5, 
                  repeat: isComplete ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              >
                {isComplete ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    ✓ Ready to Launch
                  </motion.span>
                ) : (
                  'Initializing Experience'
                )}
              </motion.p>
              {!isComplete && (
                <motion.div 
                  className={styles.loadingDots}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className={styles.dot}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Premium animated particles */}
          <div className={styles.particles}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                style={{
                  '--angle': `${(360 / 20) * i}deg`,
                  '--distance': `${150 + Math.random() * 100}px`,
                }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          
          {/* Background gradient orbs */}
          <div className={styles.backgroundOrbs}>
            <motion.div 
              className={styles.orb}
              animate={{
                x: [0, 100, 0],
                y: [0, -80, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className={styles.orb}
              animate={{
                x: [0, -120, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
