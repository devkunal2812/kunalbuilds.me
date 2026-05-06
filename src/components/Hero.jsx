import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SystemCore from './SystemCore'
import { SKILL_CARDS } from '../data/skills'
import profilePhoto from '../assets/profile_photo.jpeg'
import styles from './Hero.module.css'
import { getImageProtectionProps } from '../utils/contentProtection'
import pianoSound from '../utils/pianoSound'

function MobileHero() {
  return (
    <div className={styles.mobileHero}>
      <div className={styles.mobileBgGrid} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb1}`} />
      <div className={`${styles.mobileBgOrb} ${styles.mobileBgOrb2}`} />

      {/* Profile */}
      <div className={styles.mobileProfile}>
        <div className={styles.mobileAvatarWrapper}>
          <div className={styles.mobileAvatarGlow} />
          <div className={styles.mobileAvatar}>
            <img 
              src={profilePhoto} 
              alt="Kunal" 
              className={styles.mobileAvatarImg}
              {...getImageProtectionProps()}
            />
          </div>
          <div className={styles.mobileOrbitRing}>
            <span className={styles.mobileOrbitDot} />
          </div>
        </div>

        <div className={styles.mobileBadge}>
          <span className={styles.mobileBadgePulse} />
          Full-Stack Engineer &amp; Product Designer
        </div>

        <h1 className={styles.mobileName}>Kunal Chauhan</h1>

        <div className={styles.mobileStats}>
          {[
            { value: '3+',  label: 'Years Exp.' },
            { value: '20+', label: 'Projects' },
            { value: '10+', label: 'Clients' },
          ].map((s) => (
            <div key={s.label} className={styles.mobileStat}>
              <span className={styles.mobileStatValue}>{s.value}</span>
              <span className={styles.mobileStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileDivider} />

      {/* Skills Grid - completely static, no interaction */}
      <div className={styles.mobileSkillsSection}>
        <p 
          className={styles.mobileSkillsLabel}
          onClick={() => pianoSound.playExploreMelody()}
          style={{ cursor: 'pointer' }}
        >
          Explore Skills
        </p>
        <div className={styles.mobileSkillGrid}>
          {SKILL_CARDS.map((skill, index) => (
            <div
              key={skill.id}
              className={styles.mobileSkillCard}
              onClick={() => pianoSound.playSkillSound(index)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className={styles.mobileSkillIcon}
                dangerouslySetInnerHTML={{ __html: skill.icon }}
              />
              <p className={styles.mobileSkillLabel}>{skill.title}</p>
              <p className={styles.mobileSkillTag}>{skill.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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

  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const headlineText = "Where Design Meets Intelligent Engineering"
  const words = headlineText.split(' ')

  return (
    <>
      <div className={styles.mobileOnly}>
        <MobileHero />
      </div>

      <section className={styles.hero} id="hero" ref={heroRef}>
        <div className={styles.bgGrid} />
        <div className={`${styles.bgOrb} ${styles.bgOrb1}`} />
        <div className={`${styles.bgOrb} ${styles.bgOrb2}`} />
        <div className={`${styles.bgOrb} ${styles.bgOrb3}`} />

        <div className={styles.heroText} ref={textRef}>
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.badgePulse} />
            Full-Stack Engineer &amp; Product Designer
          </motion.div>

          <motion.h1 
            className={styles.headline}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                className={
                  word === 'Intelligent' ? styles.headlineGradient : ''
                }
              >
                {word === 'Design' || word === 'Meets' || word === 'Engineering' ? (
                  <>
                    {word}
                    <br />
                  </>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            className={styles.sub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            I craft high-performance web apps blending design precision with modern
            engineering - from pixel-perfect UI to scalable backend systems.
          </motion.p>

          <motion.div 
            className={styles.chips}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Figma', 'AI Tools'].map((t, i) => (
              <motion.span 
                key={t} 
                className={styles.chip}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 + (i * 0.05) }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {[
              { value: '3+',  label: 'Years Experience' },
              { value: '20+', label: 'Projects Shipped' },
              { value: '10+', label: 'Happy Clients' },
            ].map((s, i) => (
              <motion.div 
                key={s.label} 
                className={styles.stat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.8 + (i * 0.1) }}
              >
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <SystemCore heroRef={heroRef} />
      </section>
    </>
  )
}
