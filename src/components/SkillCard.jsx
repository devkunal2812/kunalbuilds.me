import styles from './SkillCard.module.css'

export default function SkillCard({ position, delay, floatDur, iconVariant, icon, title, sub }) {
  return (
    <>
      {/* Desktop floating card */}
      <div
        className={`${styles.card} ${styles[position]}`}
        style={{ '--delay': delay, '--float-dur': floatDur }}
        data-card
      >
        <div className={`${styles.icon} ${styles[iconVariant]}`}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.sub}>{sub}</span>
        </div>
      </div>

      {/* Mobile pill — hidden on desktop via CSS */}
      <div className={`${styles.mobilePill}`} data-mobile-pill>
        <span className={`${styles.pillIcon} ${styles[iconVariant]}`}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
        <span className={styles.pillTitle}>{title}</span>
      </div>
    </>
  )
}
