import { useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import LazyImage from './LazyImage'

// Using memo to prevent unnecessary re-renders
const ImageGallery = memo(({ images, className = '' }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  // Using useCallback to memoize functions
  const openLightbox = useCallback((image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }, [])
  
  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }, [])
  
  // Early return if no images
  if (!images || images.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No images to display</p>
      </div>
    )
  }
  
  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id || index}
            className="overflow-hidden rounded-lg shadow-md cursor-pointer h-64"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(image)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <LazyImage
              src={image.url}
              alt={image.alt || 'Gallery image'}
              className="w-full h-full object-cover"
              placeholderColor="#f3f4f6"
            />
          </motion.div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img 
            src={selectedImage.url} 
            alt={selectedImage.alt || 'Gallery image'} 
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  )
})

ImageGallery.displayName = 'ImageGallery'

export default ImageGallery
