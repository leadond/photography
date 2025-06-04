import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const MyBookingsPage = () => {
  const { user } = useAuth();
  const { bookings, isLoading, error, fetchUserBookings, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Fetch user bookings
  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user, fetchUserBookings]);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    
    if (activeTab === 'upcoming') {
      return bookingDate >= today && booking.status !== 'Cancelled';
    } else if (activeTab === 'past') {
      return bookingDate < today || booking.status === 'Completed';
    } else if (activeTab === 'cancelled') {
      return booking.status === 'Cancelled';
    }
    return true;
  });

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      try {
        await cancelBooking(bookingId);
        toast.success('Booking cancelled successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to cancel booking');
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Bookings</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your photography session bookings and appointments.
          </p>
        </div>
      </div>

      {/* Bookings Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <TabButton 
                label="Upcoming" 
                isActive={activeTab === 'upcoming'} 
                onClick={() => setActiveTab('upcoming')}
              />
              <TabButton 
                label="Past" 
                isActive={activeTab === 'past'} 
                onClick={() => setActiveTab('past')}
              />
              <TabButton 
                label="Cancelled" 
                isActive={activeTab === 'cancelled'} 
                onClick={() => setActiveTab('cancelled')}
              />
            </div>

            {/* Bookings List */}
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={() => fetchUserBookings()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredBookings.length === 0 ? (
              <EmptyState activeTab={activeTab} />
            ) : (
              <div className="space-y-6">
                {filteredBookings.map((booking, index) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    index={index}
                    onCancel={() => handleCancelBooking(booking.id)}
                    showCancelButton={activeTab === 'upcoming'}
                  />
                ))}
              </div>
            )}

            {/* Book New Session Button */}
            <div className="text-center mt-12">
              <Link 
                to="/booking" 
                className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors inline-block"
              >
                Book New Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`px-6 py-3 font-medium text-sm transition-colors ${
      isActive 
        ? 'text-blue-500 border-b-2 border-blue-500' 
        : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Empty State Component
const EmptyState = ({ activeTab }) => {
  let message = '';
  
  switch (activeTab) {
    case 'upcoming':
      message = "You don't have any upcoming bookings.";
      break;
    case 'past':
      message = "You don't have any past bookings.";
      break;
    case 'cancelled':
      message = "You don't have any cancelled bookings.";
      break;
    default:
      message = "No bookings found.";
  }
  
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">No Bookings</h2>
      <p className="text-gray-600 mb-6">
        {message}
      </p>
      {activeTab === 'upcoming' && (
        <Link 
          to="/booking" 
          className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors inline-block"
        >
          Book a Session
        </Link>
      )}
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ booking, index, onCancel, showCancelButton }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900 mr-3">{booking.service}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            <p className="text-gray-600 mb-1">
              <strong>Date:</strong> {formatDate(booking.date)}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Time:</strong> {booking.time}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {booking.location}
            </p>
            {booking.notes && (
              <p className="text-gray-600 mt-3 pt-3 border-t border-gray-100">
                <strong>Notes:</strong> {booking.notes}
              </p>
            )}
          </div>
          
          {showCancelButton && booking.status !== 'Cancelled' && (
            <button 
              onClick={onCancel}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors self-start"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyBookingsPage;
