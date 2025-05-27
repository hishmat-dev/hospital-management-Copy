import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  vitals: [
    {
      id: 1,
      patientName: "John Doe",
      room: "101",
      bed: "A",
      nurseName: "Sarah Johnson",
      shift: "day",
      date: "2024-01-15",
      time: "10:30",
      bloodPressure: "120/80",
      heartRate: 72,
      temperature: 98.6,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      painLevel: 2,
      weight: 180,
      height: 70,
      bloodGlucose: 95,
      notes: "Patient stable, no concerns",
      status: "Recorded",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      room: "102",
      bed: "B",
      nurseName: "Mike Wilson",
      shift: "evening",
      date: "2024-01-15",
      time: "18:00",
      bloodPressure: "118/75",
      heartRate: 68,
      temperature: 98.4,
      respiratoryRate: 14,
      oxygenSaturation: 99,
      painLevel: 1,
      weight: 145,
      height: 65,
      bloodGlucose: 88,
      notes: "Patient comfortable",
      status: "Recorded",
      createdAt: "2024-01-15T18:00:00Z",
    },
  ],
  loading: false,
  error: null,
  filters: {
    search: "",
    shift: "",
    status: "",
    dateRange: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  stats: {
    totalRecords: 0,
    todayRecords: 0,
    criticalAlerts: 0,
    averageVitals: {},
  },
  selectedVital: null,
}

// Async thunks
export const fetchVitals = createAsyncThunk("nursing/fetchVitals", async (params = {}, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { vitals: initialState.vitals, total: initialState.vitals.length }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const createVitals = createAsyncThunk("nursing/createVitals", async (vitalData, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...vitalData, id: Date.now() }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateVitals = createAsyncThunk("nursing/updateVitals", async (vitalData, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return vitalData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteVitals = createAsyncThunk("nursing/deleteVitals", async (vitalId, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return vitalId
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const nursingSlice = createSlice({
  name: "nursing",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSelectedVital: (state, action) => {
      state.selectedVital = action.payload
    },
    updateNursingStats: (state) => {
      state.stats = {
        totalRecords: state.vitals.length,
        todayRecords: state.vitals.filter((v) => new Date(v.date).toDateString() === new Date().toDateString()).length,
        criticalAlerts: state.vitals.filter((v) => v.painLevel > 7 || v.heartRate > 100 || v.temperature > 101).length,
        averageVitals: {
          heartRate: Math.round(state.vitals.reduce((sum, v) => sum + v.heartRate, 0) / state.vitals.length),
          temperature: (state.vitals.reduce((sum, v) => sum + v.temperature, 0) / state.vitals.length).toFixed(1),
        },
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch vitals
      .addCase(fetchVitals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVitals.fulfilled, (state, action) => {
        state.loading = false
        state.vitals = action.payload.vitals
        state.pagination.total = action.payload.total
      })
      .addCase(fetchVitals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create vitals
      .addCase(createVitals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createVitals.fulfilled, (state, action) => {
        state.loading = false
        state.vitals.push(action.payload)
      })
      .addCase(createVitals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update vitals
      .addCase(updateVitals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateVitals.fulfilled, (state, action) => {
        state.loading = false
        const index = state.vitals.findIndex((v) => v.id === action.payload.id)
        if (index !== -1) {
          state.vitals[index] = action.payload
        }
      })
      .addCase(updateVitals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete vitals
      .addCase(deleteVitals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVitals.fulfilled, (state, action) => {
        state.loading = false
        state.vitals = state.vitals.filter((v) => v.id !== action.payload)
      })
      .addCase(deleteVitals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setFilters, setSelectedVital, updateNursingStats, clearError } = nursingSlice.actions
export default nursingSlice.reducer
export { nursingSlice }
