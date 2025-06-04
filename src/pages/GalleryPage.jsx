import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Filter images when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeCategory));
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'event', name: 'Event' },
    { id: 'nature', name: 'Nature' },
    { id: 'commercial', name: 'Commercial' }
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Photography Gallery</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Browse through our collection of professional photographs across various categories.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredImages.map((image, index) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              index={index} 
              onClick={() => openLightbox(image)}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <div 
            className="max-w-4xl max-h-[90vh] relative"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-white mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Gallery Item Component with animation
const GalleryItem = ({ image, index, onClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image.url} 
          alt={image.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-semibold">{image.title}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Sample gallery data
const galleryImages = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Wedding Ceremony",
    description: "Capturing the beautiful moment of a couple exchanging vows.",
    category: "wedding"
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/1266007/pexels-photo-1266007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Professional Portrait",
    description: "Corporate headshot with natural lighting.",
    category: "portrait"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Corporate Event",
    description: "Annual company gathering with keynote speakers.",
    category: "event"
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Mountain Landscape",
    description: "Breathtaking view of mountains at sunset.",
    category: "nature"
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Urban Architecture",
    description: "Modern building with geometric patterns.",
    category: "commercial"
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Family Portrait",
    description: "Happy family enjoying a day at the park.",
    category: "portrait"
  },
  {
    id: 7,
    url: "https://images.pexels.com/photos/1719344/pexels-photo-1719344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Concert Photography",
    description: "Live music performance with dramatic lighting.",
    category: "event"
  },
  {
    id: 8,
    url: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Bridal Portrait",
    description: "Elegant bride in her wedding dress.",
    category: "wedding"
  },
  {
    id: 9,
    url: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Product Photography",
    description: "Professional product shot for e-commerce.",
    category: "commercial"
  },
  {
    id: 10,
    url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Forest Pathway",
    description: "Serene path through a misty forest.",
    category: "nature"
  },
  {
    id: 11,
    url: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Beach Wedding",
    description: "Romantic wedding ceremony by the ocean.",
    category: "wedding"
  },
  {
    id: 12,
    url: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Graduation Portrait",
    description: "Celebrating academic achievement.",
    category: "portrait"
  }
];

export default GalleryPage;
