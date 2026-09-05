function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">CitiFix AI</h1>
        <p className="text-sm text-slate-400 mt-1">
          Urban Infrastructure
        </p>
      </div>

      <nav className="space-y-2">
        <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-600">
          Dashboard
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Complaints
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Map View
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Analytics
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Settings
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar