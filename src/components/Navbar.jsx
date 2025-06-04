import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              DXM Productions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                label={link.label} 
                scrolled={scrolled}
                currentPath={location.pathname}
              />
            ))}
            
            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className={`flex items-center space-x-1 ${
                    scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-300'
                  }`}
                >
                  <span>Account</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/my-bookings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`${
                    scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-300'
                  }`}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} 
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={`py-2 ${
                      location.pathname === link.path 
                        ? 'text-blue-500 font-medium' 
                        : 'text-gray-900 hover:text-blue-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Auth Links for Mobile */}
                {isAuthenticated ? (
                  <>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Signed in as: {user?.email}
                      </p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="py-2 text-gray-900 hover:text-blue-500"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/my-bookings" 
                      className="py-2 text-gray-900 hover:text-blue-500"
                    >
                      My Bookings
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="py-2 text-left text-red-600 hover:text-red-700"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                    <Link 
                      to="/login" 
                      className="py-2 text-gray-900 hover:text-blue-500"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/register" 
                      className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// NavLink Component
const NavLink = ({ to, label, scrolled, currentPath }) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to}
      className={`relative ${
        scrolled 
          ? 'text-gray-900 hover:text-blue-600' 
          : 'text-white hover:text-blue-300'
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          className={`absolute bottom-0 left-0 w-full h-0.5 ${scrolled ? 'bg-blue-500' : 'bg-white'}`}
          layoutId="navbar-indicator"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

// Navigation Links
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/booking', label: 'Book Now' }
];

export default Navbar;
