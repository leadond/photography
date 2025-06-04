import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../components/LoadingSpinner';

const AlbumPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch album data
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // This would be replaced with actual Supabase query
        // For now, using mock data
        const foundAlbum = mockAlbums.find(a => a.id === albumId);
        
        if (!foundAlbum) {
          throw new Error('Album not found');
        }
        
        setAlbum(foundAlbum);
      } catch (error) {
        console.error('Error fetching album:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/gallery" 
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen pt-16 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Album Not Found</h2>
          <p className="text-gray-600 mb-6">The album you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/gallery" 
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Album Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{album.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {album.description}
          </p>
          <div className="mt-6 text-gray-400">
            <span>{album.date}</span>
            <span className="mx-2">•</span>
            <span>{album.location}</span>
            <span className="mx-2">•</span>
            <span>{album.images.length} Photos</span>
          </div>
        </div>
      </div>

      {/* Album Gallery */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {album.images.map((image, index) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              index={index} 
              onClick={() => openLightbox(image)}
            />
          ))}
        </motion.div>

        {/* Back to Gallery Link */}
        <div className="text-center mt-12">
          <Link 
            to="/gallery" 
            className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-500 hover:text-white transition-colors inline-block"
          >
            Back to Gallery
          </Link>
        </div>
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
              alt={selectedImage.caption || album.title} 
              className="max-w-full max-h-[80vh] object-contain"
            />
            {selectedImage.caption && (
              <div className="text-white mt-4">
                <p className="text-gray-300">{selectedImage.caption}</p>
              </div>
            )}
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
          alt={image.caption || 'Album photo'} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
          {image.caption && (
            <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p>{image.caption}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Mock data for albums
const mockAlbums = [
  {
    id: "wedding-sarah-michael",
    title: "Sarah & Michael's Wedding",
    description: "A beautiful summer wedding at Lakeside Gardens",
    date: "June 15, 2023",
    location: "Lakeside Gardens, New York",
    coverImage: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      {
        id: 1,
        url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "The bride and groom exchange vows"
      },
      {
        id: 2,
        url: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Bridal portrait"
      },
      {
        id: 3,
        url: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Ceremony by the lake"
      },
      {
        id: 4,
        url: "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "First dance"
      },
      {
        id: 5,
        url: "https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Wedding reception"
      },
      {
        id: 6,
        url: "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Cutting the cake"
      },
      {
        id: 7,
        url: "https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Wedding rings"
      },
      {
        id: 8,
        url: "https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Bride's bouquet"
      }
    ]
  },
  {
    id: "corporate-tech-summit",
    title: "Tech Summit 2023",
    description: "Annual technology conference and networking event",
    date: "September 22, 2023",
    location: "Metropolitan Convention Center",
    coverImage: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      {
        id: 1,
        url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Keynote presentation"
      },
      {
        id: 2,
        url: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Panel discussion"
      },
      {
        id: 3,
        url: "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Networking session"
      },
      {
        id: 4,
        url: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Product demonstration"
      },
      {
        id: 5,
        url: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Workshop session"
      },
      {
        id: 6,
        url: "https://images.pexels.com/photos/2182981/pexels-photo-2182981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Exhibition hall"
      }
    ]
  }
];

export default AlbumPage;
