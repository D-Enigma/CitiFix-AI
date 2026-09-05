import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  RefreshCw,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

import ComplaintMap from '../components/ComplaintMap'
import { getAllComplaints } from '../api'


function Dashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // Fetch the latest complaints from the backend.
  const loadComplaints = async () => {
    try {
      setLoading(true)
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
      (complaint) =>
        complaint.status === 'Submitted'
    ).length

    const inProgress = complaints.filter(
      (complaint) =>
        complaint.status === 'Under Review' ||
        complaint.status === 'Assigned'
    ).length

    const highPriority = complaints.filter(
      (complaint) =>
        complaint.priority === 'High'
    ).length

    const resolved = complaints.filter(
      (complaint) =>
        complaint.status === 'Resolved'
    ).length

    return {
      total,
      pending,
      inProgress,
      highPriority,
      resolved,
    }
  }, [complaints])


  // Get the five newest complaints for the dashboard.
  const recentComplaints = useMemo(() => {
    return [...complaints]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
      .slice(0, 5)
  }, [complaints])


  // Format complaint dates for the recent complaints section.
  const formatDate = (date) => {
    if (!date) {
      return 'Unknown date'
    }

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }


  // Give each priority a suitable visual style.
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

    return 'bg-slate-100 text-slate-700'
  }


  return (
    <main className="flex-1 bg-slate-100 p-8">

      {/* Dashboard header */}
      <div className="flex items-start justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h2>

          <p className="text-slate-500 mt-1">
            Urban infrastructure complaint overview
          </p>

        </div>


        {/* Refresh dashboard data */}
        <button
          onClick={loadComplaints}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={17} />

          {loading ? 'Refreshing...' : 'Refresh'}
        </button>

      </div>


      {/* Dashboard error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-6">

          <p className="font-medium">
            Could not load dashboard data
          </p>

          <p className="text-sm mt-1">
            {error}
          </p>

        </div>
      )}


      {/* Real-time complaint statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        {/* Total complaints */}
        <div className="bg-white rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Total Complaints
            </p>

            <FileText
              size={20}
              className="text-slate-400"
            />

          </div>

          <h3 className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? '—' : statistics.total}
          </h3>

        </div>


        {/* Pending complaints */}
        <div className="bg-white rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Pending
            </p>

            <Clock
              size={20}
              className="text-slate-400"
            />

          </div>

          <h3 className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? '—' : statistics.pending}
          </h3>

        </div>


        {/* In-progress complaints */}
        <div className="bg-white rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <RefreshCw
              size={20}
              className="text-slate-400"
            />

          </div>

          <h3 className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? '—' : statistics.inProgress}
          </h3>

        </div>


        {/* High-priority complaints */}
        <div className="bg-white rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              High Priority
            </p>

            <AlertTriangle
              size={20}
              className="text-slate-400"
            />

          </div>

          <h3 className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? '—' : statistics.highPriority}
          </h3>

        </div>


        {/* Resolved complaints */}
        <div className="bg-white rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Resolved
            </p>

            <CheckCircle
              size={20}
              className="text-slate-400"
            />

          </div>

          <h3 className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? '—' : statistics.resolved}
          </h3>

        </div>

      </div>


      {/* Real complaint map */}
      <div className="mt-6">
        <ComplaintMap />
      </div>


      {/* Recent complaints */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              Recent Complaints
            </h3>

            <p className="text-sm text-slate-500">
              Latest infrastructure complaints registered in the system
            </p>

          </div>


          {/* Link to the complete complaints list */}
          <Link
            to="/admin/complaints"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View All
            <ArrowRight size={16} />
          </Link>

        </div>


        {loading ? (

          <div className="py-8 text-center">
            <p className="text-slate-500">
              Loading recent complaints...
            </p>
          </div>

        ) : recentComplaints.length === 0 ? (

          <div className="py-8 text-center">
            <p className="text-slate-500">
              No complaints registered yet.
            </p>
          </div>

        ) : (

          <div className="space-y-4">

            {recentComplaints.map((complaint) => {

              // Use the real MongoDB complaint ID for navigation.
              const complaintId =
                complaint.complaint_id ||
                complaint.id ||
                complaint._id

              return (

                <div
                  key={complaintId}
                  className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
                >

                  <div>

                    <h4 className="font-semibold text-slate-900">
                      {complaint.issue_type || 'Pending'}
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      {complaint.user_name || 'Unknown citizen'}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {formatDate(complaint.created_at)}
                      {' • '}
                      {complaint.latitude}, {complaint.longitude}
                    </p>

                  </div>


                  <div className="flex items-center gap-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(
                        complaint.priority
                      )}`}
                    >
                      {complaint.priority || 'Pending'}
                    </span>


                    <Link
                      to={`/admin/complaints/${complaintId}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="View complaint"
                    >
                      <ArrowRight size={18} />
                    </Link>

                  </div>

                </div>

              )
            })}

          </div>

        )}

      </div>

    </main>
  )
}

export default Dashboard