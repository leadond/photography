import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'
import SectionTitle from '../components/SectionTitle'
import AlbumCard from '../components/AlbumCard'
import { useAuth } from '../context/AuthContext'
import { useGallery } from '../context/GalleryContext'

const MyAlbumsPage = () => {
  const { user } = useAuth()
  const { userAlbums, fetchUserAlbums, loading } = useGallery()
  
  useEffect(() => {
    if (user) {
      fetchUserAlbums(user.id)
    }
  }, [user, fetchUserAlbums])
  
  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="My Photo Albums"
            subtitle="Access your personal photo collections from DXM Productions"
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : userAlbums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {userAlbums.map((album, index) => (
                <AlbumCard key={album.id} album={album} index={index} userAlbum={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md mt-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Albums Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                You don't have any photo albums yet. After your photoshoot, your albums will appear here for easy access.
              </p>
              <a href="/booking" className="btn btn-primary">
                Book a Photography Session
              </a>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default MyAlbumsPage
