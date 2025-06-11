
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchVitals } from "../../action/slice"
import Form from "./Form"

const NursingUpdate = () => {
  const { patientName } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { vitals, loading } = useSelector((state) => state.nursing)
  const vitalRecord = vitals.find((v) => v.patientName === patientName)

  useEffect(() => {
    if (!vitals.length) {
      dispatch(fetchVitals())
    }
  }, [dispatch, vitals.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!vitalRecord) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vital Record Not Found</h2>
        <button
          onClick={() => navigate("/nursing/vitals")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Back to Nursing Records
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto p-3 text=[12px] ">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className=" font-bold">Update Nursing Record</h1>
        </div>
        <div className="p-3">
          <Form initialData={vitalRecord} isUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default NursingUpdate
