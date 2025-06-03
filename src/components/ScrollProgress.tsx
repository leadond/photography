import { useState, useEffect } from 'react'

interface ScrollProgressProps {
  color?: string
  height?: number
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  color = '#D4AF37', 
  height = 3 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx * 100
      setScrollProgress(scrolled)
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress)

    // Initial call
    updateScrollProgress()

    // Clean up
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: 'transparent',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          backgroundColor: color,
          transition: 'width 0.2s ease-out',
        }}
      />
    </div>
  )
}

export default ScrollProgress
