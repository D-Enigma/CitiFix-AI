import { Link, useParams } from 'react-router-dom'
import ComplaintMap from '../components/ComplaintMap'

function ComplaintDetails() {
  const { id } = useParams()

  const complaint = {
    id: id || 'CF-1025',
    type: 'Pothole',
    location: 'Main Road, New Delhi',
    date: '13 Aug 2026',
    citizen: 'Rahul Sharma',
    description:
      'Large road damage reported near the main intersection. The damaged area may affect vehicles and road safety.',
    confidence: 91,
    severity: 'High',
    priority: 'High',
    status: 'Under Review',
    coordinates: '28.6139, 77.2090',
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

      </aside>


      {/* Main */}

      <main className="ml-64 min-h-screen">

        {/* Header */}

        <header className="bg-white border-b border-slate-200 px-8 py-5">

          <div className="flex items-center justify-between">

            <div>

              <Link
                to="/admin/complaints"
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back to Complaints
              </Link>

              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                Complaint Details
              </h2>

            </div>

            <span className="text-sm font-medium text-slate-500">
              {complaint.id}
            </span>

          </div>

        </header>


        <div className="p-8">

          {/* Overview */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Complaint Information */}

            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-sm text-slate-500">
                    Detected Issue
                  </p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-1">
                    {complaint.type}
                  </h3>

                </div>

                <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">
                  {complaint.priority} Priority
                </span>

              </div>


              {/* AI Information */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">

                <div className="bg-slate-50 rounded-lg p-4">

                  <p className="text-xs text-slate-500 uppercase">
                    AI Confidence
                  </p>

                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {complaint.confidence}%
                  </p>

                </div>


                <div className="bg-slate-50 rounded-lg p-4">

                  <p className="text-xs text-slate-500 uppercase">
                    Severity
                  </p>

                  <p className="text-2xl font-bold text-red-600 mt-1">
                    {complaint.severity}
                  </p>

                </div>


                <div className="bg-slate-50 rounded-lg p-4">

                  <p className="text-xs text-slate-500 uppercase">
                    Status
                  </p>

                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {complaint.status}
                  </p>

                </div>

              </div>


              {/* Description */}

              <div className="mt-7">

                <h4 className="font-semibold text-slate-900">
                  Complaint Description
                </h4>

                <p className="text-slate-600 mt-2 leading-relaxed">
                  {complaint.description}
                </p>

              </div>


              {/* Metadata */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7 pt-6 border-t border-slate-200">

                <div>

                  <p className="text-xs text-slate-400 uppercase">
                    Reported By
                  </p>

                  <p className="font-medium text-slate-900 mt-1">
                    {complaint.citizen}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-400 uppercase">
                    Date Reported
                  </p>

                  <p className="font-medium text-slate-900 mt-1">
                    {complaint.date}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-400 uppercase">
                    Location
                  </p>

                  <p className="font-medium text-slate-900 mt-1">
                    {complaint.location}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-400 uppercase">
                    Coordinates
                  </p>

                  <p className="font-medium text-slate-900 mt-1">
                    {complaint.coordinates}
                  </p>

                </div>

              </div>

            </div>


            {/* Image */}

            <div className="bg-white rounded-xl shadow-sm p-6">

              <h3 className="font-bold text-slate-900 mb-4">
                Reported Image
              </h3>

              <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center">

                <div className="text-center">

                  <div className="text-6xl mb-4">
                    🕳️
                  </div>

                  <p className="text-sm text-slate-500">
                    Uploaded complaint image
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Pothole detection preview
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* Map */}

          <div className="mt-6">

            <ComplaintMap />

          </div>


          {/* Status Timeline */}

          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <h3 className="text-xl font-bold text-slate-900">
              Complaint Timeline
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current progress of this complaint
            </p>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

              <div>

                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  ✓
                </div>

                <h4 className="font-semibold mt-3">
                  Submitted
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Complaint registered
                </p>

              </div>


              <div>

                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  ✓
                </div>

                <h4 className="font-semibold mt-3">
                  AI Detection
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Issue classified
                </p>

              </div>


              <div>

                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  3
                </div>

                <h4 className="font-semibold mt-3">
                  Under Review
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Municipal verification
                </p>

              </div>


              <div>

                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">
                  4
                </div>

                <h4 className="font-semibold mt-3 text-slate-400">
                  Resolved
                </h4>

                <p className="text-sm text-slate-400 mt-1">
                  Issue resolved
                </p>

              </div>

            </div>

          </div>


          {/* Municipal Action */}

          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

            <h3 className="text-xl font-bold text-slate-900">
              Municipal Action
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Update the complaint after municipal review.
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Update Status
                </label>

                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                  <option>Under Review</option>
                  <option>Assigned</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

              </div>


              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Assign Department
                </label>

                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                  <option>Road Maintenance</option>
                  <option>Sanitation Department</option>
                  <option>Water Management</option>
                  <option>Electrical Department</option>
                </select>

              </div>

            </div>


            <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
              Save Changes
            </button>

          </div>

        </div>

      </main>

    </div>
  )
}

export default ComplaintDetails