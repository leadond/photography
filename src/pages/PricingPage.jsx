import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'

function PricingPage() {
  const { toggleModal } = useOutletContext()

  const packages = [
    {
      id: 'basic',
      name: 'Basic Session',
      price: 199,
      popular: false,
      features: [
        '1-hour photo session',
        '1 location',
        '10 professionally edited digital images',
        'Online gallery access for 30 days',
        'Print release for personal use'
      ],
      color: 'primary'
    },
    {
      id: 'premium',
      name: 'Premium Session',
      price: 349,
      popular: true,
      features: [
        '2-hour photo session',
        'Up to 2 locations',
        '25 professionally edited digital images',
        'Online gallery access for 60 days',
        'Print release for personal use',
        '1 outfit change'
      ],
      color: 'accent'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Session',
      price: 599,
      popular: false,
      features: [
        '4-hour photo session',
        'Multiple locations',
        '50 professionally edited digital images',
        'Online gallery access for 90 days',
        'Print release for personal use',
        'Multiple outfit changes',
        'Professional hair & makeup consultation'
      ],
      color: 'primary'
    }
  ]

  const eventPricing = [
    {
      event: 'Corporate Event',
      duration: '4 hours',
      price: 799,
      details: 'Full coverage, edited images, online gallery'
    },
    {
      event: 'Prom Photography',
      duration: '3 hours',
      price: 599,
      details: 'Group & individual photos, edited images'
    },
    {
      event: 'Graduation Ceremony',
      duration: '3 hours',
      price: 649,
      details: 'Ceremony coverage, formal portraits'
    },
    {
      event: 'Private Party',
      duration: '4 hours',
      price: 699,
      details: 'Event coverage, candid & group photos'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Pricing</h1>
          <p className="text-xl max-w-3xl mx-auto">Competitive rates for professional photography services in Houston, TX.</p>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Photography Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map(pkg => (
              <div 
                key={pkg.id}
                className={`bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition ${pkg.popular ? 'transform scale-105 z-10' : ''}`}
              >
                <div className={`bg-${pkg.color} text-white p-6 text-center relative`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl">Most Popular</div>
                  )}
                  <h3 className="text-2xl font-medium">{pkg.name}</h3>
                  <div className="text-3xl font-bold mt-2">${pkg.price}</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-accent mt-1 mr-2"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => toggleModal('bookingModal', true)}
                    className={`w-full py-3 bg-${pkg.color} text-white rounded hover:bg-${pkg.color === 'primary' ? 'gray-800' : 'amber-600'} transition`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Event Photography Pricing</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Event Type</th>
                  <th className="py-4 px-6 text-left">Duration</th>
                  <th className="py-4 px-6 text-left">Price</th>
                  <th className="py-4 px-6 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {eventPricing.map((item, index) => (
                  <tr key={index} className={`${index !== eventPricing.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-100`}>
                    <td className="py-4 px-6">{item.event}</td>
                    <td className="py-4 px-6">{item.duration}</td>
                    <td className="py-4 px-6">${item.price}</td>
                    <td className="py-4 px-6">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-8 text-gray-600">Custom packages available upon request. Contact us for specialized pricing.</p>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Additional Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-print text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Print Products</h3>
              <p className="text-gray-600 mb-4">High-quality prints, canvases, and albums available in various sizes.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>8x10 Print</span>
                  <span>$25</span>
                </li>
                <li className="flex justify-between">
                  <span>16x20 Print</span>
                  <span>$45</span>
                </li>
                <li className="flex justify-between">
                  <span>Canvas (16x20)</span>
                  <span>$120</span>
                </li>
                <li className="flex justify-between">
                  <span>Custom Album</span>
                  <span>From $250</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-clock text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Additional Time</h3>
              <p className="text-gray-600 mb-4">Extend your photography session for more coverage and photos.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>30 Minutes</span>
                  <span>$75</span>
                </li>
                <li className="flex justify-between">
                  <span>1 Hour</span>
                  <span>$125</span>
                </li>
                <li className="flex justify-between">
                  <span>2 Hours</span>
                  <span>$225</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-image text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Additional Edits</h3>
              <p className="text-gray-600 mb-4">Get more professionally edited images from your session.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>5 Additional Images</span>
                  <span>$75</span>
                </li>
                <li className="flex justify-between">
                  <span>10 Additional Images</span>
                  <span>$125</span>
                </li>
                <li className="flex justify-between">
                  <span>All Images from Session</span>
                  <span>$250</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-map-marker-alt text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Travel Fees</h3>
              <p className="text-gray-600 mb-4">Additional fees for locations outside of Houston metro area.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>20-40 miles</span>
                  <span>$50</span>
                </li>
                <li className="flex justify-between">
                  <span>41-60 miles</span>
                  <span>$75</span>
                </li>
                <li className="flex justify-between">
                  <span>61+ miles</span>
                  <span>Custom Quote</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-paint-brush text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Hair & Makeup</h3>
              <p className="text-gray-600 mb-4">Professional styling services for your photo session.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>Hair Styling</span>
                  <span>$85</span>
                </li>
                <li className="flex justify-between">
                  <span>Makeup Application</span>
                  <span>$85</span>
                </li>
                <li className="flex justify-between">
                  <span>Hair & Makeup Package</span>
                  <span>$150</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-bolt text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Rush Delivery</h3>
              <p className="text-gray-600 mb-4">Expedited editing and delivery of your photos.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>3-Day Turnaround</span>
                  <span>$100</span>
                </li>
                <li className="flex justify-between">
                  <span>5-Day Turnaround</span>
                  <span>$75</span>
                </li>
                <li className="flex justify-between">
                  <span>7-Day Turnaround</span>
                  <span>$50</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">What is your payment policy?</h3>
              <p className="text-gray-600">A 50% non-refundable retainer is required to secure your booking date, with the remaining balance due on the day of the session. We accept credit cards, PayPal, Venmo, and cash.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">What is your cancellation policy?</h3>
              <p className="text-gray-600">The booking retainer is non-refundable. However, if you need to reschedule, we require at least 48 hours notice and will work with you to find a new date within 3 months of the original session date.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">How long will it take to receive my photos?</h3>
              <p className="text-gray-600">Standard delivery time is 2-3 weeks for portrait sessions and 3-4 weeks for events. Rush delivery is available for an additional fee.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Do you offer mini sessions?</h3>
              <p className="text-gray-600">Yes, we offer seasonal mini sessions throughout the year. These are typically 20-30 minute sessions with a limited number of edited images. Follow us on social media or join our email list to be notified of upcoming mini session dates.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">What should I wear to my photo session?</h3>
              <p className="text-gray-600">After booking, we'll provide you with a detailed guide on what to wear based on your session type. Generally, we recommend solid colors, avoiding large logos or busy patterns, and coordinating (not matching) outfits for group photos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Book Your Session?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Contact us today to schedule your photography session and capture your special moments.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={() => toggleModal('bookingModal', true)}
              className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition text-lg font-medium"
            >
              Book Now
            </button>
            <Link to="/contact" className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition text-lg font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default PricingPage
