import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'
import { useGallery } from '../context/GalleryContext'

const HomePage = () => {
  const { featuredPhotos } = useGallery()
  
  const services = [
    {
      title: 'Graduation Photography',
      description: 'Capture your academic achievements with professional graduation photos that celebrate your success.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      link: '/services#graduation'
    },
    {
      title: 'Portrait Sessions',
      description: 'Professional portraits for individuals, families, and seniors that capture your unique personality.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      link: '/services#portraits'
    },
    {
      title: 'Event Photography',
      description: 'Comprehensive coverage of your special events, from corporate gatherings to private celebrations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: '/services#events'
    },
    {
      title: 'Fashion & Modeling',
      description: 'Creative fashion photography for models, designers, and brands looking to showcase their style.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/services#fashion'
    }
  ]
  
  const testimonials = [
    {
      quote: "DXM Productions captured my graduation photos perfectly! The attention to detail and creativity made my photos stand out. I couldn't be happier with the results.",
      author: "Jasmine Williams",
      role: "College Graduate",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "Working with Derrick for our corporate event was a breeze. He was professional, unobtrusive, and delivered stunning photos that perfectly captured the essence of our company culture.",
      author: "Michael Chen",
      role: "Marketing Director",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "The fashion shoot exceeded all my expectations! The photos are magazine-worthy and have already helped me secure multiple modeling opportunities. Highly recommend!",
      author: "Sophia Rodriguez",
      role: "Model",
      image: "https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ]
  
  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero
        title="Capturing Life's Most Beautiful Moments"
        subtitle="Professional photography services in Houston, TX specializing in graduations, events, portraits, and fashion."
        backgroundImage="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1500"
        buttonText="Book a Session"
        buttonLink="/booking"
        height="full"
      />
      
      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Photography Services"
            subtitle="Specializing in a variety of photography styles to meet your unique needs"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section className="py-20" ref={featuredRef}>
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Featured Work"
            subtitle="A selection of our recent photography projects"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {featuredPhotos.slice(0, 6).map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg group aspect-[4/3]"
              >
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-medium text-xl">{photo.title}</h3>
                  <p className="text-gray-200">{photo.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery" className="btn btn-primary">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About DXM Productions</h2>
              <p className="text-lg mb-6">
                DXM Productions is a premier photography studio based in Houston, Texas, specializing in capturing life's most precious moments with creativity, passion, and technical excellence.
              </p>
              <p className="text-lg mb-6">
                As a published photographer with work featured in various magazines, I bring a unique artistic vision to every shoot, whether it's graduation photos, senior portraits, corporate events, or fashion editorials.
              </p>
              <p className="text-lg mb-8">
                My mission is to create stunning, timeless images that tell your story and preserve your special moments for generations to come.
              </p>
              <Link to="/about" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Learn More About Us
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Photographer at work" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-primary-600 font-bold">10+ Years</p>
                <p className="text-gray-600">Professional Experience</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-primary-600 font-bold">1,000+</p>
                <p className="text-gray-600">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Client Testimonials"
            subtitle="Hear what our clients have to say about their experience with DXM Productions"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Capture Your Special Moments?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Book a session with DXM Productions today and let us create stunning images that you'll cherish forever.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="btn btn-primary">
              Book a Session
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default HomePage
