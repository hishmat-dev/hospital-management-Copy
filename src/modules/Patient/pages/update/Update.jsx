
import { useParams, useNavigate } from "react-router-dom"
import PatientUpdateForm from "./Form"

export default function PatientUpdate() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-6 text-[12px]">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-gray-900">Update Patient</h1>
            <p className="text-gray-600">Modify patient information</p>
          </div>
          <button
            onClick={() => navigate("/patients/list")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>

      {/* Update Form */}
      <PatientUpdateForm patientId={id} />
    </div>
  )
}
