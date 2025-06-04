import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if we have a hash fragment in the URL (from the reset password email)
    const hash = window.location.hash
    if (!hash || !hash.startsWith('#access_token=')) {
      setError('Invalid or expired password reset link. Please request a new one.')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error
      
      toast.success('Password has been reset successfully!')
      navigate('/login')
    } catch (error) {
      setError(error.message || 'Failed to reset password')
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
            <h1 className="text-2xl font-bold">Set New Password</h1>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">New Password</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                  minLength={6}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
                  required 
                  minLength={6}
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-amber-600 transition"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage
