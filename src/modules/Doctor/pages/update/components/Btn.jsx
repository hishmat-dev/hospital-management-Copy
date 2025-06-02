
import { useNavigate } from "react-router-dom"

export default function ActionButtons({ onSubmit, loading, doctorId }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow p-3">
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(`/doctors/detail/${doctorId}`)}
          className="px-6 py-2 border border-gray-300 rounded-md hover:text-white hover:bg-primary-color transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="px-6 py-2 bg-primary-color text-white rounded-md  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Updating..." : "Update Doctor"}
        </button>
      </div>
    </div>
  )
}
