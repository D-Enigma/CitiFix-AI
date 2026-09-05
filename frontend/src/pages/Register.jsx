import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    setError('')

    // Make sure both password fields match before registration.
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Create the citizen account using the backend registration API.
      await registerUser(name, email, password)

      // Send the new user to login after successful registration.
      navigate('/login', {
        replace: true,
        state: {
          registered: true,
        },
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Brand header */}
        <div className="text-center mb-8">

          <Link to="/" className="inline-block">

            <h1 className="text-3xl font-bold text-white">
              CitiFix <span className="text-blue-500">AI</span>
            </h1>

          </Link>

          <p className="text-slate-400 mt-2">
            Urban Infrastructure Monitoring Platform
          </p>

        </div>


        {/* Registration card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-slate-900">
            Create your account
          </h2>

          <p className="text-slate-500 mt-1 mb-7">
            Register as a citizen to report civic issues
          </p>


          {/* Display registration errors */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}


          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Confirm password */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Register button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

          </form>


          {/* Login link */}
          <div className="mt-6 text-center">

            <p className="text-sm text-slate-500">

              Already have an account?{' '}

              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>


        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          CitiFix AI • Smart City Infrastructure Platform
        </p>

      </div>

    </div>
  )
}

export default Register