import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { reportService } from "../services/reportService"

// Payments
export const fetchPayments = createAsyncThunk("reports/fetchPayments", async () => {
  return await reportService.getPayments()
})

export const fetchPaymentById = createAsyncThunk("reports/fetchPaymentById", async (id) => {
  return await reportService.getPaymentById(id)
})

// Invoices
export const fetchInvoices = createAsyncThunk("reports/fetchInvoices", async () => {
  return await reportService.getInvoices()
})

export const fetchInvoiceById = createAsyncThunk("reports/fetchInvoiceById", async (id) => {
  return await reportService.getInvoiceById(id)
})

export const sendInvoiceEmail = createAsyncThunk("reports/sendInvoiceEmail", async ({ invoiceId, emailData }) => {
  return await reportService.sendInvoiceEmail(invoiceId, emailData)
})

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    payments: [],
    invoices: [],
    selectedPayment: null,
    selectedInvoice: null,
    loading: false,
    error: null,
    emailStatus: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearEmailStatus: (state) => {
      state.emailStatus = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Payments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false
        state.payments = action.payload
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch Payment by ID
      .addCase(fetchPaymentById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedPayment = action.payload
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch Invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false
        state.invoices = action.payload
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch Invoice by ID
      .addCase(fetchInvoiceById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedInvoice = action.payload
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Send Invoice Email
      .addCase(sendInvoiceEmail.pending, (state) => {
        state.loading = true
        state.emailStatus = "sending"
      })
      .addCase(sendInvoiceEmail.fulfilled, (state) => {
        state.loading = false
        state.emailStatus = "success"
      })
      .addCase(sendInvoiceEmail.rejected, (state, action) => {
        state.loading = false
        state.emailStatus = "failed"
        state.error = action.error.message
      })
  },
})

export const { clearError, clearEmailStatus } = reportsSlice.actions
export default reportsSlice.reducer