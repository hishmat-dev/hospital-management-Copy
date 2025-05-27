"use client"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchEmergencyCases } from "../../action/slice"

const EmergencyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { emergencyCases, loading } = useSelector((state) => state.emergency)
  console.log("Emergency Case:", emergencyCases)
  const emergencyCase = emergencyCases.find((c) => c.id === id)

  useEffect(() => {
    if (!emergencyCases.length) {
      dispatch(fetchEmergencyCases())
    }
  }, [dispatch, emergencyCases.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!emergencyCase) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Case Not Found</h2>
        <button
          onClick={() => navigate("/emergency/list")}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Back to Emergency Cases
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className="text-2xl font-bold">Emergency Case Details</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {emergencyCase.patientName}
                </p>
                <p>
                  <span className="font-medium">Age:</span> {emergencyCase.age}
                </p>
                <p>
                  <span className="font-medium">Gender:</span> {emergencyCase.gender}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {emergencyCase.phone}
                </p>
                <p>
                  <span className="font-medium">Emergency Contact:</span> {emergencyCase.emergencyContact}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Chief Complaint:</span> {emergencyCase.chiefComplaint}
                </p>
                <p>
                  <span className="font-medium">Triage Level:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      emergencyCase.triageLevel === "critical"
                        ? "bg-red-100 text-red-800"
                        : emergencyCase.triageLevel === "urgent"
                          ? "bg-orange-100 text-orange-800"
                          : emergencyCase.triageLevel === "semi-urgent"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                    }`}
                  >
                    {emergencyCase.triageLevel}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Arrival Time:</span> {emergencyCase.arrivalTime}
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      emergencyCase.status === "waiting"
                        ? "bg-yellow-100 text-yellow-800"
                        : emergencyCase.status === "in-treatment"
                          ? "bg-blue-100 text-blue-800"
                          : emergencyCase.status === "discharged"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {emergencyCase.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Vital Signs</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Blood Pressure:</span> {emergencyCase.vitals?.bloodPressure}
                </p>
                <p>
                  <span className="font-medium">Heart Rate:</span> {emergencyCase.vitals?.heartRate} bpm
                </p>
                <p>
                  <span className="font-medium">Temperature:</span> {emergencyCase.vitals?.temperature}°F
                </p>
                <p>
                  <span className="font-medium">Oxygen Saturation:</span> {emergencyCase.vitals?.oxygenSaturation}%
                </p>
                <p>
                  <span className="font-medium">Respiratory Rate:</span> {emergencyCase.vitals?.respiratoryRate}/min
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Allergies:</span> {emergencyCase.allergies || "None known"}
                </p>
                <p>
                  <span className="font-medium">Current Medications:</span> {emergencyCase.medications || "None"}
                </p>
                <p>
                  <span className="font-medium">Medical History:</span> {emergencyCase.medicalHistory || "None"}
                </p>
              </div>
            </div>
          </div>

          {emergencyCase.assignedDoctor && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Assigned Medical Staff</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>
                  <span className="font-medium">Doctor:</span> {emergencyCase.assignedDoctor}
                </p>
                <p>
                  <span className="font-medium">Nurse:</span> {emergencyCase.assignedNurse || "Not assigned"}
                </p>
              </div>
            </div>
          )}

          {emergencyCase.notes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Clinical Notes</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{emergencyCase.notes}</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => navigate(`/emergency/update/${id}`)}
              className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Update Case
            </button>
            <button
              onClick={() => navigate("/emergency/list")}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyDetail
