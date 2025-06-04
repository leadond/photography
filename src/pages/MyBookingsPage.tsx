import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SectionTitle from '../components/SectionTitle'
import { useAuth } from '../context/AuthContext'
import { useBooking, BookingRequest } from '../context/BookingContext'

const MyBookingsPage = () => {
  const { user } = useAuth()
  const { userBookings, fetchUserBookings, loading } = useBooking()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  
  useEffect(() => {
    if (user) {
      fetchUserBookings(user.id)
    }
  }, [user, fetchUserBookings])
  
  const upcomingBookings = userBookings.filter(booking => 
    new Date(booking.date) >= new Date() && 
    (booking.status === 'pending' || booking.status === 'confirmed')
  )
  
  const pastBookings = userBookings.filter(booking => 
    new Date(booking.date) < new Date() || 
    booking.status === 'completed' || 
    booking.status === 'cancelled'
  )
  
  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings
  
  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="My Bookings"
            subtitle="Manage your photography session bookings"
          />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-12">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'upcoming'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Bookings
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'past'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('past')}
              >
                Past Bookings
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : displayedBookings.length > 0 ? (
                <div className="space-y-6">
                  {displayedBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Bookings
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-8">
                    {activeTab === 'upcoming'
                      ? "You don't have any upcoming photography sessions scheduled."
                      : "You don't have any past photography sessions."}
                  </p>
                  {activeTab === 'upcoming' && (
                    <Link to="/booking" className="btn btn-primary">
                      Book a Session
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

interface BookingCardProps {
  booking: BookingRequest
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                {booking.package_id.charAt(0).toUpperCase() + booking.package_id.slice(1)} Photography Session
              </h3>
              <span className={`ml-3 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
              </span>
            </div>
            <p className="text-gray-600">
              {formatDate(booking.date)} at {booking.time}
            </p>
            <p className="text-gray-600 mt-1">
              Location: {booking.location}
            </p>
            {booking.notes && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Notes:</p>
                <p className="text-sm text-gray-600">{booking.notes}</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col md:items-end">
            <p className="text-sm text-gray-500">
              Booked on {new Date(booking.created_at || '').toLocaleDateString()}
            </p>
            
            {booking.status === 'confirmed' && (
              <div className="mt-4">
                <Link to="/contact" className="btn btn-secondary text-sm py-2">
                  Contact Photographer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBookingsPage
