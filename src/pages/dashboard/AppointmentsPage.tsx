import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

type Appointment = {
  id: string
  date: string
  time: string
  location: string
  status: 'scheduled' | 'completed' | 'cancelled'
  payment_status: 'paid' | 'pending'
  notes: string | null
  user_id: string
  package_id: string
  created_at: string
  packages: {
    id: string
    name: string
    price: number
    description: string
    image_url: string
  }
}

const AppointmentsPage = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        if (user) {
          const { data, error } = await supabase
            .from('appointments')
            .select(`
              *,
              packages (id, name, price, description, image_url)
            `)
            .eq('user_id', user.id)
            .order('date', { ascending: true })

          if (error) {
            console.error('Error fetching appointments:', error)
          } else {
            setAppointments(data || [])
          }
        }
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [user])

  const getFilteredAppointments = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (filter) {
      case 'upcoming':
        return appointments.filter(appointment => new Date(appointment.date) >= today)
      case 'past':
        return appointments.filter(appointment => new Date(appointment.date) < today)
      default:
        return appointments
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const filteredAppointments = getFilteredAppointments()

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage all your photography appointments
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/dashboard/book"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Book New Session
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mt-6 border-b border-gray-200">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setFilter('all')}
                  className={`${
                    filter === 'all'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                >
                  All Appointments
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`${
                    filter === 'upcoming'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter('past')}
                  className={`${
                    filter === 'past'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Past
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Appointments list */}
        <div className="mt-8">
          {filteredAppointments.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <li key={appointment.id}>
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                            <img
                              className="h-full w-full object-cover"
                              src={appointment.packages.image_url}
                              alt={appointment.packages.name}
                            />
                          </div>
                          <div className="ml-4">
                            <h2 className="text-lg font-medium text-primary-600">
                              {appointment.packages.name}
                            </h2>
                            <div className="flex items-center mt-1">
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1.5 text-sm text-gray-500">
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className={`text-sm ${
                                appointment.payment_status === 'paid' 
                                  ? 'text-green-600' 
                                  : 'text-red-600'
                              }`}>
                                {appointment.payment_status.charAt(0).toUpperCase() + appointment.payment_status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm text-gray-900 font-medium">
                            ${appointment.packages.price.toFixed(2)}
                          </div>
                          <div className="mt-1">
                            {appointment.status === 'scheduled' && (
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                Reschedule
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <div>
                            <div>{formatDate(appointment.date)}</div>
                            <div>{appointment.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <span>{appointment.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <span>
                            {appointment.payment_status === 'paid' 
                              ? 'Payment completed' 
                              : 'Payment pending'}
                          </span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-4 text-sm text-gray-500">
                          <div className="font-medium text-gray-700">Notes:</div>
                          <p className="mt-1">{appointment.notes}</p>
                        </div>
                      )}

                      <div className="mt-4 flex justify-end space-x-3">
                        {appointment.status === 'scheduled' && (
                          <>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Cancel
                            </button>
                            {appointment.payment_status === 'pending' && (
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                Complete Payment
                              </button>
                            )}
                          </>
                        )}
                        {appointment.status === 'completed' && (
                          <Link
                            to={`/dashboard/my-photos?appointment=${appointment.id}`}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            View Photos
                          </Link>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12 bg-white shadow rounded-lg">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' 
                  ? "You don't have any appointments yet." 
                  : filter === 'upcoming' 
                  ? "You don't have any upcoming appointments." 
                  : "You don't have any past appointments."}
              </p>
              <div className="mt-6">
                <Link
                  to="/dashboard/book"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentsPage
