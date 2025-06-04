import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [location])
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold font-serif ${scrolled || isOpen ? 'text-primary-600' : 'text-white'}`}>
            DXM Productions
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" scrolled={scrolled} />
          <NavLink to="/gallery" label="Gallery" scrolled={scrolled} />
          <NavLink to="/services" label="Services" scrolled={scrolled} />
          <NavLink to="/pricing" label="Pricing" scrolled={scrolled} />
          <NavLink to="/about" label="About" scrolled={scrolled} />
          <NavLink to="/contact" label="Contact" scrolled={scrolled} />
          
          {user ? (
            <div className="relative group">
              <button 
                className={`flex items-center font-medium ${
                  scrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                }`}
              >
                My Account
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-primary-50 hover:text-primary-600">
                  Dashboard
                </Link>
                <Link to="/my-albums" className="block px-4 py-2 text-gray-800 hover:bg-primary-50 hover:text-primary-600">
                  My Albums
                </Link>
                <Link to="/my-bookings" className="block px-4 py-2 text-gray-800 hover:bg-primary-50 hover:text-primary-600">
                  My Bookings
                </Link>
                <button 
                  onClick={signOut}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-primary-50 hover:text-primary-600"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-md font-medium ${
                scrolled 
                  ? 'bg-primary-600 text-white hover:bg-primary-700' 
                  : 'bg-white text-primary-600 hover:bg-gray-100'
              }`}
            >
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 ${scrolled || isOpen ? 'text-gray-800' : 'text-white'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <MobileNavLink to="/" label="Home" />
              <MobileNavLink to="/gallery" label="Gallery" />
              <MobileNavLink to="/services" label="Services" />
              <MobileNavLink to="/pricing" label="Pricing" />
              <MobileNavLink to="/about" label="About" />
              <MobileNavLink to="/contact" label="Contact" />
              
              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-4"></div>
                  <MobileNavLink to="/dashboard" label="Dashboard" />
                  <MobileNavLink to="/my-albums" label="My Albums" />
                  <MobileNavLink to="/my-bookings" label="My Bookings" />
                  <button 
                    onClick={signOut}
                    className="block w-full text-left py-2 text-gray-800 hover:text-primary-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block w-full text-center py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

interface NavLinkProps {
  to: string
  label: string
  scrolled: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, scrolled }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link 
      to={to} 
      className={`relative font-medium transition-colors duration-300 ${
        scrolled 
          ? `text-gray-800 hover:text-primary-600 ${isActive ? 'text-primary-600' : ''}` 
          : `text-white hover:text-primary-200 ${isActive ? 'text-primary-200' : ''}`
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="navbar-indicator"
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${scrolled ? 'bg-primary-600' : 'bg-white'}`}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
}

interface MobileNavLinkProps {
  to: string
  label: string
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link 
      to={to} 
      className={`block py-2 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-800 hover:text-primary-600'}`}
    >
      {label}
    </Link>
  )
}

export default Navbar
