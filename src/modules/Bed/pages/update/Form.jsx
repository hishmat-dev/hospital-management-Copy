

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateBed } from "../../action/slice"

const BedUpdateForm = ({ initialData, isUpdate = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    bedNumber: initialData?.bedNumber || "",
    roomNumber: initialData?.roomNumber || "",
    type: initialData?.type || "General",
    status: initialData?.status || "Available",
    features: initialData?.features || [],
    notes: initialData?.notes || "", // only if you're using it, otherwise remove
  })


  const availableFeatures = [
    "Oxygen Supply",
    "Cardiac Monitor",
    "IV Stand",
    "Adjustable Height",
    "Side Rails",
    "Call Button",
    "Privacy Curtain",
    "Bedside Table",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFeatureChange = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isUpdate) {
        await dispatch(
          updateBed({
            id: initialData.id,
            ...formData,
          }),
        ).unwrap()
      }
      navigate("/beds/list")
    } catch (error) {
      console.error("Error updating bed:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bed Number</label>
          <input
            type="text"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
          <select
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Ward</option>
            <option value="General">General</option>
            <option value="ICU">ICU</option>
            <option value="Emergency">Emergency</option>
            <option value="Pediatric">Pediatric</option>
            <option value="Maternity">Maternity</option>
            <option value="Surgery">Surgery</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bed Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General</option>
            <option value="icu">ICU</option>
            <option value="private">Private</option>
            <option value="semi-private">Semi-Private</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
            <option value="cleaning">Cleaning</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableFeatures.map((feature) => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className="mr-2"
              />
              <span className="text-sm">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-primary-color text-white px-6 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Bed
        </button>
        <button
          type="button"
          onClick={() => navigate("/beds/list")}
          className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default BedUpdateForm
