

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateLabTest } from "../../action/slice"

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
    results: initialData?.results || "",
    notes: initialData?.notes || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isUpdate) {
        await dispatch(
          updateLabTest({
            id: initialData.id,
            ...formData,
          }),
        ).unwrap()
      }
      navigate("/laboratory/list")
    } catch (error) {
      console.error("Error updating lab test:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block  font-medium text-gray-700 mb-2">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Patient ID</label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Test Type</label>
          <select
            name="testType"
            value={formData.testType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Test Type</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Test">Urine Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="CT Scan">CT Scan</option>
            <option value="MRI">MRI</option>
            <option value="ECG">ECG</option>
            <option value="Ultrasound">Ultrasound</option>
          </select>
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Category</label>
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
            <option value="Radiology">Radiology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pathology">Pathology</option>
          </select>
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Sample Date</label>
          <input
            type="date"
            name="sampleDate"
            value={formData.sampleDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block  font-medium text-gray-700 mb-2">Test Results</label>
        <textarea
          name="results"
          value={formData.results}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter test results here..."
        />
      </div>

      <div>
        <label className="block  font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-primary-color text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Test
        </button>
        <button
          type="button"
          onClick={() => navigate("/laboratory/list")}
          className="bg-red-color text-white px-6 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default LaboratoryUpdateForm
