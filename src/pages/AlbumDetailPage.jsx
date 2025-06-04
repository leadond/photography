import { useState, useEffect } from 'react'
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
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchAlbumData = async () => {
      setIsLoading(true)
      try {
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

        // Fetch user's favorites
        const { data: favoritesData, error: favoritesError } = await supabase
          .from('favorites')
          .select('photo_id')
          .eq('user_id', user.id)
          .eq('album_id', albumId)

        if (favoritesError) throw favoritesError
        setFavorites(favoritesData.map(fav => fav.photo_id) || [])
      } catch (error) {
        console.error('Error fetching album data:', error)
        setError('Failed to load album data')
      } finally {
        setIsLoading(false)
      }
    }

    if (user && albumId) {
      fetchAlbumData()
    }
  }, [user, albumId])

  const toggleFavorite = async (photoId) => {
    try {
      const isFavorite = favorites.includes(photoId)
      
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('photo_id', photoId)
          .eq('album_id', albumId)
          
        if (error) throw error
        
        setFavorites(favorites.filter(id => id !== photoId))
        toast.success('Removed from favorites')
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([
            { 
              user_id: user.id, 
              photo_id: photoId,
              album_id: albumId
            }
          ])
          
        if (error) throw error
        
        setFavorites([...favorites, photoId])
        toast.success('Added to favorites')
      }
    } catch (error) {
      console.error('Error updating favorites:', error)
      toast.error('Failed to update favorites')
    }
  }

  const downloadPhoto = (url, filename) => {
    // Create a temporary link element
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'photo.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Download started')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (error || !album) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error || 'Album not found or you do not have access to this album.'}
          </div>
          <Link to="/my-albums" className="text-amber-500 hover:text-amber-600">
            &larr; Back to My Albums
          </Link>
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
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/my-albums" className="text-amber-500 hover:text-amber-600 mb-4 inline-block">
            &larr; Back to My Albums
          </Link>
          <h1 className="text-3xl font-serif font-bold">{album.title}</h1>
          <p className="text-gray-600 mt-2">
            {new Date(album.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          {album.description && (
            <p className="text-gray-700 mt-4">{album.description}</p>
          )}
        </div>

        {/* Album Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-images text-amber-500"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Photos</p>
                <p className="text-xl font-medium">{photos.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-heart text-amber-500"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Favorites</p>
                <p className="text-xl font-medium">{favorites.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-download text-amber-500"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Downloads Available</p>
                <p className="text-xl font-medium">{album.download_limit || 'Unlimited'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative h-64">
                  <img 
                    src={photo.thumbnail_url || photo.url} 
                    alt={photo.caption || 'Photo'} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(photo.id)
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
                  >
                    <i className={`${favorites.includes(photo.id) ? 'fas' : 'far'} fa-heart ${favorites.includes(photo.id) ? 'text-red-500' : 'text-gray-600'}`}></i>
                  </button>
                </div>
                {photo.caption && (
                  <div className="p-3">
                    <p className="text-gray-700">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-images text-gray-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium mb-2">No Photos Available</h3>
            <p className="text-gray-600">This album doesn't have any photos yet. Check back later.</p>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">{selectedPhoto.caption || 'Photo'}</h3>
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="p-4 bg-gray-100 flex justify-center">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption || 'Photo'} 
                  className="max-h-[70vh] object-contain"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleFavorite(selectedPhoto.id)}
                    className="px-4 py-2 flex items-center rounded-md hover:bg-gray-100 transition"
                  >
                    <i className={`${favorites.includes(selectedPhoto.id) ? 'fas' : 'far'} fa-heart mr-2 ${favorites.includes(selectedPhoto.id) ? 'text-red-500' : 'text-gray-600'}`}></i>
                    {favorites.includes(selectedPhoto.id) ? 'Favorited' : 'Add to Favorites'}
                  </button>
                </div>
                <button 
                  onClick={() => downloadPhoto(selectedPhoto.url, selectedPhoto.filename || 'photo.jpg')}
                  className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition flex items-center"
                >
                  <i className="fas fa-download mr-2"></i> Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AlbumDetailPage
