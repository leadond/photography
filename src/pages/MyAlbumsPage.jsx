import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function MyAlbumsPage() {
  const { user } = useAuth()
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlbums()
  }, [user])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAlbums(data || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
      toast.error('Failed to load your albums')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
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
      className="py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Photo Albums</h1>
        <p className="mt-2 text-sm text-gray-500">
          Access and download your photography sessions.
        </p>
        
        <div className="mt-6">
          {albums.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <div key={album.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 bg-gray-200">
                    {album.cover_image ? (
                      <img 
                        src={album.cover_image} 
                        alt={album.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fas fa-images text-4xl text-gray-400"></i>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="text-lg font-medium text-gray-900">{album.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(album.created_at).toLocaleDateString()}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {album.photo_count || 0} photos
                    </p>
                    <div className="mt-4 flex justify-between">
                      <Link 
                        to={`/my-albums/${album.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Album
                      </Link>
                      {album.download_url && (
                        <a 
                          href={album.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Download All
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-primary-100">
                  <i className="fas fa-images text-primary-600 text-3xl"></i>
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">No albums yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your photo albums will appear here after your photography sessions are completed.
                </p>
                <div className="mt-6">
                  <Link
                    to="/booking"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Book a Session
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MyAlbumsPage
