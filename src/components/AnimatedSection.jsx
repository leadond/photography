import { motion } from 'framer-motion'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

/**
 * Component that animates its children when they enter the viewport
 */
function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn', // Options: fadeIn, slideUp, slideIn, scale, none
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  ...props
}) {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
  })
  
  // Don't animate if set to once and already animated
  const shouldAnimate = once ? !hasIntersected || isIntersecting : isIntersecting
  
  // Define animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideIn: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  }
  
  // Select the appropriate animation variant
  const selectedVariant = variants[animation] || variants.fadeIn
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
