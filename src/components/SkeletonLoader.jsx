import styles from './SkeletonLoader.module.css'

// Generic skeleton components
export function SkeletonBox({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) {
  return (
    <div 
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
    />
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`${styles.skeletonText} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox 
          key={i} 
          height="16px" 
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`${styles.skeletonCard} ${className}`}>
      <SkeletonBox height="200px" borderRadius="12px" />
      <div className={styles.skeletonCardContent}>
        <SkeletonBox height="24px" width="80%" />
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}

// Project card skeleton
export function ProjectCardSkeleton() {
  return (
    <div className={styles.projectSkeleton}>
      <SkeletonBox height="280px" borderRadius="16px" />
      <div className={styles.projectSkeletonContent}>
        <SkeletonBox height="28px" width="70%" />
        <SkeletonBox height="16px" width="40%" />
        <SkeletonText lines={2} />
        <div className={styles.projectSkeletonTags}>
          <SkeletonBox height="28px" width="60px" borderRadius="14px" />
          <SkeletonBox height="28px" width="80px" borderRadius="14px" />
          <SkeletonBox height="28px" width="70px" borderRadius="14px" />
        </div>
      </div>
    </div>
  )
}

// Skill card skeleton
export function SkillCardSkeleton() {
  return (
    <div className={styles.skillSkeleton}>
      <SkeletonBox width="48px" height="48px" borderRadius="12px" />
      <SkeletonBox height="20px" width="80%" />
      <SkeletonBox height="14px" width="60%" />
    </div>
  )
}

// Hero skeleton
export function HeroSkeleton() {
  return (
    <div className={styles.heroSkeleton}>
      <div className={styles.heroSkeletonContent}>
        <SkeletonBox height="20px" width="200px" borderRadius="20px" />
        <SkeletonBox height="60px" width="100%" />
        <SkeletonBox height="60px" width="90%" />
        <SkeletonText lines={2} />
        <div className={styles.heroSkeletonChips}>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBox key={i} height="32px" width="80px" borderRadius="16px" />
          ))}
        </div>
      </div>
    </div>
  )
}

// About page skeleton
export function AboutSkeleton() {
  return (
    <div className={styles.aboutSkeleton}>
      <SkeletonBox width="120px" height="120px" borderRadius="50%" />
      <SkeletonBox height="40px" width="300px" />
      <SkeletonText lines={4} />
      <div className={styles.aboutSkeletonGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}

// Design board skeleton
export function DesignBoardSkeleton() {
  return (
    <div className={styles.designBoardSkeleton}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className={styles.designCardSkeleton}
          style={{
            width: `${180 + Math.random() * 60}px`,
            height: `${140 + Math.random() * 80}px`,
            transform: `rotate(${-5 + Math.random() * 10}deg)`
          }}
        >
          <SkeletonBox height="100%" borderRadius="8px" />
        </div>
      ))}
    </div>
  )
}
