

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateEmergencyCase } from "../../action/slice"

const EmergencyUpdateForm = ({ initialData, isUpdate = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    patientName: initialData?.patientName || "",
    age: initialData?.age || "",
    gender: initialData?.gender || "",
    phone: initialData?.phone || "",
    emergencyContact: initialData?.emergencyContact || "",
    chiefComplaint: initialData?.chiefComplaint || "",
    triageLevel: initialData?.triageLevel || "non-urgent",
    status: initialData?.status || "waiting",
    vitals: {
      bloodPressure: initialData?.vitals?.bloodPressure || "",
      heartRate: initialData?.vitals?.heartRate || "",
      temperature: initialData?.vitals?.temperature || "",
      oxygenSaturation: initialData?.vitals?.oxygenSaturation || "",
      respiratoryRate: initialData?.vitals?.respiratoryRate || "",
    },
    allergies: initialData?.allergies || "",
    medications: initialData?.medications || "",
    medicalHistory: initialData?.medicalHistory || "",
    assignedDoctor: initialData?.assignedDoctor || "",
    assignedNurse: initialData?.assignedNurse || "",
    notes: initialData?.notes || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("vitals.")) {
      const vitalName = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          [vitalName]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isUpdate) {
        await dispatch(
          updateEmergencyCase({
            id: initialData.id,
            ...formData,
          }),
        ).unwrap()
      }
      navigate("/emergency/list")
    } catch (error) {
      console.error("Error updating emergency case:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block  font-medium text-gray-700 mb-2">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Triage Level</label>
          <select
            name="triageLevel"
            value={formData.triageLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="non-urgent">Non-Urgent</option>
            <option value="semi-urgent">Semi-Urgent</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="waiting">Waiting</option>
            <option value="in-treatment">In Treatment</option>
            <option value="discharged">Discharged</option>
            <option value="admitted">Admitted</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Vital Signs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block  font-medium text-gray-700 mb-2">Blood Pressure</label>
            <input
              type="text"
              name="vitals.bloodPressure"
              value={formData.vitals.bloodPressure}
              onChange={handleChange}
              placeholder="120/80"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block  font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
            <input
              type="number"
              name="vitals.heartRate"
              value={formData.vitals.heartRate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block  font-medium text-gray-700 mb-2">Temperature (°F)</label>
            <input
              type="number"
              step="0.1"
              name="vitals.temperature"
              value={formData.vitals.temperature}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block  font-medium text-gray-700 mb-2">Chief Complaint</label>
        <textarea
          name="chiefComplaint"
          value={formData.chiefComplaint}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block  font-medium text-gray-700 mb-2">Clinical Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Update Case
        </button>
        <button
          type="button"
          onClick={() => navigate("/emergency/queue")}
          className="bg-primary-color text-white px-6 py-2 rounded-md  focus:outline-none focus:ring-2 "
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EmergencyUpdateForm
