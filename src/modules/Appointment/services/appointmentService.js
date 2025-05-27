// Appointment API Service Layer
const API_BASE = "/api/appointments"

export const appointmentService = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}?${queryString}`)
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (appointmentData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    })
    return response.json()
  },

  update: async (id, appointmentData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  getByDoctor: async (doctorId, date) => {
    const response = await fetch(`${API_BASE}/doctor/${doctorId}?date=${date}`)
    return response.json()
  },

  getByPatient: async (patientId) => {
    const response = await fetch(`${API_BASE}/patient/${patientId}`)
    return response.json()
  },

  checkAvailability: async (doctorId, date, time) => {
    const response = await fetch(`${API_BASE}/availability?doctorId=${doctorId}&date=${date}&time=${time}`)
    return response.json()
  },
}
