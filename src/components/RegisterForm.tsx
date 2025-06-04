import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  
  const [error, setError] = useState('')
  const { signUp, loading } = useAuth()
  const navigate = useNavigate()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.phone)
      navigate('/login')
    } catch (error: any) {
      setError(error.message || 'Failed to create account')
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
        <label htmlFor="fullName" className="form-label">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
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
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          required
          minLength={6}
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
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
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      
      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm
