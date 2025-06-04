import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function AdminAlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    fetchAlbums()
  }, [sortBy, sortOrder])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('albums')
        .select(`
          *,
          profiles:user_id (full_name, email)
        `)
        .order(sortBy, { ascending: sortOrder === 'asc' })
      
      const { data, error } = await query
      
      if (error) throw error
      setAlbums(data || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
      toast.error('Failed to load albums')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const filteredAlbums = albums.filter(album => {
    const searchLower = searchTerm.toLowerCase()
    return (
      album.title.toLowerCase().includes(searchLower) ||
      (album.profiles?.full_name && album.profiles.full_name.toLowerCase().includes(searchLower)) ||
      (album.profiles?.email && album.profiles.email.toLowerCase().includes(searchLower))
    )
  })

  const deleteAlbum = async (id) => {
    if (!window.confirm('Are you sure you want to delete this album? This action cannot be undone.')) {
      return
    }
    
    try {
      setLoading(true)
      
      const { error } = await supabase
        .from('albums')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Album deleted successfully')
      fetchAlbums()
    } catch (error) {
      console.error('Error deleting album:', error)
      toast.error('Failed to delete album')
    } finally {
      setLoading(false)
    }
  }

  if (loading && albums.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
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
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Photo Albums</h1>
            <Link
              to="/admin/albums/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <i className="fas fa-plus mr-2"></i> New Album
            </Link>
          </div>
          
          {/* Search and filters */}
          <div className="mt-4 bg-white shadow rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="w-full md:w-1/3">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search albums or clients"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              
              <div className="mt-3 md:mt-0 flex items-center space-x-4">
                <span className="text-sm text-gray-500">Sort by:</span>
                <button
                  onClick={() => handleSort('created_at')}
                  className={`text-sm ${sortBy === 'created_at' ? 'font-medium text-primary-600' : 'text-gray-500'}`}
                >
                  Date {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                  onClick={() => handleSort('title')}
                  className={`text-sm ${sortBy === 'title' ? 'font-medium text-primary-600' : 'text-gray-500'}`}
                >
                  Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                  onClick={() => handleSort('photo_count')}
                  className={`text-sm ${sortBy === 'photo_count' ? 'font-medium text-primary-600' : 'text-gray-500'}`}
                >
                  Photos {sortBy === 'photo_count' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Albums list */}
          <div className="mt-6">
            {filteredAlbums.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredAlbums.map((album) => (
                    <li key={album.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                              {album.cover_image ? (
                                <img 
                                  src={album.cover_image} 
                                  alt={album.title} 
                                  className="h-16 w-16 object-cover"
                                />
                              ) : (
                                <div className="h-16 w-16 flex items-center justify-center">
                                  <i className="fas fa-images text-gray-400 text-2xl"></i>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900">{album.title}</h3>
                              <p className="text-sm text-gray-500">
                                Client: {album.profiles?.full_name || album.profiles?.email || 'Unknown'}
                              </p>
                              <p className="text-sm text-gray-500">
                                Created: {new Date(album.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              {album.photo_count || 0} photos
                            </span>
                            <Link
                              to={`/admin/albums/${album.id}`}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Manage
                            </Link>
                            <button
                              onClick={() => deleteAlbum(album.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <p className="text-gray-500">
                    {searchTerm ? 'No albums match your search criteria.' : 'No albums found.'}
                  </p>
                  <Link
                    to="/admin/albums/new"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Create New Album
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminAlbumsPage
