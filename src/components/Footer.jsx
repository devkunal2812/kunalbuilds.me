import { useState, useEffect } from 'react'
import styles from './Footer.module.css'

const SOCIAL = [
  { label: 'GitHub',   href: 'https://github.com/devkunal2812' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kunal-chauhan-626164296/' },
  { label: 'X',        href: 'https://x.com/KunalChauh48311' },
  { label: 'Linktree', href: 'https://linktr.ee/Kunal_Builds' },
]

export default function Footer() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      setShowButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Back to Top Button */}
        <button
          className={`${styles.backToTop} ${showButton ? styles.backToTopVisible : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          <span>Back to Top</span>
        </button>

        <p className={styles.copy}>© {new Date().getFullYear()} Kunal Builds</p>

        <div className={styles.links}>
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className={styles.tagline}>
          Crafted with passion by Kunal Chauhan - Turning ideas into reality
        </p>
      </div>
    </footer>
  )
}
