import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { bedService } from "../services/bedService"

export const fetchBeds = createAsyncThunk("beds/fetchBeds", async (params) => {
  return await bedService.getAll(params)
})

export const createBed = createAsyncThunk("beds/createBed", async (bedData) => {
  return await bedService.create(bedData)
})

export const updateBed = createAsyncThunk("beds/updateBed", async ({ id, data }) => {
  return await bedService.update(id, data)
})

export const deleteBed = createAsyncThunk("beds/deleteBed", async (id) => {
  await bedService.delete(id)
  return id
})

export const assignBed = createAsyncThunk("beds/assignBed", async ({ bedId, patientId, patientName }) => {
  await bedService.assignBed(bedId, patientId)
  return { bedId, patientId, patientName }
})

export const dischargeBed = createAsyncThunk("beds/dischargeBed", async (bedId) => {
  await bedService.dischargeBed(bedId)
  return bedId
})

const initialState = {
  beds: [
    {
      id: "B-101",
      roomNumber: "101",
      bedNumber: "A",
      floor: "1st Floor",
      department: "Cardiology",
      type: "General",
      status: "Occupied",
      patientId: "P-1001",
      patientName: "John Smith",
      assignedDate: "2024-01-15",
      features: ["Oxygen", "Monitor", "Call Button"],
      dailyRate: "$150",
      nurseName: "Nurse Mary Johnson",
    },
    {
      id: "B-102",
      roomNumber: "102",
      bedNumber: "A",
      floor: "1st Floor",
      department: "Cardiology",
      type: "General",
      status: "Available",
      patientId: null,
      patientName: null,
      assignedDate: null,
      features: ["Oxygen", "Monitor"],
      dailyRate: "$150",
      nurseName: null,
    },
    {
      id: "B-201",
      roomNumber: "201",
      bedNumber: "B",
      floor: "2nd Floor",
      department: "Orthopedics",
      type: "Private",
      status: "Occupied",
      patientId: "P-1002",
      patientName: "Emma Johnson",
      assignedDate: "2024-01-14",
      features: ["Oxygen", "Monitor", "TV", "WiFi"],
      dailyRate: "$250",
      nurseName: "Nurse Sarah Davis",
    },
    {
      id: "B-301",
      roomNumber: "301",
      bedNumber: "A",
      floor: "3rd Floor",
      department: "ICU",
      type: "ICU",
      status: "Reserved",
      patientId: null,
      patientName: null,
      assignedDate: null,
      features: ["Ventilator", "Monitor", "Defibrillator"],
      dailyRate: "$500",
      nurseName: "Nurse Mike Wilson",
    },
    {
      id: "B-302",
      roomNumber: "302",
      bedNumber: "B",
      floor: "3rd Floor",
      department: "ICU",
      type: "ICU",
      status: "Maintenance",
      patientId: null,
      patientName: null,
      assignedDate: null,
      features: ["Ventilator", "Monitor"],
      dailyRate: "$500",
      nurseName: null,
    },
  ],
  selectedBed: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    department: "",
    floor: "",
    type: "",
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 5,
  },
  occupancyStats: {
    total: 5,
    occupied: 2,
    available: 1,
    maintenance: 1,
    reserved: 1,
  },
}

export const bedSlice = createSlice({
  name: "beds",
  initialState,
  reducers: {
    setSelectedBed: (state, action) => {
      state.selectedBed = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateOccupancyStats: (state) => {
      const stats = {
        total: state.beds.length,
        occupied: state.beds.filter((bed) => bed.status === "Occupied").length,
        available: state.beds.filter((bed) => bed.status === "Available").length,
        maintenance: state.beds.filter((bed) => bed.status === "Maintenance").length,
        reserved: state.beds.filter((bed) => bed.status === "Reserved").length,
      }
      state.occupancyStats = stats
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeds.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBeds.fulfilled, (state, action) => {
        state.loading = false
        state.beds = action.payload.data || state.beds
        state.pagination.total = action.payload.total || state.beds.length
      })
      .addCase(fetchBeds.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createBed.fulfilled, (state, action) => {
        state.beds.push(action.payload)
      })
      .addCase(updateBed.fulfilled, (state, action) => {
        const index = state.beds.findIndex((b) => b.id === action.payload.id)
        if (index !== -1) {
          state.beds[index] = action.payload
        }
      })
      .addCase(deleteBed.fulfilled, (state, action) => {
        state.beds = state.beds.filter((b) => b.id !== action.payload)
      })
      .addCase(assignBed.fulfilled, (state, action) => {
        const { bedId, patientId, patientName } = action.payload
        const bed = state.beds.find((b) => b.id === bedId)
        if (bed) {
          bed.status = "Occupied"
          bed.patientId = patientId
          bed.patientName = patientName
          bed.assignedDate = new Date().toISOString().split("T")[0]
        }
      })
      .addCase(dischargeBed.fulfilled, (state, action) => {
        const bed = state.beds.find((b) => b.id === action.payload)
        if (bed) {
          bed.status = "Available"
          bed.patientId = null
          bed.patientName = null
          bed.assignedDate = null
        }
      })
  },
})

export const { setSelectedBed, setFilters, setPagination, updateOccupancyStats, clearError } = bedSlice.actions
export default bedSlice.reducer
