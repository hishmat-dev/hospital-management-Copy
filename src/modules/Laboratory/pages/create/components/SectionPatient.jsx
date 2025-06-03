

export default function SectionPatient({ formData, handleChange, errors, patients = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 border-b pb-2">Patient Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Select Patient *</label>
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
          {errors.patientId && <p className="text-red-500  mt-1">{errors.patientId}</p>}
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Patient Age</label>
          <input
            type="text"
            name="patientAge"
            value={formData.patientAge}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient age"
            readOnly
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Patient Gender</label>
          <input
            type="text"
            name="patientGender"
            value={formData.patientGender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient gender"
            readOnly
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient department"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
