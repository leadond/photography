import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function AlbumDetail() {
  const { albumId } = useParams()
  const navigate = useNavigate()
  
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPhotos, setSelectedPhotos] = useState([])
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
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('User not authenticated')
      
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('id', albumId)
        .eq('user_id', user.id)
        .single()
      
      if (error) throw error
      
      if (!data) {
        toast.error('Album not found or you do not have access')
        navigate('/user/albums')
        return
      }
      
      setAlbum(data)
    } catch (error) {
      console.error('Error fetching album details:', error)
      toast.error('Failed to load album details')
      navigate('/user/albums')
    }
  }

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('User not authenticated')
      
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

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => {
      if (prev.includes(photoId)) {
        return prev.filter(id => id !== photoId)
      } else {
        return [...prev, photoId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedPhotos.length === photos.length) {
      setSelectedPhotos([])
    } else {
      setSelectedPhotos(photos.map(photo => photo.id))
    }
  }

  const handleToggleFavorite = async (photoId, currentValue) => {
    try {
      const { error } = await supabase
        .from('photos')
        .update({ is_favorite: !currentValue })
        .eq('id', photoId)
      
      if (error) throw error
      
      // Update local state
      setPhotos(photos.map(photo => 
        photo.id === photoId 
          ? { ...photo, is_favorite: !currentValue } 
          : photo
      ))
      
      toast.success(currentValue ? 'Removed from favorites' : 'Added to favorites')
    } catch (error) {
      console.error('Error updating favorite status:', error)
      toast.error('Failed to update favorite status')
    }
  }

  const handleDownloadSelected = async () => {
    if (selectedPhotos.length === 0) return
    
    try {
      // In a real app, you might want to create a zip file on the server
      // For this example, we'll just download the first selected photo
      const selectedPhoto = photos.find(photo => photo.id === selectedPhotos[0])
      
      if (selectedPhoto) {
        const link = document.createElement('a')
        link.href = selectedPhoto.url
        link.download = selectedPhoto.filename || 'photo.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        toast.success('Download started')
      }
    } catch (error) {
      console.error('Error downloading photos:', error)
      toast.error('Failed to download photos')
    }
  }

  const handleShareAlbum = async () => {
    try {
      // Toggle the shared status
      const newSharedStatus = !album.is_shared
      
      const { error } = await supabase
        .from('albums')
        .update({ is_shared: newSharedStatus })
        .eq('id', albumId)
      
      if (error) throw error
      
      setAlbum({ ...album, is_shared: newSharedStatus })
      
      if (newSharedStatus) {
        // Generate a shareable link (in a real app, this would be a proper sharing mechanism)
        const shareableLink = `${window.location.origin}/shared/albums/${albumId}`
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareableLink)
          .then(() => {
            toast.success('Shareable link copied to clipboard')
          })
          .catch(() => {
            toast.error('Failed to copy link to clipboard')
          })
      } else {
        toast.success('Album sharing disabled')
      }
    } catch (error) {
      console.error('Error sharing album:', error)
      toast.error('Failed to share album')
    }
  }

  const handleToggleAlbumFavorite = async () => {
    try {
      const newFavoriteStatus = !album.is_favorite
      
      const { error } = await supabase
        .from('albums')
        .update({ is_favorite: newFavoriteStatus })
        .eq('id', albumId)
      
      if (error) throw error
      
      setAlbum({ ...album, is_favorite: newFavoriteStatus })
      
      toast.success(newFavoriteStatus ? 'Album added to favorites' : 'Album removed from favorites')
    } catch (error) {
      console.error('Error updating album favorite status:', error)
      toast.error('Failed to update album favorite status')
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
        <h2 className="text-xl font-medium text-gray-900">Album not found</h2>
        <p className="mt-2 text-gray-500">The album you're looking for doesn't exist or you don't have access to it.</p>
        <button
          onClick={() => navigate('/user/albums')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Back to Albums
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
                  Created {new Date(album.created_at).toLocaleDateString()}
                </p>
                {album.description && (
                  <p className="text-gray-300 mt-2 max-w-2xl">{album.description}</p>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleToggleAlbumFavorite}
                  className={`p-2 rounded-full ${
                    album.is_favorite 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-white text-gray-800 hover:text-yellow-500'
                  }`}
                  title={album.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <i className="fas fa-star"></i>
                </button>
                
                <button
                  onClick={handleShareAlbum}
                  className={`p-2 rounded-full ${
                    album.is_shared 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-800 hover:text-green-500'
                  }`}
                  title={album.is_shared ? 'Disable sharing' : 'Share album'}
                >
                  <i className="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Controls Bar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
          
          {selectedPhotos.length > 0 && (
            <div className="flex space-x-2">
              <button
                onClick={handleDownloadSelected}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <i className="fas fa-download mr-2"></i>
                Download ({selectedPhotos.length})
              </button>
              
              <button
                onClick={() => setSelectedPhotos([])}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <i className="fas fa-times mr-2"></i>
                Clear Selection
              </button>
            </div>
          )}
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
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="select-all"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={selectedPhotos.length === photos.length && photos.length > 0}
                onChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="ml-2 text-sm text-gray-700">
                Select All
              </label>
            </div>
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
                <div 
                  className={`relative rounded-lg overflow-hidden border-2 ${
                    selectedPhotos.includes(photo.id) ? 'border-primary' : 'border-transparent'
                  }`}
                >
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
                      <button
                        onClick={() => handleToggleFavorite(photo.id, photo.is_favorite)}
                        className={`p-2 bg-white rounded-full ${
                          photo.is_favorite ? 'text-yellow-500' : 'text-gray-800 hover:text-yellow-500'
                        }`}
                        title={photo.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <i className="fas fa-star"></i>
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
                  
                  {/* Selection checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={selectedPhotos.includes(photo.id)}
                      onChange={() => togglePhotoSelection(photo.id)}
                    />
                  </div>
                  
                  {/* Favorite indicator */}
                  {photo.is_favorite && (
                    <div className="absolute top-2 right-2">
                      <span className="text-yellow-500">
                        <i className="fas fa-star"></i>
                      </span>
                    </div>
                  )}
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
            <button
              onClick={() => handleToggleFavorite(photos[currentPhotoIndex].id, photos[currentPhotoIndex].is_favorite)}
              className={`p-2 rounded-full ${
                photos[currentPhotoIndex].is_favorite 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
              }`}
              title={photos[currentPhotoIndex].is_favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <i className="fas fa-star"></i>
            </button>
            
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

export default AlbumDetail
