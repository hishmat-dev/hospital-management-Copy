// Laboratory API Service Layer
const API_BASE = "/api/laboratory"

export const laboratoryService = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}?${queryString}`)
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (labTestData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(labTestData),
    })
    return response.json()
  },

  update: async (id, labTestData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(labTestData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  updateResults: async (id, results) => {
    const response = await fetch(`${API_BASE}/${id}/results`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ results }),
    })
    return response.json()
  },

  getByPatient: async (patientId) => {
    const response = await fetch(`${API_BASE}/patient/${patientId}`)
    return response.json()
  },

  getByDoctor: async (doctorId) => {
    const response = await fetch(`${API_BASE}/doctor/${doctorId}`)
    return response.json()
  },

  generateReport: async (id) => {
    const response = await fetch(`${API_BASE}/${id}/report`)
    return response.blob()
  },
}
