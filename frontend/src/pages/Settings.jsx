import { Link } from 'react-router-dom'

function Settings() {
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
            className="block px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Analytics
          </Link>

          <Link
            to="/admin/settings"
            className="block px-4 py-3 rounded-lg bg-blue-600"
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
            Settings
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage municipal platform settings and preferences.
          </p>

        </header>


        <div className="p-8 max-w-5xl">

          {/* Administrator Profile */}

          <section className="bg-white rounded-xl shadow-sm p-6">

            <h3 className="text-xl font-bold text-slate-900">
              Administrator Profile
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Manage your administrator account information.
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue="Municipal Administrator"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />

              </div>


              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  defaultValue="admin@citifix.ai"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />

              </div>

            </div>


            <button className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
              Save Profile
            </button>

          </section>


          {/* Notification Settings */}

          <section className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <h3 className="text-xl font-bold text-slate-900">
              Notifications
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Choose which complaint alerts administrators receive.
            </p>


            <div className="space-y-5 mt-6">

              <label className="flex items-center justify-between">

                <div>

                  <p className="font-medium text-slate-900">
                    High-priority complaints
                  </p>

                  <p className="text-sm text-slate-500">
                    Receive alerts when a high-priority issue is registered.
                  </p>

                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5"
                />

              </label>


              <label className="flex items-center justify-between">

                <div>

                  <p className="font-medium text-slate-900">
                    New complaints
                  </p>

                  <p className="text-sm text-slate-500">
                    Receive notifications for newly registered complaints.
                  </p>

                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5"
                />

              </label>


              <label className="flex items-center justify-between">

                <div>

                  <p className="font-medium text-slate-900">
                    Resolution updates
                  </p>

                  <p className="text-sm text-slate-500">
                    Receive updates when complaints are resolved.
                  </p>

                </div>

                <input
                  type="checkbox"
                  className="w-5 h-5"
                />

              </label>

            </div>

          </section>


          {/* System Settings */}

          <section className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <h3 className="text-xl font-bold text-slate-900">
              System Configuration
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Configure how CitiFix AI processes infrastructure complaints.
            </p>


            <div className="space-y-5 mt-6">

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Default priority threshold
                </label>

                <select className="w-full md:w-1/2 px-4 py-3 border border-slate-300 rounded-lg">

                  <option>
                    AI confidence based
                  </option>

                  <option>
                    Manual verification
                  </option>

                </select>

              </div>


              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Complaint retention
                </label>

                <select className="w-full md:w-1/2 px-4 py-3 border border-slate-300 rounded-lg">

                  <option>
                    1 Year
                  </option>

                  <option>
                    3 Years
                  </option>

                  <option>
                    5 Years
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* Platform Information */}

          <section className="bg-slate-900 rounded-xl p-6 mt-6 text-white">

            <p className="text-blue-400 text-sm font-medium">
              PLATFORM
            </p>

            <h3 className="text-xl font-bold mt-2">
              CitiFix AI
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              AI-powered urban infrastructure monitoring platform.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">

              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs">
                React
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs">
                FastAPI
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs">
                MongoDB
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs">
                YOLOv8
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs">
                Leaflet
              </span>

            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default Settings