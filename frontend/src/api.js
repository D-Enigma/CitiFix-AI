const API_BASE_URL = 'http://127.0.0.1:8000'


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


export async function submitComplaint(
  token,
  issueType,
  description,
  latitude,
  longitude,
  image
) {
  const formData = new FormData()

  formData.append('issue_type', issueType)
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