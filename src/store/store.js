import { configureStore } from "@reduxjs/toolkit"
import dashboardReducer from "./slices/dashboardSlice"

// Import reducers from modules
import patientReducer from "../modules/Patient/action/slice"
import doctorReducer from "../modules/Doctor/action/slice"
import appointmentReducer from "../modules/Appointment/action/slice"
import bedReducer from "../modules/Bed/action/slice"
import laboratoryReducer from "../modules/Laboratory/action/slice"
import emergencyReducer from "../modules/Emergency/action/slice"
import nursingReducer from "../modules/Nursing/action/slice"
import administrativeReducer from "../modules/Administrative/action/slice"
import reportsReducer from "../modules/Reports/action/slice"

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    patients: patientReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
    beds: bedReducer,
    laboratory: laboratoryReducer,
    emergency: emergencyReducer,
    nursing: nursingReducer,
    administrative: administrativeReducer,
    reports: reportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export default store