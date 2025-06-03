
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchBeds } from "../../action/slice"
import Form from "./Form"

const BedUpdate = () => {
  // console.log("BedUpdate component rendered")
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { beds, loading } = useSelector((state) => state.beds)
  const bed = beds.find((b) => b.id === id)

  useEffect(() => {
    if (!beds.length) {
      dispatch(fetchBeds())
    }
  }, [dispatch, beds.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!bed) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bed Not Found</h2>
        <button
          onClick={() => navigate("/beds/list")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Beds
        </button>
      </div>
    )
  }

  return (
    <div className="p-3 text-[12px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-2">
          <h1 className="text-sm font-bold">Update Bed - {bed.bedNumber}</h1>
        </div>
        <div className="p-6">
          <Form initialData={bed} isUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default BedUpdate
