
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchEmergencyCases } from "../../action/slice"
import Form from "./Form"

const EmergencyUpdate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cases, loading } = useSelector((state) => state.emergency)
  const emergencyCase = cases.find((c) => c.id === Number.parseInt(id))

  useEffect(() => {
    if (!cases.length) {
      dispatch(fetchEmergencyCases())
    }
  }, [dispatch, cases.length])

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
        <div className="bg-red-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">Update Emergency Case</h1>
        </div>
        <div className="p-6">
          <Form initialData={emergencyCase} isUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default EmergencyUpdate
