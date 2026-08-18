import { Link } from 'react-router-dom'

function Analytics() {
  const categories = [
    { name: 'Potholes', count: 82, percentage: 33 },
    { name: 'Garbage', count: 64, percentage: 26 },
    { name: 'Waterlogging', count: 41, percentage: 17 },
    { name: 'Road Cracks', count: 37, percentage: 15 },
    { name: 'Other', count: 24, percentage: 9 },
  ]

  const areas = [
    { name: 'Main Road', complaints: 42 },
    { name: 'Market Area', complaints: 35 },
    { name: 'Sector 12', complaints: 29 },
    { name: 'Station Road', complaints: 24 },
    { name: 'Ring Road', complaints: 18 },
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


      {/* Main */}

      <main className="ml-64 min-h-screen">

        <header className="bg-white border-b border-slate-200 px-8 py-5">

          <h2 className="text-2xl font-bold text-slate-900">
            Analytics
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Understand complaint patterns and infrastructure issues.
          </p>

        </header>


        <div className="p-8">


          {/* Overview cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                Total Reports
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                248
              </p>

            </div>


            <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                Avg. Resolution Time
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                2.8
              </p>

              <p className="text-xs text-slate-400 mt-1">
                days
              </p>

            </div>


            <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                High Priority
              </p>

              <p className="text-3xl font-bold text-red-600 mt-2">
                31
              </p>

            </div>


            <div className="bg-white rounded-xl shadow-sm p-6">

              <p className="text-sm text-slate-500">
                Resolution Rate
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                58%
              </p>

            </div>

          </div>


          {/* Category Distribution */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            <div className="bg-white rounded-xl shadow-sm p-6">

              <h3 className="text-xl font-bold text-slate-900">
                Complaint Distribution
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Complaints by infrastructure category
              </p>


              <div className="space-y-5 mt-7">

                {categories.map((category) => (

                  <div key={category.name}>

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-medium text-slate-700">
                        {category.name}
                      </span>

                      <span className="text-sm text-slate-500">
                        {category.count}
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

            </div>


            {/* Hotspot Areas */}

            <div className="bg-white rounded-xl shadow-sm p-6">

              <h3 className="text-xl font-bold text-slate-900">
                Complaint Hotspots
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Areas with the highest number of complaints
              </p>


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
                            width: `${(area.complaints / 42) * 100}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                ))}

              </div>

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
                  31
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
                  87
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
                  130
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  Routine infrastructure issues
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