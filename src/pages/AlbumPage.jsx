import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function AlbumPage() {
  const { albumId } = useParams()
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  
  // Mock data - in a real app, this would come from an API
  const albums = {
    'graduation-2023': {
      title: 'Graduation 2023',
      description: 'Capturing the joy and achievement of graduation day with professional photography.',
      category: 'graduation',
      date: 'May 2023',
      photos: [
        { id: 1, url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Graduation ceremony' },
        { id: 2, url: 'https://images.pexels.com/photos/7944095/pexels-photo-7944095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Graduates celebrating' },
        { id: 3, url: 'https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Graduation cap toss' },
        { id: 4, url: 'https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Graduate with family' },
        { id: 5, url: 'https://images.pexels.com/photos/6147160/pexels-photo-6147160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Receiving diploma' },
        { id: 6, url: 'https://images.pexels.com/photos/6147276/pexels-photo-6147276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Graduate portrait' },
      ]
    },
    'corporate-headshots': {
      title: 'Corporate Headshots',
      description: 'Professional headshots for corporate professionals and business teams.',
      category: 'portrait',
      date: 'March 2023',
      photos: [
        { id: 1, url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Executive portrait' },
        { id: 2, url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Professional headshot' },
        { id: 3, url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Business portrait' },
        { id: 4, url: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Corporate headshot' },
        { id: 5, url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Professional portrait' },
        { id: 6, url: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Business headshot' },
      ]
    },
    // Add more albums as needed
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlbum(albums[albumId] || null)
      setLoading(false)
    }, 500)
  }, [albumId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!album) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Album Not Found</h1>
        <p className="mb-8">The album you're looking for doesn't exist or has been removed.</p>
        <Link to="/gallery" className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition">
          Back to Gallery
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Album Header */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="mb-2">
                <Link to="/gallery" className="text-gray-300 hover:text-white transition">
                  <i className="fas fa-arrow-left mr-2"></i> Back to Gallery
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{album.title}</h1>
              <p className="text-xl text-gray-300">{album.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-4">
                <div className="text-gray-300">
                  <span className="block">{album.category.charAt(0).toUpperCase() + album.category.slice(1)}</span>
                  <span className="block">{album.date}</span>
                </div>
                <div className="bg-accent text-white px-4 py-2 rounded-md">
                  {album.photos.length} Photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {album.photos.map(photo => (
              <div 
                key={photo.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full">
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
              onClick={() => setSelectedPhoto(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption} 
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="text-white text-center mt-4">
              <p className="text-xl">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default AlbumPage
