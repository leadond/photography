import { useSearchParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import BookingForm from '../components/BookingForm'

const BookingPage = () => {
  const [searchParams] = useSearchParams()
  const packageId = searchParams.get('package')
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero
        title="Book Your Photography Session"
        subtitle="Schedule a session with DXM Productions and let's create stunning images together"
        backgroundImage="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1500"
        height="medium"
      />
      
      {/* Booking Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionTitle
                title="Request a Booking"
                subtitle="Fill out the form below to request your photography session"
                center={false}
              />
              
              <div className="mt-8">
                <BookingForm />
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Booking Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900">What happens next?</h4>
                    <p className="text-gray-600 text-sm">
                      After submitting your booking request, we'll contact you within 24-48 hours to confirm your session details and finalize your booking.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Payment</h4>
                    <p className="text-gray-600 text-sm">
                      A 50% deposit is required to secure your booking date. The remaining balance is due on the day of the photoshoot.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Cancellation Policy</h4>
                    <p className="text-gray-600 text-sm">
                      Cancellations made more than 48 hours before your session can be rescheduled at no additional cost. Cancellations within 48 hours may forfeit the deposit.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Need assistance?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Contact us directly if you have any questions or special requests.
                  </p>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>832-924-3668</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Derrick@dxmproductions.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default BookingPage
