import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { doctorService } from "../services/doctorService"

export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async (params) => {
  return await doctorService.getAll(params)
})

export const fetchDoctorById = createAsyncThunk("doctors/fetchDoctorById", async (id) => {
  return await doctorService.getById(id)
})

export const createDoctor = createAsyncThunk("doctors/createDoctor", async (doctorData) => {
  return await doctorService.create(doctorData)
})

export const updateDoctor = createAsyncThunk("doctors/updateDoctor", async ({ id, data }) => {
  return await doctorService.update(id, data)
})

export const deleteDoctor = createAsyncThunk("doctors/deleteDoctor", async (id) => {
  await doctorService.delete(id)
  return id
})

const initialState = {
  doctors: [
    {
      id: "D-001",
      name: "Dr. Ayesha Khan",
      specialty: "Cardiology",
      phone: "+92-345-0011001",
      email: "sarah.wilson@hospital.com",
      experience: "15 years",
      qualification: "MD, FACC",
      department: "Cardiology",
      status: "Active",
      availability: "Available",
      shift: "Morning",
      patients: 23,
      address: "123 Medical Plaza, City, State",
      licenseNumber: "MD12345",
      consultationFee: "200",
      schedule: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 3:00 PM"
      },
      appointments: [
        {
          patientId: "P-2001",
          patientName: "Ahmed Shaikh",
          visitDate: "2025-01-22",
          visitTime: "3:00 PM",
          consultingDoctor: "Dr. Elina Akhtar",
          department: "Cardiology",
          feePaid: 300,
          paymentStatus: "Paid",
          appointmentStatus: "Confirmed",
          prescription: "Diabetes management."
        },
        {
          patientId: "P-2003",
          patientName: "Bilal Ahmed",
          visitDate: "2025-01-24",
          visitTime: "4:00 PM",
          consultingDoctor: "Dr. Elina Akhtar",
          department: "Cardiology",
          feePaid: 300,
          paymentStatus: "Paid",
          appointmentStatus: "Cancelled",
          prescription: "Arrhythmia."
        }
      ]
    },
    {
      id: "D-002",
      name: "Dr. Hassan Malik",
      specialty: "Orthopedics",
      phone: "+92-345-0011002",
      email: "michael.brown@hospital.com",
      experience: "12 years",
      qualification: "MD, MS Orthopedics",
      department: "Orthopedics",
      status: "Active",
      availability: "On Duty",
      shift: "Evening",
      patients: 18,
      address: "456 Health Center, City, State",
      licenseNumber: "MD12346",
      consultationFee: "180",
      schedule: {
        monday: "2:00 PM - 10:00 PM",
        tuesday: "2:00 PM - 10:00 PM",
        wednesday: "2:00 PM - 10:00 PM",
        thursday: "2:00 PM - 10:00 PM",
        friday: "2:00 PM - 8:00 PM"
      },
      appointments: [
        {
          patientId: "P-2002",
          patientName: "Areeba Tariq",
          visitDate: "2025-01-12",
          visitTime: "3:00 PM",
          consultingDoctor: "Dr. Elina Akhtar",
          department: "Orthopedics",
          feePaid: 300,
          paymentStatus: "Paid",
          appointmentStatus: "Confirmed",
          prescription: "Physiotherapy.",
          reports: {
            weight: "60kg",
            bloodPressure: "120/80",
            sugarBefore: 85,
            sugarAfter: 130
          },
          medicines: [
            { name: "Caltrate", schedule: { morning: 1, afternoon: 0, night: 1 } },
            { name: "Ibuprofen", schedule: { morning: 1, afternoon: 1, night: 0 } }
          ]
        }
      ]
    },
    {
      id: "D-003",
      name: "Dr. Sana Iqbal",
      specialty: "Emergency Medicine",
      phone: "+92-345-0011003",
      email: "lisa.anderson@hospital.com",
      experience: "8 years",
      qualification: "MD, Emergency Medicine",
      department: "Emergency",
      status: "Active",
      availability: "Available",
      shift: "Night",
      patients: 35,
      address: "789 Emergency Wing, City, State",
      licenseNumber: "MD12347",
      consultationFee: "150",
      schedule: {
        monday: "10:00 PM - 6:00 AM",
        tuesday: "10:00 PM - 6:00 AM",
        wednesday: "10:00 PM - 6:00 AM",
        thursday: "10:00 PM - 6:00 AM",
        friday: "10:00 PM - 6:00 AM"
      },
      appointments: [
        {
          patientId: "P-2003",
          patientName: "Bilal Ahmed",
          visitDate: "2025-01-25",
          visitTime: "3:00 PM",
          consultingDoctor: "Dr. Yasir Mehmood",
          department: "Emergency",
          feePaid: 250,
          paymentStatus: "Paid",
          appointmentStatus: "Confirmed",
          prescription: "Asthma management.",
          reports: {
            weight: "70kg",
            bloodPressure: "125/85",
            sugarBefore: 95,
            sugarAfter: 110
          },
          medicines: [
            { name: "Ventolin Inhaler", schedule: { morning: 1, afternoon: 1, night: 1 } },
            { name: "Montelukast", schedule: { morning: 1, afternoon: 0, night: 1 } }
          ]
        }
      ]
    },
    {
      id: "D-004",
      name: "Dr. Farhan Ahmed",
      specialty: "Neurology",
      phone: "+92-345-0011004",
      email: "james.miller@hospital.com",
      experience: "20 years",
      qualification: "MD, PhD Neurology",
      department: "Neurology",
      status: "Active",
      availability: "Busy",
      shift: "Morning",
      patients: 15,
      address: "321 Neuro Center, City, State",
      licenseNumber: "MD12348",
      consultationFee: "250",
      schedule: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "8:00 AM - 4:00 PM",
        thursday: "8:00 AM - 4:00 PM",
        friday: "8:00 AM - 2:00 PM"
      },
      appointments: [
        {
          patientId: "P-2004",
          patientName: "Sana Baloch",
          visitDate: "2025-01-20",
          visitTime: "3:00 PM",
          consultingDoctor: "Dr. Fariha Siddiqui",
          department: "Neurology",
          feePaid: 0,
          paymentStatus: "Unpaid",
          appointmentStatus: "Waiting",
          prescription: "Migraine management.",
          reports: {
            weight: "65kg",
            bloodPressure: "150/95",
            sugarBefore: 110,
            sugarAfter: 160
          },
          medicines: [
            { name: "Sumatriptan", schedule: { morning: 1, afternoon: 0, night: 1 } },
            { name: "Propranolol", schedule: { morning: 1, afternoon: 1, night: 0 } }
          ]
        }
      ]
    }
  ],
  selectedDoctor: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    department: "",
    status: "",
    sortBy: ""
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 4,
  },
}

export const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
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
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false
        state.doctors = action.payload.data || state.doctors
        state.pagination.total = action.payload.total || state.doctors.length
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        const existingIndex = state.doctors.findIndex((d) => d.id === action.payload.id)
        if (existingIndex !== -1) {
          state.doctors[existingIndex] = action.payload
        } else {
          state.doctors.push(action.payload)
        }
        state.selectedDoctor = action.payload
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload)
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex((d) => d.id === action.payload.id)
        if (index !== -1) {
          state.doctors[index] = action.payload
        }
        state.selectedDoctor = action.payload
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter((d) => d.id !== action.payload)
      })
  },
})

export const { setSelectedDoctor, setFilters, resetFilters, setPagination, clearError } = doctorSlice.actions
export default doctorSlice.reducer