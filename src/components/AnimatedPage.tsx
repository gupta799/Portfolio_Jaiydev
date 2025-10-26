import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type AnimatedPageProps = {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
}

const pageTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1], // Tailwind's ease-out curve
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
