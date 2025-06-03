import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  HomeIcon,
  CalendarIcon,
  PhotoIcon,
  CreditCardIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

const DashboardSidebar = () => {
  const { signOut, user } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'My Appointments', href: '/dashboard/appointments', icon: CalendarIcon },
    { name: 'My Photos', href: '/dashboard/my-photos', icon: PhotoIcon },
    { name: 'Book Session', href: '/dashboard/book', icon: CreditCardIcon },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-900">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
          <Link to="/" className="flex items-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="ml-2 text-xl font-serif font-bold">DXM</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive(item.href) ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-300'
                  } mr-3 flex-shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="px-2 py-4 space-y-1 border-t border-gray-700">
            <div className="flex items-center px-2 py-2 text-sm font-medium text-gray-300">
              <UserCircleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" />
              <span className="truncate">{user?.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <ArrowRightOnRectangleIcon
                className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
