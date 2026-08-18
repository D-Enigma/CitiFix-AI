import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import CitizenDashboard from './pages/CitizenDashboard'
import SubmitComplaint from './pages/SubmitComplaint'
import MyComplaints from './pages/MyComplaints'
import AdminDashboard from './pages/AdminDashboard'
import Complaints from './pages/Complaints'
import ComplaintDetails from './pages/ComplaintDetails'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/citizen"
          element={<CitizenDashboard />}
        />

        <Route
          path="/citizen/submit"
          element={<SubmitComplaint />}
        />

        <Route
          path="/citizen/complaints"
          element={<MyComplaints />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/complaints"
          element={<Complaints />}
        />

        <Route
          path="/admin/complaints/:id"
          element={<ComplaintDetails />}
        />

        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />

        <Route
          path="/admin/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App