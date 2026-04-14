import { useEffect, useRef } from 'react'
import SystemCore from './SystemCore'
import { SKILL_CARDS } from '../data/skills'
import profilePhoto from '../assets/profile_photo.jpeg'
import styles from './Hero.module.css'

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
            <img src={profilePhoto} alt="Kunal" className={styles.mobileAvatarImg} />
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

      {/* Skills Grid — completely static, no interaction */}
      <div className={styles.mobileSkillsSection}>
        <p className={styles.mobileSkillsLabel}>Explore Skills</p>
        <div className={styles.mobileSkillGrid}>
          {SKILL_CARDS.map((skill) => (
            <div
              key={skill.id}
              className={styles.mobileSkillCard}
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

          <div className={styles.chips}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Figma', 'AI Tools'].map((t) => (
              <span key={t} className={styles.chip}>{t}</span>
            ))}
          </div>

          <div className={styles.stats}>
            {[
              { value: '3+',  label: 'Years Experience' },
              { value: '20+', label: 'Projects Shipped' },
              { value: '10+', label: 'Happy Clients' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <SystemCore heroRef={heroRef} />
      </section>
    </>
  )
}
