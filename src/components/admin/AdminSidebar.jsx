import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation()
  const { signOut } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: 'fas fa-tachometer-alt' },
    { name: 'Photos', href: '/admin/photos', icon: 'fas fa-images' },
    { name: 'Albums', href: '/admin/albums', icon: 'fas fa-folder-open' },
    { name: 'Users', href: '/admin/users', icon: 'fas fa-users' },
    { name: 'Bookings', href: '/admin/bookings', icon: 'fas fa-calendar-alt' },
    { name: 'Lightroom Integration', href: '/admin/lightroom', icon: 'fas fa-sync-alt' },
    { name: 'Settings', href: '/admin/settings', icon: 'fas fa-cog' },
  ]

  return (
    <>
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

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <i className="fas fa-times text-white"></i>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Link to="/" className="flex items-center text-white">
                <span className="text-2xl font-serif font-bold">DXM</span>
                <span className="ml-2 text-xl font-light">Admin</span>
              </Link>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <i className={`${item.icon} mr-4 text-gray-400 group-hover:text-gray-300`}></i>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <i className="fas fa-user-circle text-2xl text-gray-400 group-hover:text-gray-300"></i>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">Admin User</p>
                  <button
                    onClick={signOut}
                    className="text-sm font-medium text-gray-400 group-hover:text-gray-300"
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
          <div className="flex flex-col h-0 flex-1 bg-primary">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link to="/" className="flex items-center text-white">
                  <span className="text-2xl font-serif font-bold">DXM</span>
                  <span className="ml-2 text-xl font-light">Admin</span>
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <i className={`${item.icon} mr-3 text-gray-400 group-hover:text-gray-300`}></i>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <i className="fas fa-user-circle text-2xl text-gray-400 group-hover:text-gray-300"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Admin User</p>
                    <button
                      onClick={signOut}
                      className="text-xs font-medium text-gray-400 group-hover:text-gray-300"
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
    </>
  )
}

export default AdminSidebar
