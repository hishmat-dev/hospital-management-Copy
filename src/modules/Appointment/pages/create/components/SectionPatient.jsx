

export default function SectionPatient({ formData, handleChange, errors, patients = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Patient Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient *</label>
          <select
            name="patientId"
            required
            value={formData.patientId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.patientId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} ({patient.id}) - {patient.department}
              </option>
            ))}
          </select>
          {errors.patientId && <p className="text-red-500 text-xs mt-1">{errors.patientId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient Contact</label>
          <input
            type="text"
            name="patientContact"
            value={formData.patientContact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient phone number"
            readOnly
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaint</label>
          <textarea
            name="chiefComplaint"
            rows={2}
            value={formData.chiefComplaint}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of patient's main concern"
          />
        </div>
      </div>
    </div>
  )
}
