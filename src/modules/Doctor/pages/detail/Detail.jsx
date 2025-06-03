
import { useParams, useNavigate } from "react-router-dom"
import PersonalInfo from "./components/PersonalInfo"
import ProfessionalInfo from "./components/ProfessionalInfo"
import ScheduleInfo from "./components/ScheduleInfo"
import ActionButtons from "./components/ActionButtons"
import { useDetailHooks } from "./detail.hooks"
import profile from "../../../../components/ui/profile.jpg"
import AppointmentsTable from "./components/AppointmentsTable"

export default function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { doctor, loading, error } = useDetailHooks(id)

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
  //       <p className="text-red-800">Error loading doctor details: {error}</p>
  //     </div>
  //   )
  // }

  return (
    <div className="text-[12px] space-y-3">
      {/* Header */}
      <PersonalInfo
        doctor={doctor}
        profile={profile}
        navigate={navigate}
      />

      {/* Doctor Information */}
      <div className="">
        <ProfessionalInfo doctor={doctor} />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full">
          <AppointmentsTable doctor={doctor} />
        </div>
      </div>
      <div className="md:w-2/6">
        <ScheduleInfo doctor={doctor} />
      </div>

      <ActionButtons doctorId={id} />
    </div>
  )
}
