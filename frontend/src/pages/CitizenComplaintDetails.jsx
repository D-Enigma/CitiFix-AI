import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getComplaintById, getImageUrl } from '../api'

function CitizenComplaintDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load the selected complaint from the backend.
  const fetchComplaint = async () => {
    try {
      setLoading(true)
      setError('')

      // Get the saved authentication token.
      const token = localStorage.getItem('access_token')

      // Send unauthenticated citizens to the login page.
      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      // Fetch the complaint using its ID.
      const data = await getComplaintById(token, id)

      setComplaint(data)
    } catch (err) {
      console.error('Failed to load complaint:', err)

      // Show the backend or network error.
      setError(
        err.message || 'Failed to load complaint details.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaint()
  }, [id])

  // Format the complaint date for display.
  const formatDate = (date) => {
    if (!date) return 'Unknown date'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Unknown date'
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  // Return the correct styling for the complaint status.
  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-700'

      case 'Assigned':
        return 'bg-purple-100 text-purple-700'

      case 'Under Review':
        return 'bg-blue-100 text-blue-700'

      case 'Submitted':
        return 'bg-slate-100 text-slate-600'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  // Return the correct styling for the complaint priority.
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

  // Show loading state while the complaint is being fetched.
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">
          Loading complaint details...
        </p>
      </div>
    )
  }

  // Show an error when the complaint cannot be loaded.
  if (error) {
    return (
      <div className="min-h-screen bg-slate-100">
        <header className="bg-slate-950 text-white px-8 py-5">
          <div className="max-w-6xl mx-auto">
            <Link to="/citizen">
              <h1 className="text-2xl font-bold">
                CitiFix <span className="text-blue-500">AI</span>
              </h1>
              <p className="text-xs text-slate-400">
                Citizen Portal
              </p>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-10">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-800">
              Unable to load complaint
            </h2>

            <p className="text-red-700 mt-2">
              {error}
            </p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={fetchComplaint}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Try Again
              </button>

              <Link
                to="/citizen/complaints"
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg"
              >
                Back to Complaints
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Show a fallback when no complaint was returned.
  if (!complaint) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">
          Complaint not found.
        </p>
      </div>
    )
  }

  const imageUrl = getImageUrl(complaint.image_path)

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
            to="/citizen/complaints"
            className="text-sm text-slate-300 hover:text-white"
          >
            My Complaints
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Back navigation */}
        <Link
          to="/citizen/complaints"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to My Complaints
        </Link>

        {/* Page heading */}
        <div className="mt-5 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-900">
              {complaint.issue_type || 'Civic Issue'}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                complaint.status
              )}`}
            >
              {complaint.status || 'Submitted'}
            </span>
          </div>

          <p className="text-slate-500 mt-2 break-all">
            Complaint ID: {complaint.complaint_id}
          </p>
        </div>

        {/* Complaint information */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status progress */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Complaint Progress
              </h3>

              <div className="grid grid-cols-4 gap-2">
                {[
                  'Submitted',
                  'Under Review',
                  'Assigned',
                  'Resolved',
                ].map((status, index) => {
                  const statuses = [
                    'Submitted',
                    'Under Review',
                    'Assigned',
                    'Resolved',
                  ]

                  const currentIndex = statuses.indexOf(
                    complaint.status
                  )

                  const completed =
                    index <= currentIndex

                  return (
                    <div key={status}>
                      <div
                        className={`h-2 rounded-full ${
                          completed
                            ? 'bg-blue-600'
                            : 'bg-slate-200'
                        }`}
                      />

                      <p
                        className={`text-xs mt-2 ${
                          completed
                            ? 'text-slate-700 font-medium'
                            : 'text-slate-400'
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Complaint details */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-5">
                Complaint Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    Issue Type
                  </p>

                  <p className="text-slate-900 font-medium mt-1">
                    {complaint.issue_type || 'Unknown'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    Submitted
                  </p>

                  <p className="text-slate-900 font-medium mt-1">
                    {formatDate(complaint.created_at)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    Severity
                  </p>

                  <p className="text-slate-900 font-medium mt-1">
                    {complaint.severity || 'Pending'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    Priority
                  </p>

                  <span
                    className={`inline-block mt-1 px-2.5 py-1 rounded-full text-sm font-medium ${getPriorityClass(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority || 'Pending'}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    AI Confidence
                  </p>

                  <p className="text-slate-900 font-medium mt-1">
                    {complaint.ai_confidence !== null &&
                    complaint.ai_confidence !== undefined
                      ? `${(
                          complaint.ai_confidence * 100
                        ).toFixed(1)}%`
                      : 'Not available'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    Location
                  </p>

                  <p className="text-slate-900 font-medium mt-1">
                    {complaint.latitude}, {complaint.longitude}
                  </p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Description
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {complaint.description ||
                  'No additional description provided.'}
              </p>
            </section>

            {/* Evidence image */}
            {imageUrl && (
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Submitted Evidence
                </h3>

                <img
                  src={imageUrl}
                  alt="Submitted civic issue evidence"
                  className="w-full max-h-[500px] object-contain rounded-lg bg-slate-100"
                />
              </section>
            )}
          </div>

          {/* Side information */}
          <div className="space-y-6">
            {/* Current status */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-xs text-slate-400 uppercase">
                Current Status
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {complaint.status || 'Submitted'}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Your complaint is currently in this stage of the
                municipal workflow.
              </p>
            </section>

            {/* Location */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Reported Location
              </h3>

              <p className="text-sm text-slate-500 mt-3">
                {complaint.latitude}, {complaint.longitude}
              </p>

              <a
                href={`https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-sm text-blue-600 hover:underline"
              >
                View on Google Maps →
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CitizenComplaintDetails