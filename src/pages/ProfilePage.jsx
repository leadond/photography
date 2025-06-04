import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateProfile, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  // Load user profile data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || '',
        address: user.user_metadata?.address || ''
      });
      
      // Fetch user bookings (mock data for now)
      setBookings(mockBookings);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error('Failed to sign out. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-16 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Profile</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your account and view your booking history.
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <ProfileSidebar 
                  user={user} 
                  handleSignOut={handleSignOut}
                />
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-2">
                {isEditing ? (
                  <ProfileEditForm 
                    profileData={profileData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    cancelEdit={() => setIsEditing(false)}
                  />
                ) : (
                  <ProfileInfo 
                    user={user}
                    profileData={profileData}
                    startEditing={() => setIsEditing(true)}
                  />
                )}
                
                <BookingHistory bookings={bookings} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Profile Sidebar Component
const ProfileSidebar = ({ user, handleSignOut }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
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
        <h3 className="text-xl font-semibold text-gray-900">
          {user.user_metadata?.name || user.email.split('@')[0]}
        </h3>
        <p className="text-gray-500">{user.email}</p>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#profile" className="block px-4 py-2 rounded-md bg-blue-50 text-blue-500 font-medium">
                Profile Information
              </a>
            </li>
            <li>
              <a href="#bookings" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                Booking History
              </a>
            </li>
            <li>
              <button 
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

// Profile Info Component
const ProfileInfo = ({ user, profileData, startEditing }) => {
  return (
    <motion.div 
      id="profile"
      className="bg-white rounded-lg shadow-md p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        <button 
          onClick={startEditing}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Edit Profile
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
          <p className="text-gray-900">{user.email}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
          <p className="text-gray-900">{profileData.name || 'Not provided'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
          <p className="text-gray-900">{profileData.phone || 'Not provided'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Address</h3>
          <p className="text-gray-900">{profileData.address || 'Not provided'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
          <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Profile Edit Form Component
const ProfileEditForm = ({ profileData, handleChange, handleSubmit, isLoading, cancelEdit }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
          <textarea
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Booking History Component
const BookingHistory = ({ bookings }) => {
  return (
    <motion.div 
      id="bookings"
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking History</h2>
      
      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div 
              key={booking.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                  <p className="text-gray-500">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </p>
                  <p className="text-gray-500">Location: {booking.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              
              {booking.notes && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{booking.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    service: 'Portrait Session',
    date: '2023-06-15',
    time: '10:00 AM',
    location: 'Studio',
    status: 'Completed',
    notes: 'Family portrait session with 5 people.'
  },
  {
    id: 2,
    service: 'Event Coverage',
    date: '2023-08-22',
    time: '3:00 PM',
    location: 'Client Location',
    status: 'Completed',
    notes: 'Corporate event photography for company anniversary.'
  },
  {
    id: 3,
    service: 'Wedding Photography',
    date: '2023-11-10',
    time: '12:00 PM',
    location: 'Outdoor',
    status: 'Upcoming',
    notes: 'Full day wedding coverage with second photographer.'
  }
];

export default ProfilePage;
