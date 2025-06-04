import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

function DashboardPage() {
  const { user, userProfile } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (user) {
          // Fetch user appointments
          const { data: appointmentsData, error: appointmentsError } = await supabase
            .from('appointments')
            .select(`
              *,
              packages (name, price, image_url)
            `)
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .limit(3)

          if (appointmentsError) {
            console.error('Error fetching appointments:', appointmentsError)
          } else {
            setAppointments(appointmentsData || [])
          }

          // Fetch user albums
          const { data: albumsData, error: albumsError } = await supabase
            .from('albums')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(3)

          if (albumsError) {
            console.error('Error fetching albums:', albumsError)
          } else {
            setAlbums(albumsData || [])
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Welcome section */}
        <div className="py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Welcome back, {userProfile?.full_name || user?.email}!
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your photography sessions, view your appointments, and access your photos.
              </p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <i className="fas fa-calendar-alt h-6 w-6 text-primary-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Appointments</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{appointments.filter(a => new Date(a.date) > new Date()).length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/my-bookings" className="font-medium text-primary-600 hover:text-primary-500">
                  View all<span className="sr-only"> appointments</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <i className="fas fa-images h-6 w-6 text-primary-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Photo Albums</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {albums.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/my-albums" className="font-medium text-primary-600 hover:text-primary-500">
                  View all<span className="sr-only"> albums</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <i className="fas fa-credit-card h-6 w-6 text-primary-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Payment Status</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {appointments.filter(a => a.payment_status === 'paid').length}/{appointments.length} Paid
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/my-bookings" className="font-medium text-primary-600 hover:text-primary-500">
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent appointments */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Appointments</h2>
            <Link to="/my-bookings" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          </div>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <li key={appointment.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                            <i className="fas fa-camera text-gray-500"></i>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-primary-600">{appointment.service_type.charAt(0).toUpperCase() + appointment.service_type.slice(1)} Session</p>
                            <p className="text-sm text-gray-500">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'cancelled' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-map-marker-alt flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"></i>
                            {appointment.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            ${appointment.packages?.price || '0'} · 
                            <span className={`ml-1 ${
                              appointment.payment_status === 'paid' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {appointment.payment_status.charAt(0).toUpperCase() + appointment.payment_status.slice(1)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                  <p>You don't have any appointments yet.</p>
                  <Link to="/booking" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Book your first session
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Recent albums */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Albums</h2>
            <Link to="/my-albums" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.length > 0 ? (
              albums.map((album) => (
                <div key={album.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {album.cover_image ? (
                      <img 
                        src={album.cover_image} 
                        alt={album.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="fas fa-images text-4xl text-gray-400"></i>
                    )}
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{album.title}</h3>
                    <p className="text-sm text-gray-500">{album.photo_count || 0} photos</p>
                    <div className="mt-4">
                      <Link 
                        to={`/my-albums/${album.id}`}
                        className="text-sm font-medium text-primary-600 hover:text-primary-500"
                      >
                        View Album <i className="fas fa-arrow-right ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <p className="text-gray-500">You don't have any albums yet.</p>
                  <p className="text-gray-500 mt-2">Albums will appear here after your photo sessions are completed.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Book a session CTA */}
        <div className="mt-8 bg-primary-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6 md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-white">Ready for your next photo session?</h3>
              <div className="mt-2 max-w-xl text-sm text-primary-100">
                <p>Book your next photography session with us and capture your special moments.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:ml-6">
              <Link
                to="/booking"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardPage
