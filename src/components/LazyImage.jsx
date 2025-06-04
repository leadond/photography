import { useState, useEffect } from 'react'

function LazyImage({ src, alt, className, placeholderColor = '#f3f4f6', ...props }) {
  const [imageSrc, setImageSrc] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Create a new image object
    const img = new Image()
    
    // Set up load event handler
    img.onload = () => {
      setImageSrc(src)
      setImageLoaded(true)
    }
    
    // Set the source to begin loading
    img.src = src
    
    // Clean up
    return () => {
      img.onload = null
    }
  }, [src])

  return (
    <div 
      className={`${className} relative overflow-hidden`} 
      style={{ backgroundColor: placeholderColor }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          {...props}
        />
      )}
    </div>
  )
}

export default LazyImage
