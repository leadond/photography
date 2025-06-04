import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function AdminAlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('albums')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAlbums(data || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
      setError('Failed to load albums')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAlbum = async (id) => {
    if (!confirm('Are you sure you want to delete this album? This action cannot be undone.')) {
      return
    }

    try {
      // First delete all photos in the album
      const { error: photosError } = await supabase
        .from('photos')
        .delete()
        .eq('album_id', id)

      if (photosError) throw photosError

      // Then delete the album
      const { error: albumError } = await supabase
        .from('albums')
        .delete()
        .eq('id', id)

      if (albumError) throw albumError

      // Update local state
      setAlbums(albums.filter(album => album.id !== id))
      toast.success('Album deleted successfully')
    } catch (error) {
      console.error('Error deleting album:', error)
      toast.error('Failed to delete album')
    }
  }

  const filteredAlbums = albums.filter(album => {
    const matchesSearch = 
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (album.profiles?.first_name + ' ' + album.profiles?.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.profiles?.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'published') return matchesSearch && album.is_published
    if (filter === 'unpublished') return matchesSearch && !album.is_published
    
    return matchesSearch
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
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
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Manage Albums</h1>
        <Link 
          to="/admin/albums/new" 
          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition inline-flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Create New Album
        </Link>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search albums by title or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 whitespace-nowrap">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Albums</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>
      </div>

      {/* Albums Grid */}
      {filteredAlbums.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <div key={album.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {album.cover_image ? (
                  <img 
                    src={album.cover_image} 
                    alt={album.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-images text-gray-400 text-4xl"></i>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    album.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {album.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1">{album.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {album.profiles ? `${album.profiles.first_name} ${album.profiles.last_name}` : 'No client assigned'}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(album.created_at).toLocaleDateString()}</span>
                  <span>{album.photo_count || 0} photos</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link 
                    to={`/admin/albums/${album.id}`}
                    className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition text-sm"
                  >
                    Manage
                  </Link>
                  <button 
                    onClick={() => deleteAlbum(album.id)}
                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-images text-gray-400 text-xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-2">No Albums Found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? `No albums match your search for "${searchTerm}"`
              : 'There are no albums in the system yet.'}
          </p>
          <Link 
            to="/admin/albums/new" 
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition inline-block"
          >
            Create New Album
          </Link>
        </div>
      )}
    </motion.div>
  )
}

export default AdminAlbumsPage
