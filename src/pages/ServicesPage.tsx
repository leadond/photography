import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import ParallaxImage from '../components/ParallaxImage'
import TextReveal from '../components/TextReveal'
import GlassCard from '../components/GlassCard'

const services = [
  {
    id: 'graduation',
    title: 'Graduation Photos',
    description: 'Commemorate your academic achievements with professional graduation photography.',
    longDescription: 'Our graduation photography services capture the pride and accomplishment of this significant milestone. We offer both formal and candid shots, ensuring we document every special moment from the ceremony to the celebration. Our packages include individual portraits, group photos with friends and family, and creative shots with your cap, gown, and diploma.',
    features: [
      'Individual and group portraits',
      'Ceremony coverage',
      'Creative cap and gown photos',
      'Family photos',
      'Professional editing',
      'Quick turnaround'
    ],
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    )
  },
  {
    id: 'family',
    title: 'Family Portraits',
    description: 'Capture the love and connection of your family with beautiful portraits.',
    longDescription: "Our family portrait sessions are designed to capture the unique personality and dynamics of your family. We create a relaxed environment where natural interactions and genuine emotions can shine through. Whether in a studio setting or at a meaningful outdoor location, we'll help you create lasting memories that showcase the special bond you share.",
    features: [
      'Indoor or outdoor sessions',
      'Multiple family groupings',
      'Candid and posed photos',
      'Pet-friendly sessions',
      'Generational portraits',
      'Seasonal mini-sessions available'
    ],
    image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Document your corporate events with professional photography services.',
    longDescription: 'Our corporate event photography services provide comprehensive coverage of your business functions, from conferences and seminars to award ceremonies and company celebrations. We understand the importance of representing your brand appropriately and capturing the professional atmosphere of your events. Our discreet approach ensures we document key moments without disrupting the flow of your event.',
    features: [
      'Full event coverage',
      'Multiple photographers available',
      'Quick turnaround for PR needs',
      'Corporate branding integration',
      'Speaker and presentation photos',
      'Networking and candid shots'
    ],
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'headshots',
    title: 'Professional Headshots',
    description: 'Enhance your professional image with high-quality headshot photography.',
    longDescription: "Our professional headshot sessions are designed to help you make a strong first impression. Whether for corporate profiles, acting portfolios, or social media, we'll work with you to create images that convey confidence and approachability. We provide guidance on posing, expressions, and attire to ensure you look your best, and our professional lighting and retouching enhance your natural features.",
    features: [
      'Studio or on-location sessions',
      'Professional lighting setup',
      'Posing guidance',
      'Multiple background options',
      'Expert retouching',
      'Digital files optimized for various platforms'
    ],
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }
]

const process = [
  {
    step: 1,
    title: 'Initial Consultation',
    description: 'We start with a conversation to understand your vision, preferences, and specific needs for your photography session.'
  },
  {
    step: 2,
    title: 'Planning & Preparation',
    description: "We'll help you prepare with guidance on location, outfits, props, and timing to ensure a successful shoot."
  },
  {
    step: 3,
    title: 'The Photo Session',
    description: "On the day of your shoot, we'll create a comfortable environment and guide you through poses and expressions."
  },
  {
    step: 4,
    title: 'Professional Editing',
    description: 'After the shoot, we carefully select and edit the best images to enhance their quality while maintaining a natural look.'
  },
  {
    step: 5,
    title: 'Review & Delivery',
    description: "You'll receive access to an online gallery where you can review, select, and download your final images."
  }
]

const ServicesPage = () => {
  const { scrollYProgress } = useScroll()
  const processRef = useRef<HTMLDivElement>(null)
  
  const processOpacity = useTransform(
    scrollYProgress, 
    [0.3, 0.4, 0.8], 
    [0, 1, 1]
  )
  
  const processY = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    [100, 0]
  )
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-20">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Our Services"
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
            Our Services
          </motion.h1>
          
          <motion.div
            className="mt-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TextReveal 
              text="Professional photography services tailored to capture your special moments."
              className="text-xl text-gray-300"
              speed={30}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
            Photography Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of professional photography services to meet your needs.
          </p>
        </div>
        
        <div className="space-y-24">
          {services.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <motion.div
                className={index % 2 === 1 ? 'lg:col-start-2' : ''}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">
                  {service.longDescription}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
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
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={`/pricing#${service.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                  >
                    View Pricing
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Book Now
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                className={`relative rounded-lg overflow-hidden shadow-xl ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="aspect-w-16 aspect-h-9 lg:aspect-w-3 lg:aspect-h-4">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <GlassCard className="p-4" opacity={0.2} blur="md">
                      <div className="text-center text-white">
                        <h4 className="text-lg font-bold">{service.title}</h4>
                        <p className="text-sm">{service.description}</p>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Our Process */}
      <section ref={processRef} className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50"></div>
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          style={{ opacity: processOpacity, y: processY }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
              Our Photography Process
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              From consultation to delivery, we ensure a smooth and enjoyable experience.
            </p>
          </div>
          
          <div className="relative">
            {/* Process Steps */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
            
            <div className="space-y-12 lg:space-y-0">
              {process.map((step, index) => (
                <div key={step.step} className="relative">
                  <motion.div
                    className={`lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${
                      index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {/* Step Number (Desktop) */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-600 text-white font-bold text-lg shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:col-start-2'}>
                      {/* Step Number (Mobile) */}
                      <div className="lg:hidden flex items-center mb-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-600 text-white font-bold text-lg shadow-lg mr-4">
                          {step.step}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      
                      {/* Desktop Title */}
                      <h3 className="hidden lg:block text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Empty Column for Layout */}
                    <div className={index % 2 === 0 ? 'hidden lg:block lg:col-start-2' : 'hidden lg:block lg:col-start-1'}></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Testimonial */}
      <ParallaxImage
        src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Client testimonial"
        className="py-24"
        speed={0.3}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="h-12 w-12 text-white opacity-50 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            
            <blockquote>
              <p className="text-2xl font-medium text-white">
                "DXM Productions captured our family's essence in a way I didn't think was possible. The photos are stunning, and the experience was so enjoyable. Derrick has an incredible talent for making everyone feel comfortable and capturing authentic moments."
              </p>
            </blockquote>
            
            <div className="mt-6">
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-full object-cover border-2 border-white"
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Emily Chen"
                  />
                </div>
                <div className="ml-3 text-left">
                  <p className="text-base font-medium text-white">Emily Chen</p>
                  <p className="text-sm text-gray-300">Family Portrait Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxImage>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-extrabold text-white font-serif">
                  Ready to Book Your Session?
                </h2>
                <p className="mt-4 text-lg text-primary-100">
                  Contact us today to discuss your photography needs and secure your preferred date.
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-primary-50"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/pricing"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-white/10"
                  >
                    View Pricing
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Photography session"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-primary-800/30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
