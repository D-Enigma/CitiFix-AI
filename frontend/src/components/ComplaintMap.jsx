import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'

// Fix Leaflet marker icons in React/Vite.
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Create a colored Leaflet marker icon for each complaint category.
const createColoredIcon = (color) =>
  L.divIcon({
    className: '',
    html: `
      <div
        style="
          width: 24px;
          height: 24px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        "
      ></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  })

// Define the map marker colors for each civic issue.
const issueIcons = {
  Pothole: createColoredIcon('#dc2626'),
  Waterlogging: createColoredIcon('#2563eb'),
  'Garbage Accumulation': createColoredIcon('#16a34a'),
}

// Normalize issue names before choosing their marker color.
const normalizeIssueType = (issueType) => {
  if (!issueType) return 'Unknown'

  const normalized = issueType.toLowerCase()

  if (normalized === 'pothole') {
    return 'Pothole'
  }

  if (normalized === 'waterlogging') {
    return 'Waterlogging'
  }

  if (normalized === 'garbage accumulation') {
    return 'Garbage Accumulation'
  }

  return issueType
}

// Format complaint dates for the marker popup.
const formatDate = (date) => {
  if (!date) return 'Unknown date'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Unknown date'
  }

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Get the complaint ID regardless of the backend ID field name.
const getComplaintId = (complaint) => {
  return (
    complaint.complaint_id ||
    complaint.id ||
    complaint._id ||
    'Unknown ID'
  )
}

function ComplaintMap({ complaints = [] }) {
  // Keep only complaints that have valid GPS coordinates.
  const validComplaints = complaints.filter(
    (complaint) =>
      complaint.latitude !== undefined &&
      complaint.latitude !== null &&
      complaint.longitude !== undefined &&
      complaint.longitude !== null &&
      !Number.isNaN(Number(complaint.latitude)) &&
      !Number.isNaN(Number(complaint.longitude))
  )

  // Use the first real complaint as the initial map center.
  const firstComplaint = validComplaints[0]

  const mapCenter = firstComplaint
    ? [
        Number(firstComplaint.latitude),
        Number(firstComplaint.longitude),
      ]
    : [28.6139, 77.2090]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      {/* Map heading */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-900">
          Complaint Map
        </h3>

        <p className="text-sm text-slate-500">
          Every registered complaint by location
        </p>
      </div>

      {/* Map legend */}
      <div className="flex flex-wrap items-center gap-5 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600" />
          <span className="text-slate-600">
            Pothole
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          <span className="text-slate-600">
            Waterlogging
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-600" />
          <span className="text-slate-600">
            Garbage Accumulation
          </span>
        </div>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[450px] w-full rounded-lg"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render one marker for every registered complaint. */}
        {validComplaints.map((complaint) => {
          const complaintId = getComplaintId(complaint)
          const issueType = normalizeIssueType(
            complaint.issue_type
          )

          // const icon =
          //   issueIcons[issueType] ||
          //   L.Icon.Default.prototype

          return (
            <Marker
              key={complaintId}
              position={[
                Number(complaint.latitude),
                Number(complaint.longitude),
              ]}
              icon={
                issueIcons[issueType] ||
                new L.Icon.Default()
              }
            >
              <Popup>
                <div className="min-w-[220px]">
                  <h4 className="font-bold text-slate-900 text-base">
                    {issueType}
                  </h4>

                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      <strong>Complaint ID:</strong>{' '}
                      {complaintId}
                    </p>

                    <p>
                      <strong>Citizen:</strong>{' '}
                      {complaint.user_name || 'Unknown'}
                    </p>

                    <p>
                      <strong>Priority:</strong>{' '}
                      {complaint.priority || 'Pending'}
                    </p>

                    <p>
                      <strong>Status:</strong>{' '}
                      {complaint.status || 'Submitted'}
                    </p>

                    <p>
                      <strong>Severity:</strong>{' '}
                      {complaint.severity || 'Pending'}
                    </p>

                    <p>
                      <strong>Date:</strong>{' '}
                      {formatDate(complaint.created_at)}
                    </p>

                    <p>
                      <strong>Location:</strong>{' '}
                      {Number(complaint.latitude).toFixed(5)},{' '}
                      {Number(complaint.longitude).toFixed(5)}
                    </p>
                  </div>

                  {/* Open the complete complaint details from the map popup. */}
                  <Link
                    to={`/admin/complaints/${complaintId}`}
                    className="inline-block mt-3 text-sm text-blue-600 hover:underline font-medium"
                  >
                    View Complaint Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Show a useful message when no complaints have coordinates. */}
      {complaints.length > 0 &&
        validComplaints.length === 0 && (
          <p className="text-sm text-slate-500 mt-3">
            No complaints have valid location coordinates.
          </p>
        )}

      {complaints.length === 0 && (
        <p className="text-sm text-slate-500 mt-3">
          No complaints have been registered yet.
        </p>
      )}
    </div>
  )
}

export default ComplaintMap