import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyComplaints } from '../api'

function CitizenDashboard() {
  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Get the logged-in citizen's name from local storage.
  const userName = localStorage.getItem('name') || 'Citizen'

  useEffect(() => {
    const loadComplaints = async () => {
      const token = localStorage.getItem('access_token')

      // Redirect to login if the authentication token is missing.
      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      try {
        // Fetch only complaints belonging to the logged-in citizen.
        const data = await getMyComplaints(token)

        // Sort complaints so the newest reports appear first.
        const sortedComplaints = [...data].sort(
          (a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        )

        setComplaints(sortedComplaints)
      } catch (error) {
        setError(error.message || 'Could not load your complaints.')
      } finally {
        setLoading(false)
      }
    }

    loadComplaints()
  }, [navigate])

  // Calculate the real dashboard statistics from MongoDB complaints.
  const totalReports = complaints.length

  const underReview = complaints.filter(
    (complaint) => complaint.status === 'Under Review'
  ).length

  const resolved = complaints.filter(
    (complaint) => complaint.status === 'Resolved'
  ).length

  // Format MongoDB complaint dates for the dashboard.
  const formatDate = (date) => {
    if (!date) return 'Unknown date'

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  // Format the complaint ID so the full MongoDB ID remains available.
  const formatComplaintId = (complaint) => {
    return complaint.id || complaint._id || 'Unknown ID'
  }

  // Format the complaint location using its real coordinates.
  const formatLocation = (complaint) => {
    if (
      complaint.latitude === undefined ||
      complaint.longitude === undefined
    ) {
      return 'Location unavailable'
    }

    return `${complaint.latitude}, ${complaint.longitude}`
  }

  // Clear authentication data and return the citizen to the landing page.
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('user_id')

    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-slate-950 text-white px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <Link to="/citizen">
              <h1 className="text-2xl font-bold">
                CitiFix <span className="text-blue-500">AI</span>
              </h1>

              <p className="text-xs text-slate-400">
                Citizen Portal
              </p>
            </Link>
          </div>

          <div className="flex items-center gap-4">

            <span className="text-sm text-slate-300">
              Welcome, {userName}
            </span>

            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white transition"
            >
              Logout
            </button>

          </div>

        </div>
      </header>


      {/* Main */}
      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Citizen Dashboard
            </h2>

            <p className="text-slate-500 mt-1">
              Report and track urban infrastructure issues.
            </p>
          </div>

          <Link
            to="/citizen/submit"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            + Report a Problem
          </Link>

        </div>


        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Reports
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {loading ? '—' : totalReports}
            </h3>
          </div>


          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Under Review
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {loading ? '—' : underReview}
            </h3>
          </div>


          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Resolved
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {loading ? '—' : resolved}
            </h3>
          </div>

        </div>


        {/* Recent complaints */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">
              My Recent Complaints
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Track the status of your submitted complaints.
            </p>
          </div>


          {/* Loading state */}
          {loading && (
            <div className="p-8 text-center text-slate-500">
              Loading your complaints...
            </div>
          )}


          {/* Error state */}
          {!loading && error && (
            <div className="p-8 text-center">
              <p className="text-red-600">
                {error}
              </p>
            </div>
          )}


          {/* Empty state */}
          {!loading && !error && complaints.length === 0 && (
            <div className="p-10 text-center">

              <h4 className="text-lg font-semibold text-slate-800">
                No complaints yet
              </h4>

              <p className="text-sm text-slate-500 mt-2">
                Report a civic issue to see it here.
              </p>

              <Link
                to="/citizen/submit"
                className="inline-block mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Report a Problem
              </Link>

            </div>
          )}


          {/* Real complaints */}
          {!loading && !error && complaints.length > 0 && (
            <div className="divide-y divide-slate-200">

              {complaints.slice(0, 5).map((complaint) => (

                <div
                  key={formatComplaintId(complaint)}
                  className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >

                  <div className="min-w-0">

                    <div className="flex items-center gap-3 flex-wrap">

                      <h4 className="font-semibold text-slate-900">
                        {complaint.issue_type || 'Unknown Issue'}
                      </h4>

                      <span className="text-xs text-slate-400 break-all">
                        {formatComplaintId(complaint)}
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {formatLocation(complaint)} • {formatDate(complaint.created_at)}
                    </p>

                  </div>


                  <div className="flex items-center gap-4 flex-wrap">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        complaint.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : complaint.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : complaint.priority === 'Low'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {complaint.priority || 'Pending'}
                    </span>


                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        complaint.status === 'Resolved'
                          ? 'bg-green-100 text-green-700'
                          : complaint.status === 'Assigned'
                            ? 'bg-purple-100 text-purple-700'
                            : complaint.status === 'Under Review'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {complaint.status || 'Submitted'}
                    </span>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>


        {/* Show link when more than five complaints exist. */}
        {!loading && !error && complaints.length > 5 && (
          <div className="text-center mt-6">

            <Link
              to="/citizen/complaints"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all {complaints.length} complaints →
            </Link>

          </div>
        )}

      </main>

    </div>
  )
}

export default CitizenDashboard