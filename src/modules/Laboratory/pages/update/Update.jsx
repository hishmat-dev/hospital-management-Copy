
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchLabTests } from "../../action/slice"
import Form from "./Form"

const LaboratoryUpdate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { labTests, loading } = useSelector((state) => state.laboratory)
  const test = labTests.find((t) => t.id === id)

  useEffect(() => {
    if (!labTests.length) {
      dispatch(fetchLabTests())
    }
  }, [dispatch, labTests.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lab Test Not Found</h2>
        <button
          onClick={() => navigate("/laboratory/list")}
          className="bg-primary-color text-white px-4 py-2 rounded-md "
        >
          Back to Lab Tests
        </button>
      </div>
    )
  }

  return (
    <div className=" p-3 text-[12px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className="font-bold">Update Lab Test</h1>
        </div>
        <div className="p-3">
          <Form initialData={test} isUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default LaboratoryUpdate
