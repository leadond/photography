import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import { Photo } from '../context/GalleryContext'

interface PhotoGridProps {
  photos: Photo[]
  categories?: string[]
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  
  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory)
  
  const breakpointColumns = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  }
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <div ref={ref}>
      {/* Category Filter */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {/* Photo Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.title} 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
              <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-medium text-lg">{photo.title}</h3>
                <p className="text-gray-200 text-sm">{photo.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>
      
      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.title} 
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
              <h3 className="text-white font-medium text-lg">{selectedPhoto.title}</h3>
              <p className="text-gray-300 text-sm">{selectedPhoto.category}</p>
            </div>
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPhoto(null)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGrid
