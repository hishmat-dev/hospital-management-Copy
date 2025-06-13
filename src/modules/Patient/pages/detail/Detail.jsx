
import { useParams, useNavigate } from "react-router-dom"
import PersonalInfo from "./components/PersonalInfo"
import VitalRecords from "./components/VitalRecords"
import MedicalInfo from "./components/MedicalInfo"
import ActionButtons from "./components/ActionButtons"
import DoctorVisits from "./components/DoctorVisits"
import Reports from "./components/Reports"
import { useDetailHooks } from "./detail.hooks"
import profile from "../../../../components/ui/profile.jpg"
import PatientVisits from "./components/PatientVisits"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { patient, loading, error } = useDetailHooks(id)
  // console.log("error:",error)
  
  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PersonalInfo patient={patient} profile={profile} navigate={navigate} />

      {/* Patient Information */}
      <div className="space-y-6 ">
        <VitalRecords patient={patient} />
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
