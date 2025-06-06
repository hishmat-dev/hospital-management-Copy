"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateLabTest } from "../../action/slice"
import { fetchLabTemplates } from "../../../Administrative/action/slice"


const LaboratoryUpdateForm = ({ initialData, isUpdate = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { labTemplates } = useSelector((state) => state.administrative)

  const [formData, setFormData] = useState({
    patientName: initialData?.patientName || "",
    patientId: initialData?.patientId || "",
    patientAge: initialData?.patientAge || "",
    patientGender: initialData?.patientGender || "",
    testType: initialData?.testType || "",
    category: initialData?.category || "",
    priority: initialData?.priority || "normal",
    status: initialData?.status || "pending",
    doctorName: initialData?.doctorName || "",
    department: initialData?.department || "",
    orderedDate: initialData?.orderedDate || "",
    sampleDate: initialData?.sampleDate || "",
    expectedDate: initialData?.expectedDate || "",
    results: initialData?.results || [],
    notes: initialData?.notes || "",
    selectedTemplate: initialData?.selectedTemplate || "",
  })

  const [availableTemplates, setAvailableTemplates] = useState([])

  useEffect(() => {
    dispatch(fetchLabTemplates())
  }, [dispatch])

  useEffect(() => {
    if (labTemplates.length > 0) {
      setAvailableTemplates(labTemplates)
    }
  }, [labTemplates])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "testType") {
      // Filter templates based on selected test type
      const filteredTemplates = labTemplates.filter(
        (template) =>
          template.name.toLowerCase().includes(value.toLowerCase()) ||
          template.category.toLowerCase().includes(value.toLowerCase()),
      )
      setAvailableTemplates(filteredTemplates)

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        selectedTemplate: "",
        results: [],
      }))
    } else if (name === "selectedTemplate") {
      // Load template parameters
      const template = labTemplates.find((t) => t.id === value)
      if (template) {
        const templateResults = template.parameters.map((param) => ({
          name: param.name,
          unit: param.unit,
          normalRange: param.normalRange,
          value: "", // Only observed value is empty initially
        }))

        setFormData((prev) => ({
          ...prev,
          [name]: value,
          results: templateResults,
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleResultChange = (index, field, value) => {
    const updatedResults = [...formData.results]
    updatedResults[index] = {
      ...updatedResults[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      results: updatedResults,
    }))
  }

  const handleAddResult = () => {
    setFormData((prev) => ({
      ...prev,
      results: [...prev.results, { name: "", value: "", unit: "", normalRange: "" }],
    }))
  }

  const handleRemoveResult = (index) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    console.log("form data",formData)
    e.preventDefault()

    try {
      if (isUpdate) {
        await dispatch(updateLabTest({ id: initialData.id, ...formData })).unwrap()
      }
      navigate("/laboratory/reports")
    } catch (error) {
      console.error("Error updating lab test:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          ["Patient Name", "patientName", "text"],
          ["Patient ID", "patientId", "text"],
          ["Patient Age", "patientAge", "number"],
          ["Patient Gender", "patientGender", "text"],
          ["Doctor Name", "doctorName", "text"],
          ["Department", "department", "text"],
          ["Ordered Date", "orderedDate", "date"],
          ["Sample Date", "sampleDate", "date"],
          ["Expected Date", "expectedDate", "date"],
        ].map(([label, name, type]) => (
          <div key={name}>
            <label className="block font-medium text-gray-700 mb-2">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required={["patientName", "patientId", "doctorName"].includes(name)}
            />
          </div>
        ))}

        {[
          ["Test Type", "testType", ["Blood Test", "Urine Test", "X-Ray", "CT Scan", "MRI", "ECG", "Ultrasound"]],
          [
            "Category",
            "category",
            ["Hematology", "Biochemistry", "Microbiology", "Radiology", "Cardiology", "Pathology"],
          ],
          ["Priority", "priority", ["low", "normal", "high", "urgent"]],
          ["Status", "status", ["pending", "in-progress", "completed", "cancelled"]],
        ].map(([label, name, options]) => (
          <div key={name}>
            <label className="block font-medium text-gray-700 mb-2">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required={["testType", "category"].includes(name)}
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Template Selection */}
      {formData.testType && availableTemplates.length > 0 && (
        <div>
          <label className="block font-medium text-gray-700 mb-2">Select Template *</label>
          <select
            name="selectedTemplate"
            value={formData.selectedTemplate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a template or enter manually</option>
            {availableTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name} ({template.category})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Test Results Section */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Test Results</label>
        {formData.selectedTemplate ? (
          // Template-based results
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Template: {labTemplates.find((t) => t.id === formData.selectedTemplate)?.name}
              </h4>
              <p className=" text-blue-700">
                Fill in the observed values for each parameter. Normal ranges are provided for reference.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                      Observed Value
                    </th>
                    <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                      Unit
                    </th>
                    <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                      Normal Range
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.results.map((result, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-900">{result.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={result.value}
                          onChange={(e) => handleResultChange(index, "value", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500">{result.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500">{result.normalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <p className="text-red-400">Select Template</p>
          </>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button type="submit" className="bg-primary-color text-white px-6 py-2 rounded-md" >
          {isUpdate ? "Update Test" : "Submit Test"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/laboratory/reports")}
          className="bg-red-600 text-white px-6 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default LaboratoryUpdateForm
