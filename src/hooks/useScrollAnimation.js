import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Custom hook for scroll-triggered animations
 * Returns ref and inView state
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
    ...options
  })

  return { ref, isInView }
}

/**
 * Staggered children animation variants
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}
