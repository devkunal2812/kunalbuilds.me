import { Link, useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './About.module.css'
import { LEFT_CHIPS, RIGHT_CHIPS, STATS } from '../data/about'

function FloatChip({ label, icon, x, y, rotate, delay, mouseX, mouseY, depth = 1, description }) {
  const [showTooltip, setShowTooltip] = useState(false)
  
  useEffect(() => {
    if (!showTooltip) return
    
    const handleClickOutside = () => setShowTooltip(false)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showTooltip])
  
  // Reduced parallax intensity (25% less) with depth layers
  const parallaxStrength = 0.02 * depth // Reduced from 0.03
  
  const chipX = useTransform(mouseX, (latest) => {
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 400
    const strength = Math.max(0, 1 - distance / maxDistance)
    return (latest - window.innerWidth / 2) * strength * parallaxStrength
  })

  const chipY = useTransform(mouseY, (latest) => {
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 400
    const strength = Math.max(0, 1 - distance / maxDistance)
    return (latest - window.innerHeight / 2) * strength * parallaxStrength
  })

  // Smoother spring with slight lag for depth
  const springConfig = { damping: 25, stiffness: 120, mass: depth }
  const chipXSpring = useSpring(chipX, springConfig)
  const chipYSpring = useSpring(chipY, springConfig)

  const handleClick = (e) => {
    e.stopPropagation()
    setShowTooltip(!showTooltip)
  }

  return (
    <motion.div
      className={styles.chipWrapper}
      style={{ 
        '--cx': `${x}px`, 
        '--cy': `${y}px`,
      }}
    >
      <motion.div
        className={styles.chip}
        style={{ 
          rotate,
          x: chipXSpring,
          y: chipYSpring,
          filter: depth < 1 ? 'blur(1px)' : 'blur(0px)',
          opacity: depth < 1 ? 0.7 : 1
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: depth < 1 ? 0.7 : 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.4, delay: delay + 0.4 },
          scale: { duration: 0.4, delay: delay + 0.4 }
        }}
        onHoverStart={() => {}}
        onHoverEnd={() => {}}
        onClick={handleClick}
        onTap={handleClick}
        whileHover={{ 
          scale: 1.08,
          rotate: 0,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.chipIcon}>{icon}</span>
        <span className={styles.chipLabel}>{label}</span>
      </motion.div>

      {/* Tooltip on click */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className={styles.chipTooltip}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <p className={styles.tooltipText}>
              {description || 'Used in 5+ projects'}
            </p>
            <div className={styles.tooltipArrow} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CountUpStat({ value, label, delay }) {
  const [count, setCount] = useState(0)
  const target = parseInt(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const increment = target / 30
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [target, delay])

  return (
    <motion.div 
      className={styles.statItem}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <span className={styles.statNum}>{count}{value.includes('+') ? '+' : ''}</span>
      <span className={styles.statLbl}>{label}</span>
    </motion.div>
  )
}

export default function About() {
  const navigate = useNavigate()
  const [cardEntered, setCardEntered] = useState(false)
  
  // Mouse position tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Trigger card entered state
  useEffect(() => {
    const timer = setTimeout(() => setCardEntered(true), 400)
    return () => clearTimeout(timer)
  }, [])

  // Assign depth layers to chips
  const leftChipsWithDepth = LEFT_CHIPS.map((chip, i) => ({
    ...chip,
    depth: i % 2 === 0 ? 1 : 0.8 // Alternating depth
  }))

  const rightChipsWithDepth = RIGHT_CHIPS.map((chip, i) => ({
    ...chip,
    depth: i % 2 === 0 ? 1 : 0.8
  }))

  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>
      </div>

      {/* ── Hero scene ── */}
      <div className={styles.scene}>

        {/* Floating Design Board Button */}
        <motion.div 
          className={styles.designBoardFloat}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.button
            className={styles.designBoardBtn}
            onClick={() => navigate('/design-board')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.designBoardIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            </span>
            <span>Design Board</span>
            <motion.span 
              className={styles.designBoardHint}
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              View my work →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Chips layer with focus pull effect */}
        <motion.div 
          className={styles.chipsLayer}
          animate={{ 
            opacity: cardEntered ? 1 : 0.3,
            filter: cardEntered ? 'blur(0px)' : 'blur(2px)'
          }}
          transition={{ duration: 0.6 }}
        >
          {leftChipsWithDepth.map((c) => <FloatChip key={c.label} {...c} mouseX={mouseX} mouseY={mouseY} />)}
          {rightChipsWithDepth.map((c) => <FloatChip key={c.label} {...c} mouseX={mouseX} mouseY={mouseY} />)}
        </motion.div>

        {/* Center card */}
        <div className={styles.centerWrap}>
          <motion.div
            className={styles.centerCard}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
          >
            <motion.span 
              className={styles.eyebrow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              About Me
            </motion.span>
            
            {/* Staggered headline */}
            <h1 className={styles.heading}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                Builder.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                Designer.
              </motion.span>
              <br />
              <motion.span 
                className={styles.accent}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Problem Solver.
              </motion.span>
            </h1>

            <motion.p 
              className={styles.bio}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              I'm Kunal — a B.Tech IT student who builds things that actually work.
              I sit at the intersection of engineering and design, writing code that
              performs and crafting interfaces that feel right.
            </motion.p>
            <motion.p 
              className={styles.bio}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Whether it's a full-stack web app, an automation workflow, or a
              pixel-perfect UI — I care about the details that most people skip.
            </motion.p>

            <motion.div 
              className={styles.meta}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className={styles.metaItem}><span>🎓</span><span>B.Tech IT — SVIT, Vasad</span></div>
              <div className={styles.metaItem}><span>📍</span><span>Vadodara, Gujarat, India</span></div>
            </motion.div>

            <div className={styles.stats}>
              {STATS.map((s, i) => (
                <CountUpStat key={s.label} value={s.value} label={s.label} delay={1.2 + i * 0.1} />
              ))}
            </div>

            <motion.div 
              className={styles.ctaRow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <motion.a 
                href="mailto:kunal.dev.official07@gmail.com" 
                className={styles.btnPrimary}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
              </motion.a>
              <motion.a 
                href="https://linktr.ee/Kunal_Builds" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.btnSecondary}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Linktree ↗
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}