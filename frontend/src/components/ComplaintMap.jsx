import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

// Fix Leaflet marker icons in React/Vite
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function ComplaintMap() {
  const complaints = [
    {
      id: 1,
      type: 'Pothole',
      location: 'Main Road',
      position: [28.6139, 77.2090],
      severity: 'High',
    },
    {
      id: 2,
      type: 'Garbage Accumulation',
      location: 'Market Area',
      position: [28.6200, 77.2150],
      severity: 'Medium',
    },
    {
      id: 3,
      type: 'Waterlogging',
      location: 'Sector 12',
      position: [28.6080, 77.2180],
      severity: 'High',
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-900">
          Complaint Map
        </h3>

        <p className="text-sm text-slate-500">
          Registered infrastructure complaints by location
        </p>
      </div>

      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[450px] w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((complaint) => (
          <Marker
            key={complaint.id}
            position={complaint.position}
          >
            <Popup>
              <div>
                <strong>{complaint.type}</strong>

                <p>
                  Location: {complaint.location}
                </p>

                <p>
                  Severity: {complaint.severity}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default ComplaintMap