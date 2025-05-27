import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { patientService } from "../services/patientService"

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async (params) => {
  return await patientService.getAll(params)
})

export const fetchPatientById = createAsyncThunk("patients/fetchPatientById", async (id) => {
  return await patientService.getById(id)
})

export const createPatient = createAsyncThunk("patients/createPatient", async (patientData) => {
  return await patientService.create(patientData)
})

export const updatePatient = createAsyncThunk("patients/updatePatient", async ({ id, data }) => {
  return await patientService.update(id, data)
})

export const deletePatient = createAsyncThunk("patients/deletePatient", async (id) => {
  await patientService.delete(id)
  return id
})

const initialState = {
  patients: [
    {
      id: "P-1001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1-555-0123",
      email: "john.smith@email.com",
      address: "123 Main St, City, State 12345",
      bloodGroup: "O+",
      department: "Cardiology",
      doctor: "Dr. Sarah Wilson",
      admissionDate: "2024-01-15",
      status: "Admitted",
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      emergencyContact: "Jane Smith - +1-555-0124",
      insurance: "Blue Cross Blue Shield",
      allergies: ["Penicillin", "Shellfish"],
    },
    {
      id: "P-1002",
      name: "Emma Johnson",
      age: 32,
      gender: "Female",
      phone: "+1-555-0124",
      email: "emma.johnson@email.com",
      address: "456 Oak Ave, City, State 12345",
      bloodGroup: "A+",
      department: "Orthopedics",
      doctor: "Dr. Michael Brown",
      admissionDate: "2024-01-14",
      status: "Discharged",
      medicalHistory: ["Fracture History"],
      emergencyContact: "Robert Johnson - +1-555-0125",
      insurance: "Aetna",
      allergies: ["None"],
    },
    {
      id: "P-1003",
      name: "Michael Davis",
      age: 28,
      gender: "Male",
      phone: "+1-555-0126",
      email: "michael.davis@email.com",
      address: "789 Pine St, City, State 12345",
      bloodGroup: "B+",
      department: "Emergency",
      doctor: "Dr. Lisa Anderson",
      admissionDate: "2024-01-16",
      status: "Under Treatment",
      medicalHistory: ["Asthma"],
      emergencyContact: "Sarah Davis - +1-555-0127",
      insurance: "United Healthcare",
      allergies: ["Dust", "Pollen"],
    },
    {
      id: "P-1004",
      name: "Sarah Wilson",
      age: 55,
      gender: "Female",
      phone: "+1-555-0128",
      email: "sarah.wilson@email.com",
      address: "321 Elm St, City, State 12345",
      bloodGroup: "AB+",
      department: "Neurology",
      doctor: "Dr. James Miller",
      admissionDate: "2024-01-13",
      status: "Admitted",
      medicalHistory: ["Migraine", "High Blood Pressure"],
      emergencyContact: "Tom Wilson - +1-555-0129",
      insurance: "Cigna",
      allergies: ["Latex"],
    },
  ],
  selectedPatient: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    gender: "",
    bloodGroup: "",
    status: "",
    department: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 4,
  },
}

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload
    },
    setFilters: (state, action) => {
      console.log("Setting filters:", action.payload)
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false
        state.patients = action.payload.data || state.patients
        state.pagination.total = action.payload.total || state.patients.length
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        const existingIndex = state.patients.findIndex((p) => p.id === action.payload.id)
        if (existingIndex !== -1) {
          state.patients[existingIndex] = action.payload
        } else {
          state.patients.push(action.payload)
        }
        state.selectedPatient = action.payload
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload)
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.patients[index] = action.payload
        }
        state.selectedPatient = action.payload
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter((p) => p.id !== action.payload)
      })
  },
})

export const { setSelectedPatient, setFilters, setPagination, clearError } = patientSlice.actions
export default patientSlice.reducer
