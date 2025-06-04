import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: 'new'
          }
        ])

      if (error) throw error

      toast.success('Your message has been sent successfully. We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast.error('There was an error sending your message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">Get in touch to discuss your photography needs or book a session.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                      required 
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                    required 
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-accent text-white rounded-md hover:bg-amber-600 transition"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-accent"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Location</h3>
                    <p className="text-gray-600">Houston, TX</p>
                    <p className="text-gray-600">Available for travel throughout Texas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-accent"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="text-gray-600">832-924-3668</p>
                    <p className="text-gray-600">Monday - Friday, 9am - 6pm</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-accent"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600">Derrick@dxmproductions.com</p>
                    <p className="text-gray-600">We'll respond within 24-48 hours</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-800 font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-800 font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-800 font-medium">Closed</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-600">
                  <i className="fas fa-info-circle mr-2 text-accent"></i>
                  Photo sessions are available outside of business hours by appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">How do I book a photography session?</h3>
              <p className="text-gray-600">You can book a session by filling out the contact form above, calling us directly, or using the "Book Now" button on our website. We'll get back to you within 24-48 hours to discuss your needs and schedule your session.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">What areas do you serve?</h3>
              <p className="text-gray-600">We're based in Houston, TX, but we serve the entire Houston metropolitan area. We're also available for travel throughout Texas for an additional fee.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">How far in advance should I book?</h3>
              <p className="text-gray-600">For portrait sessions, we recommend booking 2-4 weeks in advance. For events and weddings, we suggest booking 3-6 months in advance to ensure availability, especially during peak seasons (spring and fall).</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Do you offer rush delivery for photos?</h3>
              <p className="text-gray-600">Yes, we offer rush delivery options for an additional fee. Standard delivery is 2-3 weeks for portrait sessions and 3-4 weeks for events, but we can expedite this process if needed.</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default ContactPage
