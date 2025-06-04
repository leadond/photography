import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for detecting when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Percentage of element visibility needed to trigger (0-1)
 * @param {string} options.root - Element used as viewport for checking visibility
 * @param {string} options.rootMargin - Margin around the root
 * @returns {Array} [ref, isIntersecting] - Ref to attach to element and boolean indicating visibility
 */
function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsIntersecting(entry.isIntersecting)
        
        // Once element has been visible, remember that
        if (entry.isIntersecting) {
          setHasIntersected(true)
        }
      },
      {
        threshold,
        root: root ? document.querySelector(root) : null,
        rootMargin,
      }
    )
    
    const currentRef = ref.current
    
    if (currentRef) {
      observer.observe(currentRef)
    }
    
    // Cleanup observer on unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, root, rootMargin])
  
  return [ref, isIntersecting, hasIntersected]
}

export default useIntersectionObserver
