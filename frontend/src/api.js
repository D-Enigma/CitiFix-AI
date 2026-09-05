// Backend API base URL
// Read the backend URL from the Vite environment configuration.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'


// Register a new citizen account
export async function registerUser(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Registration failed')
  }

  return data
}


// Login a citizen or admin account
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Login failed')
  }

  return data
}


// Fetch complaints belonging to the logged-in citizen
export async function getMyComplaints(token) {
  const response = await fetch(`${API_BASE_URL}/complaints/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Could not fetch complaints')
  }

  return data
}


// Submit a new civic complaint with an image
export async function submitComplaint(
  token,
  issueType,
  description,
  latitude,
  longitude,
  image
) {
  const formData = new FormData()

  formData.append('issue_type', issueType || '')
  formData.append('description', description || '')
  formData.append('latitude', latitude)
  formData.append('longitude', longitude)
  formData.append('image', image)

  const response = await fetch(`${API_BASE_URL}/complaints/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Complaint submission failed')
  }

  return data
}


// Fetch all complaints for the admin dashboard
export async function getAllComplaints(token) {
  const response = await fetch(`${API_BASE_URL}/complaints/admin/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Could not fetch complaints')
  }

  return data
}


// Fetch one complaint using its MongoDB ID
export async function getComplaintById(token, complaintId) {
  const response = await fetch(
    `${API_BASE_URL}/complaints/${complaintId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Could not fetch complaint')
  }

  return data
}


// Update the status of a complaint
export async function updateComplaintStatus(
  token,
  complaintId,
  status
) {
  // Send status as form data because the backend uses Form(...)
  const formData = new FormData()
  formData.append('status', status)

  const response = await fetch(
    `${API_BASE_URL}/complaints/${complaintId}/status`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || 'Could not update complaint status'
    )
  }

  return data
}


// Build the browser URL for an uploaded complaint image
export function getImageUrl(imagePath) {
  if (!imagePath) {
    return null
  }

  // Convert Windows backslashes into browser-friendly slashes
  const cleanPath = imagePath.replace(/\\/g, '/')

  if (cleanPath.startsWith('http')) {
    return cleanPath
  }

  return `${API_BASE_URL}/${cleanPath}`
}