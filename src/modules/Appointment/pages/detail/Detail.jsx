import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchAppointments } from "../../action/slice"

const AppointmentDetail = () => {
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

  const handlePaymentConfirmation = () => {
    // Placeholder for payment confirmation logic
    alert("Payment confirmed for appointment ID: " + id)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="text-center py-8">
        <h2 className="font-bold text-gray-900 mb-4">Appointment Not Found</h2>
        <button
          onClick={() => navigate("/appointments/list")}
          className="bg-primary-color text-white px-4 py-2 rounded-md"
        >
          Back to Appointments
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-3 text-[12px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className="font-bold">Appointment Details</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Patient Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {appointment.patientName}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {appointment.patientPhone}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {appointment.patientEmail}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Doctor Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Doctor:</span> {appointment.doctorName}
                </p>
                <p>
                  <span className="font-medium">Specialization:</span> {appointment.specility}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Appointment Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Date:</span> {appointment.date}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {appointment.time}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {appointment.type}
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      appointment.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Additional Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Reason:</span> {appointment.reason}
                </p>
                <p>
                  <span className="font-medium">Notes:</span> {appointment.notes || "No notes"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Payment Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Payment Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      appointment.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.paymentStatus || "Pending"}
                  </span>
                </p>
                <button
                  onClick={handlePaymentConfirmation}
                  className={`px-4 py-2 rounded-md text-white ${
                    appointment.paymentStatus === "paid" ? "bg-gray-400 cursor-not-allowed" : "bg-green-400 hover:bg-green-700"
                  }`}
                  disabled={appointment.paymentStatus === "paid"}
                >
                  {appointment.paymentStatus === "paid" ? "Payment Confirmed" : "Confirm Payment"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => navigate(`/appointments/update/${id}`)}
              className="bg-primary-color text-white px-4 py-2 rounded-md"
            >
              Edit Appointment
            </button>
            <button
              onClick={() => navigate("/appointments/list")}
              className="bg-red-color text-white px-4 py-2 rounded-md"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetail