import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type AnimatedPageProps = {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 1.03,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
  },
}

const pageTransition = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 24,
  // Exit uses a faster ease-in
  opacity: { duration: 0.2, ease: 'easeIn' },
}

function AnimatedPage({ children }: AnimatedPageProps): JSX.Element {
  return (
    <motion.div
      animate="animate"
      exit="exit"
      initial="initial"
      transition={pageTransition}
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
