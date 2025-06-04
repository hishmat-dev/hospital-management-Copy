
import { useNavigate } from "react-router-dom"

export default function ActionButtons({ patientId, patientName }) {
  const navigate = useNavigate()
  // console.log("ActionButtons Rendered", { patientId, patientName })
  return (
    <div className="bg-white rounded-lg shadow p-3">
      <h3 className="text-lg font-semibold text-primary-color mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-[12px]">
        <button
          onClick={() => navigate(`/patients/update/${patientId}`)}
          className="bg-primary-color text-white px-4 py-2 rounded-md  transition-colors"
        >
          Edit Patient
        </button>
        <button
          onClick={() => navigate(`/appointments/create?patientId=${patientId}`)}
          className="bg-white border  px-4 py-2 rounded-md hover:bg-primary-color hover:text-white transition-colors"
        >
          Book Appointment
        </button>
        <button
          onClick={() => navigate(`/laboratory/create?patientId=${patientId}`)}
           className="bg-white border  px-4 py-2 rounded-md hover:bg-primary-color hover:text-white transition-colors"
        >
          Order Lab Test
        </button>
        <button
          onClick={() => navigate(`/nursing/detail/${patientName}`)}
           className="bg-white border  px-4 py-2 rounded-md hover:bg-primary-color hover:text-white transition-colors"
        >
          Record Vitals
        </button>
      </div>
    </div>
  )
}
