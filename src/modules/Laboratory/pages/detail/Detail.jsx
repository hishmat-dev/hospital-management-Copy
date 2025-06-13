
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchLabTests } from "../../action/slice"
import LabTestDetail from "./components/LabTestDetail"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

const LaboratoryDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { labTests, loading } = useSelector((state) => state.laboratory)
  // console.log("Laboratory Detail - Tests:", labTests)
  const test = labTests.find((t) => t.id === id)

  useEffect(() => {
    if (!labTests.length) {
      dispatch(fetchLabTests())
    }
  }, [dispatch, labTests.length])

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  if (!test) {
    return (
      <div className="text-center py-8">
        <h2 className=" font-bold text-gray-900 mb-4">Lab Test Not Found</h2>
        <button
          onClick={() => navigate("/laboratory/list")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Lab Tests
        </button>
      </div>
    )
  }

  return (
    <LabTestDetail test={test}/>
  )
}

export default LaboratoryDetail
