
import { useParams, useNavigate } from "react-router-dom"
import DoctorUpdateForm from "./Form"

export default function DoctorUpdate() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-3 text-[12px]">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className=" font-bold text-gray-900">Update Doctor Profile</h1>
            <p className="text-gray-600">Modify doctor information</p>
          </div>
          <button
            onClick={() => navigate("/doctors/list")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Doctors
          </button>
        </div>
      </div>

      {/* Update Form */}
      <DoctorUpdateForm doctorId={id} />
    </div>
  )
}
