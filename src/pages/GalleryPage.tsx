import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import PhotoGrid from '../components/PhotoGrid'
import AlbumCard from '../components/AlbumCard'
import { useGallery } from '../context/GalleryContext'

const GalleryPage = () => {
  const { photos, albums, categories, loading, fetchPhotos } = useGallery()
  
  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero
        title="Our Photography Portfolio"
        subtitle="Browse through our diverse collection of professional photography work"
        backgroundImage="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1500"
        height="medium"
      />
      
      {/* Featured Albums Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Featured Albums"
            subtitle="Explore our curated collections of themed photoshoots"
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {albums.map((album, index) => (
                <AlbumCard key={album.id} album={album} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Photo Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Photo Gallery"
            subtitle="Filter through our diverse collection of professional photography"
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <PhotoGrid photos={photos} categories={categories} />
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to be featured in our next photoshoot?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Book a session with DXM Productions and let's create stunning images together.
          </p>
          <a href="/booking" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Book a Session
          </a>
        </div>
      </section>
    </PageTransition>
  )
}

export default GalleryPage
