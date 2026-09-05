import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Image as ImageIcon,
  User,
  FileText,
  ExternalLink,
} from 'lucide-react'

import {
  getComplaintById,
  getImageUrl,
  updateComplaintStatus,
} from '../api'


function ComplaintDetails() {
  const { id } = useParams()

  const [complaint, setComplaint] = useState(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')


  // Load the selected complaint from the backend.
  useEffect(() => {
    const loadComplaint = async () => {
      try {
        setLoading(true)
        setError('')

        const token = localStorage.getItem('access_token')

        if (!token) {
          throw new Error('Admin login required')
        }

        const data = await getComplaintById(token, id)

        setComplaint(data)
        setStatus(data.status || 'Submitted')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadComplaint()
  }, [id])


  // Save the updated complaint status.
  const handleStatusUpdate = async () => {
    try {
      setSaving(true)
      setError('')
      setMessage('')

      const token = localStorage.getItem('access_token')

      if (!token) {
        throw new Error('Admin login required')
      }

      await updateComplaintStatus(
        token,
        id,
        status
      )

      // Update the displayed complaint status immediately.
      setComplaint((previous) => ({
        ...previous,
        status,
      }))

      setMessage('Status updated successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }


  // Show a loading message while complaint data is being fetched.
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">
          Loading complaint...
        </p>
      </div>
    )
  }


  // Show an error when the complaint cannot be loaded.
  if (error && !complaint) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

        <div className="bg-white rounded-xl shadow-sm p-8 text-center">

          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Could not load complaint
          </h2>

          <p className="text-red-600 mb-6">
            {error}
          </p>

          <Link
            to="/admin/complaints"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={18} />
            Back to Complaints
          </Link>

        </div>

      </div>
    )
  }


  // Build the browser URL for the uploaded evidence image.
  const imageUrl = getImageUrl(complaint.image_path)


  return (
    <div className="min-h-screen bg-slate-100">

      {/* Main content container */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Back navigation */}
        <Link
          to="/admin/complaints"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Complaints
        </Link>


        {/* Page heading */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold text-slate-900">
            Complaint Details
          </h1>

          <p className="text-slate-500 mt-1">
            Complaint ID: {complaint.complaint_id || id}
          </p>

        </div>


        {/* Error and success messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
            {message}
          </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main complaint information */}
          <div className="lg:col-span-2 space-y-6">

            {/* Complaint information card */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <div className="flex items-center gap-2 mb-6">

                <FileText size={20} />

                <h2 className="text-xl font-bold text-slate-900">
                  Complaint Information
                </h2>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Complaint ID */}
                <div>
                  <p className="text-sm text-slate-500">
                    Complaint ID
                  </p>

                  <p className="font-semibold text-slate-900 mt-1 break-all">
                    {complaint.complaint_id || id}
                  </p>
                </div>


                {/* Issue Type */}
                <div>
                  <p className="text-sm text-slate-500">
                    Issue Type
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.issue_type || 'Pending'}
                  </p>
                </div>


                {/* Status */}
                <div>
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.status || 'Submitted'}
                  </p>
                </div>


                {/* Severity */}
                <div>
                  <p className="text-sm text-slate-500">
                    Severity
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.severity || 'Pending'}
                  </p>
                </div>


                {/* Priority */}
                <div>
                  <p className="text-sm text-slate-500">
                    Priority
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.priority || 'Pending'}
                  </p>
                </div>


                {/* AI Confidence */}
                <div>
                  <p className="text-sm text-slate-500">
                    AI Confidence
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.ai_confidence !== null &&
                    complaint.ai_confidence !== undefined
                      ? `${Math.round(
                          complaint.ai_confidence * 100
                        )}%`
                      : 'Not detected'}
                  </p>
                </div>


                {/* Created At */}
                <div>
                  <p className="text-sm text-slate-500">
                    Created At
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.created_at
                      ? new Date(
                          complaint.created_at
                        ).toLocaleString('en-IN')
                      : 'Unknown'}
                  </p>
                </div>

              </div>


              {/* Complaint description */}
              <div className="mt-8">

                <p className="text-sm text-slate-500 mb-2">
                  Description
                </p>

                <p className="text-slate-700 leading-relaxed">
                  {complaint.description ||
                    'No description provided.'}
                </p>

              </div>

            </div>


            {/* Citizen information */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <div className="flex items-center gap-2 mb-6">

                <User size={20} />

                <h2 className="text-xl font-bold text-slate-900">
                  Citizen Information
                </h2>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Citizen name */}
                <div>
                  <p className="text-sm text-slate-500">
                    Citizen Name
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.user_name || 'Unknown'}
                  </p>
                </div>


                {/* User ID */}
                <div>
                  <p className="text-sm text-slate-500">
                    User ID
                  </p>

                  <p className="font-semibold text-slate-900 mt-1 break-all">
                    {complaint.user_id || 'Unknown'}
                  </p>
                </div>

              </div>

            </div>


            {/* Location information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <h2 className="text-xl font-bold text-slate-900">
                    Location
                  </h2>
                </div>

                {/* Open the complaint coordinates directly in Google Maps. */}
                {complaint.latitude !== undefined &&
                  complaint.longitude !== undefined && (
                    <a
                      href={`https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      <ExternalLink size={16} />
                      View on Google Maps
                    </a>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Latitude
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.latitude}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Longitude
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {complaint.longitude}
                  </p>
                </div>
              </div>
            </div>

          </div>


          {/* Uploaded evidence */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">

            <div className="flex items-center gap-2 mb-4">

              <ImageIcon size={20} />

              <h2 className="text-xl font-bold text-slate-900">
                Evidence
              </h2>

            </div>


            {imageUrl ? (

              <img
                src={imageUrl}
                alt="Uploaded complaint evidence"
                className="w-full rounded-lg object-cover"
              />

            ) : (

              <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">

                <p className="text-slate-500">
                  No image available
                </p>

              </div>

            )}

          </div>

        </div>


        {/* Status management */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Manage Complaint
          </h2>


          <div className="flex flex-col md:flex-row gap-4">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3 bg-white"
            >

              <option value="Submitted">
                Submitted
              </option>

              <option value="Under Review">
                Under Review
              </option>

              <option value="Assigned">
                Assigned
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>


            <button
              onClick={handleStatusUpdate}
              disabled={saving}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

          </div>

        </div>

      </main>

    </div>
  )
}


export default ComplaintDetails