// Doctor API Service Layer
const API_BASE = "/api/doctors"

export const doctorService = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}?${queryString}`)
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (doctorData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData),
    })
    return response.json()
  },

  update: async (id, doctorData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  getBySpecialty: async (specialty) => {
    const response = await fetch(`${API_BASE}/specialty/${specialty}`)
    return response.json()
  },

  getSchedule: async (doctorId, date) => {
    const response = await fetch(`${API_BASE}/${doctorId}/schedule?date=${date}`)
    return response.json()
  },
}
