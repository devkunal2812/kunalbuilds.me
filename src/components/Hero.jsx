import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import SystemCore from './SystemCore'
import { SKILL_CARDS } from '../data/skills'
import profilePhoto from '../assets/profile_photo.jpeg'
import styles from './Hero.module.css'

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '10+', label: 'Happy Clients' },
]

// Mobile Hero Component
function MobileHero() {
  const [activeSkill, setActiveSkill] = useState(null)
  const stickyRef = useRef(null)

  // Track scroll through the sticky container
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end']
  })

  // Calculate total scroll distance needed
  const cardWidth = 152
  const totalScroll = (SKILL_CARDS.length - 2) * cardWidth

  // Cards start at 0 and move left as you scroll through the section
  // 0.05 → 0.95 gives a small buffer at start/end
  const carouselX = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [0, -totalScroll]
  )

  const smoothX = useSpring(carouselX, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  })

  const handleSkillClick = (id) => {
    setActiveSkill((prev) => (prev === id ? null : id))
  }

  return (
    <div className={styles.mobileHero}>
      {/* Background layers - Same as desktop */}
      <div className={styles.mobileBgGrid} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb1}`} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb2}`} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb3}`} />

      {/* Profile Section - First snap point */}
      <motion.div 
        className={styles.mobileProfile}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          className={styles.mobileAvatarWrapper}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className={styles.mobileAvatarGlow} />
          <div className={styles.mobileAvatar}>
            <img src={profilePhoto} alt="Kunal — Profile" className={styles.mobileAvatarImg} />
          </div>
          <div className={styles.mobileOrbitRing}>
            <span className={styles.mobileOrbitDot} />
          </div>
        </motion.div>

        <motion.div 
          className={styles.mobileBadge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className={styles.mobileBadgePulse} />
          Full-Stack Engineer &amp; Product Designer
        </motion.div>

        <motion.h1 
          className={styles.mobileName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          KUNAL
        </motion.h1>

        {/* Stats row */}
        <motion.div 
          className={styles.mobileStats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className={styles.mobileStat}>
              <span className={styles.mobileStatValue}>{s.value}</span>
              <span className={styles.mobileStatLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Skills Carousel — sticky horizontal scroll section */}
      {/* Outer div is tall (scroll space), inner is sticky (pins in place) */}
      <div
        ref={stickyRef}
        className={styles.mobileCarouselOuter}
      >
        <div className={styles.mobileCarouselSticky}>
          <motion.p 
            className={styles.mobileCarouselLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore Skills
          </motion.p>

          <div className={styles.mobileCarouselWrapper}>
            <div className={styles.mobileFadeLeft} />
            <div className={styles.mobileFadeRight} />
            
            {/* Cards slide right as user scrolls down */}
            <motion.div
              className={styles.mobileCarouselScroll}
              style={{ x: smoothX }}
            >
              {SKILL_CARDS.map((skill, i) => (
                <motion.button
                  key={skill.id}
                  onClick={() => handleSkillClick(skill.id)}
                  className={`${styles.mobileSkillCard} ${activeSkill === skill.id ? styles.mobileSkillCardActive : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={styles.mobileSkillIcon}
                    dangerouslySetInnerHTML={{ __html: skill.icon }}
                  />
                  <p className={styles.mobileSkillLabel}>{skill.title}</p>
                  <p className={styles.mobileSkillTag}>{skill.sub}</p>
                  {activeSkill === skill.id && (
                    <motion.span 
                      className={styles.mobileActiveIndicator}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className={styles.mobileScrollProgress}>
            <motion.div
              className={styles.mobileScrollProgressBar}
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator for Profile Section */}
      <motion.div 
        className={styles.mobileScrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          className={styles.mobileScrollArrow}
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        >
          ↓
        </motion.div>
        <span className={styles.mobileScrollText}>Scroll to explore skills</span>
      </motion.div>
    </div>
  )
}

// Desktop Hero Component (Original)
export default function Hero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Mobile Hero - Only visible on mobile */}
      <div className={styles.mobileOnly}>
        <MobileHero />
      </div>

      {/* Desktop Hero - Original design */}
      <section className={styles.hero} id="hero" ref={heroRef}>
        {/* Background layers */}
        <div className={styles.bgGrid} />
        <div className={`${styles.bgOrb} ${styles.bgOrb1}`} />
        <div className={`${styles.bgOrb} ${styles.bgOrb2}`} />
        <div className={`${styles.bgOrb} ${styles.bgOrb3}`} />

        {/* Left — text content */}
        <div className={styles.heroText} ref={textRef}>
          <div className={styles.badge}>
            <span className={styles.badgePulse} />
            Full-Stack Engineer &amp; Product Designer
          </div>

          <h1 className={styles.headline}>
            Where Design<br />
            Meets{' '}
            <span className={styles.headlineGradient}>Intelligent</span>
            <br />Engineering
          </h1>

          <p className={styles.sub}>
            I craft high-performance web apps blending design precision with modern
            engineering — from pixel-perfect UI to scalable backend systems.
          </p>

          {/* Tech stack chips */}
          <div className={styles.chips}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Figma', 'AI Tools'].map((t) => (
              <span key={t} className={styles.chip}>{t}</span>
            ))}
          </div>

          {/* Stats row */}
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — visual system */}
        <SystemCore heroRef={heroRef} />
      </section>
    </>
  )
}
