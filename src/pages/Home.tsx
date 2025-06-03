import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import InstagramFeed from '../components/InstagramFeed'
import BacklinkPartners from '../components/BacklinkPartners'

// Create a simple testimonial slider component since the import is failing
const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      quote: "DXM Productions captured our wedding day perfectly. The photos are stunning and truly reflect the joy of our special day.",
      author: "Sarah & Michael Johnson",
      role: "Wedding Clients"
    },
    {
      id: 2,
      quote: "My graduation photos exceeded all expectations. Professional, creative, and delivered on time!",
      author: "James Wilson",
      role: "Graduation Client"
    },
    {
      id: 3,
      quote: "The corporate headshots DXM did for our team were exceptional. They made everyone feel comfortable and the results were fantastic.",
      author: "Emily Chen",
      role: "Marketing Director"
    }
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to have worked with amazing clients who trust us with their precious moments.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex-1">
                <p className="text-gray-800 italic mb-4">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const services = [
    {
      id: 1,
      title: 'Graduation Photography',
      description: 'Capture your academic achievements with professional graduation photos.',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/pricing'
    },
    {
      id: 2,
      title: 'Family Portraits',
      description: 'Preserve precious family moments with beautiful portrait photography.',
      image: 'https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/pricing'
    },
    {
      id: 3,
      title: 'Corporate Events',
      description: 'Professional photography for your corporate events and conferences.',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/pricing'
    },
    {
      id: 4,
      title: 'Professional Headshots',
      description: 'Stand out with professional headshots for your business profile.',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/pricing'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/3379942/pexels-photo-3379942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Photography background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">
              Capturing Life's Precious Moments
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Professional photography services for graduations, family portraits, corporate events, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gallery" className="btn btn-primary">
                View Our Work
              </Link>
              <Link to="/contact" className="btn btn-outline-white">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Our Photography Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of professional photography services to meet your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link to={service.link} className="text-primary-600 font-medium flex items-center">
                    Learn More <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">About DXM Productions</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, DXM Productions is a professional photography studio dedicated to capturing life's most precious moments with creativity, skill, and passion.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team of experienced photographers specializes in graduation photography, family portraits, corporate events, and professional headshots.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="btn btn-primary">
                  Learn More About Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3379942/pexels-photo-3379942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Photographer at work" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-2xl font-bold">10+</p>
                <p className="text-sm">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Instagram Feed Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us on Instagram</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Stay updated with our latest work and behind-the-scenes moments.
            </p>
            <InstagramFeed />
            <div className="mt-8">
              <a 
                href="https://www.instagram.com/dxmproductions/tagged/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Follow @dxmproductions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <BacklinkPartners />

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Ready to Capture Your Special Moments?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Book a photography session with DXM Productions today and let us help you preserve your memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/pricing" className="btn btn-outline-white">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
