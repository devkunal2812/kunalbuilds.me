import { useEffect, useRef } from 'react'
import SystemCore from './SystemCore'
import styles from './Hero.module.css'

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '10+', label: 'Happy Clients' },
]

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
  )
}
