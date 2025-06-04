import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import PricingCard from '../components/PricingCard'
import { useBooking } from '../context/BookingContext'

const PricingPage = () => {
  const { packages } = useBooking()
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero
        title="Photography Pricing"
        subtitle="Transparent pricing for our professional photography services"
        backgroundImage="https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1500"
        height="medium"
      />
      
      {/* Pricing Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Photography Packages"
            subtitle="Choose the perfect package for your photography needs"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {packages.map((pkg, index) => (
              <PricingCard key={pkg.id} package={pkg} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 mb-6">
              Need a custom package? We can create a tailored solution just for you.
            </p>
            <Link to="/contact" className="btn btn-secondary">
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>
      
      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Additional Services"
            subtitle="Enhance your photography experience with these add-on services"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Professional Retouching',
                price: '$75',
                description: 'Advanced retouching for 10 selected images, including skin smoothing, blemish removal, and color enhancement.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                )
              },
              {
                title: 'Premium Photo Album',
                price: '$199',
                description: 'Beautifully designed 20-page hardcover photo album with your favorite images from the session.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: 'Same-Day Editing',
                price: '$150',
                description: 'Expedited editing of 15 selected images delivered within 24 hours of your photoshoot.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <div key={service.title} className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-primary-600 font-bold text-2xl mb-4">{service.price}</p>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link to="/contact" className="text-primary-600 font-medium inline-flex items-center hover:text-primary-700">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Pricing FAQ"
            subtitle="Common questions about our pricing and packages"
          />
          
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  question: 'Do you require a deposit?',
                  answer: 'Yes, we require a 50% non-refundable deposit to secure your booking date. The remaining balance is due on the day of the photoshoot.'
                },
                {
                  question: 'What forms of payment do you accept?',
                  answer: 'We accept credit/debit cards, PayPal, Venmo, Cash App, and cash payments.'
                },
                {
                  question: 'Are there any additional fees I should be aware of?',
                  answer: 'Our packages are all-inclusive with no hidden fees. For locations more than 30 miles from Houston, there may be a small travel fee which will be discussed during consultation.'
                },
                {
                  question: 'Do you offer discounts for multiple sessions?',
                  answer: 'Yes, we offer loyalty discounts for returning clients and package deals for multiple sessions booked at once. Contact us for details.'
                },
                {
                  question: 'What is your cancellation policy?',
                  answer: 'Cancellations made more than 48 hours before your session can be rescheduled at no additional cost. Cancellations within 48 hours may forfeit the deposit, though we try to be flexible with emergencies.'
                }
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book your session?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Choose your package and book your photography session today.
          </p>
          <Link to="/booking" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Book Now
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default PricingPage
