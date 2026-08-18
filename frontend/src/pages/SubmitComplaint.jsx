import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { submitComplaint } from '../api'

function SubmitComplaint() {
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('Detecting location...')
  const [latitude, setLatitude] = useState(28.6139)
  const [longitude, setLongitude] = useState(77.2090)

  const [submitted, setSubmitted] = useState(false)
  const [complaintId, setComplaintId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleLocation = () => {
    setLatitude(28.6139)
    setLongitude(77.2090)

    setLocation(
      '28.6139, 77.2090 • Main Road, New Delhi'
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!image) {
      setError('Please upload an image of the issue.')
      return
    }

    const token = localStorage.getItem('access_token')

    if (!token) {
      setError('Please login before submitting a complaint.')
      return
    }

    setLoading(true)

    try {
      const data = await submitComplaint(
        token,
        'Pending',
        description,
        latitude,
        longitude,
        image
      )

      setComplaintId(data.complaint_id)
      setSubmitted(true)

    } catch (error) {
      setError(
        error.message || 'Could not submit complaint.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">

          <div className="text-5xl mb-5">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Complaint Submitted
          </h1>

          <p className="text-slate-500 mt-3">
            Your complaint has been registered successfully.
            The system will analyze the uploaded image and
            process the complaint.
          </p>

          <div className="bg-slate-50 rounded-lg p-4 mt-6 text-left">

            <p className="text-sm text-slate-500">
              Complaint ID
            </p>

            <p className="font-bold text-slate-900 mt-1">
              {complaintId}
            </p>

            <p className="text-sm text-slate-500 mt-4">
              Location
            </p>

            <p className="font-medium text-slate-900 mt-1">
              {location}
            </p>

          </div>

          <div className="flex gap-3 mt-7">

            <button
              onClick={() => navigate('/citizen/complaints')}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Track Complaint
            </button>

            <button
              onClick={() => navigate('/citizen')}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </button>

          </div>

        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="bg-slate-950 text-white px-8 py-5">

        <div className="max-w-5xl mx-auto flex items-center justify-between">

          <Link to="/citizen">

            <h1 className="text-2xl font-bold">
              CitiFix <span className="text-blue-500">AI</span>
            </h1>

            <p className="text-xs text-slate-400">
              Citizen Portal
            </p>

          </Link>

          <Link
            to="/citizen"
            className="text-sm text-slate-300 hover:text-white"
          >
            Back to Dashboard
          </Link>

        </div>

      </header>


      {/* Form */}

      <main className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Report a Civic Issue
          </h2>

          <p className="text-slate-500 mt-2">
            Upload a photo of the infrastructure problem.
            The system will identify the issue automatically.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-8"
        >

          {/* Error */}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}


          {/* Image Upload */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Issue Image
            </label>

            {!preview ? (

              <label className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">

                <div className="text-4xl mb-3">
                  📷
                </div>

                <p className="font-medium text-slate-700">
                  Upload an image
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  JPG, PNG or JPEG
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>

            ) : (

              <div className="relative">

                <img
                  src={preview}
                  alt="Complaint preview"
                  className="w-full max-h-96 object-cover rounded-xl"
                />

                <label className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg shadow cursor-pointer text-sm font-medium hover:bg-slate-50">

                  Change Image

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

              </div>

            )}

          </div>


          {/* Description */}

          <div className="mt-7">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
              <span className="font-normal text-slate-400">
                {' '}(Optional)
              </span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Add any additional information about the issue..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <p className="text-xs text-slate-400 mt-2">
              You don't need to identify the problem yourself.
              The AI system will analyze the image.
            </p>

          </div>


          {/* Location */}

          <div className="mt-7">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Location
            </label>

            <div className="flex gap-3">

              <div className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-3">

                <p className="text-sm text-slate-700">
                  📍 {location}
                </p>

              </div>

              <button
                type="button"
                onClick={handleLocation}
                className="px-4 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
              >
                Detect
              </button>

            </div>

            <p className="text-xs text-slate-400 mt-2">
              Location will eventually be detected automatically
              from the user's device.
            </p>

          </div>


          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>

        </form>

      </main>

    </div>
  )
}

export default SubmitComplaint