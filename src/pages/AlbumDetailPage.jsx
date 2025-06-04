import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function AlbumDetailPage() {
  const { albumId } = useParams()
  const { user } = useAuth()
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    fetchAlbumDetails()
  }, [albumId, user])

  const fetchAlbumDetails = async () => {
    try {
      setLoading(true)
      
      // Fetch album details
      const { data: albumData, error: albumError } = await supabase
        .from('albums')
        .select('*')
        .eq('id', albumId)
        .eq('user_id', user.id)
        .single()

      if (albumError) throw albumError
      setAlbum(albumData)

      // Fetch photos in the album
      const { data: photosData, error: photosError } = await supabase
        .from('photos')
        .select('*')
        .eq('album_id', albumId)
        .order('created_at', { ascending: true })

      if (photosError) throw photosError
      setPhotos(photosData || [])
    } catch (error) {
      console.error('Error fetching album details:', error)
      toast.error('Failed to load album details')
    } finally {
      setLoading(false)
    }
  }

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo)
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
  }

  const downloadPhoto = (photo) => {
    // Create a temporary link to download the photo
    const link = document.createElement('a')
    link.href = photo.url
    link.download = photo.filename || 'photo.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!album) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Album not found</h3>
              <p className="mt-2 text-sm text-gray-500">
                The album you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <div className="mt-6">
                <Link
                  to="/my-albums"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back to Albums
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{album.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(album.created_at).toLocaleDateString()} • {photos.length} photos
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/my-albums"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Back to Albums
            </Link>
            {album.download_url && (
              <a
                href={album.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Download All
              </a>
            )}
          </div>
        </div>

        {album.description && (
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-700">{album.description}</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                  onClick={() => openPhotoModal(photo)}
                >
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    <img 
                      src={photo.url} 
                      alt={photo.caption || 'Photo'} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="text-white">
                        <i className="fas fa-search-plus text-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-500">No photos available in this album yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity" onClick={closePhotoModal}></div>

            <div className="inline-block align-bottom bg-transparent rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="relative">
                <button 
                  onClick={closePhotoModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
                
                <div className="flex justify-center items-center">
                  <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.caption || 'Photo'} 
                    className="max-h-[80vh] max-w-full object-contain"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      {selectedPhoto.caption && (
                        <p className="text-sm">{selectedPhoto.caption}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => downloadPhoto(selectedPhoto)}
                      className="bg-primary-600 hover:bg-primary-700 text-white py-1 px-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <i className="fas fa-download mr-1"></i> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default AlbumDetailPage
