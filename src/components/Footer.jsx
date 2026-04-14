import styles from './Footer.module.css'

const SOCIAL = [
  { label: 'GitHub',   href: 'https://github.com/devkunal2812' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kunal-chauhan-626164296/' },
  { label: 'X',        href: 'https://x.com/KunalChauh48311' },
  { label: 'Linktree', href: 'https://linktr.ee/Kunal_Builds' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>© 2026 Kunal's Build</p>

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
          Designed & built by Kunal Chauhan
        </p>
      </div>
    </footer>
  )
}
