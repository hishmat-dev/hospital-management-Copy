
import { useNavigate } from "react-router-dom"

export default function ActionButtons({ patientId, patientName }) {
  const navigate = useNavigate()
  console.log("ActionButtons Rendered", { patientId, patientName })
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => navigate(`/patients/update/${patientId}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Patient
        </button>
        <button
          onClick={() => navigate(`/appointments/create?patientId=${patientId}`)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Book Appointment
        </button>
        <button
          onClick={() => navigate(`/laboratory/create?patientId=${patientId}`)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Order Lab Test
        </button>
        <button
          onClick={() => navigate(`/nursing/detail/${patientName}`)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
        >
          Record Vitals
        </button>
      </div>
    </div>
  )
}
