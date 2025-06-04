import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SectionTitle from '../components/SectionTitle'
import { useGallery, Photo, Album } from '../context/GalleryContext'

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { albums, fetchAlbumPhotos } = useGallery()
  
  const [album, setAlbum] = useState<Album | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  
  useEffect(() => {
    const loadAlbum = async () => {
      if (!albumId) return
      
      setLoading(true)
      
      // Find album details
      const foundAlbum = albums.find(a => a.id === albumId) || null
      setAlbum(foundAlbum)
      
      // Fetch album photos
      if (foundAlbum) {
        const albumPhotos = await fetchAlbumPhotos(albumId)
        setPhotos(albumPhotos)
      }
      
      setLoading(false)
    }
    
    loadAlbum()
  }, [albumId, albums, fetchAlbumPhotos])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (!album) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Album Not Found</h2>
        <p className="mb-8">The album you're looking for doesn't exist or has been removed.</p>
        <Link to="/gallery" className="btn btn-primary">
          Back to Gallery
        </Link>
      </div>
    )
  }
  
  return (
    <PageTransition>
      {/* Album Header */}
      <div 
        className="relative h-[40vh] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${album.cover_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link to="/gallery" className="text-white mb-4 inline-flex items-center hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Gallery
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{album.title}</h1>
          <p className="text-gray-200 mt-2">{album.photo_count} photos • {new Date(album.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Album Description */}
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-700 max-w-3xl">{album.description}</p>
      </div>
      
      {/* Photos Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.title} 
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
              <h3 className="text-white font-medium text-lg">{selectedPhoto.title}</h3>
              <p className="text-gray-300 text-sm">{selectedPhoto.category}</p>
            </div>
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPhoto(null)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Related Albums */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="You Might Also Like"
            subtitle="Explore more of our photography collections"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {albums
              .filter(a => a.id !== albumId)
              .slice(0, 3)
              .map((album, index) => (
                <Link 
                  key={album.id} 
                  to={`/gallery/${album.id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg shadow-md bg-white">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={album.cover_image} 
                        alt={album.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium text-lg">{album.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default AlbumPage
