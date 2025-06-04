import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or ready to book a session? Get in touch with our team.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ContactInfoCard 
              icon={<FiMapPin />}
              title="Our Location"
              details={["123 Photography Lane", "New York, NY 10001"]}
              index={0}
            />
            <ContactInfoCard 
              icon={<FiPhone />}
              title="Phone Number"
              details={["(555) 123-4567", "Mon-Fri, 9am-5pm"]}
              index={1}
            />
            <ContactInfoCard 
              icon={<FiMail />}
              title="Email Address"
              details={["info@lenscraft.com", "support@lenscraft.com"]}
              index={2}
            />
            <ContactInfoCard 
              icon={<FiClock />}
              title="Working Hours"
              details={["Monday-Friday: 9am-5pm", "Saturday: 10am-3pm"]}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm 
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              formStatus={formStatus}
              isSubmitting={isSubmitting}
            />
            
            {/* Map and Additional Info */}
            <div>
              <MapSection />
              <AdditionalInfo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Info Card Component
const ContactInfoCard = ({ icon, title, details, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg p-6 shadow-md text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500 text-xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
      {details.map((detail, i) => (
        <p key={i} className="text-gray-600">{detail}</p>
      ))}
    </motion.div>
  );
};

// Contact Form Component
const ContactForm = ({ formData, handleChange, handleSubmit, formStatus, isSubmitting }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg p-8 shadow-md"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
      
      {formStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a subject</option>
              <option value="booking">Booking Inquiry</option>
              <option value="pricing">Pricing Information</option>
              <option value="availability">Check Availability</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-blue-500 text-white rounded-md font-medium transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </motion.div>
  );
};

// Map Section Component
const MapSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg p-4 shadow-md mb-8"
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
        {/* Placeholder for map - in a real app, you'd use Google Maps or similar */}
        <div className="w-full h-full flex items-center justify-center bg-gray-300">
          <span className="text-gray-600">Map Location</span>
        </div>
      </div>
    </motion.div>
  );
};

// Additional Info Component
const AdditionalInfo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg p-8 shadow-md"
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Additional Information</h3>
      <p className="text-gray-600 mb-4">
        For urgent inquiries, please call us directly at (555) 123-4567. We strive to respond to all email inquiries within 24 hours during business days.
      </p>
      <p className="text-gray-600 mb-4">
        If you're interested in booking a session, we recommend contacting us at least 2-3 weeks in advance to ensure availability, especially during peak seasons.
      </p>
      <div className="flex space-x-4 mt-6">
        <a 
          href="#" 
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
        >
          IG
        </a>
        <a 
          href="#" 
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
        >
          FB
        </a>
        <a 
          href="#" 
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
        >
          TW
        </a>
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
const faqs = [
  {
    question: "How do I book a photography session?",
    answer: "You can book a session by filling out our contact form, calling us directly, or using our online booking system. We'll confirm your date and time based on availability and provide you with all necessary information."
  },
  {
    question: "What should I wear for my portrait session?",
    answer: "We recommend wearing solid colors and avoiding busy patterns. Coordinate colors with other participants but don't match exactly. We'll provide a detailed style guide after booking to help you prepare."
  },
  {
    question: "How long does it take to receive my photos?",
    answer: "For portrait sessions, you can expect to receive your edited photos within 2 weeks. For weddings and larger events, the turnaround time is typically 4-6 weeks. Rush delivery is available for an additional fee."
  },
  {
    question: "Do you travel for photography sessions?",
    answer: "Yes, we offer travel services for photography sessions. Local travel within 30 miles is included in our standard packages. For destinations beyond that, additional travel fees may apply."
  },
  {
    question: "What happens if it rains on the day of my outdoor session?",
    answer: "If weather conditions are unfavorable for an outdoor session, we'll work with you to either reschedule for another day or move to an indoor location. We always have backup plans for weather-related issues."
  }
];

export default ContactPage;
