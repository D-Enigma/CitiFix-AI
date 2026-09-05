import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ allowedRole }) {
  // Get the saved authentication token and user role.
  const token = localStorage.getItem('access_token')
  const role = localStorage.getItem('role')

  // Send users without a login token to the login page.
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Block users whose role is not allowed for this route.
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'admin' ? '/admin' : '/citizen'} replace />
  }

  // Allow authorized users to access the requested page.
  return <Outlet />
}

export default ProtectedRoute