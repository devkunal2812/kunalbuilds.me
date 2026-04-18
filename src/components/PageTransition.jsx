import { motion } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(10px)',
    y: 20,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
