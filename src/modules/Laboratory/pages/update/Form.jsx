import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateLabTest } from "../../action/slice"
import CBC from "./Templetes/CBC"

const LaboratoryUpdateForm = ({ initialData, isUpdate = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    // Reset results if test type is blood test
    if (name === "testType" && value === "Blood Test") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        results: [],
      }))
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
      results: [...prev.results, { name: "", value: "", unit: "" }],
    }))
  }

  const handleRemoveResult = (index) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isUpdate) {
        await dispatch(updateLabTest({ id: initialData.id, ...formData })).unwrap()
      }
      navigate("/laboratory/list")
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
          ["Category", "category", ["Hematology", "Biochemistry", "Microbiology", "Radiology", "Cardiology", "Pathology"]],
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

      {/* Test Results Section */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Test Results</label>
        {formData.testType === "Blood Test" ? (
          <CBC results={formData.results} onChange={handleResultChange} />
        ) : (
          <>
            {formData.results.map((result, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Test Name"
                  value={result.name}
                  onChange={(e) => handleResultChange(index, "name", e.target.value)}
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={result.value}
                  onChange={(e) => handleResultChange(index, "value", e.target.value)}
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={result.unit}
                  onChange={(e) => handleResultChange(index, "unit", e.target.value)}
                  className="w-1/4 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveResult(index)}
                  className="text-red-500 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddResult}
              className="mt-2 px-4 py-1 bg-green-600 text-white rounded-md"
            >
              + Add Result
            </button>
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
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
