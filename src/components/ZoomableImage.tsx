import { useState, useRef } from 'react'

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  zoomFactor?: number
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  className = '',
  zoomFactor = 2
}) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    
    // Calculate position as percentage
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    
    setPosition({ x, y })
  }
  
  const handleMouseEnter = () => {
    setIsZoomed(true)
  }
  
  const handleMouseLeave = () => {
    setIsZoomed(false)
  }
  
  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-200"
        style={{
          transform: isZoomed ? `scale(${zoomFactor})` : 'scale(1)',
          transformOrigin: isZoomed ? `${position.x * 100}% ${position.y * 100}%` : 'center center'
        }}
      />
      
      {/* Optional zoom indicator */}
      <div className={`absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded transition-opacity duration-200 ${
        isZoomed ? 'opacity-100' : 'opacity-0'
      }`}>
        Zoomed {zoomFactor}x
      </div>
    </div>
  )
}

export default ZoomableImage
