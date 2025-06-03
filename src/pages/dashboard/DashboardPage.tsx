import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'
import { CalendarIcon, PhotoIcon, CreditCardIcon } from '@heroicons/react/24/outline'

const DashboardPage = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch user profile
        if (user) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError) {
            console.error('Error fetching profile:', profileError)
          } else {
            setProfile(profileData)
          }

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
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Welcome section */}
        <div className="py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Welcome back, {profile?.full_name || user?.email}!
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
                  <CalendarIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
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
                <Link to="/dashboard/appointments" className="font-medium text-primary-600 hover:text-primary-500">
                  View all<span className="sr-only"> appointments</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <PhotoIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Photo Sessions</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {/* This would be fetched from the database in a real implementation */}
                        {appointments.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/dashboard/my-photos" className="font-medium text-primary-600 hover:text-primary-500">
                  View all<span className="sr-only"> photos</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <CreditCardIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
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
                <Link to="/dashboard/appointments" className="font-medium text-primary-600 hover:text-primary-500">
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
            <Link to="/dashboard/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-500">
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
                          <div className="flex-shrink-0 h-12 w-12">
                            <img 
                              className="h-12 w-12 rounded-md object-cover" 
                              src={appointment.packages.image_url} 
                              alt={appointment.packages.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-primary-600">{appointment.packages.name}</p>
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
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {appointment.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            ${appointment.packages.price.toFixed(2)} · 
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
                  <Link to="/dashboard/book" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Book your first session
                  </Link>
                </li>
              )}
            </ul>
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
                to="/dashboard/book"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
