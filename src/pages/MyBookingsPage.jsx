import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function MyBookingsPage() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')

  useEffect(() => {
    fetchAppointments()
  }, [user])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          packages (name, price, image_url, duration)
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: true })

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast.error('Failed to load your appointments')
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      
      toast.success('Appointment cancelled successfully')
      fetchAppointments()
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      toast.error('Failed to cancel appointment')
    }
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getFilteredAppointments = () => {
    const now = new Date()
    
    if (activeTab === 'upcoming') {
      return appointments.filter(
        appointment => 
          new Date(appointment.date) >= now && 
          appointment.status !== 'cancelled'
      )
    } else if (activeTab === 'past') {
      return appointments.filter(
        appointment => 
          new Date(appointment.date) < now || 
          appointment.status === 'completed'
      )
    } else if (activeTab === 'cancelled') {
      return appointments.filter(
        appointment => appointment.status === 'cancelled'
      )
    }
    
    return appointments
  }

  const filteredAppointments = getFilteredAppointments()

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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
          <Link
            to="/booking"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Book New Session
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`${
                activeTab === 'past'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`${
                activeTab === 'cancelled'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Cancelled
            </button>
          </nav>
        </div>
        
        {/* Appointments list */}
        <div className="mt-6">
          {filteredAppointments.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <li key={appointment.id}>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                            {appointment.packages?.image_url ? (
                              <img 
                                src={appointment.packages.image_url} 
                                alt={appointment.packages.name} 
                                className="h-16 w-16 rounded-md object-cover"
                              />
                            ) : (
                              <i className="fas fa-camera text-2xl text-gray-500"></i>
                            )}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{appointment.packages?.name || 'Photography Session'}</h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(appointment.date)} at {appointment.time}
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
                      
                      <div className="mt-4 sm:flex sm:justify-between">
                        <div className="sm:flex sm:space-x-6">
                          <p className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-map-marker-alt flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"></i>
                            {appointment.location}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <i className="fas fa-clock flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"></i>
                            {appointment.packages?.duration || '1'} hour
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <div className="flex items-center justify-end space-x-4">
                            <p className="text-sm font-medium text-gray-900">
                              ${appointment.packages?.price || '0'} · 
                              <span className={`ml-1 ${
                                appointment.payment_status === 'paid' 
                                  ? 'text-green-600' 
                                  : 'text-red-600'
                              }`}>
                                {appointment.payment_status.charAt(0).toUpperCase() + appointment.payment_status.slice(1)}
                              </span>
                            </p>
                            
                            {activeTab === 'upcoming' && appointment.status !== 'cancelled' && (
                              <button
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to cancel this appointment?')) {
                                    cancelAppointment(appointment.id)
                                  }
                                }}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Cancel
                              </button>
                            )}
                            
                            {appointment.status === 'completed' && (
                              <Link
                                to={`/my-albums`}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                View Photos
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-500">
                  {activeTab === 'upcoming' 
                    ? "You don't have any upcoming appointments." 
                    : activeTab === 'past' 
                    ? "You don't have any past appointments." 
                    : "You don't have any cancelled appointments."}
                </p>
                {activeTab === 'upcoming' && (
                  <Link
                    to="/booking"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Book a Session
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MyBookingsPage
