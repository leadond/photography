import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar({ toggleModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-primary">DXM</span>
            <span className="text-xl font-light text-secondary">Productions</span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`text-gray-600 hover:text-accent transition ${location.pathname === '/' ? 'text-accent' : ''}`}>Home</Link>
            <Link to="/gallery" className={`text-gray-600 hover:text-accent transition ${location.pathname.includes('/gallery') ? 'text-accent' : ''}`}>Portfolio</Link>
            <Link to="/services" className={`text-gray-600 hover:text-accent transition ${location.pathname === '/services' ? 'text-accent' : ''}`}>Services</Link>
            <Link to="/pricing" className={`text-gray-600 hover:text-accent transition ${location.pathname === '/pricing' ? 'text-accent' : ''}`}>Pricing</Link>
            <Link to="/contact" className={`text-gray-600 hover:text-accent transition ${location.pathname === '/contact' ? 'text-accent' : ''}`}>Contact</Link>
            
            {user ? (
              <div className="relative group">
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition flex items-center">
                  <span>Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <div className="py-1">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <Link to="/my-albums" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Albums</Link>
                    <Link to="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                    {isAdmin() && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Portal</Link>
                    )}
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => toggleModal('loginModal', true)} className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition">Login</button>
            )}
            
            <button onClick={() => toggleModal('bookingModal', true)} className="px-4 py-2 bg-accent text-white rounded hover:bg-amber-600 transition">Book Now</button>
          </div>
          <button className="md:hidden text-gray-600" onClick={toggleMobileMenu}>
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>Home</Link>
              <Link to="/gallery" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>Portfolio</Link>
              <Link to="/services" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>Services</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>Contact</Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>Dashboard</Link>
                  <Link to="/my-albums" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>My Albums</Link>
                  <Link to="/my-bookings" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>My Bookings</Link>
                  {isAdmin() && (
                    <Link to="/admin" className="text-gray-600 hover:text-accent transition" onClick={closeMobileMenu}>Admin Portal</Link>
                  )}
                  <button onClick={handleSignOut} className="text-left text-gray-600 hover:text-accent transition">Sign Out</button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    closeMobileMenu()
                    toggleModal('loginModal', true)
                  }} 
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition text-left"
                >
                  Login
                </button>
              )}
              
              <button 
                onClick={() => {
                  closeMobileMenu()
                  toggleModal('bookingModal', true)
                }} 
                className="px-4 py-2 bg-accent text-white rounded hover:bg-amber-600 transition text-left"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
