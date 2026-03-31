import styles from './SkillCard.module.css'

export default function SkillCard({ position, delay, floatDur, iconVariant, icon, title, sub }) {
  return (
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
  )
}
