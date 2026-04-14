import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

// Scroll-based links (home page sections)
const SCROLL_LINKS = ['Projects', 'Skills', 'Contact']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Scroll to section (home page only)
  const handleScroll = (e, id) => {
    e.preventDefault()
    setOpen(false)
    if (!isHome) {
      // Navigate home then scroll
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoDot} />
          <span>Kunal.dev</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {/* About → separate page */}
          <li>
            <Link
              to="/about"
              className={location.pathname === '/about' ? styles.activeLink : ''}
            >
              About
            </Link>
          </li>

          {/* Scroll-based links */}
          {SCROLL_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                onClick={(e) => handleScroll(e, l.toLowerCase())}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <a
            href="#contact"
            className={styles.status}
            onClick={(e) => handleScroll(e, 'contact')}
            aria-label="Available for work"
          >
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Available for work</span>
          </a>

          <a
            href="https://drive.google.com/file/d/1_placeholder/view"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
          >
            Resume ↗
          </a>

          {/* Hamburger */}
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} aria-hidden={!open}>
        <ul className={styles.drawerLinks}>
          <li>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          </li>
          {SCROLL_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                onClick={(e) => handleScroll(e, l.toLowerCase())}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className={styles.drawerStatus}
          onClick={(e) => handleScroll(e, 'contact')}
        >
          <span className={styles.statusDot} />
          Available for work
        </a>

        <a
          href="https://drive.google.com/file/d/1_placeholder/view"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.drawerResume}
        >
          Download Resume ↗
        </a>
      </div>

      {/* Backdrop */}
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </>
  )
}
