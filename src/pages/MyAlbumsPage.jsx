import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const MyAlbumsPage = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user albums
  useEffect(() => {
    const fetchUserAlbums = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // This would be replaced with actual Supabase query
        // For now, using mock data
        setAlbums(mockUserAlbums);
        
        // Example of how the actual query would look:
        // const { data, error } = await supabase
        //   .from('user_albums')
        //   .select('*, albums(*)')
        //   .eq('user_id', user.id)
        //   .order('created_at', { ascending: false });
        
        // if (error) throw error;
        // setAlbums(data.map(item => item.albums));
        
      } catch (error) {
        console.error('Error fetching user albums:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAlbums();
  }, [user]);

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Albums</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Access your personal photo collections and shared albums.
          </p>
        </div>
      </div>

      {/* Albums Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : albums.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album, index) => (
                <AlbumCard key={album.id} album={album} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Albums Yet</h2>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      You don't have any photo albums yet. Book a photography session to get started.
    </p>
    <Link 
      to="/booking" 
      className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors inline-block"
    >
      Book a Session
    </Link>
  </div>
);

// Album Card Component
const AlbumCard = ({ album, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={album.coverImage} 
          alt={album.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{album.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            album.status === 'shared' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {album.status === 'shared' ? 'Shared' : 'Private'}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-3">{album.date} • {album.photoCount} Photos</p>
        <p className="text-gray-600 mb-4">{album.description}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/gallery/${album.id}`} 
            className="text-blue-500 font-medium hover:text-blue-700 transition-colors"
          >
            View Album →
          </Link>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Mock data for user albums
const mockUserAlbums = [
  {
    id: "wedding-sarah-michael",
    title: "Our Wedding Photos",
    description: "Professional photos from our special day",
    date: "June 15, 2023",
    photoCount: 120,
    status: "shared",
    coverImage: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "family-portraits-2023",
    title: "Family Portraits 2023",
    description: "Annual family photo session",
    date: "October 8, 2023",
    photoCount: 45,
    status: "private",
    coverImage: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "graduation-emma",
    title: "Emma's Graduation",
    description: "University graduation ceremony and celebration",
    date: "May 20, 2023",
    photoCount: 78,
    status: "shared",
    coverImage: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default MyAlbumsPage;
