import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

const links = ['About', 'Projects', 'Skills', 'Contact']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNav = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo}>
          <span className={styles.logoDot} />
          <span>Kunal.dev</span>
        </div>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={(e) => handleNav(e, l.toLowerCase())}>{l}</a>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <a href="#contact" className={styles.status} onClick={(e) => handleNav(e, 'contact')} aria-label="Available for work">
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Available for work</span>
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
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={(e) => handleNav(e, l.toLowerCase())}>{l}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className={styles.drawerStatus} onClick={(e) => handleNav(e, 'contact')}>
          <span className={styles.statusDot} />
          Available for work
        </a>
      </div>

      {/* Backdrop */}
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </>
  )
}
