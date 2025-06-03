import { useEffect, useRef } from 'react'

interface FloatingShapesProps {
  count?: number
  color?: string
  className?: string
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({
  count = 10,
  color = '#D4AF37',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    // Clear any existing shapes
    container.innerHTML = ''
    
    // Create shapes
    for (let i = 0; i < count; i++) {
      const shape = document.createElement('div')
      
      // Randomize shape type
      const shapeType = Math.random() > 0.5 ? 'circle' : 'square'
      
      // Randomize size (between 10px and 50px)
      const size = Math.floor(Math.random() * 40) + 10
      
      // Randomize position
      const left = `${Math.random() * 100}%`
      const top = `${Math.random() * 100}%`
      
      // Randomize animation duration (between 10s and 30s)
      const animationDuration = Math.floor(Math.random() * 20) + 10
      
      // Randomize animation delay
      const animationDelay = Math.floor(Math.random() * 10)
      
      // Set shape styles
      shape.style.position = 'absolute'
      shape.style.width = `${size}px`
      shape.style.height = `${size}px`
      shape.style.left = left
      shape.style.top = top
      shape.style.backgroundColor = color
      shape.style.opacity = `${Math.random() * 0.5 + 0.1}`
      
      if (shapeType === 'circle') {
        shape.style.borderRadius = '50%'
      }
      
      // Set animation
      shape.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite`
      
      // Add shape to container
      container.appendChild(shape)
    }
  }, [count, color])
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  )
}

export default FloatingShapes
