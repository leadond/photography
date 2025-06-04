import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useBooking, BookingRequest } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const BookingForm = () => {
  const { packages, submitBookingRequest, loading } = useBooking()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const initialPackageId = searchParams.get('package') || packages[0]?.id || ''
  
  const [formData, setFormData] = useState<BookingRequest>({
    package_id: initialPackageId,
    date: new Date(),
    time: '10:00',
    location: '',
    notes: ''
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleDateChange = (date: Date) => {
    setFormData(prev => ({ ...prev, date }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await submitBookingRequest(formData)
      
      if (user) {
        navigate('/my-bookings')
      } else {
        // Prompt to create account
        toast.success(
          'Your booking request has been submitted! Create an account to manage your bookings and access your photos after the shoot.',
          { duration: 6000 }
        )
        
        // Redirect to register page after a delay
        setTimeout(() => {
          navigate('/register')
        }, 3000)
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
    }
  }
  
  const selectedPackage = packages.find(pkg => pkg.id === formData.package_id)
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="package_id" className="form-label">Select Package</label>
          <select
            id="package_id"
            name="package_id"
            value={formData.package_id}
            onChange={handleChange}
            className="form-input"
            required
          >
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - ${pkg.price}
              </option>
            ))}
          </select>
        </div>
        
        {selectedPackage && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-lg mb-2">{selectedPackage.name}</h3>
            <p className="text-gray-600 mb-2">{selectedPackage.description}</p>
            <p className="text-gray-800 font-medium">${selectedPackage.price} - {selectedPackage.duration}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="date" className="form-label">Preferred Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="time" className="form-label">Preferred Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:00">6:00 PM</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="location" className="form-label">Preferred Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Downtown Houston, Hermann Park, Studio, etc."
            className="form-input"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="notes" className="form-label">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Tell us more about your vision for the shoot..."
            className="form-input min-h-[120px]"
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Submit Booking Request'
          )}
        </button>
      </form>
    </div>
  )
}

export default BookingForm
