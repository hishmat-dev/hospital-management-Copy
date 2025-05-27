
import { useNavigate } from "react-router-dom"

export default function ActionButtons({ onSubmit, loading, patientId }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(`/patients/detail/${patientId}`)}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Updating..." : "Update Patient"}
        </button>
      </div>
    </div>
  )
}
