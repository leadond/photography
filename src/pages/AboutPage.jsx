import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function AboutPage() {
  const team = [
    {
      name: 'Derrick Mitchell',
      role: 'Lead Photographer & Founder',
      bio: 'With over 10 years of experience, Derrick has a passion for capturing authentic moments and creating stunning visual narratives. His work has been featured in several publications and he specializes in graduation, event, and portrait photography.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Sarah Johnson',
      role: 'Senior Photographer',
      bio: 'Sarah brings a creative eye and technical expertise to every shoot. With a background in fine art photography, she excels at fashion and portrait photography, creating images that tell compelling stories.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Event Specialist',
      bio: 'Michael has photographed hundreds of events, from corporate conferences to weddings. His ability to capture candid moments while maintaining a professional presence makes him a client favorite.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About DXM Productions</h1>
          <p className="text-xl max-w-3xl mx-auto">Professional photography services in Houston, TX specializing in capturing life's most precious moments.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3062545/pexels-photo-3062545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Photography studio" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2013, DXM Productions began with a simple mission: to capture authentic moments and create lasting memories through exceptional photography.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a passion project by Derrick Mitchell has grown into a full-service photography studio serving clients throughout Houston and beyond. Our team of talented photographers brings technical expertise and creative vision to every shoot, ensuring that each client receives personalized service and stunning images.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we've had the privilege of photographing thousands of special moments—from graduations and corporate events to fashion shoots and family portraits. We take pride in our ability to tell visual stories that capture the essence of each unique occasion.
              </p>
              <p className="text-gray-600">
                Today, DXM Productions continues to grow, but our commitment to quality, creativity, and customer satisfaction remains unchanged. We look forward to helping you preserve your special moments for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-accent mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-heart text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Passion</h3>
              <p className="text-gray-600">
                We're passionate about photography and it shows in our work. We approach each session with enthusiasm and creativity, constantly seeking new ways to capture beautiful, authentic moments.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-star text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Quality</h3>
              <p className="text-gray-600">
                We're committed to excellence in every aspect of our work, from the equipment we use to the final edited images. We invest in professional gear and continuous education to ensure the highest quality results.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-users text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Connection</h3>
              <p className="text-gray-600">
                We believe that great photography comes from genuine connections. We take the time to understand your vision and needs, creating a comfortable environment that allows authentic moments to shine through.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Ready to capture your special moments? Contact us today to discuss your photography needs.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/contact" className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition text-lg font-medium">
              Contact Us
            </Link>
            <Link to="/gallery" className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition text-lg font-medium">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default AboutPage
