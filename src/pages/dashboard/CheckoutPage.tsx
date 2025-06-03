import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

interface Package {
  id: string
  name: string
  price: number
  description: string
}

interface LocationState {
  appointmentId: string
  packageId: string
}

const CheckoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { appointmentId, packageId } = (location.state as LocationState) || {}
  
  const [loading, setLoading] = useState(true)
  const [packageDetails, setPackageDetails] = useState<Package | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal'>('credit_card')
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  })
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)
  
  useEffect(() => {
    // If no appointment ID is provided, redirect to booking page
    if (!appointmentId || !packageId) {
      toast.error('No appointment selected. Please book a session first.')
      navigate('/dashboard/booking')
      return
    }
    
    const fetchPackageDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('id', packageId)
          .single()
        
        if (error) throw error
        
        setPackageDetails(data)
      } catch (error) {
        console.error('Error fetching package details:', error)
        toast.error('Failed to load package details')
        navigate('/dashboard/booking')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPackageDetails()
  }, [appointmentId, packageId, navigate])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Format card number with spaces
    if (name === 'number') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19)
      
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }))
      return
    }
    
    // Format expiry date
    if (name === 'expiry') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .slice(0, 5)
      
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }))
      return
    }
    
    // Format CVC
    if (name === 'cvc') {
      const formattedValue = value.slice(0, 3)
      
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }))
      return
    }
    
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const validateForm = () => {
    if (paymentMethod === 'credit_card') {
      if (!cardDetails.name.trim()) {
        toast.error('Please enter the cardholder name')
        return false
      }
      
      if (cardDetails.number.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid 16-digit card number')
        return false
      }
      
      if (!cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
        toast.error('Please enter a valid expiry date (MM/YY)')
        return false
      }
      
      if (cardDetails.cvc.length !== 3) {
        toast.error('Please enter a valid 3-digit CVC')
        return false
      }
    }
    
    return true
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setProcessing(true)
    
    try {
      // In a real app, you would process the payment with a payment gateway
      // For this demo, we'll simulate a successful payment
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update appointment status to confirmed
      await supabase
        .from('appointments')
        .update({ status: 'confirmed', payment_status: 'paid' })
        .eq('id', appointmentId)
      
      setCompleted(true)
      toast.success('Payment successful! Your appointment is confirmed.')
    } catch (error) {
      console.error('Error processing payment:', error)
      toast.error('Failed to process payment. Please try again.')
    } finally {
      setProcessing(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (completed) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your photography session has been confirmed. We've sent a confirmation email with all the details.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Package:</span>
                <span className="font-medium">{packageDetails?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium">${packageDetails?.price ? packageDetails.price / 2 : 0} (50% deposit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Balance Due:</span>
                <span className="font-medium">${packageDetails?.price ? packageDetails.price / 2 : 0} (on session day)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium">{appointmentId}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard/appointments')}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50"
            >
              View Appointments
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600">
          Complete your booking by making a 50% deposit payment.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center ${
                  paymentMethod === 'credit_card'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('credit_card')}
              >
                <span className="font-medium">Credit Card</span>
              </button>
              
              <button
                type="button"
                className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center ${
                  paymentMethod === 'paypal'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <span className="font-medium">PayPal</span>
              </button>
            </div>
            
            {paymentMethod === 'credit_card' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="number" className="block text-gray-700 font-medium mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-gray-700 font-medium mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvc" className="block text-gray-700 font-medium mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      value={cardDetails.cvc}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      placeholder="123"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Processing...' : `Pay $${packageDetails?.price ? packageDetails.price / 2 : 0} Deposit`}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  You'll be redirected to PayPal to complete your payment.
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={processing}
                  className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : 'Proceed to PayPal'}
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold mb-4">Payment Information</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• A 50% deposit is required to confirm your booking.</li>
              <li>• The remaining balance will be due on the day of your session.</li>
              <li>• Your payment information is secure and encrypted.</li>
              <li>• We accept all major credit cards and PayPal.</li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Package</span>
                <span className="font-medium">{packageDetails?.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Package Price</span>
                <span className="font-medium">${packageDetails?.price}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-gray-600">Deposit (50%)</span>
                <span className="font-medium">${packageDetails?.price ? packageDetails.price / 2 : 0}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Balance Due</span>
                <span className="font-medium">${packageDetails?.price ? packageDetails.price / 2 : 0}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Due Now</span>
                <span>${packageDetails?.price ? packageDetails.price / 2 : 0}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Balance of ${packageDetails?.price ? packageDetails.price / 2 : 0} due on session day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
