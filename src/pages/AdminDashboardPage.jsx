import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

function AdminDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalRevenue: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Fetch booking stats
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('id, status, total_price, created_at')
        
        if (bookingsError) throw bookingsError
        
        // Fetch recent bookings
        const { data: recentBookingsData, error: recentBookingsError } = await supabase
          .from('bookings')
          .select(`
            id, 
            session_type, 
            session_date, 
            session_time, 
            status, 
            total_price,
            profiles(first_name, last_name, email)
          `)
          .order('created_at', { ascending: false })
          .limit(5)
        
        if (recentBookingsError) throw recentBookingsError
        
        // Fetch album stats
        const { data: albumsData, error: albumsError } = await supabase
          .from('albums')
          .select('id')
        
        if (albumsError) throw albumsError
        
        // Fetch user stats
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('id')
        
        if (usersError) throw usersError
        
        // Calculate stats
        const pendingBookings = bookingsData.filter(booking => booking.status === 'pending').length
        const completedBookings = bookingsData.filter(booking => booking.status === 'completed').length
        const totalRevenue = bookingsData.reduce((sum, booking) => sum + (booking.total_price || 0), 0)
        
        setStats({
          totalBookings: bookingsData.length,
          pendingBookings,
          completedBookings,
          totalAlbums: albumsData.length,
          totalUsers: usersData.length,
          totalRevenue
        })
        
        setRecentBookings(recentBookingsData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.email}</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-calendar-check text-amber-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-clock text-yellow-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Pending Bookings</p>
              <p className="text-2xl font-bold">{stats.pendingBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-images text-green-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Total Albums</p>
              <p className="text-2xl font-bold">{stats.totalAlbums}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-dollar-sign text-blue-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-amber-500 hover:text-amber-600">
              View All
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-gray-500"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.profiles?.first_name} {booking.profiles?.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.profiles?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.session_type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.session_date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{booking.session_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${booking.total_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/admin/bookings/${booking.id}`} className="text-amber-500 hover:text-amber-600 mr-3">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No recent bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/admin/bookings/new" className="flex items-center text-gray-700 hover:text-amber-500">
              <i className="fas fa-plus-circle mr-2"></i>
              Create New Booking
            </Link>
            <Link to="/admin/albums/new" className="flex items-center text-gray-700 hover:text-amber-500">
              <i className="fas fa-plus-circle mr-2"></i>
              Create New Album
            </Link>
            <Link to="/admin/users" className="flex items-center text-gray-700 hover:text-amber-500">
              <i className="fas fa-users mr-2"></i>
              Manage Users
            </Link>
            <Link to="/admin/settings" className="flex items-center text-gray-700 hover:text-amber-500">
              <i className="fas fa-cog mr-2"></i>
              System Settings
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Upcoming Sessions</h3>
          <p className="text-gray-500">You have {stats.pendingBookings} upcoming photography sessions.</p>
          <Link to="/admin/calendar" className="mt-4 inline-block text-amber-500 hover:text-amber-600">
            View Calendar <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user-plus text-blue-500 text-sm"></i>
              </div>
              <div>
                <p className="text-sm">New user registered</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-calendar-check text-green-500 text-sm"></i>
              </div>
              <div>
                <p className="text-sm">Booking #1234 confirmed</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-images text-amber-500 text-sm"></i>
              </div>
              <div>
                <p className="text-sm">New album created</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboardPage
