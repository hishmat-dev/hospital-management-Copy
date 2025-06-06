import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API calls - replace with actual API endpoints
export const fetchLabTemplates = createAsyncThunk("administrative/fetchLabTemplates", async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const templates = JSON.parse(localStorage.getItem("labTemplates") || "[]")
      resolve(templates)
    }, 500)
  })
})

export const createLabTemplate = createAsyncThunk("administrative/createLabTemplate", async (templateData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const templates = JSON.parse(localStorage.getItem("labTemplates") || "[]")
      const newTemplate = {
        ...templateData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      templates.push(newTemplate)
      localStorage.setItem("labTemplates", JSON.stringify(templates))
      resolve(newTemplate)
    }, 500)
  })
})

export const updateLabTemplate = createAsyncThunk(
  "administrative/updateLabTemplate",
  async ({ id, ...templateData }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const templates = JSON.parse(localStorage.getItem("labTemplates") || "[]")
        const index = templates.findIndex((t) => t.id === id)
        if (index !== -1) {
          templates[index] = { ...templates[index], ...templateData, updatedAt: new Date().toISOString() }
          localStorage.setItem("labTemplates", JSON.stringify(templates))
          resolve(templates[index])
        }
      }, 500)
    })
  },
)

export const deleteLabTemplate = createAsyncThunk("administrative/deleteLabTemplate", async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const templates = JSON.parse(localStorage.getItem("labTemplates") || "[]")
      const filteredTemplates = templates.filter((t) => t.id !== id)
      localStorage.setItem("labTemplates", JSON.stringify(filteredTemplates))
      resolve(id)
    }, 500)
  })
})

const administrativeSlice = createSlice({
  name: "administrative",
  initialState: {
    labTemplates: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch templates
      .addCase(fetchLabTemplates.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLabTemplates.fulfilled, (state, action) => {
        state.loading = false
        state.labTemplates = action.payload
      })
      .addCase(fetchLabTemplates.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Create template
      .addCase(createLabTemplate.pending, (state) => {
        state.loading = true
      })
      .addCase(createLabTemplate.fulfilled, (state, action) => {
        state.loading = false
        state.labTemplates.push(action.payload)
      })
      .addCase(createLabTemplate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Update template
      .addCase(updateLabTemplate.pending, (state) => {
        state.loading = true
      })
      .addCase(updateLabTemplate.fulfilled, (state, action) => {
        state.loading = false
        const index = state.labTemplates.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.labTemplates[index] = action.payload
        }
      })
      .addCase(updateLabTemplate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Delete template
      .addCase(deleteLabTemplate.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteLabTemplate.fulfilled, (state, action) => {
        state.loading = false
        state.labTemplates = state.labTemplates.filter((t) => t.id !== action.payload)
      })
      .addCase(deleteLabTemplate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearError } = administrativeSlice.actions
export default administrativeSlice.reducer
