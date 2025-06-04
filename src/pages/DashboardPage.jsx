import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const { user } = useAuth();
  const { bookings, fetchUserBookings } = useBooking();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Fetch bookings
        await fetchUserBookings();
        
        // Fetch albums (mock data for now)
        setAlbums(mockUserAlbums.slice(0, 3));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, fetchUserBookings]);

  // Get upcoming bookings
  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate >= today && booking.status !== 'Cancelled';
  }).slice(0, 3);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome Back{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}</h1>
              <p className="text-xl text-gray-300">
                Manage your photography sessions and albums
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                to="/booking" 
                className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
              >
                Book New Session
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Upcoming Bookings */}
              <DashboardSection 
                title="Upcoming Bookings" 
                viewAllLink="/my-bookings"
                emptyMessage="You don't have any upcoming bookings."
                actionLink="/booking"
                actionText="Book a Session"
                isEmpty={upcomingBookings.length === 0}
              >
                {upcomingBookings.map((booking, index) => (
                  <BookingCard key={booking.id} booking={booking} index={index} />
                ))}
              </DashboardSection>

              {/* Recent Albums */}
              <DashboardSection 
                title="Recent Albums" 
                viewAllLink="/my-albums"
                emptyMessage="You don't have any photo albums yet."
                actionLink="/booking"
                actionText="Book a Session"
                isEmpty={albums.length === 0}
                className="mt-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {albums.map((album, index) => (
                    <AlbumCard key={album.id} album={album} index={index} />
                  ))}
                </div>
              </DashboardSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileCard user={user} />
              <QuickLinks />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Dashboard Section Component
const DashboardSection = ({ title, viewAllLink, emptyMessage, actionLink, actionText, isEmpty, className, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className={`bg-white rounded-lg shadow-md p-6 ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {!isEmpty && (
          <Link 
            to={viewAllLink} 
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            View All
          </Link>
        )}
      </div>
      
      {isEmpty ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{emptyMessage}</p>
          <Link 
            to={actionLink} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {actionText}
          </Link>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

// Booking Card Component
const BookingCard = ({ booking, index }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{booking.service}</h3>
          <p className="text-gray-500">
            {formatDate(booking.date)} at {booking.time}
          </p>
          <p className="text-gray-500">Location: {booking.location}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {booking.status}
        </span>
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-100 flex justify-end">
        <Link 
          to="/my-bookings" 
          className="text-blue-500 hover:text-blue-700 transition-colors text-sm"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

// Album Card Component
const AlbumCard = ({ album, index }) => {
  return (
    <motion.div 
      className="overflow-hidden rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="h-32 overflow-hidden">
        <img 
          src={album.coverImage} 
          alt={album.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{album.title}</h3>
        <p className="text-gray-500 text-sm">{album.photoCount} Photos</p>
        <Link 
          to={`/gallery/${album.id}`} 
          className="text-blue-500 hover:text-blue-700 transition-colors text-sm mt-2 inline-block"
        >
          View Album
        </Link>
      </div>
    </motion.div>
  );
};

// Profile Card Component
const ProfileCard = ({ user }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden">
          {user.user_metadata?.avatar_url ? (
            <img 
              src={user.user_metadata.avatar_url} 
              alt={user.email} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-2xl font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {user.user_metadata?.name || user.email.split('@')[0]}
          </h3>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
      
      <Link 
        to="/profile" 
        className="w-full block text-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
      >
        Edit Profile
      </Link>
    </motion.div>
  );
};

// Quick Links Component
const QuickLinks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const links = [
    { to: '/booking', label: 'Book a Session', icon: '📅' },
    { to: '/my-bookings', label: 'Manage Bookings', icon: '📋' },
    { to: '/my-albums', label: 'View Albums', icon: '🖼️' },
    { to: '/gallery', label: 'Browse Gallery', icon: '🔍' },
    { to: '/contact', label: 'Contact Support', icon: '💬' }
  ];

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.to} 
              className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="mr-3 text-xl">{link.icon}</span>
              <span className="text-gray-700">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// Mock data for user albums
const mockUserAlbums = [
  {
    id: "wedding-sarah-michael",
    title: "Our Wedding Photos",
    photoCount: 120,
    coverImage: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "family-portraits-2023",
    title: "Family Portraits 2023",
    photoCount: 45,
    coverImage: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "graduation-emma",
    title: "Emma's Graduation",
    photoCount: 78,
    coverImage: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default DashboardPage;
