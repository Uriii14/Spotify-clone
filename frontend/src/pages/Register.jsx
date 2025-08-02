import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../services/api'

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)
    setErrors({}) // Clear previous errors
    
    try {
      // Llamada real a la API
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      
      console.log('Registration successful:', response)
      
      // Llamar a la función onRegister del componente padre
      console.log('✅ About to call onRegister with:', response.user)
      console.log('✅ onRegister function exists?', typeof onRegister)
      if (onRegister) {
        onRegister(response.user)
        console.log('✅ onRegister called successfully')
      } else {
        console.log('❌ onRegister is not defined!')
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      
    } catch (error) {
      console.error('Registration failed:', error)
      setErrors({ 
        general: error.message || 'Registration failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-zinc-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2 text-green-500">
            Welcome to Spotify Clone
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            Create your account to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-zinc-600'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-zinc-600'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-zinc-600'
                }`}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-zinc-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-zinc-600'
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-zinc-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-green-500 hover:text-green-400 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}