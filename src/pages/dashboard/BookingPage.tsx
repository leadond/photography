import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CalendarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

interface Package {
  id: string
  name: string
  price: number
  description: string
}

const BookingPage = () => {
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [packages, setPackages] = useState<Package[]>([])
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  
  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ]
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('price', { ascending: true })
        
        if (error) throw error
        
        if (data) {
          setPackages(data)
          if (data.length > 0) {
            setSelectedPackage(data[0].id)
          }
        }
      } catch (error) {
        console.error('Error fetching packages:', error)
        toast.error('Failed to load photography packages')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPackages()
  }, [])
  
  // Get tomorrow's date as the minimum date for booking
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }
  
  // Get 3 months from now as the maximum date for booking
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate.toISOString().split('T')[0]
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPackage || !date || !time) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setSubmitting(true)
    
    try {
      // Combine date and time
      const dateTime = new Date(`${date}T${time.split(' ')[0]}${time.includes('PM') && !time.startsWith('12') ? ':00 PM' : ':00 AM'}`)
      
      // Create appointment in Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            package_id: selectedPackage,
            date: dateTime.toISOString(),
            notes,
            status: 'pending'
          }
        ])
        .select()
      
      if (error) throw error
      
      toast.success('Appointment booked successfully!')
      navigate('/dashboard/checkout', { 
        state: { 
          appointmentId: data?.[0]?.id,
          packageId: selectedPackage
        } 
      })
    } catch (error) {
      console.error('Error booking appointment:', error)
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book a Photography Session</h1>
        <p className="text-gray-600">
          Select your preferred package, date, and time to schedule your photography session.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Selection */}
          <div>
            <label htmlFor="package" className="block text-gray-700 font-medium mb-2">
              Select Package *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPackage === pkg.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <div className="flex items-center text-primary-600 font-medium">
                      <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                      ${pkg.price}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Date Selection */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Select Date *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                min={getTomorrowDate()}
                max={getMaxDate()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Sessions can be booked up to 3 months in advance.
            </p>
          </div>
          
          {/* Time Selection */}
          <div>
            <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
              Select Time *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
              Special Requests or Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Any special requests or information we should know about your session..."
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !selectedPackage || !date || !time}
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-bold mb-4">Booking Information</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• A 50% deposit is required to confirm your booking.</li>
          <li>• Rescheduling is available up to 48 hours before your session.</li>
          <li>• Cancellations made less than 48 hours before your session may be subject to a cancellation fee.</li>
          <li>• Sessions typically last 1-4 hours depending on the package selected.</li>
          <li>• For outdoor sessions, we may need to reschedule in case of inclement weather.</li>
        </ul>
      </div>
    </div>
  )
}

export default BookingPage
