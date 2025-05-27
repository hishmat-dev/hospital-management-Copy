// Emergency API Service Layer
const API_BASE = "/api/emergency"

export const emergencyService = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}?${queryString}`)
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (emergencyData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emergencyData),
    })
    return response.json()
  },

  update: async (id, emergencyData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emergencyData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  triage: async (id, triageData) => {
    const response = await fetch(`${API_BASE}/${id}/triage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(triageData),
    })
    return response.json()
  },

  assignDoctor: async (id, doctorId) => {
    const response = await fetch(`${API_BASE}/${id}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId }),
    })
    return response.json()
  },

  updateVitals: async (id, vitals) => {
    const response = await fetch(`${API_BASE}/${id}/vitals`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vitals),
    })
    return response.json()
  },

  getQueue: async (triageLevel) => {
    const response = await fetch(`${API_BASE}/queue?level=${triageLevel}`)
    return response.json()
  },

  getStatistics: async (date) => {
    const response = await fetch(`${API_BASE}/statistics?date=${date}`)
    return response.json()
  },
}
