import ComplaintMap from '../components/ComplaintMap'
function Dashboard() {
  return (
    <main className="flex-1 bg-slate-100 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-slate-500 mt-1">
          Urban infrastructure complaint overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Complaints
          </p>

          <h3 className="text-3xl font-bold mt-2">
            248
          </h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h3 className="text-3xl font-bold mt-2">
            72
          </h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            High Priority
          </p>

          <h3 className="text-3xl font-bold mt-2">
            31
          </h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Resolved
          </p>

          <h3 className="text-3xl font-bold mt-2">
            145
          </h3>
        </div>
      </div>
      <ComplaintMap />
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
  <div className="mb-5">
    <h3 className="text-xl font-bold text-slate-900">
      Recent Complaints
    </h3>

    <p className="text-sm text-slate-500">
      Latest infrastructure complaints registered in the system
    </p>
  </div>

  <div className="space-y-4">

    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h4 className="font-semibold text-slate-900">
          Pothole
        </h4>
        <p className="text-sm text-slate-500">
          Main Road
        </p>
      </div>

      <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
        High
      </span>
    </div>

    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h4 className="font-semibold text-slate-900">
          Garbage Accumulation
        </h4>
        <p className="text-sm text-slate-500">
          Market Area
        </p>
      </div>

      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
        Medium
      </span>
    </div>

    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-slate-900">
          Waterlogging
        </h4>
        <p className="text-sm text-slate-500">
          Sector 12
        </p>
      </div>

      <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
        High
      </span>
    </div>

  </div>
</div>
    </main>
  )
}

export default Dashboard