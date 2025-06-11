import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  vitals : [
  {
    id: "P-2001",
    patientName: "Ahmed Shaikh",
    room: "201",
    bed: "A",
    nurseName: "Nurse Hira Khan",
    shift: "day",
    date: "2025-05-28",
    time: "09:15",
    bloodPressure: "130/85",
    heartRate: 76,
    temperature: 98.7,
    respiratoryRate: 18,
    oxygenSaturation: 97,
    painLevel: 3,
    weight: 172,
    height: 68,
    bloodGlucose: 105,
    notes: "Mild chest discomfort, under observation",
    status: "Recorded",
    createdAt: "2025-05-28T09:15:00Z",
  },
  {
    id: "P-2002",
    patientName: "Areeba Tariq",
    room: "305",
    bed: "B",
    nurseName: "Nurse Sana Malik",
    shift: "evening",
    date: "2025-05-27",
    time: "18:40",
    bloodPressure: "115/70",
    heartRate: 72,
    temperature: 98.2,
    respiratoryRate: 16,
    oxygenSaturation: 99,
    painLevel: 1,
    weight: 132,
    height: 62,
    bloodGlucose: 90,
    notes: "Recovering well from orthopedic surgery",
    status: "Recorded",
    createdAt: "2025-05-27T18:40:00Z",
  },
  {
    id: "P-2003",
    patientName: "Bilal Ahmed",
    room: "Emergency-2",
    bed: "C",
    nurseName: "Nurse Zeeshan Ali",
    shift: "night",
    date: "2025-05-28",
    time: "02:30",
    bloodPressure: "125/80",
    heartRate: 84,
    temperature: 99.1,
    respiratoryRate: 20,
    oxygenSaturation: 95,
    painLevel: 4,
    weight: 160,
    height: 69,
    bloodGlucose: 110,
    notes: "Asthma triggered by dust exposure, using inhaler",
    status: "Recorded",
    createdAt: "2025-05-28T02:30:00Z",
  },
  {
    id: "P-2004",
    patientName: "Sana Baloch",
    room: "410",
    bed: "A",
    nurseName: "Nurse Farah Yousuf",
    shift: "day",
    date: "2025-05-26",
    time: "11:00",
    bloodPressure: "140/90",
    heartRate: 70,
    temperature: 98.3,
    respiratoryRate: 17,
    oxygenSaturation: 96,
    painLevel: 2,
    weight: 150,
    height: 64,
    bloodGlucose: 100,
    notes: "Monitoring blood pressure regularly",
    status: "Recorded",
    createdAt: "2025-05-26T11:00:00Z",
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
