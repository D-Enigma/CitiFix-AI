import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { submitComplaint } from '../api'

function SubmitComplaint() {
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('Location not detected')
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const [submitted, setSubmitted] = useState(false)
  const [complaintId, setComplaintId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [detectingLocation, setDetectingLocation] = useState(false)

  // Prevent duplicate complaint submissions.
  const submittingRef = useRef(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleLocation = () => {
    // Check whether the browser supports device geolocation.
    if (!navigator.geolocation) {
      setError('Location detection is not supported by this browser.')
      return
    }

    setError('')
    setDetectingLocation(true)
    setLocation('Detecting your location...')

    // Request the user's current device location.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        // Save the real device coordinates for the complaint.
        setLatitude(lat)
        setLongitude(lng)

        // Display the detected coordinates to the citizen.
        setLocation(
          `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        )

        setDetectingLocation(false)
      },
      (error) => {
        console.error('Location error:', error)

        // Show a useful message when location permission or GPS fails.
        if (error.code === 1) {
          setError(
            'Location permission was denied. Please allow location access and try again.'
          )
        } else if (error.code === 2) {
          setError(
            'Your location could not be determined. Please try again.'
          )
        } else {
          setError(
            'Location detection timed out. Please try again.'
          )
        }

        setLocation('Location not detected')
        setDetectingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prevent multiple complaint requests at the same time.
    if (submittingRef.current) {
      return
    }

    submittingRef.current = true
    setError('')

    if (!image) {
      setError('Please upload an image of the issue.')
      submittingRef.current = false
      return
    }

    // Require real device coordinates before submitting.
    if (latitude === null || longitude === null) {
      setError('Please detect your location before submitting.')
      submittingRef.current = false
      return
    }

    const token = localStorage.getItem('access_token')

    if (!token) {
      setError('Please login before submitting a complaint.')
      submittingRef.current = false
      return
    }

    setLoading(true)

    try {
      // Send the real GPS coordinates with the complaint.
      const data = await submitComplaint(
        token,
        'Pending',
        description,
        latitude,
        longitude,
        image
      )

      // Store the complaint ID returned by the backend.
      setComplaintId(data.complaint_id)
      setSubmitted(true)
    } catch (error) {
      // Display the backend or network error.
      setError(
        error.message || 'Could not submit complaint.'
      )
    } finally {
      // Release the duplicate-submission lock.
      submittingRef.current = false
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-lg w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

          <h2 className="text-2xl font-bold text-slate-900 mt-5">
            Complaint Submitted
          </h2>

          <p className="text-slate-500 mt-2">
            Your complaint has been successfully registered.
          </p>

          <div className="bg-slate-50 rounded-lg p-4 mt-6 text-left">
            <p className="text-xs text-slate-400 uppercase">
              Complaint ID
            </p>

            <p className="text-sm font-medium text-slate-900 mt-1 break-all">
              {complaintId}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/citizen/complaints"
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              View My Complaints
            </Link>

            <Link
              to="/citizen"
              className="px-5 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-950 text-white px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/citizen">
            <h1 className="text-2xl font-bold">
              CitiFix <span className="text-blue-500">AI</span>
            </h1>

            <p className="text-xs text-slate-400">
              Citizen Portal
            </p>
          </Link>

          <Link
            to="/citizen/complaints"
            className="text-sm text-slate-300 hover:text-white"
          >
            My Complaints
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Page heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Report a Civic Issue
          </h2>

          <p className="text-slate-500 mt-2">
            Upload an image and provide the location of the issue.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />

            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-7"
        >
          {/* Image upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Evidence Image
            </label>

            <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
              <Upload className="w-10 h-10 text-slate-400 mb-3" />

              <span className="text-sm font-medium text-slate-700">
                Click to upload an image
              </span>

              <span className="text-xs text-slate-400 mt-1">
                Pothole, waterlogging, or garbage accumulation
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Complaint preview"
                  className="w-full max-h-80 object-contain rounded-xl bg-slate-100"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Location
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />

                <span className="text-sm text-slate-600">
                  {location}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLocation}
                disabled={detectingLocation}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-medium"
              >
                {detectingLocation
                  ? 'Detecting...'
                  : 'Detect My Location'}
              </button>
            </div>

            {/* Show the coordinates actually being submitted. */}
            {latitude !== null && longitude !== null && (
              <p className="text-xs text-slate-400 mt-2">
                GPS: {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl font-semibold"
          >
            {loading
              ? 'Analyzing & Submitting...'
              : 'Submit Complaint'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default SubmitComplaint