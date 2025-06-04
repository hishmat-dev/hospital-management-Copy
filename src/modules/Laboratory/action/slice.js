import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { laboratoryService } from "../services/laboratoryService";

export const fetchLabTests = createAsyncThunk("laboratory/fetchLabTests", async (params) => {
  return await laboratoryService.getAll(params);
});

export const createLabTest = createAsyncThunk("laboratory/createLabTest", async (labTestData) => {
  return await laboratoryService.create(labTestData);
});

export const updateLabTest = createAsyncThunk("laboratory/updateLabTest", async ({ id, ...data }) => {
  return await laboratoryService.update(id, data);
});

export const deleteLabTest = createAsyncThunk("laboratory/deleteLabTest", async (id) => {
  await laboratoryService.delete(id);
  return id;
});

export const updateTestResults = createAsyncThunk(
  "laboratory/updateTestResults",
  async ({ id, results }) => {
    return await laboratoryService.updateResults(id, { results });
  }
);

const initialState = {
  labTests: [
    {
      id: "L-001",
      patientId: "P-1001",
      patientName: "John Smith",
      patientAge: "45",
      patientGender: "Male",
      testType: "Blood Test",
      testName: "Complete Blood Count (CBC)",
      testCode: "CBC-001",
      category: "Hematology",
      department: "Laboratory",
      doctorName: "Dr. Sarah Wilson",
      orderedDate: "2024-01-18",
      sampleDate: "2024-01-18",
      expectedDate: "2024-01-19",
      reportDate: "2024-01-19",
      status: "Completed",
      priority: "Normal",
      results: [
        {
          name: "Hemoglobin",
          value: "14.5",
          unit: "g/dL",
          referenceRange: "13.5-17.5 g/dL",
          abnormalFlag: "normal",
          resultComments: "Within normal limits",
        },
        {
          name: "White Blood Cells",
          value: "7200",
          unit: "/μL",
          referenceRange: "4,500-11,000/μL",
          abnormalFlag: "normal",
          resultComments: "",
        },
        {
          name: "Platelets",
          value: "250000",
          unit: "/μL",
          referenceRange: "150,000-450,000/μL",
          abnormalFlag: "normal",
          resultComments: "",
        },
        {
          name: "Hematocrit",
          value: "42",
          unit: "%",
          referenceRange: "41-50%",
          abnormalFlag: "normal",
          resultComments: "",
        },
      ],
      technician: "Lab Tech John Doe",
      cost: "$45",
      notes: "Sample processed within 24 hours. All results within normal limits.",
    },
    {
      id: "L-002",
      patientId: "P-1002",
      patientName: "Emma Johnson",
      patientAge: "32",
      patientGender: "Female",
      testType: "X-Ray",
      testName: "X-Ray Chest",
      testCode: "XR-CHEST",
      category: "Radiology",
      department: "Radiology",
      doctorName: "Dr. Michael Brown",
      orderedDate: "2024-01-19",
      sampleDate: "2024-01-19",
      expectedDate: "2024-01-20",
      reportDate: null,
      status: "In Progress",
      priority: "Urgent",
      results: [
        {
          name: "Lung Fields",
          value: "Clear",
          unit: "",
          referenceRange: "Clear",
          abnormalFlag: "normal",
          resultComments: "Pending radiologist confirmation",
        },
        {
          name: "Heart Size",
          value: "Normal",
          unit: "",
          referenceRange: "Normal",
          abnormalFlag: "normal",
          resultComments: "",
        },
        {
          name: "Diaphragm",
          value: "No abnormalities",
          unit: "",
          referenceRange: "No abnormalities",
          abnormalFlag: "normal",
          resultComments: "",
        },
      ],
      technician: "Radiology Tech Sarah Lee",
      cost: "$120",
      notes: "Urgent review requested by physician. Preliminary results pending radiologist confirmation.",
    },
    {
      id: "L-003",
      patientId: "P-1003",
      patientName: "Michael Davis",
      patientAge: "60",
      patientGender: "Male",
      testType: "Blood Test",
      testName: "Lipid Profile",
      testCode: "LIPID-001",
      category: "Biochemistry",
      department: "Laboratory",
      doctorName: "Dr. Lisa Anderson",
      orderedDate: "2024-01-17",
      sampleDate: "2024-01-17",
      expectedDate: "2024-01-18",
      reportDate: "2024-01-18",
      status: "Completed",
      priority: "Normal",
      results: [
        {
          name: "Total Cholesterol",
          value: "195",
          unit: "mg/dL",
          referenceRange: "<200 mg/dL",
          abnormalFlag: "normal",
          resultComments: "",
        },
        {
          name: "LDL Cholesterol",
          value: "120",
          unit: "mg/dL",
          referenceRange: "<100 mg/dL",
          abnormalFlag: "high",
          resultComments: "Elevated, recommend follow-up",
        },
        {
          name: "HDL Cholesterol",
          value: "55",
          unit: "mg/dL",
          referenceRange: ">40 mg/dL",
          abnormalFlag: "normal",
          resultComments: "",
        },
        {
          name: "Triglycerides",
          value: "140",
          unit: "mg/dL",
          referenceRange: "<150 mg/dL",
          abnormalFlag: "normal",
          resultComments: "",
        },
      ],
      technician: "Lab Tech Maria Garcia",
      cost: "$65",
      notes: "LDL cholesterol elevated. Patient advised to follow up with cardiologist.",
    },
    {
      id: "L-004",
      patientId: "P-1004",
      patientName: "Sarah Wilson",
      patientAge: "28",
      patientGender: "Female",
      testType: "MRI",
      testName: "MRI Brain",
      testCode: "MRI-BRAIN",
      category: "Radiology",
      department: "Radiology",
      doctorName: "Dr. James Miller",
      orderedDate: "2024-01-20",
      sampleDate: null,
      expectedDate: "2024-01-22",
      reportDate: null,
      status: "Pending",
      priority: "High",
      results: [],
      technician: "MRI Tech Robert Kim",
      cost: "$850",
      notes: "Patient to be prepped for MRI with contrast.",
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
};

export const laboratorySlice = createSlice({
  name: "laboratory",
  initialState,
  reducers: {
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    updateTestStats: (state) => {
      const stats = {
        total: state.labTests.length,
        pending: state.labTests.filter((test) => test.status === "Pending").length,
        inProgress: state.labTests.filter((test) => test.status === "In Progress").length,
        completed: state.labTests.filter((test) => test.status === "Completed").length,
        cancelled: state.labTests.filter((test) => test.status === "Cancelled").length,
      };
      state.testStats = stats;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabTests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLabTests.fulfilled, (state, action) => {
        state.loading = false;
        state.labTests = action.payload.data || state.labTests;
        state.pagination.total = action.payload.total || state.labTests.length;
      })
      .addCase(fetchLabTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLabTest.fulfilled, (state, action) => {
        state.labTests.push(action.payload);
      })
      .addCase(updateLabTest.fulfilled, (state, action) => {
        const index = state.labTests.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.labTests[index] = action.payload;
        }
      })
      .addCase(deleteLabTest.fulfilled, (state, action) => {
        state.labTests = state.labTests.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTestResults.fulfilled, (state, action) => {
        const index = state.labTests.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.labTests[index].results = action.payload.results;
        }
      });
  },
});

export const { setSelectedTest, setFilters, setPagination, updateTestStats, clearError } =
  laboratorySlice.actions;
export default laboratorySlice.reducer;