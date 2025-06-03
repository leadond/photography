import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import GlassCard from '../components/GlassCard'

const pricingPlans = [
  {
    id: 'graduation',
    name: 'Graduation Package',
    description: 'Perfect for capturing your graduation day memories.',
    price: 299,
    features: [
      '1-hour photo session',
      'Up to 3 outfit changes',
      '25 digital images',
      'Online gallery',
      'Print release',
      '5 professional prints (8x10)'
    ],
    popular: false
  },
  {
    id: 'family',
    name: 'Family Portrait Package',
    description: 'Capture beautiful family moments to cherish forever.',
    price: 349,
    features: [
      '1.5-hour photo session',
      'Up to 2 locations',
      '30 digital images',
      'Online gallery',
      'Print release',
      '1 canvas print (16x20)'
    ],
    popular: true
  },
  {
    id: 'corporate',
    name: 'Corporate Event Package',
    description: 'Professional coverage for your corporate events.',
    price: 599,
    features: [
      '4-hour event coverage',
      'Multiple photographers',
      '100+ digital images',
      'Online gallery',
      'Commercial usage rights',
      'Quick turnaround (48 hours)'
    ],
    popular: false
  },
  {
    id: 'headshots',
    name: 'Professional Headshots',
    description: 'Elevate your professional image with quality headshots.',
    price: 199,
    features: [
      '30-minute studio session',
      '2 outfit changes',
      '10 digital images',
      'Professional retouching',
      'Online gallery',
      'LinkedIn optimization'
    ],
    popular: false
  }
]

const faqs = [
  {
    question: 'How far in advance should I book a session?',
    answer: 'We recommend booking at least 2-3 weeks in advance for portrait sessions and 1-2 months for events to ensure availability. However, we do our best to accommodate last-minute bookings when possible.'
  },
  {
    question: 'What should I wear for my photo session?',
    answer: "We recommend wearing solid colors and avoiding busy patterns. For family portraits, coordinating colors rather than matching exactly often works best. We're happy to provide more specific guidance based on your session type and location."
  },
  {
    question: 'How long until I receive my photos?',
    answer: "For portrait sessions, you'll receive your edited photos within 1-2 weeks. For events, delivery time is typically 2-3 weeks. Rush delivery is available for an additional fee."
  },
  {
    question: 'Do you offer mini sessions?',
    answer: "Yes! We offer seasonal mini sessions throughout the year. These are shorter sessions at a reduced price. Follow us on social media or join our email list to be notified when mini sessions are available."
  },
  {
    question: 'What happens if it rains on the day of my outdoor session?',
    answer: "If weather conditions are unfavorable for an outdoor shoot, we'll reschedule at no additional cost. We monitor the weather closely and will communicate with you if we anticipate any issues."
  },
  {
    question: 'Do you offer payment plans?',
    answer: "Yes, we offer flexible payment plans for packages over $300. Typically, this involves a 50% deposit to secure your date with the remaining balance due before or on the day of your session."
  }
]

const PricingPage = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null)
  
  const toggleFaq = (index: number) => {
    setSelectedFaq(selectedFaq === index ? null : index)
  }
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-20">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Pricing"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-gray-900/80"></div>
        </div>
        
        <AnimatedBackground variant="dark" density={20} className="opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Pricing
          </motion.h1>
          
          <motion.div
            className="mt-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl text-gray-300">
              Transparent pricing for our professional photography services.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
            Choose the Perfect Package
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a variety of packages to suit your needs. All packages include professional editing and a personal online gallery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              id={plan.id}
              className={`relative rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'border-2 border-primary-500' : 'border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-45">
                  Popular
                </div>
              )}
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-600 h-12">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                </p>
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <a
                    href="/contact"
                    className={`block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${
                      plan.popular
                        ? 'text-white bg-primary-600 hover:bg-primary-700'
                        : 'text-primary-600 bg-white border-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Custom Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
              Need Something Custom?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We understand that every client has unique needs. Contact us to discuss a custom package tailored just for you.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Photography Solutions</h3>
                <p className="text-gray-600 mb-6">
                  Our custom packages can include:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Extended shooting time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Multiple locations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Specialized equipment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Additional photographers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Custom print packages</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Contact for Custom Quote
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Custom photography"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-primary-800/30"></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <GlassCard className="p-6" blur="lg" opacity={0.2}>
                    <div className="text-center text-white">
                      <h4 className="text-xl font-bold mb-2">Let's Create Something Special</h4>
                      <p>Every vision deserves a custom approach</p>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our photography services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  className="flex w-full justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`h-6 w-6 transform ${selectedFaq === index ? 'rotate-180' : 'rotate-0'} text-primary-500`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedFaq === index ? 'auto' : 0,
                    opacity: selectedFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Still have questions? Feel free to{' '}
              <a href="/contact" className="text-primary-600 font-medium hover:text-primary-500">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute left-0 bottom-0 transform -translate-x-1/2" width="800" height="800" fill="none" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="400" fill="white" fillOpacity="0.1" />
            <circle cx="400" cy="400" r="300" fill="white" fillOpacity="0.1" />
            <circle cx="400" cy="400" r="200" fill="white" fillOpacity="0.1" />
          </svg>
          <svg className="absolute right-0 top-0 transform translate-x-1/2" width="800" height="800" fill="none" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="400" fill="white" fillOpacity="0.1" />
            <circle cx="400" cy="400" r="300" fill="white" fillOpacity="0.1" />
            <circle cx="400" cy="400" r="200" fill="white" fillOpacity="0.1" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-serif">
              Ready to book your session?
            </h2>
            <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
              Contact us today to secure your preferred date and start planning your perfect photo session.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 shadow-lg"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingPage
