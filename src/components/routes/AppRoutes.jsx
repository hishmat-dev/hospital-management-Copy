import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard"

// Patient Management
import PatientCreate from "../../modules/Patient/pages/create"
import PatientList from "../../modules/Patient/pages/listing"
import PatientDetail from "../../modules/Patient/pages/detail"
import PatientUpdate from "../../modules/Patient/pages/update"

// Doctor Management
import DoctorCreate from "../../modules/Doctor/pages/create"
import DoctorList from "../../modules/Doctor/pages/listing"
import DoctorDetail from "../../modules/Doctor/pages/detail"
import DoctorUpdate from "../../modules/Doctor/pages/update"

// Appointment Management
import AppointmentCreate from "../../modules/Appointment/pages/create"
import AppointmentList from "../../modules/Appointment/pages/listing"
import AppointmentDetail from "../../modules/Appointment/pages/detail"
import AppointmentUpdate from "../../modules/Appointment/pages/update"

// Bed Management
import BedCreate from "../../modules/Bed/pages/create"
import BedList from "../../modules/Bed/pages/listing"
import BedDetail from "../../modules/Bed/pages/detail"
import BedUpdate from "../../modules/Bed/pages/update"
import BedAssign from "../../modules/Bed/pages/assign"

// Laboratory Management
import LaboratoryCreate from "../../modules/Laboratory/pages/create"
import LaboratoryList from "../../modules/Laboratory/pages/listing"
import LaboratoryDetail from "../../modules/Laboratory/pages/detail"
import LaboratoryUpdate from "../../modules/Laboratory/pages/update"

// Emergency Management
import EmergencyCreate from "../../modules/Emergency/pages/create"
import EmergencyList from "../../modules/Emergency/pages/listing"
import EmergencyDetail from "../../modules/Emergency/pages/detail"
import EmergencyUpdate from "../../modules/Emergency/pages/update"

// Nursing Management
import NursingCreate from "../../modules/Nursing/pages/create"
import NursingList from "../../modules/Nursing/pages/listing"
import NursingDetail from "../../modules/Nursing/pages/detail"
import NursingUpdate from "../../modules/Nursing/pages/update"

// Administrative Management - Lab Categories
import CategoryList from "../../modules/Administrative/pages/LabCategories/CategoryList"
import CreateCategory from "../../modules/Administrative/pages/LabCategories/CreateCategory"
import ViewCategory from "../../modules/Administrative/pages/LabCategories/ViewCategory"
import EditCategory from "../../modules/Administrative/pages/LabCategories/EditCategory"

// Administrative Management - Lab Templates
import TemplateList from "../../modules/Administrative/pages/LabTemplates/pages/TemplateList"
import CreateTemplate from "../../modules/Administrative/pages/LabTemplates/pages/CreateTemplate"
import ViewTemplate from "../../modules/Administrative/pages/LabTemplates/pages/ViewTemplate"
import EditTemplate from "../../modules/Administrative/pages/LabTemplates/pages/EditTemplate"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Patient Management Routes */}
      <Route path="/patients/add" element={<PatientCreate />} />
      <Route path="/patients/list" element={<PatientList />} />
      <Route path="/patients/detail/:id" element={<PatientDetail />} />
      <Route path="/patients/update/:id" element={<PatientUpdate />} />

      {/* Doctor Management Routes */}
      <Route path="/doctors/add" element={<DoctorCreate />} />
      <Route path="/doctors/list" element={<DoctorList />} />
      <Route path="/doctors/detail/:id" element={<DoctorDetail />} />
      <Route path="/doctors/update/:id" element={<DoctorUpdate />} />

      {/* Appointment Management Routes */}
      <Route path="/appointments/book" element={<AppointmentCreate />} />
      <Route path="/appointments/list" element={<AppointmentList />} />
      <Route path="/appointments/detail/:id" element={<AppointmentDetail />} />
      <Route path="/appointments/update/:id" element={<AppointmentUpdate />} />

      {/* Bed Management Routes */}
      <Route path="/beds/add" element={<BedCreate />} />
      <Route path="/beds/list" element={<BedList />} />
      <Route path="/beds/detail/:id" element={<BedDetail />} />
      <Route path="/beds/update/:id" element={<BedUpdate />} />
      <Route path="/beds/assign" element={<BedAssign />} />

      {/* Laboratory Management Routes */}
      <Route path="/laboratory/add" element={<LaboratoryCreate />} />
      <Route path="/laboratory/reports" element={<LaboratoryList />} />
      <Route path="/laboratory/detail/:id" element={<LaboratoryDetail />} />
      <Route path="/laboratory/update/:id" element={<LaboratoryUpdate />} />

      {/* Emergency Management Routes */}
      <Route path="/emergency/intake" element={<EmergencyCreate />} />
      <Route path="/emergency/queue" element={<EmergencyList />} />
      <Route path="/emergency/detail/:id" element={<EmergencyDetail />} />
      <Route path="/emergency/update/:id" element={<EmergencyUpdate />} />

      {/* Nursing Management Routes */}
      <Route path="/nursing/add" element={<NursingCreate />} />
      <Route path="/nursing/vitals" element={<NursingList />} />
      <Route path="/nursing/detail/:id" element={<NursingDetail />} />
      <Route path="/nursing/update/:id" element={<NursingUpdate />} />

      {/* Administrative Routes - Lab Categories */}
      <Route path="/admin/lab-categories" element={<CategoryList />} />
      <Route path="/admin/lab-categories/create" element={<CreateCategory />} />
      <Route path="/admin/lab-categories/view/:id" element={<ViewCategory />} />
      <Route path="/admin/lab-categories/edit/:id" element={<EditCategory />} />

      {/* Administrative Routes - Lab Templates */}
      <Route path="/admin/lab-templates" element={<TemplateList />} />
      <Route path="/admin/lab-templates/create" element={<CreateTemplate />} />
      <Route path="/admin/lab-templates/view/:id" element={<ViewTemplate />} />
      <Route path="/admin/lab-templates/edit/:id" element={<EditTemplate />} />
    </Routes>
  )
}
