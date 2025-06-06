"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchLabTemplates, updateLabTemplate } from "../../action/slice"
import { Plus, Trash2, Save, X, ArrowLeft } from "lucide-react"

export default function EditTemplate() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { labTemplates, loading } = useSelector((state) => state.administrative)
  const [formLoading, setFormLoading] = useState(false)

  const template = labTemplates.find((t) => t.id === id)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
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
    if (!labTemplates.length) {
      dispatch(fetchLabTemplates())
    }
  }, [dispatch, labTemplates.length])

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || "",
        description: template.description || "",
        category: template.category || "",
        parameters: template.parameters || [
          {
            name: "",
            unit: "",
            normalRange: "",
            observedValue: "",
          },
        ],
      })
    }
  }, [template])

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
    setFormLoading(true)

    try {
      await dispatch(updateLabTemplate({ id, ...formData })).unwrap()
      navigate("/admin/lab-templates")
    } catch (error) {
      console.error("Error updating template:", error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/admin/lab-templates")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Template not found</h3>
        <button
          onClick={() => navigate("/admin/lab-templates")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Templates
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/lab-templates")} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Edit Lab Report Template</h1>
          </div>
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
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Hematology">Hematology</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Microbiology">Microbiology</option>
                <option value="Immunology">Immunology</option>
                <option value="Pathology">Pathology</option>
              </select>
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
              disabled={formLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {formLoading ? "Updating..." : "Update Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
