import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalAlbums: 0,
    totalPhotos: 0,
    recentAppointments: [],
    recentUsers: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
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

        // Fetch total albums
        const { count: albumCount, error: albumError } = await supabase
          .from('albums')
          .select('*', { count: 'exact', head: true })

        if (albumError) throw albumError

        // Fetch total photos
        const { count: photoCount, error: photoError } = await supabase
          .from('photos')
          .select('*', { count: 'exact', head: true })

        if (photoError) throw photoError

        // Fetch recent appointments
        const { data: recentAppointments, error: recentAppointmentsError } = await supabase
          .from('appointments')
          .select(`
            *,
            profiles(full_name, email)
          `)
          .order('created_at', { ascending: false })
          .limit(5)

        if (recentAppointmentsError) throw recentAppointmentsError

        // Fetch recent users
        const { data: recentUsers, error: recentUsersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        if (recentUsersError) throw recentUsersError

        setStats({
          totalUsers: userCount,
          totalAppointments: appointmentCount,
          totalAlbums: albumCount,
          totalPhotos: photoCount,
          recentAppointments: recentAppointments || [],
          recentUsers: recentUsers || []
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-800">
              <i className="fas fa-users text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/users" className="text-sm text-primary-600 hover:text-primary-800">
              View all users <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent">
              <i className="fas fa-calendar-alt text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalAppointments}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/bookings" className="text-sm text-primary-600 hover:text-primary-800">
              View all bookings <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <i className="fas fa-folder-open text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Albums</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalAlbums}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/albums" className="text-sm text-primary-600 hover:text-primary-800">
              View all albums <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800">
              <i className="fas fa-images text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Photos</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalPhotos}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/photos" className="text-sm text-primary-600 hover:text-primary-800">
              View all photos <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.recentAppointments.length > 0 ? (
              stats.recentAppointments.map((appointment) => (
                <div key={appointment.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.profiles?.full_name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.service_type.charAt(0).toUpperCase() + appointment.service_type.slice(1)} Session
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : appointment.status === 'cancelled' 
                          ? 'bg-red-100 text-red-800' 
                          : appointment.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent bookings
              </div>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <Link to="/admin/bookings" className="text-sm text-primary-600 hover:text-primary-800">
              View all bookings
            </Link>
          </div>
        </div>
        
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user) => (
                <div key={user.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.full_name || 'Unnamed User'}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent users
              </div>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <Link to="/admin/users" className="text-sm text-primary-600 hover:text-primary-800">
              View all users
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
