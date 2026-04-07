import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useRef, useState } from 'react'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    description: 'Modern e-commerce solution with real-time inventory management, smart cart logic, and seamless Stripe payment integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    accentColor: '#3b82f6',
    accentRgb: '59, 130, 246',
    icon: '🛍️',
    stats: [{ label: 'Uptime', value: '99.9%' }, { label: 'Orders/day', value: '1.2k' }],
    year: '2024'
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'Frontend',
    description: 'Collaborative task management tool with drag-and-drop interface, nested subtasks, and real-time multi-user updates.',
    tech: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    accentColor: '#8b5cf6',
    accentRgb: '139, 92, 246',
    icon: '✅',
    stats: [{ label: 'Active users', value: '3.4k' }, { label: 'Tasks/mo', value: '18k' }],
    year: '2024'
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    category: 'Data Viz',
    description: 'Interactive analytics dashboard with custom D3 charts, drill-down views, and real-time data pipeline integration.',
    tech: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    accentColor: '#10b981',
    accentRgb: '16, 185, 129',
    icon: '📊',
    stats: [{ label: 'Data points', value: '2M+' }, { label: 'Dashboards', value: '120' }],
    year: '2023'
  },
  {
    id: 4,
    title: 'AI Chatbot',
    category: 'AI / ML',
    description: 'Context-aware intelligent assistant with NLP, memory recall across sessions, and multi-modal input support.',
    tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    accentColor: '#f97316',
    accentRgb: '249, 115, 22',
    icon: '🤖',
    stats: [{ label: 'Accuracy', value: '94%' }, { label: 'Queries/hr', value: '8k' }],
    year: '2023'
  }
]

function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 400, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 400, damping: 30 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 0.15']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.7, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  const blur = useTransform(scrollYProgress, [0, 0.6, 1], [8, 2, 0])
  const filterStr = useMotionTemplate`blur(${blur}px)`

  const smoothScale = useSpring(scale, { stiffness: 120, damping: 20 })
  const smoothOpacity = useSpring(opacity, { stiffness: 120, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 })

  return (
    <div ref={cardRef} className={styles.cardContainer}>
      <motion.div
        style={{
          scale: smoothScale,
          opacity: smoothOpacity,
          y: smoothY,
          filter: filterStr,
          '--accent': project.accentColor,
          '--accent-rgb': project.accentRgb,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TiltCard
          className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
          style={{ '--accent': project.accentColor, '--accent-rgb': project.accentRgb }}
        >
          {/* Glow blob */}
          <div
            className={styles.glowBlob}
            style={{ opacity: hovered ? 1 : 0 }}
          />

          <div
            className={styles.cardContent}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Header Row */}
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.projectNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.yearBadge}>{project.year}</span>
              </div>
              <span className={styles.category}>{project.category}</span>
            </div>

            {/* Main Content Grid */}
            <div className={styles.mainContent}>
              {/* Text Column */}
              <div className={styles.textSection}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>

                {/* Stats Row */}
                <div className={styles.statsRow}>
                  {project.stats.map((s) => (
                    <div key={s.label} className={styles.statItem}>
                      <span className={styles.statValue}>{s.value}</span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className={styles.techStack}>
                  {project.tech.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <a href="#" className={styles.btnPrimary}>
                    <span>View Project</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.btnSecondary}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Visual Column */}
              <div className={styles.visualSection}>
                <div className={styles.projectVisual}>
                  {/* Decorative grid */}
                  <div className={styles.visualGrid} />
                  {/* Floating orbs */}
                  <div className={styles.orb1} />
                  <div className={styles.orb2} />
                  {/* Icon */}
                  <div className={styles.iconWrapper}>
                    <span className={styles.projectIcon}>{project.icon}</span>
                  </div>
                  {/* Corner tag */}
                  <div className={styles.visualTag}>
                    <span className={styles.visualTagDot} />
                    Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  return (
    <section 
      className={styles.projects} 
      id="projects"
    >
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>Selected Work</p>
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            Scroll down to explore — each card reveals as you go
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <div className={styles.stack}>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Footer spacer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>More projects on GitHub →</p>
      </div>
    </section>
  )
}