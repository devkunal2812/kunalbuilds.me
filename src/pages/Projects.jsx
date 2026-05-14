import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useAnimation } from 'framer-motion'
import styles from './Projects.module.css'
import { PROJECTS } from '../data/projects'
import { getImageProtectionProps } from '../utils/contentProtection'

function ProjectCard({ project, index, totalProjects, onRemove, isTop }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const controls = useAnimation()
  const [exitX, setExitX] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 100px']
  })

  // Scale down cards as they stack
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.96]
  )

  // Fade in
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0, 1, 1]
  )

  // Rotation based on drag
  const rotate = useTransform(x, [-200, 200], [-15, 15])

  const handleDragEnd = (event, info) => {
    const threshold = 150
    
    if (Math.abs(info.offset.x) > threshold) {
      // Card swiped away
      setExitX(info.offset.x > 0 ? 300 : -300)
      controls.start({
        x: info.offset.x > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 }
      }).then(() => {
        onRemove(project.id)
      })
    } else {
      // Snap back
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      })
    }
  }

  return (
    <motion.div
      ref={ref}
      className={styles.projectCard}
      style={{ 
        scale,
        opacity,
        x,
        rotate,
        '--accent': project.accent,
        '--card-index': index,
        zIndex: totalProjects - index,
        cursor: isTop ? 'grab' : 'default',
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
    >
        <div className={styles.accentLine} />
        <div className={styles.cardInner}>

          {/* Header */}
          <div className={styles.cardHeader}>
            <span className={styles.projectNumber}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={styles.badges}>
              <span className={styles.yearBadge}>{project.year}</span>
              <span
                className={styles.categoryBadge}
                style={{
                  color: project.accent,
                  background: `${project.accent}18`,
                  borderColor: `${project.accent}33`
                }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className={styles.cardContent}>
            <div className={styles.textColumn}>
              <div className={styles.iconWrapper}>
                <span className={styles.projectIcon}>{project.icon}</span>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.statsRow}>
                {project.stats.map((stat) => (
                  <div key={stat.label} className={styles.statItem}>
                    <span className={styles.statValue} style={{ color: project.accent }}>
                      {stat.value}
                    </span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.techStack}>
                {project.tech.map((tech) => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>

              <div className={styles.actions}>
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPrimary}
                    style={{ background: project.accent }}
                  >
                    View Project
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div className={styles.visualColumn}>
              <div className={styles.projectVisual}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className={styles.projectScreenshot}
                    {...getImageProtectionProps()}
                  />
                ) : (
                  <>
                    <div className={styles.visualGrid} />
                    <div className={styles.visualOrb1} style={{ background: `radial-gradient(circle, ${project.accent}28, transparent 70%)` }} />
                    <div className={styles.visualOrb2} style={{ background: `radial-gradient(circle, ${project.accent}18, transparent 70%)` }} />
                    <div className={styles.visualCorner} />
                  </>
                )}
                <div className={styles.liveBadge}>
                  <span className={styles.liveDot} />
                  Live
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Swipe hint for top card */}
        {isTop && (
          <motion.div 
            className={styles.swipeHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ← Swipe to dismiss →
          </motion.div>
        )}
    </motion.div>
  )
}

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS)

  const handleRemove = (id) => {
    setVisibleProjects(prev => prev.filter(p => p.id !== id))
  }

  const handleReset = () => {
    setVisibleProjects(PROJECTS)
  }

  return (
    <section className={styles.projects} id="projects">

      <div className={styles.sectionHeader}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.eyebrow}>Selected Work</p>
          <h2 className={styles.sectionTitle}>
            Featured
            <span>Projects</span>
          </h2>
          <p className={styles.subtitle}>Scroll to explore • Swipe to dismiss</p>
          <div className={styles.scrollHint}>
            <span className={styles.scrollLine} />
            scroll
            <span className={styles.scrollLine} />
          </div>
        </motion.div>
      </div>

      <div className={styles.stack}>
        {visibleProjects.length === 0 ? (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className={styles.emptyText}>All projects viewed! 🎉</p>
            <button className={styles.resetBtn} onClick={handleReset}>
              Reset Stack
            </button>
          </motion.div>
        ) : (
          visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalProjects={visibleProjects.length}
              onRemove={handleRemove}
              isTop={index === 0}
            />
          ))
        )}
      </div>

      <div className={styles.footer}>
        <a
          href="https://github.com/devkunal2812"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerText}
        >
          More projects on GitHub →
        </a>
      </div>

    </section>
  )
}
