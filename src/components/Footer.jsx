import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      ref={ref}
      className="bg-gray-900 text-white pt-16 pb-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">DXM Productions</h3>
            <p className="text-gray-400 mb-4">
              Professional photography services capturing life's most precious moments with artistry and authenticity.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon="IG" href="#" />
              <SocialLink icon="FB" href="#" />
              <SocialLink icon="TW" href="#" />
              <SocialLink icon="YT" href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/gallery" label="Gallery" />
              <FooterLink to="/services" label="Services" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
              <FooterLink to="/booking" label="Book a Session" />
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <FooterLink to="/services" label="Wedding Photography" />
              <FooterLink to="/services" label="Portrait Sessions" />
              <FooterLink to="/services" label="Event Coverage" />
              <FooterLink to="/services" label="Commercial Photography" />
              <FooterLink to="/services" label="Family Portraits" />
              <FooterLink to="/services" label="Product Photography" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">📍</span>
                <span>123 Photography Lane<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">📞</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✉️</span>
                <span>info@dxmproductions.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">⏰</span>
                <span>Mon-Fri: 9am-5pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest work, special offers, and photography tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} DXM Productions. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

// Footer Link Component
const FooterLink = ({ to, label }) => (
  <li>
    <Link 
      to={to}
      className="text-gray-400 hover:text-white transition-colors"
    >
      {label}
    </Link>
  </li>
);

// Social Link Component
const SocialLink = ({ icon, href }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
