import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(email, password)
      onClose()
    } catch (error) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden transform transition-all">
        <div className="bg-primary text-white py-4 px-6 flex justify-between items-center">
          <h3 className="text-xl font-medium">Login to Your Account</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 focus:outline-none">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="loginEmail" className="block text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                id="loginEmail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                required 
              />
            </div>
            <div className="mb-6">
              <label htmlFor="loginPassword" className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                id="loginPassword" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                required 
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="remember" name="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-accent hover:text-amber-600">Forgot password?</a>
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-amber-600 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Don't have an account? <Link to="/register" onClick={onClose} className="text-accent hover:text-amber-600">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
