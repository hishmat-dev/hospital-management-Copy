// Patient API Service Laye
const API_BASE = "/api/patients"

export const patientService = {
  // CRUD Operations
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}?${queryString}`)
    return response.json()
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (patientData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    return response.json()
  },

  update: async (id, patientData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  
  search: async (searchTerm) => {
    const response = await fetch(`${API_BASE}/search?q=${searchTerm}`)
    return response.json()
  },

  getByDepartment: async (department) => {
    const response = await fetch(`${API_BASE}/department/${department}`)
    return response.json()
  },
}
