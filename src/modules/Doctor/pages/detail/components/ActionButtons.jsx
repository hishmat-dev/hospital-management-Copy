
import { useNavigate } from "react-router-dom"

export default function ActionButtons({ doctorId }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
          onClick={() => navigate(`/doctors/update/${doctorId}`)}
          className="bg-primary-color text-white px-4 py-2 rounded-md  transition-colors"
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigate(`/appointments/create?doctorId=${doctorId}`)}
          className=" px-4 py-2 border  rounded-md hover:bg-primary-color hover:text-white transition-colors"
        >
          View Appointments
        </button>
        <button
          onClick={() => navigate(`/doctors/schedule/${doctorId}`)}
          className=" px-4 py-2 border rounded-md hover:bg-primary-color hover:text-white transition-colors"
        >
          Manage Schedule
        </button>
      </div>
    </div>
  )
}
