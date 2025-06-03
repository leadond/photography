import { ReactNode, useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  children?: ReactNode
  className?: string
  speed?: number
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  children,
  className = '',
  speed = 0.5,
  overlay = true,
  overlayColor = '#000',
  overlayOpacity = 0.6
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  
  const { scrollY } = useScroll()
  
  // Calculate the parallax effect
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [`${-speed * 50}%`, `${speed * 50}%`]
  )
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const updatePosition = () => {
      const rect = element.getBoundingClientRect()
      setElementTop(rect.top + window.scrollY)
      setClientHeight(window.innerHeight)
    }
    
    updatePosition()
    window.addEventListener('resize', updatePosition)
    
    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [])
  
  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {overlay && (
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: overlayColor,
            opacity: overlayOpacity
          }}
        ></div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ParallaxImage
