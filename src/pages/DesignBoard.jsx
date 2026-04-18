import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './DesignBoard.module.css'
import { SLIDES } from '../data/designBoard'
import { getImageProtectionProps } from '../utils/contentProtection'

function DotGrid() {
  return (
    <svg className={styles.dotGrid} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1.2" fill="rgba(255,255,255,0.18)"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    </svg>
  )
}

function PhotoCard({ item, index, onSelect }) {
  return (
    <motion.div
      className={styles.photoCard}
      style={{
        width: item.w,
        top: item.top,
        left: item.left,
        '--rotate': `${item.rotate}deg`,
        '--accent': item.accent,
        zIndex: item.z || 5 + index,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
      onClick={() => onSelect(item)}
    >
      <div className={styles.photoArea} style={{ height: item.h }}>
        {item.image
          ? <img 
              src={item.image} 
              alt={item.title} 
              className={styles.photoImg}
              {...getImageProtectionProps()}
            />
          : <div className={styles.photoPlaceholder}><span className={styles.photoPlaceholderIcon}>📷</span></div>
        }
      </div>
      <div className={styles.stickyLabel} style={{ background: item.accent }}>
        {item.title}
      </div>
    </motion.div>
  )
}

// Expanded split-screen view
function ExpandedView({ item, onClose }) {
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)
  const minSwipeDistance = 80

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    const distance = touchStartY.current - touchEndY.current
    const isDownSwipe = distance < -minSwipeDistance

    if (isDownSwipe) {
      onClose()
    }
  }

  return (
    <motion.div
      className={styles.expandedOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.expandedInner}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left - enlarged image */}
        <motion.div
          className={styles.expandedLeft}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.swipeIndicator} />
          {item.image
            ? <img 
                src={item.image} 
                alt={item.title} 
                className={styles.expandedImg}
                {...getImageProtectionProps()}
              />
            : (
              <div className={styles.expandedPlaceholder} style={{ '--accent': item.accent }}>
                <span className={styles.expandedPlaceholderIcon}>🎨</span>
                <span className={styles.expandedPlaceholderLabel}>{item.category}</span>
              </div>
            )
          }
          <div className={styles.expandedAccentBar} style={{ background: item.accent }} />
        </motion.div>

        {/* Right - detail panel */}
        <motion.div
          className={styles.expandedRight}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.expandedCategory} style={{ color: item.accent }}>
            {item.category}
          </span>

          <h2 className={styles.expandedTitle}>{item.title}</h2>

          <p className={styles.expandedDescription}>{item.description}</p>

          <div className={styles.expandedSection}>
            <p className={styles.expandedSectionLabel}>Tools Used</p>
            <div className={styles.toolsList}>
              {item.tools.map((t) => (
                <span key={t} className={styles.toolTag} style={{ borderColor: `${item.accent}44`, color: item.accent }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.expandedSection}>
            <p className={styles.expandedSectionLabel}>Purpose</p>
            <p className={styles.expandedPurpose}>{item.purpose}</p>
          </div>

          <button
            className={styles.expandedClose}
            onClick={onClose}
            style={{ '--accent': item.accent }}
          >
            ← Back to Board
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function DesignBoard() {
  const [slide, setSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()
  const total = SLIDES.length

  // Touch gesture handling
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const minSwipeDistance = 50

  const prev = useCallback(() => {
    if (selected) return
    setDirection(-1)
    setSlide((s) => (s - 1 + total) % total)
  }, [total, selected])

  const next = useCallback(() => {
    if (selected) return
    setDirection(1)
    setSlide((s) => (s + 1) % total)
  }, [total, selected])

  const handleTouchStart = (e) => {
    if (selected) return
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (selected) return
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (selected) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      next()
    } else if (isRightSwipe) {
      prev()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selected) {
        if (e.key === 'Escape') setSelected(null)
        return
      }
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') navigate(-1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prev, next, selected, navigate])

  return (
    <div className={styles.overlay}>

      {/* Close board */}
      <button className={styles.closeBtn} onClick={() => navigate(-1)} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* The board - background never changes */}
      <div 
        className={styles.board}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <DotGrid />

        <div className={styles.boardTitle}>
          <span>Design</span>
          <span className={styles.boardTitleAccent}>Board</span>
        </div>

        <div className={styles.slideCounter}>
          {String(slide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        {/* Photos layer */}
        <div className={styles.photosLayer}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide}
              className={styles.photosFrame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {SLIDES[slide].map((item, i) => (
                <PhotoCard key={item.id} item={item} index={i} onSelect={setSelected} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot nav */}
        <div className={styles.dots}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
              onClick={() => { setDirection(i > slide ? 1 : -1); setSlide(i) }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Expanded view - renders on top of board */}
      <AnimatePresence>
        {selected && (
          <ExpandedView item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

    </div>
  )
}
