
import { useParams, useNavigate } from "react-router-dom"
import PersonalInfo from "./components/PersonalInfo"
import ProfessionalInfo from "./components/ProfessionalInfo"
import ScheduleInfo from "./components/ScheduleInfo"
import ActionButtons from "./components/ActionButtons"
import { useDetailHooks } from "./detail.hooks"

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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading doctor details: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dr. {doctor?.name}</h1>
            <p className="text-gray-600">
              {doctor?.specialization} • {doctor?.department}
            </p>
          </div>
          <button
            onClick={() => navigate("/doctors/list")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Doctors
          </button>
        </div>
      </div>

      {/* Doctor Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PersonalInfo doctor={doctor} />
        <ProfessionalInfo doctor={doctor} />
      </div>

      <ScheduleInfo doctor={doctor} />
      <ActionButtons doctorId={id} />
    </div>
  )
}
