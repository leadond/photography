import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [error, setError] = useState('')
  const { signIn, loading } = useAuth()
  const navigate = useNavigate()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await signIn(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Failed to sign in')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="form-label">Password</label>
          <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      
      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
