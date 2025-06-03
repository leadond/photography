import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import VideoShowcase from '../components/VideoShowcase'

const HomePage = () => {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
      {/* Hero Section with Portrait Collage Background */}
      <section className="relative h-screen overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 z-0"
        >
          {/* Portrait Collage Background */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0">
            <img 
              src="https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg" 
              alt="Professional Headshot 1" 
              className="w-full h-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
              alt="Professional Headshot 2" 
              className="w-full h-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg" 
              alt="Professional Headshot 3" 
              className="w-full h-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
              alt="Professional Portrait 1" 
              className="w-full h-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg" 
              alt="Professional Portrait 2" 
              className="w-full h-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
              alt="Professional Portrait 3" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Capture Your Perfect Moment
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mb-10 text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Professional photography services in Houston, TX specializing in portraits, events, weddings, and commercial photography.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/gallery" 
              className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full shadow-lg hover:bg-amber-600 transition-all transform hover:scale-105"
            >
              View Gallery
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
            >
              Book a Session
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="animate-bounce"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase */}
      <VideoShowcase 
        title="Photography in Action"
        description="Experience the artistry and passion behind DXM Productions photography in this showcase video."
      />

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Photography Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of professional photography services to capture your special moments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Portrait Photography',
                icon: '👤',
                description: 'Professional portraits for individuals, couples, and families.',
                link: '/services#portrait'
              },
              {
                title: 'Event Photography',
                icon: '🎉',
                description: 'Capture the special moments of your corporate or private events.',
                link: '/services#event'
              },
              {
                title: 'Wedding Photography',
                icon: '💍',
                description: 'Beautiful photography for your wedding day and engagement.',
                link: '/services#wedding'
              },
              {
                title: 'Commercial Photography',
                icon: '🏢',
                description: 'Professional photography for products, real estate, and businesses.',
                link: '/services#commercial'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="text-amber-500 font-semibold hover:text-amber-600 transition-colors"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Featured Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through some of our best photography work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Urban Portrait',
                category: 'Portrait',
                image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg'
              },
              {
                title: 'Wedding Ceremony',
                category: 'Wedding',
                image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'
              },
              {
                title: 'Corporate Event',
                category: 'Event',
                image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg'
              },
              {
                title: 'Product Photography',
                category: 'Commercial',
                image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg'
              },
              {
                title: 'Landscape',
                category: 'Landscape',
                image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
              },
              {
                title: 'Family Portrait',
                category: 'Portrait',
                image: 'https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-md h-80"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-sm font-medium text-amber-300 mb-1">{item.category}</span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/gallery" 
              className="inline-block px-8 py-3 bg-amber-500 text-white font-semibold rounded-full shadow-lg hover:bg-amber-600 transition-all transform hover:scale-105"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what our clients have to say about their experience working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Wedding Client',
                quote: 'The photos from our wedding day are absolutely stunning. They captured every special moment perfectly and we couldn\'t be happier!',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Corporate Client',
                quote: 'The team was professional and delivered exceptional photos for our corporate event. They were unobtrusive yet captured all the key moments.',
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Emily Chen',
                role: 'Portrait Client',
                quote: 'I\'ve never felt so comfortable during a photoshoot. The results were beyond my expectations and really captured my personality.',
                avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 relative"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
                <div className="pt-8 text-center">
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                  <h4 className="text-lg font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-amber-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Capture Your Special Moments?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Contact us today to book your photography session or discuss your project needs.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-8 py-3 bg-white text-amber-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default HomePage
