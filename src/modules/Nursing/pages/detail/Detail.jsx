
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchVitals } from "../../action/slice"

const NursingDetail = () => {
  const { id, patientName } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { vitals, loading } = useSelector((state) => state.nursing)
  // console.log("Vitals:", vitals)
  // console.log("Nursing Details :", id, patientName)
  const vitalRecord = vitals.find((v) => v.patientName === patientName)
  // console.log("Vital Record:", vitalRecord)

  useEffect(() => {
    if (!vitals.length) {
      dispatch(fetchVitals())
    }
  }, [dispatch, vitals.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
      </div>
    )
  }

  if (!vitalRecord) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vital Record Not Found</h2>
        <button
          onClick={() => navigate("/nursing/list")}
          className="bg-primary-color text-white px-4 py-2 rounded-md "
        >
          Back to Nursing Records
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-[12px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className="text-xl font-bold">Nursing Vital Signs Record</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className=" font-semibold mb-4">Patient Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-bold ">Patient:</span> {vitalRecord.patientName}
                </p>
                <p>
                  <span className="font-bold">Room:</span> {vitalRecord.room}
                </p>
                <p>
                  <span className="font-bold">Bed:</span> {vitalRecord.bed}
                </p>
                <p>
                  <span className="font-bold">Date:</span> {vitalRecord.date}
                </p>
                <p>
                  <span className="font-bold">Time:</span> {vitalRecord.time}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Nursing Staff</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Nurse:</span> {vitalRecord.nurseName}
                </p>
                <p>
                  <span className="font-medium">Shift:</span> {vitalRecord.shift}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Vital Signs</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Blood Pressure:</span> {vitalRecord.bloodPressure}
                </p>
                <p>
                  <span className="font-medium">Heart Rate:</span> {vitalRecord.heartRate} bpm
                </p>
                <p>
                  <span className="font-medium">Temperature:</span> {vitalRecord.temperature}°F
                </p>
                <p>
                  <span className="font-medium">Respiratory Rate:</span> {vitalRecord.respiratoryRate}/min
                </p>
                <p>
                  <span className="font-medium">Oxygen Saturation:</span> {vitalRecord.oxygenSaturation}%
                </p>
                <p>
                  <span className="font-medium">Pain Level:</span> {vitalRecord.painLevel}/10
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Measurements</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Weight:</span> {vitalRecord.weight} lbs
                </p>
                <p>
                  <span className="font-medium">Height:</span> {vitalRecord.height} inches
                </p>
                <p>
                  <span className="font-medium">BMI:</span> {vitalRecord.bmi}
                </p>
                <p>
                  <span className="font-medium">Blood Glucose:</span> {vitalRecord.bloodGlucose} mg/dL
                </p>
              </div>
            </div>
          </div>

          {vitalRecord.medications && vitalRecord.medications.length > 0 && (
            <div className="mt-6 text-[12px]">
              <h3 className=" font-semibold mb-4">Medications Administered</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <ul className="space-y-2">
                  {vitalRecord.medications.map((med, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {med.name} - {med.dosage}
                      </span>
                      <span className="text-gray-600">{med.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {vitalRecord.notes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Nursing Notes</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{vitalRecord.notes}</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => navigate(`/nursing/update/${id}`)}
              className="bg-primary-color text-white px-4 py-2 rounded-md "
            >
              Update Record
            </button>
            <button
              onClick={() => navigate("/nursing/vitals")}
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

export default NursingDetail
