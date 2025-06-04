import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary text-white py-4 px-6">
        <h2 className="text-xl font-bold">Login to Your Account</h2>
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
              required 
            />
          </div>
          <div className="mb-6">
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember" name="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-accent hover:text-amber-600">Forgot password?</Link>
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
  )
}

export default LoginForm
