import { useState } from 'react'
import { Link } from 'react-router-dom'

function Complaints() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const complaints = [
    {
      id: 'CF-1025',
      type: 'Pothole',
      location: 'Main Road',
      date: '13 Aug 2026',
      priority: 'High',
      status: 'New',
      citizen: 'Rahul Sharma',
    },
    {
      id: 'CF-1024',
      type: 'Garbage Accumulation',
      location: 'Market Area',
      date: '13 Aug 2026',
      priority: 'Medium',
      status: 'Under Review',
      citizen: 'Priya Singh',
    },
    {
      id: 'CF-1023',
      type: 'Waterlogging',
      location: 'Sector 12',
      date: '12 Aug 2026',
      priority: 'High',
      status: 'Assigned',
      citizen: 'Aman Verma',
    },
    {
      id: 'CF-1022',
      type: 'Road Crack',
      location: 'Station Road',
      date: '12 Aug 2026',
      priority: 'Low',
      status: 'Resolved',
      citizen: 'Neha Kapoor',
    },
    {
      id: 'CF-1021',
      type: 'Pothole',
      location: 'Ring Road',
      date: '11 Aug 2026',
      priority: 'High',
      status: 'Under Review',
      citizen: 'Arjun Mehta',
    },
    {
      id: 'CF-1020',
      type: 'Garbage Accumulation',
      location: 'City Park',
      date: '11 Aug 2026',
      priority: 'Medium',
      status: 'Assigned',
      citizen: 'Riya Gupta',
    },
  ]

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(search.toLowerCase()) ||
      complaint.type.toLowerCase().includes(search.toLowerCase()) ||
      complaint.location.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      complaint.status === statusFilter

    const matchesPriority =
      priorityFilter === 'All' ||
      complaint.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

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

        <div className="absolute bottom-6 left-6 right-6">

          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back to Portal
          </Link>

        </div>

      </aside>


      {/* Main */}

      <main className="ml-64 min-h-screen">

        {/* Header */}

        <header className="bg-white border-b border-slate-200 px-8 py-5">

          <h2 className="text-2xl font-bold text-slate-900">
            Complaint Management
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Review, filter and manage registered civic complaints.
          </p>

        </header>


        <div className="p-8">

          {/* Filters */}

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Search */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search
                </label>

                <input
                  type="text"
                  placeholder="Search complaint, issue or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Status */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option>All</option>
                  <option>New</option>
                  <option>Under Review</option>
                  <option>Assigned</option>
                  <option>Resolved</option>

                </select>

              </div>


              {/* Priority */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Priority
                </label>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>

                </select>

              </div>

            </div>

          </div>


          {/* Complaint Table */}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-200">

              <h3 className="text-lg font-bold text-slate-900">
                Registered Complaints
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredComplaints.length} complaints
              </p>

            </div>


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


                <tbody className="divide-y divide-slate-200">

                  {filteredComplaints.map((complaint) => (

                    <tr
                      key={complaint.id}
                      className="hover:bg-slate-50"
                    >

                      <td className="px-6 py-5">

                        <p className="font-semibold text-slate-900">
                          {complaint.type}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {complaint.id} • {complaint.date}
                        </p>

                      </td>


                      <td className="px-6 py-5">

                        <p className="text-sm text-slate-700">
                          {complaint.location}
                        </p>

                      </td>


                      <td className="px-6 py-5">

                        <p className="text-sm text-slate-700">
                          {complaint.citizen}
                        </p>

                      </td>


                      <td className="px-6 py-5">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.priority === 'High'
                              ? 'bg-red-100 text-red-700'
                              : complaint.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {complaint.priority}
                        </span>

                      </td>


                      <td className="px-6 py-5">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.status === 'Resolved'
                              ? 'bg-green-100 text-green-700'
                              : complaint.status === 'Assigned'
                              ? 'bg-purple-100 text-purple-700'
                              : complaint.status === 'New'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {complaint.status}
                        </span>

                      </td>


                      <td className="px-6 py-5">

                        <Link
                          to={`/admin/complaints/${complaint.id}`}
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          View Details
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Complaints