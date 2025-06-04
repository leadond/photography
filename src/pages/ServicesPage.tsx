import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ServicesPage = () => {
  const services = [
    {
      id: 'graduation',
      title: 'Graduation Photography',
      description: 'Celebrate your academic achievements with professional graduation photos that capture this important milestone.',
      features: [
        'Individual and group graduation portraits',
        'Cap and gown formal photos',
        'Candid ceremony coverage',
        'Family photos at graduation',
        'Custom graduation announcements',
        'Same-day digital previews available'
      ],
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'portraits',
      title: 'Portrait Photography',
      description: 'Professional portraits for individuals, families, and seniors that capture your unique personality and style.',
      features: [
        'Senior portrait sessions',
        'Professional headshots',
        'Family portrait sessions',
        'Studio or location options',
        'Multiple outfit changes',
        'Digital and print packages available'
      ],
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'events',
      title: 'Event Photography',
      description: 'Comprehensive coverage of your special events, from corporate gatherings to private celebrations.',
      features: [
        'Corporate events and conferences',
        'Proms and school dances',
        'Birthday parties and celebrations',
        'Candid and posed photography',
        'Quick turnaround time',
        'Online gallery for easy sharing'
      ],
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'fashion',
      title: 'Fashion & Modeling',
      description: 'Creative fashion photography for models, designers, and brands looking to showcase their style.',
      features: [
        'Model portfolio development',
        'Fashion editorial shoots',
        'Commercial product photography',
        'Lookbook creation',
        'Studio or location options',
        'Professional retouching included'
      ],
      image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero
        title="Our Photography Services"
        subtitle="Professional photography services tailored to your unique needs"
        backgroundImage="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1500"
        height="medium"
      />
      
      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="What We Offer"
            subtitle="DXM Productions provides a wide range of professional photography services in Houston, TX"
          />
          
          <div className="mt-12 space-y-24">
            {services.map((service, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1
              })
              
              return (
                <div 
                  key={service.id} 
                  id={service.id}
                  ref={ref}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    transition={{ duration: 0.6 }}
                    className={index % 2 === 1 ? 'lg:col-start-2' : ''}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link to="/pricing" className="btn btn-primary">
                        View Pricing
                      </Link>
                      <Link to={`/booking?service=${service.id}`} className="btn btn-secondary">
                        Book Now
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Photography Process"
            subtitle="How we work with you to create stunning images"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We start with a detailed consultation to understand your vision, preferences, and goals for the photoshoot.'
              },
              {
                step: '02',
                title: 'Photoshoot',
                description: 'On the day of the shoot, we'll guide you through poses and capture both planned and spontaneous moments.'
              },
              {
                step: '03',
                title: 'Editing & Delivery',
                description: 'After careful selection and professional editing, we'll deliver your photos through a convenient online gallery.'
              }
            ].map((item, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1
              })
              
              return (
                <motion.div
                  key={item.step}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-md p-8"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about our photography services"
          />
          
          <div className="mt-12 max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How far in advance should I book my photography session?',
                answer: 'We recommend booking at least 2-4 weeks in advance for portrait sessions and 1-2 months for events to ensure availability. However, we do accommodate last-minute bookings when possible.'
              },
              {
                question: 'What should I wear for my photoshoot?',
                answer: 'We provide detailed guidance based on your specific shoot, but generally recommend wearing solid colors, avoiding busy patterns, and bringing multiple outfit options. We're happy to provide personalized recommendations during your consultation.'
              },
              {
                question: 'How long until I receive my photos?',
                answer: 'For portrait sessions, you'll receive a preview gallery within 48 hours and your full gallery within 1-2 weeks. For events, delivery time is typically 2-3 weeks depending on the size of the event.'
              },
              {
                question: 'Do you provide prints or just digital files?',
                answer: 'We offer both digital files and professional printing services. Our packages include digital galleries, and you can order professional prints, albums, and other products directly through your online gallery.'
              },
              {
                question: 'What happens if it rains on the day of an outdoor shoot?',
                answer: 'We monitor weather conditions closely and will contact you 24-48 hours before your session if weather looks concerning. We can either reschedule or move to an indoor location depending on your preference.'
              }
            ].map((item, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1
              })
              
              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book your photography session?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your photography needs and schedule your session.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Book a Session
            </Link>
            <Link to="/contact" className="btn border border-white text-white hover:bg-primary-700">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default ServicesPage
