import { Link } from 'react-router-dom'
import ComplaintMap from '../components/ComplaintMap'

function AdminDashboard() {
  const recentComplaints = [
    {
      id: 'CF-1025',
      type: 'Pothole',
      location: 'Main Road',
      priority: 'High',
      status: 'New',
    },
    {
      id: 'CF-1024',
      type: 'Garbage Accumulation',
      location: 'Market Area',
      priority: 'Medium',
      status: 'Under Review',
    },
    {
      id: 'CF-1023',
      type: 'Waterlogging',
      location: 'Sector 12',
      priority: 'High',
      status: 'Assigned',
    },
    {
      id: 'CF-1022',
      type: 'Road Crack',
      location: 'Station Road',
      priority: 'Low',
      status: 'Resolved',
    },
  ]

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


      {/* Main Content */}

      <main className="ml-64 min-h-screen">

        {/* Top Bar */}

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


            <div className="text-right">

              <p className="text-sm font-medium text-slate-900">
                Municipal Administrator
              </p>

              <p className="text-xs text-slate-400">
                City Operations
              </p>

            </div>

          </div>

        </header>


        <div className="p-8">


          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            <div className="bg-white rounded-xl p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Complaints
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                248
              </h3>

              <p className="text-xs text-green-600 mt-2">
                ↑ 12% this month
              </p>

            </div>


            <div className="bg-white rounded-xl p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                72
              </h3>

              <p className="text-xs text-yellow-600 mt-2">
                Requires attention
              </p>

            </div>


            <div className="bg-white rounded-xl p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                High Priority
              </p>

              <h3 className="text-3xl font-bold text-red-600 mt-2">
                31
              </h3>

              <p className="text-xs text-red-500 mt-2">
                Critical infrastructure issues
              </p>

            </div>


            <div className="bg-white rounded-xl p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                145
              </h3>

              <p className="text-xs text-green-600 mt-2">
                58% resolution rate
              </p>

            </div>

          </div>


          {/* Complaint Categories */}

          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <div className="mb-5">

              <h3 className="text-xl font-bold text-slate-900">
                Complaint Categories
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Distribution of reported infrastructure issues
              </p>

            </div>


            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Potholes
                </p>
                <p className="text-2xl font-bold mt-1">
                  82
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Garbage
                </p>
                <p className="text-2xl font-bold mt-1">
                  64
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Waterlogging
                </p>
                <p className="text-2xl font-bold mt-1">
                  41
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Road Cracks
                </p>
                <p className="text-2xl font-bold mt-1">
                  37
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Other
                </p>
                <p className="text-2xl font-bold mt-1">
                  24
                </p>
              </div>

            </div>

          </div>


          {/* Map */}

          <ComplaintMap />


          {/* Recent Complaints */}

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
                className="text-sm text-blue-600 hover:underline"
              >
                View all
              </Link>

            </div>


            <div className="divide-y divide-slate-200">

              {recentComplaints.map((complaint) => (

                <Link
                  key={complaint.id}
                  to={`/admin/complaints/${complaint.id}`}
                  className="block p-5 hover:bg-slate-50 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-3">

                        <h4 className="font-semibold text-slate-900">
                          {complaint.type}
                        </h4>

                        <span className="text-xs text-slate-400">
                          {complaint.id}
                        </span>

                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        📍 {complaint.location}
                      </p>

                    </div>


                    <div className="flex items-center gap-3">

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


                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {complaint.status}
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard