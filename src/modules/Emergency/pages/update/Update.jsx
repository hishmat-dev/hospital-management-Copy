
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchEmergencyCases } from "../../action/slice"
import Form from "./Form"

const EmergencyUpdate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { emergencyCases, loading } = useSelector((state) => state.emergency)
  const emergencyCase = emergencyCases.find((c) => c.id === id)

  useEffect(() => {
    if (!emergencyCases.length) {
      dispatch(fetchEmergencyCases())
    }
  }, [dispatch, emergencyCases.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
      </div>
    )
  }

  if (!emergencyCase) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Case Not Found</h2>
        <button
          onClick={() => navigate("/emergency/list")}
          className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Back to Emergency Cases
        </button>
      </div>
    )
  }

  return (
    <div className="p-3 text-[12px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className=" font-bold">Update Emergency Case</h1>
        </div>
        <div className="p-3">
          <Form initialData={emergencyCase} isUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default EmergencyUpdate
