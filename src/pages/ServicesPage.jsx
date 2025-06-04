import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'

function ServicesPage() {
  const { toggleModal } = useOutletContext()

  const services = [
    {
      id: 'graduation',
      title: 'Graduation Photography',
      icon: 'fas fa-user-graduate',
      description: 'Capture your academic achievements with professional graduation photos that celebrate your success.',
      features: [
        'Individual portraits',
        'Group photos with friends & family',
        'Ceremony coverage',
        'Cap and gown portraits',
        'Custom graduation announcements',
        'Digital and print packages available'
      ],
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'portrait',
      title: 'Portrait Photography',
      icon: 'fas fa-user',
      description: 'Professional headshots and portraits for individuals, families, and businesses.',
      features: [
        'Corporate headshots',
        'Senior portraits',
        'Personal branding sessions',
        'Family portraits',
        'Studio or location options',
        'Professional retouching included'
      ],
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'event',
      title: 'Event Photography',
      icon: 'fas fa-glass-cheers',
      description: 'Comprehensive coverage of corporate events, parties, and special occasions.',
      features: [
        'Business conferences',
        'Proms and formal events',
        'Private parties',
        'Award ceremonies',
        'Candid and posed photography',
        'Quick turnaround time'
      ],
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'fashion',
      title: 'Fashion Photography',
      icon: 'fas fa-tshirt',
      description: 'Creative fashion and modeling photography for portfolios and publications.',
      features: [
        'Model portfolio development',
        'Editorial style shoots',
        'Commercial fashion',
        'Lookbook creation',
        'Studio or location options',
        'Professional styling available'
      ],
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'business',
      title: 'Business Photography',
      icon: 'fas fa-building',
      description: 'Professional photography services for businesses and corporate needs.',
      features: [
        'Team photos',
        'Product photography',
        'Corporate events',
        'Office and workspace photos',
        'Website and marketing content',
        'Branding consistency'
      ],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'custom',
      title: 'Custom Photography',
      icon: 'fas fa-camera',
      description: 'Tailored photography services to meet your specific requirements.',
      features: [
        'Customized sessions',
        'Special projects',
        'Unique photography needs',
        'Collaborative planning',
        'Flexible scheduling',
        'Personalized approach'
      ],
      image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Photography Services</h1>
          <p className="text-xl max-w-3xl mx-auto">Comprehensive photography services tailored to your specific needs.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <i className={`${service.icon} text-2xl text-accent`}></i>
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <i className="fas fa-check text-accent mr-2"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => toggleModal('bookingModal', true)}
                    className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Book Your Session?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Contact us today to schedule your photography session and capture your special moments.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={() => toggleModal('bookingModal', true)}
              className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition text-lg font-medium"
            >
              Book Now
            </button>
            <Link to="/pricing" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-gray-800 transition text-lg font-medium">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default ServicesPage
