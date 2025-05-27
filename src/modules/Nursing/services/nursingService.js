// Nursing API Service Layer
const API_BASE = "/api/nursing"

export const nursingService = {
  // Vitals Management
  getAllVitals: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}/vitals?${queryString}`)
    return response.json()
  },

  createVitals: async (vitalsData) => {
    const response = await fetch(`${API_BASE}/vitals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vitalsData),
    })
    return response.json()
  },

  updateVitals: async (id, vitalsData) => {
    const response = await fetch(`${API_BASE}/vitals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vitalsData),
    })
    return response.json()
  },

  // Medication Management
  getAllMedications: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}/medications?${queryString}`)
    return response.json()
  },

  createMedication: async (medicationData) => {
    const response = await fetch(`${API_BASE}/medications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicationData),
    })
    return response.json()
  },

  updateMedication: async (id, medicationData) => {
    const response = await fetch(`${API_BASE}/medications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicationData),
    })
    return response.json()
  },

  administerMedication: async (id, administrationData) => {
    const response = await fetch(`${API_BASE}/medications/${id}/administer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(administrationData),
    })
    return response.json()
  },

  // Shift Management
  getAllShifts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}/shifts?${queryString}`)
    return response.json()
  },

  createShift: async (shiftData) => {
    const response = await fetch(`${API_BASE}/shifts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shiftData),
    })
    return response.json()
  },

  updateShift: async (id, shiftData) => {
    const response = await fetch(`${API_BASE}/shifts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shiftData),
    })
    return response.json()
  },

  // Patient Care Plans
  getCarePlans: async (patientId) => {
    const response = await fetch(`${API_BASE}/care-plans?patientId=${patientId}`)
    return response.json()
  },

  createCarePlan: async (carePlanData) => {
    const response = await fetch(`${API_BASE}/care-plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carePlanData),
    })
    return response.json()
  },

  // Nursing Notes
  getNursingNotes: async (patientId) => {
    const response = await fetch(`${API_BASE}/notes?patientId=${patientId}`)
    return response.json()
  },

  createNursingNote: async (noteData) => {
    const response = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    })
    return response.json()
  },
}
