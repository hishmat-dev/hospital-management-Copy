
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchAppointments } from "../../action/slice"
import Form from "./Form"

const AppointmentUpdate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { appointments, loading } = useSelector((state) => state.appointments)
  const appointment = appointments.find((apt) => apt.id === id)

  useEffect(() => {
    if (!appointments.length) {
      dispatch(fetchAppointments())
    }
  }, [dispatch, appointments.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 bg-primary-color"></div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="text-center py-8">
        <h2 className=" font-bold text-gray-900 mb-4">Appointment Not Found</h2>
        <button
          onClick={() => navigate("/appointments/list")}
          className="bg-primary-color text-white px-4 py-2 rounded-md "
        >
          Back to Appointments
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-[12px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className="font-bold">Update Appointment</h1>
        </div>
        <div className="p-6">
          <Form initialData={appointment} isUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default AppointmentUpdate
