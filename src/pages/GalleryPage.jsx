import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'graduation', name: 'Graduation' },
    { id: 'portrait', name: 'Portraits' },
    { id: 'event', name: 'Events' },
    { id: 'fashion', name: 'Fashion' }
  ]
  
  const albums = [
    {
      id: 'graduation-2023',
      title: 'Graduation 2023',
      category: 'graduation',
      thumbnail: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 48
    },
    {
      id: 'corporate-headshots',
      title: 'Corporate Headshots',
      category: 'portrait',
      thumbnail: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 32
    },
    {
      id: 'tech-conference-2023',
      title: 'Tech Conference 2023',
      category: 'event',
      thumbnail: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 120
    },
    {
      id: 'summer-fashion',
      title: 'Summer Fashion Collection',
      category: 'fashion',
      thumbnail: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 64
    },
    {
      id: 'senior-portraits',
      title: 'Senior Portraits 2023',
      category: 'portrait',
      thumbnail: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 56
    },
    {
      id: 'prom-night',
      title: 'Prom Night 2023',
      category: 'event',
      thumbnail: 'https://images.pexels.com/photos/1154189/pexels-photo-1154189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 85
    },
    {
      id: 'business-conference',
      title: 'Business Conference',
      category: 'event',
      thumbnail: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 72
    },
    {
      id: 'winter-fashion',
      title: 'Winter Fashion Collection',
      category: 'fashion',
      thumbnail: 'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 42
    },
    {
      id: 'graduation-ceremony',
      title: 'University Graduation Ceremony',
      category: 'graduation',
      thumbnail: 'https://images.pexels.com/photos/7944095/pexels-photo-7944095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      photoCount: 110
    }
  ]
  
  const filteredAlbums = activeCategory === 'all' 
    ? albums 
    : albums.filter(album => album.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Photography Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto">Explore our diverse collection of professional photography across various categories.</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-accent text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                } transition`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Albums Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map(album => (
              <Link 
                to={`/gallery/${album.id}`} 
                key={album.id}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={album.thumbnail} 
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 group-hover:text-accent transition">{album.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{album.photoCount} photos</span>
                      <span className="text-accent">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default GalleryPage
