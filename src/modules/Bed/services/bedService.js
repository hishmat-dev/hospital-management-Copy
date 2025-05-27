// Bed API Service Layer
const API_BASE = "/api/beds"

export const bedService = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}?${queryString}`)
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (bedData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bedData),
    })
    return response.json()
  },

  update: async (id, bedData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bedData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  assignBed: async (bedId, patientId) => {
    const response = await fetch(`${API_BASE}/${bedId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId }),
    })
    return response.json()
  },

  dischargeBed: async (bedId) => {
    const response = await fetch(`${API_BASE}/${bedId}/discharge`, {
      method: "POST",
    })
    return response.json()
  },

  getAvailableBeds: async (department) => {
    const response = await fetch(`${API_BASE}/available?department=${department}`)
    return response.json()
  },

  getOccupancyReport: async (date) => {
    const response = await fetch(`${API_BASE}/occupancy?date=${date}`)
    return response.json()
  },
}
