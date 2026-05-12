import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PageLoader.module.css'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const MINIMUM_DURATION = 3500 // Increased from 2000ms to 3500ms
    const FADE_OUT_DELAY = 600 // Increased from 400ms to 600ms
    const startTime = Date.now()
    let contentReady = false

    // Progress animation - slower
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          contentReady = true
          setIsComplete(true)
          return 100
        }
        return prev + 2.5 // Reduced from 5 to 2.5 for slower progress
      })
    }, 100)

    // Check minimum duration
    const checkMinimumDuration = () => {
      const elapsed = Date.now() - startTime
      const remaining = MINIMUM_DURATION - elapsed

      if (remaining > 0) {
        setTimeout(() => {
          setTimeout(() => setIsLoading(false), FADE_OUT_DELAY)
        }, remaining)
      } else {
        setTimeout(() => setIsLoading(false), FADE_OUT_DELAY)
      }
    }

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
          {/* Animated grid background */}
          <div className={styles.gridBackground}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.gridDot}
                style={{
                  left: `${(i % 5) * 25}%`,
                  top: `${Math.floor(i / 5) * 25}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main content */}
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
            {/* K Logo with animated drawing */}
            <div className={styles.logoContainer}>
              {/* LED dot with glow rings */}
              <motion.div className={styles.ledDot}>
                <motion.div 
                  className={styles.ledCore}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className={styles.ledRing1}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.1, 0.4],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className={styles.ledRing2}
                  animate={{
                    scale: [1, 1.7, 1],
                    opacity: [0.2, 0.05, 0.2],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* K Letter SVG */}
              <svg 
                className={styles.kLogo} 
                viewBox="0 0 200 220" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Vertical spine */}
                <motion.line
                  x1="50" y1="20" x2="50" y2="200"
                  stroke="#e6eef8"
                  strokeWidth="18"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
                
                {/* Upper arm */}
                <motion.line
                  x1="56" y1="108" x2="170" y2="30"
                  stroke="#e6eef8"
                  strokeWidth="15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
                
                {/* Lower arm */}
                <motion.line
                  x1="56" y1="118" x2="175" y2="195"
                  stroke="#e6eef8"
                  strokeWidth="15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 2.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
                
                {/* Mint accent notch */}
                <motion.rect
                  x="54" y="110" width="8" height="10" rx="2"
                  fill="#63d2ac"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 2.7,
                    type: "spring",
                    stiffness: 200
                  }}
                />
                
                {/* Mint accent square at upper arm */}
                <motion.rect
                  x="160" y="20" width="14" height="14" rx="3"
                  fill="#63d2ac"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 2.9,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.5;1"
                    dur="2.5s"
                    begin="2s"
                    repeatCount="indefinite"
                  />
                </motion.rect>
              </svg>

              {/* Accent underbar */}
              <motion.div 
                className={styles.accentBar}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                <motion.div 
                  className={styles.shimmer}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    delay: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>

              {/* Particle spray effect */}
              <div className={styles.particleSpray}>
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles.particle}
                    style={{
                      '--angle': `${(360 / 30) * i}deg`,
                      '--distance': `${80 + Math.random() * 60}px`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 1.5 + (i * 0.05),
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* KUNAL BUILDS text */}
            <motion.div 
              className={styles.brandText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.7,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <span className={styles.brandName}>KUNAL</span>
              <span className={styles.brandAction}> BUILDS</span>
            </motion.div>

            {/* Progress bar */}
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

            {/* Status text */}
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

          {/* Scan line effect */}
          <motion.div 
            className={styles.scanLine}
            initial={{ y: -12 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: 1,
              ease: "linear"
            }}
          />

          {/* Border frame */}
          <motion.div 
            className={styles.borderFrame}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
