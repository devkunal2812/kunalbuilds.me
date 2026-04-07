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
  const carouselRef = useRef(null)
  const skillsSectionRef = useRef(null)
  const carouselScrollRef = useRef(null)
  
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])
  
  // Smooth spring physics for scroll
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Horizontal scroll effect based on vertical scroll
  const { scrollYProgress } = useScroll({
    target: skillsSectionRef,
    offset: ["start end", "end start"]
  })
  
  // More dramatic horizontal movement
  const carouselX = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200])
  const smoothCarouselX = useSpring(carouselX, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  const handleSkillClick = (id) => {
    setActiveSkill((prev) => (prev === id ? null : id))
  }

  const activeSkillData = SKILL_CARDS.find((s) => s.id === activeSkill)

  return (
    <div className={styles.mobileHero}>
      {/* Background layers - Same as desktop */}
      <div className={styles.mobileBgGrid} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb1}`} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb2}`} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb3}`} />

      {/* Profile Section */}
      <motion.div 
        className={styles.mobileProfile}
        style={{ opacity: heroOpacity, scale: heroScale }}
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

      {/* Skills Carousel */}
      <motion.div 
        ref={skillsSectionRef}
        className={styles.mobileCarousel}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px", amount: 0.3 }}
        transition={{ 
          duration: 1, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
      >
        <motion.p 
          className={styles.mobileCarouselLabel}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Explore Skills
        </motion.p>

        <div className={styles.mobileCarouselWrapper}>
          <div className={styles.mobileFadeLeft} />
          <div className={styles.mobileFadeRight} />
          
          <motion.div 
            ref={carouselScrollRef} 
            className={styles.mobileCarouselScroll}
            style={{ x: smoothCarouselX }}
          >
            {SKILL_CARDS.map((skill, i) => (
              <motion.button
                key={skill.id}
                onClick={() => handleSkillClick(skill.id)}
                className={`${styles.mobileSkillCard} ${activeSkill === skill.id ? styles.mobileSkillCardActive : ''}`}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px", amount: 0.5 }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                  scale: { type: "spring", stiffness: 300, damping: 25 }
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={styles.mobileSkillIcon}
                  dangerouslySetInnerHTML={{ __html: skill.icon }}
                  whileHover={{ 
                    rotate: [0, -8, 8, -8, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                />
                <p className={styles.mobileSkillLabel}>{skill.title}</p>
                <p className={styles.mobileSkillTag}>{skill.sub}</p>
                {activeSkill === skill.id && (
                  <motion.span 
                    className={styles.mobileActiveIndicator}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Scroll Dots */}
        <motion.div 
          className={styles.mobileScrollDots}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {SKILL_CARDS.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => handleSkillClick(s.id)}
              className={`${styles.mobileScrollDot} ${activeSkill === s.id ? styles.mobileScrollDotActive : ''}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div 
        className={styles.mobileCTA}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.button 
          className={styles.mobileCTAPrimary}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          View Projects
        </motion.button>
        <motion.button 
          className={styles.mobileCTASecondary}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.button>
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
      <section className={styles.hero} id="about" ref={heroRef}>
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
