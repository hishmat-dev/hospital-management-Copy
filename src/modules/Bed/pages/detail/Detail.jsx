
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchBeds } from "../../action/slice"

const BedDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { beds, loading } = useSelector((state) => state.beds)
  console.log("Beds from state:", beds)
  const bed = beds.find((b) => b.id === id)

  useEffect(() => {
    if (!beds.length) {
      dispatch(fetchBeds())
    }
  }, [dispatch, beds.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
      </div>
    )
  }

  if (!bed) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bed Not Found</h2>
        <button
          onClick={() => navigate("/beds/list")}
          className="bg-primary-color text-white px-4 py-2 rounded-md "
        >
          Back to Beds
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary-color text-white px-6 py-4">
          <h1 className="text-2xl font-bold">Bed Details - {bed.bedNumber}</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-color">Basic Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-bold">Bed Number:</span> {bed.bedNumber}
                </p>
                <p>
                  <span className="font-bold">Ward:</span> {bed.roomNumber}
                </p>
                <p>
                  <span className="font-bold">Type:</span> {bed.type}
                </p>
                <p>
                  <span className="font-bold">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${bed.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : bed.status === "Occupied"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {bed.status}
                  </span>
                </p>

              </div>
            </div>

            {bed.patientName && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary-color">Patient Information</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Patient:</span> {bed.patientName}
                  </p>
                  <p>
                    <span className="font-bold">Admission Date:</span> {bed.assignedDate || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Assigned Nurse:</span> {bed.nurseName || "Unassigned"}
                  </p>
                </div>
              </div>
            )}


            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-color">Features</h3>
              <div className="space-y-2">
                {bed.features?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-color">Additional Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-bold">Last Cleaned:</span> {bed.lastCleaned || "Not recorded"}
                </p>
                <p>
                  <span className="font-bold">Notes:</span> {bed.notes || "No notes"}
                </p>

              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => navigate(`/beds/update/${id}`)}
              className="bg-primary-color text-white px-4 py-2 rounded-md "
            >
              Edit Bed
            </button>
            <button
              onClick={() => navigate("/beds/list")}
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

export default BedDetail
