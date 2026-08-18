import { Link } from 'react-router-dom'

function CitizenDashboard() {
  const complaints = [
    {
      id: 'CF-1024',
      type: 'Pothole',
      location: 'Main Road',
      status: 'Under Review',
      date: '13 Aug 2026',
      priority: 'High',
    },
    {
      id: 'CF-1021',
      type: 'Garbage Accumulation',
      location: 'Market Area',
      status: 'Assigned',
      date: '12 Aug 2026',
      priority: 'Medium',
    },
    {
      id: 'CF-1017',
      type: 'Waterlogging',
      location: 'Sector 12',
      status: 'Resolved',
      date: '10 Aug 2026',
      priority: 'High',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-slate-950 text-white px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              CitiFix <span className="text-blue-500">AI</span>
            </h1>

            <p className="text-xs text-slate-400">
              Citizen Portal
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="text-sm text-slate-300">
              Welcome, Citizen
            </span>

            <Link
              to="/"
              className="text-sm text-slate-400 hover:text-white"
            >
              Logout
            </Link>

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
              8
            </h3>
          </div>


          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Under Review
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              2
            </h3>
          </div>


          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Resolved
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              5
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


          <div className="divide-y divide-slate-200">

            {complaints.map((complaint) => (

              <div
                key={complaint.id}
                className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

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
                    {complaint.location} • {complaint.date}
                  </p>
                </div>


                <div className="flex items-center gap-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      complaint.priority === 'High'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {complaint.priority}
                  </span>


                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      complaint.status === 'Resolved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {complaint.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}

export default CitizenDashboard