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
  patients : [
  {
    id: "P-2001",
    name: "Ahmed Shaikh",
    age: 45,
    gender: "Male",
    phone: "+92-300-1234567",
    dateOfBirth: "1978-05-20",
    bloodType: "O+",
    email: "owais.shaikh@example.com",
    address: "House 45, PECHS Block 6, Karachi",
    bloodGroup: "O+",
    department: "Cardiology",
    doctor: "Dr. Sarah Khan",
    consultingDoctor: "Dr. Elina Akhtar",
    admissionDate: "2024-01-15",
    status: "Admitted",
    medicalHistory: ["Hypertension", "Diabetes Type 2"],
    emergencyContact: "Amina Shaikh - +92-301-7654321",
    insurance: "State Life Insurance",
    allergies: ["Penicillin", "Shellfish"],
    visits: [
      {
        visitDate: "2025-01-22",
        consultingDoctor: "Dr. Elina Akhtar",
        department: "Cardiology",
        feePaid: 300,
        prescription:
          "Patient advised lifestyle modifications and medication for hypertension and diabetes.",
        reports: {
          weight: "80kg",
          bloodPressure: "140/90",
          sugarBefore: 160,
          sugarAfter: 210,
        },
        medicines: [
          { name: "Metformin", schedule: { morning: 1, afternoon: 0, night: 1 } },
          { name: "Amlodipine", schedule: { morning: 1, afternoon: 0, night: 0 } },
          { name: "Aspirin", schedule: { morning: 0, afternoon: 1, night: 1 } },
        ],
      },
    ],
  },
  {
    id: "P-2002",
    name: "Areeba Tariq",
    age: 32,
    gender: "Female",
    phone: "+92-331-9876543",
    dateOfBirth: "1992-04-10",
    bloodType: "A+",
    email: "areeba.tariq@example.com",
    address: "Flat 12-B, Gulshan-e-Iqbal, Lahore",
    bloodGroup: "A+",
    department: "Orthopedics",
    doctor: "Dr. Hamza Raza",
    consultingDoctor: "Dr. Elina Akhtar",
    admissionDate: "2024-12-20",
    status: "Discharged",
    medicalHistory: ["Fracture History"],
    emergencyContact: "Tariq Mehmood - +92-334-5556789",
    insurance: "EFU HealthCare",
    allergies: ["None"],
    visits: [
      {
        visitDate: "2025-01-12",
        consultingDoctor: "Dr. Elina Akhtar",
        department: "Orthopedics",
        feePaid: 300,
        prescription: "Prescribed calcium supplements and physiotherapy.",
        reports: {
          weight: "60kg",
          bloodPressure: "120/80",
          sugarBefore: 85,
          sugarAfter: 130,
        },
        medicines: [
          { name: "Caltrate", schedule: { morning: 1, afternoon: 0, night: 1 } },
          { name: "Ibuprofen", schedule: { morning: 1, afternoon: 1, night: 0 } },
        ],
      },
    ],
  },
  {
    id: "P-2003",
    name: "Bilal Ahmed",
    age: 28,
    gender: "Male",
    phone: "+92-345-1122334",
    dateOfBirth: "1996-02-15",
    bloodType: "B+",
    email: "bilal.ahmed@example.com",
    address: "House 89, F-8/3, Islamabad",
    bloodGroup: "B+",
    department: "Emergency",
    doctor: "Dr. Saima Malik",
    consultingDoctor: "Dr. Yasir Mehmood",
    admissionDate: "2024-11-05",
    status: "Under Treatment",
    medicalHistory: ["Asthma"],
    emergencyContact: "Hina Ahmed - +92-300-9988776",
    insurance: "Jubilee Life",
    allergies: ["Dust", "Pollen"],
    visits: [
      {
        visitDate: "2025-01-25",
        consultingDoctor: "Dr. Yasir Mehmood",
        department: "Emergency",
        feePaid: 250,
        prescription: "Prescribed inhalers and advised avoiding allergens.",
        reports: {
          weight: "70kg",
          bloodPressure: "125/85",
          sugarBefore: 95,
          sugarAfter: 110,
        },
        medicines: [
          { name: "Ventolin Inhaler", schedule: { morning: 1, afternoon: 1, night: 1 } },
          { name: "Montelukast", schedule: { morning: 1, afternoon: 0, night: 1 } },
        ],
      },
    ],
  },
  {
    id: "P-2004",
    name: "Sana Baloch",
    age: 55,
    gender: "Female",
    phone: "+92-321-4455667",
    dateOfBirth: "1970-08-30",
    bloodType: "AB+",
    email: "sana.baloch@example.com",
    address: "Bungalow 22, Satellite Town, Quetta",
    bloodGroup: "AB+",
    department: "Neurology",
    doctor: "Dr. Asad Shah",
    consultingDoctor: "Dr. Fariha Siddiqui",
    admissionDate: "2025-01-10",
    status: "Admitted",
    medicalHistory: ["Migraine", "High Blood Pressure"],
    emergencyContact: "Iqbal Baloch - +92-312-3344556",
    insurance: "Adamjee Health",
    allergies: ["Latex"],
    visits: [
      {
        visitDate: "2025-01-20",
        consultingDoctor: "Dr. Fariha Siddiqui",
        department: "Neurology",
        feePaid: 320,
        prescription: "Prescribed pain management and migraine tracking.",
        reports: {
          weight: "65kg",
          bloodPressure: "150/95",
          sugarBefore: 110,
          sugarAfter: 160,
        },
        medicines: [
          { name: "Sumatriptan", schedule: { morning: 1, afternoon: 0, night: 1 } },
          { name: "Propranolol", schedule: { morning: 1, afternoon: 1, night: 0 } },
        ],
      },
    ],
  },
  ],
  selectedPatient: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    sortBy: "name", 
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
      // console.log("Setting filters:", action.payload)
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        status: "",
        sortBy: "name"
      }
      state.pagination.page = 1
    }
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

export const { setSelectedPatient, setFilters, setPagination, clearError, resetFilters } = patientSlice.actions

export default patientSlice.reducer
