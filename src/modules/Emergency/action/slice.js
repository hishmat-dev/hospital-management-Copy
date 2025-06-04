import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { emergencyService } from "../services/emergencyService"

export const fetchEmergencyCases = createAsyncThunk("emergency/fetchEmergencyCases", async (params) => {
  return await emergencyService.getAll(params)
})

export const updateStatus = createAsyncThunk(
  "emergency/updateStatus",
  async ({ id, status }, { getState }) => {
    // Simulate API call to update status
    const response = await fetch(`/api/emergency/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }
);

export const createEmergencyCase = createAsyncThunk("emergency/createEmergencyCase", async (emergencyData) => {
  return await emergencyService.create(emergencyData)
})

export const updateEmergencyCase = createAsyncThunk("emergency/updateEmergencyCase", async ({ id, data }) => {
  return await emergencyService.update(id, data)
})

export const deleteEmergencyCase = createAsyncThunk("emergency/deleteEmergencyCase", async (id) => {
  await emergencyService.delete(id)
  return id
})

export const triagePatient = createAsyncThunk("emergency/triagePatient", async ({ id, triageData }) => {
  return await emergencyService.triage(id, triageData)
})

export const assignDoctor = createAsyncThunk("emergency/assignDoctor", async ({ id, doctorId }) => {
  return await emergencyService.assignDoctor(id, doctorId)
})

const initialState = {
  emergencyCases: [
    {
      id: "E-001",
      patientName: "Michael Davis",
      age: 35,
      gender: "Male",
      phone: "+92-345-0010126",
      complaint: "Severe Chest Pain",
      severity: "Critical",
      arrivalTime: "2025-05-27T08:30:00",
      triageLevel: "Level 1",
      triageNurse: "Nurse Jennifer Adams",
      assignedDoctor: "Dr. Sarah Wilson",
      status: "In Treatment",
      vitals: {
        bloodPressure: "160/95",
        heartRate: "110 bpm",
        temperature: "99.2°F",
        respiratoryRate: "22/min",
        oxygenSaturation: "94%",
        painLevel: "9/10",
      },
      symptoms: ["Chest pain", "Shortness of breath", "Sweating"],
      allergies: ["Dust", "Pollen"],
      medications: ["Aspirin", "Lisinopril"],
      emergencyContact: "Sarah Davis - +92-345-0010127",
      room: "ER-1",
      estimatedWaitTime: "0 minutes",
    },
    {
      id: "E-002",
      patientName: "Lisa Anderson",
      age: 28,
      gender: "Female",
      phone: "+92-345-0010130",
      complaint: "Severe Headache with Nausea",
      severity: "High",
      arrivalTime: "2025-05-27T09:15:00",
      triageLevel: "Level 2",
      triageNurse: "Nurse Mike Wilson",
      assignedDoctor: "Dr. James Miller",
      status: "Waiting",
      vitals: {
        bloodPressure: "140/85",
        heartRate: "88 bpm",
        temperature: "100.1°F",
        respiratoryRate: "18/min",
        oxygenSaturation: "97%",
        painLevel: "8/10",
      },
      symptoms: ["Severe headache", "Nausea", "Light sensitivity"],
      allergies: ["Penicillin"],
      medications: ["Ibuprofen"],
      emergencyContact: "Tom Anderson - +92-345-0010131",
      room: "ER-2",
      estimatedWaitTime: "15 minutes",
    },
    {
      id: "E-003",
      patientName: "Robert Johnson",
      age: 45,
      gender: "Male",
      phone: "+92-345-0010132",
      complaint: "Broken Arm from Fall",
      severity: "Medium",
      arrivalTime: "2025-05-27T10:00:00",
      triageLevel: "Level 3",
      triageNurse: "Nurse Sarah Davis",
      assignedDoctor: "Dr. Michael Brown",
      status: "In Treatment",
      vitals: {
        bloodPressure: "125/80",
        heartRate: "75 bpm",
        temperature: "98.6°F",
        respiratoryRate: "16/min",
        oxygenSaturation: "99%",
        painLevel: "6/10",
      },
      symptoms: ["Arm pain", "Swelling", "Limited mobility"],
      allergies: ["None"],
      medications: ["None"],
      emergencyContact: "Mary Johnson - +92-345-0010133",
      room: "ER-3",
      estimatedWaitTime: "30 minutes",
    },
    {
      id: "E-004",
      patientName: "Jennifer White",
      age: 22,
      gender: "Female",
      phone: "+92-345-0010134",
      complaint: "Minor Cut Requiring Stitches",
      severity: "Low",
      arrivalTime: "2025-05-27T11:30:00",
      triageLevel: "Level 4",
      triageNurse: "Nurse Mary Johnson",
      assignedDoctor: "Dr. Lisa Anderson",
      status: "Waiting",
      vitals: {
        bloodPressure: "118/75",
        heartRate: "70 bpm",
        temperature: "98.4°F",
        respiratoryRate: "14/min",
        oxygenSaturation: "99%",
        painLevel: "3/10",
      },
      symptoms: ["Laceration on hand", "Minor bleeding"],
      allergies: ["Latex"],
      medications: ["Birth control"],
      emergencyContact: "David White - +92-345-0010135",
      room: "ER-4",
      estimatedWaitTime: "45 minutes",
    },
  ],
  selectedCase: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    severity: "",
    triageLevel: "",
    status: "",
    assignedDoctor: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 4,
  },
  emergencyStats: {
    total: 4,
    critical: 1,
    high: 1,
    medium: 1,
    low: 1,
    waiting: 2,
    inTreatment: 2,
    discharged: 0,
  },
  queue: {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: [],
  },
}

export const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    setSelectedCase: (state, action) => {
      state.selectedCase = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateEmergencyStats: (state) => {
      const stats = {
        total: state.emergencyCases.length,
        critical: state.emergencyCases.filter((c) => c.severity === "Critical").length,
        high: state.emergencyCases.filter((c) => c.severity === "High").length,
        medium: state.emergencyCases.filter((c) => c.severity === "Medium").length,
        low: state.emergencyCases.filter((c) => c.severity === "Low").length,
        waiting: state.emergencyCases.filter((c) => c.status === "Waiting").length,
        inTreatment: state.emergencyCases.filter((c) => c.status === "In Treatment").length,
        discharged: state.emergencyCases.filter((c) => c.status === "Discharged").length,
      }
      state.emergencyStats = stats
    },
    updateQueue: (state) => {
      const queue = {
        level1: state.emergencyCases.filter((c) => c.triageLevel === "Level 1" && c.status === "Waiting"),
        level2: state.emergencyCases.filter((c) => c.triageLevel === "Level 2" && c.status === "Waiting"),
        level3: state.emergencyCases.filter((c) => c.triageLevel === "Level 3" && c.status === "Waiting"),
        level4: state.emergencyCases.filter((c) => c.triageLevel === "Level 4" && c.status === "Waiting"),
        level5: state.emergencyCases.filter((c) => c.triageLevel === "Level 5" && c.status === "Waiting"),
      }
      state.queue = queue
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmergencyCases.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEmergencyCases.fulfilled, (state, action) => {
        state.loading = false
        state.emergencyCases = action.payload.data || state.emergencyCases
        state.pagination.total = action.payload.total || state.emergencyCases.length
      })
      .addCase(fetchEmergencyCases.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createEmergencyCase.fulfilled, (state, action) => {
        state.emergencyCases.unshift(action.payload)
      })
      .addCase(updateEmergencyCase.fulfilled, (state, action) => {
        const index = state.emergencyCases.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.emergencyCases[index] = action.payload
        }
      })
      .addCase(deleteEmergencyCase.fulfilled, (state, action) => {
        state.emergencyCases = state.emergencyCases.filter((c) => c.id !== action.payload)
      })
      .addCase(triagePatient.fulfilled, (state, action) => {
        const index = state.emergencyCases.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.emergencyCases[index] = action.payload
        }
      })
      .addCase(assignDoctor.fulfilled, (state, action) => {
        const index = state.emergencyCases.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.emergencyCases[index] = action.payload
        }
      }).addCase(updateStatus.fulfilled, (state, action) => {
      const updatedCase = action.payload;
      state.emergencyCases = state.emergencyCases.map((c) =>
        c.id === updatedCase.id ? { ...c, status: updatedCase.status } : c
      );
    });
  },
})

export const { setSelectedCase, setFilters, setPagination, updateEmergencyStats, updateQueue, clearError } =
  emergencySlice.actions

export default emergencySlice.reducer
