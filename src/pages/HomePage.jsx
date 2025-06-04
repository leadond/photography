import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'

function HomePage() {
  const { toggleModal } = useOutletContext()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section id="home" className="hero-section h-[80vh] flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Capturing Life's Precious Moments</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Professional photography services in Houston, TX for graduations, events, portraits, and more.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button onClick={() => toggleModal('bookingModal', true)} className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition text-lg font-medium">Book a Session</button>
            <Link to="/gallery" className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition text-lg font-medium">View Portfolio</Link>
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif text-center mb-8">Published In</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-32 h-12 bg-gray-200 flex items-center justify-center rounded">Magazine 1</div>
            <div className="w-32 h-12 bg-gray-200 flex items-center justify-center rounded">Magazine 2</div>
            <div className="w-32 h-12 bg-gray-200 flex items-center justify-center rounded">Magazine 3</div>
            <div className="w-32 h-12 bg-gray-200 flex items-center justify-center rounded">Magazine 4</div>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-3">Featured Work</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Explore some of our best photography showcasing diverse clients and events.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Item 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-blue-500 flex items-center justify-center">
                <i className="fas fa-graduation-cap text-6xl text-white"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">Graduation Photography</h3>
                <p className="text-gray-600 mb-4">Capturing the joy and achievement of graduation day with professional photography.</p>
                <Link to="/gallery" className="text-accent hover:text-amber-600 font-medium flex items-center">
                  View Gallery <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            {/* Featured Item 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-green-500 flex items-center justify-center">
                <i className="fas fa-user text-6xl text-white"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">Portrait Photography</h3>
                <p className="text-gray-600 mb-4">Professional portraits that capture personality and create lasting impressions.</p>
                <Link to="/gallery" className="text-accent hover:text-amber-600 font-medium flex items-center">
                  View Gallery <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            {/* Featured Item 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-purple-500 flex items-center justify-center">
                <i className="fas fa-glass-cheers text-6xl text-white"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">Event Photography</h3>
                <p className="text-gray-600 mb-4">Comprehensive coverage of corporate events, parties, and special occasions.</p>
                <Link to="/gallery" className="text-accent hover:text-amber-600 font-medium flex items-center">
                  View Gallery <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-gray-800 transition">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-3">Our Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Comprehensive photography services tailored to your specific needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-user-graduate text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Graduation Photography</h3>
              <p className="text-gray-600 mb-4">Capture your academic achievements with professional graduation photos.</p>
              <Link to="/services" className="text-accent hover:text-amber-600 font-medium flex items-center">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-user text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Portrait Photography</h3>
              <p className="text-gray-600 mb-4">Professional headshots and portraits for individuals, families, and businesses.</p>
              <Link to="/services" className="text-accent hover:text-amber-600 font-medium flex items-center">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-glass-cheers text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Event Photography</h3>
              <p className="text-gray-600 mb-4">Comprehensive coverage of corporate events, parties, and special occasions.</p>
              <Link to="/services" className="text-accent hover:text-amber-600 font-medium flex items-center">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-gray-800 transition">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-3">Client Testimonials</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">What our clients say about their experience with DXM Productions.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-500 rounded-full mr-4 flex items-center justify-center text-white">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4 className="font-medium">Jessica Martinez</h4>
                  <p className="text-gray-600 text-sm">Senior Portrait Client</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-accent">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600">"Derrick captured my senior photos perfectly! He made me feel comfortable and the photos turned out amazing. I've received so many compliments on them!"</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full mr-4 flex items-center justify-center text-white">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4 className="font-medium">Robert Johnson</h4>
                  <p className="text-gray-600 text-sm">Corporate Event</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-accent">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600">"DXM Productions provided exceptional photography for our corporate event. Professional, punctual, and the photos were delivered quickly. We'll definitely use them again!"</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full mr-4 flex items-center justify-center text-white">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4 className="font-medium">Alicia Thompson</h4>
                  <p className="text-gray-600 text-sm">Fashion Model</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-accent">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
              <p className="text-gray-600">"Working with Derrick was an amazing experience. He has a great eye for fashion photography and helped me build a portfolio that got me signed with an agency!"</p>
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
            <button onClick={() => toggleModal('bookingModal', true)} className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition text-lg font-medium">Book Now</button>
            <Link to="/contact" className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition text-lg font-medium">Contact Us</Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default HomePage
