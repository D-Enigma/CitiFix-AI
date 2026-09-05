import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'

import { getAllComplaints } from '../api'

function Analytics() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  // Fetch real complaint data from MongoDB.
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

  // Load analytics data when the page opens.
  useEffect(() => {
    loadComplaints()
  }, [])

  // Calculate the main analytics statistics from real complaints.
  const statistics = useMemo(() => {
    const total = complaints.length

    const highPriority = complaints.filter(
      (complaint) => complaint.priority === 'High'
    ).length

    const resolved = complaints.filter(
      (complaint) => complaint.status === 'Resolved'
    ).length

    const resolutionRate =
      total > 0
        ? Math.round((resolved / total) * 100)
        : 0

    return {
      total,
      highPriority,
      resolved,
      resolutionRate,
    }
  }, [complaints])

  // Build the complaint category distribution from real issue types.
  const categories = useMemo(() => {
    const counts = {}

    complaints.forEach((complaint) => {
      const rawIssueType = complaint.issue_type

      // Ignore complaints where no issue was detected.
      if (
        !rawIssueType ||
        rawIssueType.toLowerCase() === 'pending'
      ) {
        return
      }

      // Normalize common issue names so capitalization does not create duplicates.
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

    const validTotal = Object.values(counts).reduce(
      (sum, count) => sum + count,
      0
    )

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage:
          validTotal > 0
            ? Math.round((count / validTotal) * 100)
            : 0,
      }))
      .sort((a, b) => b.count - a.count)
  }, [complaints])

  // Group complaints by their real GPS coordinates to identify hotspots.
  const areas = useMemo(() => {
    const locationCounts = {}

    complaints.forEach((complaint) => {
      if (
        complaint.latitude === undefined ||
        complaint.longitude === undefined
      ) {
        return
      }

      const latitude = Number(complaint.latitude)
      const longitude = Number(complaint.longitude)

      if (
        Number.isNaN(latitude) ||
        Number.isNaN(longitude)
      ) {
        return
      }

      const key = `${latitude.toFixed(5)},${longitude.toFixed(5)}`

      locationCounts[key] =
        (locationCounts[key] || 0) + 1
    })

    return Object.entries(locationCounts)
      .map(([location, complaintsCount]) => ({
        name: location,
        complaints: complaintsCount,
      }))
      .sort((a, b) => b.complaints - a.complaints)
      .slice(0, 5)
  }, [complaints])

  // Calculate the real priority distribution.
  const priorityStats = useMemo(() => {
    return {
      high: complaints.filter(
        (complaint) => complaint.priority === 'High'
      ).length,

      medium: complaints.filter(
        (complaint) => complaint.priority === 'Medium'
      ).length,

      low: complaints.filter(
        (complaint) => complaint.priority === 'Low'
      ).length,

      pending: complaints.filter(
        (complaint) => complaint.priority === 'Pending'
      ).length,
    }
  }, [complaints])

  // Calculate the real complaint status distribution.
  const statusStats = useMemo(() => {
    return {
      submitted: complaints.filter(
        (complaint) => complaint.status === 'Submitted'
      ).length,

      underReview: complaints.filter(
        (complaint) => complaint.status === 'Under Review'
      ).length,

      assigned: complaints.filter(
        (complaint) => complaint.status === 'Assigned'
      ).length,

      resolved: complaints.filter(
        (complaint) => complaint.status === 'Resolved'
      ).length,
    }
  }, [complaints])

  // Find the largest hotspot count for the progress bars.
  const highestHotspotCount = useMemo(() => {
    if (areas.length === 0) {
      return 1
    }

    return Math.max(
      ...areas.map((area) => area.complaints)
    )
  }, [areas])

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
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
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
            className="block px-4 py-3 rounded-lg bg-blue-600"
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
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back to Portal
          </Link>

        </div>

      </aside>

      {/* Main content */}
      <main className="ml-64 min-h-screen">

        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Analytics
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Understand complaint patterns and infrastructure issues.
              </p>

            </div>

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

          </div>

        </header>

        <div className="p-8">

          {/* Show API errors */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          {/* Overview cards */}
          {/* Display the three analytics summary cards in an even layout. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                Total Reports
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {loading ? '...' : statistics.total}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                All registered complaints
              </p>

            </div>

            {/* <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                Avg. Resolution Time
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                N/A
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Resolution timestamp not stored yet
              </p>

            </div> */}

            <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                High Priority
              </p>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {loading ? '...' : statistics.highPriority}
              </p>

              <p className="text-xs text-red-500 mt-1">
                Requires urgent attention
              </p>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                Resolution Rate
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {loading ? '...' : `${statistics.resolutionRate}%`}
              </p>

              <p className="text-xs text-green-600 mt-1">
                Based on resolved complaints
              </p>

            </div>

          </div>

          {/* Category distribution and hotspots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            {/* Complaint Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h3 className="text-xl font-bold text-slate-900">
                Complaint Distribution
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Complaints by infrastructure category
              </p>

              {loading ? (
                <p className="text-slate-500 mt-7">
                  Loading categories...
                </p>
              ) : categories.length === 0 ? (
                <p className="text-slate-500 mt-7">
                  No valid issue categories available.
                </p>
              ) : (
                <div className="space-y-5 mt-7">

                  {categories.map((category) => (

                    <div key={category.name}>

                      <div className="flex justify-between mb-2">

                        <span className="text-sm font-medium text-slate-700">
                          {category.name}
                        </span>

                        <span className="text-sm text-slate-500">
                          {category.count} ({category.percentage}%)
                        </span>

                      </div>

                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${category.percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  ))}

                </div>
              )}

            </div>

            {/* Complaint Hotspots */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h3 className="text-xl font-bold text-slate-900">
                Complaint Hotspots
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Locations with the highest number of complaints
              </p>

              {loading ? (
                <p className="text-slate-500 mt-7">
                  Loading hotspots...
                </p>
              ) : areas.length === 0 ? (
                <p className="text-slate-500 mt-7">
                  No location data available.
                </p>
              ) : (
                <div className="space-y-5 mt-7">

                  {areas.map((area, index) => (

                    <div
                      key={area.name}
                      className="flex items-center gap-4"
                    >

                      <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between mb-1">

                          <span className="text-sm font-medium text-slate-700">
                            {area.name}
                          </span>

                          <span className="text-sm text-slate-500">
                            {area.complaints}
                          </span>

                        </div>

                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-red-500 rounded-full"
                            style={{
                              width: `${
                                (area.complaints /
                                  highestHotspotCount) *
                                100
                              }%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  ))}

                </div>
              )}

            </div>

          </div>

          {/* Priority Analysis */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <h3 className="text-xl font-bold text-slate-900">
              Priority Analysis
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current distribution of complaint priorities
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">

              <div className="border border-red-200 bg-red-50 rounded-xl p-6">

                <p className="text-sm text-red-600 font-medium">
                  High Priority
                </p>

                <p className="text-4xl font-bold text-red-700 mt-2">
                  {loading ? '...' : priorityStats.high}
                </p>

                <p className="text-xs text-red-500 mt-2">
                  Requires immediate attention
                </p>

              </div>

              <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-6">

                <p className="text-sm text-yellow-700 font-medium">
                  Medium Priority
                </p>

                <p className="text-4xl font-bold text-yellow-700 mt-2">
                  {loading ? '...' : priorityStats.medium}
                </p>

                <p className="text-xs text-yellow-600 mt-2">
                  Should be addressed soon
                </p>

              </div>

              <div className="border border-slate-200 bg-slate-50 rounded-xl p-6">

                <p className="text-sm text-slate-600 font-medium">
                  Low Priority
                </p>

                <p className="text-4xl font-bold text-slate-700 mt-2">
                  {loading ? '...' : priorityStats.low}
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  Routine infrastructure issues
                </p>

              </div>

            </div>

            {priorityStats.pending > 0 && (
              <p className="text-sm text-slate-500 mt-5">
                {priorityStats.pending} complaint
                {priorityStats.pending !== 1 ? 's' : ''}{' '}
                currently have pending priority classification.
              </p>
            )}

          </div>
          {/* Show the current complaint workflow distribution. */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <h3 className="text-xl font-bold text-slate-900">
              Status Analysis
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current status of all registered complaints
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-7">

              <div className="border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500">
                  Submitted
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {loading ? '...' : statusStats.submitted}
                </p>
              </div>

              <div className="border border-blue-200 bg-blue-50 rounded-xl p-5">
                <p className="text-sm text-blue-600 font-medium">
                  Under Review
                </p>

                <p className="text-3xl font-bold text-blue-700 mt-2">
                  {loading ? '...' : statusStats.underReview}
                </p>
              </div>

              <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-5">
                <p className="text-sm text-yellow-700 font-medium">
                  Assigned
                </p>

                <p className="text-3xl font-bold text-yellow-700 mt-2">
                  {loading ? '...' : statusStats.assigned}
                </p>
              </div>

              <div className="border border-green-200 bg-green-50 rounded-xl p-5">
                <p className="text-sm text-green-600 font-medium">
                  Resolved
                </p>

                <p className="text-3xl font-bold text-green-700 mt-2">
                  {loading ? '...' : statusStats.resolved}
                </p>
              </div>

            </div>

          </div>

          {/* Future AI Analytics */}
          <div className="bg-slate-900 rounded-xl p-7 mt-6 text-white">

            <p className="text-blue-400 text-sm font-medium">
              FUTURE AI CAPABILITY
            </p>

            <h3 className="text-2xl font-bold mt-2">
              Predictive Infrastructure Analytics
            </h3>

            <p className="text-slate-400 mt-3 max-w-3xl leading-relaxed">
              Future versions of CitiFix AI can use historical
              complaint patterns, geographic hotspots, weather
              information and infrastructure records to identify
              areas that may require preventive maintenance.
            </p>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Analytics