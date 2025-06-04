import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function SharedAlbum() {
  const { albumId } = useParams()
  const navigate = useNavigate()
  
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'slideshow'
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const photosPerPage = 20

  useEffect(() => {
    fetchAlbumDetails()
    fetchPhotos()
  }, [albumId, page, searchQuery])

  const fetchAlbumDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('id', albumId)
        .eq('is_shared', true)
        .single()
      
      if (error) throw error
      
      if (!data) {
        toast.error('Shared album not found or no longer available')
        navigate('/')
        return
      }
      
      setAlbum(data)
    } catch (error) {
      console.error('Error fetching shared album details:', error)
      toast.error('Failed to load shared album')
      navigate('/')
    }
  }

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('photos')
        .select('*', { count: 'exact' })
        .eq('album_id', albumId)
        .order('created_at', { ascending: false })
      
      if (searchQuery) {
        query = query.ilike('caption', `%${searchQuery}%`)
      }
      
      // Apply pagination
      const from = (page - 1) * photosPerPage
      const to = from + photosPerPage - 1
      
      const { data, count, error } = await query.range(from, to)
      
      if (error) throw error
      
      setPhotos(data || [])
      setTotalPages(Math.ceil((count || 0) / photosPerPage))
    } catch (error) {
      console.error('Error fetching photos:', error)
      toast.error('Failed to load photos')
    } finally {
      setLoading(false)
    }
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  if (!album && !loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Shared album not found</h2>
        <p className="mt-2 text-gray-500">This album may no longer be shared or doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Album Header */}
      {album && (
        <div className="relative h-64 bg-gray-800">
          {album.cover_url ? (
            <img 
              src={album.cover_url} 
              alt={album.name} 
              className="w-full h-full object-cover opacity-70"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <i className="fas fa-images text-gray-600 text-6xl"></i>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-white">{album.name}</h1>
                <p className="text-gray-300 mt-1">
                  {photos.length} {photos.length === 1 ? 'photo' : 'photos'} • 
                  Shared Album
                </p>
                {album.description && (
                  <p className="text-gray-300 mt-2 max-w-2xl">{album.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Controls Bar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
            
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="Grid view"
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                onClick={() => setViewMode('slideshow')}
                className={`px-3 py-1 ${
                  viewMode === 'slideshow' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="Slideshow view"
              >
                <i className="fas fa-play"></i>
              </button>
            </div>
          </div>
          
          <div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center h-64 p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Empty State */}
      {!loading && photos.length === 0 && (
        <div className="text-center py-12 p-6">
          <i className="fas fa-images text-gray-400 text-5xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900">No photos found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery 
              ? "No photos match your search. Try a different search term." 
              : "This album doesn't have any photos yet."}
          </p>
        </div>
      )}
      
      {/* Grid View */}
      {!loading && photos.length > 0 && viewMode === 'grid' && (
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <div className="text-sm text-gray-500">
              Showing {photos.length} of {totalPages * photosPerPage} photos
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {photos.map((photo, index) => (
              <motion.div 
                key={photo.id} 
                className="relative group"
                variants={itemVariants}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={photo.thumbnail_url || photo.url}
                    alt={photo.caption || 'Photo'}
                    className="w-full h-40 object-cover cursor-pointer"
                    onClick={() => {
                      setCurrentPhotoIndex(index)
                      setViewMode('slideshow')
                    }}
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                    <div className="hidden group-hover:flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentPhotoIndex(index)
                          setViewMode('slideshow')
                        }}
                        className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                        title="View full size"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <a
                        href={photo.url}
                        download={photo.filename || 'photo.jpg'}
                        className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                        title="Download"
                      >
                        <i className="fas fa-download"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                {photo.caption && (
                  <p className="mt-1 text-xs text-gray-600 truncate" title={photo.caption}>
                    {photo.caption}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    page === 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === i + 1
                        ? 'z-10 bg-primary text-white border-primary'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    page === totalPages 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          )}
        </div>
      )}
      
      {/* Slideshow View */}
      {!loading && photos.length > 0 && viewMode === 'slideshow' && (
        <div className="relative bg-black h-[calc(100vh-20rem)] flex items-center justify-center">
          {/* Current Photo */}
          <div className="relative max-h-full max-w-full">
            <img
              src={photos[currentPhotoIndex]?.url}
              alt={photos[currentPhotoIndex]?.caption || 'Photo'}
              className="max-h-full max-w-full object-contain"
            />
            
            {/* Caption */}
            {photos[currentPhotoIndex]?.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p>{photos[currentPhotoIndex].caption}</p>
              </div>
            )}
          </div>
          
          {/* Navigation Controls */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            <i className="fas fa-chevron-left text-2xl"></i>
          </button>
          
          <button
            onClick={nextPhoto}
            className="absolute right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            <i className="fas fa-chevron-right text-2xl"></i>
          </button>
          
          {/* Close Button */}
          <button
            onClick={() => setViewMode('grid')}
            className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          
          {/* Photo Actions */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <a
              href={photos[currentPhotoIndex].url}
              download={photos[currentPhotoIndex].filename || 'photo.jpg'}
              className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              title="Download"
            >
              <i className="fas fa-download"></i>
            </a>
          </div>
          
          {/* Photo Counter */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentPhotoIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  )
}

export default SharedAlbum
