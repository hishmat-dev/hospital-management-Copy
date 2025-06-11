
import { useParams, useNavigate } from "react-router-dom"
import PersonalInfo from "./components/PersonalInfo"
import ContactInfo from "./components/ContactInfo"
import MedicalInfo from "./components/MedicalInfo"
import ActionButtons from "./components/ActionButtons"
import DoctorVisits from "./components/DoctorVisits"
import Reports from "./components/Reports"
import { useDetailHooks } from "./detail.hooks"
import profile from "../../../../components/ui/profile.jpg"
import PatientVisits from "./components/PatientVisits"

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { patient, loading, error } = useDetailHooks(id)
  console.log("error:",error)
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="bg-red-50 border border-red-200 rounded-md p-4">
  //       <p className="text-red-800">Error loading patient details: {error}</p>
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PersonalInfo patient={patient} profile={profile} navigate={navigate} />

      {/* Patient Information */}
      <div className="space-y-6 ">
        {/* <ContactInfo patient={patient} /> */}
        <PatientVisits patient={patient} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DoctorVisits patient={patient} />
          <Reports patient={patient} />
        </div>
        <MedicalInfo patient={patient} />
      </div>


      <ActionButtons patientId={id} patientName={patient?.name} />
    </div>
  )
}
