import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function UserAlbums() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchUserAlbums()
  }, [searchQuery])

  const fetchUserAlbums = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('User not authenticated')
      
      let query = supabase
        .from('albums')
        .select('*, photos(count)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      
      // Process the data to get photo counts
      const processedAlbums = data.map(album => ({
        ...album,
        photoCount: album.photos[0]?.count || 0
      }))
      
      setAlbums(processedAlbums)
    } catch (error) {
      console.error('Error fetching albums:', error)
      toast.error('Failed to load your albums')
    } finally {
      setLoading(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Albums</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative rounded-md shadow-sm max-w-md">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Search albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>
      
      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Empty State */}
      {!loading && albums.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <i className="fas fa-photo-album text-gray-400 text-5xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900">No albums found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery 
              ? "No albums match your search. Try a different search term." 
              : "You don't have any albums yet. Contact us to create albums for your sessions."}
          </p>
        </div>
      )}
      
      {/* Albums Grid */}
      {!loading && albums.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {albums.map((album) => (
            <motion.div 
              key={album.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <Link to={`/user/albums/${album.id}`} className="block">
                <div className="h-48 bg-gray-200 relative">
                  {album.cover_url ? (
                    <img 
                      src={album.cover_url} 
                      alt={album.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <i className="fas fa-images text-gray-400 text-4xl"></i>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-white font-medium truncate">{album.name}</h2>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        {album.photoCount} {album.photoCount === 1 ? 'photo' : 'photos'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(album.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {album.is_shared && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <i className="fas fa-share-alt mr-1"></i>
                          Shared
                        </span>
                      )}
                      {album.is_favorite && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          <i className="fas fa-star mr-1"></i>
                          Favorite
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {album.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{album.description}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default UserAlbums
