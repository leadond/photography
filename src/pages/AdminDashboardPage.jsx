import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    totalAlbums: 0
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [recentAlbums, setRecentAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch total users
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      if (userError) throw userError

      // Fetch total appointments
      const { count: appointmentCount, error: appointmentError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
      
      if (appointmentError) throw appointmentError

      // Fetch pending appointments
      const { count: pendingCount, error: pendingError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
      
      if (pendingError) throw pendingError

      // Fetch total albums
      const { count: albumCount, error: albumError } = await supabase
        .from('albums')
        .select('*', { count: 'exact', head: true })
      
      if (albumError) throw albumError

      // Fetch recent appointments
      const { data: recentAppointmentsData, error: recentAppointmentsError } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles (full_name, email),
          packages (name, price)
        `)
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (recentAppointmentsError) throw recentAppointmentsError

      // Fetch recent albums
      const { data: recentAlbumsData, error: recentAlbumsError } = await supabase
        .from('albums')
        .select(`
          *,
          profiles:user_id (full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (recentAlbumsError) throw recentAlbumsError

      setStats({
        totalUsers: userCount || 0,
        totalAppointments: appointmentCount || 0,
        pendingAppointments: pendingCount || 0,
        totalAlbums: albumCount || 0
      })

      setRecentAppointments(recentAppointmentsData || [])
      setRecentAlbums(recentAlbumsData || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

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
    >
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Users */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                      <i className="fas fa-users h-6 w-6 text-primary-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{stats.totalUsers}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to="/admin/users" className="font-medium text-primary-600 hover:text-primary-500">
                      View all users
                    </Link>
                  </div>
                </div>
              </div>

              {/* Total Appointments */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                      <i className="fas fa-calendar-alt h-6 w-6 text-primary-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Appointments</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{stats.totalAppointments}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to="/admin/appointments" className="font-medium text-primary-600 hover:text-primary-500">
                      View all appointments
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pending Appointments */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                      <i className="fas fa-clock h-6 w-6 text-yellow-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Appointments</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{stats.pendingAppointments}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to="/admin/appointments?status=pending" className="font-medium text-primary-600 hover:text-primary-500">
                      View pending
                    </Link>
                  </div>
                </div>
              </div>

              {/* Total Albums */}
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
                          <div className="text-lg font-medium text-gray-900">{stats.totalAlbums}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to="/admin/albums" className="font-medium text-primary-600 hover:text-primary-500">
                      View all albums
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Appointments</h2>
              <Link to="/admin/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </div>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {recentAppointments.length > 0 ? (
                  recentAppointments.map((appointment) => (
                    <li key={appointment.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <i className="fas fa-user-circle text-gray-400 text-2xl"></i>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-primary-600">
                                {appointment.profiles?.full_name || appointment.profiles?.email || 'Unknown User'}
                              </p>
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
                              <i className="fas fa-tag flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"></i>
                              {appointment.packages?.name || 'No package'} - ${appointment.packages?.price || '0'}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p className={`${
                              appointment.payment_status === 'paid' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {appointment.payment_status.charAt(0).toUpperCase() + appointment.payment_status.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                    <p>No appointments found.</p>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Recent Albums */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Albums</h2>
              <Link to="/admin/albums" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </div>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {recentAlbums.length > 0 ? (
                  recentAlbums.map((album) => (
                    <li key={album.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                              {album.cover_image ? (
                                <img 
                                  src={album.cover_image} 
                                  alt={album.title} 
                                  className="h-12 w-12 object-cover"
                                />
                              ) : (
                                <div className="h-12 w-12 flex items-center justify-center">
                                  <i className="fas fa-images text-gray-400"></i>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-primary-600">{album.title}</p>
                              <p className="text-sm text-gray-500">
                                {album.profiles?.full_name || album.profiles?.email || 'Unknown User'}
                              </p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="text-sm text-gray-500">
                              {new Date(album.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <i className="fas fa-photo-video flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"></i>
                              {album.photo_count || 0} photos
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <Link 
                              to={`/admin/albums/${album.id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              Manage <i className="fas fa-arrow-right ml-1"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                    <p>No albums found.</p>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-primary-700 rounded-lg shadow-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-white">Create New Album</h3>
                <div className="mt-2 max-w-xl text-sm text-primary-200">
                  <p>Create a new photo album for a client and upload photos.</p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/admin/albums/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white"
                  >
                    Create Album
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-white">Manage Appointments</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-300">
                  <p>View and manage upcoming photography appointments.</p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/admin/appointments"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    View Appointments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboardPage
