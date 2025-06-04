import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service) => {
    setBookingData(prev => ({ ...prev, service }));
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Booking request submitted successfully!');
      setIsSubmitting(false);
      setStep(4); // Move to confirmation step
    }, 1500);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Book a Photography Session</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule your professional photography session in just a few simple steps.
          </p>
        </div>
      </div>

      {/* Booking Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <ProgressSteps currentStep={step} />
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            {step === 1 && (
              <ServiceSelection onSelect={handleServiceSelect} />
            )}
            
            {step === 2 && (
              <DateTimeSelection 
                bookingData={bookingData} 
                handleChange={handleChange} 
                goBack={goBack}
                onNext={() => setStep(3)}
              />
            )}
            
            {step === 3 && (
              <PersonalDetails 
                bookingData={bookingData} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit}
                goBack={goBack}
                isSubmitting={isSubmitting}
              />
            )}
            
            {step === 4 && (
              <BookingConfirmation bookingData={bookingData} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Progress Steps Component
const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Select Service' },
    { number: 2, label: 'Choose Date & Time' },
    { number: 3, label: 'Your Details' },
    { number: 4, label: 'Confirmation' }
  ];

  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-col items-center relative">
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={`absolute top-4 w-full h-1 left-1/2 ${
              currentStep > step.number ? 'bg-blue-500' : 'bg-gray-300'
            }`}></div>
          )}
          
          {/* Step Circle */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
            currentStep >= step.number 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-300 text-gray-600'
          }`}>
            {step.number}
          </div>
          
          {/* Step Label */}
          <span className={`text-sm mt-2 ${
            currentStep >= step.number 
              ? 'text-blue-500 font-medium' 
              : 'text-gray-500'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// Service Selection Component
const ServiceSelection = ({ onSelect }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Photography Service</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(service.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-500 font-medium">${service.price}</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Select
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Date and Time Selection Component
const DateTimeSelection = ({ bookingData, handleChange, goBack, onNext }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    onNext();
  };

  // Get current date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate max date (6 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Date and Time</h2>
      
      <form onSubmit={handleNextStep}>
        <div className="mb-6">
          <label htmlFor="date" className="block text-gray-700 mb-2">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            min={today}
            max={maxDateStr}
            value={bookingData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="time" className="block text-gray-700 mb-2">Preferred Time</label>
          <select
            id="time"
            name="time"
            value={bookingData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a time</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="location" className="block text-gray-700 mb-2">Location Preference</label>
          <select
            id="location"
            name="location"
            value={bookingData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a location</option>
            <option value="studio">Our Studio</option>
            <option value="outdoor">Outdoor Location</option>
            <option value="client">Client's Location</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="notes" className="block text-gray-700 mb-2">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={bookingData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Personal Details Component
const PersonalDetails = ({ bookingData, handleChange, handleSubmit, goBack, isSubmitting }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookingData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong>Service:</strong> {getServiceName(bookingData.service)}</p>
            <p><strong>Date:</strong> {bookingData.date}</p>
            <p><strong>Time:</strong> {bookingData.time}</p>
            <p><strong>Location:</strong> {getLocationName(bookingData.location)}</p>
            {bookingData.notes && <p><strong>Notes:</strong> {bookingData.notes}</p>}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-500 text-white rounded-md transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Booking'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Booking Confirmation Component
const BookingConfirmation = ({ bookingData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for booking a photography session with us. We've sent a confirmation email to {bookingData.email} with all the details.
        </p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8 text-left max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
        <p className="mb-2"><strong>Service:</strong> {getServiceName(bookingData.service)}</p>
        <p className="mb-2"><strong>Date:</strong> {bookingData.date}</p>
        <p className="mb-2"><strong>Time:</strong> {bookingData.time}</p>
        <p className="mb-2"><strong>Location:</strong> {getLocationName(bookingData.location)}</p>
        <p className="mb-2"><strong>Name:</strong> {bookingData.name}</p>
        <p className="mb-2"><strong>Email:</strong> {bookingData.email}</p>
        <p className="mb-2"><strong>Phone:</strong> {bookingData.phone}</p>
        {bookingData.notes && <p><strong>Notes:</strong> {bookingData.notes}</p>}
      </div>
      
      <p className="text-gray-600 mb-8">
        Our team will contact you shortly to confirm your booking and discuss any additional details.
      </p>
      
      <div className="flex justify-center space-x-4">
        <Link 
          to="/" 
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Return to Home
        </Link>
        <Link 
          to="/contact" 
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </motion.div>
  );
};

// Helper functions
const getServiceName = (serviceId) => {
  const service = services.find(s => s.id === serviceId);
  return service ? service.title : serviceId;
};

const getLocationName = (locationId) => {
  const locations = {
    'studio': 'Our Studio',
    'outdoor': 'Outdoor Location',
    'client': 'Client\'s Location'
  };
  return locations[locationId] || locationId;
};

// Sample data
const services = [
  {
    id: 'portrait',
    title: 'Portrait Session',
    description: 'Professional portrait photography for individuals, couples, or families.',
    price: 199,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Comprehensive coverage of your special day with multiple photographers.',
    price: 1499,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'event',
    title: 'Event Coverage',
    description: 'Professional photography for corporate events, parties, and special occasions.',
    price: 599,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    description: 'High-quality images for advertising, websites, and marketing materials.',
    price: 799,
    image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default BookingPage;
