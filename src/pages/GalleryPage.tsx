import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import PageTransition from '../components/PageTransition'

// Create Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tnomchrujzfhpxtycdzs.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRub21jaHJ1anpmaHB4dHljZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzI1NTAsImV4cCI6MjA2NDEwODU1MH0.PFS_kEn6jjX5gwQoDN1YxR9fqfl_3e4aeLiOCYYESLk'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define photo categories
const categories = [
  { id: 'all', name: 'All Photos' },
  { id: 'portrait', name: 'Portraits' },
  { id: 'landscape', name: 'Landscapes' },
  { id: 'event', name: 'Events' },
  { id: 'wedding', name: 'Weddings' },
  { id: 'commercial', name: 'Commercial' }
]

// Sample gallery data (replace with Supabase data later)
const sampleGallery = [
  {
    id: 1,
    title: 'Urban Portrait',
    category: 'portrait',
    imageUrl: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg',
    description: 'Urban portrait photography in downtown Houston'
  },
  {
    id: 2,
    title: 'Mountain Landscape',
    category: 'landscape',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    description: 'Beautiful mountain landscape at sunset'
  },
  {
    id: 3,
    title: 'Corporate Event',
    category: 'event',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    description: 'Corporate event photography for tech conference'
  },
  {
    id: 4,
    title: 'Wedding Ceremony',
    category: 'wedding',
    imageUrl: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
    description: 'Beautiful wedding ceremony at the beach'
  },
  {
    id: 5,
    title: 'Product Photography',
    category: 'commercial',
    imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
    description: 'Professional product photography for marketing'
  },
  {
    id: 6,
    title: 'Family Portrait',
    category: 'portrait',
    imageUrl: 'https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg',
    description: 'Family portrait session at the park'
  },
  {
    id: 7,
    title: 'Cityscape',
    category: 'landscape',
    imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    description: 'Houston cityscape at night'
  },
  {
    id: 8,
    title: 'Birthday Party',
    category: 'event',
    imageUrl: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
    description: 'Birthday party photography'
  },
  {
    id: 9,
    title: 'Wedding Reception',
    category: 'wedding',
    imageUrl: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg',
    description: 'Elegant wedding reception photography'
  },
  {
    id: 10,
    title: 'Fashion Photography',
    category: 'commercial',
    imageUrl: 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg',
    description: 'Fashion photography for clothing brand'
  },
  {
    id: 11,
    title: 'Couple Portrait',
    category: 'portrait',
    imageUrl: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg',
    description: 'Romantic couple portrait session'
  },
  {
    id: 12,
    title: 'Beach Sunset',
    category: 'landscape',
    imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
    description: 'Beautiful beach sunset landscape'
  }
]

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [photos, setPhotos] = useState(sampleGallery)
  const [filteredPhotos, setFilteredPhotos] = useState(sampleGallery)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [loading, setLoading] = useState(true)

  // Filter photos when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos)
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === selectedCategory))
    }
    setLoading(false)
  }, [selectedCategory, photos])

  // In the future, fetch photos from Supabase
  // useEffect(() => {
  //   const fetchPhotos = async () => {
  //     setLoading(true)
  //     const { data, error } = await supabase
  //       .from('photos')
  //       .select('*')
  //     
  //     if (error) {
  //       console.error('Error fetching photos:', error)
  //     } else {
  //       setPhotos(data)
  //       if (selectedCategory === 'all') {
  //         setFilteredPhotos(data)
  //       } else {
  //         setFilteredPhotos(data.filter(photo => photo.category === selectedCategory))
  //       }
  //     }
  //     setLoading(false)
  //   }
  //   
  //   fetchPhotos()
  // }, [])

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo)
    document.body.style.overflow = 'hidden'
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Photo Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our collection of professional photography showcasing our best work across various categories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map(photo => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => openPhotoModal(photo)}
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                    <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold">{photo.title}</h3>
                      <p className="text-sm opacity-90">{photo.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="relative max-w-6xl w-full">
              <button
                onClick={closePhotoModal}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="relative h-[80vh]">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedPhoto.title}</h3>
                  <p className="text-gray-600 mt-2">{selectedPhoto.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-amber-100 to-amber-200 p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Love what you see?</h2>
          <p className="text-xl text-gray-700 mb-6">
            Book a photography session with us today and create your own stunning memories.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-amber-500 text-white font-semibold rounded-full shadow-lg hover:bg-amber-600 transition-all transform hover:scale-105"
          >
            Book a Session
          </a>
        </div>
      </div>
    </PageTransition>
  )
}

export default GalleryPage
