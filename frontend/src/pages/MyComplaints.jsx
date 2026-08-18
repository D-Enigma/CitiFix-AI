import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MyComplaints() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      setError('')

      // Get the JWT token saved during login
      const token =
        localStorage.getItem('access_token') ||
        localStorage.getItem('token')

      if (!token) {
        setError('You are not logged in.')
        setLoading(false)
        return
      }

      const response = await fetch(
        'http://127.0.0.1:8000/complaints/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Complaint API error:', errorText)

        throw new Error('Failed to fetch complaints')
      }

      const data = await response.json()

      console.log('Complaints from backend:', data)

      setComplaints(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load complaints.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Unknown date'

    try {
      return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return date
    }
  }

  const getLocation = (complaint) => {
    if (
      complaint.latitude !== undefined &&
      complaint.longitude !== undefined
    ) {
      return `${complaint.latitude}, ${complaint.longitude}`
    }

    return 'Location unavailable'
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-700'

      case 'Assigned':
        return 'bg-purple-100 text-purple-700'

      case 'Under Review':
        return 'bg-blue-100 text-blue-700'

      case 'Submitted':
        return 'bg-blue-100 text-blue-700'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700'

      case 'Medium':
        return 'bg-yellow-100 text-yellow-700'

      case 'Low':
        return 'bg-green-100 text-green-700'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  const getProgressWidth = (status) => {
    switch (status) {
      case 'Resolved':
        return 'w-full bg-green-500'

      case 'Assigned':
        return 'w-3/4 bg-blue-500'

      case 'Under Review':
        return 'w-1/2 bg-blue-500'

      case 'Submitted':
        return 'w-1/4 bg-blue-500'

      default:
        return 'w-1/4 bg-blue-500'
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="bg-slate-950 text-white px-8 py-5">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <Link to="/citizen">

            <h1 className="text-2xl font-bold">
              CitiFix <span className="text-blue-500">AI</span>
            </h1>

            <p className="text-xs text-slate-400">
              Citizen Portal
            </p>

          </Link>

          <Link
            to="/citizen"
            className="text-sm text-slate-300 hover:text-white"
          >
            Dashboard
          </Link>

        </div>

      </header>


      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Page heading */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              My Complaints
            </h2>

            <p className="text-slate-500 mt-1">
              Track the complaints you have submitted.
            </p>

          </div>

          <Link
            to="/citizen/submit"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            + New Complaint
          </Link>

        </div>


        {/* Loading */}

        {loading && (

          <div className="bg-white rounded-xl shadow-sm p-10 text-center">

            <p className="text-slate-500">
              Loading your complaints...
            </p>

          </div>

        )}


        {/* Error */}

        {!loading && error && (

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">

            <p className="text-red-700">
              {error}
            </p>

            <button
              onClick={fetchComplaints}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Try Again
            </button>

          </div>

        )}


        {/* No complaints */}

        {!loading && !error && complaints.length === 0 && (

          <div className="bg-white rounded-xl shadow-sm p-10 text-center">

            <div className="text-5xl mb-4">
              📋
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No complaints yet
            </h3>

            <p className="text-slate-500 mt-2">
              You haven't submitted any complaints.
            </p>

            <Link
              to="/citizen/submit"
              className="inline-block mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Submit Your First Complaint
            </Link>

          </div>

        )}


        {/* Real complaints */}

        {!loading && !error && complaints.length > 0 && (

          <div className="space-y-5">

            {complaints.map((complaint) => (

              <div
                key={complaint._id}
                className="bg-white rounded-xl shadow-sm p-6"
              >

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                  <div className="flex-1">

                    {/* Title */}

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-bold text-slate-900 capitalize">
                        {complaint.issue_type || 'Civic Issue'}
                      </h3>

                      <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded">
                        {complaint._id}
                      </span>

                    </div>


                    {/* Location + Date */}

                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-slate-500">

                      <span>
                        📍 {getLocation(complaint)}
                      </span>

                      <span>
                        📅 {formatDate(complaint.created_at)}
                      </span>

                    </div>


                    {/* Description */}

                    <p className="text-sm text-slate-600 mt-4">

                      {complaint.description ||
                        'No additional description provided.'}

                    </p>

                  </div>


                  {/* Status + Priority */}

                  <div className="flex flex-wrap items-center gap-3">

                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${getPriorityClass(
                        complaint.priority
                      )}`}
                    >
                      {complaint.priority || 'Pending'} Priority
                    </span>


                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusClass(
                        complaint.status
                      )}`}
                    >
                      {complaint.status || 'Submitted'}
                    </span>

                  </div>

                </div>


                {/* Progress */}

                <div className="mt-6 pt-5 border-t border-slate-100">

                  <div className="flex justify-between text-xs text-slate-400 mb-2">

                    <span>
                      Submitted
                    </span>

                    <span>
                      Under Review
                    </span>

                    <span>
                      Assigned
                    </span>

                    <span>
                      Resolved
                    </span>

                  </div>


                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className={`h-full rounded-full ${getProgressWidth(
                        complaint.status
                      )}`}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  )
}

export default MyComplaints