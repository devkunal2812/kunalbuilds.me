import { useEffect, useRef, useState, useCallback } from 'react'
import SkillCard from './SkillCard'
import { SKILL_CARDS } from '../data/skills'
import styles from './SystemCore.module.css'
import profilePhoto from '../assets/profile_photo.jpeg'

export default function SystemCore({ heroRef }) {
  const coreRef = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rafId = useRef(null)

  const lerp = (a, b, t) => a + (b - a) * t

  // Smooth parallax
  useEffect(() => {
    const hero = heroRef.current
    const core = coreRef.current
    if (!hero || !core) return

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      mouseX.current = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 12
      mouseY.current = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 12
      if (!rafId.current) tick()
    }

    const onLeave = () => { mouseX.current = 0; mouseY.current = 0 }

    const tick = () => {
      currentX.current = lerp(currentX.current, mouseX.current, 0.06)
      currentY.current = lerp(currentY.current, mouseY.current, 0.06)
      core.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`
      rafId.current = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [heroRef])

  // Staggered card entrance
  useEffect(() => {
    const core = coreRef.current
    if (!core) return
    const cards = core.querySelectorAll('[data-card]')
    cards.forEach((c) => {
      c.style.opacity = '0'
      c.style.transform = 'translateY(16px)'
      c.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'
    })
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      cards.forEach((c, i) => {
        setTimeout(() => {
          c.style.opacity = '1'
          c.style.transform = 'translateY(0)'
        }, 80 + i * 100)
      })
      obs.unobserve(core)
    }, { threshold: 0.1 })
    obs.observe(core)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={styles.core} id="system-core" ref={coreRef}>
      <ConnectionsSVG />

      <div className={styles.coreFace}>
        <div className={styles.coreGlow} />
        <div className={`${styles.coreGlow} ${styles.coreGlow2}`} />
        <div className={`${styles.coreRing} ${styles.ring1}`} />
        <div className={`${styles.coreRing} ${styles.ring2}`} />
        <div className={`${styles.coreRing} ${styles.ring3}`} />
        <div className={styles.faceFrame}>
          <img src={profilePhoto} alt="Kunal — Profile" className={styles.faceImg} />
        </div>
        <div className={styles.coreLabel}>KUNAL</div>
      </div>

      {SKILL_CARDS.map((card) => (
        <SkillCard key={card.id} {...card} />
      ))}
    </div>
  )
}

// SVG uses a fixed 600×600 viewBox — scales naturally via CSS width/height
function ConnectionsSVG() {
  const PARTICLES = [
    { fill: '#666', dur: '2.6s', begin: '0s',   path: '#p-tl', r: 2.5 },
    { fill: '#3b82f6', dur: '2.9s', begin: '0.6s', path: '#p-tr', r: 2.5 },
    { fill: '#888', dur: '2.3s', begin: '1.1s', path: '#p-l',  r: 2.5 },
    { fill: '#3b82f6', dur: '3.1s', begin: '0.3s', path: '#p-r',  r: 2.5 },
    { fill: '#6366f1', dur: '2.7s', begin: '0.9s', path: '#p-bl', r: 2.5 },
    { fill: '#555', dur: '2.4s', begin: '1.4s', path: '#p-br', r: 2.5 },
    { fill: '#aaa', dur: '2.6s', begin: '1.3s', path: '#p-tl', r: 1.8, opacity: 0.6 },
    { fill: '#3b82f6', dur: '2.9s', begin: '1.9s', path: '#p-tr', r: 1.8, opacity: 0.5 },
    { fill: '#888', dur: '2.3s', begin: '0.4s', path: '#p-l',  r: 1.8, opacity: 0.5 },
  ]

  const PATHS = [
    { id: 'p-tl', d: 'M 108 128 C 165 185, 228 248, 300 300', grad: 'url(#lg-tl)' },
    { id: 'p-tr', d: 'M 492 128 C 435 185, 372 248, 300 300', grad: 'url(#lg-tr)' },
    { id: 'p-l',  d: 'M 52 300 C 130 292, 212 296, 300 300',  grad: 'url(#lg-l)'  },
    { id: 'p-r',  d: 'M 548 300 C 470 292, 388 296, 300 300', grad: 'url(#lg-r)'  },
    { id: 'p-bl', d: 'M 108 472 C 165 415, 228 352, 300 300', grad: 'url(#lg-bl)' },
    { id: 'p-br', d: 'M 492 472 C 435 415, 372 352, 300 300', grad: 'url(#lg-br)' },
  ]

  return (
    <svg className={styles.connections} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg-tl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#888" stopOpacity="0"/>
          <stop offset="100%" stopColor="#444" stopOpacity="0.5"/>
        </linearGradient>
        <linearGradient id="lg-tr" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#888" stopOpacity="0"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.45"/>
        </linearGradient>
        <linearGradient id="lg-l" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#aaa" stopOpacity="0"/>
          <stop offset="100%" stopColor="#555" stopOpacity="0.5"/>
        </linearGradient>
        <linearGradient id="lg-r" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#aaa" stopOpacity="0"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id="lg-bl" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#888" stopOpacity="0"/>
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id="lg-br" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#888" stopOpacity="0"/>
          <stop offset="100%" stopColor="#444" stopOpacity="0.5"/>
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="pglow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {PATHS.map(({ id, d, grad }) => (
        <path key={id} className={styles.connLine} d={d}
          stroke={grad} strokeWidth="1.2" fill="none" filter="url(#glow)" />
      ))}

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <circle key={i} r={p.r} fill={p.fill} opacity={p.opacity ?? 1} filter="url(#pglow)">
          <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin}>
            <mpath href={p.path} />
          </animateMotion>
        </circle>
      ))}

      {/* Hidden motion paths */}
      {PATHS.map(({ id, d }) => (
        <path key={`hidden-${id}`} id={id} d={d} fill="none" stroke="none" />
      ))}
    </svg>
  )
}
