

export default function SectionMedical({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Medical Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
          <select
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.department ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Oncology">Oncology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Emergency">Emergency</option>
          </select>
          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Doctor *</label>
          <select
            name="doctor"
            required
            value={formData.doctor}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.doctor ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Sarah Wilson">Dr. Sarah Wilson</option>
            <option value="Dr. Michael Brown">Dr. Michael Brown</option>
            <option value="Dr. James Miller">Dr. James Miller</option>
            <option value="Dr. Emily Davis">Dr. Emily Davis</option>
          </select>
          {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
          <input
            type="text"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Insurance company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Policy Number</label>
          <input
            type="text"
            name="insurancePolicyNumber"
            value={formData.insurancePolicyNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Policy number"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
          <textarea
            name="medicalHistory"
            rows={3}
            value={formData.medicalHistory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Previous medical conditions, surgeries, allergies (comma separated)"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
          <textarea
            name="currentMedications"
            rows={2}
            value={formData.currentMedications}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Current medications and dosages"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
          <textarea
            name="allergies"
            rows={2}
            value={formData.allergies}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Known allergies and reactions"
          />
        </div>
      </div>
    </div>
  )
}
