import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp, user } = useAuth()
  const navigate = useNavigate()

  // If user is already logged in, redirect to dashboard
  if (user) {
    navigate('/dashboard')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.phone)
      navigate('/login')
    } catch (error) {
      setError(error.message || 'Failed to create account')
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
            <h1 className="text-2xl font-bold">Create an Account</h1>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-amber-600 transition"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Already have an account? <Link to="/login" className="text-accent hover:text-amber-600">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RegisterPage
