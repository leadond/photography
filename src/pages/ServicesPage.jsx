import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Photography Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional photography services tailored to your specific needs and vision.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-16">
          {services.map((service, index) => (
            <ServiceSection 
              key={service.id}
              service={service}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Pricing Plans</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect photography package that fits your needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our photography services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Photography Session?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your photography needs and schedule your session.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/booking" 
              className="px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Book Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Section Component
const ServiceSection = ({ service, index, isEven }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.div 
          className="rounded-lg overflow-hidden shadow-lg"
          variants={itemVariants}
        >
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <motion.span 
          className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4"
          variants={itemVariants}
        >
          {service.category}
        </motion.span>
        
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          variants={itemVariants}
        >
          {service.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 mb-6"
          variants={itemVariants}
        >
          {service.description}
        </motion.p>
        
        <motion.ul 
          className="space-y-3 mb-6"
          variants={itemVariants}
        >
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </motion.ul>
        
        <motion.div variants={itemVariants}>
          <Link 
            to="/booking" 
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
          >
            Book This Service
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Pricing Card Component
const PricingCard = ({ plan, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.featured ? 'border-2 border-blue-500 relative' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {plan.featured && (
        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
          {plan.period && <span className="text-gray-500 ml-2">{plan.period}</span>}
        </div>
        
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          to="/booking" 
          className={`block text-center py-3 rounded-md font-medium transition-colors ${
            plan.featured 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Select Plan
        </Link>
      </div>
    </motion.div>
  );
};

// FAQ Item Component
const FaqItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
        <svg 
          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <motion.div 
        className="mt-2 overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-600">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
};

// Sample data
const services = [
  {
    id: 1,
    title: "Wedding Photography",
    category: "Wedding",
    description: "Capture the magic and emotion of your special day with our professional wedding photography services. We focus on both candid moments and traditional portraits to tell the complete story of your wedding day.",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Full-day coverage (up to 10 hours)",
      "Two professional photographers",
      "Engagement photo session",
      "Online gallery with high-resolution images",
      "Custom wedding album",
      "Unlimited consultations before the event"
    ]
  },
  {
    id: 2,
    title: "Portrait Photography",
    category: "Portrait",
    description: "Our portrait photography services are designed to capture your unique personality and style. Whether for professional headshots, family portraits, or personal branding, we create images that truly represent you.",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Indoor or outdoor sessions available",
      "Professional lighting and equipment",
      "Multiple outfit changes",
      "Retouching and editing included",
      "Digital and print options available",
      "Quick turnaround time"
    ]
  },
  {
    id: 3,
    title: "Event Photography",
    category: "Event",
    description: "From corporate gatherings to special celebrations, our event photography services ensure that every important moment is captured. We work discreetly to document your event while ensuring all key moments are preserved.",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Flexible hourly coverage",
      "Fast turnaround for time-sensitive events",
      "Both candid and posed photography",
      "Corporate branding integration",
      "On-site printing options available",
      "Professional editing and delivery"
    ]
  },
  {
    id: 4,
    title: "Commercial Photography",
    category: "Commercial",
    description: "Elevate your brand with our professional commercial photography services. We create high-quality images for advertising, websites, social media, and product catalogs that showcase your products or services in the best light.",
    image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Product photography with styling",
      "Architectural and interior photography",
      "Food and beverage photography",
      "Corporate headshots and team photos",
      "Location scouting services",
      "Commercial usage rights included"
    ]
  }
];

const pricingPlans = [
  {
    name: "Basic Package",
    description: "Perfect for individuals and small events",
    price: 299,
    period: "per session",
    features: [
      "2-hour photo session",
      "One location",
      "25 edited digital images",
      "Online gallery",
      "Personal use rights"
    ],
    featured: false
  },
  {
    name: "Premium Package",
    description: "Ideal for special events and families",
    price: 599,
    period: "per session",
    features: [
      "4-hour photo session",
      "Multiple locations",
      "50 edited digital images",
      "Online gallery",
      "Personal use rights",
      "One 11x14 print"
    ],
    featured: true
  },
  {
    name: "Professional Package",
    description: "Comprehensive coverage for important events",
    price: 999,
    period: "per event",
    features: [
      "Full-day coverage (8 hours)",
      "Multiple locations",
      "100+ edited digital images",
      "Online gallery",
      "Personal use rights",
      "Custom photo album"
    ],
    featured: false
  }
];

const faqs = [
  {
    question: "How far in advance should I book my photography session?",
    answer: "We recommend booking at least 4-6 weeks in advance for portrait sessions and 6-12 months in advance for weddings. However, we sometimes have last-minute availability, so don't hesitate to inquire about your date."
  },
  {
    question: "What happens if it rains on the day of an outdoor photoshoot?",
    answer: "If weather conditions are unfavorable for an outdoor session, we'll work with you to either reschedule for another day or move to an indoor location. We always have backup plans for weather-related issues."
  },
  {
    question: "How long does it take to receive my photos after the session?",
    answer: "For portrait sessions, you can expect to receive your edited photos within 2 weeks. For weddings and larger events, the turnaround time is typically 4-6 weeks. Rush delivery is available for an additional fee."
  },
  {
    question: "Do you provide raw, unedited files?",
    answer: "We do not provide raw, unedited files as part of our packages. Our editing process is an essential part of our photography style and final product. However, we're happy to discuss specific editing preferences before your session."
  },
  {
    question: "Can I purchase additional prints or digital images beyond my package?",
    answer: "Yes, additional prints and digital images are available for purchase. We offer à la carte options as well as print packages that can be added to any photography package."
  }
];

export default ServicesPage;
