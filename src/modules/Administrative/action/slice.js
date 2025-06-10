import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Lab Categories API calls
export const fetchLabCategories = createAsyncThunk("administrative/fetchLabCategories", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = JSON.parse(localStorage.getItem("labCategories") || "[]")
      resolve(categories)
    }, 500)
  })
})

export const createLabCategory = createAsyncThunk("administrative/createLabCategory", async (categoryData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = JSON.parse(localStorage.getItem("labCategories") || "[]")
      const newCategory = {
        ...categoryData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      categories.push(newCategory)
      localStorage.setItem("labCategories", JSON.stringify(categories))
      resolve(newCategory)
    }, 500)
  })
})

export const updateLabCategory = createAsyncThunk(
  "administrative/updateLabCategory",
  async ({ id, ...categoryData }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = JSON.parse(localStorage.getItem("labCategories") || "[]")
        const index = categories.findIndex((c) => c.id === id)
        if (index !== -1) {
          categories[index] = { ...categories[index], ...categoryData, updatedAt: new Date().toISOString() }
          localStorage.setItem("labCategories", JSON.stringify(categories))
          resolve(categories[index])
        }
      }, 500)
    })
  },
)

export const deleteLabCategory = createAsyncThunk("administrative/deleteLabCategory", async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = JSON.parse(localStorage.getItem("labCategories") || "[]")
      const filteredCategories = categories.filter((c) => c.id !== id)
      localStorage.setItem("labCategories", JSON.stringify(filteredCategories))
      resolve(id)
    }, 500)
  })
})

// Lab Templates API calls
export const fetchLabTemplates = createAsyncThunk("administrative/fetchLabTemplates", async () => {
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
    labCategories: [],
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
      // Lab Categories
      .addCase(fetchLabCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLabCategories.fulfilled, (state, action) => {
        state.loading = false
        state.labCategories = action.payload
      })
      .addCase(fetchLabCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createLabCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(createLabCategory.fulfilled, (state, action) => {
        state.loading = false
        state.labCategories.push(action.payload)
      })
      .addCase(createLabCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateLabCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(updateLabCategory.fulfilled, (state, action) => {
        state.loading = false
        const index = state.labCategories.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.labCategories[index] = action.payload
        }
      })
      .addCase(updateLabCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteLabCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteLabCategory.fulfilled, (state, action) => {
        state.loading = false
        state.labCategories = state.labCategories.filter((c) => c.id !== action.payload)
      })
      .addCase(deleteLabCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Lab Templates
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
