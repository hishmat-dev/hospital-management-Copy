export default function SectionMedical({ formData, handleInputChange, errors }) {
  return (
    <div className="text-[12px] bg-white rounded-lg shadow p-6">
      <h3 className=" font-semibold text-gray-900 mb-4">Medical Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block  font-medium text-gray-700 mb-1">Known Allergies</label>
          <textarea
            name="allergies"
            value={formData.allergies || ""}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:border-gray-300 focus:outline-none !important"
            placeholder="List any known allergies (medications, food, environmental, etc.)"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Current Medications</label>
          <textarea
            name="medications"
            value={formData.medications || ""}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-300 focus:outline-none !important"
            placeholder="List current medications with dosages"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory || ""}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-300 focus:outline-none !important"
            placeholder="Previous surgeries, chronic conditions, family history, etc."
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700 mb-1">Insurance Provider</label>
          <input
            type="text"
            name="insurance"
            value={formData.insurance || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-300 focus:outline-none !important"
            placeholder="Enter insurance provider name"
          />
        </div>
      </div>
    </div>
  )
}