import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function AdminLayout({ children }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-slate-800 text-white">
          <div className="flex items-center justify-center h-16 border-b border-slate-700">
            <h1 className="text-xl font-bold">DXM Admin</h1>
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link 
                to="/admin" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin') && !isActive('/admin/albums') && !isActive('/admin/bookings')
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <i className="fas fa-tachometer-alt mr-3"></i>
                Dashboard
              </Link>
              <Link 
                to="/admin/bookings" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/bookings') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <i className="fas fa-calendar-alt mr-3"></i>
                Bookings
              </Link>
              <Link 
                to="/admin/albums" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/albums') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <i className="fas fa-images mr-3"></i>
                Albums
              </Link>
              <Link 
                to="/admin/users" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/users') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <i className="fas fa-users mr-3"></i>
                Users
              </Link>
              <Link 
                to="/admin/settings" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/settings') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <i className="fas fa-cog mr-3"></i>
                Settings
              </Link>
            </nav>
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-slate-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.email}</p>
                  <button 
                    onClick={handleSignOut}
                    className="text-xs text-gray-300 hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-full max-w-xs bg-slate-800 text-white">
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
            <h1 className="text-xl font-bold">DXM Admin</h1>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link 
                to="/admin" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin') && !isActive('/admin/albums') && !isActive('/admin/bookings')
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fas fa-tachometer-alt mr-3"></i>
                Dashboard
              </Link>
              <Link 
                to="/admin/bookings" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/bookings') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fas fa-calendar-alt mr-3"></i>
                Bookings
              </Link>
              <Link 
                to="/admin/albums" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/albums') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fas fa-images mr-3"></i>
                Albums
              </Link>
              <Link 
                to="/admin/users" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/users') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fas fa-users mr-3"></i>
                Users
              </Link>
              <Link 
                to="/admin/settings" 
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/settings') 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fas fa-cog mr-3"></i>
                Settings
              </Link>
            </nav>
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-slate-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.email}</p>
                  <button 
                    onClick={handleSignOut}
                    className="text-xs text-gray-300 hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="flex-1 flex justify-end">
              <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
                <i className="fas fa-home mr-1"></i> View Site
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
