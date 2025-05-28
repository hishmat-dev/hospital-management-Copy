
import { useParams, useNavigate } from "react-router-dom"
import PersonalInfo from "./components/PersonalInfo"
import ContactInfo from "./components/ContactInfo"
import MedicalInfo from "./components/MedicalInfo"
import ActionButtons from "./components/ActionButtons"
import { useDetailHooks } from "./detail.hooks"

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { patient, loading, error } = useDetailHooks(id)
  // console.log("Patient Detail Rendered", patient)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading patient details: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient?.name}</h1>
            <p className="text-gray-600">Patient ID: {patient?.id}</p>
          </div>
          <button
            onClick={() => navigate("/patients/list")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>

      {/* Patient Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PersonalInfo patient={patient} />
        <ContactInfo patient={patient} />
        <MedicalInfo patient={patient} />
      </div>


      <ActionButtons patientId={id} patientName={patient?.name} />
    </div>
  )
}
