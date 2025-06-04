import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">DXM Productions</h3>
            <p className="mb-4">Professional photography services in Houston, TX specializing in graduations, proms, senior photos, headshots, business events, parties, fashion and modeling.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition">Portfolio</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Services</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Graduation Photography</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Portrait Photography</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Event Photography</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Fashion Photography</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Business Photography</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-medium mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>Houston, TX</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-2"></i>
                <span>832-924-3668</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-2"></i>
                <span>Derrick@dxmproductions.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-globe mt-1 mr-2"></i>
                <span>www.dxmproductions.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} DXM Productions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
