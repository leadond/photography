import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              DXM Productions
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your personal photo albums and manage your bookings
            </p>
          </div>
          
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default LoginPage
