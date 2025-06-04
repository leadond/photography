import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Pricing Plans</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the perfect photography package that fits your needs and budget.
          </p>
        </div>
      </div>

      {/* Pricing Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <CategoryButton 
              label="All Services" 
              isActive={selectedCategory === 'all'} 
              onClick={() => setSelectedCategory('all')}
            />
            <CategoryButton 
              label="Wedding" 
              isActive={selectedCategory === 'wedding'} 
              onClick={() => setSelectedCategory('wedding')}
            />
            <CategoryButton 
              label="Portrait" 
              isActive={selectedCategory === 'portrait'} 
              onClick={() => setSelectedCategory('portrait')}
            />
            <CategoryButton 
              label="Event" 
              isActive={selectedCategory === 'event'} 
              onClick={() => setSelectedCategory('event')}
            />
            <CategoryButton 
              label="Commercial" 
              isActive={selectedCategory === 'commercial'} 
              onClick={() => setSelectedCategory('commercial')}
            />
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center mb-12">
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <div 
              className="relative w-14 h-8 bg-gray-200 rounded-full cursor-pointer"
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div 
                className={`absolute top-1 w-6 h-6 rounded-full bg-blue-500 transition-all duration-300 ${
                  billingCycle === 'yearly' ? 'left-7' : 'left-1'
                }`}
              ></div>
            </div>
            <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Yearly <span className="text-green-500 text-sm font-medium">Save 20%</span>
            </span>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans
              .filter(plan => selectedCategory === 'all' || plan.category === selectedCategory)
              .map((plan, index) => (
                <PricingCard 
                  key={plan.id} 
                  plan={plan} 
                  index={index}
                  billingCycle={billingCycle}
                />
              ))}
          </div>

          {/* No Plans Message */}
          {pricingPlans.filter(plan => selectedCategory === 'all' || plan.category === selectedCategory).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No pricing plans available for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our pricing and packages.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
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
      </section>
    </div>
  );
};

// Category Button Component
const CategoryButton = ({ label, isActive, onClick }) => (
  <button
    className={`px-6 py-2 rounded-full transition-colors ${
      isActive
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Pricing Card Component
const PricingCard = ({ plan, index, billingCycle }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Calculate price based on billing cycle
  const price = billingCycle === 'yearly' 
    ? Math.round(plan.price * 12 * 0.8) 
    : plan.price;

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
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">{plan.icon}</span>
          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        </div>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500 ml-2">
            {billingCycle === 'yearly' ? '/year' : '/month'}
          </span>
          {billingCycle === 'yearly' && (
            <span className="block text-green-500 text-sm mt-1">Save ${Math.round(plan.price * 12 * 0.2)} per year</span>
          )}
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
const pricingPlans = [
  {
    id: 1,
    name: "Basic Portrait",
    icon: "📸",
    description: "Perfect for individuals and small families",
    price: 99,
    category: "portrait",
    features: [
      "1-hour photo session",
      "One location",
      "20 edited digital images",
      "Online gallery",
      "Personal use rights"
    ],
    featured: false
  },
  {
    id: 2,
    name: "Premium Portrait",
    icon: "📸",
    description: "Ideal for extended families and multiple looks",
    price: 199,
    category: "portrait",
    features: [
      "2-hour photo session",
      "Two locations",
      "40 edited digital images",
      "Online gallery",
      "Personal use rights",
      "One 11x14 print"
    ],
    featured: true
  },
  {
    id: 3,
    name: "Basic Wedding",
    icon: "💍",
    description: "Essential coverage for intimate weddings",
    price: 999,
    category: "wedding",
    features: [
      "6 hours of coverage",
      "One photographer",
      "200+ edited digital images",
      "Online gallery",
      "Personal use rights"
    ],
    featured: false
  },
  {
    id: 4,
    name: "Premium Wedding",
    icon: "💍",
    description: "Comprehensive coverage for your special day",
    price: 1999,
    category: "wedding",
    features: [
      "10 hours of coverage",
      "Two photographers",
      "Engagement session",
      "500+ edited digital images",
      "Online gallery",
      "Custom wedding album"
    ],
    featured: true
  },
  {
    id: 5,
    name: "Corporate Event",
    icon: "🎭",
    description: "Professional coverage for business events",
    price: 599,
    category: "event",
    features: [
      "4 hours of coverage",
      "One photographer",
      "100+ edited digital images",
      "Online gallery",
      "Commercial use rights"
    ],
    featured: false
  },
  {
    id: 6,
    name: "Product Photography",
    icon: "📦",
    description: "High-quality images for your products",
    price: 399,
    category: "commercial",
    features: [
      "Up to 10 products",
      "Multiple angles per product",
      "White background setup",
      "Basic retouching",
      "Commercial use rights"
    ],
    featured: false
  }
];

const faqs = [
  {
    question: "What's included in the session fee?",
    answer: "The session fee includes the photographer's time and talent, basic retouching of selected images, and an online gallery. Prints, albums, and additional digital files may be purchased separately depending on your package."
  },
  {
    question: "How do I book a photography session?",
    answer: "You can book a session by selecting your preferred package, choosing an available date and time through our online booking system, and making a deposit payment to secure your reservation."
  },
  {
    question: "Is a deposit required?",
    answer: "Yes, a 50% non-refundable deposit is required to secure your booking date. The remaining balance is due one week before the scheduled session or event."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made more than 30 days before the scheduled session will receive a 50% refund of the deposit. Cancellations within 30 days of the scheduled session will forfeit the deposit. Rescheduling may be available subject to our availability."
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes, we understand that every client has unique needs. If our standard packages don't meet your requirements, please contact us to discuss a custom package tailored to your specific needs and budget."
  },
  {
    question: "How long does it take to receive my photos?",
    answer: "For portrait sessions, you can expect to receive your edited photos within 2 weeks. For weddings and larger events, the turnaround time is typically 4-6 weeks. Rush delivery is available for an additional fee."
  }
];

export default PricingPage;
