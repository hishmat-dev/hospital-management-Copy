import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { laboratoryService } from "../services/laboratoryService"

export const fetchLabTests = createAsyncThunk("laboratory/fetchLabTests", async (params) => {
  return await laboratoryService.getAll(params)
})

export const createLabTest = createAsyncThunk("laboratory/createLabTest", async (labTestData) => {
  return await laboratoryService.create(labTestData)
})

export const updateLabTest = createAsyncThunk("laboratory/updateLabTest", async ({ id, data }) => {
  return await laboratoryService.update(id, data)
})

export const deleteLabTest = createAsyncThunk("laboratory/deleteLabTest", async (id) => {
  await laboratoryService.delete(id)
  return id
})

export const updateTestResults = createAsyncThunk("laboratory/updateTestResults", async ({ id, results }) => {
  return await laboratoryService.updateResults(id, results)
})

const initialState = {
  labTests: [
    {
      id: "L-001",
      patientId: "P-1001",
      patientName: "John Smith",
      testName: "Complete Blood Count (CBC)",
      testType: "Blood Test",
      testCode: "CBC-001",
      orderedBy: "Dr. Sarah Wilson",
      orderDate: "2024-01-18",
      sampleCollectedDate: "2024-01-18",
      status: "Completed",
      priority: "Normal",
      results: {
        hemoglobin: "14.5 g/dL",
        whiteBloodCells: "7,200/μL",
        platelets: "250,000/μL",
        hematocrit: "42%",
      },
      normalRanges: {
        hemoglobin: "12.0-15.5 g/dL",
        whiteBloodCells: "4,500-11,000/μL",
        platelets: "150,000-450,000/μL",
        hematocrit: "36-46%",
      },
      reportDate: "2024-01-19",
      technician: "Lab Tech John Doe",
      cost: "$45",
    },
    {
      id: "L-002",
      patientId: "P-1002",
      patientName: "Emma Johnson",
      testName: "X-Ray Chest",
      testType: "Radiology",
      testCode: "XR-CHEST",
      orderedBy: "Dr. Michael Brown",
      orderDate: "2024-01-19",
      sampleCollectedDate: "2024-01-19",
      status: "In Progress",
      priority: "Urgent",
      results: null,
      normalRanges: null,
      reportDate: null,
      technician: "Radiology Tech Sarah Lee",
      cost: "$120",
    },
    {
      id: "L-003",
      patientId: "P-1003",
      patientName: "Michael Davis",
      testName: "Lipid Profile",
      testType: "Blood Test",
      testCode: "LIPID-001",
      orderedBy: "Dr. Lisa Anderson",
      orderDate: "2024-01-17",
      sampleCollectedDate: "2024-01-17",
      status: "Completed",
      priority: "Normal",
      results: {
        totalCholesterol: "195 mg/dL",
        ldlCholesterol: "120 mg/dL",
        hdlCholesterol: "55 mg/dL",
        triglycerides: "140 mg/dL",
      },
      normalRanges: {
        totalCholesterol: "<200 mg/dL",
        ldlCholesterol: "<100 mg/dL",
        hdlCholesterol: ">40 mg/dL",
        triglycerides: "<150 mg/dL",
      },
      reportDate: "2024-01-18",
      technician: "Lab Tech Maria Garcia",
      cost: "$65",
    },
    {
      id: "L-004",
      patientId: "P-1004",
      patientName: "Sarah Wilson",
      testName: "MRI Brain",
      testType: "Radiology",
      testCode: "MRI-BRAIN",
      orderedBy: "Dr. James Miller",
      orderDate: "2024-01-20",
      sampleCollectedDate: null,
      status: "Pending",
      priority: "High",
      results: null,
      normalRanges: null,
      reportDate: null,
      technician: "MRI Tech Robert Kim",
      cost: "$850",
    },
  ],
  selectedTest: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    testType: "",
    priority: "",
    dateRange: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 4,
  },
  testStats: {
    total: 4,
    pending: 1,
    inProgress: 1,
    completed: 2,
    cancelled: 0,
  },
}

export const laboratorySlice = createSlice({
  name: "laboratory",
  initialState,
  reducers: {
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateTestStats: (state) => {
      const stats = {
        total: state.labTests.length,
        pending: state.labTests.filter((test) => test.status === "Pending").length,
        inProgress: state.labTests.filter((test) => test.status === "In Progress").length,
        completed: state.labTests.filter((test) => test.status === "Completed").length,
        cancelled: state.labTests.filter((test) => test.status === "Cancelled").length,
      }
      state.testStats = stats
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabTests.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLabTests.fulfilled, (state, action) => {
        state.loading = false
        state.labTests = action.payload.data || state.labTests
        state.pagination.total = action.payload.total || state.labTests.length
      })
      .addCase(fetchLabTests.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createLabTest.fulfilled, (state, action) => {
        state.labTests.push(action.payload)
      })
      .addCase(updateLabTest.fulfilled, (state, action) => {
        const index = state.labTests.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.labTests[index] = action.payload
        }
      })
      .addCase(deleteLabTest.fulfilled, (state, action) => {
        state.labTests = state.labTests.filter((t) => t.id !== action.payload)
      })
      .addCase(updateTestResults.fulfilled, (state, action) => {
        const index = state.labTests.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.labTests[index] = action.payload
        }
      })
  },
})

export const { setSelectedTest, setFilters, setPagination, updateTestStats, clearError } = laboratorySlice.actions
export default laboratorySlice.reducer
