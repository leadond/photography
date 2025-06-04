import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, user } = useAuth()
  const navigate = useNavigate()

  // If user is already logged in, redirect to dashboard
  if (user) {
    navigate('/dashboard')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary text-white py-4 px-6">
            <h1 className="text-2xl font-bold">Login to Your Account</h1>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
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
              <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-accent hover:text-amber-600">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginPage
