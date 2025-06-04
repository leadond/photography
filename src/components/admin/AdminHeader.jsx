import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AdminHeader({ setSidebarOpen }) {
  const { userProfile } = useAuth()

  return (
    <header className="fixed w-full bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <div className="text-lg font-medium text-gray-900">
                Admin Portal
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <i className="fas fa-home -ml-1 mr-2"></i>
                <span>View Website</span>
              </Link>
            </div>
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-gray-700">
                    {userProfile?.full_name || 'Admin User'}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-user text-gray-500"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
