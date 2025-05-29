import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API calls for dashboard data
export const fetchDashboardStats = createAsyncThunk("dashboard/fetchStats", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalPatients: 1250,
        totalDoctors: 85,
        totalAppointments: 320,
        totalBeds: 150,
        occupiedBeds: 120,
        availableBeds: 30,
        emergencyCases: 15,
        labTests: 45,
        nursingRecords: 180,
      })
    }, 1000)
  })
})

export const fetchRecentActivities = createAsyncThunk("dashboard/fetchActivities", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "patient",
          message: "New patient John Doe registered",
          time: "2 minutes ago",
          icon: "user-plus",
        },
        {
          id: 2,
          type: "appointment",
          message: "Appointment scheduled with Dr. Smith",
          time: "5 minutes ago",
          icon: "calendar",
        },
        {
          id: 3,
          type: "emergency",
          message: "Emergency case admitted to ICU",
          time: "10 minutes ago",
          icon: "alert-triangle",
        },
        {
          id: 4,
          type: "lab",
          message: "Lab test results available for Patient ID: P-001",
          time: "15 minutes ago",
          icon: "flask",
        },
        {
          id: 5,
          type: "bed",
          message: "Bed B-205 assigned to new patient",
          time: "20 minutes ago",
          icon: "bed",
        },
      ])
    }, 800)
  })
})

// New thunk for specialties
export const fetchSpecialties = createAsyncThunk("dashboard/fetchSpecialties", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Cardiology", doctors: 10, patients: 50 },
        { id: 2, name: "Neurology", doctors: 8, patients: 40 },
        { id: 3, name: "Orthopedics", doctors: 6, patients: 30 },
        { id: 4, name: "Pediatrics", doctors: 12, patients: 60 },
        { id: 5, name: "General Surgery", doctors: 9, patients: 45 },
      ])
    }, 700)
  })
})

// New thunk for recent patients
export const fetchRecentPatients = createAsyncThunk("dashboard/fetchRecentPatients", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "P-001", name: "John Doe", admittedOn: "2025-05-20", department: "Cardiology", status: "Admitted" },
        { id: "P-002", name: "Jane Smith", admittedOn: "2025-05-19", department: "Neurology", status: "Outpatient" },
        { id: "P-003", name: "Robert Johnson", admittedOn: "2025-05-18", department: "Orthopedics", status: "Discharged" },
      ])
    }, 700)
  })
})

const initialState = {
  stats: {
    totalPatients: 1250,
    totalDoctors: 85,
    doctorsOnDuty: 8,
    totalBeds: 150,
    todaysAppointments: 120,
    availableBeds: 30,
    emergencyCases: 15,
    surgeriesToday: 4,
    nursingRecords: 180,
  },
  specialties: [
    { id: 1, name: "Cardiology", doctors: 10, patients: 50 },
    { id: 2, name: "Neurology", doctors: 8, patients: 40 },
    { id: 3, name: "Orthopedics", doctors: 6, patients: 30 },
    { id: 4, name: "Pediatrics", doctors: 12, patients: 60 },
    { id: 5, name: "General Surgery", doctors: 9, patients: 45 },
  ],
  recentPatients: [
    { id: "P-001", name: "John Doe", admittedOn: "2025-05-20", department: "Cardiology", status: "Admitted" },
    { id: "P-002", name: "Jane Smith", admittedOn: "2025-05-19", department: "Neurology", status: "Outpatient" },
    { id: "P-003", name: "Robert Johnson", admittedOn: "2025-05-18", department: "Orthopedics", status: "Discharged" },
  ],
  recentActivities: [],
  loading: false,
  error: null,
  fetched: true, // 👈 mark as already fetched
};


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.fetched = true;
      })

      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Recent activities
      .addCase(fetchRecentActivities.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.loading = false
        state.recentActivities = action.payload
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Specialties
      .addCase(fetchSpecialties.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.loading = false
        state.specialties = action.payload
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Recent Patients
      .addCase(fetchRecentPatients.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRecentPatients.fulfilled, (state, action) => {
        state.loading = false
        state.recentPatients = action.payload
      })
      .addCase(fetchRecentPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearError, updateStats } = dashboardSlice.actions
export default dashboardSlice.reducer