import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useAuth } from '../context/AuthContext'
import { useGallery } from '../context/GalleryContext'
import { useBooking } from '../context/BookingContext'

const DashboardPage = () => {
  const { user } = useAuth()
  const { userAlbums, fetchUserAlbums } = useGallery()
  const { userBookings, fetchUserBookings } = useBooking()
  
  useEffect(() => {
    if (user) {
      fetchUserAlbums(user.id)
      fetchUserBookings(user.id)
    }
  }, [user, fetchUserAlbums, fetchUserBookings])
  
  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.user_metadata?.full_name || 'Client'}</h1>
                <p className="text-gray-600">
                  Manage your photo albums and booking requests
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link to="/booking" className="btn btn-primary">
                  Book New Session
                </Link>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Albums */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Your Photo Albums</h2>
                    <Link to="/my-albums" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  {userAlbums.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {userAlbums.map(album => (
                        <Link 
                          key={album.id} 
                          to={`/my-albums/${album.id}`}
                          className="group"
                        >
                          <div className="overflow-hidden rounded-lg shadow-sm bg-white border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="relative h-40 overflow-hidden">
                              <img 
                                src={album.cover_image} 
                                alt={album.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-medium">{album.title}</h3>
                                <p className="text-gray-200 text-sm">{album.photo_count} photos</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Albums Yet</h3>
                      <p className="text-gray-600 mb-4">
                        Your photo albums will appear here after your photoshoot.
                      </p>
                      <Link to="/booking" className="btn btn-primary">
                        Book a Session
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Upcoming Bookings */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Upcoming Bookings</h2>
                    <Link to="/my-bookings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  {userBookings.length > 0 ? (
                    <div className="space-y-4">
                      {userBookings.map(booking => (
                        <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {booking.package_id.charAt(0).toUpperCase() + booking.package_id.slice(1)} Session
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                              <p className="text-gray-600 text-sm mt-1">
                                {booking.location}
                              </p>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Yet</h3>
                      <p className="text-gray-600 mb-4">
                        You don't have any upcoming photography sessions.
                      </p>
                      <Link to="/booking" className="btn btn-primary">
                        Book a Session
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Quick Links</h2>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-2">
                    <li>
                      <Link to="/gallery" className="flex items-center text-gray-700 hover:text-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Browse Gallery
                      </Link>
                    </li>
                    <li>
                      <Link to="/pricing" className="flex items-center text-gray-700 hover:text-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        View Pricing
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="flex items-center text-gray-700 hover:text-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default DashboardPage
