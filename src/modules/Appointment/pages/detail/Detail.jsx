import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchAppointments } from "../../action/slice"
import {
  User,
  Stethoscope,
  Calendar,
  DollarSign,
  Edit,
  ArrowLeft,
  Heart,
  Send,
} from "lucide-react"

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
    alert("Payment confirmed for appointment ID: " + id)
  }

  const handleAddVital = () => {
    navigate("/nursing/add", {
      state: {
        patient: {
          id: appointment.patientId,
          name: appointment.patientName,
          email: appointment.patientEmail,
          phone: appointment.patientPhone,
        },
      },
    })
  }

  const handleSendToDoctor = () => {
    alert("Sending appointment details to doctor for ID: " + id)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-indigo-600"></div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="text-center py-10">
        <h2 className="font-bold  text-gray-800 mb-6">Appointment Not Found</h2>
        <button
          onClick={() => navigate("/appointments/list")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center mx-auto"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Appointments
        </button>
      </div>
    )
  }

  return (
    <div className="p-4  bg-gray-50  text-[12px] ">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden ">
        <div className="bg-gradient-to-r from-primary-color to-purple-600 text-white p-3">
          <h1 className="font-bold  flex items-center">
            <Calendar className="w-7 h-7 mr-3" />
            Appointment Details
          </h1>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold  text-blue-800 mb-4 flex items-center">
                <User className="w-6 h-6 mr-2" />
                Patient Information
              </h3>
              <div className="space-y-3 text-gray-700">
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

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold  text-green-800 mb-4 flex items-center">
                <Stethoscope className="w-6 h-6 mr-2" />
                Doctor Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Doctor:</span> {appointment.doctorName}
                </p>
                <p>
                  <span className="font-medium">Specialization:</span> {appointment.specility}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold  text-purple-800 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Appointment Details
              </h3>
              <div className="space-y-3 text-gray-700">
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
                    className={`ml-2 px-3 py-1 rounded-full  font-semibold ${
                      appointment.status === "confirmed"
                        ? "bg-green-200 text-green-900"
                        : appointment.status === "pending"
                        ? "bg-yellow-200 text-yellow-900"
                        : "bg-red-200 text-red-900"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="font-semibold  text-pink-800 mb-4 flex items-center">
                <Edit className="w-6 h-6 mr-2" />
                Additional Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Reason:</span> {appointment.reason}
                </p>
                <p>
                  <span className="font-medium">Notes:</span> {appointment.notes || "No notes"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
            <h3 className="font-semibold  text-yellow-800 mb-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              Payment Information
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">Payment Status:</span>
                <span
                  className={`ml-2 px-3 py-1 rounded-full  font-semibold ${
                    appointment.paymentStatus === "paid"
                      ? "bg-green-200 text-green-900"
                      : "bg-yellow-200 text-yellow-900"
                  }`}
                >
                  {appointment.paymentStatus || "Pending"}
                </span>
              </p>
              <div className="flex flex-row space-x-4">
                <button
                  onClick={handlePaymentConfirmation}
                  className={`flex items-center p-3 rounded-lg text-white transition ${
                    appointment.paymentStatus === "paid"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={appointment.paymentStatus === "paid"}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  {appointment.paymentStatus === "paid" ? "Payment Confirmed" : "Confirm Payment"}
                </button>
                {appointment.paymentStatus === "paid" && (
                  <>
                    <button
                      onClick={handleAddVital}
                      className="flex items-center bg-primary-color text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Add Vital
                    </button>
                    <button
                      onClick={handleSendToDoctor}
                      className={`flex items-center p-3 rounded-lg text-white transition ${
                        appointment.status === "Completed"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={appointment.status === "Completed"}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send to Doctor
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => navigate(`/appointments/update/${id}`)}
              className="flex items-center bg-primary-color text-white p-3 rounded-lg hover:bg-indigo-700 transition"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Appointment
            </button>
            <button
              onClick={() => navigate("/appointments/list")}
              className="flex items-center bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetail