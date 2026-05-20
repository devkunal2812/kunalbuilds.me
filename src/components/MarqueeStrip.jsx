import styles from './MarqueeStrip.module.css'

function normalizeItem(item, index) {
  if (typeof item === 'string') {
    return { id: `marquee-item-${index}`, text: item }
  }

  return {
    id: item.id ?? `marquee-item-${index}`,
    text: item.text ?? '',
  }
}

export default function MarqueeStrip({
  items = [],
  label = 'Portfolio highlights',
  duration = 28,
}) {
  const normalizedItems = items.map(normalizeItem).filter((item) => item.text)

  if (normalizedItems.length === 0) {
    return null
  }

  return (
    <section className={styles.marqueeSection} aria-label={label}>
      <div
        className={styles.marqueeStrip}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className={styles.edgeFade} aria-hidden="true" />
        <div className={styles.track}>
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className={styles.group}
              aria-hidden={groupIndex === 1}
            >
              {normalizedItems.map((item, index) => (
                <div key={`${groupIndex}-${item.id}`} className={styles.item}>
                  <span className={styles.itemText}>{item.text}</span>
                  {index < normalizedItems.length - 1 && (
                    <span className={styles.dot} aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
