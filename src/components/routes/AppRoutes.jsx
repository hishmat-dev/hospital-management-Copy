import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard"

// Import modular components
import { PatientCreate, PatientListing, PatientDetail, PatientUpdate } from "../../modules/Patient"
import { DoctorCreate, DoctorListing, DoctorDetail, DoctorUpdate } from "../../modules/Doctor"
import { AppointmentCreate, AppointmentListing, AppointmentDetail, AppointmentUpdate } from "../../modules/Appointment"
import { BedCreate, BedListing, BedDetail, BedUpdate, BedAssign } from "../../modules/Bed"
import { LaboratoryCreate, LaboratoryListing, LaboratoryDetail, LaboratoryUpdate } from "../../modules/Laboratory"
import { EmergencyCreate, EmergencyListing, EmergencyDetail, EmergencyUpdate } from "../../modules/Emergency"
import { NursingCreate, NursingListing, NursingDetail, NursingUpdate } from "../../modules/Nursing"
import CBC from "../../modules/Laboratory/pages/update/Templetes/CBC"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Patient Management - Fully Modular */}
      <Route path="/patients/list" element={<PatientListing />} />
      <Route path="/patients/add" element={<PatientCreate />} />
      <Route path="/patients/create" element={<PatientCreate />} />
      <Route path="/patients/detail/:id" element={<PatientDetail />} />
      <Route path="/patients/update/:id" element={<PatientUpdate />} />

      {/* Doctor Management - Fully Modular */}
      <Route path="/doctors/list" element={<DoctorListing />} />
      <Route path="/doctors/add" element={<DoctorCreate />} />
      <Route path="/doctors/create" element={<DoctorCreate />} />
      <Route path="/doctors/detail/:id" element={<DoctorDetail />} />
      <Route path="/doctors/update/:id" element={<DoctorUpdate />} />

      {/* Appointments - Modular */}
      <Route path="/appointments/list" element={<AppointmentListing />} />
      <Route path="/appointments/book" element={<AppointmentCreate />} />
      <Route path="/appointments/create" element={<AppointmentCreate />} />
      <Route path="/appointments/detail/:id" element={<AppointmentDetail />} />
      <Route path="/appointments/update/:id" element={<AppointmentUpdate />} />

      {/* Bed Management - Modular */}
      <Route path="/beds/list" element={<BedListing />} />
      <Route path="/beds/add" element={<BedCreate />} />
      <Route path="/beds/assign/:id" element={<BedAssign/>} />
      <Route path="/beds/detail/:id" element={<BedDetail />} />
      <Route path="/beds/update/:id" element={<BedUpdate />} />

      {/* Laboratory - Modular */}
      <Route path="/laboratory/reports" element={<LaboratoryListing />} />
      <Route path="/laboratory/add" element={<LaboratoryCreate />} />
      <Route path="/laboratory/detail/:id" element={<LaboratoryDetail />} />
      <Route path="/laboratory/update/:id" element={<LaboratoryUpdate />} />
      <Route path="/laboratory/templete/CBC" element={<CBC/>} />

      {/* Emergency - Modular */}
      <Route path="/emergency/queue" element={<EmergencyListing />} />
      <Route path="/emergency/intake" element={<EmergencyCreate />} />
      <Route path="/emergency/detail/:id" element={<EmergencyDetail />} />
      <Route path="/emergency/update/:id" element={<EmergencyUpdate />} />

      {/* Nursing - Modular */}
      <Route path="/nursing/vitals" element={<NursingListing />} />
      <Route path="/nursing/add" element={<NursingCreate />} />
      <Route path="/nursing/detail/:patientName" element={<NursingDetail />} />
      <Route path="/nursing/update/:patientName" element={<NursingUpdate />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
