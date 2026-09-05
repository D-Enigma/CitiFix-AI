import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  RefreshCw,
  Eye,
  ArrowLeft,
} from 'lucide-react'

import { getAllComplaints } from '../api'


function Complaints() {
  const [complaints, setComplaints] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [issueFilter, setIssueFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // Fetch all complaints from the backend.
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


  // Load complaints when the page opens.
  useEffect(() => {
    loadComplaints()
  }, [])


  // Create the issue-type filter options from real complaints.
  const issueTypes = useMemo(() => {
    const types = complaints
      .map((complaint) => complaint.issue_type)
      .filter(Boolean)

    return ['All', ...new Set(types)]
  }, [complaints])


  // Apply search, filters, and sorting to the real complaints.
  const filteredComplaints = useMemo(() => {
    const filtered = complaints.filter((complaint) => {

      // Use the new complaint_id returned by the backend.
      const complaintId =
        complaint.complaint_id ||
        complaint.id ||
        complaint._id ||
        ''

      const issueType =
        complaint.issue_type || ''

      const location =
        `${complaint.latitude || ''} ${complaint.longitude || ''}`

      // Include complaint ID, user ID, and user name in search.
      const searchText =
        `${complaintId}
        ${complaint.user_id || ''}
        ${complaint.user_name || ''}
        ${issueType}
        ${location}
        ${complaint.description || ''}`
          .toLowerCase()

      const matchesSearch =
        searchText.includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' ||
        complaint.status === statusFilter

      const matchesPriority =
        priorityFilter === 'All' ||
        complaint.priority === priorityFilter

      const matchesIssue =
        issueFilter === 'All' ||
        complaint.issue_type === issueFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesIssue
      )
    })


    // Sort complaints by their creation date.
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()

      return sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB
    })

    return filtered
  }, [
    complaints,
    search,
    statusFilter,
    priorityFilter,
    issueFilter,
    sortOrder,
  ])


  // Use the complaint ID returned by the backend.
  const getComplaintId = (complaint) => {
    return (
      complaint.complaint_id ||
      complaint.id ||
      complaint._id ||
      'Unknown'
    )
  }


  // Format the complaint creation date for the table.
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


  // Display coordinates as the complaint location.
  const getLocation = (complaint) => {
    if (
      complaint.latitude === undefined ||
      complaint.longitude === undefined
    ) {
      return 'Location unavailable'
    }

    return `${complaint.latitude}, ${complaint.longitude}`
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


  // Give each status a suitable visual style.
  const getStatusClass = (status) => {
    if (status === 'Resolved') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'Under Review') {
      return 'bg-blue-100 text-blue-700'
    }

    if (status === 'Assigned') {
      return 'bg-purple-100 text-purple-700'
    }

    return 'bg-slate-100 text-slate-700'
  }


  return (
    <div className="min-h-screen bg-slate-100">

      {/* Admin sidebar */}
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
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/complaints"
            className="block px-4 py-3 rounded-lg bg-blue-600"
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


        <div className="absolute bottom-6 left-6">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Portal
          </Link>
        </div>

      </aside>


      {/* Main page content */}
      <main className="ml-64 min-h-screen">

        {/* Page header */}
        <header className="bg-white border-b border-slate-200 px-8 py-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Complaints
              </h2>

              <p className="text-slate-500 mt-1">
                Manage and monitor citizen-reported civic issues.
              </p>
            </div>


            <button
              onClick={loadComplaints}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={17} />

              {loading ? 'Refreshing...' : 'Refresh'}
            </button>

          </div>

        </header>


        <div className="p-8">

          {/* Search and filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

              {/* Search */}
              <div className="lg:col-span-2">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search
                </label>

                <div className="relative">

                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search complaint, citizen, issue or location..."
                    className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>


              {/* Status filter */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white"
                >
                  <option value="All">All</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Resolved">Resolved</option>
                </select>

              </div>


              {/* Priority filter */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Priority
                </label>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white"
                >
                  <option value="All">All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Pending">Pending</option>
                </select>

              </div>


              {/* Issue filter */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Issue Type
                </label>

                <select
                  value={issueFilter}
                  onChange={(e) => setIssueFilter(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white"
                >
                  {issueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

              </div>

            </div>


            {/* Sorting and filter reset */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-5 border-t border-slate-200">

              <div className="flex items-center gap-3">

                <label className="text-sm font-medium text-slate-700">
                  Sort by
                </label>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="newest">
                    Newest first
                  </option>

                  <option value="oldest">
                    Oldest first
                  </option>
                </select>

              </div>


              <button
                onClick={() => {
                  setSearch('')
                  setStatusFilter('All')
                  setPriorityFilter('All')
                  setIssueFilter('All')
                  setSortOrder('newest')
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear Filters
              </button>

            </div>

          </div>


          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-6">

              <p className="font-medium">
                Could not load complaints
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>

            </div>
          )}


          {/* Complaints table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-200">

              <h3 className="text-xl font-bold text-slate-900">
                Registered Complaints
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredComplaints.length} of {complaints.length} complaints
              </p>

            </div>


            {loading ? (

              <div className="p-12 text-center">
                <p className="text-slate-500">
                  Loading complaints...
                </p>
              </div>

            ) : filteredComplaints.length === 0 ? (

              <div className="p-12 text-center">

                <p className="text-lg font-semibold text-slate-900">
                  No complaints found
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                        Complaint
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                        Location
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                        Citizen
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                        Priority
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                        Status
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredComplaints.map((complaint) => {

                      // Get the MongoDB complaint ID for display and navigation.
                      const complaintId =
                        getComplaintId(complaint)

                      return (

                        <tr
                          key={complaintId}
                          className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                        >

                          {/* Complaint information */}
                          <td className="px-6 py-5">

                            <p className="font-semibold text-slate-900">
                              {complaint.issue_type || 'Pending'}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              {complaintId}
                              {' • '}
                              {formatDate(complaint.created_at)}
                            </p>

                          </td>


                          {/* Real coordinates */}
                          <td className="px-6 py-5">

                            <p className="text-sm text-slate-700">
                              {getLocation(complaint)}
                            </p>

                          </td>


                          {/* Show citizen name and unique user ID. */}
                          <td className="px-6 py-5">

                            <p className="font-medium text-slate-900">
                              {complaint.user_name || 'Unknown'}
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                              User ID: {complaint.user_id || 'Unknown'}
                            </p>

                          </td>


                          {/* Priority */}
                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(
                                complaint.priority
                              )}`}
                            >
                              {complaint.priority || 'Pending'}
                            </span>

                          </td>


                          {/* Status */}
                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                complaint.status
                              )}`}
                            >
                              {complaint.status || 'Submitted'}
                            </span>

                          </td>


                          {/* Details link */}
                          <td className="px-6 py-5">

                            <Link
                              to={`/admin/complaints/${complaintId}`}
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                              <Eye size={16} />
                              View Details
                            </Link>

                          </td>

                        </tr>

                      )
                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  )
}

export default Complaints