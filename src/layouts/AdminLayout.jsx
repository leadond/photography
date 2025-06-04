import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

function AdminLayout({ children }) {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: 'fas fa-tachometer-alt' },
    { name: 'Appointments', href: '/admin/appointments', icon: 'fas fa-calendar-alt' },
    { name: 'Albums', href: '/admin/albums', icon: 'fas fa-images' },
    { name: 'Users', href: '/admin/users', icon: 'fas fa-users' },
    { name: 'Packages', href: '/admin/packages', icon: 'fas fa-box' },
    { name: 'Settings', href: '/admin/settings', icon: 'fas fa-cog' },
  ]

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <i className="fas fa-times text-white"></i>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Link to="/" className="text-white font-bold text-xl">
                DXM Admin
              </Link>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-primary-900 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <i className={`${item.icon} mr-4 h-6 w-6`}></i>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <i className="fas fa-user-circle text-primary-200 text-2xl"></i>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">
                    {user?.email}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-medium text-primary-200 hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link to="/" className="text-white font-bold text-xl">
                  DXM Admin
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-primary-900 text-white'
                        : 'text-primary-100 hover:bg-primary-700'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <i className={`${item.icon} mr-3 h-5 w-5`}></i>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <i className="fas fa-user-circle text-primary-200 text-2xl"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user?.email}
                    </p>
                    <button
                      onClick={handleSignOut}
                      className="text-xs font-medium text-primary-200 hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <i className="fas fa-bars h-6 w-6"></i>
          </button>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
