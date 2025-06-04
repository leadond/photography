import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function BookingPage() {
  const { user, userProfile } = useAuth()
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    notes: '',
    service_type: 'portrait',
    package_id: '',
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })

      if (error) throw error
      setPackages(data || [])
    } catch (error) {
      console.error('Error fetching packages:', error)
      toast.error('Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
    setFormData({
      ...formData,
      package_id: pkg.id
    })
    setStep(2)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      const appointmentData = {
        ...formData,
        user_id: user.id,
        status: 'pending',
        payment_status: 'unpaid',
      }
      
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select()

      if (error) throw error
      
      toast.success('Booking request submitted successfully!')
      navigate('/my-bookings')
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Failed to submit booking request')
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  if (loading && step === 1) {
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Book Your Photography Session</h1>
          <p className="mt-4 text-lg text-gray-500">
            Select a package and schedule your session with DXM Productions.
          </p>
        </div>

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`h-1 w-16 sm:w-24 ${
                step >= 2 ? 'bg-primary-600' : 'bg-gray-200'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`h-1 w-16 sm:w-24 ${
                step >= 3 ? 'bg-primary-600' : 'bg-gray-200'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-xs text-center w-24 sm:w-32">Select Package</div>
            <div className="text-xs text-center w-24 sm:w-32">Schedule</div>
            <div className="text-xs text-center w-24 sm:w-32">Confirm</div>
          </div>
        </div>

        {/* Step 1: Package Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePackageSelect(pkg)}
              >
                <div className="h-48 bg-gray-200">
                  {pkg.image_url ? (
                    <img 
                      src={pkg.image_url} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fas fa-camera text-4xl text-gray-400"></i>
                    </div>
                  )}
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      ${pkg.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{pkg.description}</p>
                  <div className="mt-4">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center">
                        <i className="fas fa-clock text-primary-600 mr-2"></i>
                        {pkg.duration} {pkg.duration === 1 ? 'hour' : 'hours'}
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-images text-primary-600 mr-2"></i>
                        {pkg.deliverables}
                      </li>
                      {pkg.includes && pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <i className="fas fa-check text-primary-600 mr-2"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Select Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Schedule */}
        {step === 2 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Schedule Your Session</h2>
              <div className="mt-5">
                <form>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
                        Session Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="service_type"
                          name="service_type"
                          value={formData.service_type}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="portrait">Portrait Session</option>
                          <option value="wedding">Wedding Photography</option>
                          <option value="event">Event Photography</option>
                          <option value="family">Family Session</option>
                          <option value="graduation">Graduation Photos</option>
                          <option value="headshot">Professional Headshots</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <div className="mt-1">
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          placeholder="Enter session location"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Special Requests or Notes
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Any special requests or information for your photographer"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.date || !formData.time || !formData.location) {
                          toast.error('Please fill in all required fields')
                          return
                        }
                        setStep(3)
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && selectedPackage && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Confirm Your Booking</h2>
              <div className="mt-5 border-t border-gray-200 pt-5">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Package</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedPackage.name}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${selectedPackage.price}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Session Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.service_type.charAt(0).toUpperCase() + formData.service_type.slice(1)}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(formData.date).toLocaleDateString()} at {formData.time}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.location}</dd>
                  </div>
                  {formData.notes && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Special Requests</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.notes}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <i className="fas fa-info-circle text-primary-600"></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Important Information</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>
                        By confirming this booking, you're requesting a photography session with DXM Productions. 
                        We'll review your request and contact you to confirm the details. 
                        Payment will be collected after your booking is confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default BookingPage
