import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../api'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  // Remember whether the user came here by clicking Report an Issue.
  const redirectTo = location.state?.redirectTo

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const data = await loginUser(email, password)

      // Store the authentication token for future protected requests.
      localStorage.setItem('access_token', data.access_token)

      // Store the user's role for frontend navigation and access decisions.
      localStorage.setItem('role', data.role)
      
      // Store the user's name for the citizen dashboard.
      localStorage.setItem('name', data.name)

      // Store the logged-in user's ID for future user-specific features.
      localStorage.setItem('user_id', data.user_id)

      // Continue to the page the user originally requested after login.
      if (redirectTo) {
        navigate(redirectTo, { replace: true })
      } else if (data.role === 'admin') {
        // Send normal admin logins to the admin dashboard.
        navigate('/admin', { replace: true })
      } else {
        // Send normal citizen logins to the citizen dashboard.
        navigate('/citizen', { replace: true })
      }

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

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


        <div className="bg-white rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-slate-900">
            Welcome back
          </h2>

          <p className="text-slate-500 mt-1 mb-7">
            Sign in to continue to CitiFix AI
          </p>


          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}


          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

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


            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

          </form>


          {/* Give new users a proper registration option instead of bypassing login. */}
          <div className="mt-6 text-center">

            <p className="text-sm text-slate-500">

              Don't have an account?{' '}

              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create an account
              </Link>

            </p>

          </div>

        </div>


        <p className="text-center text-xs text-slate-600 mt-6">
          CitiFix AI • Smart City Infrastructure Platform
        </p>

      </div>

    </div>
  )
}

export default Login