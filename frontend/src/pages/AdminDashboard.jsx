import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, ArrowRight } from 'lucide-react'

import ComplaintMap from '../components/ComplaintMap'
import { getAllComplaints } from '../api'

function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  // Fetch the real complaints stored in MongoDB.
  const loadComplaints = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')

      const token = localStorage.getItem('access_token')

      if (!token) {
        throw new Error('Admin login required')
      }

      const data = await getAllComplaints(token)

      setComplaints(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Load dashboard data when the page opens.
  useEffect(() => {
    loadComplaints()
  }, [])

  // Calculate dashboard statistics from real complaints.
  const statistics = useMemo(() => {
    const total = complaints.length

    const pending = complaints.filter(
      (complaint) => complaint.status === 'Submitted'
    ).length

    const inProgress = complaints.filter(
      (complaint) =>
        complaint.status === 'Under Review' ||
        complaint.status === 'Assigned'
    ).length

    const highPriority = complaints.filter(
      (complaint) => complaint.priority === 'High'
    ).length

    const resolved = complaints.filter(
      (complaint) => complaint.status === 'Resolved'
    ).length

    return {
      total,
      pending,
      inProgress,
      highPriority,
      resolved,
    }
  }, [complaints])

  // Count valid complaint categories while normalizing their names.
const categories = useMemo(() => {
  const counts = {}

  complaints.forEach((complaint) => {
    const rawIssueType = complaint.issue_type

    // Ignore records where AI has not identified an issue yet.
    if (
      !rawIssueType ||
      rawIssueType.toLowerCase() === 'pending'
    ) {
      return
    }

    // Normalize capitalization so Pothole and pothole become one category.
    const normalizedType =
      rawIssueType.toLowerCase() === 'pothole'
        ? 'Pothole'
        : rawIssueType.toLowerCase() === 'waterlogging'
        ? 'Waterlogging'
        : rawIssueType.toLowerCase() === 'garbage accumulation'
        ? 'Garbage Accumulation'
        : rawIssueType

    counts[normalizedType] =
      (counts[normalizedType] || 0) + 1
  })

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}, [complaints])

  // Show the five newest complaints on the dashboard.
  const recentComplaints = useMemo(() => {
    return [...complaints]
      .sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      )
      .slice(0, 5)
  }, [complaints])

  // Format complaint dates for the dashboard.
  const formatDate = (date) => {
    if (!date) {
      return 'Unknown date'
    }

    return new Date(date).toLocaleDateString()
  }

  // Get the complaint ID returned by the backend.
  const getComplaintId = (complaint) => {
    return (
      complaint.complaint_id ||
      complaint.id ||
      complaint._id
    )
  }

  // Format the complaint location using its real coordinates.
  const getLocation = (complaint) => {
    if (
      complaint.latitude === undefined ||
      complaint.longitude === undefined
    ) {
      return 'Location unavailable'
    }

    return `${Number(complaint.latitude).toFixed(5)}, ${Number(
      complaint.longitude
    ).toFixed(5)}`
  }

  // Choose the badge style based on complaint priority.
  const getPriorityClass = (priority) => {
    if (priority === 'High') {
      return 'bg-red-100 text-red-700'
    }

    if (priority === 'Medium') {
      return 'bg-yellow-100 text-yellow-700'
    }

    if (priority === 'Low') {
      return 'bg-green-100 text-green-700'
    }

    return 'bg-slate-100 text-slate-600'
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white p-6">

        <div className="mb-10">
          <Link to="/admin">
            <h1 className="text-2xl font-bold">
              CitiFix <span className="text-blue-500">AI</span>
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Municipal Control Center
            </p>
          </Link>
        </div>

        <nav className="space-y-2">

          <Link
            to="/admin"
            className="block px-4 py-3 rounded-lg bg-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/complaints"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Complaints
          </Link>

          <Link
            to="/admin/analytics"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Analytics
          </Link>

          <Link
            to="/admin/settings"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Settings
          </Link>

        </nav>

        <div className="absolute bottom-6 left-6 right-6">

          <Link
            to="/"
            className="block text-sm text-slate-400 hover:text-white"
          >
            ← Back to Portal
          </Link>

        </div>

      </aside>

      {/* Main content */}
      <main className="ml-64 min-h-screen">

        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-5">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Municipal Dashboard
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Urban infrastructure complaint monitoring
              </p>
            </div>

            <div className="flex items-center gap-4">

              <button
                onClick={() => loadComplaints(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={refreshing ? 'animate-spin' : ''}
                />

                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>

              <div className="text-right">

                <p className="text-sm font-medium text-slate-900">
                  Municipal Administrator
                </p>

                <p className="text-xs text-slate-400">
                  City Operations
                </p>

              </div>

            </div>

          </div>

        </header>

        <div className="p-8">

          {/* Show API errors */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Complaints
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {loading ? '...' : statistics.total}
              </h3>

              <p className="text-xs text-slate-500 mt-2">
                All registered complaints
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {loading ? '...' : statistics.pending}
              </h3>

              <p className="text-xs text-yellow-600 mt-2">
                Requires attention
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {loading ? '...' : statistics.inProgress}
              </h3>

              <p className="text-xs text-blue-600 mt-2">
                Under review or assigned
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                High Priority
              </p>

              <h3 className="text-3xl font-bold text-red-600 mt-2">
                {loading ? '...' : statistics.highPriority}
              </h3>

              <p className="text-xs text-red-500 mt-2">
                Requires urgent attention
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {loading ? '...' : statistics.resolved}
              </h3>

              <p className="text-xs text-green-600 mt-2">
                Completed complaints
              </p>
            </div>

          </div>

          {/* Complaint categories */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <div className="mb-5">

              <h3 className="text-xl font-bold text-slate-900">
                Complaint Categories
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Distribution of reported infrastructure issues
              </p>

            </div>

            {loading ? (
              <p className="text-slate-500">
                Loading categories...
              </p>
            ) : categories.length === 0 ? (
              <p className="text-slate-500">
                No complaints available.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                {categories.map(([category, count]) => (

                  <div
                    key={category}
                    className="border border-slate-200 rounded-lg p-4"
                  >

                    <p className="text-sm text-slate-500">
                      {category}
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      {count}
                    </p>

                  </div>

                ))}

              </div>
            )}

          </div>

          {/* Real complaint map */}
          {/* Pass all MongoDB complaints to the map so every complaint gets a marker. */}
          <ComplaintMap complaints={complaints} />

          {/* Recent complaints */}
          <div className="bg-white rounded-xl shadow-sm mt-6 overflow-hidden">

            <div className="p-6 border-b border-slate-200 flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold text-slate-900">
                  Recent Complaints
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Latest complaints requiring municipal attention
                </p>

              </div>

              <Link
                to="/admin/complaints"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                View all
                <ArrowRight size={16} />
              </Link>

            </div>

            {loading ? (
              <div className="p-6 text-slate-500">
                Loading recent complaints...
              </div>
            ) : recentComplaints.length === 0 ? (
              <div className="p-6 text-slate-500">
                No complaints have been submitted yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">

                {recentComplaints.map((complaint) => {

                  const complaintId = getComplaintId(complaint)

                  return (
                    <Link
                      key={complaintId}
                      to={`/admin/complaints/${complaintId}`}
                      className="block p-5 hover:bg-slate-50 transition"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <div className="flex items-center gap-3 flex-wrap">

                            <h4 className="font-semibold text-slate-900">
                              {complaint.issue_type || 'Unknown Issue'}
                            </h4>

                            <span className="text-xs text-slate-400">
                              {complaintId}
                            </span>

                          </div>

                          <p className="text-sm text-slate-500 mt-1">
                            {complaint.user_name || 'Unknown citizen'}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            📍 {getLocation(complaint)}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {formatDate(complaint.created_at)}
                          </p>

                        </div>

                        <div className="flex items-center gap-3">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(
                              complaint.priority
                            )}`}
                          >
                            {complaint.priority || 'Pending'}
                          </span>

                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {complaint.status || 'Submitted'}
                          </span>

                        </div>

                      </div>

                    </Link>
                  )
                })}

              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard