import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)

    try {
      await resetPassword(email)
      setMessage('Password reset email sent! Check your inbox for further instructions.')
      setEmail('')
    } catch (error) {
      setError(error.message || 'Failed to send password reset email')
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
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {message}
              </div>
            )}
            <p className="mb-4 text-gray-700">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
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
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-amber-600 transition"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                <Link to="/login" className="text-accent hover:text-amber-600">Back to Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ForgotPasswordPage
