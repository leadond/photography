import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

function BookingModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // If user is logged in, use their ID
      const userId = user ? user.id : null

      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            user_id: userId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service_type: formData.service,
            date: formData.date,
            time: formData.time,
            message: formData.message,
            status: 'pending',
            payment_status: 'unpaid'
          }
        ])

      if (error) throw error

      onSuccess('Your booking request has been submitted successfully. We\'ll contact you shortly to confirm your appointment.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      })
    } catch (error) {
      setError(error.message || 'Failed to submit booking request')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden transform transition-all">
        <div className="bg-accent text-white py-4 px-6 flex justify-between items-center">
          <h3 className="text-xl font-medium">Book a Photography Session</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 focus:outline-none">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="bookingName" className="block text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="bookingName" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="bookingEmail" className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="bookingEmail" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="bookingPhone" className="block text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="bookingPhone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="bookingService" className="block text-gray-700 mb-2">Service Type</label>
                <select 
                  id="bookingService" 
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required
                >
                  <option value="">Select a service</option>
                  <option value="graduation">Graduation Photography</option>
                  <option value="portrait">Portrait Photography</option>
                  <option value="event">Event Photography</option>
                  <option value="fashion">Fashion Photography</option>
                  <option value="business">Business Photography</option>
                  <option value="custom">Custom Photography</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="bookingDate" className="block text-gray-700 mb-2">Preferred Date</label>
                <input 
                  type="date" 
                  id="bookingDate" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="bookingTime" className="block text-gray-700 mb-2">Preferred Time</label>
                <select 
                  id="bookingTime" 
                  name="time" 
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning (9am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 4pm)</option>
                  <option value="evening">Evening (4pm - 7pm)</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="bookingMessage" className="block text-gray-700 mb-2">Additional Information</label>
              <textarea 
                id="bookingMessage" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows="4" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
