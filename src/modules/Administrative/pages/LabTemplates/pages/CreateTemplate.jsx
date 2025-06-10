

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createLabTemplate, fetchLabCategories } from "../../../action/slice"
import { Plus, Trash2, Save, X } from "lucide-react"

export default function CreateLabTemplate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { labCategories } = useSelector((state) => state.administrative)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    parameters: [
      {
        name: "",
        unit: "",
        normalRange: "",
        observedValue: "",
      },
    ],
  })

  useEffect(() => {
    dispatch(fetchLabCategories())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleParameterChange = (index, field, value) => {
    const updatedParameters = [...formData.parameters]
    updatedParameters[index] = {
      ...updatedParameters[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      parameters: updatedParameters,
    }))
  }

  const addParameter = () => {
    setFormData((prev) => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        {
          name: "",
          unit: "",
          normalRange: "",
          observedValue: "",
        },
      ],
    }))
  }

  const removeParameter = (index) => {
    setFormData((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get category name for the template
      const selectedCategory = labCategories.find((cat) => cat.id === formData.categoryId)
      const templateData = {
        ...formData,
        category: selectedCategory?.name || "",
      }

      await dispatch(createLabTemplate(templateData)).unwrap()
      navigate("/admin/lab-templates")
    } catch (error) {
      console.error("Error creating template:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/admin/lab-templates")
  }

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Create Lab Report Template</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g., Complete Blood Count (CBC)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {labCategories
                  .filter((cat) => cat.isActive)
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.code})
                    </option>
                  ))}
              </select>
              {labCategories.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  No categories available.{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/admin/lab-categories/create")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Create one first
                  </button>
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the test template"
            />
          </div>

          {/* Parameters Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Test Parameters</h3>
              <button
                type="button"
                onClick={addParameter}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Plus size={16} />
                Add Parameter
              </button>
            </div>

            <div className="space-y-4">
              {formData.parameters.map((parameter, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">Parameter {index + 1}</h4>
                    {formData.parameters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParameter(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parameter Name *</label>
                      <input
                        type="text"
                        value={parameter.name}
                        onChange={(e) => handleParameterChange(index, "name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="e.g., Hemoglobin"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                      <input
                        type="text"
                        value={parameter.unit}
                        onChange={(e) => handleParameterChange(index, "unit", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="e.g., g/dL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Normal Range *</label>
                      <input
                        type="text"
                        value={parameter.normalRange}
                        onChange={(e) => handleParameterChange(index, "normalRange", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="e.g., 13.0 - 17.0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || labCategories.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? "Creating..." : "Create Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
