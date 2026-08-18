import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">

        <div>
          <h1 className="text-2xl font-bold">
            CitiFix <span className="text-blue-500">AI</span>
          </h1>

          <p className="text-xs text-slate-400">
            Urban Infrastructure Intelligence
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition"
          >
            Login
          </Link>

          <Link
            to="/citizen/submit"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Report an Issue
          </Link>
        </div>

      </nav>


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="max-w-3xl">

          <p className="text-blue-400 font-medium mb-4">
            SMART CITY • AI • CIVIC INFRASTRUCTURE
          </p>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Smarter reporting.
            <br />
            <span className="text-blue-500">
              Faster civic action.
            </span>
          </h2>

          <p className="text-lg text-slate-400 mt-6 max-w-2xl leading-relaxed">
            CitiFix AI helps citizens report urban infrastructure
            problems using images. Artificial intelligence can identify
            issues such as potholes, garbage accumulation, waterlogging
            and road damage, helping authorities organize and prioritize
            complaints.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/citizen/submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              Report a Problem
            </Link>

            <Link
              to="/admin"
              className="px-6 py-3 border border-slate-700 hover:bg-slate-800 rounded-lg font-medium transition"
            >
              Admin Dashboard
            </Link>

          </div>

        </div>


        {/* Feature Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              📷
            </div>

            <h3 className="text-xl font-semibold">
              Image-Based Reporting
            </h3>

            <p className="text-slate-400 mt-2">
              Citizens can report infrastructure problems by
              uploading an image instead of manually describing
              the problem.
            </p>

          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              🤖
            </div>

            <h3 className="text-xl font-semibold">
              AI Detection
            </h3>

            <p className="text-slate-400 mt-2">
              YOLOv8-based computer vision can identify different
              categories of urban infrastructure problems.
            </p>

          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              📍
            </div>

            <h3 className="text-xl font-semibold">
              Location Intelligence
            </h3>

            <p className="text-slate-400 mt-2">
              Complaint locations can be visualized on an
              interactive map for municipal authorities.
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}

      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        CitiFix AI — Urban Infrastructure Monitoring Platform
      </footer>

    </div>
  )
}

export default Landing