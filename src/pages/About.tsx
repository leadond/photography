import { Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import PageTransition from '../components/PageTransition'
import BacklinkPartners from '../components/BacklinkPartners'
import VideoShowcase from '../components/VideoShowcase'

const AboutPage = () => {
  const team = [
    {
      name: 'Derrick Leadon',
      role: 'Founder & Lead Photographer',
      bio: "With over 15 years of experience in photography, Derrick brings passion and technical excellence to every shoot."
    },
    {
      name: 'Sarah Johnson',
      role: 'Senior Photographer',
      bio: 'Sarah specializes in portrait and family photography, with a unique ability to capture genuine emotions and create lasting memories.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Event Photographer',
      bio: 'Michael excels at corporate events and large gatherings, ensuring every important moment is documented with professionalism and creativity.'
    },
    {
      name: 'Emily Chen',
      role: 'Studio Manager',
      bio: 'Emily oversees all studio operations and client relations, ensuring a seamless experience from booking to final delivery.'
    }
  ]

  const values = [
    {
      title: 'Quality',
      description: 'We never compromise on the quality of our work, using professional equipment and techniques to deliver exceptional results.'
    },
    {
      title: 'Creativity',
      description: 'We approach each project with fresh eyes and creative vision, ensuring unique and personalized photography.'
    },
    {
      title: 'Professionalism',
      description: 'From our communication to our appearance, we maintain the highest standards of professionalism in everything we do.'
    },
    {
      title: 'Customer Satisfaction',
      description: 'Your happiness is our priority. We work closely with you to understand your vision and exceed your expectations.'
    }
  ]

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">About DXM Productions</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're passionate about capturing your most precious moments with creativity and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  My name is Derrick Leadon, with DXM Productions in Houston, Texas. I am an IT professional by trade and a photographer by passion. I originally began my career in videography and after over 10 years in video, I decided to take an interest in still photography. It has turned out to be one of the best decisions of my life.
                </p>
                <p>
                  I love to take photos and I have been capturing still photography for over 15 years. My photoshoots are always laid back, relaxed and my clients are treated like family. My favorite style of photography is portrait, although I usually focus on model photoshoots, fashion shows, parties and events.
                </p>
                <p>
                  When you book a shoot with DXM Productions, be ready to have a great time. There are thousands of Nikon and Canon photographers, but I choose to stand out by using all Sony cameras. Let DXM Productions shoot your next photoshoot or event and experience the Sony difference.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/gallery" className="btn btn-primary">
                  View Our Work
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Photography studio" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <VideoShowcase 
        videoUrl="https://www.facebook.com/dleadon/videos/10216689953548202/?ref=embed_video&t=63"
        title="See Our Work in Action"
        description="Watch this showcase of our photography style and approach to capturing special moments."
      />

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At DXM Productions, our work is guided by a set of core values that define who we are and how we serve our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The talented professionals behind DXM Productions who bring your vision to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Professional Equipment</h2>
              <p className="text-lg text-gray-600 mb-6">
                At DXM Productions, we invest in top-of-the-line photography equipment to ensure the highest quality results for our clients.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">Sony Professional Cameras</h3>
                    <p className="text-gray-600">We exclusively use Sony's professional camera lineup for exceptional image quality and performance.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">Premium Lenses</h3>
                    <p className="text-gray-600">Our collection of Sony G Master and Zeiss lenses allows us to capture every detail with precision.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">Studio Lighting</h3>
                    <p className="text-gray-600">Professional lighting equipment for studio and on-location shoots ensures perfect illumination.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">Post-Processing Software</h3>
                    <p className="text-gray-600">We use industry-standard editing software to perfect every image we deliver.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Professional camera" 
                className="rounded-lg shadow-md w-full h-auto"
              />
              <img 
                src="https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Photography equipment" 
                className="rounded-lg shadow-md w-full h-auto"
              />
              <img 
                src="https://images.pexels.com/photos/3800516/pexels-photo-3800516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Studio lighting" 
                className="rounded-lg shadow-md w-full h-auto"
              />
              <img 
                src="https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Photography lenses" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <BacklinkPartners />

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Let DXM Productions help you capture your special moments with our professional photography services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/gallery" className="btn btn-outline-white">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default AboutPage
